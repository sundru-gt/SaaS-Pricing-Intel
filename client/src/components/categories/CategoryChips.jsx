import { useState } from "react";
import {
  ChevronLeft,
  LayoutGrid,
  X,
  Check,
  Layers,
  Sparkles,
} from "lucide-react";
import { getCategoryTheme } from "../../lib/categoryTheme.js";

export default function CategoryChips({
  categories = [],
  activeCategory,
  activeSubType,
  onSelectCategory,
  onSelectSubType,
  onBackToAll,
}) {
  const [sheetOpen, setSheetOpen] = useState(false);

  const isAll = !activeCategory || activeCategory.id === "all";
  const activeTheme = getCategoryTheme(activeCategory?.id);
  const ActiveIcon = activeTheme.icon;

  return (
    <div className="py-1 space-y-2.5">
      {/* Category Navigation Header */}
      <div className="flex items-center justify-between">
        {!isAll ? (
          <div className="flex items-center gap-2">
            <button
              onClick={onBackToAll}
              className="inline-flex items-center gap-1 text-xs font-semibold text-muted-foreground hover:text-foreground transition-colors py-0.5 pr-1.5 group cursor-pointer"
            >
              <ChevronLeft className="w-3.5 h-3.5 group-hover:-translate-x-0.5 transition-transform" />
              <span>All software</span>
            </button>
            <span className="text-border text-xs">/</span>
            <div className="inline-flex items-center gap-1.5 px-2 py-0.5 rounded-full bg-card border border-border text-xs font-semibold text-foreground shadow-2xs">
              <span className={`w-2 h-2 rounded-full ${activeTheme.color.replace('text-', 'bg-')}`} />
              <span>{activeCategory.name} Subtypes</span>
            </div>
          </div>
        ) : (
          <div className="flex items-center gap-1.5 text-[10px] sm:text-[11px] font-mono uppercase tracking-wider font-semibold text-muted-foreground">
            <Layers className="w-3.5 h-3.5 text-foreground/70" />
            <span>Software Categories</span>
          </div>
        )}

        {/* See All Sheet Button */}
        <button
          onClick={() => setSheetOpen(true)}
          className="inline-flex items-center gap-1 text-xs text-muted-foreground hover:text-foreground font-medium px-2 py-0.5 rounded-md hover:bg-muted transition-colors font-mono cursor-pointer"
          title="See all 8 software categories"
        >
          <LayoutGrid className="w-3 h-3" />
          <span>See all (8)</span>
        </button>
      </div>

      {/* Chips Horizontal Row with edge fade */}
      <div className="relative">
        <div className="flex items-center gap-2 overflow-x-auto pb-1 scrollbar-none">
          {isAll ? (
            <>
              {/* All Chip */}
              <button
                onClick={() => onSelectCategory("all")}
                className={`flex-shrink-0 flex items-center gap-2 px-3 py-1.5 rounded-xl text-xs font-medium transition-all shadow-2xs cursor-pointer ${
                  isAll
                    ? "bg-[#8E2631] text-white dark:bg-[#7C3AED] dark:text-white font-bold shadow-sm dark:shadow-[0_0_12px_rgba(124,58,237,0.35)]"
                    : "bg-card border border-border hover:bg-muted text-muted-foreground hover:text-foreground"
                }`}
              >
                <div className="w-5 h-5 rounded-md flex items-center justify-center bg-indigo-500/15 text-indigo-500 border border-indigo-500/30">
                  <Sparkles className="w-3 h-3 text-indigo-500" />
                </div>
                <span>All Software</span>
              </button>

              {/* 8 Categories with Distinctive Modern Colorful Icons */}
              {categories.map((cat) => {
                const theme = getCategoryTheme(cat.id);
                const Icon = theme.icon;

                return (
                  <button
                    key={cat.id}
                    onClick={() => onSelectCategory(cat.id)}
                    className="flex-shrink-0 flex items-center gap-2 px-3 py-1.5 rounded-xl text-xs font-medium bg-card border border-border hover:bg-muted/70 hover:border-foreground/30 text-foreground transition-all shadow-2xs group cursor-pointer"
                  >
                    {/* Colorful Icon Container */}
                    <div
                      className={`w-5 h-5 rounded-md flex items-center justify-center flex-shrink-0 transition-transform group-hover:scale-110 ${theme.bgColor} ${theme.borderColor} border`}
                    >
                      <Icon className={`w-3 h-3 ${theme.color}`} />
                    </div>
                    <span className="font-medium text-foreground">{cat.name}</span>
                  </button>
                );
              })}
            </>
          ) : (
            <>
              {/* Category-specific Sub-types */}
              <button
                onClick={() => onSelectSubType("All")}
                className={`flex-shrink-0 flex items-center gap-1.5 px-3 py-1.5 rounded-xl text-xs font-medium transition-all cursor-pointer ${
                  activeSubType === "All"
                    ? "bg-[#8E2631] text-white dark:bg-[#7C3AED] dark:text-white shadow-sm dark:shadow-[0_0_12px_rgba(124,58,237,0.35)] font-bold"
                    : "bg-card border border-border hover:bg-muted text-muted-foreground hover:text-foreground"
                }`}
              >
                <div className={`w-4 h-4 rounded-md flex items-center justify-center ${activeTheme.bgColor}`}>
                  <ActiveIcon className={`w-2.5 h-2.5 ${activeTheme.color}`} />
                </div>
                <span>All {activeCategory.name}</span>
              </button>

              {activeCategory.subTypes?.map((sub) => {
                const isSelected = activeSubType === sub;
                return (
                  <button
                    key={sub}
                    onClick={() => onSelectSubType(sub)}
                    className={`flex-shrink-0 flex items-center gap-1.5 px-3 py-1.5 rounded-xl text-xs font-medium transition-all cursor-pointer ${
                      isSelected
                        ? "bg-[#8E2631] text-white dark:bg-[#7C3AED] dark:text-white shadow-sm dark:shadow-[0_0_12px_rgba(124,58,237,0.35)] font-bold"
                        : "bg-card border border-border hover:bg-muted hover:border-foreground/30 text-muted-foreground hover:text-foreground"
                    }`}
                  >
                    <span
                      className={`w-1.5 h-1.5 rounded-full ${
                        isSelected ? "bg-white" : activeTheme.color.replace("text-", "bg-")
                      }`}
                    />
                    <span>{sub}</span>
                  </button>
                );
              })}
            </>
          )}
        </div>
      </div>

      {/* "See All Categories" Sheet / Modal */}
      {sheetOpen && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-3 sm:p-6 bg-black/60 backdrop-blur-xs animate-in fade-in duration-150">
          <div className="bg-card rounded-2xl border border-border shadow-2xl w-full max-w-2xl max-h-[85vh] flex flex-col overflow-hidden animate-in zoom-in-98 duration-150">
            <div className="flex items-center justify-between p-4 border-b border-border flex-shrink-0">
              <div>
                <h3 className="font-semibold text-xs sm:text-sm text-foreground uppercase tracking-wider font-mono">
                  Software Taxonomy (8 Categories)
                </h3>
                <p className="text-[11px] text-muted-foreground">
                  Select a vertical to explore pricing tiers and verified rate sheets
                </p>
              </div>
              <button
                onClick={() => setSheetOpen(false)}
                className="p-1 rounded-md hover:bg-muted text-muted-foreground hover:text-foreground transition-colors cursor-pointer"
              >
                <X className="w-4 h-4" />
              </button>
            </div>

            <div className="overflow-y-auto p-4 grid grid-cols-1 sm:grid-cols-2 gap-2.5">
              {categories.map((cat) => {
                const theme = getCategoryTheme(cat.id);
                const Icon = theme.icon;
                const isCurrent = activeCategory?.id === cat.id;

                return (
                  <button
                    key={cat.id}
                    onClick={() => {
                      onSelectCategory(cat.id);
                      setSheetOpen(false);
                    }}
                    className={`flex items-start gap-3 p-3 rounded-xl border text-left transition-all group cursor-pointer ${
                      isCurrent
                        ? "bg-muted/70 border-foreground/60 text-foreground shadow-2xs ring-1 ring-foreground/20"
                        : "bg-card hover:bg-muted/40 hover:border-foreground/30 text-foreground border-border"
                    }`}
                  >
                    {/* Vibrant Themed Icon Box */}
                    <div
                      className={`w-9 h-9 rounded-xl flex items-center justify-center flex-shrink-0 group-hover:scale-105 transition-transform ${theme.bgColor} ${theme.borderColor} border shadow-2xs`}
                    >
                      <Icon className={`w-4 h-4 ${theme.color}`} />
                    </div>

                    <div className="min-w-0 flex-1 space-y-0.5">
                      <div className="flex items-center justify-between gap-1">
                        <span className="text-xs font-bold text-foreground truncate">
                          {cat.name}
                        </span>
                        {isCurrent && (
                          <span className="text-[10px] font-mono font-bold text-foreground bg-foreground/10 px-1.5 py-0.5 rounded-full flex items-center gap-1">
                            <Check className="w-3 h-3 stroke-[3]" />
                            <span>Active</span>
                          </span>
                        )}
                      </div>
                      <p className="text-[11px] text-muted-foreground line-clamp-2 leading-relaxed">
                        {cat.description || `${cat.name} pricing models and tier comparisons`}
                      </p>
                    </div>
                  </button>
                );
              })}
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
