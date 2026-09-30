import Link from "next/link";
import { PageHeader, Lead, H2, Body, TableWrap, ContactCard, PageFooter } from "@/components/rp/layout";
import { PAGES } from "@/lib/nav";

export const revalidate = 86400;

const SCOPE_ROWS: [string, React.ReactNode][] = [
  ["Licensed to", "An organization, never an individual"],
  ["Unit", "One product, one geography"],
  [
    "Geography",
    "County for Signal and SunScope; state for the data center product. Small rural counties are sold as regional groups, and a metro is several county licenses together",
  ],
  ["Term", "Annual, paid up front"],
  ["Seats", "Unlimited. Every person at the licensed firm can hold a login"],
  ["Changes", "Recorded in an append-only audit log"],
];

export default function LicensingPage() {
  const page = PAGES[5];

  return (
    <article style={{ display: "flex", flexDirection: "column", gap: 20 }}>
      <PageHeader page={page} />
      <Lead>
        A license is an organization&apos;s right to use one product in one geography for one
        year. That is the whole model. There is no per-seat pricing, no per-lead or
        per-lookup charge, no credits, and no feature menu. A firm decides which product it
        needs and which counties or states it works in, and everyone at the firm gets
        access.
      </Lead>

      <H2 id="li-scope">How a License Is Scoped</H2>
      <TableWrap>
        <table className="rp-table" style={{ fontSize: 15, borderTop: "1px solid var(--rule-ink)" }}>
          <tbody>
            {SCOPE_ROWS.map(([term, body]) => (
              <tr key={term}>
                <td
                  style={{
                    width: 180,
                    height: "auto",
                    padding: "16px 24px 16px 0",
                    verticalAlign: "top",
                    font: "400 13px/1.5 var(--font-mono)",
                    color: "var(--fg-3)",
                  }}
                >
                  {term}
                </td>
                <td style={{ height: "auto", padding: "16px 0", verticalAlign: "top", lineHeight: 1.5 }}>
                  {body}
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </TableWrap>
      <Body>
        A firm that works several counties licenses each of them. A firm that works one
        product across two states licenses two geographies. Nothing else changes the
        price.
      </Body>

      <H2 id="li-incl">What a License Includes</H2>
      <Body>
        The full record for that product in that geography, updated nightly, with every
        verified entry tied to its source document. Signal licensees receive the distress
        record as filings are captured, carrying the real filing date. Data center
        licensees receive the jurisdiction record, the hearing calendar, siting layers and,
        where active, the site suitability score. Exports of the licensed record are a
        license right rather than a separate product.
      </Body>

      <H2 id="li-new">Licensing a Geography We Have Not Built Yet</H2>
      <Body>
        Atlas holds a baseline everywhere and full depth where customers are. If your
        geography is not yet built to full depth, we build it as part of the license. The
        parcel spine, the transaction layer and the distress vectors that exist in that
        jurisdiction are connected and verified in days, using the same method and the same
        quality floor as every open market, and the license starts when the market clears
        the bar described under{" "}
        <Link href="/coverage" className="rp-underline-link">
          Coverage
        </Link>
        . A firm does not wait a quarter for a new geography; it waits days.
      </Body>

      <H2 id="li-who">Who We License To</H2>
      <Body>
        Atlas is built for firms that are underserved by the enterprise data providers:
        regional brokerages, investment firms, installers, insurers, developers, land-use
        practices and consultants that need a deep record for the places they actually work
        rather than a shallow national feed priced for a national institution. Licenses are
        sold to firms; we do not license to individual homeowners or consumers.
      </Body>
      <ContactCard>
        To license Atlas or discuss a geography, contact{" "}
        <a
          href="mailto:hello@redplanetdata.com"
          className="rp-mailto"
          style={{
            color: "var(--fg-1)",
            textDecoration: "underline",
            textDecorationThickness: 1,
            textUnderlineOffset: 5,
            textDecorationColor: "var(--rule-strong)",
          }}
        >
          hello@redplanetdata.com
        </a>
        .
      </ContactCard>

      <PageFooter page={page} />
    </article>
  );
}
