// Visual 2 (Our Data) — one property's filing history, including the versions
// the county's own system has since replaced.
//
// The county auction calendar shows a case's current setting only. Atlas reads
// it every night and keeps each setting it has seen, so the sequence below
// holds auction dates and outcomes that are no longer retrievable from the
// source. Struck-through rows are those replaced versions.
//
// The address is masked and no party to the case is named.
import VisualFrame from "./VisualFrame";
import { SNAPSHOT, n, usd, shortDate } from "@/lib/snapshot";

export default function RetainedFilingHistory() {
  const h = SNAPSHOT.filing_history;
  const place = [h.city, h.state].filter(Boolean).join(", ");

  return (
    <VisualFrame
      title="Atlas — property record"
      chip="Filing history"
      caption={`Street number masked. ${n(h.kept_versions)} of ${n(
        h.events.length
      )} settings on this case are versions the county's own calendar has since replaced; Atlas retains all of them.`}
    >
      <div className="rpv-hist__head">
        <div style={{ minWidth: 0 }}>
          <div className="rpv-hist__addr">
            {h.address} {h.zip ? "" : null}
          </div>
          <div className="rpv-hist__meta">
            <span className="rpv-label">
              {place} {h.zip}
            </span>
            <span className="rpv-label">{h.county} County</span>
            <span className="rpv-label">Parcel {h.parcel}</span>
          </div>
        </div>
      </div>

      <hr className="rpv-divider" />

      <ol className="rpv-hist__list">
        {h.events.map((e, i) => (
          <li
            key={`${e.date}-${i}`}
            className={"rpv-hist__row" + (e.superseded ? " rpv-hist__row--gone" : "")}
          >
            <span className="rpv-hist__date">{shortDate(e.date)}</span>
            <span className="rpv-hist__what">
              {e.label}
              {e.amount != null ? ` — ${usd(e.amount)}` : ""}
            </span>
            <span className="rpv-hist__tag">
              {e.superseded ? "replaced at source" : "current"}
            </span>
          </li>
        ))}
      </ol>

      <div className="rpv-hist__foot">
        <span className="rpv-label">
          Assessed value{" "}
          <span className="rpv-num" style={{ color: "var(--fg-1)" }}>
            {usd(h.assessed_value)}
          </span>
        </span>
        <span className="rpv-label">
          Judgment{" "}
          <span className="rpv-num" style={{ color: "var(--fg-1)" }}>
            {usd(h.judgment_amount)}
          </span>
        </span>
        <span className="rpv-label">
          Settings the source shows today{" "}
          <span className="rpv-num" style={{ color: "var(--fg-1)" }}>
            1
          </span>
        </span>
      </div>
    </VisualFrame>
  );
}
