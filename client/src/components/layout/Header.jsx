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
    <header className="sticky top-0 z-50 w-full border-b border-[#F4E4E9] dark:border-[#2C2843] bg-[#FEF8FC]/90 dark:bg-[#18162A]/90 backdrop-blur-xl transition-all shadow-[0_1px_8px_rgba(253,213,221,0.25)] dark:shadow-[0_1px_15px_rgba(124,58,237,0.15)] relative overflow-hidden">
      {/* Ambient edge glow accents matching user mockup */}
      <div className="absolute left-0 top-0 w-36 h-full bg-gradient-to-r from-[#FFE8EE]/80 dark:from-[#34217D]/70 to-transparent pointer-events-none transition-all" />
      <div className="absolute right-0 top-0 w-36 h-full bg-gradient-to-l from-[#FDD5DD]/80 dark:from-[#392387]/70 to-transparent pointer-events-none transition-all" />

      <div className="max-w-4xl mx-auto px-3 sm:px-6 h-13 sm:h-14 flex items-center justify-between gap-3 relative z-10">
        {/* Brand & Live Benchmark Beacon */}
        <div className="flex items-center gap-2.5 sm:gap-3 min-w-0 flex-shrink">
          <button
            onClick={onResetAll}
            className="flex items-center gap-2.5 text-left group cursor-pointer"
            title="Return to All Software"
          >
            {/* Logo Badge matching mockup (Wine in light, Vibrant violet in dark) */}
            <div className="flex items-center justify-center w-7 h-7 sm:w-8 sm:h-8 rounded-xl bg-[#8E2631] dark:bg-[#7C3AED] text-white font-mono text-xs font-extrabold shadow-sm dark:shadow-[0_0_12px_rgba(124,58,237,0.45)] flex-shrink-0 group-hover:scale-105 transition-all">
              <span className="tracking-tighter">//</span>
            </div>
            <div className="min-w-0">
              <div className="flex items-center gap-1.5">
                <span className="font-bold text-xs sm:text-sm tracking-tight text-[#261619] dark:text-white font-mono">
                  PRICING INTEL
                </span>
              </div>
              <p className="text-[10px] text-[#7D686E] dark:text-[#8E8BA7] font-mono hidden sm:block truncate">
                Latest 2026 Benchmarks
              </p>
            </div>
          </button>

          {categoryName && categoryName !== "All Software" && (() => {
            const theme = getCategoryTheme(categoryId);
            const Icon = theme.icon;
            return (
              <div className="hidden md:flex items-center gap-1.5 pl-2.5 border-l border-[#F4E4E9] dark:border-[#2C2843]">
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

        {/* Action Controls matching mockup */}
        <div className="flex items-center gap-1.5 sm:gap-2 flex-shrink-0">
          {/* Currency Toggle (USD <-> INR) */}
          <button
            onClick={onCurrencyToggle}
            className="flex items-center gap-1 px-3 py-1.5 text-xs font-mono font-semibold rounded-xl border border-[#F4E4E9] dark:border-[#2C2843] bg-white/90 dark:bg-[#201D38] hover:bg-[#FDF2F5] dark:hover:bg-[#2A2649] text-[#8E2631] dark:text-[#EDE9FE] transition-all shadow-2xs cursor-pointer"
            title={`Toggle currency (Current: ${currency})`}
          >
            {currency === "USD" ? (
              <>
                <DollarSign className="w-3.5 h-3.5 text-[#8E2631]/80 dark:text-[#A78BFA]" />
                <span>USD</span>
                <span className="text-[10px] text-[#7D686E] dark:text-[#8E8BA7] ml-0.5">▾</span>
              </>
            ) : (
              <>
                <IndianRupee className="w-3.5 h-3.5 text-emerald-600 dark:text-emerald-400" />
                <span className="text-emerald-600 dark:text-emerald-400">INR</span>
                <span className="text-[10px] text-[#7D686E] dark:text-[#8E8BA7] ml-0.5">▾</span>
              </>
            )}
          </button>

          {/* All Vendors Desk Toggle */}
          <button
            onClick={onOpenVendorDesk}
            className="hidden sm:flex items-center gap-1.5 px-3 py-1.5 text-xs font-semibold rounded-xl border border-[#F4E4E9] dark:border-[#2C2843] bg-white/90 dark:bg-[#201D38] hover:bg-[#FDF2F5] dark:hover:bg-[#2A2649] text-[#8E2631] dark:text-[#EDE9FE] transition-all shadow-2xs cursor-pointer"
            title="Browse all software vendors index"
          >
            <Layers className="w-3.5 h-3.5 text-[#8E2631]/80 dark:text-[#A78BFA]" />
            <span>Index</span>
            <span className="text-[10px] font-mono px-1.5 py-0.2 rounded-md bg-[#8E2631] dark:bg-[#7C3AED] text-white font-bold">
              {vendorCount || 31}
            </span>
          </button>

          {/* Share Action */}
          <button
            onClick={handleShare}
            className="p-2 rounded-xl border border-[#F4E4E9] dark:border-[#2C2843] bg-white/90 dark:bg-[#201D38] hover:bg-[#FDF2F5] dark:hover:bg-[#2A2649] text-[#8E2631] dark:text-[#EDE9FE] transition-all shadow-2xs cursor-pointer"
            title="Share or copy page link"
            aria-label="Share page link"
          >
            {copied ? (
              <Check className="w-3.5 h-3.5 text-emerald-500" />
            ) : (
              <Share2 className="w-3.5 h-3.5 text-[#8E2631]/80 dark:text-[#A78BFA]" />
            )}
          </button>

          {/* Theme Toggle Button with ambient rays decoration */}
          <div className="relative">
            {/* Ambient decorative rays above theme toggle as shown in mockup */}
            <div className="absolute -top-1.5 left-1/2 -translate-x-1/2 flex items-center justify-center gap-0.5 pointer-events-none opacity-80">
              <span className="w-0.5 h-1 bg-[#8E2631]/60 dark:bg-[#A78BFA]/70 rounded-full rotate-[-25deg]" />
              <span className="w-0.5 h-1.5 bg-[#8E2631]/80 dark:bg-[#A78BFA] rounded-full" />
              <span className="w-0.5 h-1 bg-[#8E2631]/60 dark:bg-[#A78BFA]/70 rounded-full rotate-[25deg]" />
            </div>

            <button
              onClick={toggleTheme}
              className="p-2 rounded-xl border border-[#F4E4E9] dark:border-[#4338CA]/40 bg-[#FDE2E9] dark:bg-[#2A2350] hover:bg-[#FDD5DD] dark:hover:bg-[#342A68] text-[#8E2631] dark:text-[#EDE9FE] transition-all shadow-2xs dark:shadow-[0_0_12px_rgba(124,58,237,0.3)] cursor-pointer"
              title={darkMode ? "Switch to light theme" : "Switch to dark theme"}
              aria-label="Toggle theme"
            >
              {darkMode ? (
                <Sun className="w-3.5 h-3.5 text-amber-300" />
              ) : (
                <Moon className="w-3.5 h-3.5 text-[#8E2631]" />
              )}
            </button>
          </div>
        </div>
      </div>
    </header>
  );
}
