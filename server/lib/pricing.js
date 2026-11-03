/**
 * Centralized SaaS Pricing Engine
 * Handles per-user pricing, flat rate plans, base fees, billing frequencies,
 * currency conversions (USD/INR), annual savings, unused seats waste, and renewal uplifts.
 */

export const USD_TO_INR_RATE = 86.5;

/**
 * Formats a currency amount into USD or INR string.
 */
export function formatCurrency(amount, currency = "USD") {
  if (amount === undefined || amount === null || isNaN(amount)) return "N/A";
  if (amount === 0) return "Free";

  if (currency === "INR") {
    return new Intl.NumberFormat("en-IN", {
      style: "currency",
      currency: "INR",
      maximumFractionDigits: 0,
    }).format(amount);
  }

  return new Intl.NumberFormat("en-US", {
    style: "currency",
    currency: "USD",
    maximumFractionDigits: amount % 1 === 0 ? 0 : 2,
  }).format(amount);
}

/**
 * Calculates plan costs for a given vendor, plan, seats, billing cycle and currency.
 */
export function calculatePlanCost({
  vendor,
  plan,
  seats = 1,
  billingCycle = "annual", // "annual" | "monthly"
  currency = "USD",
}) {
  if (!vendor || !plan) {
    return {
      monthlyTotal: 0,
      annualTotal: 0,
      monthlyPerUser: 0,
      annualSavings: 0,
      savingsPercent: 0,
      breakdown: { baseMonthly: 0, perSeatMonthly: 0, seats: 1 },
      currency,
    };
  }

  const effectiveSeats = Math.max(1, parseInt(seats, 10) || 1);
  const minSeats = plan.minSeats || 1;
  const billableSeats = Math.max(effectiveSeats, minSeats);

  const isPerUser = plan.pricingModel === "per_user";
  const hasBaseFee = Boolean(plan.baseFeeMonthly);

  // Rate in plan's native currency
  let monthlyRatePerUser = plan.monthlyPricePerUser || 0;
  let annualRatePerUser = plan.annualPricePerUser || monthlyRatePerUser;
  let baseFeeMonthly = plan.baseFeeMonthly || 0;
  let baseFeeAnnualPerMonth = plan.baseFeeAnnualPerMonth || baseFeeMonthly;

  // Currency conversion if vendor's native currency is INR and requested USD, or vice-versa
  const nativeCurrency = vendor.currency || "USD";
  const rateMultiplier =
    nativeCurrency === currency
      ? 1
      : currency === "INR" && nativeCurrency === "USD"
      ? USD_TO_INR_RATE
      : currency === "USD" && nativeCurrency === "INR"
      ? 1 / USD_TO_INR_RATE
      : 1;

  monthlyRatePerUser *= rateMultiplier;
  annualRatePerUser *= rateMultiplier;
  baseFeeMonthly *= rateMultiplier;
  baseFeeAnnualPerMonth *= rateMultiplier;

  // Monthly billing calculations:
  const monthlyTotal = isPerUser
    ? baseFeeMonthly + monthlyRatePerUser * billableSeats
    : baseFeeMonthly || monthlyRatePerUser;

  // Annual billing calculations (per month and per year):
  const annualMonthlyEquivalent = isPerUser
    ? baseFeeAnnualPerMonth + annualRatePerUser * billableSeats
    : baseFeeAnnualPerMonth || annualRatePerUser;

  const annualTotal = annualMonthlyEquivalent * 12;

  // Chosen cycle calculations:
  const activeMonthlyCost =
    billingCycle === "annual" ? annualMonthlyEquivalent : monthlyTotal;

  const activeAnnualCost =
    billingCycle === "annual" ? annualTotal : monthlyTotal * 12;

  const activePerUserCost = isPerUser
    ? billingCycle === "annual"
      ? annualRatePerUser
      : monthlyRatePerUser
    : activeMonthlyCost / billableSeats;

  // Savings if choosing annual over monthly:
  const fullYearPaidMonthly = monthlyTotal * 12;
  const fullYearPaidAnnually = annualTotal;
  const annualSavings = Math.max(0, fullYearPaidMonthly - fullYearPaidAnnually);
  const savingsPercent =
    fullYearPaidMonthly > 0
      ? Math.round((annualSavings / fullYearPaidMonthly) * 100)
      : 0;

  return {
    billingCycle,
    seats: effectiveSeats,
    billableSeats,
    minSeats,
    monthlyTotal: Math.round(activeMonthlyCost * 100) / 100,
    annualTotal: Math.round(activeAnnualCost * 100) / 100,
    monthlyPerUser: Math.round(activePerUserCost * 100) / 100,
    annualSavings: Math.round(annualSavings * 100) / 100,
    savingsPercent,
    currency,
    isFree: plan.isFree || (monthlyTotal === 0 && annualTotal === 0),
    breakdown: {
      isPerUser,
      baseFee: billingCycle === "annual" ? baseFeeAnnualPerMonth : baseFeeMonthly,
      seatPrice: billingCycle === "annual" ? annualRatePerUser : monthlyRatePerUser,
      seatsCount: billableSeats,
      enforcedMinimum: minSeats > effectiveSeats ? minSeats : null,
    },
  };
}

/**
 * Unused Seats Waste Calculator:
 * Computes how much money an organization wastes on provisioned but inactive licenses.
 */
export function calculateUnusedSeatsWaste({
  costPerSeatMonthly,
  totalSeats,
  unusedSeats,
  months = 12,
  currency = "USD",
}) {
  const total = Math.max(1, parseInt(totalSeats, 10) || 1);
  const seats = Math.min(total, Math.max(0, parseInt(unusedSeats, 10) || 0));
  const monthlyCost = parseFloat(costPerSeatMonthly) || 0;
  const monthlyWaste = seats * monthlyCost;
  const totalWaste = monthlyWaste * months;
  const wastePercentage = Math.round((seats / total) * 100);

  return {
    totalSeats: total,
    unusedSeats: seats,
    monthlyWaste: Math.round(monthlyWaste * 100) / 100,
    totalWaste: Math.round(totalWaste * 100) / 100,
    annualWaste: Math.round(totalWaste * 100) / 100,
    wastePercentage,
    currency,
  };
}

/**
 * Renewal Price Increase (Uplift) Calculator:
 * Simulates expected 5-15% annual price escalations on SaaS contract renewals.
 */
export function calculateRenewalUplift({
  currentAnnualCost,
  annualUpliftPercent = 7, // typical 5-10% standard clause
  years = 3,
  currency = "USD",
}) {
  const yearlyProjections = [];
  const baseCost = parseFloat(currentAnnualCost) || 0;
  const upliftRate = parseFloat(annualUpliftPercent) || 0;
  let cost = baseCost;

  for (let y = 1; y <= years; y++) {
    cost = cost * (1 + upliftRate / 100);
    yearlyProjections.push({
      year: y,
      projectedCost: Math.round(cost * 100) / 100,
      cumulativeIncrease: Math.round((cost - baseCost) * 100) / 100,
    });
  }

  const lastYear = yearlyProjections[yearlyProjections.length - 1] || {
    projectedCost: cost,
    cumulativeIncrease: 0,
  };

  return {
    currentAnnualCost: baseCost,
    annualUpliftPercent: upliftRate,
    yearlyProjections,
    finalAnnualCost: lastYear.projectedCost,
    cumulativeIncrease: lastYear.cumulativeIncrease,
    currency,
  };
}

