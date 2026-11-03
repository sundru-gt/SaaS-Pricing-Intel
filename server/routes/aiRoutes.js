import express from "express";

const router = express.Router();

/**
 * Fallback 5-line summary generator when Gemini is offline or without key.
 */
function generateFallbackSummary(query, categoryName, vendors = [], currency = "USD") {
  const cat = query || categoryName || "Software";
  const currSymbol = currency === "INR" ? "₹" : "$";

  const freeTools = vendors.filter((v) => v.hasFreePlan).map((v) => v.name);
  const paidTools = vendors.filter((v) => v.cheapestPaidPlanSummary);
  const lowestRate = paidTools[0]?.cheapestPaidPlanSummary || `${currSymbol}15/mo`;
  const highestRate = paidTools[paidTools.length - 1]?.cheapestPaidPlanSummary || `${currSymbol}90/mo`;
  const vendorNames = vendors.slice(0, 4).map((v) => v.name).join(", ");

  const lines = [
    `Pricing across benchmarked ${cat} solutions spans from ${lowestRate} on entry tiers up to ${highestRate} for advanced enterprise editions.`,
    `Leading providers including ${vendorNames} structure their billing primarily on per-seat licenses with user tier caps.`,
    freeTools.length > 0
      ? `Permanent free tiers are offered by ${freeTools.join(" and ")}, though they enforce limits on user seats, automated pipelines, and integrations.`
      : `Most platforms omit permanent free plans in favor of 14-day free trials, requiring upfront paid subscriptions for commercial operations.`,
    `Committing to annual billing agreements typically yields a 15% to 20% discount compared to flexible month-to-month contracts.`,
    `Procurement teams should account for ancillary costs such as premium support packages, integration connectors, and inactive seat renewals to forecast true annual expenditure.`,
  ];

  return lines.join(" ");
}

/**
 * POST /api/ai/summary
 * Generates an executive 5-line pricing summary with Gemini 2.5 Flash.
 */
router.post("/summary", async (req, res) => {
  try {
    const { query = "", categoryName = "Software", vendors = [], currency = "USD" } = req.body;
    const geminiKey = process.env.GEMINI_API_KEY;

    if (geminiKey) {
      try {
        const storedPricingContext = vendors
          .slice(0, 6)
          .map(
            (v) =>
              `- ${v.name}: Starting at ${v.cheapestPaidPlanSummary || "Custom pricing"}${
                v.hasFreePlan ? " (Includes Free Tier)" : " (Paid/Trial only)"
              }${
                v.plans
                  ? ` [Tiers: ${v.plans
                      .map((p) => `${p.name}: ${p.monthlyPrice ? `$${p.monthlyPrice}/mo` : p.priceSummary || "Custom"}`)
                      .join(", ")}]`
                  : ""
              }`
          )
          .join("\n");

        const prompt = `You are a senior B2B SaaS pricing analyst. Generate an executive pricing intelligence summary of EXACTLY 5 cohesive lines/sentences for latest 2026 pricing of "${
          query || categoryName
        }" in ${currency}.

Stored Vendor Benchmark Data:
${storedPricingContext}

Requirements:
1. Provide exactly 5 sentences of dense, actionable pricing intelligence.
2. Explicitly include specific 2026 pricing rates, monthly/annual costs, and tier ranges for the top benchmarked tools (draw from the stored data above and live 2026 online search pricing).
3. Mention free tier availability, entry-level pricing vs mid-market plans, and typical contract commitments (e.g. 15-20% annual discount vs monthly billing).
4. Note potential hidden fees or add-on costs (such as storage limits, seat minimums, or implementation fees).
5. Output ONLY clean plain-text sentences. Do NOT use markdown asterisks (**), bullet points, numbers, hashtags, or headers. Output cohesive prose only.`;

        const response = await fetch(
          `https://generativelanguage.googleapis.com/v1beta/models/gemini-2.5-flash:generateContent?key=${geminiKey}`,
          {
            method: "POST",
            headers: { "Content-Type": "application/json" },
            body: JSON.stringify({
              contents: [{ parts: [{ text: prompt }] }],
              tools: [{ googleSearch: {} }],
              generationConfig: {
                temperature: 0.2,
                maxOutputTokens: 600,
              },
            }),
          }
        );

        if (response.ok) {
          const data = await response.json();
          let generated = data?.candidates?.[0]?.content?.parts?.[0]?.text;
          if (generated) {
            generated = generated.replace(/[*#_`]/g, "").trim();
            return res.json({ success: true, summary: generated, source: "gemini" });
          }
        } else {
          console.warn("[Gemini API] Call failed with status:", response.status);
        }
      } catch (geminiErr) {
        console.warn("[Gemini API] Request error:", geminiErr.message);
      }
    }

    // Fallback: Generate grounded 5-line summary from stored dataset
    const fallback = generateFallbackSummary(query, categoryName, vendors, currency);
    return res.json({ success: true, summary: fallback, source: "fallback" });
  } catch (error) {
    return res.status(500).json({
      success: false,
      message: error.message,
      summary: generateFallbackSummary(req.body?.query, req.body?.categoryName, req.body?.vendors, req.body?.currency),
      source: "error-fallback",
    });
  }
});

export default router;
