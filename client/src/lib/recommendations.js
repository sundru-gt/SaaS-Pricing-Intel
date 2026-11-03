/**
 * Guided 4-Question Recommendation Flow Engine
 * 1. Team size
 * 2. Budget per user
 * 3. Must-have feature
 * 4. Current tool
 *
 * Uses deterministic scoring based on structured vendor data.
 */

export const GUIDED_QUESTIONS = [
  {
    id: "team_size",
    step: 1,
    title: "Roughly how many team members will use this tool?",
    subtitle: "Helps us filter out seat-bracket minimums and enterprise pricing tiers.",
    options: [
      { id: "solo", label: "Solo / Freelancer", value: 1, description: "1 user (no minimum seat packs)" },
      { id: "small", label: "2 - 10 people", value: 5, description: "Small agile team or startup" },
      { id: "medium", label: "11 - 50 people", value: 25, description: "Growing department or SME" },
      { id: "enterprise", label: "50+ people", value: 75, description: "Enterprise requiring SSO & audit logs" },
    ],
  },
  {
    id: "budget",
    step: 2,
    title: "What is your target budget per user / month?",
    subtitle: "We will flag tools that fit within your target without surprise add-ons.",
    options: [
      { id: "free", label: "Free only ($0)", value: 0, description: "Strictly $0 / open-source / freemium" },
      { id: "under15", label: "Under $15 / user / mo", value: 15, description: "Cost-conscious starter plans" },
      { id: "under35", label: "Under $35 / user / mo", value: 35, description: "Mid-tier with automation & reporting" },
      { id: "flexible", label: "Flexible / Enterprise", value: 999, description: "Feature depth prioritized over cost" },
    ],
  },
  {
    id: "must_have",
    step: 3,
    title: "What is your must-have feature priority?",
    subtitle: "Weights recommendations toward specific core capability strengths.",
    options: [
      { id: "ease", label: "Simplicity & Fast Onboarding", value: "ease", description: "Zero training required, up and running today" },
      { id: "automation", label: "Automated Workflows & Integrations", value: "automation", description: "Triggered sequences, bot rules, and API sync" },
      { id: "reporting", label: "Deep Reporting & Analytics", value: "reporting", description: "Executive dashboards and custom metric formulas" },
      { id: "compliance", label: "Compliance & Security (GST/SSO/Audit)", value: "compliance", description: "Enterprise security, SAML SSO, or Indian GST" },
    ],
  },
  {
    id: "current_tool",
    step: 4,
    title: "What are you currently using today?",
    subtitle: "Helps us recommend intuitive upgrade paths or seamless migrations.",
    options: [
      { id: "spreadsheets", label: "Spreadsheets (Excel / Google Sheets)", value: "spreadsheets", description: "Looking for first dedicated SaaS platform" },
      { id: "free_tool", label: "A Free / Basic Tool", value: "free_tool", description: "Hit limitations on free plan storage or users" },
      { id: "legacy_suite", label: "Legacy Enterprise Suite", value: "legacy_suite", description: "Looking for modern UX and better pricing" },
      { id: "nothing", label: "Starting completely fresh", value: "nothing", description: "New project or new company setup" },
    ],
  },
];

/**
 * Ranks vendors deterministically according to the answers to the 4 questions.
 * Guaranteed to produce a percentage score between 35% and 98% (never exceeds 100%).
 */
export function rankVendors(vendors, answers = {}, categoryId = "all") {
  if (!vendors || vendors.length === 0) return [];

  // Filter by category if not 'all'
  let candidates =
    categoryId === "all"
      ? [...vendors]
      : vendors.filter((v) => v.categoryId === categoryId);

  const hasTeamSize = !!answers.team_size;
  const hasBudget = answers.budget !== undefined;
  const hasMustHave = !!answers.must_have;
  const hasCurrentTool = !!answers.current_tool;

  const teamSizeVal = hasTeamSize ? answers.team_size.value : 5;
  const budgetVal = hasBudget ? answers.budget.value : 35;
  const mustHave = hasMustHave ? answers.must_have.value : null;
  const currentTool = hasCurrentTool ? answers.current_tool.value : null;

  const scored = candidates.map((vendor) => {
    // Dimension maximums sum to 100 points:
    // Budget: 30 pts, Team: 25 pts, Feature: 25 pts, Migration: 20 pts = 100 max.
    let budgetScore = 20; // baseline 20/30
    let teamScore = 16;   // baseline 16/25
    let featureScore = 15; // baseline 15/25
    let migrationScore = 12; // baseline 12/20
    let reasons = [];

    // Find cheapest plan
    const paidPlans = vendor.plans?.filter((p) => !p.isFree) || [];
    const cheapestPaid = paidPlans.length > 0 ? paidPlans[0] : null;
    const cheapestMonthly = cheapestPaid
      ? cheapestPaid.annualPricePerUser || cheapestPaid.monthlyPricePerUser || cheapestPaid.baseFeeMonthly || 0
      : 0;

    const minSeats = Math.min(...(vendor.plans?.map((p) => p.minSeats || 1) || [1]));

    // 1. Budget Fit (Max 30)
    if (hasBudget) {
      if (budgetVal === 0) {
        if (vendor.hasFreePlan) {
          budgetScore = 30;
          reasons.push("Offers a permanent free plan");
        } else {
          budgetScore = 4;
        }
      } else if (cheapestMonthly <= budgetVal) {
        budgetScore = 30;
        reasons.push(`Fits budget at ${cheapestMonthly > 0 ? `$${cheapestMonthly}/mo` : "free"}`);
      } else if (cheapestMonthly <= budgetVal * 1.35) {
        budgetScore = 18;
      } else {
        budgetScore = 6;
      }
    }

    // 2. Team Size Fit (Max 25)
    if (hasTeamSize) {
      if (teamSizeVal === 1) {
        if (minSeats > 1) {
          teamScore = 5;
        } else {
          teamScore = 25;
          reasons.push("Supports solo users without seat packs");
        }
      } else if (teamSizeVal >= 50) {
        const enterpriseReady = [
          "salesforce",
          "jira",
          "microsoft-teams",
          "rippling",
          "tableau",
          "power-bi",
          "slack",
          "greythr",
          "webex",
          "amplitude",
        ];
        if (enterpriseReady.includes(vendor.id)) {
          teamScore = 25;
          reasons.push("Enterprise infrastructure with SSO & audit controls");
        } else {
          teamScore = 16;
        }
      } else {
        if (minSeats <= teamSizeVal) {
          teamScore = 25;
          reasons.push(`Optimal for team size of ${teamSizeVal}`);
        } else {
          teamScore = 10;
        }
      }
    }

    // 3. Must-Have Feature Alignment (Max 25)
    if (hasMustHave) {
      if (mustHave === "ease") {
        const easeTools = ["trello", "pipedrive", "freshsales", "zoom", "notion", "airtable", "freshbooks"];
        if (easeTools.includes(vendor.id)) {
          featureScore = 25;
          reasons.push("Rapid user adoption with zero onboarding friction");
        } else {
          featureScore = 12;
        }
      } else if (mustHave === "automation") {
        const autoTools = ["monday", "clickup", "salesforce", "slack", "rippling", "mixpanel", "amplitude"];
        if (autoTools.includes(vendor.id)) {
          featureScore = 25;
          reasons.push("Advanced automated triggers and multi-step bots");
        } else {
          featureScore = 12;
        }
      } else if (mustHave === "reporting") {
        const reportTools = ["power-bi", "tableau", "mixpanel", "amplitude", "asana", "jira"];
        if (reportTools.includes(vendor.id)) {
          featureScore = 25;
          reasons.push("Executive dashboards and deep metric modeling");
        } else {
          featureScore = 12;
        }
      } else if (mustHave === "compliance") {
        const compTools = ["zoho-books", "greythr", "tallyprime", "webex", "salesforce", "rippling", "keka"];
        if (compTools.includes(vendor.id)) {
          featureScore = 25;
          reasons.push("Statutory compliance, GST e-invoicing, or security audits");
        } else {
          featureScore = 12;
        }
      }
    }

    // 4. Current Tool Migration (Max 20)
    if (hasCurrentTool) {
      if (currentTool === "spreadsheets") {
        const spreadsheetUpgrades = ["trello", "zoho-crm", "quickbooks", "pipedrive", "monday", "freshbooks"];
        if (spreadsheetUpgrades.includes(vendor.id)) {
          migrationScore = 20;
          reasons.push("Smooth migration path from manual spreadsheets");
        } else {
          migrationScore = 10;
        }
      } else if (currentTool === "free_tool") {
        const freeUpgrades = ["clickup", "pipedrive", "zoom", "asana", "slack"];
        if (freeUpgrades.includes(vendor.id)) {
          migrationScore = 20;
          reasons.push("High-value upgrade beyond free tier limits");
        } else {
          migrationScore = 10;
        }
      } else if (currentTool === "legacy_suite") {
        const modernTools = ["slack", "notion", "rippling", "amplitude", "freshsales", "clickup"];
        if (modernTools.includes(vendor.id)) {
          migrationScore = 20;
          reasons.push("Modern agile alternative to legacy software");
        } else {
          migrationScore = 10;
        }
      } else {
        migrationScore = 18;
      }
    }

    // Sum points: 30 + 25 + 25 + 20 = 100 max
    const rawTotal = budgetScore + teamScore + featureScore + migrationScore;

    // Strict percentage capping between 40% and 98% (GUARANTEED NEVER TO CROSS 100%)
    const cappedScore = Math.min(98, Math.max(40, Math.round(rawTotal)));

    return {
      ...vendor,
      recommendationScore: cappedScore,
      matchReason: reasons.slice(0, 2).join(" • ") || "Strong overall category contender",
    };
  });

  return scored.sort((a, b) => b.recommendationScore - a.recommendationScore);
}
