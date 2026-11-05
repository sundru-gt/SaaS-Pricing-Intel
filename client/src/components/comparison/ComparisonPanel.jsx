import { useState, useMemo, useEffect } from "react";
import { X, Check, Minus, Users, ExternalLink } from "lucide-react";
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

  // Responsive column width ratios for fixed, zero-horizontal-scroll layout
  const labelColWidth =
    computed.length === 1
      ? "w-[30%] sm:w-[26%]"
      : computed.length === 2
      ? "w-[26%] sm:w-[22%]"
      : "w-[25%] sm:w-[22%]";

  const vendorColWidth =
    computed.length === 1
      ? "w-[70%] sm:w-[74%]"
      : computed.length === 2
      ? "w-[37%] sm:w-[39%]"
      : "w-[25%] sm:w-[26%]";

  return (
    <div
      onClick={(e) => {
        if (e.target === e.currentTarget) onClose?.();
      }}
      className="fixed inset-0 z-50 flex items-center justify-center p-1.5 xs:p-2 sm:p-4 md:p-6 bg-black/60 backdrop-blur-xs animate-in fade-in duration-150"
    >
      <div className="bg-card rounded-xl sm:rounded-2xl border border-border shadow-2xl w-full max-w-5xl max-h-[96vh] sm:max-h-[92vh] flex flex-col overflow-hidden animate-in zoom-in-98 duration-150">
        {/* Header */}
        <div className="flex items-center justify-between p-2.5 sm:p-4 border-b border-border flex-shrink-0 gap-2 sm:gap-4 bg-card/95 backdrop-blur-xs">
          <div className="min-w-0 flex-1">
            <h3 className="font-bold text-[11px] xs:text-xs sm:text-sm text-foreground uppercase tracking-wider font-mono truncate">
              Comparison Matrix ({vendors.length} {vendors.length === 1 ? "vendor" : "vendors"})
            </h3>
            <p className="text-[9px] xs:text-[10px] sm:text-[11px] text-muted-foreground font-mono truncate">
              {billingCycle === "annual" ? "Annual commitment" : "Monthly billing"} • {seats} seats
            </p>
          </div>

          <div className="flex items-center gap-1.5 sm:gap-3 flex-shrink-0">
            {/* Live seats adjuster inside modal */}
            <div className="flex items-center gap-1 bg-muted/60 border border-border/80 rounded-lg px-1.5 sm:px-2.5 py-0.5 sm:py-1">
              <Users className="w-3 h-3 sm:w-3.5 sm:h-3.5 text-muted-foreground flex-shrink-0" />
              <input
                type="number"
                min="1"
                max="500"
                value={seats}
                onChange={(e) => setSeats(Math.max(1, parseInt(e.target.value, 10) || 1))}
                className="w-7 sm:w-10 text-right bg-transparent text-[11px] sm:text-xs font-bold outline-none text-foreground font-mono"
                aria-label="Number of seats"
              />
              <span className="text-[9px] sm:text-[11px] text-muted-foreground font-mono">seats</span>
            </div>

            <button
              onClick={onClose}
              className="p-1 sm:p-1.5 rounded-lg hover:bg-muted text-muted-foreground hover:text-foreground transition-colors cursor-pointer"
              aria-label="Close comparison matrix"
            >
              <X className="w-3.5 h-3.5 sm:w-4 sm:h-4" />
            </button>
          </div>
        </div>

        {/* Fully Responsive Comparison Table - ZERO Horizontal Scroll */}
        <div className="overflow-y-auto overflow-x-hidden flex-1 relative">
          <table className="w-full table-fixed border-collapse text-left">
            {/* Table Header: Software Names & Logos */}
            <thead className="sticky top-0 z-30 bg-card shadow-xs">
              <tr className="border-b border-border/80">
                <th
                  className={`${labelColWidth} p-1.5 xs:p-2 sm:p-3 text-[9px] xs:text-[10px] sm:text-xs font-mono font-bold uppercase tracking-wider text-muted-foreground border-r border-border/60 bg-card align-middle`}
                >
                  Software
                </th>
                {computed.map(({ vendor }) => (
                  <th
                    key={vendor.id}
                    className={`${vendorColWidth} p-1 xs:p-1.5 sm:p-2.5 border-r border-border/40 last:border-r-0 align-top bg-card`}
                  >
                    <div className="flex items-center justify-between gap-1 p-1 xs:p-1.5 sm:p-2 rounded-lg sm:rounded-xl bg-muted/50 border border-border shadow-2xs">
                      <div className="flex items-center gap-1 xs:gap-1.5 sm:gap-2 truncate min-w-0">
                        <SoftwareLogo
                          name={vendor.name}
                          url={vendor.sourceUrl}
                          logoText={vendor.logoText || vendor.shortName.substring(0, 2)}
                          size="xs"
                        />
                        <span
                          className="text-[10px] xs:text-xs sm:text-sm font-bold truncate text-foreground"
                          title={vendor.name}
                        >
                          {vendor.name}
                        </span>
                      </div>
                      <button
                        onClick={() => onRemoveVendor(vendor.id)}
                        className="text-muted-foreground hover:text-rose-500 p-0.5 sm:p-1 rounded hover:bg-muted transition-colors flex-shrink-0 cursor-pointer"
                        title={`Remove ${vendor.name}`}
                      >
                        <X className="w-3 h-3 sm:w-3.5 sm:h-3.5" />
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
                <td className={`${labelColWidth} p-1.5 xs:p-2 sm:p-3 border-r border-border/60 align-top`}>
                  <div className="font-semibold text-foreground text-[10px] xs:text-[11px] sm:text-sm leading-tight">
                    Total Monthly
                  </div>
                  <div className="text-[8px] xs:text-[9px] sm:text-[10px] font-mono text-muted-foreground">
                    {seats} seats
                  </div>
                </td>
                {computed.map(({ vendor, calc }) => {
                  const isBest = bestMonthly !== null && calc.monthlyTotal === bestMonthly;
                  return (
                    <td
                      key={vendor.id}
                      className={`${vendorColWidth} p-1 xs:p-1.5 sm:p-2 border-r border-border/40 last:border-r-0 align-top`}
                    >
                      <div
                        className={`space-y-0.5 sm:space-y-1 p-1.5 xs:p-2 sm:p-2.5 rounded-lg sm:rounded-xl transition-all h-full ${
                          isBest
                            ? "bg-[#8E2631]/10 dark:bg-blue-950/40 border-2 border-[#8E2631]/60 dark:border-blue-500/60 shadow-xs"
                            : "border border-border/40 bg-card/50"
                        }`}
                      >
                        <span
                          className={`text-[11px] xs:text-xs sm:text-sm md:text-base font-bold font-mono block tabular-nums leading-tight ${
                            isBest ? "text-[#8E2631] dark:text-blue-400" : "text-foreground"
                          }`}
                        >
                          {calc.isFree
                            ? "Free ($0)"
                            : `${formatCurrency(calc.monthlyTotal, currency)}/mo`}
                        </span>
                        {isBest && (
                          <span className="inline-flex items-center gap-0.5 text-[8px] xs:text-[9px] font-mono font-bold text-white bg-[#8E2631] dark:bg-blue-600 px-1 py-0.5 rounded leading-none shadow-2xs">
                            ★ Best
                          </span>
                        )}
                      </div>
                    </td>
                  );
                })}
              </tr>

              {/* Metric 2: Per Seat Rate */}
              <tr>
                <td className={`${labelColWidth} p-1.5 xs:p-2 sm:p-3 border-r border-border/60 align-top`}>
                  <div className="font-semibold text-foreground text-[10px] xs:text-[11px] sm:text-sm leading-tight">
                    Effective / Seat
                  </div>
                  <div className="text-[8px] xs:text-[9px] sm:text-[10px] font-mono text-muted-foreground">
                    per user / mo
                  </div>
                </td>
                {computed.map(({ vendor, calc }) => {
                  const isBest = bestPerUser !== null && calc.monthlyPerUser === bestPerUser;
                  return (
                    <td
                      key={vendor.id}
                      className={`${vendorColWidth} p-1 xs:p-1.5 sm:p-2 border-r border-border/40 last:border-r-0 align-top`}
                    >
                      <div
                        className={`space-y-0.5 sm:space-y-1 p-1.5 xs:p-2 sm:p-2.5 rounded-lg sm:rounded-xl transition-all h-full ${
                          isBest
                            ? "bg-[#8E2631]/10 dark:bg-blue-950/40 border-2 border-[#8E2631]/60 dark:border-blue-500/60 shadow-xs"
                            : "border border-border/40 bg-card/50"
                        }`}
                      >
                        <span
                          className={`text-[10px] xs:text-[11px] sm:text-xs md:text-sm font-mono font-bold block tabular-nums leading-tight ${
                            isBest ? "text-[#8E2631] dark:text-blue-400" : "text-foreground"
                          }`}
                        >
                          {formatCurrency(calc.monthlyPerUser, currency)}/seat
                        </span>
                        {isBest && (
                          <span className="inline-flex items-center gap-0.5 text-[8px] xs:text-[9px] font-mono font-bold text-white bg-[#8E2631] dark:bg-blue-600 px-1 py-0.5 rounded leading-none shadow-2xs">
                            ★ Best
                          </span>
                        )}
                      </div>
                    </td>
                  );
                })}
              </tr>

              {/* Metric 3: Annual Spend */}
              <tr>
                <td className={`${labelColWidth} p-1.5 xs:p-2 sm:p-3 border-r border-border/60 align-top`}>
                  <div className="font-semibold text-foreground text-[10px] xs:text-[11px] sm:text-sm leading-tight">
                    Annual Total
                  </div>
                  <div className="text-[8px] xs:text-[9px] sm:text-[10px] font-mono text-muted-foreground">
                    12-mo commit
                  </div>
                </td>
                {computed.map(({ vendor, calc }) => {
                  const isBest = bestAnnual !== null && calc.annualTotal === bestAnnual;
                  return (
                    <td
                      key={vendor.id}
                      className={`${vendorColWidth} p-1 xs:p-1.5 sm:p-2 border-r border-border/40 last:border-r-0 align-top`}
                    >
                      <div
                        className={`space-y-0.5 sm:space-y-1 p-1.5 xs:p-2 sm:p-2.5 rounded-lg sm:rounded-xl transition-all h-full ${
                          isBest
                            ? "bg-[#8E2631]/10 dark:bg-blue-950/40 border-2 border-[#8E2631]/60 dark:border-blue-500/60 shadow-xs"
                            : "border border-border/40 bg-card/50"
                        }`}
                      >
                        <span
                          className={`text-[10px] xs:text-[11px] sm:text-xs md:text-sm font-mono font-bold block tabular-nums leading-tight ${
                            isBest ? "text-[#8E2631] dark:text-blue-400" : "text-foreground"
                          }`}
                        >
                          {formatCurrency(calc.annualTotal, currency)}/yr
                        </span>
                        {isBest && (
                          <span className="inline-flex items-center gap-0.5 text-[8px] xs:text-[9px] font-mono font-bold text-white bg-[#8E2631] dark:bg-blue-600 px-1 py-0.5 rounded leading-none shadow-2xs">
                            ★ Best
                          </span>
                        )}
                      </div>
                    </td>
                  );
                })}
              </tr>

              {/* Metric 4: Free Plan Availability */}
              <tr>
                <td className={`${labelColWidth} p-1.5 xs:p-2 sm:p-3 border-r border-border/60 align-top`}>
                  <div className="font-semibold text-foreground text-[10px] xs:text-[11px] sm:text-sm leading-tight">
                    Free Tier
                  </div>
                  <div className="text-[8px] xs:text-[9px] sm:text-[10px] font-mono text-muted-foreground">
                    forever plan
                  </div>
                </td>
                {computed.map(({ vendor }) => {
                  const hasFree = vendor.hasFreePlan;
                  const isBest = hasMultiple && hasFree;
                  return (
                    <td
                      key={vendor.id}
                      className={`${vendorColWidth} p-1 xs:p-1.5 sm:p-2 border-r border-border/40 last:border-r-0 align-top`}
                    >
                      <div
                        className={`text-[10px] xs:text-[11px] sm:text-xs flex flex-col items-start gap-1 font-mono p-1.5 xs:p-2 sm:p-2.5 rounded-lg sm:rounded-xl transition-all h-full ${
                          isBest
                            ? "bg-[#8E2631]/10 dark:bg-blue-950/40 border-2 border-[#8E2631]/60 dark:border-blue-500/60 shadow-xs text-[#8E2631] dark:text-blue-300"
                            : "border border-border/40 bg-card/50 text-foreground"
                        }`}
                      >
                        <div className="flex items-center gap-1">
                          {hasFree ? (
                            <>
                              <Check className="w-3 h-3 sm:w-3.5 sm:h-3.5 text-[#8E2631] dark:text-blue-400 stroke-[3] flex-shrink-0" />
                              <span className="font-bold text-[9px] xs:text-[10px] sm:text-xs">Yes</span>
                            </>
                          ) : (
                            <>
                              <Minus className="w-3 h-3 sm:w-3.5 sm:h-3.5 text-muted-foreground flex-shrink-0" />
                              <span className="text-muted-foreground text-[9px] xs:text-[10px] sm:text-xs">Trial</span>
                            </>
                          )}
                        </div>
                        {isBest && (
                          <span className="inline-flex items-center text-[8px] xs:text-[9px] font-mono font-bold text-white bg-[#8E2631] dark:bg-blue-600 px-1 py-0.5 rounded leading-none shadow-2xs">
                            ★ Free
                          </span>
                        )}
                      </div>
                    </td>
                  );
                })}
              </tr>

              {/* Metric 5: Plan Name & Minimum Seats */}
              <tr>
                <td className={`${labelColWidth} p-1.5 xs:p-2 sm:p-3 border-r border-border/60 align-top`}>
                  <div className="font-semibold text-foreground text-[10px] xs:text-[11px] sm:text-sm leading-tight">
                    Plan & Seats
                  </div>
                  <div className="text-[8px] xs:text-[9px] sm:text-[10px] font-mono text-muted-foreground">
                    entry tier
                  </div>
                </td>
                {computed.map(({ vendor, plan }) => {
                  const isBestSeats = hasMultiple && (plan.minSeats || 1) === bestMinSeats && bestMinSeats <= 1;
                  return (
                    <td
                      key={vendor.id}
                      className={`${vendorColWidth} p-1 xs:p-1.5 sm:p-2 border-r border-border/40 last:border-r-0 align-top`}
                    >
                      <div
                        className={`space-y-0.5 sm:space-y-1 p-1.5 xs:p-2 sm:p-2.5 rounded-lg sm:rounded-xl transition-all h-full ${
                          isBestSeats
                            ? "bg-[#8E2631]/10 dark:bg-blue-950/40 border-2 border-[#8E2631]/60 dark:border-blue-500/60 shadow-xs text-[#8E2631] dark:text-blue-300"
                            : "border border-border/40 bg-card/50 text-foreground"
                        }`}
                      >
                        <div
                          className="font-semibold truncate text-[9px] xs:text-[10px] sm:text-xs"
                          title={plan.name}
                        >
                          {plan.name}
                        </div>
                        <div className="text-[8px] xs:text-[9px] sm:text-[10px] font-mono text-muted-foreground">
                          {plan.minSeats > 1 ? `Min ${plan.minSeats}` : "1 seat min"}
                        </div>
                        {isBestSeats && (
                          <span className="inline-flex items-center text-[8px] xs:text-[9px] font-mono font-bold text-white bg-[#8E2631] dark:bg-blue-600 px-1 py-0.5 rounded leading-none shadow-2xs">
                            ★ 1 Seat
                          </span>
                        )}
                      </div>
                    </td>
                  );
                })}
              </tr>

              {/* Metric 6: Contract Terms */}
              <tr>
                <td className={`${labelColWidth} p-1.5 xs:p-2 sm:p-3 border-r border-border/60 align-top`}>
                  <div className="font-semibold text-foreground text-[10px] xs:text-[11px] sm:text-sm leading-tight">
                    Commitment
                  </div>
                  <div className="text-[8px] xs:text-[9px] sm:text-[10px] font-mono text-muted-foreground">
                    billing lock
                  </div>
                </td>
                {computed.map(({ vendor }) => (
                  <td
                    key={vendor.id}
                    className={`${vendorColWidth} p-1 xs:p-1.5 sm:p-2 border-r border-border/40 last:border-r-0 align-top`}
                  >
                    <div className="p-1.5 xs:p-2 sm:p-2.5 rounded-lg sm:rounded-xl border border-border/40 bg-card/50 text-[9px] xs:text-[10px] sm:text-[11px] text-muted-foreground leading-tight h-full">
                      {vendor.contractTerms || "Monthly or Annual"}
                    </div>
                  </td>
                ))}
              </tr>

              {/* Metric 7: Known Additional Costs */}
              <tr>
                <td className={`${labelColWidth} p-1.5 xs:p-2 sm:p-3 border-r border-border/60 align-top`}>
                  <div className="font-semibold text-foreground text-[10px] xs:text-[11px] sm:text-sm leading-tight">
                    Add-ons
                  </div>
                  <div className="text-[8px] xs:text-[9px] sm:text-[10px] font-mono text-muted-foreground">
                    extra fees
                  </div>
                </td>
                {computed.map(({ vendor }) => (
                  <td
                    key={vendor.id}
                    className={`${vendorColWidth} p-1 xs:p-1.5 sm:p-2 border-r border-border/40 last:border-r-0 align-top`}
                  >
                    <div className="p-1.5 xs:p-2 sm:p-2.5 rounded-lg sm:rounded-xl border border-border/40 bg-card/50 text-[9px] xs:text-[10px] sm:text-[11px] text-muted-foreground leading-tight h-full">
                      {vendor.additionalCosts || "None verified"}
                    </div>
                  </td>
                ))}
              </tr>

              {/* Metric 8: Official Source Action Row */}
              <tr>
                <td className={`${labelColWidth} p-1.5 xs:p-2 sm:p-3 border-r border-border/60 align-middle`}>
                  <div className="font-semibold text-foreground text-[10px] xs:text-[11px] sm:text-sm leading-tight">
                    Rate Sheet
                  </div>
                  <div className="text-[8px] xs:text-[9px] sm:text-[10px] font-mono text-muted-foreground">
                    verified URL
                  </div>
                </td>
                {computed.map(({ vendor }) => (
                  <td
                    key={vendor.id}
                    className={`${vendorColWidth} p-1 xs:p-1.5 sm:p-2 border-r border-border/40 last:border-r-0 align-middle`}
                  >
                    <a
                      href={vendor.sourceUrl}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="inline-flex items-center justify-center gap-1 w-full py-1 xs:py-1.5 sm:py-2 px-1 xs:px-2 rounded-lg sm:rounded-xl text-[9px] xs:text-[10px] sm:text-xs font-semibold bg-muted hover:bg-muted/80 text-foreground transition-all border border-border hover:border-foreground/30 shadow-2xs group cursor-pointer text-center"
                      title={`Open official ${vendor.name} rate sheet in new tab`}
                    >
                      <span className="truncate">Rates</span>
                      <ExternalLink className="w-2.5 h-2.5 sm:w-3.5 sm:h-3.5 text-muted-foreground group-hover:text-foreground transition-colors flex-shrink-0" />
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
