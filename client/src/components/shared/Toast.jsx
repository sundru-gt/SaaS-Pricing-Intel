import { useEffect } from "react";
import { CheckCircle2, AlertCircle, Info, X } from "lucide-react";

export default function Toast({ toasts = [], onDismiss }) {
  if (!toasts || toasts.length === 0) return null;

  return (
    <div className="fixed bottom-24 right-4 z-50 flex flex-col gap-2 max-w-sm pointer-events-none">
      {toasts.map((toast) => {
        const Icon =
          toast.type === "error"
            ? AlertCircle
            : toast.type === "info"
            ? Info
            : CheckCircle2;

        return (
          <div
            key={toast.id}
            className="pointer-events-auto flex items-center gap-2.5 px-3.5 py-2.5 rounded-xl bg-foreground text-background shadow-xl border border-background/20 text-xs font-medium animate-in slide-in-from-bottom-2 fade-in duration-200"
          >
            <Icon
              className={`w-4 h-4 flex-shrink-0 ${
                toast.type === "error"
                  ? "text-rose-400"
                  : toast.type === "info"
                  ? "text-blue-400"
                  : "text-emerald-400"
              }`}
            />
            <span className="flex-1 leading-snug">{toast.message}</span>
            <button
              onClick={() => onDismiss(toast.id)}
              className="p-0.5 rounded hover:bg-background/20 text-background/70 hover:text-background transition-colors flex-shrink-0"
              aria-label="Dismiss notification"
            >
              <X className="w-3.5 h-3.5" />
            </button>
          </div>
        );
      })}
    </div>
  );
}

