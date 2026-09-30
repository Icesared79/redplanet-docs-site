const FULL = 3;
const PARTIAL = 5;
const NATIONAL = 42;

export default function BaselineStrip() {
  return (
    <figure style={{ margin: "8px 0", maxWidth: 720, display: "flex", flexDirection: "column", gap: 14 }}>
      <div style={{ display: "flex", gap: 3, height: 28 }}>
        {Array.from({ length: FULL }).map((_, i) => (
          <span key={`f${i}`} style={{ flex: 1, background: "var(--fg-1)", borderRadius: 1 }} />
        ))}
        {Array.from({ length: PARTIAL }).map((_, i) => (
          <span key={`p${i}`} style={{ flex: 1, background: "var(--sage-400)", borderRadius: 1 }} />
        ))}
        {Array.from({ length: NATIONAL }).map((_, i) => (
          <span
            key={`n${i}`}
            style={{ flex: 1, border: "1px solid var(--rule-strong)", borderRadius: 1 }}
          />
        ))}
      </div>
      <div style={{ display: "flex", flexWrap: "wrap", gap: "8px 28px", font: "400 12px/1.3 var(--font-mono)", color: "var(--fg-2)" }}>
        <span style={{ display: "flex", alignItems: "center", gap: 8 }}>
          <span style={{ width: 10, height: 10, background: "var(--fg-1)", borderRadius: 1 }} />
          3 · full verified record
        </span>
        <span style={{ display: "flex", alignItems: "center", gap: 8 }}>
          <span style={{ width: 10, height: 10, background: "var(--sage-400)", borderRadius: 1 }} />
          5 · partial
        </span>
        <span style={{ display: "flex", alignItems: "center", gap: 8 }}>
          <span style={{ width: 10, height: 10, border: "1px solid var(--rule-strong)", boxSizing: "border-box", borderRadius: 1 }} />
          42 · national-level only
        </span>
      </div>
    </figure>
  );
}
