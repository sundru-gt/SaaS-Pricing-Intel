import { useState } from "react";
import { Wrench, UserX, TrendingUp, AlertTriangle, ShieldCheck } from "lucide-react";
import {
  calculateUnusedSeatsWaste,
  calculateRenewalUplift,
  formatCurrency,
} from "../../lib/pricing.js";

export default function SaaSBonusToolkit({ currency = "USD" }) {
  const [activeTool, setActiveTool] = useState("unused-seats");

  const [monthlySeatCost, setMonthlySeatCost] = useState(30);
  const [totalProvisioned, setTotalProvisioned] = useState(25);
  const [unusedCount, setUnusedCount] = useState(6);

  const [annualSpend, setAnnualSpend] = useState(15000);
  const [upliftPercent, setUpliftPercent] = useState(8);

  const unusedResult = calculateUnusedSeatsWaste({
    costPerSeatMonthly: Number(monthlySeatCost) || 0,
    totalSeats: Number(totalProvisioned) || 1,
    unusedSeats: Number(unusedCount) || 0,
    currency,
  });

  const renewalResult = calculateRenewalUplift({
    currentAnnualCost: Number(annualSpend) || 0,
    annualUpliftPercent: Number(upliftPercent) || 0,
    years: 3,
    currency,
  });

  return (
    <div className="bg-card border border-border rounded-2xl p-4 sm:p-6 shadow-2xs space-y-4 transition-all">
      {/* Header */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-2 border-b border-border/80 pb-3">
        <div className="flex items-center gap-2.5">
          <div className="w-8 h-8 rounded-xl bg-foreground/5 border border-border flex items-center justify-center text-foreground flex-shrink-0">
            <Wrench className="w-4 h-4" />
          </div>
          <div>
            <h3 className="font-bold text-xs sm:text-sm text-foreground uppercase tracking-wider font-mono">
              CFO SaaS Financial Audit Toolkit
            </h3>
            <p className="text-[11px] text-muted-foreground">
              Audit license shelfware waste and model contract renewal escalations
            </p>
          </div>
        </div>

        {/* Tool Switcher */}
        <div className="flex items-center gap-1 p-0.5 bg-muted rounded-xl text-xs font-medium self-start sm:self-auto border border-border/60">
          <button
            onClick={() => setActiveTool("unused-seats")}
            className={`flex items-center gap-1.5 px-3 py-1.5 rounded-lg transition-all ${
              activeTool === "unused-seats"
                ? "bg-card text-foreground shadow-2xs font-bold"
                : "text-muted-foreground hover:text-foreground"
            }`}
          >
            <UserX className="w-3.5 h-3.5" />
            <span>Shelfware Waste</span>
          </button>

          <button
            onClick={() => setActiveTool("renewal-uplift")}
            className={`flex items-center gap-1.5 px-3 py-1.5 rounded-lg transition-all ${
              activeTool === "renewal-uplift"
                ? "bg-card text-foreground shadow-2xs font-bold"
                : "text-muted-foreground hover:text-foreground"
            }`}
          >
            <TrendingUp className="w-3.5 h-3.5" />
            <span>Renewal Uplift</span>
          </button>
        </div>
      </div>

      {/* Tool 1: Unused Seats Waste Calculator */}
      {activeTool === "unused-seats" && (
        <div className="space-y-3.5 animate-in fade-in duration-150">
          <p className="text-xs text-muted-foreground leading-relaxed">
            Industry benchmarks show that <strong>15–30% of provisioned SaaS seats</strong> remain unassigned or inactive. Calculate annual shelfware drain:
          </p>

          <div className="grid grid-cols-1 sm:grid-cols-3 gap-3">
            <div>
              <label className="text-[10px] font-mono uppercase tracking-wider text-muted-foreground font-bold block mb-1">
                Seat Rate / Mo
              </label>
              <div className="flex items-center border border-border rounded-xl px-3 py-2 bg-background">
                <span className="text-xs text-muted-foreground mr-1.5 font-mono">
                  {currency === "INR" ? "₹" : "$"}
                </span>
                <input
                  type="number"
                  min="1"
                  value={monthlySeatCost}
                  onChange={(e) => setMonthlySeatCost(parseFloat(e.target.value) || 0)}
                  className="w-full text-xs font-bold bg-transparent outline-none text-foreground font-mono tabular-nums"
                />
              </div>
            </div>

            <div>
              <label className="text-[10px] font-mono uppercase tracking-wider text-muted-foreground font-bold block mb-1">
                Total Seats Owned
              </label>
              <div className="flex items-center border border-border rounded-xl px-3 py-2 bg-background">
                <input
                  type="number"
                  min="1"
                  value={totalProvisioned}
                  onChange={(e) => setTotalProvisioned(parseInt(e.target.value, 10) || 1)}
                  className="w-full text-xs font-bold bg-transparent outline-none text-foreground font-mono tabular-nums"
                />
                <span className="text-xs text-muted-foreground ml-1 font-mono">seats</span>
              </div>
            </div>

            <div>
              <label className="text-[10px] font-mono uppercase tracking-wider text-muted-foreground font-bold block mb-1">
                Unassigned / Idle
              </label>
              <div className="flex items-center border border-border rounded-xl px-3 py-2 bg-background">
                <input
                  type="number"
                  min="0"
                  max={totalProvisioned}
                  value={unusedCount}
                  onChange={(e) => setUnusedCount(Math.min(totalProvisioned, parseInt(e.target.value, 10) || 0))}
                  className="w-full text-xs font-bold bg-transparent outline-none text-foreground font-mono tabular-nums"
                />
                <span className="text-xs text-muted-foreground ml-1 font-mono">seats</span>
              </div>
            </div>
          </div>

          {/* Results readout */}
          <div className="p-4 rounded-xl bg-muted/30 border border-border flex flex-col sm:flex-row sm:items-center justify-between gap-3">
            <div>
              <span className="text-[10px] font-mono uppercase tracking-wider text-muted-foreground block font-bold">
                Annual Capital Drain (Shelfware)
              </span>
              <span className="text-xl sm:text-2xl font-extrabold font-mono text-rose-600 dark:text-rose-400 tabular-nums">
                {formatCurrency(unusedResult.annualWaste || unusedResult.totalWaste || 0, currency)} / yr
              </span>
            </div>

            <div className="text-left sm:text-right">
              <span className="text-xs text-muted-foreground font-mono block">
                {unusedResult.wastePercentage || 0}% of subscription budget is unutilized
              </span>
              <span className="text-[11px] text-muted-foreground">
                Monthly leak: {formatCurrency(unusedResult.monthlyWaste || 0, currency)}/mo
              </span>
            </div>
          </div>
        </div>
      )}

      {/* Tool 2: Renewal Price Uplift Estimator */}
      {activeTool === "renewal-uplift" && (
        <div className="space-y-3.5 animate-in fade-in duration-150">
          <p className="text-xs text-muted-foreground leading-relaxed">
            Enterprise software vendors routinely insert <strong>5–15% annual renewal price escalations</strong> into master service agreements. Model the 3-year impact:
          </p>

          <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
            <div>
              <label className="text-[10px] font-mono uppercase tracking-wider text-muted-foreground font-bold block mb-1">
                Current Annual Contract Spend
              </label>
              <div className="flex items-center border border-border rounded-xl px-3 py-2 bg-background">
                <span className="text-xs text-muted-foreground mr-1.5 font-mono">
                  {currency === "INR" ? "₹" : "$"}
                </span>
                <input
                  type="number"
                  min="100"
                  step="500"
                  value={annualSpend}
                  onChange={(e) => setAnnualSpend(parseFloat(e.target.value) || 0)}
                  className="w-full text-xs font-bold bg-transparent outline-none text-foreground font-mono tabular-nums"
                />
              </div>
            </div>

            <div>
              <div className="flex justify-between items-center mb-1">
                <label className="text-[10px] font-mono uppercase tracking-wider text-muted-foreground font-bold">
                  Annual Price Uplift Clause
                </label>
                <span className="text-xs font-bold font-mono text-foreground">
                  +{upliftPercent}%
                </span>
              </div>
              <input
                type="range"
                min="0"
                max="25"
                value={upliftPercent}
                onChange={(e) => setUpliftPercent(parseInt(e.target.value, 10))}
                className="w-full h-2 rounded-lg cursor-pointer"
              />
            </div>
          </div>

          {/* Results readout */}
          <div className="p-4 rounded-xl bg-muted/30 border border-border space-y-2">
            <div className="flex flex-col sm:flex-row sm:items-baseline justify-between gap-1">
              <span className="text-[10px] font-mono uppercase tracking-wider text-muted-foreground font-bold">
                Projected Year-3 Annual Spend
              </span>
              <span className="text-xl sm:text-2xl font-extrabold font-mono text-foreground tabular-nums">
                {formatCurrency(renewalResult.finalAnnualCost || 0, currency)} / yr
              </span>
            </div>

            <div className="flex items-center justify-between text-xs pt-2 border-t border-border/60">
              <span className="text-muted-foreground">Cumulative 3-Year Extra Budget:</span>
              <span className="font-bold font-mono text-amber-600 dark:text-amber-400">
                +{formatCurrency(renewalResult.cumulativeIncrease || 0, currency)}
              </span>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
