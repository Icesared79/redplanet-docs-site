// Visual 5 (Products) — Signal's distress view.
//
// Scheduled distress sales, each joined to the assessed value Atlas already
// holds for the same parcel, which is the join a licensee is paying for: the
// filing on its own does not tell you whether there is equity behind it.
//
// Street numbers are masked and no party to a case is named.
import VisualFrame from "./VisualFrame";
import { SNAPSHOT, n, compactUsd, shortDate } from "@/lib/snapshot";

export default function DistressView() {
  const rows = SNAPSHOT.distress;
  return (
    <VisualFrame
      title="Signal — distress"
      chip="Signal"
      caption={`Six of ${n(
        SNAPSHOT.distress_records
      )} distress records Atlas holds. Street numbers masked; no party to a filing is named.`}
    >
      <div className="rpv-tbl-wrap">
        <table className="rpv-tbl">
          <thead>
            <tr>
              <th>Property</th>
              <th>County</th>
              <th>Type</th>
              <th>Sale date</th>
              <th className="is-right">Judgment</th>
              <th className="is-right">Assessed</th>
            </tr>
          </thead>
          <tbody>
            {rows.map((r, i) => (
              <tr key={i}>
                <td className="is-strong">
                  {r.address}
                  <br />
                  <span className="rpv-label">{r.city}</span>
                </td>
                <td>{r.county}</td>
                <td>{r.type}</td>
                <td className="is-mono">{shortDate(r.sale_date)}</td>
                <td className="is-right is-mono">{compactUsd(r.judgment)}</td>
                <td className="is-right is-mono">{compactUsd(r.assessed)}</td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>

      <div className="rpv-stack">
        {rows.map((r, i) => (
          <div className="rpv-stack__row" key={i}>
            <div className="rpv-stack__top">
              <span className="rpv-stack__name">{r.address}</span>
              <span className="rpv-num rpv-label">{shortDate(r.sale_date)}</span>
            </div>
            <div className="rpv-stack__facts">
              <span className="rpv-label">
                {r.city}, {r.county} County
              </span>
              <span className="rpv-label">{r.type}</span>
            </div>
            <div className="rpv-stack__facts">
              <span className="rpv-label">
                Judgment{" "}
                <span className="rpv-num" style={{ color: "var(--fg-1)" }}>
                  {compactUsd(r.judgment)}
                </span>
              </span>
              <span className="rpv-label">
                Assessed{" "}
                <span className="rpv-num" style={{ color: "var(--fg-1)" }}>
                  {compactUsd(r.assessed)}
                </span>
              </span>
            </div>
          </div>
        ))}
      </div>
    </VisualFrame>
  );
}
