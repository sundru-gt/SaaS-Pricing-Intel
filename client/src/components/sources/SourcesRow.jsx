import { ExternalLink, ShieldCheck, CheckCircle2 } from "lucide-react";
import SoftwareLogo from "../shared/SoftwareLogo.jsx";

/**
 * Intelligent helper to match a source entry to vendor dataset metadata.
 */
function getSourceVendorMeta(source, vendors = []) {
  if (!source) return { name: "Software", logoText: "SW", rate: "Official Rate Sheet" };

  const sName = (source.name || "").toLowerCase();
  const sUrl = (source.url || "").toLowerCase();

  const matched = vendors.find((v) => {
    const vId = (v.id || "").toLowerCase();
    const vShort = (v.shortName || "").toLowerCase();
    const vName = (v.name || "").toLowerCase();

    return (
      sUrl.includes(vId) ||
      sName.includes(vShort) ||
      sName.includes(vName) ||
      vName.includes(sName)
    );
  });

  if (matched) {
    return {
      name: matched.name,
      shortName: matched.shortName,
      logoText: matched.logoText || matched.shortName.substring(0, 2).toUpperCase(),
      rate: matched.cheapestPaidPlanSummary ? matched.cheapestPaidPlanSummary.split("billed")[0].trim() : "Verified Rates",
      url: source.url || matched.sourceUrl,
      verified: matched.verifiedDate || source.verified || "2026",
    };
  }

  const cleanName = source.name
    .replace(/Official Pricing|Pricing Page|Pricing|Editions|Structure|Plans/gi, "")
    .trim();

  const words = cleanName.split(" ").filter(Boolean);
  const logoText = words.length >= 2
    ? (words[0][0] + words[1][0]).toUpperCase()
    : cleanName.substring(0, 2).toUpperCase() || "SW";

  return {
    name: cleanName || source.name,
    shortName: cleanName || source.name,
    logoText,
    rate: "Official Rate Card",
    url: source.url,
    verified: source.verified || "2026",
  };
}

export default function SourcesRow({ sources = [], vendors = [] }) {
  if (!sources || sources.length === 0) return null;

  return (
    <div className="space-y-2">
      <div className="flex items-center justify-between text-xs">
        <div className="flex items-center gap-1.5 font-mono text-[10px] sm:text-[11px] uppercase tracking-wider text-muted-foreground font-semibold">
          <ShieldCheck className="w-3.5 h-3.5 text-emerald-500" />
          <span>Verified Rate Sources ({sources.length})</span>
        </div>
        <span className="text-[10px] font-mono text-muted-foreground">
          Official Vendor Pricing
        </span>
      </div>

      <div className="grid grid-cols-2 sm:grid-cols-4 gap-2.5">
        {sources.map((source, idx) => {
          const meta = getSourceVendorMeta(source, vendors);

          return (
            <a
              key={idx}
              href={meta.url}
              target="_blank"
              rel="noopener noreferrer"
              className="flex flex-col justify-between p-3 rounded-xl border border-border bg-card hover:bg-muted/40 hover:border-foreground/30 transition-all duration-150 group shadow-2xs hover:shadow-xs"
              title={`Open official ${meta.name} pricing rate sheet in new tab`}
            >
              <div className="space-y-2">
                <div className="flex items-start justify-between gap-1.5">
                  {/* Software Official Logo with Monogram Fallback */}
                  <SoftwareLogo
                    name={meta.name}
                    url={meta.url}
                    logoText={meta.logoText}
                    size="sm"
                  />
                  <ExternalLink className="w-3 h-3 text-muted-foreground group-hover:text-foreground group-hover:translate-x-0.5 group-hover:-translate-y-0.5 transition-all flex-shrink-0" />
                </div>

                <div>
                  <h4 className="text-xs font-bold text-foreground truncate group-hover:text-foreground">
                    {meta.name}
                  </h4>
                  <span className="text-[10px] font-mono text-muted-foreground block truncate mt-0.5">
                    {meta.rate}
                  </span>
                </div>
              </div>

              <div className="flex items-center gap-1 mt-2.5 pt-2 border-t border-border/60 text-[10px] font-mono text-muted-foreground">
                <CheckCircle2 className="w-3 h-3 text-emerald-500 flex-shrink-0" />
                <span className="truncate">Verified 2026</span>
              </div>
            </a>
          );
        })}
      </div>
    </div>
  );
}
