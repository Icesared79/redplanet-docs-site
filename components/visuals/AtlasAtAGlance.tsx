// Visual 1 (Overview) — Atlas at a glance.
//
// Records held is the canonical headline: every record counted once, wherever
// it currently sits. Live and archived say where those records are. They are
// deliberately NOT presented as a sum: a record that moved to archive is still
// one record, so adding the two would double-count the overlap. The canonical
// metrics module never sums them either.
import VisualFrame from "./VisualFrame";
import { SNAPSHOT, n } from "@/lib/snapshot";

export default function AtlasAtAGlance() {
  const s = SNAPSHOT;
  return (
    <VisualFrame
      title="Atlas — overview"
      chip="Atlas"
      caption="Records held counts each record once, wherever it currently sits; live and archived describe where those records are, and are not a sum."
    >
      <div className="rpv-glance__hero">
        <span className="rpv-label">Records held</span>
        <span className="rpv-glance__big">{n(s.records_held)}</span>
      </div>

      <hr className="rpv-divider" />

      <div className="rpv-glance__grid">
        <div className="rpv-glance__cell">
          <span className="rpv-label">Live</span>
          <span className="rpv-glance__val">{n(s.records_live)}</span>
          <span className="rpv-glance__sub">queryable now</span>
        </div>
        <div className="rpv-glance__cell">
          <span className="rpv-label">Archived</span>
          <span className="rpv-glance__val">{n(s.records_archived)}</span>
          <span className="rpv-glance__sub">recalled on demand</span>
        </div>
        <div className="rpv-glance__cell">
          <span className="rpv-label">Active sources</span>
          <span className="rpv-glance__val">{n(s.active_sources)}</span>
          <span className="rpv-glance__sub">checked on a schedule</span>
        </div>
        <div className="rpv-glance__cell">
          <span className="rpv-label">Last nightly run</span>
          <span className="rpv-glance__val" style={{ fontSize: "clamp(16px,1.7vw,20px)" }}>
            {s.nightly.started_et ?? "—"}
          </span>
          <span className="rpv-glance__sub">
            {s.nightly.finished_et ? `finished ${s.nightly.finished_et} ET` : "Eastern time"}
          </span>
        </div>
      </div>
    </VisualFrame>
  );
}
