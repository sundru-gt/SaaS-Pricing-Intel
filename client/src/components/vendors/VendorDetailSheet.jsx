import { useState } from "react";
import { X, ExternalLink, Check, ShieldCheck, FileText, AlertCircle, Users } from "lucide-react";
import { formatCurrency, calculatePlanCost } from "../../lib/pricing.js";
import SoftwareLogo from "../shared/SoftwareLogo.jsx";

export default function VendorDetailSheet({
  vendor,
  onClose,
  initialSeats = 15,
  currency = "USD",
  billingCycle = "annual",
}) {
  const [seats, setSeats] = useState(initialSeats);
  const [activeTab, setActiveTab] = useState("tiers"); // "tiers" | "contracts"

  if (!vendor) return null;

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-end bg-black/60 backdrop-blur-xs animate-in fade-in duration-150">
      <div className="bg-card w-full max-w-lg h-full border-l border-border shadow-2xl flex flex-col justify-between overflow-y-auto p-4 sm:p-6 animate-in slide-in-from-right duration-200">
        {/* Top Header */}
        <div className="space-y-4">
          <div className="flex items-start justify-between gap-3 border-b border-border/80 pb-3.5">
            <div className="flex items-center gap-3">
              <SoftwareLogo
                name={vendor.name}
                url={vendor.sourceUrl}
                logoText={vendor.logoText || vendor.shortName.substring(0, 2).toUpperCase()}
                size="md"
              />
              <div>
                <h3 className="font-bold text-base text-foreground leading-tight">
                  {vendor.name}
                </h3>
                <span className="text-xs text-muted-foreground capitalize font-mono block">
                  {vendor.categoryId.replace("-", " ")} Suite • Verified 2026
                </span>
              </div>
            </div>

            <button
              onClick={onClose}
              className="p-1.5 rounded-lg hover:bg-muted text-muted-foreground hover:text-foreground transition-colors"
              aria-label="Close detail sheet"
            >
              <X className="w-4 h-4" />
            </button>
          </div>

          {/* Overview Description */}
          <p className="text-xs text-foreground/85 leading-relaxed bg-muted/40 p-3 rounded-xl border border-border/60">
            {vendor.description}
          </p>

          {/* Interactive Seat Adjuster inside Sheet */}
          <div className="flex items-center justify-between p-2.5 rounded-xl bg-muted/30 border border-border/60 text-xs">
            <span className="font-medium text-foreground flex items-center gap-1.5">
              <Users className="w-3.5 h-3.5 text-muted-foreground" />
              <span>Team Size Simulation:</span>
            </span>
            <div className="flex items-center gap-1.5">
              {[5, 15, 50, 100].map((s) => (
                <button
                  key={s}
                  onClick={() => setSeats(s)}
                  className={`px-2 py-0.5 rounded text-[11px] font-mono transition-colors ${
                    seats === s
                      ? "bg-foreground text-background font-bold"
                      : "bg-muted text-muted-foreground hover:text-foreground"
                  }`}
                >
                  {s}
                </button>
              ))}
            </div>
          </div>

          {/* Tabs */}
          <div className="flex border-b border-border gap-2">
            <button
              onClick={() => setActiveTab("tiers")}
              className={`pb-2 text-xs font-semibold font-mono uppercase tracking-wider transition-colors border-b-2 ${
                activeTab === "tiers"
                  ? "border-foreground text-foreground"
                  : "border-transparent text-muted-foreground hover:text-foreground"
              }`}
            >
              Available Tiers ({vendor.plans?.length || 0})
            </button>
            <button
              onClick={() => setActiveTab("contracts")}
              className={`pb-2 text-xs font-semibold font-mono uppercase tracking-wider transition-colors border-b-2 ${
                activeTab === "contracts"
                  ? "border-foreground text-foreground"
                  : "border-transparent text-muted-foreground hover:text-foreground"
              }`}
            >
              Contract & Add-ons
            </button>
          </div>

          {activeTab === "tiers" ? (
            /* All Plan Tiers */
            <div className="space-y-2.5">
              {vendor.plans?.map((plan) => {
                const planCalc = calculatePlanCost({
                  vendor,
                  plan,
                  seats,
                  billingCycle,
                  currency,
                });

                return (
                  <div
                    key={plan.id}
                    className="border border-border rounded-xl p-3.5 bg-card space-y-2 shadow-2xs hover:border-foreground/30 transition-colors"
                  >
                    <div className="flex items-baseline justify-between">
                      <div>
                        <span className="font-bold text-xs sm:text-sm text-foreground">
                          {plan.name}
                        </span>
                        {plan.minSeats > 1 && (
                          <span className="text-[10px] text-muted-foreground font-mono block">
                            Min {plan.minSeats} seats enforced
                          </span>
                        )}
                      </div>
                      <div className="text-right">
                        <span className="font-extrabold text-xs sm:text-sm font-mono text-foreground tabular-nums">
                          {plan.isFree
                            ? "Free Forever ($0)"
                            : `${formatCurrency(planCalc.monthlyTotal, currency)}/mo`}
                        </span>
                        {!plan.isFree && (
                          <span className="text-[10px] font-mono text-muted-foreground block tabular-nums">
                            ({formatCurrency(planCalc.monthlyPerUser, currency)} / seat for {seats} seats)
                          </span>
                        )}
                      </div>
                    </div>

                    {/* Features list */}
                    <div className="flex flex-wrap gap-1 pt-1">
                      {plan.features?.map((f, fi) => (
                        <span
                          key={fi}
                          className="text-[10px] bg-muted/60 text-muted-foreground px-2 py-0.5 rounded-md border border-border/40 font-mono"
                        >
                          ✓ {f}
                        </span>
                      ))}
                    </div>

                    {plan.limitations && (
                      <p className="text-[11px] text-muted-foreground/90 italic pt-1 border-t border-border/40">
                        Tier limits: {plan.limitations}
                      </p>
                    )}
                  </div>
                );
              })}
            </div>
          ) : (
            /* Hidden Costs & Contract Info */
            <div className="space-y-3">
              <div className="space-y-1.5">
                <h4 className="text-[10px] font-mono font-bold text-muted-foreground uppercase tracking-wider">
                  Add-on Costs & Surcharges
                </h4>
                <div className="space-y-1 bg-muted/30 border border-border/80 rounded-xl p-3">
                  {vendor.hiddenCosts && vendor.hiddenCosts.length > 0 ? (
                    vendor.hiddenCosts.map((hc, idx) => (
                      <div key={idx} className="flex items-start gap-1.5 text-xs text-muted-foreground">
                        <span className="text-foreground/40 font-mono">•</span>
                        <span>{hc}</span>
                      </div>
                    ))
                  ) : (
                    <span className="text-xs text-muted-foreground">No hidden charges verified.</span>
                  )}
                </div>
              </div>

              <div className="space-y-1.5">
                <h4 className="text-[10px] font-mono font-bold text-muted-foreground uppercase tracking-wider">
                  Contract Terms & Renewal Policy
                </h4>
                <p className="text-xs text-foreground/80 bg-muted/30 p-3 rounded-xl border border-border/80 leading-relaxed">
                  {vendor.contractInfo || "Standard annual and monthly agreements available."}
                </p>
              </div>

              {/* Verified Source */}
              <div className="flex items-center justify-between text-xs text-muted-foreground pt-2 border-t border-border">
                <span className="flex items-center gap-1 font-mono text-[10px]">
                  <Check className="w-3.5 h-3.5 text-emerald-500" />
                  Verified {vendor.verifiedDate}
                </span>
                <span className="text-[10px] font-mono">{vendor.pricingSource}</span>
              </div>
            </div>
          )}
        </div>

        {/* Footer Actions */}
        <div className="pt-4 mt-4 border-t border-border space-y-2">
          <a
            href={vendor.sourceUrl}
            target="_blank"
            rel="noopener noreferrer"
            className="w-full flex items-center justify-center gap-1.5 py-2.5 px-4 rounded-xl bg-foreground text-background font-semibold text-xs hover:opacity-90 transition-opacity shadow-sm"
          >
            <span>Visit Official {vendor.shortName} Pricing Page</span>
            <ExternalLink className="w-3.5 h-3.5" />
          </a>
          <button
            onClick={onClose}
            className="w-full py-2 px-4 rounded-xl border border-border bg-card hover:bg-muted text-foreground font-semibold text-xs transition-colors"
          >
            Close Sheet
          </button>
        </div>
      </div>
    </div>
  );
}
