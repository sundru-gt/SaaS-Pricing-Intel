import { useState, useEffect, useRef } from "react";
import { ChevronDown, ChevronUp, ExternalLink, Copy, Check, Clock, Sparkles, ShieldCheck } from "lucide-react";
import SoftwareLogo from "../shared/SoftwareLogo.jsx";
import { generateSummaryApi } from "../../lib/api.js";

/**
 * Intelligent helper to match a source entry to vendor dataset metadata.
 */
function getSourceVendorMeta(source, vendors = []) {
  if (!source) return { name: "Software", logoText: "SW", rate: "Official Rate Sheet" };

  const sName = (source.name || "").toLowerCase();
  const sUrl = (source.url || "").toLowerCase();

  // Try to find matching vendor from vendors list
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
      rate: matched.cheapestPaidPlanSummary ? matched.cheapestPaidPlanSummary.split("billed")[0].trim() : "Verified Plan Rates",
      fullRate: matched.cheapestPaidPlanSummary,
      hasFree: matched.hasFreePlan,
      url: source.url || matched.sourceUrl,
      verified: matched.verifiedDate || source.verified || "2026",
    };
  }

  // Fallback if not directly matched to vendor
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
    fullRate: "Verified Rate Sheet",
    hasFree: false,
    url: source.url,
    verified: source.verified || "2026",
  };
}

export default function SummarySection({
  summaryText = "",
  sources = [],
  vendors = [],
  query = "",
  categoryName = "",
  currency = "USD",
  onShowToast,
}) {
  const [displayedText, setDisplayedText] = useState(summaryText);
  const [isGenerating, setIsGenerating] = useState(false);
  const [sourceType, setSourceType] = useState("deterministic");
  const [expanded, setExpanded] = useState(false);
  const [copied, setCopied] = useState(false);
  const typewriterRef = useRef(null);

  // Generate / Stream AI Summary on query or category change
  useEffect(() => {
    let isCancelled = false;

    async function loadSummary() {
      setIsGenerating(true);
      setDisplayedText(""); // Clear for live typing effect

      try {
        const result = await generateSummaryApi({
          query,
          categoryName,
          vendors,
          currency,
          fallbackTemplate: summaryText,
        });

        if (isCancelled) return;

        const target = result?.summary || summaryText;
        setSourceType(result?.source || "fallback");

        // Typewriter streaming effect
        let currentIdx = 0;
        const stepSize = Math.max(2, Math.floor(target.length / 50));

        clearInterval(typewriterRef.current);
        typewriterRef.current = setInterval(() => {
          if (isCancelled) return;
          currentIdx += stepSize;
          if (currentIdx >= target.length) {
            setDisplayedText(target);
            setIsGenerating(false);
            clearInterval(typewriterRef.current);
          } else {
            setDisplayedText(target.slice(0, currentIdx));
          }
        }, 18);
      } catch {
        if (!isCancelled) {
          setDisplayedText(summaryText);
          setIsGenerating(false);
        }
      }
    }

    loadSummary();

    return () => {
      isCancelled = true;
      clearInterval(typewriterRef.current);
    };
  }, [summaryText, query, categoryName, currency]);

  const handleCopy = async () => {
    try {
      const textToCopy = displayedText || summaryText;
      await navigator.clipboard.writeText(textToCopy);
      setCopied(true);
      onShowToast?.("Copied summary to clipboard");
      setTimeout(() => setCopied(false), 2000);
    } catch {
      // Failed to copy
    }
  };

  return (
    <div className="bg-card border border-border rounded-2xl p-4 sm:p-5 shadow-2xs space-y-4 transition-all hover:border-border/90 relative overflow-hidden">
      {/* Decorative subtle top edge glow */}
      <div className="absolute top-0 left-0 right-0 h-[1.5px] bg-gradient-to-r from-transparent via-foreground/20 to-transparent" />

      {/* Header Info */}
      <div className="flex items-center justify-between gap-2">
        <div className="flex items-center gap-2 min-w-0">
          <div className="flex items-center justify-center w-5 h-5 rounded-md bg-emerald-500/10 text-emerald-600 dark:text-emerald-400 flex-shrink-0">
            <Sparkles className="w-3 h-3" />
          </div>
          <span className="font-mono text-[11px] font-semibold text-foreground uppercase tracking-wider truncate">
            Pricing Intelligence Summary
          </span>
        </div>

        <div className="flex items-center gap-2 text-[11px] font-mono text-muted-foreground flex-shrink-0">
          <div className="flex items-center gap-1">
            <Clock className="w-3 h-3" />
            <span>1 min read</span>
          </div>
          <span className="text-border">•</span>
          <button
            onClick={handleCopy}
            className="flex items-center gap-1 hover:text-foreground transition-colors p-1 rounded hover:bg-muted cursor-pointer"
            title="Copy summary text"
          >
            {copied ? (
              <Check className="w-3 h-3 text-emerald-500" />
            ) : (
              <Copy className="w-3 h-3" />
            )}
            <span className="hidden sm:inline">{copied ? "Copied" : "Copy"}</span>
          </button>
        </div>
      </div>

      {/* Summary Body with Live Typewriter Stream */}
      <div className="text-xs sm:text-sm text-foreground/90 leading-relaxed font-normal space-y-2">
        <p className={expanded ? "" : "line-clamp-2"}>
          {displayedText}
          {isGenerating && (
            <span className="inline-block w-1.5 h-3.5 ml-1 bg-emerald-500 dark:bg-emerald-400 animate-pulse align-middle" />
          )}
        </p>

        {displayedText && displayedText.length > 120 && (
          <button
            onClick={() => setExpanded(!expanded)}
            className="inline-flex items-center gap-1 text-xs font-semibold text-[#8E2631] dark:text-[#A78BFA] hover:underline transition-colors py-0.5 group cursor-pointer"
          >
            <span>{expanded ? "Show less" : "Read more"}</span>
            {expanded ? (
              <ChevronUp className="w-3.5 h-3.5 group-hover:-translate-y-0.5 transition-transform" />
            ) : (
              <ChevronDown className="w-3.5 h-3.5 group-hover:translate-y-0.5 transition-transform" />
            )}
          </button>
        )}
      </div>

      {/* DIRECT VERIFIED SOURCE RATE CARDS WITH LOGOS, NAMES & CLICKABLE PRICING LINKS */}
      {sources && sources.length > 0 && (
        <div className="pt-3 border-t border-border/80 space-y-2.5">
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-1.5 font-mono text-[10px] sm:text-[11px] uppercase tracking-wider font-bold text-foreground">
              <ShieldCheck className="w-3.5 h-3.5 text-emerald-500" />
              <span>Direct Verified Source Rate Cards ({sources.length})</span>
            </div>
            <span className="text-[10px] font-mono text-muted-foreground hidden xs:inline">
              Official Vendor Pricing Links
            </span>
          </div>

          {/* Cards Grid: Software Logo, Name, Pricing Rate, and Clickable Link */}
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-2.5">
            {sources.map((source, idx) => {
              const meta = getSourceVendorMeta(source, vendors);

              return (
                <a
                  key={idx}
                  href={meta.url}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="flex items-center justify-between p-3 rounded-xl border border-border bg-card hover:bg-muted/40 hover:border-foreground/40 transition-all duration-150 group shadow-2xs hover:shadow-xs"
                  title={`Open official ${meta.name} pricing rate sheet in new tab`}
                >
                  <div className="flex items-center gap-2.5 min-w-0 pr-2">
                    {/* Software Official Logo with Monogram Fallback */}
                    <SoftwareLogo
                      name={meta.name}
                      url={meta.url}
                      logoText={meta.logoText}
                      size="md"
                    />

                    {/* Software Name & Pricing Rate */}
                    <div className="min-w-0">
                      <div className="flex items-center gap-1.5">
                        <span className="text-xs font-bold text-foreground truncate group-hover:text-foreground">
                          {meta.name}
                        </span>
                      </div>

                      <div className="flex items-center gap-1.5 text-[11px] text-muted-foreground font-mono mt-0.5 truncate">
                        <span className="text-foreground font-semibold truncate">
                          {meta.rate}
                        </span>
                        {meta.hasFree && (
                          <span className="text-[10px] text-emerald-600 dark:text-emerald-400 font-bold hidden sm:inline">
                            • Free Tier
                          </span>
                        )}
                      </div>
                    </div>
                  </div>

                  {/* Clickable Action & Verified Badge */}
                  <div className="flex flex-col items-end gap-1 flex-shrink-0">
                    <div className="flex items-center gap-1 text-[11px] font-semibold text-muted-foreground group-hover:text-foreground transition-colors font-mono">
                      <span className="hidden xs:inline">View Rates</span>
                      <ExternalLink className="w-3.5 h-3.5 group-hover:translate-x-0.5 group-hover:-translate-y-0.5 transition-transform" />
                    </div>
                    <span className="text-[9px] font-mono text-emerald-600 dark:text-emerald-400 font-medium flex items-center gap-1">
                      <span className="w-1.5 h-1.5 rounded-full bg-emerald-500" />
                      Verified
                    </span>
                  </div>
                </a>
              );
            })}
          </div>
        </div>
      )}
    </div>
  );
}
