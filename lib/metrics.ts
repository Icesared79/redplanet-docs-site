// The headline figures the overview page shows in prose and in the stat block.
//
// These used to be read from the database at request time with a service-role
// key. Those env vars were never set on this deployment, so every visitor saw
// "metrics unavailable" for verified records and a zero for each of the three
// secondary counts. They now come from the committed snapshot in
// data/atlas-snapshot.json, which is how every other visual on this site is
// filled: the public site holds no database credential and puts no load on the
// shared instance, and a refresh is one script run plus a commit. See
// scripts/build_atlas_snapshot.py.
//
// Verified records is still governed by atlas's NON-NEGOTIABLE canonical-metrics
// rule (Levelpie/atlas/docs/cc-rules-reference.md, "Headline metrics -- single
// source of truth"): the snapshot's value is produced by
// runners/canonical_metrics.py's total_verified() and by nothing else. No
// fallback number is ever substituted -- if the snapshot has no value, the page
// renders "metrics unavailable", exactly as before.
import { SNAPSHOT } from "@/lib/snapshot";

export type MetricField = {
  value: number | null;
  live: boolean;
  reason?: string;
};

export type AtlasMetrics = {
  verifiedRecords: MetricField;
  activeSources: MetricField;
  classifiedParcels: MetricField;
  distressRecords: MetricField;
  /** The snapshot date, for the "as of" line the stat block carries. */
  asOf: string;
};

const field = (value: number | null | undefined): MetricField =>
  value == null
    ? { value: null, live: false, reason: "not present in the Atlas snapshot" }
    : { value, live: true };

export async function getAtlasMetrics(): Promise<AtlasMetrics> {
  const m: AtlasMetrics = {
    verifiedRecords: field(SNAPSHOT.verified_records),
    activeSources: field(SNAPSHOT.active_sources),
    classifiedParcels: field(SNAPSHOT.classified_parcels),
    distressRecords: field(SNAPSHOT.distress_records),
    asOf: SNAPSHOT.as_of_label,
  };
  for (const [name, f] of Object.entries(m)) {
    if (typeof f === "object" && f !== null && "live" in f && !f.live) {
      console.error(`[metrics] ${name} unavailable: ${(f as MetricField).reason}`);
    }
  }
  return m;
}
