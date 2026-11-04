import { useState } from "react";
import { ChevronDown, ChevronUp, CornerDownRight } from "lucide-react";

export default function FollowUpQuestions({ questions = [] }) {
  const [openIndex, setOpenIndex] = useState(null);

  if (!questions || questions.length === 0) return null;

  const toggle = (idx) => {
    setOpenIndex(openIndex === idx ? null : idx);
  };

  return (
    <div className="bg-card border border-border rounded-xl p-4 sm:p-5 shadow-2xs space-y-2.5">
      <div className="flex items-center gap-2">
        <span className="font-mono text-[11px] font-semibold text-muted-foreground uppercase tracking-widest">
          Frequently Asked Questions
        </span>
      </div>

      <div className="divide-y divide-border/60">
        {questions.map((item, idx) => {
          const isOpen = openIndex === idx;
          return (
            <div key={idx} className="py-2.5 space-y-1.5">
              <button
                onClick={() => toggle(idx)}
                className="w-full flex items-start justify-between gap-3 text-left group"
              >
                <div className="flex items-start gap-2 text-xs font-medium text-foreground group-hover:underline">
                  <CornerDownRight className="w-3.5 h-3.5 text-muted-foreground mt-0.5 flex-shrink-0" />
                  <span>{item.question}</span>
                </div>
                <div className="p-0.5 text-muted-foreground">
                  {isOpen ? (
                    <ChevronUp className="w-3.5 h-3.5" />
                  ) : (
                    <ChevronDown className="w-3.5 h-3.5" />
                  )}
                </div>
              </button>

              {isOpen && (
                <div className="pl-5 text-xs text-muted-foreground leading-relaxed bg-muted/30 p-2.5 rounded-lg border border-border/50 animate-in fade-in duration-150">
                  <p>{item.answer}</p>
                </div>
              )}
            </div>
          );
        })}
      </div>
    </div>
  );
}
