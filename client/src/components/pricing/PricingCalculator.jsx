import { useState, useMemo } from "react";
import { Calculator, Users, Info, Sparkles, TrendingDown } from "lucide-react";
import { calculatePlanCost, formatCurrency } from "../../lib/pricing.js";

const SEAT_PRESETS = [5, 15, 25, 50, 100];

export default function PricingCalculator({
  vendors = [],
  currency = "USD",
  activeVendorId = null,
}) {
  const defaultVendor = useMemo(() => {
    if (activeVendorId) {
      const match = vendors.find((v) => v.id === activeVendorId);
      if (match) return match;
    }
    return (
      vendors.find((v) => v.plans && v.plans.some((p) => !p.isFree)) ||
      vendors[0] ||
      null
    );
  }, [vendors, activeVendorId]);

  const [selectedVendorId, setSelectedVendorId] = useState(
    defaultVendor?.id || ""
  );

  const selectedVendor = useMemo(() => {
    return vendors.find((v) => v.id === selectedVendorId) || defaultVendor;
  }, [vendors, selectedVendorId, defaultVendor]);

  const plans = useMemo(() => {
    return selectedVendor?.plans || [];
  }, [selectedVendor]);

  const [selectedPlanId, setSelectedPlanId] = useState(
    plans.find((p) => !p.isFree)?.id || plans[0]?.id || ""
  );

  const selectedPlan = useMemo(() => {
    return plans.find((p) => p.id === selectedPlanId) || plans[0] || null;
  }, [plans, selectedPlanId]);

  const [seats, setSeats] = useState(15);
  const [billingCycle, setBillingCycle] = useState("annual");

  const handleVendorChange = (id) => {
    setSelectedVendorId(id);
    const newVendor = vendors.find((v) => v.id === id);
    if (newVendor && newVendor.plans?.length > 0) {
      const paid = newVendor.plans.find((p) => !p.isFree);
      setSelectedPlanId(paid ? paid.id : newVendor.plans[0].id);
    }
  };

  const calculation = useMemo(() => {
    return calculatePlanCost({
      vendor: selectedVendor,
      plan: selectedPlan,
      seats,
      billingCycle,
      currency,
    });
  }, [selectedVendor, selectedPlan, seats, billingCycle, currency]);

  const baseCost = calculation.breakdown?.baseFee || 0;
  const seatCost = (calculation.breakdown?.seatPrice || 0) * (calculation.breakdown?.seatsCount || 1);
  const totalCost = baseCost + seatCost;
  const seatPercent = totalCost > 0 ? Math.round((seatCost / totalCost) * 100) : 100;
  const basePercent = totalCost > 0 ? 100 - seatPercent : 0;
  const sliderPercent = Math.min(
    100,
    Math.max(0, ((Math.min(100, Math.max(1, seats)) - 1) / 99) * 100)
  );

  return (
    <div className="bg-card border border-border rounded-xl p-4 sm:p-5 shadow-2xs space-y-4 transition-all">
      {/* Header */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-2 border-b border-border/80 pb-3">
        <div className="flex items-center gap-2">
          <div className="flex items-center justify-center w-6 h-6 rounded-lg bg-foreground/5 border border-border text-foreground">
            <Calculator className="w-3.5 h-3.5 text-foreground" />
          </div>
          <div>
            <h3 className="font-semibold text-xs sm:text-sm text-foreground uppercase tracking-wider font-mono">
              Cost & Licensing Calculator
            </h3>
            <p className="text-[11px] text-muted-foreground">
              Simulate total cost of ownership across plan tiers and seat increments
            </p>
          </div>
        </div>

        {/* Billing cycle segmented toggle */}
        <div className="inline-flex items-center p-0.5 bg-muted rounded-xl text-xs font-medium self-start sm:self-auto border border-border/60">
          <button
            onClick={() => setBillingCycle("monthly")}
            className={`px-3 py-1 rounded-lg transition-all cursor-pointer ${
              billingCycle === "monthly"
                ? "bg-[#8E2631] text-white dark:bg-[#7C3AED] dark:text-white shadow-xs font-semibold"
                : "text-muted-foreground hover:text-foreground"
            }`}
          >
            Monthly
          </button>
          <button
            onClick={() => setBillingCycle("annual")}
            className={`flex items-center gap-1.5 px-3 py-1 rounded-lg transition-all cursor-pointer ${
              billingCycle === "annual"
                ? "bg-[#8E2631] text-white dark:bg-[#7C3AED] dark:text-white shadow-xs font-semibold"
                : "text-muted-foreground hover:text-foreground"
            }`}
          >
            <span>Annual</span>
            <span className="text-[10px] font-mono text-emerald-600 dark:text-emerald-300 font-semibold bg-emerald-500/15 px-1 py-0.2 rounded">
              Save ~20%
            </span>
          </button>
        </div>
      </div>

      {/* Selectors Grid */}
      <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
        {/* Vendor Selector */}
        <div>
          <label className="text-[10px] font-mono uppercase tracking-wider text-muted-foreground font-semibold block mb-1">
            Vendor
          </label>
          <select
            value={selectedVendorId}
            onChange={(e) => handleVendorChange(e.target.value)}
            className="w-full px-3 py-2 text-xs bg-background border border-border rounded-lg text-foreground font-medium outline-none focus:border-foreground/50 transition-colors cursor-pointer"
          >
            {vendors.map((v) => (
              <option key={v.id} value={v.id}>
                {v.name} ({v.shortName})
              </option>
            ))}
          </select>
        </div>

        {/* Plan / Edition Selector */}
        <div>
          <label className="text-[10px] font-mono uppercase tracking-wider text-muted-foreground font-semibold block mb-1">
            Edition / Plan
          </label>
          <select
            value={selectedPlanId}
            onChange={(e) => setSelectedPlanId(e.target.value)}
            className="w-full px-3 py-2 text-xs bg-background border border-border rounded-lg text-foreground font-medium outline-none focus:border-foreground/50 transition-colors cursor-pointer"
          >
            {plans.map((p) => (
              <option key={p.id} value={p.id}>
                {p.name} {p.isFree ? "(Free Forever)" : ""}
              </option>
            ))}
          </select>
        </div>
      </div>

      {/* Quick Seats Presets & Slider */}
      <div className="space-y-2 pt-1">
        <div className="flex items-center justify-between">
          <label className="flex items-center gap-1.5 text-xs font-semibold text-foreground">
            <Users className="w-3.5 h-3.5 text-muted-foreground" />
            <span>Billable Seats</span>
          </label>

          {/* Quick preset buttons */}
          <div className="flex items-center gap-1">
            {SEAT_PRESETS.map((preset) => (
              <button
                key={preset}
                onClick={() => setSeats(preset)}
                className={`px-2 py-0.5 rounded-md text-[10px] font-mono transition-colors cursor-pointer ${
                  seats === preset
                    ? "bg-[#8E2631] text-white dark:bg-[#7C3AED] dark:text-white font-semibold shadow-2xs"
                    : "bg-muted text-muted-foreground hover:text-foreground"
                }`}
              >
                {preset}
              </button>
            ))}
            <div className="flex items-center gap-1 bg-muted/60 border border-border/80 rounded-md px-2 py-0.5 ml-1">
              <input
                type="number"
                min="1"
                max="500"
                value={seats}
                onChange={(e) => setSeats(Math.max(1, parseInt(e.target.value, 10) || 1))}
                className="w-10 text-right bg-transparent text-xs font-semibold outline-none text-foreground font-mono"
              />
              <span className="text-[10px] text-muted-foreground font-mono">seats</span>
            </div>
          </div>
        </div>

        {/* Custom styled range slider with dynamic black/white contrast */}
        <input
          type="range"
          min="1"
          max="100"
          value={Math.min(100, Math.max(1, seats))}
          onChange={(e) => setSeats(parseInt(e.target.value, 10))}
          className="seat-slider w-full"
          style={{
            background: `linear-gradient(to right, var(--slider-fill) 0%, var(--slider-fill) ${sliderPercent}%, var(--slider-track) ${sliderPercent}%, var(--slider-track) 100%)`,
          }}
          aria-label="Billable seats slider"
        />

        <div className="flex justify-between text-[10px] text-muted-foreground font-mono">
          <span>1 seat</span>
          <span>25 seats</span>
          <span>50 seats</span>
          <span>100 seats</span>
        </div>
      </div>

      {/* Seat Minimum Callout */}
      {calculation.minSeats > seats && (
        <div className="flex items-center gap-2 p-2.5 rounded-lg bg-amber-500/10 border border-amber-500/20 text-amber-900 dark:text-amber-200 text-xs font-normal">
          <Info className="w-3.5 h-3.5 text-amber-500 flex-shrink-0" />
          <span>
            {selectedVendor?.shortName} enforces a minimum tier of{" "}
            <strong>{calculation.minSeats} seats</strong>. Calculation automatically reflects {calculation.minSeats} billable seats.
          </span>
        </div>
      )}

      {/* Numerical Results Card */}
      <div className="rounded-xl bg-muted/30 border border-border p-4 space-y-3.5">
        <div className="flex flex-col sm:flex-row sm:items-baseline justify-between gap-2 border-b border-border/60 pb-3">
          <div>
            <span className="text-[10px] font-mono uppercase tracking-wider text-muted-foreground block font-semibold">
              {billingCycle === "annual" ? "Monthly Equivalent (Annualized)" : "Monthly Cost"}
            </span>
            <div className="flex flex-wrap items-baseline gap-x-2 gap-y-0.5 mt-0.5">
              <span className="text-2xl sm:text-3xl font-extrabold font-mono tracking-tight text-foreground tabular-nums">
                {calculation.isFree
                  ? "Free ($0)"
                  : `${formatCurrency(calculation.monthlyTotal, currency)}/mo`}
              </span>
              <span className="text-xs text-muted-foreground font-mono tabular-nums">
                ({formatCurrency(calculation.monthlyPerUser, currency)} / seat)
              </span>
            </div>
          </div>

          <div className="text-left sm:text-right mt-1 sm:mt-0">
            <span className="text-[10px] font-mono uppercase tracking-wider text-muted-foreground block font-semibold">
              Annual Contract Spend
            </span>
            <span className="text-sm sm:text-base font-bold font-mono text-foreground tabular-nums">
              {formatCurrency(calculation.annualTotal, currency)} / yr
            </span>
          </div>
        </div>

        {/* Savings Line */}
        {calculation.annualSavings > 0 && (
          <div className="flex flex-wrap items-center justify-between gap-1 text-xs">
            <span className="flex items-center gap-1.5 font-medium text-muted-foreground">
              <span className="w-2 h-2 rounded-full bg-emerald-500" />
              <span>Annual vs Monthly Savings:</span>
              <strong className="text-foreground font-mono tabular-nums">
                {formatCurrency(calculation.annualSavings, currency)}/yr
              </strong>
            </span>
            <span className="font-mono text-xs text-emerald-600 dark:text-emerald-400 font-bold bg-emerald-500/10 px-2 py-0.5 rounded-full">
              Save {calculation.savingsPercent}%
            </span>
          </div>
        )}

        {/* Breakdown Progress Bar */}
        <div className="space-y-1.5 pt-1">
          <div className="flex justify-between text-[10px] font-mono text-muted-foreground font-semibold">
            <span>LICENSE ALLOCATION</span>
            <span>{seatPercent}% Seats {basePercent > 0 ? `• ${basePercent}% Base Platform` : ""}</span>
          </div>
          <div className="h-2 w-full bg-muted rounded-full overflow-hidden flex">
            <div
              className="bg-foreground h-full transition-all duration-300 rounded-l-full"
              style={{ width: `${seatPercent}%` }}
              title={`Seats: ${seatPercent}%`}
            />
            {basePercent > 0 && (
              <div
                className="bg-muted-foreground/50 h-full transition-all duration-300 rounded-r-full"
                style={{ width: `${basePercent}%` }}
                title={`Base: ${basePercent}%`}
              />
            )}
          </div>
        </div>
      </div>
    </div>
  );
}
