// Visual 3 (Coverage) — the markets that are live today, each with the real
// size of its spine and the number of jurisdictions that spine reaches.
//
// Every count is the current size of that market's own spine, so the grid can
// disagree with a number written into prose and the grid is the one that is
// right. Markets that are built but not open are not shown here; the table
// further down the page names them.
import VisualFrame from "./VisualFrame";
import { SNAPSHOT, n } from "@/lib/snapshot";

export default function CoverageGrid() {
  const rows = SNAPSHOT.coverage;
  return (
    <VisualFrame
      title="Atlas — live markets"
      chip="Coverage"
      caption="The five markets open today. Jurisdiction counts are the jurisdictions actually present in each market's spine, not the number that exists."
    >
      <div className="rpv-cov">
        {rows.map((r) => (
          <div className="rpv-cov__cell" key={r.market}>
            <span className="rpv-state rpv-state--live">{r.market}</span>
            <span className="rpv-cov__count">{n(r.count)}</span>
            <span className="rpv-cov__unit">
              {r.unit}
              {r.jurisdictions != null && (
                <>
                  <br />
                  {n(r.jurisdictions)} {r.jurisdiction_label}
                </>
              )}
            </span>
          </div>
        ))}
      </div>
    </VisualFrame>
  );
}
