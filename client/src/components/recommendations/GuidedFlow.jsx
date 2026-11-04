import { useState } from "react";
import { ArrowRight, ArrowLeft, RotateCcw, Check, Sparkles, Award, CheckCircle2 } from "lucide-react";
import { GUIDED_QUESTIONS } from "../../lib/recommendations.js";

export default function GuidedFlow({
  onAnswersChange,
  activeAnswers = {},
  topRecommendation = null,
  onShowToast,
}) {
  const [currentStep, setCurrentStep] = useState(0);

  const totalSteps = GUIDED_QUESTIONS.length;
  const question = GUIDED_QUESTIONS[currentStep];

  const handleSelectOption = (option) => {
    const updated = {
      ...activeAnswers,
      [question.id]: option,
    };
    onAnswersChange(updated);
  };

  const handleNext = () => {
    if (currentStep < totalSteps - 1) {
      setCurrentStep(currentStep + 1);
    } else {
      // Final step: complete guided flow and scroll to results
      onShowToast?.(`Top recommendations calculated! ${topRecommendation ? `${topRecommendation.name} (${topRecommendation.recommendationScore}% Match)` : ""}`);
      const target = document.getElementById("results-section") || document.getElementById("top-recommendation-card");
      if (target) {
        target.scrollIntoView({ behavior: "smooth", block: "start" });
      }
    }
  };

  const handleReset = () => {
    setCurrentStep(0);
    onAnswersChange({});
    onShowToast?.("Guided questions reset", "info");
  };

  const selectedForCurrent = activeAnswers[question.id];
  const isLastStep = currentStep === totalSteps - 1;
  const isAnswered = !!selectedForCurrent;

  return (
    <div id="guided-flow-section" className="bg-card border border-border rounded-xl p-4 sm:p-5 shadow-2xs space-y-4 transition-all">
      {/* Header */}
      <div className="flex items-center justify-between border-b border-border/80 pb-3">
        <div className="flex items-center gap-2">
          <div className="flex items-center justify-center w-6 h-6 rounded-lg bg-foreground/5 border border-border text-foreground">
            <Sparkles className="w-3.5 h-3.5 text-foreground" />
          </div>
          <div>
            <h3 className="font-semibold text-xs sm:text-sm text-foreground uppercase tracking-wider font-mono">
              Guided Recommendation Flow
            </h3>
            <span className="text-[11px] text-muted-foreground font-mono">
              Deterministic scoring based on team profile & constraints
            </span>
          </div>
        </div>

        {Object.keys(activeAnswers).length > 0 && (
          <button
            onClick={handleReset}
            className="flex items-center gap-1 text-[11px] text-muted-foreground hover:text-foreground font-medium px-2 py-1 rounded-md hover:bg-muted transition-colors font-mono"
            title="Reset answers"
          >
            <RotateCcw className="w-3 h-3" />
            <span>Reset</span>
          </button>
        )}
      </div>

      {/* Progress Dots / Bar with Clickable Step Tabs */}
      <div className="space-y-1.5">
        <div className="flex items-center justify-between text-[11px] font-mono text-muted-foreground">
          <span>Question {currentStep + 1} of {totalSteps}: {question.title.split("?")[0]}</span>
          <span>{Math.round(((currentStep + 1) / totalSteps) * 100)}% Complete</span>
        </div>
        <div className="w-full h-2 bg-muted rounded-full overflow-hidden flex gap-1 p-0.5">
          {GUIDED_QUESTIONS.map((q, idx) => {
            const hasAnswer = !!activeAnswers[q.id];
            const isCurrent = idx === currentStep;

            return (
              <button
                key={q.id}
                type="button"
                onClick={() => setCurrentStep(idx)}
                className={`flex-1 h-full rounded-full transition-all duration-300 ${
                  isCurrent
                    ? "bg-foreground"
                    : hasAnswer
                    ? "bg-foreground/50 hover:bg-foreground/70"
                    : "bg-muted-foreground/20 hover:bg-muted-foreground/30"
                }`}
                title={`Jump to Question ${idx + 1}: ${q.title}`}
                aria-label={`Question ${idx + 1}`}
              />
            );
          })}
        </div>
      </div>

      {/* Active Question Title & Subtitle */}
      <div className="space-y-0.5 pt-1">
        <div className="flex items-center gap-1.5 text-[10px] font-mono font-semibold uppercase tracking-wider text-muted-foreground">
          <span>Step {currentStep + 1} of {totalSteps}</span>
          {isAnswered && (
            <span className="inline-flex items-center gap-0.5 text-emerald-600 dark:text-emerald-400 font-bold">
              • <Check className="w-2.5 h-2.5" /> Answered
            </span>
          )}
        </div>
        <h4 className="text-xs sm:text-sm font-bold text-foreground">
          {question.title}
        </h4>
        <p className="text-[11px] text-muted-foreground">{question.subtitle}</p>
      </div>

      {/* Options Grid */}
      <div className="grid grid-cols-1 sm:grid-cols-2 gap-2.5">
        {question.options.map((opt) => {
          const isSelected = selectedForCurrent?.id === opt.id;
          return (
            <button
              key={opt.id}
              type="button"
              onClick={() => handleSelectOption(opt)}
              className={`flex items-start justify-between p-3 rounded-xl border text-left transition-all group ${
                isSelected
                  ? "bg-muted/70 border-foreground text-foreground shadow-xs ring-1 ring-foreground"
                  : "bg-card hover:bg-muted/40 hover:border-foreground/30 text-foreground border-border"
              }`}
            >
              <div className="space-y-0.5 pr-2">
                <span className="text-xs font-semibold block">
                  {opt.label}
                </span>
                <span className="text-[11px] text-muted-foreground block leading-relaxed">
                  {opt.description}
                </span>
              </div>
              <div
                className={`w-4 h-4 rounded-full flex items-center justify-center flex-shrink-0 mt-0.5 border transition-colors ${
                  isSelected
                    ? "bg-foreground border-foreground text-background"
                    : "border-border group-hover:border-foreground/40"
                }`}
              >
                {isSelected && <Check className="w-2.5 h-2.5 stroke-[3]" />}
              </div>
            </button>
          );
        })}
      </div>

      {/* Navigation Controls */}
      <div className="flex items-center justify-between pt-2 border-t border-border/80 gap-2">
        <button
          type="button"
          onClick={() => setCurrentStep(Math.max(0, currentStep - 1))}
          disabled={currentStep === 0}
          className="flex items-center gap-1.5 px-3 py-1.5 rounded-lg text-xs font-medium border border-border bg-card hover:bg-muted text-foreground disabled:opacity-40 disabled:pointer-events-none transition-colors"
        >
          <ArrowLeft className="w-3.5 h-3.5" />
          <span>Back</span>
        </button>

        <span className="text-[11px] font-mono text-muted-foreground hidden xs:inline">
          {currentStep + 1} / {totalSteps}
        </span>

        {/* Next / View Recommendations Button - ALWAYS CLICKABLE & MEANINGFUL WHEN ANSWERED */}
        <button
          type="button"
          onClick={handleNext}
          disabled={!isAnswered}
          className={`flex items-center gap-1.5 px-4 py-1.5 rounded-lg text-xs font-semibold transition-all shadow-2xs ${
            isAnswered
              ? "bg-foreground text-background hover:opacity-90 cursor-pointer active:scale-98"
              : "bg-muted text-muted-foreground opacity-50 cursor-not-allowed"
          }`}
          title={isAnswered ? (isLastStep ? "View final ranked recommendations" : "Advance to next question") : "Please select an option to continue"}
        >
          {isLastStep ? (
            <>
              <Sparkles className="w-3.5 h-3.5 text-emerald-400" />
              <span>View Recommendations</span>
            </>
          ) : (
            <>
              <span>Next</span>
              <ArrowRight className="w-3.5 h-3.5" />
            </>
          )}
        </button>
      </div>

      {/* Top Algorithmic Match Badge */}
      {topRecommendation && (
        <div id="top-recommendation-card" className="flex flex-col sm:flex-row sm:items-center justify-between gap-2.5 p-3.5 rounded-xl bg-muted/40 border border-border text-xs animate-in fade-in duration-200">
          <div className="flex items-center gap-2.5 min-w-0">
            <div className="w-9 h-9 rounded-xl bg-emerald-500/10 text-emerald-600 dark:text-emerald-400 flex items-center justify-center flex-shrink-0">
              <Award className="w-5 h-5" />
            </div>
            <div className="min-w-0">
              <div className="flex items-center gap-2">
                <span className="font-bold text-foreground text-xs sm:text-sm truncate">
                  Top Recommendation: {topRecommendation.name}
                </span>
                <span className="font-mono text-xs text-emerald-600 dark:text-emerald-400 font-bold px-2 py-0.5 rounded-md bg-emerald-500/10 border border-emerald-500/20 flex-shrink-0">
                  {topRecommendation.recommendationScore}% Match
                </span>
              </div>
              <p className="text-[11px] text-muted-foreground mt-0.5 truncate">
                {topRecommendation.matchReason || "Strongest fit based on team size, budget, and features"}
              </p>
            </div>
          </div>

          <button
            type="button"
            onClick={() => {
              const target = document.getElementById("results-section");
              if (target) {
                target.scrollIntoView({ behavior: "smooth", block: "start" });
              }
            }}
            className="self-start sm:self-center px-3 py-1 rounded-lg bg-foreground text-background text-[11px] font-semibold hover:opacity-90 transition-opacity flex-shrink-0 flex items-center gap-1 shadow-2xs"
          >
            <span>See in Results</span>
            <ArrowRight className="w-3 h-3" />
          </button>
        </div>
      )}
    </div>
  );
}
