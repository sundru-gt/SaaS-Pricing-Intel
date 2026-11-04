import { useState } from "react";
import { Check, ArrowRight, LayoutGrid, Columns } from "lucide-react";
import SoftwareLogo from "../shared/SoftwareLogo.jsx";
import { getCategoryTheme } from "../../lib/categoryTheme.js";

export default function ResultCards({
  vendors = [],
  selectedForCompare = [],
  onToggleCompare,
  onOpenDetails,
  onOpenComparePanel,
  onShowToast,
}) {
  const [viewMode, setViewMode] = useState("grid"); // "grid" | "carousel"

  if (!vendors || vendors.length === 0) {
    return (
      <div className="bg-card border border-border rounded-xl p-8 text-center space-y-2">
        <p className="font-semibold text-xs sm:text-sm text-foreground">
          No matching software vendors found
        </p>
        <p className="text-xs text-muted-foreground">
          Try clearing subcategory filters or searching a different keyword.
        </p>
      </div>
    );
  }

  const handleCompareClick = (vendor) => {
    const isAlready = selectedForCompare.some((v) => v.id === vendor.id);
    if (!isAlready && selectedForCompare.length >= 3) {
      onShowToast?.("Maximum 3 vendors can be compared simultaneously", "error");
      return;
    }
    onToggleCompare(vendor);
    if (isAlready) {
      onShowToast?.(`Removed ${vendor.name} from comparison`, "info");
    } else {
      onShowToast?.(`Added ${vendor.name} to comparison matrix`);
    }
  };

  return (
    <div id="results-section" className="space-y-3.5 scroll-mt-20">
      {/* Cards Header & View Controls */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-2 border-b border-border/80 pb-3">
        <div>
          <div className="flex items-center gap-2">
            <h3 className="font-semibold text-xs sm:text-sm text-foreground uppercase tracking-wider font-mono">
              Benchmarked Software ({vendors.length})
            </h3>
          </div>
          <p className="text-xs text-muted-foreground">
            Compare plans, seat allocations, starting rates, and verified rate sheets.
          </p>
        </div>

        {/* View Switcher: Grid vs Horizontal Carousel */}
        <div className="flex items-center gap-1.5 self-end sm:self-auto">
          <span className="text-[11px] font-mono text-muted-foreground hidden xs:inline">
            Layout:
          </span>
          <div className="flex items-center p-0.5 bg-muted/60 border border-border rounded-lg">
            <button
              onClick={() => setViewMode("grid")}
              className={`p-1.5 rounded-md transition-all cursor-pointer ${
                viewMode === "grid"
                  ? "bg-card text-foreground shadow-2xs font-semibold"
                  : "text-muted-foreground hover:text-foreground"
              }`}
              title="Grid View"
              aria-label="Grid View"
            >
              <LayoutGrid className="w-3.5 h-3.5" />
            </button>
            <button
              onClick={() => setViewMode("carousel")}
              className={`p-1.5 rounded-md transition-all cursor-pointer ${
                viewMode === "carousel"
                  ? "bg-card text-foreground shadow-2xs font-semibold"
                  : "text-muted-foreground hover:text-foreground"
              }`}
              title="Horizontal Scroll Carousel"
              aria-label="Horizontal Scroll Carousel"
            >
              <Columns className="w-3.5 h-3.5" />
            </button>
          </div>
        </div>
      </div>

      {/* Cards Container: Grid OR Horizontal Sideways Scroll */}
      <div
        className={
          viewMode === "carousel"
            ? "flex items-stretch gap-4 overflow-x-auto pb-4 pt-1 scrollbar-none snap-x snap-mandatory"
            : "grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4 pb-2 pt-1"
        }
      >
        {vendors.map((vendor) => {
          const isSelected = selectedForCompare.some((v) => v.id === vendor.id);
          const theme = getCategoryTheme(vendor.categoryId);
          const CatIcon = theme.icon;

          return (
            <div
              key={vendor.id}
              className={`flex flex-col justify-between bg-card rounded-2xl border p-4 sm:p-5 transition-all duration-200 relative shadow-2xs hover:shadow-xl hover:-translate-y-0.5 group overflow-hidden ${
                viewMode === "carousel"
                  ? "w-[305px] sm:w-[350px] flex-shrink-0 snap-start"
                  : "w-full"
              } ${
                isSelected
                  ? "border-foreground/80 ring-2 ring-foreground/20 bg-muted/15"
                  : "border-border hover:border-foreground/35"
              }`}
            >
              {/* Subtle top theme accent bar */}
              <div
                className={`absolute top-0 left-4 right-4 h-[2.5px] rounded-full opacity-80 ${theme.color.replace(
                  "text-",
                  "bg-"
                )}`}
              />

              <div className="space-y-3">
                {/* Header: Logo + Company Name on ONE clean line at the top */}
                <div className="flex items-center justify-between gap-2 pt-0.5">
                  <div className="flex items-center gap-2.5 min-w-0 flex-1">
                    <SoftwareLogo
                      name={vendor.name}
                      url={vendor.sourceUrl}
                      logoText={vendor.logoText || vendor.shortName.substring(0, 2).toUpperCase()}
                      size="md"
                    />
                    <h4
                      className="font-bold text-sm sm:text-base text-foreground leading-tight tracking-tight truncate whitespace-nowrap"
                      title={vendor.name}
                    >
                      {vendor.name}
                    </h4>
                  </div>

                  {/* Category Pill on the top right */}
                  <div className="flex items-center gap-1 px-2 py-0.5 rounded-full bg-card border border-border flex-shrink-0 shadow-2xs">
                    <div
                      className={`w-3.5 h-3.5 rounded flex items-center justify-center ${theme.bgColor}`}
                    >
                      <CatIcon className={`w-2 h-2 ${theme.color}`} />
                    </div>
                    <span className={`text-[10px] font-mono font-semibold ${theme.color}`}>
                      {theme.name}
                    </span>
                  </div>
                </div>

                {/* Sub-badge if present (e.g. "Best for Product Event Funnels") */}
                {vendor.badge && (
                  <div className="flex items-center gap-1.5">
                    <span className="text-[10px] font-mono font-medium px-2 py-0.5 rounded-md bg-muted/80 text-foreground border border-border/70 truncate">
                      ★ {vendor.badge}
                    </span>
                  </div>
                )}

                {/* Clean 2-Line Summary */}
                <p className="text-xs sm:text-[13px] text-muted-foreground/90 line-clamp-2 leading-relaxed font-normal">
                  {vendor.description}
                </p>

                {/* Pricing & Free Tier Section */}
                <div className="rounded-xl p-3 bg-muted/35 dark:bg-zinc-900/60 border border-border/80 space-y-2">
                  <div className="space-y-0.5">
                    <span className="text-[10px] font-mono uppercase tracking-wider text-muted-foreground font-bold block">
                      Starting Rate
                    </span>
                    <div className="text-xs sm:text-sm font-bold font-mono text-foreground leading-snug break-words">
                      {vendor.cheapestPaidPlanSummary}
                    </div>
                  </div>

                  <div className="flex items-center justify-between text-xs pt-1.5 border-t border-border/50">
                    <span className="text-[10px] font-mono uppercase tracking-wider text-muted-foreground font-semibold">
                      Free Tier
                    </span>
                    {vendor.hasFreePlan ? (
                      <span className="inline-flex items-center gap-1.5 px-2 py-0.5 rounded-full text-[11px] font-mono font-bold bg-emerald-500/10 text-emerald-600 dark:text-emerald-400 border border-emerald-500/25">
                        <span className="w-1.5 h-1.5 rounded-full bg-emerald-500 animate-pulse" />
                        <span>Included Free</span>
                      </span>
                    ) : (
                      <span className="inline-flex items-center gap-1 px-2 py-0.5 rounded-full text-[11px] font-mono text-muted-foreground bg-muted border border-border/60">
                        <span className="w-1.5 h-1.5 rounded-full bg-muted-foreground/60" />
                        <span>Trial Only</span>
                      </span>
                    )}
                  </div>
                </div>

                {/* Features Highlights */}
                {vendor.features && vendor.features.length > 0 && (
                  <div className="space-y-1 pt-0.5">
                    {vendor.features.slice(0, 2).map((feat, fi) => (
                      <div
                        key={fi}
                        className="flex items-center gap-1.5 text-[11px] text-muted-foreground leading-tight"
                      >
                        <span className="w-1 h-1 rounded-full bg-foreground/40 flex-shrink-0" />
                        <span className="truncate">{feat}</span>
                      </div>
                    ))}
                  </div>
                )}
              </div>

              {/* Card Footer: Compare Checkbox & Details Button */}
              <div className="pt-3 mt-3 border-t border-border/80 flex items-center justify-between gap-2">
                {/* Compare Checkbox */}
                <button
                  type="button"
                  onClick={() => handleCompareClick(vendor)}
                  className={`flex items-center gap-1.5 px-3 py-1.5 rounded-xl text-xs font-semibold transition-all border cursor-pointer ${
                    isSelected
                      ? "bg-foreground text-background border-foreground shadow-2xs"
                      : "bg-card hover:bg-muted text-foreground border-border hover:border-foreground/30"
                  }`}
                  aria-pressed={isSelected}
                >
                  <div
                    className={`w-3.5 h-3.5 rounded flex items-center justify-center border ${
                      isSelected
                        ? "bg-background text-foreground border-background"
                        : "border-muted-foreground/40"
                    }`}
                  >
                    {isSelected && <Check className="w-2.5 h-2.5 stroke-[3]" />}
                  </div>
                  <span>{isSelected ? "Comparing" : "Compare"}</span>
                </button>

                {/* Details Button */}
                <button
                  type="button"
                  onClick={() => onOpenDetails(vendor)}
                  className="flex items-center gap-1 text-xs font-semibold text-muted-foreground hover:text-foreground transition-colors p-1.5 group cursor-pointer"
                >
                  <span>Details</span>
                  <ArrowRight className="w-3.5 h-3.5 group-hover:translate-x-0.5 transition-transform" />
                </button>
              </div>
            </div>
          );
        })}
      </div>

      {/* Floating Compare Action Bar */}
      {selectedForCompare.length > 0 && (
        <div className="fixed bottom-20 left-1/2 -translate-x-1/2 z-40 bg-foreground text-background px-3.5 sm:px-4 py-2.5 rounded-2xl shadow-2xl flex items-center justify-between sm:justify-start gap-3.5 border border-background/20 animate-in slide-in-from-bottom duration-200 w-[calc(100vw-2rem)] max-w-md sm:w-auto">
          {/* Selected Vendor Monogram Avatars */}
          <div className="flex items-center gap-2.5 min-w-0">
            <div className="flex -space-x-2 overflow-hidden">
              {selectedForCompare.map((v) => (
                <div
                  key={v.id}
                  className="w-6 h-6 rounded-full bg-background text-foreground flex items-center justify-center font-mono font-bold text-[9px] border-2 border-foreground flex-shrink-0"
                  title={v.name}
                >
                  {v.logoText || v.shortName.substring(0, 2)}
                </div>
              ))}
            </div>

            <span className="text-xs font-bold font-mono truncate">
              {selectedForCompare.length} / 3 selected
            </span>
          </div>

          <div className="flex items-center gap-2 flex-shrink-0">
            <button
              onClick={onOpenComparePanel}
              className="bg-background text-foreground text-xs font-bold px-3 py-1.5 rounded-xl hover:opacity-90 transition-opacity shadow-sm cursor-pointer"
            >
              Compare Matrix ({selectedForCompare.length})
            </button>
            <button
              onClick={() => onToggleCompare(null)}
              className="text-xs text-background/70 hover:text-background px-1.5 py-1 cursor-pointer"
              title="Clear selection"
            >
              Clear
            </button>
          </div>
        </div>
      )}
    </div>
  );
}
