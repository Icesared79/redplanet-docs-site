"""Build the Atlas data snapshot the docs-site visuals render from.

    python scripts/build_atlas_snapshot.py

Writes two files:

  data/atlas-snapshot.json             display data -- imported by lib/snapshot.ts
  data/atlas-snapshot.provenance.json  the query or canonical metric behind every
                                       figure -- NEVER imported by app code

Why a snapshot and not a live query: docs.redplanetdata.com is a partner-facing
site and must not hold a database credential or put load on the shared Supabase
instance on every request. The visuals read a committed file; re-running this
script and committing the result is how they refresh.

Headline record counts come from atlas's canonical metrics module
(runners/canonical_metrics.py), which is the single source of truth for every
"record count"-shaped number on every Red Planet surface. Nothing here
re-derives one. Everything else is a named query recorded in the provenance
file, routed through lib/workshop_db.connect_for() so a table that has been
copied to the atlas-mini workshop is read there and costs production nothing.

Publishing rules enforced in this file, not left to the components:
  * no personal names -- owner, borrower, plaintiff and defendant fields are
    never selected, and vote tallies are stripped to the numeric result
  * street numbers are masked; the street, city, state and ZIP stay
  * no vendor, storage-provider or internal table names in the display file
  * no work-in-progress or other internal-only counts
"""
from __future__ import annotations

import json
import os
import re
import sys
from datetime import datetime, timezone
from pathlib import Path
from zoneinfo import ZoneInfo

ATLAS_ROOT = Path(os.environ.get("ATLAS_ROOT", r"C:\Users\Atlas\Levelpie\atlas"))
if not (ATLAS_ROOT / "runners" / "canonical_metrics.py").is_file():
    sys.exit(f"atlas checkout not found at {ATLAS_ROOT} -- set ATLAS_ROOT")
sys.path.insert(0, str(ATLAS_ROOT))

from lib.atlas_env import load_atlas_env  # noqa: E402

load_atlas_env()

from lib.workshop_db import connect_for  # noqa: E402
from runners import canonical_metrics as cm  # noqa: E402

REPO = Path(__file__).resolve().parent.parent
OUT = REPO / "data" / "atlas-snapshot.json"
OUT_PROV = REPO / "data" / "atlas-snapshot.provenance.json"
ET = ZoneInfo("America/New_York")
MASK = "\u2022\u2022\u2022"  # bullet mask for a street or parcel number

# Primary distress FILING layers. An explicit list, not a name pattern: a
# pattern silently absorbs derived summaries and event/history tables and
# double-counts them. Each of these is a first-party filing layer.
DISTRESS_TABLES = [
    "atlas_nc_tax_delinquency",
    "atlas_nc_foreclosure",
    "atlas_distress_filings",
    "atlas_nyc_property_tax_delinquency",
    "atlas_ny_tax_delinquency",
    "atlas_fl_tax_delinquency",
    "atlas_fl_liens",
    "atlas_fl_lis_pendens",
    "atlas_foreclosure_filings",
]

# quality_tier values that mean a parcel has actually been scored.
QUALITY_TIERS = ("verified", "usable", "review", "unreliable")

prov: dict[str, object] = {}


def note(key: str, how: str) -> None:
    prov[key] = how


def mask_street(addr: str | None) -> str | None:
    """Drop the house number and any unit number; keep the street, which is what
    makes the row readable without identifying the property."""
    if not addr:
        return None
    s = " ".join(str(addr).split())
    # The leading house number, whether or not the source left a space after it
    # ("17 ZINNIA LN E", "123A MAIN ST", and "20BIRTHSTONE WAY" all appear).
    masked = re.sub(r"^\d+(?:-\d+)?[A-Za-z]?(?=\s)", MASK, s, count=1)
    if masked == s:
        masked = re.sub(r"^\d+(?:-\d+)?", MASK + " ", s, count=1)
    s = masked
    s = re.sub(r"\b(APT|UNIT|STE|SUITE|#)\s*[\w-]+\b", r"\1 " + MASK, s, flags=re.I)
    s = re.sub(r"\s+\d{3,}$", " " + MASK, s)  # trailing bare unit number
    if not s.startswith(MASK):  # nothing numeric to mask: do not publish the street
        return None
    return s


def title_place(s: str | None) -> str | None:
    """'POINCIANA, FL- 34759' and 'ORLANDO, 32833' both appear in the source."""
    if not s:
        return None
    city = str(s).split(",")[0].strip()
    return " ".join(w.capitalize() for w in city.split()) or None


def numeric_vote(v: str | None) -> str | None:
    """A tally can carry a member surname in parentheses; keep only the numbers."""
    if not v:
        return None
    m = re.match(r"\s*(\d+\s*-\s*\d+)", str(v))
    return m.group(1).replace(" ", "") if m else None


def mask_parcel(p: str | None) -> str | None:
    if not p:
        return None
    s = " ".join(str(p).split())
    return (s[:4] + MASK) if len(s) > 6 else MASK


def rows(table_for_routing: str, sql: str, params: tuple = ()) -> list[dict]:
    src = connect_for(table_for_routing)
    try:
        with src.conn.cursor() as cur:
            cur.execute(sql, params)
            cols = [d[0] for d in cur.description]
            return [dict(zip(cols, r)) for r in cur.fetchall()]
    finally:
        src.close()


def one(table_for_routing: str, sql: str, params: tuple = ()) -> dict:
    got = rows(table_for_routing, sql, params)
    return got[0] if got else {}


# -- 1. headline counts, from the canonical module only ----------------

def headline() -> dict:
    m = cm.all_metrics()
    for name in ("records_held", "records_live", "records_stored",
                 "total_verified", "overnight_new_rows"):
        metric = m[name]
        note("canonical." + name,
             f"runners/canonical_metrics.py :: {metric.provenance} "
             f"[freshness={metric.freshness}]")
    return {
        "records_held": m["records_held"].value,
        "records_held_freshness": m["records_held"].freshness,
        "records_live": m["records_live"].value,
        "records_archived": m["records_stored"].value,
        "verified_records": m["total_verified"].value,
        "records_added_last_run": m["overnight_new_rows"].value,
        "records_added_freshness": m["overnight_new_rows"].freshness,
    }


# -- 2. the three secondary counts the overview already shows -----------

def secondary() -> dict:
    src = connect_for("atlas_stats_cache")
    try:
        with src.conn.cursor() as cur:
            cur.execute("SELECT value FROM atlas_stats_cache WHERE key='active_sources_total'")
            got = cur.fetchone()
            active = int(str(got[0]).strip('"')) if got and got[0] is not None else None
    finally:
        src.close()
    note("active_sources",
         "atlas_stats_cache['active_sources_total'] -- the maintained figure every "
         "Red Planet surface reads, so the docs site cannot diverge from the dashboard")

    parcels = one("atlas_properties",
                  "SELECT count(*) AS n FROM atlas_properties WHERE quality_tier = ANY(%s)",
                  (list(QUALITY_TIERS),))
    note("classified_parcels",
         "count(atlas_properties) where quality_tier in " + ", ".join(QUALITY_TIERS))

    dist = one("atlas_verified_record_counts",
               "SELECT sum(exact_count)::bigint AS n, count(*) AS layers "
               "FROM atlas_verified_record_counts WHERE table_name = ANY(%s)",
               (DISTRESS_TABLES,))
    note("distress_records",
         "sum(exact_count) over the primary distress filing layers in "
         "atlas_verified_record_counts (explicit list of "
         f"{len(DISTRESS_TABLES)} first-party filing layers; derived summaries and "
         "event/history tables deliberately excluded)")

    return {
        "active_sources": active,
        "classified_parcels": parcels.get("n"),
        "distress_records": dist.get("n"),
        "distress_layers": dist.get("layers"),
    }


# -- 3. the most recent nightly run ------------------------------------

NIGHTLY_SQL = """
WITH kick AS (
  SELECT max(sync_started) AS t
    FROM atlas_sync_log
   WHERE sync_started::time BETWEEN '03:00' AND '05:00'
)
SELECT (SELECT t FROM kick)                                      AS started,
       max(sync_completed)                                       AS finished,
       count(DISTINCT source)                                    AS sources_checked,
       count(DISTINCT source) FILTER (
         WHERE status IN ('completed','success'))                 AS sources_completed,
       sum(records_upserted)::bigint                             AS records_processed
  FROM atlas_sync_log, kick
 WHERE sync_started >= kick.t
   AND sync_started <  kick.t + interval '10 hours'
   AND sync_type <> 'finalization'
"""


def nightly() -> dict:
    r = one("atlas_sync_log", NIGHTLY_SQL)
    note("nightly_run",
         "atlas_sync_log over the window opened by the most recent 03:30 UTC "
         "pipeline kickoff (10h), finalization rows excluded; records added comes "
         "from the canonical overnight_new_rows metric, not from this window")
    started = r.get("started")
    finished = r.get("finished")
    return {
        "started_et": started.astimezone(ET).strftime("%Y-%m-%d %H:%M") if started else None,
        "finished_et": finished.astimezone(ET).strftime("%Y-%m-%d %H:%M") if finished else None,
        "run_date_et": started.astimezone(ET).strftime("%Y-%m-%d") if started else None,
        "sources_checked": r.get("sources_checked"),
        "sources_completed": r.get("sources_completed"),
        "records_processed": r.get("records_processed"),
    }


# -- 4. one property's retained filing history -------------------------
#
# The county auction calendar shows a case's CURRENT setting only. Atlas
# captures it nightly and keeps every earlier setting, so the sequence below
# includes auction dates and outcomes the county's own system no longer shows.

CASE_NUMBER = "2023CA006124000000"

HISTORY_PROPERTY_SQL = """
SELECT county_name, address_street, address_csz, address_zip, resolved_parcel_id,
       assessed_value, judgment_amount, auction_type
  FROM atlas_fl_auction_events
 WHERE case_number = %s AND address_street IS NOT NULL
 ORDER BY sale_date
 LIMIT 1
"""

HISTORY_EVENTS_SQL = """
SELECT e.sale_date, e.status, e.sold_amount,
       min(h.first_seen_at) AS first_kept
  FROM atlas_fl_auction_events e
  LEFT JOIN atlas_fl_auction_status_history h
         ON h.auction_id = e.auction_id AND h.co_no = e.co_no
 WHERE e.case_number = %s
 GROUP BY e.sale_date, e.status, e.sold_amount
 ORDER BY e.sale_date
"""

STATUS_LABEL = {
    "scheduled": "Auction scheduled",
    "no_sale": "Auction held, no sale",
    "sold": "Sold at auction",
    "cancelled": "Auction cancelled",
    "redeemed": "Redeemed before sale",
}


def filing_history() -> dict:
    p = one("atlas_fl_auction_events", HISTORY_PROPERTY_SQL, (CASE_NUMBER,))
    ev = rows("atlas_fl_auction_events", HISTORY_EVENTS_SQL, (CASE_NUMBER,))
    note("filing_history",
         "one foreclosure case in atlas_fl_auction_events joined to "
         "atlas_fl_auction_status_history, which is the nightly capture ledger: "
         "every auction setting Atlas has seen for the case, including the ones "
         "the county replaced. Address masked, no party names selected")
    events = []
    for i, e in enumerate(ev):
        status = (e.get("status") or "").lower()
        events.append({
            "date": e["sale_date"].isoformat() if e.get("sale_date") else None,
            "label": STATUS_LABEL.get(status, status.replace("_", " ").capitalize() or "Recorded"),
            "outcome": status,
            "amount": float(e["sold_amount"]) if e.get("sold_amount") is not None else None,
            # every setting before the last one is a version the county's own
            # system has since overwritten
            "superseded": i < len(ev) - 1,
            "first_kept": (e["first_kept"].astimezone(ET).strftime("%Y-%m-%d")
                           if e.get("first_kept") else None),
        })
    return {
        "county": p.get("county_name"),
        "address": mask_street(p.get("address_street")),
        "city": title_place(p.get("address_csz")),
        "state": "FL",
        "zip": p.get("address_zip"),
        "parcel": mask_parcel(p.get("resolved_parcel_id")),
        "assessed_value": float(p["assessed_value"]) if p.get("assessed_value") else None,
        "judgment_amount": float(p["judgment_amount"]) if p.get("judgment_amount") else None,
        "events": events,
        "kept_versions": sum(1 for e in events if e["superseded"]),
    }


# -- 5. coverage: the markets that are live today ----------------------

COVERAGE = [
    {"market": "Florida", "table": "atlas_fl_parcels", "unit": "parcels",
     "juris_sql": "SELECT count(DISTINCT co_no) AS n FROM atlas_fl_parcels",
     "juris_label": "counties"},
    {"market": "North Carolina", "table": "atlas_nc_parcels", "unit": "parcels",
     "juris_sql": "SELECT count(DISTINCT county_name) AS n FROM atlas_nc_parcels",
     "juris_label": "counties"},
    {"market": "Connecticut", "table": "atlas_ct_parcels", "unit": "parcels",
     "juris_sql": "SELECT count(DISTINCT town) AS n FROM atlas_ct_parcels",
     "juris_label": "towns"},
    {"market": "South Carolina", "table": "atlas_sc_parcels", "unit": "parcels",
     "juris_sql": "SELECT count(DISTINCT county_name) AS n FROM atlas_sc_parcels",
     "juris_label": "counties"},
    {"market": "New York City", "table": "atlas_acris_transactions_nyc",
     "unit": "recorded instruments",
     "juris_sql": "SELECT 5 AS n", "juris_label": "boroughs"},
]


def coverage() -> list[dict]:
    inv = {r["table_name"]: r["exact_count"] for r in rows(
        "atlas_verified_record_counts",
        "SELECT table_name, exact_count FROM atlas_verified_record_counts "
        "WHERE table_name = ANY(%s)",
        ([c["table"] for c in COVERAGE],))}
    note("coverage",
         "spine size per live market from atlas_verified_record_counts (the view "
         "that carries the liveness and class filters); jurisdiction counts are a "
         "count(DISTINCT) of the jurisdiction column on each market's own spine")
    out = []
    for c in COVERAGE:
        j = one(c["table"], c["juris_sql"])
        out.append({
            "market": c["market"],
            "count": inv.get(c["table"]),
            "unit": c["unit"],
            "jurisdictions": j.get("n"),
            "jurisdiction_label": c["juris_label"],
        })
    return out


# -- 6. Signal: a distress view ----------------------------------------

# Upcoming distress sales, largest judgment first. These come back as
# foreclosures because the tax-deed rows carry neither a judgment nor an
# assessed value -- the tax-deed vector is published with an opening bid
# instead -- and a row with two empty money columns is not worth a line here.
DISTRESS_SQL = """
SELECT county_name, auction_type, address_street, address_csz, sale_date,
       judgment_amount, assessed_value
  FROM atlas_fl_auction_events
 WHERE address_street IS NOT NULL
   AND auction_type IS NOT NULL
   AND assessed_value > 0
   AND judgment_amount > 0
   AND sale_date >= current_date
   AND sale_date <  current_date + 90
 ORDER BY judgment_amount DESC
 LIMIT 8
"""

AUCTION_TYPE_LABEL = {"FORECLOSURE": "Foreclosure", "TAXDEED": "Tax deed"}


def distress() -> list[dict]:
    got = rows("atlas_fl_auction_events", DISTRESS_SQL)
    note("distress_view",
         "atlas_fl_auction_events: scheduled distress sales dated today or later, "
         "carrying the judgment amount and the assessed value Atlas already holds "
         "for the same parcel. Addresses masked; no party names selected")
    out = [{
        "county": r.get("county_name"),
        "type": AUCTION_TYPE_LABEL.get((r.get("auction_type") or "").upper(),
                                       (r.get("auction_type") or "").capitalize()),
        "address": mask_street(r.get("address_street")),
        "city": title_place(r.get("address_csz")),
        "sale_date": r["sale_date"].isoformat() if r.get("sale_date") else None,
        "judgment": float(r["judgment_amount"]) if r.get("judgment_amount") else None,
        "assessed": float(r["assessed_value"]) if r.get("assessed_value") else None,
    } for r in got]
    # mask_street() returns None when it could not find a number to mask; such a
    # row is dropped rather than published unmasked.
    return [r for r in out if r["address"] and r["city"]][:6]


# -- 7. the data center jurisdiction record ----------------------------

# The most recent three of each posture, so the view shows both what has been
# adopted and what is still moving -- which is the decision a site selector is
# actually reading. Adopted moratoriums lead.
DC_SQL = """
WITH v AS (
  SELECT j.name, j.type, j.county_name, s.status, s.status_since,
         s.vote_result, s.reading_stage,
         (s.primary_source_url IS NOT NULL OR s.source_url IS NOT NULL) AS has_document,
         row_number() OVER (PARTITION BY s.status
                            ORDER BY s.status_since DESC NULLS LAST) AS rn
    FROM atlas_fl_jurisdiction_dc_status s
    JOIN atlas_fl_jurisdictions j USING (jurisdiction_id)
   WHERE s.verification_status = 'verified'
)
SELECT name, type, county_name, status, status_since, vote_result,
       reading_stage, has_document
  FROM v
 WHERE rn <= 3
 ORDER BY (status = 'moratorium') DESC, status_since DESC NULLS LAST
"""

DC_TOTALS_SQL = """
SELECT count(*) FILTER (WHERE verification_status='verified')      AS verified,
       count(*)                                                    AS tracked,
       count(*) FILTER (WHERE verification_status='verified'
                          AND status='moratorium')                  AS moratorium
  FROM atlas_fl_jurisdiction_dc_status
"""

POSTURE = {"moratorium": "Moratorium adopted", "discussion": "Under discussion"}
STAGE = {
    "second_reading": "Second reading",
    "final_hearing": "Final hearing",
    "resolution_vote": "Resolution vote",
    "first_reading": "First reading",
}


def datacenter() -> dict:
    got = rows("atlas_fl_jurisdiction_dc_status", DC_SQL)
    totals = one("atlas_fl_jurisdiction_dc_status", DC_TOTALS_SQL)
    note("datacenter_view",
         "atlas_fl_jurisdiction_dc_status joined to atlas_fl_jurisdictions, "
         "verified rows only -- an entry is verified when the adopted document is "
         "in hand. Vote tallies stripped to the numeric result so no person is named")
    return {
        "verified": totals.get("verified"),
        "tracked": totals.get("tracked"),
        "moratorium": totals.get("moratorium"),
        "rows": [{
            "jurisdiction": r.get("name"),
            "kind": (r.get("type") or "").capitalize(),
            "county": r.get("county_name"),
            "posture": POSTURE.get((r.get("status") or "").lower(),
                                   (r.get("status") or "").capitalize()),
            "is_moratorium": (r.get("status") or "").lower() == "moratorium",
            "since": r["status_since"].isoformat() if r.get("status_since") else None,
            "stage": STAGE.get((r.get("reading_stage") or "").lower()),
            "vote": numeric_vote(r.get("vote_result")),
            "document": bool(r.get("has_document")),
        } for r in got],
    }


def main() -> None:
    now = datetime.now(timezone.utc)
    local = now.astimezone(ET)
    snap = {
        "as_of": local.strftime("%Y-%m-%d"),
        "as_of_label": f"{local.strftime('%B')} {local.day}, {local.year}",
        "generated_at": now.isoformat(timespec="seconds"),
        **headline(),
        **secondary(),
        "nightly": nightly(),
        "filing_history": filing_history(),
        "coverage": coverage(),
        "distress": distress(),
        "datacenter": datacenter(),
    }
    OUT.parent.mkdir(parents=True, exist_ok=True)
    OUT.write_text(json.dumps(snap, indent=2, sort_keys=False) + "\n", encoding="utf-8")
    OUT_PROV.write_text(json.dumps({
        "generated_at": snap["generated_at"],
        "as_of": snap["as_of"],
        "atlas_root": str(ATLAS_ROOT),
        "note": "Query/metric provenance for data/atlas-snapshot.json. Never "
                "imported by app code, so no internal table name reaches the site.",
        "sources": prov,
    }, indent=2) + "\n", encoding="utf-8")
    print(f"wrote data/atlas-snapshot.json  (as of {snap['as_of']})")
    print("wrote data/atlas-snapshot.provenance.json")
    for k in ("records_held", "records_live", "records_archived", "verified_records",
              "active_sources", "classified_parcels", "distress_records"):
        v = snap.get(k)
        print(f"  {k:22} {v:,}" if isinstance(v, int) else f"  {k:22} {v}")


if __name__ == "__main__":
    main()
