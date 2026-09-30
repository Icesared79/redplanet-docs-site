import { createClient, SupabaseClient } from "@supabase/supabase-js";
import { unstable_cache } from "next/cache";

// Live headline figures for the stat block (page 01) and the three inline
// green-dot counts (pages 01, 02, 07). Server-only: the service-role key
// never reaches the client, matching the pattern already live on
// redplanetdata.com (red-planet-homepage/lib/atlas-live.ts).
//
// "Verified records" is governed by atlas's NON-NEGOTIABLE canonical-metrics
// rule (Levelpie/atlas/docs/cc-rules-reference.md, "Headline metrics — single
// source of truth"): no surface computes its own, and a failure renders
// "metrics unavailable" rather than a fallback number. So that one field
// mirrors the canonical query exactly (atlas_verified_record_counts,
// table_class='external_ingest' — the same filter
// runners/canonical_metrics.py and atlas-dash/lib/verified-records.ts use)
// and NEVER falls back to the README figure.
//
// Active sources, classified parcels and distress filings are not "record
// count" headlines under that rule (no canonical function computes them
// today), so they follow the design brief's fallback behavior: read the
// live table, and if it is unavailable, use the README's documented figure
// and log why.

export type MetricField = {
  value: number | null;
  live: boolean;
  reason?: string;
};

export type AtlasMetrics = {
  verifiedRecords: MetricField;
  activeSources: MetricField;
  classifiedParcels: MetricField;
  distressFilings: MetricField;
};

// Fallbacks as documented in design_handoff_atlas_docs/README.md, "Live counts" (9/2026).
const FALLBACK = {
  verifiedRecords: 515121435,
  activeSources: 304,
  classifiedParcels: 22850817,
  distressFilings: 235691,
};

const SUPABASE_URL = process.env.NEXT_PUBLIC_SUPABASE_URL;
const SUPABASE_SERVICE_ROLE_KEY = process.env.SUPABASE_SERVICE_ROLE_KEY;

let client: SupabaseClient | null = null;
function getClient(): SupabaseClient | null {
  if (!SUPABASE_URL || !SUPABASE_SERVICE_ROLE_KEY) return null;
  if (!client) {
    client = createClient(SUPABASE_URL, SUPABASE_SERVICE_ROLE_KEY, {
      auth: { persistSession: false },
    });
  }
  return client;
}

// Classified parcels: atlas_properties.quality_tier is set by
// runners/run_quality_backfill.py to 'verified' | 'usable' | 'review' |
// 'unreliable' once a record has been scored; it defaults to 'unvalidated'
// beforehand. "Classified" = has actually been scored.
const QUALITY_TIERS = ["verified", "usable", "review", "unreliable"] as const;

async function fetchVerifiedRecords(
  sb: SupabaseClient
): Promise<MetricField> {
  const { data, error } = await sb
    .from("atlas_verified_record_counts")
    .select("exact_count")
    .eq("table_class", "external_ingest");
  if (error || !data) {
    return { value: null, live: false, reason: error?.message ?? "no data" };
  }
  const total = data.reduce((sum, row) => sum + Number(row.exact_count ?? 0), 0);
  return { value: total, live: true };
}

async function fetchActiveSources(sb: SupabaseClient): Promise<MetricField> {
  // Same source atlas-dash and redplanetdata.com read: a maintained cache
  // key, falling back to a live count of non-offline sources.
  const cached = await sb
    .from("atlas_stats_cache")
    .select("value")
    .eq("key", "active_sources_total")
    .maybeSingle();
  const cachedValue = Number(cached.data?.value);
  if (Number.isFinite(cachedValue) && cachedValue > 0) {
    return { value: cachedValue, live: true };
  }
  const counted = await sb
    .from("atlas_source_baselines")
    .select("*", { count: "exact", head: true })
    .neq("health_status", "offline");
  if (counted.error || counted.count == null) {
    return {
      value: FALLBACK.activeSources,
      live: false,
      reason: counted.error?.message ?? "no cache row and no count",
    };
  }
  return { value: counted.count, live: true };
}

async function fetchClassifiedParcels(sb: SupabaseClient): Promise<MetricField> {
  const { count, error } = await sb
    .from("atlas_properties")
    .select("*", { count: "exact", head: true })
    .in("quality_tier", QUALITY_TIERS as unknown as string[]);
  if (error || count == null) {
    return {
      value: FALLBACK.classifiedParcels,
      live: false,
      reason: error?.message ?? "no count",
    };
  }
  return { value: count, live: true };
}

async function fetchDistressFilings(sb: SupabaseClient): Promise<MetricField> {
  const { count, error } = await sb
    .from("atlas_distress_filings")
    .select("*", { count: "exact", head: true });
  if (error || count == null) {
    return {
      value: FALLBACK.distressFilings,
      live: false,
      reason: error?.message ?? "no count",
    };
  }
  return { value: count, live: true };
}

async function fetchAtlasMetrics(): Promise<AtlasMetrics> {
  const sb = getClient();
  if (!sb) {
    const reason = "SUPABASE env vars not configured on this deployment";
    console.error("[metrics] " + reason);
    return {
      verifiedRecords: { value: null, live: false, reason },
      activeSources: { value: FALLBACK.activeSources, live: false, reason },
      classifiedParcels: { value: FALLBACK.classifiedParcels, live: false, reason },
      distressFilings: { value: FALLBACK.distressFilings, live: false, reason },
    };
  }

  const [verifiedRecords, activeSources, classifiedParcels, distressFilings] =
    await Promise.all([
      fetchVerifiedRecords(sb),
      fetchActiveSources(sb),
      fetchClassifiedParcels(sb),
      fetchDistressFilings(sb),
    ]);

  for (const [name, field] of Object.entries({
    verifiedRecords,
    activeSources,
    classifiedParcels,
    distressFilings,
  })) {
    if (!field.live) {
      console.error(
        `[metrics] ${name} unavailable, ${field.value === null ? "no fallback rendered" : "using README fallback"}: ${field.reason}`
      );
    }
  }

  return { verifiedRecords, activeSources, classifiedParcels, distressFilings };
}

// Refreshed nightly, per the brief. Vercel's data cache persists this across
// requests until revalidation or a deploy.
export const getAtlasMetrics = unstable_cache(
  fetchAtlasMetrics,
  ["atlas-docs-metrics-v1"],
  { revalidate: 86400, tags: ["atlas-docs-metrics"] }
);
