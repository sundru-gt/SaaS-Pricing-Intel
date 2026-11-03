import { useState, useEffect } from "react";
import { Edit2, X, RotateCw, Loader2, ArrowRight, Sparkles } from "lucide-react";

export default function QueryBubble({
  query,
  onUpdateQuery,
  onRegenerate,
  isRegenerating = false,
  onShowToast,
}) {
  const [isEditing, setIsEditing] = useState(false);
  const [editText, setEditText] = useState(query || "");

  useEffect(() => {
    setEditText(query || "");
  }, [query]);

  // Handle escape key to cancel editing
  useEffect(() => {
    const handleKeyDown = (e) => {
      if (e.key === "Escape" && isEditing) {
        setIsEditing(false);
        setEditText(query || "");
      }
    };
    window.addEventListener("keydown", handleKeyDown);
    return () => window.removeEventListener("keydown", handleKeyDown);
  }, [isEditing, query]);

  const handleSubmit = (e) => {
    e.preventDefault();
    if (editText.trim() !== "") {
      if (onRegenerate) {
        onRegenerate(editText.trim());
      } else {
        onUpdateQuery(editText.trim());
      }
      onShowToast?.(`Regenerating intelligence for "${editText.trim()}"`);
    }
    setIsEditing(false);
  };

  const handleCancel = () => {
    setEditText(query || "");
    setIsEditing(false);
  };

  const handleDirectRegenerate = (e) => {
    e.stopPropagation();
    if (isRegenerating) return;
    if (onRegenerate) {
      onRegenerate(query || "All Software");
    } else {
      onUpdateQuery(query || "All Software");
    }
    onShowToast?.(`Recalculating "${query || "All Software"}"`);
  };

  return (
    <div className="flex justify-end my-2 sm:my-3 max-w-full">
      {isEditing ? (
        <form
          onSubmit={handleSubmit}
          className="flex items-center gap-1.5 p-1 bg-card border border-foreground/40 rounded-xl shadow-md w-full max-w-md animate-in fade-in zoom-in-98 duration-150"
        >
          <input
            type="text"
            value={editText}
            onChange={(e) => setEditText(e.target.value)}
            className="flex-1 min-w-0 px-3 py-1.5 text-xs sm:text-sm bg-transparent outline-none text-foreground placeholder:text-muted-foreground font-medium"
            placeholder="Type software or pricing keyword..."
            autoFocus
          />
          <button
            type="submit"
            className="flex-shrink-0 flex items-center gap-1 px-3 py-1.5 rounded-lg bg-foreground text-background text-xs font-semibold hover:opacity-90 transition-opacity shadow-2xs"
            title="Update & regenerate"
          >
            <span>Update</span>
            <ArrowRight className="w-3 h-3" />
          </button>
          <button
            type="button"
            onClick={handleCancel}
            className="p-1.5 rounded-lg hover:bg-muted text-muted-foreground transition-colors flex-shrink-0"
            title="Cancel (Esc)"
          >
            <X className="w-3.5 h-3.5" />
          </button>
        </form>
      ) : (
        <div
          className={`group flex items-center gap-2 p-1.5 pl-3 pr-1.5 rounded-xl border transition-all text-xs sm:text-sm font-medium shadow-2xs max-w-full ${
            isRegenerating
              ? "bg-muted/80 border-foreground/40 text-foreground ring-1 ring-foreground/20 animate-pulse"
              : "bg-card border-border hover:border-foreground/40 text-foreground hover:shadow-xs"
          }`}
        >
          {/* Query text & click-to-edit trigger */}
          <button
            type="button"
            onClick={() => {
              setEditText(query || "");
              setIsEditing(true);
            }}
            className="flex items-center gap-2 text-left py-0.5 min-w-0 flex-1 truncate group-hover:text-foreground"
            title="Click to edit prompt"
            disabled={isRegenerating}
          >
            <span className="inline-flex items-center gap-1 font-mono text-[9px] sm:text-[10px] uppercase tracking-wider text-muted-foreground font-semibold flex-shrink-0 bg-muted px-1.5 py-0.5 rounded">
              <Sparkles className="w-2.5 h-2.5 text-emerald-500" />
              <span>Prompt</span>
            </span>
            <span className="text-foreground font-semibold truncate max-w-[150px] xs:max-w-[200px] sm:max-w-xs">
              {query || "All Software"}
            </span>
            <Edit2 className="w-3 h-3 text-muted-foreground/40 group-hover:text-foreground transition-colors ml-0.5 flex-shrink-0" />
          </button>

          <div className="w-px h-3.5 bg-border mx-0.5 flex-shrink-0" />

          {/* Quick Regenerate Button */}
          <button
            type="button"
            onClick={handleDirectRegenerate}
            disabled={isRegenerating}
            className="flex items-center gap-1 px-2 py-1 rounded-lg hover:bg-muted text-muted-foreground hover:text-foreground transition-all disabled:opacity-50 text-[11px] font-mono flex-shrink-0"
            title="Trigger 1s dissolution & 1s AI regeneration"
          >
            {isRegenerating ? (
              <Loader2 className="w-3 h-3 animate-spin text-foreground" />
            ) : (
              <RotateCw className="w-3 h-3 group-hover:rotate-45 transition-transform" />
            )}
            <span className="hidden sm:inline">Regenerate</span>
          </button>
        </div>
      )}
    </div>
  );
}
