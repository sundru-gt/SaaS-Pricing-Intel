import { useState } from "react";
import { Copy, Share2, ThumbsUp, ThumbsDown, RotateCw, Check } from "lucide-react";

export default function AnswerToolbar({ summaryText, onRefresh, onShowToast }) {
  const [copied, setCopied] = useState(false);
  const [rated, setRated] = useState(null);

  const handleCopy = async () => {
    try {
      await navigator.clipboard.writeText(
        `${summaryText}\n\nSource: ${window.location.href}`
      );
      setCopied(true);
      onShowToast?.("Copied summary & link to clipboard");
      setTimeout(() => setCopied(false), 2000);
    } catch {
      // Clipboard fallback
    }
  };

  const handleShare = async () => {
    try {
      if (navigator.share) {
        await navigator.share({
          title: "SaaS Pricing Intelligence",
          text: summaryText,
          url: window.location.href,
        });
      } else {
        handleCopy();
      }
    } catch {
      // User cancelled
    }
  };

  const handleRate = (direction) => {
    setRated(direction);
    onShowToast?.(
      direction === "up"
        ? "Thank you! Benchmark accuracy feedback recorded."
        : "Feedback received. Rate sheet flagged for review.",
      "info"
    );
    try {
      localStorage.setItem(`saas_rate_${Date.now()}`, direction);
    } catch {}
  };

  return (
    <div className="flex items-center justify-between py-2 px-3 sm:px-4 bg-card border border-border rounded-xl shadow-2xs text-xs max-w-full">
      <div className="flex items-center gap-1 sm:gap-2 min-w-0">
        <button
          onClick={handleCopy}
          className="flex items-center gap-1.5 px-2 py-1 rounded-lg hover:bg-muted text-muted-foreground hover:text-foreground transition-colors text-xs font-medium"
          title="Copy summary and URL"
        >
          {copied ? (
            <Check className="w-3.5 h-3.5 text-emerald-600 dark:text-emerald-400" />
          ) : (
            <Copy className="w-3.5 h-3.5" />
          )}
          <span>{copied ? "Copied" : "Copy"}</span>
        </button>

        <button
          onClick={handleShare}
          className="flex items-center gap-1.5 px-2 py-1 rounded-lg hover:bg-muted text-muted-foreground hover:text-foreground transition-colors text-xs font-medium"
          title="Share"
        >
          <Share2 className="w-3.5 h-3.5" />
          <span>Share</span>
        </button>

        {onRefresh && (
          <button
            onClick={onRefresh}
            className="flex items-center gap-1.5 px-2 py-1 rounded-lg hover:bg-muted text-muted-foreground hover:text-foreground transition-colors text-xs font-medium"
            title="Refresh comparison"
          >
            <RotateCw className="w-3.5 h-3.5" />
            <span className="hidden xs:inline">Regenerate</span>
          </button>
        )}
      </div>

      <div className="flex items-center gap-1 sm:gap-1.5 border-l border-border pl-2 sm:pl-3 flex-shrink-0">
        <span className="text-[10px] font-mono uppercase text-muted-foreground mr-0.5 hidden sm:inline">
          Accurate?
        </span>
        <button
          onClick={() => handleRate("up")}
          className={`p-1 rounded-md transition-colors ${
            rated === "up"
              ? "text-emerald-600 dark:text-emerald-400 bg-emerald-500/10 font-bold"
              : "text-muted-foreground hover:text-foreground"
          }`}
          title="Accurate benchmark"
          aria-label="Accurate"
        >
          <ThumbsUp className="w-3.5 h-3.5" />
        </button>
        <button
          onClick={() => handleRate("down")}
          className={`p-1 rounded-md transition-colors ${
            rated === "down"
              ? "text-rose-600 dark:text-rose-400 bg-rose-500/10 font-bold"
              : "text-muted-foreground hover:text-foreground"
          }`}
          title="Inaccurate benchmark"
          aria-label="Inaccurate"
        >
          <ThumbsDown className="w-3.5 h-3.5" />
        </button>
      </div>
    </div>
  );
}
