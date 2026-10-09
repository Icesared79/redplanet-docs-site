// Visual 4 (How Atlas Works) — the most recent nightly run.
//
// Sources checked, how many reported complete, rows touched, and rows that
// were genuinely new. "Records added" is the canonical overnight metric, which
// refuses to emit a number at all when the night's recount coverage was too
// thin to trust it -- so when it renders, it is trustworthy, and when it
// cannot it says so rather than showing a confident wrong figure.
import VisualFrame from "./VisualFrame";
import { SNAPSHOT, n } from "@/lib/snapshot";

export default function NightlyRun() {
  const s = SNAPSHOT;
  const r = s.nightly;
  const steps = [
    { name: "Sources checked", val: n(r.sources_checked) },
    { name: "Reported complete", val: n(r.sources_completed) },
    { name: "Records processed", val: n(r.records_processed) },
    {
      name: "Records added",
      val: s.records_added_last_run == null ? "unavailable" : n(s.records_added_last_run),
    },
  ];

  return (
    <VisualFrame
      title="Atlas — nightly run"
      chip="Pipeline"
      caption="Records processed counts every row the run touched, including rows it re-checked and left unchanged. Records added counts only rows that were new."
    >
      <div className="rpv-run">
        <div className="rpv-run__steps">
          {steps.map((st) => (
            <div className="rpv-run__step" key={st.name}>
              <span className="rpv-run__val">{st.val}</span>
              <span className="rpv-run__name">{st.name}</span>
            </div>
          ))}
        </div>
        <div className="rpv-run__window">
          <span className="rpv-state rpv-state--live">
            Ran {r.started_et ?? "—"} ET
          </span>
          {r.finished_et && (
            <span className="rpv-label">Finished {r.finished_et} ET</span>
          )}
          <span className="rpv-label">Runs every night, unattended</span>
        </div>
      </div>
    </VisualFrame>
  );
}
