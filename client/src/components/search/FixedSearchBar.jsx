import { useState, useEffect, useRef } from "react";
import { Search, ArrowUp, X } from "lucide-react";

export default function FixedSearchBar({
  placeholder = "Search software, category, or pricing keyword...",
  onSubmitSearch,
}) {
  const [inputVal, setInputVal] = useState("");
  const inputRef = useRef(null);

  // Global keyboard shortcut '/' to focus search
  useEffect(() => {
    const handleKeyDown = (e) => {
      if (e.key === "/" && document.activeElement !== inputRef.current && !["INPUT", "TEXTAREA"].includes(document.activeElement.tagName)) {
        e.preventDefault();
        inputRef.current?.focus();
      }
    };
    window.addEventListener("keydown", handleKeyDown);
    return () => window.removeEventListener("keydown", handleKeyDown);
  }, []);

  const handleSubmit = (e) => {
    e.preventDefault();
    if (inputVal.trim() !== "") {
      onSubmitSearch(inputVal.trim());
      setInputVal("");
    }
  };

  return (
    <div className="fixed bottom-0 left-0 right-0 z-30 bg-background/85 backdrop-blur-xl border-t border-border/80 px-3 sm:px-4 py-2.5 sm:py-3 transition-all shadow-[0_-4px_16px_rgba(0,0,0,0.03)]">
      <div className="max-w-2xl mx-auto">
        <form
          onSubmit={handleSubmit}
          className="relative flex items-center bg-card border border-border rounded-2xl shadow-xs focus-within:border-foreground/50 focus-within:ring-2 focus-within:ring-foreground/10 transition-all p-1"
        >
          <div className="flex items-center pl-3 pr-1 text-muted-foreground flex-shrink-0">
            <Search className="w-4 h-4 text-muted-foreground" />
          </div>

          <input
            ref={inputRef}
            type="text"
            value={inputVal}
            onChange={(e) => setInputVal(e.target.value)}
            placeholder={placeholder}
            className="flex-1 min-w-0 bg-transparent py-1.5 px-2 text-xs sm:text-sm text-foreground placeholder:text-muted-foreground outline-none font-medium"
            aria-label="Search software keywords"
          />

          {inputVal.trim() !== "" && (
            <button
              type="button"
              onClick={() => setInputVal("")}
              className="p-1 rounded-lg text-muted-foreground hover:text-foreground transition-colors mr-1"
              title="Clear input"
            >
              <X className="w-3.5 h-3.5" />
            </button>
          )}

          <div className="flex items-center gap-1.5 pr-1 flex-shrink-0">
            <kbd className="hidden sm:inline-flex items-center justify-center px-2 py-1 text-[10px] font-mono font-semibold text-muted-foreground bg-muted border border-border/60 rounded-lg">
              /
            </kbd>

            <button
              type="submit"
              disabled={inputVal.trim() === ""}
              className="p-2 rounded-xl bg-foreground text-background disabled:opacity-30 disabled:pointer-events-none transition-all flex-shrink-0 hover:opacity-90 shadow-2xs"
              title="Submit query"
              aria-label="Submit search query"
            >
              <ArrowUp className="w-3.5 h-3.5 stroke-[2.5]" />
            </button>
          </div>
        </form>

        <p className="text-[10px] font-mono text-center text-muted-foreground/70 mt-1.5 hidden sm:block">
          Press <span className="text-foreground font-semibold">Enter ↵</span> to search • Press <span className="text-foreground font-semibold">/</span> to focus from anywhere
        </p>
      </div>
    </div>
  );
}
