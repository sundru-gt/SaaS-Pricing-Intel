import { useState, useEffect } from "react";
import { Edit2, X, Loader2, ArrowRight } from "lucide-react";

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
            className="flex-shrink-0 flex items-center gap-1 px-3 py-1.5 rounded-lg bg-foreground text-background text-xs font-semibold hover:opacity-90 transition-opacity shadow-2xs cursor-pointer"
            title="Update & regenerate"
          >
            <span>Update</span>
            <ArrowRight className="w-3 h-3" />
          </button>
          <button
            type="button"
            onClick={handleCancel}
            className="p-1.5 rounded-lg hover:bg-muted text-muted-foreground transition-colors flex-shrink-0 cursor-pointer"
            title="Cancel (Esc)"
          >
            <X className="w-3.5 h-3.5" />
          </button>
        </form>
      ) : (
        <button
          type="button"
          onClick={() => {
            if (isRegenerating) return;
            setEditText(query || "");
            setIsEditing(true);
          }}
          disabled={isRegenerating}
          className={`group flex items-center gap-2 px-3 py-1.5 rounded-xl border transition-all text-xs sm:text-sm font-medium shadow-2xs max-w-full cursor-pointer text-left ${
            isRegenerating
              ? "bg-muted/80 border-foreground/40 text-foreground ring-1 ring-foreground/20 animate-pulse"
              : "bg-card border-border hover:border-foreground/40 text-foreground hover:shadow-xs"
          }`}
          title="Click to edit query"
        >
          <span className="text-foreground font-semibold truncate max-w-[200px] xs:max-w-[260px] sm:max-w-xs">
            {query || "All Software"}
          </span>
          {isRegenerating ? (
            <Loader2 className="w-3 h-3 animate-spin text-muted-foreground flex-shrink-0" />
          ) : (
            <Edit2 className="w-3 h-3 text-muted-foreground/60 group-hover:text-foreground transition-colors ml-0.5 flex-shrink-0" />
          )}
        </button>
      )}
    </div>
  );
}
