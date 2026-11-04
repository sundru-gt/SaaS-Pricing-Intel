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

  const minMonthly = useMemo(() => {
    const costs = computed
      .filter((c) => !c.calc.isFree && c.calc.monthlyTotal > 0)
      .map((c) => c.calc.monthlyTotal);
    return costs.length > 0 ? Math.min(...costs) : null;
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
                const isLowest = minMonthly && calc.monthlyTotal === minMonthly;
                return (
                  <div key={vendor.id} className="col-span-3 space-y-0.5">
                    <span className="text-sm sm:text-base font-bold font-mono text-foreground block tabular-nums">
                      {calc.isFree
                        ? "Free ($0)"
                        : `${formatCurrency(calc.monthlyTotal, currency)}/mo`}
                    </span>
                    {isLowest && (
                      <span className="inline-block text-[10px] font-mono font-bold text-emerald-600 dark:text-emerald-400 bg-emerald-500/10 px-1.5 py-0.2 rounded">
                        Lowest Cost
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
              {computed.map(({ vendor, calc }) => (
                <div key={vendor.id} className="col-span-3 text-xs font-mono font-semibold text-foreground tabular-nums">
                  {formatCurrency(calc.monthlyPerUser, currency)} / seat / mo
                </div>
              ))}
            </div>

            {/* Metric 3: Annual Spend */}
            <div className="grid grid-cols-12 gap-3 py-3 items-center">
              <div className="col-span-3 text-xs font-medium text-muted-foreground">
                Annual Contract Spend
              </div>
              {computed.map(({ vendor, calc }) => (
                <div key={vendor.id} className="col-span-3 text-xs font-mono font-semibold text-foreground tabular-nums">
                  {formatCurrency(calc.annualTotal, currency)} / yr
                </div>
              ))}
            </div>

            {/* Metric 4: Free Plan Availability */}
            <div className="grid grid-cols-12 gap-3 py-3 items-center">
              <div className="col-span-3 text-xs font-medium text-muted-foreground">
                Free Forever Tier
              </div>
              {computed.map(({ vendor }) => (
                <div key={vendor.id} className="col-span-3 text-xs flex items-center gap-1.5 font-mono">
                  {vendor.hasFreePlan ? (
                    <>
                      <Check className="w-3.5 h-3.5 text-emerald-500 stroke-[3]" />
                      <span className="text-emerald-600 dark:text-emerald-400 font-semibold">Available</span>
                    </>
                  ) : (
                    <>
                      <Minus className="w-3.5 h-3.5 text-muted-foreground" />
                      <span className="text-muted-foreground">14-day trial only</span>
                    </>
                  )}
                </div>
              ))}
            </div>

            {/* Metric 5: Plan Name & Minimum Seats */}
            <div className="grid grid-cols-12 gap-3 py-3 items-center">
              <div className="col-span-3 text-xs font-medium text-muted-foreground">
                Base Plan Tested
              </div>
              {computed.map(({ vendor, plan }) => (
                <div key={vendor.id} className="col-span-3 text-xs text-foreground font-semibold">
                  {plan.name}
                  {plan.minSeats > 1 && (
                    <span className="block text-[10px] text-muted-foreground font-mono">
                      (Min {plan.minSeats} seats)
                    </span>
                  )}
                </div>
              ))}
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
