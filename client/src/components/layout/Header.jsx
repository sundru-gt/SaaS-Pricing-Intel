import { useState, useEffect } from "react";
import { Moon, Sun, DollarSign, IndianRupee, Layers, Share2, Check } from "lucide-react";
import { getCategoryTheme } from "../../lib/categoryTheme.js";

export default function Header({
  categoryName,
  categoryId,
  currency,
  onCurrencyToggle,
  onOpenVendorDesk,
  onResetAll,
  vendorCount = 0,
  onShowToast,
}) {
  const [darkMode, setDarkMode] = useState(false);
  const [copied, setCopied] = useState(false);

  useEffect(() => {
    const saved = localStorage.getItem("saas_theme");
    const isDark =
      saved === "dark" ||
      (!saved && window.matchMedia("(prefers-color-scheme: dark)").matches);
    if (isDark) {
      document.documentElement.classList.add("dark");
      setDarkMode(true);
    }
  }, []);

  const toggleTheme = () => {
    if (darkMode) {
      document.documentElement.classList.remove("dark");
      localStorage.setItem("saas_theme", "light");
      setDarkMode(false);
      onShowToast?.("Switched to Light Mode", "info");
    } else {
      document.documentElement.classList.add("dark");
      localStorage.setItem("saas_theme", "dark");
      setDarkMode(true);
      onShowToast?.("Switched to Dark Mode", "info");
    }
  };

  const handleShare = async () => {
    try {
      if (navigator.share) {
        await navigator.share({
          title: "SaaS Pricing Intelligence",
          text: "Verified B2B SaaS pricing benchmarks, tier comparisons, and seat calculators.",
          url: window.location.href,
        });
      } else {
        await navigator.clipboard.writeText(window.location.href);
        setCopied(true);
        onShowToast?.("Page URL copied to clipboard!");
        setTimeout(() => setCopied(false), 2000);
      }
    } catch {
      // User dismissed
    }
  };

  return (
    <header className="sticky top-0 z-50 w-full border-b border-border/80 bg-background/90 backdrop-blur-xl transition-all shadow-[0_1px_3px_0_rgba(0,0,0,0.03)]">
      <div className="max-w-4xl mx-auto px-3 sm:px-6 h-13 sm:h-14 flex items-center justify-between gap-3">
        {/* Brand & Live Benchmark Beacon */}
        <div className="flex items-center gap-2.5 sm:gap-3 min-w-0 flex-shrink">
          <button
            onClick={onResetAll}
            className="flex items-center gap-2 text-left group"
            title="Return to All Software"
          >
            <div className="flex items-center justify-center w-7 h-7 sm:w-8 sm:h-8 rounded-lg bg-foreground text-background font-mono text-xs font-bold shadow-sm flex-shrink-0 group-hover:scale-105 transition-transform">
              <span className="tracking-tighter">//</span>
            </div>
            <div className="min-w-0">
              <div className="flex items-center gap-1.5">
                <span className="font-bold text-xs sm:text-sm tracking-tight text-foreground font-mono">
                  PRICING INTEL
                </span>
                <span className="relative flex h-2 w-2">
                  <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-emerald-400 opacity-75" />
                  <span className="relative inline-flex rounded-full h-2 w-2 bg-emerald-500" />
                </span>
              </div>
              <p className="text-[10px] text-muted-foreground font-mono hidden sm:block truncate">
                Latest 2026 Benchmarks
              </p>
            </div>
          </button>

          {categoryName && categoryName !== "All Software" && (() => {
            const theme = getCategoryTheme(categoryId);
            const Icon = theme.icon;
            return (
              <div className="hidden md:flex items-center gap-1.5 pl-2.5 border-l border-border/80">
                <div className={`w-5 h-5 rounded-md flex items-center justify-center ${theme.bgColor} ${theme.borderColor} border`}>
                  <Icon className={`w-3 h-3 ${theme.color}`} />
                </div>
                <span className="text-xs font-semibold text-foreground truncate max-w-[150px]">
                  {categoryName}
                </span>
              </div>
            );
          })()}
        </div>

        {/* Action Controls */}
        <div className="flex items-center gap-1.5 sm:gap-2 flex-shrink-0">
          {/* Currency Toggle (USD <-> INR) */}
          <button
            onClick={onCurrencyToggle}
            className="flex items-center gap-1 px-2.5 py-1 text-xs font-mono font-medium rounded-lg border border-border bg-card hover:bg-muted/70 text-foreground transition-all shadow-2xs hover:border-foreground/30"
            title={`Toggle currency (Current: ${currency})`}
          >
            {currency === "USD" ? (
              <>
                <DollarSign className="w-3.5 h-3.5 text-muted-foreground" />
                <span className="font-semibold">USD</span>
              </>
            ) : (
              <>
                <IndianRupee className="w-3.5 h-3.5 text-muted-foreground" />
                <span className="font-semibold text-emerald-600 dark:text-emerald-400">INR</span>
              </>
            )}
          </button>

          {/* All Vendors Desk Toggle */}
          <button
            onClick={onOpenVendorDesk}
            className="hidden sm:flex items-center gap-1.5 px-2.5 py-1 text-xs font-medium rounded-lg border border-border bg-card hover:bg-muted/70 text-foreground transition-all shadow-2xs hover:border-foreground/30"
            title="Browse all software vendors index"
          >
            <Layers className="w-3.5 h-3.5 text-muted-foreground" />
            <span>Index</span>
            <span className="text-[10px] font-mono px-1 py-0.2 rounded bg-muted text-muted-foreground font-semibold">
              {vendorCount || 28}
            </span>
          </button>

          {/* Share Action */}
          <button
            onClick={handleShare}
            className="p-1.5 rounded-lg border border-border bg-card hover:bg-muted text-muted-foreground hover:text-foreground transition-all shadow-2xs hover:border-foreground/30"
            title="Share or copy page link"
            aria-label="Share page link"
          >
            {copied ? (
              <Check className="w-3.5 h-3.5 text-emerald-500" />
            ) : (
              <Share2 className="w-3.5 h-3.5" />
            )}
          </button>

          {/* Dark Mode Toggle */}
          <button
            onClick={toggleTheme}
            className="p-1.5 rounded-lg border border-border bg-card hover:bg-muted text-muted-foreground hover:text-foreground transition-all shadow-2xs hover:border-foreground/30"
            title={darkMode ? "Switch to light theme" : "Switch to dark theme"}
            aria-label="Toggle theme"
          >
            {darkMode ? (
              <Sun className="w-3.5 h-3.5 text-amber-400" />
            ) : (
              <Moon className="w-3.5 h-3.5" />
            )}
          </button>
        </div>
      </div>
    </header>
  );
}
