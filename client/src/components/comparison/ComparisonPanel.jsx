import { useState, useMemo, useEffect } from "react";
import { X, Check, ArrowRight, Minus, Users, ExternalLink } from "lucide-react";
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

  // Close on Escape key
  useEffect(() => {
    const handleKeyDown = (e) => {
      if (e.key === "Escape") {
        onClose?.();
      }
    };
    window.addEventListener("keydown", handleKeyDown);
    return () => window.removeEventListener("keydown", handleKeyDown);
  }, [onClose]);

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

  const hasMultiple = computed.length > 1;

  const bestMonthly = useMemo(() => {
    if (!hasMultiple) return null;
    const costs = computed.map((c) => c.calc.monthlyTotal);
    return costs.length > 0 ? Math.min(...costs) : null;
  }, [computed, hasMultiple]);

  const bestPerUser = useMemo(() => {
    if (!hasMultiple) return null;
    const rates = computed.map((c) => c.calc.monthlyPerUser);
    return rates.length > 0 ? Math.min(...rates) : null;
  }, [computed, hasMultiple]);

  const bestAnnual = useMemo(() => {
    if (!hasMultiple) return null;
    const totals = computed.map((c) => c.calc.annualTotal);
    return totals.length > 0 ? Math.min(...totals) : null;
  }, [computed, hasMultiple]);

  const bestMinSeats = useMemo(() => {
    if (!hasMultiple) return null;
    const mins = computed.map((c) => c.plan?.minSeats || 1);
    return mins.length > 0 ? Math.min(...mins) : 1;
  }, [computed, hasMultiple]);

  if (!vendors || vendors.length === 0) return null;

  return (
    <div
      onClick={(e) => {
        if (e.target === e.currentTarget) onClose?.();
      }}
      className="fixed inset-0 z-50 flex items-center justify-center p-2 sm:p-4 md:p-6 bg-black/60 backdrop-blur-xs animate-in fade-in duration-150"
    >
      <div className="bg-card rounded-2xl border border-border shadow-2xl w-full max-w-5xl max-h-[94vh] sm:max-h-[90vh] flex flex-col overflow-hidden animate-in zoom-in-98 duration-150">
        {/* Header */}
        <div className="flex items-center justify-between p-3 sm:p-4 border-b border-border flex-shrink-0 gap-2 sm:gap-4 bg-card/95 backdrop-blur-xs">
          <div className="min-w-0">
            <h3 className="font-bold text-xs sm:text-sm text-foreground uppercase tracking-wider font-mono truncate">
              Side-by-Side Comparison Matrix ({vendors.length} {vendors.length === 1 ? "vendor" : "vendors"})
            </h3>
            <p className="text-[10px] sm:text-[11px] text-muted-foreground font-mono truncate">
              Verified 2026 tiers • {billingCycle === "annual" ? "Annual commitment" : "Monthly billing"}
            </p>
          </div>

          <div className="flex items-center gap-2 sm:gap-3 flex-shrink-0">
            {/* Live seats adjuster inside modal */}
            <div className="flex items-center gap-1.5 bg-muted/60 border border-border/80 rounded-lg px-2 sm:px-2.5 py-1">
              <Users className="w-3.5 h-3.5 text-muted-foreground flex-shrink-0" />
              <input
                type="number"
                min="1"
                max="500"
                value={seats}
                onChange={(e) => setSeats(Math.max(1, parseInt(e.target.value, 10) || 1))}
                className="w-8 sm:w-10 text-right bg-transparent text-xs font-bold outline-none text-foreground font-mono"
                aria-label="Number of seats"
              />
              <span className="text-[10px] sm:text-[11px] text-muted-foreground font-mono">seats</span>
            </div>

            <button
              onClick={onClose}
              className="p-1.5 rounded-lg hover:bg-muted text-muted-foreground hover:text-foreground transition-colors cursor-pointer"
              aria-label="Close comparison matrix"
            >
              <X className="w-4 h-4" />
            </button>
          </div>
        </div>

        {/* Mobile Swipe Cue */}
        <div className="sm:hidden px-3 py-1.5 bg-muted/40 border-b border-border/60 text-[10px] font-mono text-muted-foreground flex items-center justify-between flex-shrink-0">
          <span className="flex items-center gap-1">
            <span>← Swipe horizontally to compare →</span>
          </span>
          <ArrowRight className="w-3 h-3 text-muted-foreground/60" />
        </div>

        {/* Responsive Comparison Table Container */}
        <div className="overflow-auto flex-1 relative">
          <table className="w-full border-collapse text-left min-w-[500px] sm:min-w-full">
            {/* Sticky Header Row: Vendor Names & Logos */}
            <thead className="sticky top-0 z-30 bg-card shadow-xs">
              <tr className="border-b border-border/80">
                <th className="sticky left-0 z-40 bg-card p-2.5 sm:p-4 text-[10px] sm:text-xs font-mono font-bold uppercase tracking-wider text-muted-foreground min-w-[115px] xs:min-w-[135px] sm:min-w-[170px] md:min-w-[200px] border-r border-border/60 shadow-[3px_0_8px_-2px_rgba(0,0,0,0.06)] dark:shadow-[3px_0_8px_-2px_rgba(0,0,0,0.3)]">
                  Software
                </th>
                {computed.map(({ vendor }) => (
                  <th
                    key={vendor.id}
                    className="p-2 sm:p-3 min-w-[150px] xs:min-w-[175px] sm:min-w-[200px] border-r border-border/40 last:border-r-0 align-top bg-card"
                  >
                    <div className="flex items-center justify-between gap-1.5 p-2 rounded-xl bg-muted/50 border border-border shadow-2xs">
                      <div className="flex items-center gap-2 truncate min-w-0">
                        <SoftwareLogo
                          name={vendor.name}
                          url={vendor.sourceUrl}
                          logoText={vendor.logoText || vendor.shortName.substring(0, 2)}
                          size="xs"
                        />
                        <span className="text-xs sm:text-sm font-bold truncate text-foreground">
                          {vendor.name}
                        </span>
                      </div>
                      <button
                        onClick={() => onRemoveVendor(vendor.id)}
                        className="text-muted-foreground hover:text-rose-500 p-1 rounded-md hover:bg-muted transition-colors flex-shrink-0 cursor-pointer"
                        title={`Remove ${vendor.name} from comparison`}
                      >
                        <X className="w-3.5 h-3.5" />
                      </button>
                    </div>
                  </th>
                ))}
              </tr>
            </thead>

            {/* Table Body Metrics */}
            <tbody className="divide-y divide-border/60">
              {/* Metric 1: Monthly Cost */}
              <tr>
                <td className="sticky left-0 z-20 bg-card p-2.5 sm:p-4 text-xs font-semibold text-foreground border-r border-border/60 shadow-[3px_0_8px_-2px_rgba(0,0,0,0.06)] dark:shadow-[3px_0_8px_-2px_rgba(0,0,0,0.3)]">
                  <div className="font-semibold text-foreground text-xs sm:text-sm">Total Monthly</div>
                  <div className="text-[10px] font-mono text-muted-foreground">{seats} seats • {billingCycle}</div>
                </td>
                {computed.map(({ vendor, calc }) => {
                  const isBest = bestMonthly !== null && calc.monthlyTotal === bestMonthly;
                  return (
                    <td
                      key={vendor.id}
                      className="p-2 sm:p-3 border-r border-border/40 last:border-r-0 align-top"
                    >
                      <div
                        className={`space-y-1 p-2 sm:p-2.5 rounded-xl transition-all h-full ${
                          isBest
                            ? "bg-[#8E2631]/10 dark:bg-blue-950/40 border-2 border-[#8E2631]/60 dark:border-blue-500/60 shadow-xs"
                            : "border border-border/40 bg-card/50"
                        }`}
                      >
                        <span
                          className={`text-sm sm:text-base font-bold font-mono block tabular-nums ${
                            isBest ? "text-[#8E2631] dark:text-blue-400" : "text-foreground"
                          }`}
                        >
                          {calc.isFree
                            ? "Free ($0)"
                            : `${formatCurrency(calc.monthlyTotal, currency)}/mo`}
                        </span>
                        {isBest && (
                          <span className="inline-flex items-center gap-1 text-[9px] font-mono font-bold text-white bg-[#8E2631] dark:bg-blue-600 px-1.5 py-0.5 rounded-md shadow-2xs">
                            ★ Best Monthly
                          </span>
                        )}
                      </div>
                    </td>
                  );
                })}
              </tr>

              {/* Metric 2: Per Seat Rate */}
              <tr>
                <td className="sticky left-0 z-20 bg-card p-2.5 sm:p-4 text-xs font-semibold text-foreground border-r border-border/60 shadow-[3px_0_8px_-2px_rgba(0,0,0,0.06)] dark:shadow-[3px_0_8px_-2px_rgba(0,0,0,0.3)]">
                  <div className="font-semibold text-foreground text-xs sm:text-sm">Effective Cost / Seat</div>
                  <div className="text-[10px] font-mono text-muted-foreground">per user / month</div>
                </td>
                {computed.map(({ vendor, calc }) => {
                  const isBest = bestPerUser !== null && calc.monthlyPerUser === bestPerUser;
                  return (
                    <td
                      key={vendor.id}
                      className="p-2 sm:p-3 border-r border-border/40 last:border-r-0 align-top"
                    >
                      <div
                        className={`space-y-1 p-2 sm:p-2.5 rounded-xl transition-all h-full ${
                          isBest
                            ? "bg-[#8E2631]/10 dark:bg-blue-950/40 border-2 border-[#8E2631]/60 dark:border-blue-500/60 shadow-xs"
                            : "border border-border/40 bg-card/50"
                        }`}
                      >
                        <span
                          className={`text-xs sm:text-sm font-mono font-bold block tabular-nums ${
                            isBest ? "text-[#8E2631] dark:text-blue-400" : "text-foreground"
                          }`}
                        >
                          {formatCurrency(calc.monthlyPerUser, currency)} / seat / mo
                        </span>
                        {isBest && (
                          <span className="inline-flex items-center gap-1 text-[9px] font-mono font-bold text-white bg-[#8E2631] dark:bg-blue-600 px-1.5 py-0.5 rounded-md shadow-2xs">
                            ★ Best Per-Seat
                          </span>
                        )}
                      </div>
                    </td>
                  );
                })}
              </tr>

              {/* Metric 3: Annual Spend */}
              <tr>
                <td className="sticky left-0 z-20 bg-card p-2.5 sm:p-4 text-xs font-semibold text-foreground border-r border-border/60 shadow-[3px_0_8px_-2px_rgba(0,0,0,0.06)] dark:shadow-[3px_0_8px_-2px_rgba(0,0,0,0.3)]">
                  <div className="font-semibold text-foreground text-xs sm:text-sm">Annual Contract Spend</div>
                  <div className="text-[10px] font-mono text-muted-foreground">12-month commitment</div>
                </td>
                {computed.map(({ vendor, calc }) => {
                  const isBest = bestAnnual !== null && calc.annualTotal === bestAnnual;
                  return (
                    <td
                      key={vendor.id}
                      className="p-2 sm:p-3 border-r border-border/40 last:border-r-0 align-top"
                    >
                      <div
                        className={`space-y-1 p-2 sm:p-2.5 rounded-xl transition-all h-full ${
                          isBest
                            ? "bg-[#8E2631]/10 dark:bg-blue-950/40 border-2 border-[#8E2631]/60 dark:border-blue-500/60 shadow-xs"
                            : "border border-border/40 bg-card/50"
                        }`}
                      >
                        <span
                          className={`text-xs sm:text-sm font-mono font-bold block tabular-nums ${
                            isBest ? "text-[#8E2631] dark:text-blue-400" : "text-foreground"
                          }`}
                        >
                          {formatCurrency(calc.annualTotal, currency)} / yr
                        </span>
                        {isBest && (
                          <span className="inline-flex items-center gap-1 text-[9px] font-mono font-bold text-white bg-[#8E2631] dark:bg-blue-600 px-1.5 py-0.5 rounded-md shadow-2xs">
                            ★ Best Annual Total
                          </span>
                        )}
                      </div>
                    </td>
                  );
                })}
              </tr>

              {/* Metric 4: Free Plan Availability */}
              <tr>
                <td className="sticky left-0 z-20 bg-card p-2.5 sm:p-4 text-xs font-semibold text-foreground border-r border-border/60 shadow-[3px_0_8px_-2px_rgba(0,0,0,0.06)] dark:shadow-[3px_0_8px_-2px_rgba(0,0,0,0.3)]">
                  <div className="font-semibold text-foreground text-xs sm:text-sm">Free Forever Tier</div>
                  <div className="text-[10px] font-mono text-muted-foreground">no credit card needed</div>
                </td>
                {computed.map(({ vendor }) => {
                  const hasFree = vendor.hasFreePlan;
                  const isBest = hasMultiple && hasFree;
                  return (
                    <td
                      key={vendor.id}
                      className="p-2 sm:p-3 border-r border-border/40 last:border-r-0 align-top"
                    >
                      <div
                        className={`text-xs flex flex-col items-start gap-1 font-mono p-2 sm:p-2.5 rounded-xl transition-all h-full ${
                          isBest
                            ? "bg-[#8E2631]/10 dark:bg-blue-950/40 border-2 border-[#8E2631]/60 dark:border-blue-500/60 shadow-xs text-[#8E2631] dark:text-blue-300"
                            : "border border-border/40 bg-card/50 text-foreground"
                        }`}
                      >
                        <div className="flex items-center gap-1.5">
                          {hasFree ? (
                            <>
                              <Check className="w-3.5 h-3.5 text-[#8E2631] dark:text-blue-400 stroke-[3]" />
                              <span className="font-bold">Available</span>
                            </>
                          ) : (
                            <>
                              <Minus className="w-3.5 h-3.5 text-muted-foreground" />
                              <span className="text-muted-foreground">14-day trial only</span>
                            </>
                          )}
                        </div>
                        {isBest && (
                          <span className="inline-flex items-center text-[9px] font-mono font-bold text-white bg-[#8E2631] dark:bg-blue-600 px-1.5 py-0.5 rounded-md shadow-2xs">
                            ★ Free Tier
                          </span>
                        )}
                      </div>
                    </td>
                  );
                })}
              </tr>

              {/* Metric 5: Plan Name & Minimum Seats */}
              <tr>
                <td className="sticky left-0 z-20 bg-card p-2.5 sm:p-4 text-xs font-semibold text-foreground border-r border-border/60 shadow-[3px_0_8px_-2px_rgba(0,0,0,0.06)] dark:shadow-[3px_0_8px_-2px_rgba(0,0,0,0.3)]">
                  <div className="font-semibold text-foreground text-xs sm:text-sm">Base Plan & Min Seats</div>
                  <div className="text-[10px] font-mono text-muted-foreground">entry tier rules</div>
                </td>
                {computed.map(({ vendor, plan }) => {
                  const isBestSeats = hasMultiple && (plan.minSeats || 1) === bestMinSeats && bestMinSeats <= 1;
                  return (
                    <td
                      key={vendor.id}
                      className="p-2 sm:p-3 border-r border-border/40 last:border-r-0 align-top"
                    >
                      <div
                        className={`text-xs space-y-1 p-2 sm:p-2.5 rounded-xl transition-all h-full ${
                          isBestSeats
                            ? "bg-[#8E2631]/10 dark:bg-blue-950/40 border-2 border-[#8E2631]/60 dark:border-blue-500/60 shadow-xs text-[#8E2631] dark:text-blue-300"
                            : "border border-border/40 bg-card/50 text-foreground"
                        }`}
                      >
                        <div className="font-semibold">{plan.name}</div>
                        <div className="text-[10px] font-mono text-muted-foreground">
                          {plan.minSeats > 1 ? `Min ${plan.minSeats} seats` : "No minimum (1 seat)"}
                        </div>
                        {isBestSeats && (
                          <span className="inline-flex items-center text-[9px] font-mono font-bold text-white bg-[#8E2631] dark:bg-blue-600 px-1.5 py-0.5 rounded-md shadow-2xs">
                            ★ 1 Seat Minimum
                          </span>
                        )}
                      </div>
                    </td>
                  );
                })}
              </tr>

              {/* Metric 6: Contract Terms */}
              <tr>
                <td className="sticky left-0 z-20 bg-card p-2.5 sm:p-4 text-xs font-semibold text-foreground border-r border-border/60 shadow-[3px_0_8px_-2px_rgba(0,0,0,0.06)] dark:shadow-[3px_0_8px_-2px_rgba(0,0,0,0.3)]">
                  <div className="font-semibold text-foreground text-xs sm:text-sm">Contract & Billing</div>
                  <div className="text-[10px] font-mono text-muted-foreground">commitments</div>
                </td>
                {computed.map(({ vendor }) => (
                  <td
                    key={vendor.id}
                    className="p-2 sm:p-3 border-r border-border/40 last:border-r-0 align-top"
                  >
                    <div className="p-2 sm:p-2.5 rounded-xl border border-border/40 bg-card/50 text-[11px] text-muted-foreground leading-snug h-full">
                      {vendor.contractTerms || "Monthly or Annual commitments"}
                    </div>
                  </td>
                ))}
              </tr>

              {/* Metric 7: Known Additional Costs */}
              <tr>
                <td className="sticky left-0 z-20 bg-card p-2.5 sm:p-4 text-xs font-semibold text-foreground border-r border-border/60 shadow-[3px_0_8px_-2px_rgba(0,0,0,0.06)] dark:shadow-[3px_0_8px_-2px_rgba(0,0,0,0.3)]">
                  <div className="font-semibold text-foreground text-xs sm:text-sm">Additional Costs</div>
                  <div className="text-[10px] font-mono text-muted-foreground">verified add-ons</div>
                </td>
                {computed.map(({ vendor }) => (
                  <td
                    key={vendor.id}
                    className="p-2 sm:p-3 border-r border-border/40 last:border-r-0 align-top"
                  >
                    <div className="p-2 sm:p-2.5 rounded-xl border border-border/40 bg-card/50 text-[11px] text-muted-foreground leading-snug h-full">
                      {vendor.additionalCosts || "None verified"}
                    </div>
                  </td>
                ))}
              </tr>

              {/* Metric 8: Official Source Action Row */}
              <tr>
                <td className="sticky left-0 z-20 bg-card p-2.5 sm:p-4 text-xs font-semibold text-foreground border-r border-border/60 shadow-[3px_0_8px_-2px_rgba(0,0,0,0.06)] dark:shadow-[3px_0_8px_-2px_rgba(0,0,0,0.3)]">
                  <div className="font-semibold text-foreground text-xs sm:text-sm">Official Rates</div>
                  <div className="text-[10px] font-mono text-muted-foreground">verified source</div>
                </td>
                {computed.map(({ vendor }) => (
                  <td
                    key={vendor.id}
                    className="p-2 sm:p-3 border-r border-border/40 last:border-r-0 align-middle"
                  >
                    <a
                      href={vendor.sourceUrl}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="inline-flex items-center justify-center gap-1.5 w-full py-2 px-3 rounded-xl text-xs font-semibold bg-muted hover:bg-muted/80 text-foreground transition-all border border-border hover:border-foreground/30 shadow-2xs group cursor-pointer"
                      title={`Open official ${vendor.name} rate sheet in new tab`}
                    >
                      <span>Rate Sheet</span>
                      <ExternalLink className="w-3.5 h-3.5 text-muted-foreground group-hover:text-foreground transition-colors" />
                    </a>
                  </td>
                ))}
              </tr>
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
}
