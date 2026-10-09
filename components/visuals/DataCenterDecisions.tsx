// Visual 6 (Products) — the data center product's jurisdiction decision view.
//
// Each row is a jurisdiction's data center posture as its own adopted document
// establishes it, with the date the posture took effect, the procedural stage
// it was reached at, and the recorded vote. Only verified rows appear: an entry
// becomes verified when the document is in hand, not when a report says so.
//
// Vote tallies are the numeric result only, so no member is named.
import VisualFrame from "./VisualFrame";
import { SNAPSHOT, n, shortDate } from "@/lib/snapshot";

export default function DataCenterDecisions() {
  const dc = SNAPSHOT.datacenter;
  return (
    <VisualFrame
      title="Atlas — data center jurisdiction record"
      chip="Florida"
      caption={`${n(dc.verified)} of ${n(
        dc.tracked
      )} tracked Florida jurisdictions carry a verified posture, meaning the adopted document is on file. ${n(
        dc.moratorium
      )} of those are moratoriums.`}
    >
      <div className="rpv-tbl-wrap">
        <table className="rpv-tbl">
          <thead>
            <tr>
              <th>Jurisdiction</th>
              <th>Posture</th>
              <th>Since</th>
              <th>Reached at</th>
              <th>Vote</th>
              <th>Document</th>
            </tr>
          </thead>
          <tbody>
            {dc.rows.map((r, i) => (
              <tr key={i}>
                <td className="is-strong">
                  {r.jurisdiction}
                  <br />
                  <span className="rpv-label">
                    {r.kind === "Municipality" ? r.county : "Florida"}
                  </span>
                </td>
                <td>
                  <span
                    className={
                      "rpv-state " + (r.is_moratorium ? "rpv-state--hold" : "rpv-state--live")
                    }
                  >
                    {r.posture}
                  </span>
                </td>
                <td className="is-mono">{shortDate(r.since)}</td>
                <td>{r.stage ?? "—"}</td>
                <td className="is-mono">{r.vote ?? "—"}</td>
                <td>{r.document ? "On file" : "—"}</td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>

      <div className="rpv-stack">
        {dc.rows.map((r, i) => (
          <div className="rpv-stack__row" key={i}>
            <div className="rpv-stack__top">
              <span className="rpv-stack__name">{r.jurisdiction}</span>
              <span className="rpv-num rpv-label">{shortDate(r.since)}</span>
            </div>
            <span
              className={
                "rpv-state " + (r.is_moratorium ? "rpv-state--hold" : "rpv-state--live")
              }
            >
              {r.posture}
            </span>
            <div className="rpv-stack__facts">
              <span className="rpv-label">
                {r.kind === "Municipality" ? r.county : "Florida"}
              </span>
              {r.stage && <span className="rpv-label">{r.stage}</span>}
              {r.vote && <span className="rpv-label">Vote {r.vote}</span>}
              {r.document && <span className="rpv-label">Document on file</span>}
            </div>
          </div>
        ))}
      </div>
    </VisualFrame>
  );
}
