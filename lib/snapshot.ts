// The Atlas data snapshot every visual on this site renders from.
//
// The site does NOT query the database. `scripts/build_atlas_snapshot.py` runs
// the queries against Atlas, applies the publishing rules (street numbers
// masked, no personal names, no vendor or internal table names, no
// work-in-progress counts) and writes data/atlas-snapshot.json. That file is
// committed, imported at build time, and is the single thing a refresh
// changes. Re-run the script, commit, push.
//
// Headline record counts in the file come from atlas's canonical metrics
// module, which is the single source of truth for every "record count"-shaped
// number on every Red Planet surface. Nothing here recomputes one.
//
// data/atlas-snapshot.provenance.json records the query behind each figure and
// is deliberately NOT imported anywhere, so no internal table name can reach
// the rendered page.
import snapshot from "@/data/atlas-snapshot.json";

export type FilingEvent = {
  date: string | null;
  label: string;
  outcome: string;
  amount: number | null;
  /** The county's own system has since replaced this version. */
  superseded: boolean;
  first_kept: string | null;
};

export type FilingHistory = {
  county: string | null;
  address: string | null;
  city: string | null;
  state: string | null;
  zip: string | null;
  parcel: string | null;
  assessed_value: number | null;
  judgment_amount: number | null;
  events: FilingEvent[];
  kept_versions: number;
};

export type CoverageRow = {
  market: string;
  count: number | null;
  unit: string;
  jurisdictions: number | null;
  jurisdiction_label: string;
};

export type DistressRow = {
  county: string | null;
  type: string;
  address: string | null;
  city: string | null;
  sale_date: string | null;
  judgment: number | null;
  assessed: number | null;
};

export type DataCenterRow = {
  jurisdiction: string | null;
  kind: string;
  county: string | null;
  posture: string;
  is_moratorium: boolean;
  since: string | null;
  stage: string | null;
  vote: string | null;
  document: boolean;
};

export type Nightly = {
  started_et: string | null;
  finished_et: string | null;
  run_date_et: string | null;
  sources_checked: number | null;
  sources_completed: number | null;
  records_processed: number | null;
};

export type Snapshot = {
  as_of: string;
  as_of_label: string;
  generated_at: string;
  records_held: number | null;
  records_live: number | null;
  records_archived: number | null;
  verified_records: number | null;
  records_added_last_run: number | null;
  active_sources: number | null;
  classified_parcels: number | null;
  distress_records: number | null;
  nightly: Nightly;
  filing_history: FilingHistory;
  coverage: CoverageRow[];
  distress: DistressRow[];
  datacenter: { verified: number | null; tracked: number | null; moratorium: number | null; rows: DataCenterRow[] };
};

export const SNAPSHOT = snapshot as unknown as Snapshot;

/** "Atlas data as of October 9, 2026" — the caption every visual carries. */
export const AS_OF = SNAPSHOT.as_of_label;

export const n = (v: number | null | undefined): string =>
  v == null ? "—" : v.toLocaleString("en-US");

/** Whole dollars; these are judgment and assessment figures, not prices. */
export const usd = (v: number | null | undefined): string =>
  v == null ? "—" : "$" + Math.round(v).toLocaleString("en-US");

export const compactUsd = (v: number | null | undefined): string => {
  if (v == null) return "—";
  if (v >= 1_000_000) return "$" + (v / 1_000_000).toFixed(v >= 10_000_000 ? 1 : 2) + "M";
  if (v >= 1_000) return "$" + Math.round(v / 1_000) + "K";
  return "$" + Math.round(v).toLocaleString("en-US");
};

const MONTHS = ["Jan", "Feb", "Mar", "Apr", "May", "Jun", "Jul", "Aug", "Sep", "Oct", "Nov", "Dec"];

/** "2026-09-22" -> "Sep 22, 2026". Parsed by hand: a bare date string goes
 *  through Date() as UTC midnight and renders as the day before in ET. */
export const shortDate = (iso: string | null | undefined): string => {
  if (!iso) return "—";
  const m = /^(\d{4})-(\d{2})-(\d{2})/.exec(iso);
  if (!m) return iso;
  return `${MONTHS[Number(m[2]) - 1]} ${Number(m[3])}, ${m[1]}`;
};
