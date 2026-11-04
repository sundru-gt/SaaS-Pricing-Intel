import { useState, useMemo } from "react";
import { X, Check, ArrowRight, Minus, Users } from "lucide-react";
import { calculatePlanCost, formatCurrency } from "../../lib/pricing.js";
import SoftwareLogo from "../shared/SoftwareLogo.jsx";

export default function ComparisonPanel({
  vendors = [],
  onRemoveVendor,
  onClose,
  initialSeats = 15,
  currency = "USD",
  billingCycle = "annual",
}) {
  const [seats, setSeats] = useState(initialSeats);

  const computed = useMemo(() => {
    return vendors.map((v) => {
      const plan = v.plans?.find((p) => !p.isFree) || v.plans?.[0];
      const calc = calculatePlanCost({
        vendor: v,
        plan,
        seats,
        billingCycle,
        currency,
      });
      return {
        vendor: v,
        plan,
        calc,
      };
    });
  }, [vendors, seats, billingCycle, currency]);

  const bestMonthly = useMemo(() => {
    const costs = computed.map((c) => c.calc.monthlyTotal);
    return costs.length > 0 ? Math.min(...costs) : null;
  }, [computed]);

  const bestPerUser = useMemo(() => {
    const rates = computed.map((c) => c.calc.monthlyPerUser);
    return rates.length > 0 ? Math.min(...rates) : null;
  }, [computed]);

  const bestAnnual = useMemo(() => {
    const totals = computed.map((c) => c.calc.annualTotal);
    return totals.length > 0 ? Math.min(...totals) : null;
  }, [computed]);

  const hasAnyFree = useMemo(() => {
    return computed.some((c) => c.vendor.hasFreePlan);
  }, [computed]);

  const bestMinSeats = useMemo(() => {
    const mins = computed.map((c) => c.plan?.minSeats || 1);
    return mins.length > 0 ? Math.min(...mins) : 1;
  }, [computed]);

  if (!vendors || vendors.length === 0) return null;

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-2 sm:p-6 bg-black/60 backdrop-blur-xs animate-in fade-in duration-150">
      <div className="bg-card rounded-2xl border border-border shadow-2xl w-full max-w-4xl max-h-[92vh] flex flex-col overflow-hidden animate-in zoom-in-98 duration-150">
        {/* Header */}
        <div className="flex flex-col sm:flex-row sm:items-center justify-between p-4 border-b border-border flex-shrink-0 gap-3">
          <div>
            <h3 className="font-bold text-xs sm:text-sm text-foreground uppercase tracking-wider font-mono">
              Side-by-Side Comparison Matrix ({vendors.length} vendors)
            </h3>
            <p className="text-[11px] text-muted-foreground font-mono">
              Comparing verified 2026 tiers • {billingCycle === "annual" ? "Annual commitment" : "Monthly billing"}
            </p>
          </div>

          <div className="flex items-center gap-3">
            {/* Live seats adjuster inside modal */}
            <div className="flex items-center gap-1.5 bg-muted/60 border border-border/80 rounded-lg px-2.5 py-1">
              <Users className="w-3.5 h-3.5 text-muted-foreground" />
              <input
                type="number"
                min="1"
                max="500"
                value={seats}
                onChange={(e) => setSeats(Math.max(1, parseInt(e.target.value, 10) || 1))}
                className="w-10 text-right bg-transparent text-xs font-bold outline-none text-foreground font-mono"
              />
              <span className="text-[11px] text-muted-foreground font-mono">seats</span>
            </div>

            <button
              onClick={onClose}
              className="p-1.5 rounded-lg hover:bg-muted text-muted-foreground hover:text-foreground transition-colors"
              aria-label="Close comparison matrix"
            >
              <X className="w-4 h-4" />
            </button>
          </div>
        </div>

        {/* Mobile Swipe Cue */}
        <div className="sm:hidden px-4 py-2 bg-muted/40 border-b border-border/60 text-[10px] font-mono text-muted-foreground flex items-center justify-between">
          <span>Swipe horizontally to view all columns</span>
          <ArrowRight className="w-3 h-3" />
        </div>

        {/* Comparison Table Content */}
        <div className="overflow-y-auto overflow-x-auto flex-1 p-4">
          <div className="min-w-[540px] sm:min-w-full divide-y divide-border/60">
            {/* Header Row: Vendor Names */}
            <div className="grid grid-cols-12 gap-3 pb-3 items-center">
              <div className="col-span-3 text-[10px] font-mono font-bold text-muted-foreground uppercase tracking-wider">
                Software
              </div>
              {computed.map(({ vendor }) => (
                <div
                  key={vendor.id}
                  className="col-span-3 flex items-center justify-between p-2.5 rounded-xl bg-muted/40 border border-border shadow-2xs"
                >
                  <div className="flex items-center gap-2 truncate min-w-0">
                    <SoftwareLogo
                      name={vendor.name}
                      url={vendor.sourceUrl}
                      logoText={vendor.logoText || vendor.shortName.substring(0, 2)}
                      size="xs"
                    />
                    <span className="text-xs font-bold truncate text-foreground">
                      {vendor.name}
                    </span>
                  </div>
                  <button
                    onClick={() => onRemoveVendor(vendor.id)}
                    className="text-muted-foreground hover:text-foreground p-1 rounded-md hover:bg-muted transition-colors flex-shrink-0"
                    title="Remove from comparison"
                  >
                    <X className="w-3 h-3" />
                  </button>
                </div>
              ))}
            </div>

            {/* Metric 1: Monthly Cost */}
            <div className="grid grid-cols-12 gap-3 py-3 items-center">
              <div className="col-span-3 text-xs font-semibold text-foreground">
                Total Monthly ({seats} seats)
              </div>
              {computed.map(({ vendor, calc }) => {
                const isBest = bestMonthly !== null && calc.monthlyTotal === bestMonthly;
                return (
                  <div
                    key={vendor.id}
                    className={`col-span-3 space-y-1 p-2.5 rounded-xl transition-all ${
                      isBest
                        ? "bg-blue-500/10 dark:bg-blue-950/40 border-2 border-blue-500/60 shadow-xs"
                        : "border border-transparent"
                    }`}
                  >
                    <span
                      className={`text-sm sm:text-base font-bold font-mono block tabular-nums ${
                        isBest ? "text-blue-600 dark:text-blue-400" : "text-foreground"
                      }`}
                    >
                      {calc.isFree
                        ? "Free ($0)"
                        : `${formatCurrency(calc.monthlyTotal, currency)}/mo`}
                    </span>
                    {isBest && (
                      <span className="inline-flex items-center gap-1 text-[9px] font-mono font-bold text-white bg-blue-600 px-1.5 py-0.5 rounded-md shadow-2xs">
                        ★ Best Monthly
                      </span>
                    )}
                  </div>
                );
              })}
            </div>

            {/* Metric 2: Per Seat Rate */}
            <div className="grid grid-cols-12 gap-3 py-3 items-center">
              <div className="col-span-3 text-xs font-medium text-muted-foreground">
                Effective Cost / Seat
              </div>
              {computed.map(({ vendor, calc }) => {
                const isBest = bestPerUser !== null && calc.monthlyPerUser === bestPerUser;
                return (
                  <div
                    key={vendor.id}
                    className={`col-span-3 space-y-1 p-2.5 rounded-xl transition-all ${
                      isBest
                        ? "bg-blue-500/10 dark:bg-blue-950/40 border-2 border-blue-500/60 shadow-xs"
                        : "border border-transparent"
                    }`}
                  >
                    <span
                      className={`text-xs font-mono font-bold block tabular-nums ${
                        isBest ? "text-blue-600 dark:text-blue-400" : "text-foreground"
                      }`}
                    >
                      {formatCurrency(calc.monthlyPerUser, currency)} / seat / mo
                    </span>
                    {isBest && (
                      <span className="inline-flex items-center gap-1 text-[9px] font-mono font-bold text-white bg-blue-600 px-1.5 py-0.5 rounded-md shadow-2xs">
                        ★ Best Per-Seat
                      </span>
                    )}
                  </div>
                );
              })}
            </div>

            {/* Metric 3: Annual Spend */}
            <div className="grid grid-cols-12 gap-3 py-3 items-center">
              <div className="col-span-3 text-xs font-medium text-muted-foreground">
                Annual Contract Spend
              </div>
              {computed.map(({ vendor, calc }) => {
                const isBest = bestAnnual !== null && calc.annualTotal === bestAnnual;
                return (
                  <div
                    key={vendor.id}
                    className={`col-span-3 space-y-1 p-2.5 rounded-xl transition-all ${
                      isBest
                        ? "bg-blue-500/10 dark:bg-blue-950/40 border-2 border-blue-500/60 shadow-xs"
                        : "border border-transparent"
                    }`}
                  >
                    <span
                      className={`text-xs font-mono font-bold block tabular-nums ${
                        isBest ? "text-blue-600 dark:text-blue-400" : "text-foreground"
                      }`}
                    >
                      {formatCurrency(calc.annualTotal, currency)} / yr
                    </span>
                    {isBest && (
                      <span className="inline-flex items-center gap-1 text-[9px] font-mono font-bold text-white bg-blue-600 px-1.5 py-0.5 rounded-md shadow-2xs">
                        ★ Best Annual Total
                      </span>
                    )}
                  </div>
                );
              })}
            </div>

            {/* Metric 4: Free Plan Availability */}
            <div className="grid grid-cols-12 gap-3 py-3 items-center">
              <div className="col-span-3 text-xs font-medium text-muted-foreground">
                Free Forever Tier
              </div>
              {computed.map(({ vendor }) => {
                const hasFree = vendor.hasFreePlan;
                return (
                  <div
                    key={vendor.id}
                    className={`col-span-3 text-xs flex flex-col items-start gap-1 font-mono p-2.5 rounded-xl transition-all ${
                      hasFree
                        ? "bg-blue-500/10 dark:bg-blue-950/40 border-2 border-blue-500/60 shadow-xs text-blue-700 dark:text-blue-300"
                        : "border border-transparent"
                    }`}
                  >
                    <div className="flex items-center gap-1.5">
                      {hasFree ? (
                        <>
                          <Check className="w-3.5 h-3.5 text-blue-600 dark:text-blue-400 stroke-[3]" />
                          <span className="font-bold">Available</span>
                        </>
                      ) : (
                        <>
                          <Minus className="w-3.5 h-3.5 text-muted-foreground" />
                          <span className="text-muted-foreground">14-day trial only</span>
                        </>
                      )}
                    </div>
                    {hasFree && (
                      <span className="inline-flex items-center text-[9px] font-mono font-bold text-white bg-blue-600 px-1.5 py-0.5 rounded-md shadow-2xs">
                        ★ Free Tier
                      </span>
                    )}
                  </div>
                );
              })}
            </div>

            {/* Metric 5: Plan Name & Minimum Seats */}
            <div className="grid grid-cols-12 gap-3 py-3 items-center">
              <div className="col-span-3 text-xs font-medium text-muted-foreground">
                Base Plan & Min Seats
              </div>
              {computed.map(({ vendor, plan }) => {
                const isBestSeats = (plan.minSeats || 1) === bestMinSeats && bestMinSeats <= 1;
                return (
                  <div
                    key={vendor.id}
                    className={`col-span-3 text-xs space-y-1 p-2.5 rounded-xl transition-all ${
                      isBestSeats
                        ? "bg-blue-500/10 dark:bg-blue-950/40 border-2 border-blue-500/60 shadow-xs text-blue-700 dark:text-blue-300"
                        : "border border-transparent text-foreground"
                    }`}
                  >
                    <div className="font-semibold">{plan.name}</div>
                    <div className="text-[10px] font-mono text-muted-foreground">
                      {plan.minSeats > 1 ? `Min ${plan.minSeats} seats` : "No minimum (1 seat)"}
                    </div>
                    {isBestSeats && (
                      <span className="inline-flex items-center text-[9px] font-mono font-bold text-white bg-blue-600 px-1.5 py-0.5 rounded-md shadow-2xs">
                        ★ 1 Seat Minimum
                      </span>
                    )}
                  </div>
                );
              })}
            </div>

            {/* Metric 6: Contract Terms */}
            <div className="grid grid-cols-12 gap-3 py-3 items-center">
              <div className="col-span-3 text-xs font-medium text-muted-foreground">
                Contract & Billing
              </div>
              {computed.map(({ vendor }) => (
                <div key={vendor.id} className="col-span-3 text-[11px] text-muted-foreground leading-snug">
                  {vendor.contractTerms || "Monthly or Annual commitments"}
                </div>
              ))}
            </div>

            {/* Metric 7: Known Additional Costs */}
            <div className="grid grid-cols-12 gap-3 py-3 items-center">
              <div className="col-span-3 text-xs font-medium text-muted-foreground">
                Additional / Add-on Costs
              </div>
              {computed.map(({ vendor }) => (
                <div key={vendor.id} className="col-span-3 text-[11px] text-muted-foreground leading-snug">
                  {vendor.additionalCosts || "None verified"}
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
