export const CATEGORIES = [
  {
    id: "crm",
    name: "CRM Software",
    slug: "crm",
    keywords: [
      "crm software",
      "salesforce pricing",
      "zoho crm",
      "crm",
      "sales crm",
      "pipedrive pricing",
      "freshsales pricing"
    ],
    description: "Manage sales pipelines, customer interactions, and lead deals with transparent seat-based pricing.",
    summaryTemplate: "Starting rates at the CRM vendors on this page run from $12/user/mo (Zoho CRM Standard, billed annually) to $330/user/mo (Salesforce Unlimited). Most small sales teams start between $14 and $34 per rep monthly. Free plans exist for up to 3 users but omit pipeline automation and phone integrations.",
    heroQuestion: "Calculate your CRM software cost across plans and team sizes.",
    sources: [
      { name: "Salesforce Official Pricing", url: "https://www.salesforce.com/editions-pricing/sales-cloud/", verified: "2026-01-15" },
      { name: "Zoho CRM Editions", url: "https://www.zoho.com/crm/pricing.html", verified: "2026-01-15" },
      { name: "Pipedrive Pricing Page", url: "https://www.pipedrive.com/en/pricing", verified: "2026-01-15" },
      { name: "Freshsales Pricing", url: "https://www.freshworks.com/crm/pricing/", verified: "2026-01-15" }
    ],
    subTypes: ["Small team", "Sales pipeline", "Free plan", "Enterprise"],
    searchPlaceholder: "Ask about CRM pricing, sales pipeline, or seat limits...",
    video: {
      title: "How CRM Software Pricing Works (Per Seat vs Tier Caps)",
      duration: "3:45",
      thumbnail: "https://images.unsplash.com/photo-1552664730-d307ca884978?auto=format&fit=crop&w=1200&q=80",
      poster: "https://images.unsplash.com/photo-1552664730-d307ca884978?auto=format&fit=crop&w=1200&q=80",
      src: "https://commondatastorage.googleapis.com/gtv-videos-bucket/sample/BigBuckBunny.mp4",
      chapters: [
        { time: "0:00", label: "Per-seat vs contact tier models" },
        { time: "0:45", label: "The hidden add-on costs (e.g., storage & phone)" },
        { time: "1:30", label: "Annual commit discounts vs monthly flexibility" },
        { time: "2:40", label: "Comparing Salesforce vs Zoho real totals" }
      ]
    },
    followUps: [
      {
        question: "Does Salesforce require an annual contract upfront?",
        answer: "Yes, Salesforce Sales Cloud plans (Starter Suite aside) typically require a 1-year annual contract billed annually upfront. Monthly pay-as-you-go is only available on specific starter tiers."
      },
      {
        question: "Can I use Zoho CRM completely free for a small team?",
        answer: "Zoho CRM offers a permanent Free Edition for up to 3 users with basic lead and contact management, but it restricts automated workflows, mass emailing, and advanced forecasting."
      },
      {
        question: "What hidden costs occur when switching to Pipedrive?",
        answer: "Pipedrive charges per user, but add-ons like LeadBooster (chatbots/web forms) cost $32.50 to $39/month flat, and Campaigns email marketing is charged by contact tiers."
      },
      {
        question: "How do per-seat CRM licenses handle deactivated users?",
        answer: "Most vendors keep charging for purchased license seats until an administrator explicitly reduces the license count in the billing admin panel before the renewal term."
      }
    ]
  },
  {
    id: "project-management",
    name: "Project Management",
    slug: "project-management",
    keywords: [
      "project management tool",
      "asana pricing",
      "jira pricing",
      "project management",
      "monday pricing",
      "clickup pricing",
      "trello pricing"
    ],
    description: "Coordinate team roadmaps, sprint backlogs, and client projects with flexible per-user models.",
    summaryTemplate: "Project management tools start from $0 (Trello / Jira up to 10 users) up to $24.99/user/mo for premium suites. Most teams land on $7 to $12 per seat billed annually. Beware of minimum seat increments (e.g. 3-seat or 5-seat minimums on monday.com).",
    heroQuestion: "Estimate monthly and annual project management licensing for your team.",
    sources: [
      { name: "Asana Official Pricing", url: "https://asana.com/pricing", verified: "2026-01-15" },
      { name: "monday.com Pricing", url: "https://monday.com/pricing", verified: "2026-01-15" },
      { name: "Jira Software Pricing (Atlassian)", url: "https://www.atlassian.com/software/jira/pricing", verified: "2026-01-15" },
      { name: "ClickUp Pricing", url: "https://clickup.com/pricing", verified: "2026-01-15" },
      { name: "Trello Pricing", url: "https://trello.com/pricing", verified: "2026-01-15" }
    ],
    subTypes: ["Kanban", "Software teams", "Agencies", "Free plan"],
    searchPlaceholder: "Ask about Jira vs Asana, minimum seats, or agile workflows...",
    video: {
      title: "Understanding Project Management SaaS Pricing & Seat Minimums",
      duration: "4:12",
      thumbnail: "https://images.unsplash.com/photo-1531403009284-440f080d1e12?auto=format&fit=crop&w=1200&q=80",
      poster: "https://images.unsplash.com/photo-1531403009284-440f080d1e12?auto=format&fit=crop&w=1200&q=80",
      src: "https://commondatastorage.googleapis.com/gtv-videos-bucket/sample/ElephantsDream.mp4",
      chapters: [
        { time: "0:00", label: "Seat minimums: The 3-to-5 user bundle trap" },
        { time: "1:05", label: "Guest vs member license distinctions" },
        { time: "2:15", label: "Storage & automation execution caps" },
        { time: "3:30", label: "Best value tool for 10-person teams" }
      ]
    },
    followUps: [
      {
        question: "Does monday.com allow purchasing single seats?",
        answer: "No. monday.com enforces a 3-seat minimum on all paid tiers. If you are a solo user or duo, you must still purchase a minimum 3-seat pack."
      },
      {
        question: "How generous is Jira's free tier for software development?",
        answer: "Jira is 100% free for up to 10 users with unlimited project boards, backlog management, and 2 GB storage, making it ideal for early engineering startups."
      },
      {
        question: "What is ClickUp's Unlimited plan real per-user rate?",
        answer: "ClickUp Unlimited is $7/user/month billed annually ($10/user billed monthly). It includes unlimited storage, dashboards, and integrations."
      },
      {
        question: "Do guests count as paid seats in Asana?",
        answer: "Asana allows unlimited free guest accounts with external domains (clients, contractors) on paid team workspaces, saving significant license budget."
      }
    ]
  },
  {
    id: "accounting",
    name: "Accounting",
    slug: "accounting",
    keywords: [
      "accounting software",
      "quickbooks pricing",
      "tallyprime",
      "accounting",
      "xero pricing",
      "freshbooks pricing",
      "zoho books"
    ],
    description: "Manage book-keeping, GST/sales tax invoices, expenses, and ledger audits with fixed or tiered pricing.",
    summaryTemplate: "Accounting software pricing diverges sharply: cloud tools like QuickBooks start at $30-$90/mo for fixed entity subscriptions with user caps, while Xero charges $15-$78/mo, and TallyPrime offers perpetual/subscription licenses in India from ₹18,000 to ₹54,000.",
    heroQuestion: "Calculate your accounting & invoicing expenses per organization.",
    sources: [
      { name: "Intuit QuickBooks Pricing", url: "https://quickbooks.intuit.com/pricing/", verified: "2026-01-15" },
      { name: "Xero Official Plans", url: "https://www.xero.com/pricing-plans/", verified: "2026-01-15" },
      { name: "FreshBooks Pricing", url: "https://www.freshbooks.com/pricing", verified: "2026-01-15" },
      { name: "Zoho Books Editions", url: "https://www.zoho.com/books/pricing/", verified: "2026-01-15" },
      { name: "Tally Solutions Official Pricing", url: "https://tallysolutions.com/tally-prime-pricing/", verified: "2026-01-15" }
    ],
    subTypes: ["Freelancers", "Small business", "GST invoicing", "Inventory"],
    searchPlaceholder: "Ask about QuickBooks tiers, GST compliance, or multi-currency...",
    video: {
      title: "SaaS Accounting Pricing: Flat Subscription vs Per-User Invoicing",
      duration: "3:20",
      thumbnail: "https://images.unsplash.com/photo-1554224155-8d04cb21cd6c?auto=format&fit=crop&w=1200&q=80",
      poster: "https://images.unsplash.com/photo-1554224155-8d04cb21cd6c?auto=format&fit=crop&w=1200&q=80",
      src: "https://commondatastorage.googleapis.com/gtv-videos-bucket/sample/ForBiggerBlazes.mp4",
      chapters: [
        { time: "0:00", label: "Flat per-company vs per-accountant pricing" },
        { time: "0:50", label: "Invoice volume & bank feed restrictions" },
        { time: "1:45", label: "Payroll add-on pricing surprises" },
        { time: "2:50", label: "Cloud vs on-premise (Tally vs QuickBooks)" }
      ]
    },
    followUps: [
      {
        question: "Why does QuickBooks advertise 50% off for 3 months?",
        answer: "Intuit uses introductory promotional pricing (e.g. $15/mo for 3 months), after which rates jump to the full standard price of $30/mo or higher automatically."
      },
      {
        question: "Can multiple team members log into a single Xero account?",
        answer: "Xero is one of the few platforms offering unlimited users on all standard plans without per-seat surcharges, making it very economical for growing teams."
      },
      {
        question: "How does TallyPrime licensing differ from SaaS?",
        answer: "TallyPrime offers Silver (single-user PC) and Gold (multi-user LAN) licenses either as perpetual one-time purchases with annual TSS renewal or as annual rentals."
      },
      {
        question: "Does Zoho Books support GST filing in India?",
        answer: "Yes, Zoho Books is a certified GST Suvidha Provider in India and supports direct GSTR-1, GSTR-3B generation and e-invoicing starting at ₹749/org/month."
      }
    ]
  },
  {
    id: "hr-payroll",
    name: "HR & Payroll",
    slug: "hr-payroll",
    keywords: [
      "payroll software",
      "hris software",
      "gusto pricing",
      "hr & payroll",
      "rippling pricing",
      "keka pricing",
      "greythr"
    ],
    description: "Automate salary disbursals, tax withholdings, compliance, leave tracking, and contractor payouts.",
    summaryTemplate: "HR & Payroll pricing always follows a Base Fee + Per-Employee/Month format (e.g., Gusto Simple is $40 base + $6/person/mo). In India, platforms like greytHR and Keka charge ₹15-₹90 per employee monthly with modular HR add-ons.",
    heroQuestion: "Calculate total base fee plus per-employee monthly payroll costs.",
    sources: [
      { name: "Gusto Official Pricing", url: "https://gusto.com/pricing", verified: "2026-01-15" },
      { name: "Rippling Pricing Structure", url: "https://www.rippling.com/pricing", verified: "2026-01-15" },
      { name: "greytHR Pricing", url: "https://www.greythr.com/pricing/", verified: "2026-01-15" },
      { name: "Keka HR Pricing", url: "https://www.keka.com/pricing", verified: "2026-01-15" }
    ],
    subTypes: ["Payroll only", "Full HR suite", "India payroll", "Contractors"],
    searchPlaceholder: "Ask about Gusto base fee, Keka per-employee rates, or PF/ESI filing...",
    video: {
      title: "HRIS & Payroll Pricing Architecture: Base Fees and Per-Head Costs",
      duration: "3:55",
      thumbnail: "https://images.unsplash.com/photo-1521791136064-7986c2920216?auto=format&fit=crop&w=1200&q=80",
      poster: "https://images.unsplash.com/photo-1521791136064-7986c2920216?auto=format&fit=crop&w=1200&q=80",
      src: "https://commondatastorage.googleapis.com/gtv-videos-bucket/sample/ForBiggerEscapes.mp4",
      chapters: [
        { time: "0:00", label: "Base subscription fee + per-head fee explained" },
        { time: "1:00", label: "Contractor only vs full-time W2/salary workers" },
        { time: "2:00", label: "End-of-year tax filing charges (W-2, Form 16)" },
        { time: "3:10", label: "India payroll platforms: greytHR vs Keka" }
      ]
    },
    followUps: [
      {
        question: "How does Gusto charge when headcount changes mid-month?",
        answer: "Gusto bills based on active employees paid during that billing cycle. If an employee is terminated before any payroll runs in a month, they are not billed."
      },
      {
        question: "Does Rippling allow buying payroll without the core HRIS platform?",
        answer: "No, Rippling requires the foundational Employee Management Platform ($8/user/mo base) before enabling Payroll, Benefits, or IT modules."
      },
      {
        question: "What is greytHR's minimum billing policy in India?",
        answer: "greytHR has a minimum billing equivalent to 25 employees on most plans (starter tier starting at ~₹3,495/mo base for up to 25 employees)."
      },
      {
        question: "Are contractor-only payroll plans cheaper?",
        answer: "Yes, Gusto offers a contractor-only plan for $35/month + $6/contractor with no base fee surcharge for the first 6 months."
      }
    ]
  },
  {
    id: "team-collaboration",
    name: "Team Collaboration",
    slug: "team-collaboration",
    keywords: [
      "team chat app",
      "slack vs teams",
      "team collaboration",
      "slack pricing",
      "microsoft teams pricing"
    ],
    description: "Real-time team messaging, channels, audio huddles, and document collaboration workspaces.",
    summaryTemplate: "Collaboration pricing benchmarks: Slack starts at $7.25/user/mo (Pro, billed annually) or $8.75 monthly. Microsoft Teams Essentials starts at $4.00/user/mo, or $6.00/user/mo bundled with Microsoft 365 Business Basic (including Exchange, OneDrive, Word, Excel).",
    heroQuestion: "Compare Slack and Microsoft Teams annual license commitments.",
    sources: [
      { name: "Slack Pricing Official", url: "https://slack.com/pricing", verified: "2026-01-15" },
      { name: "Microsoft Teams Pricing", url: "https://www.microsoft.com/en-us/microsoft-teams/compare-microsoft-teams-options", verified: "2026-01-15" }
    ],
    subTypes: ["Chat", "Docs and wikis", "Whiteboards"],
    searchPlaceholder: "Ask about Slack Pro vs Teams Essentials, 90-day history, or M365...",
    video: {
      title: "Slack vs Microsoft Teams: Real Total Cost of Ownership",
      duration: "4:05",
      thumbnail: "https://images.unsplash.com/photo-1522071820081-009f0129c71c?auto=format&fit=crop&w=1200&q=80",
      poster: "https://images.unsplash.com/photo-1522071820081-009f0129c71c?auto=format&fit=crop&w=1200&q=80",
      src: "https://commondatastorage.googleapis.com/gtv-videos-bucket/sample/ForBiggerFun.mp4",
      chapters: [
        { time: "0:00", label: "Slack 90-day message history limit on Free" },
        { time: "1:15", label: "Standalone Teams vs Microsoft 365 bundle economics" },
        { time: "2:30", label: "Guest access limits & multi-org connect" },
        { time: "3:25", label: "Summary verdict: When is Slack worth the premium?" }
      ]
    },
    followUps: [
      {
        question: "What happens to message history on Slack's free plan?",
        answer: "Slack Free hides messages and files older than 90 days. The data is preserved on Slack servers and unlocks immediately upon upgrading to Pro."
      },
      {
        question: "Is Microsoft Teams included for free in Microsoft 365?",
        answer: "Commercial Microsoft 365 Business Basic, Standard, and Premium suites in most markets include Teams licenses, making Teams effectively zero incremental cost if you already use Office."
      },
      {
        question: "Can Slack Connect channels be shared with unpaid external users?",
        answer: "External guests can join Slack Connect if they have at least a free Slack account, but full channel sharing requires paid tiers on both sides or Enterprise Grid guest passes."
      }
    ]
  },
  {
    id: "video-conferencing",
    name: "Video Conferencing",
    slug: "video-conferencing",
    keywords: [
      "video conferencing",
      "zoom pricing",
      "google meet pricing",
      "webex pricing",
      "goto meeting"
    ],
    description: "HD video meetings, team webinars, screen-sharing, AI meeting summaries, and dial-in conference lines.",
    summaryTemplate: "Video conferencing standard plans run from $13.33/license/mo (Zoom Pro billed annually at $159.90/yr) to $14.50/user/mo (Webex Meet). Google Meet is available standalone or within Google Workspace starting at $6/user/mo. Free tiers limit group calls to 40-60 minutes.",
    heroQuestion: "Calculate meeting host licensing and webinar add-on costs.",
    sources: [
      { name: "Zoom Official Pricing", url: "https://zoom.us/pricing", verified: "2026-01-15" },
      { name: "Cisco Webex Pricing", url: "https://www.webex.com/pricing/index.html", verified: "2026-01-15" },
      { name: "Google Workspace Pricing", url: "https://workspace.google.com/pricing.html", verified: "2026-01-15" },
      { name: "GoTo Meeting Pricing", url: "https://www.goto.com/pricing/meeting", verified: "2026-01-15" }
    ],
    subTypes: ["Meetings", "Webinars", "Free plan limits"],
    searchPlaceholder: "Ask about Zoom 40-min limit, Google Meet cloud recording, or webinar seats...",
    video: {
      title: "Video Conferencing Pricing Traps: Host Licenses vs Participant Limits",
      duration: "3:30",
      thumbnail: "https://images.unsplash.com/photo-1588196749597-9ff075ee6b5b?auto=format&fit=crop&w=1200&q=80",
      poster: "https://images.unsplash.com/photo-1588196749597-9ff075ee6b5b?auto=format&fit=crop&w=1200&q=80",
      src: "https://commondatastorage.googleapis.com/gtv-videos-bucket/sample/ForBiggerJoyBlazes.mp4",
      chapters: [
        { time: "0:00", label: "Host licenses vs attendee seat distinction" },
        { time: "0:55", label: "The 40-minute and 60-minute free limits" },
        { time: "1:50", label: "Cloud recording storage caps and surcharges" },
        { time: "2:45", label: "Google Meet via Workspace vs Zoom standalone" }
      ]
    },
    followUps: [
      {
        question: "Does everyone on my team need a paid Zoom license to join?",
        answer: "No. Only the meeting host requires a paid Zoom Pro license to run meetings past 40 minutes. Attendees can join for free without any license or account."
      },
      {
        question: "What is the recording limit on Google Meet free vs paid?",
        answer: "Free Google Meet accounts cannot record meetings to Google Drive. Recording requires Google Workspace Business Standard ($12/user/mo) or higher."
      },
      {
        question: "How do Zoom Webinar add-on costs work?",
        answer: "Zoom Webinars are priced as add-ons on top of a paid host license, starting from $79/month for 500 attendees up to $340/month for 3,000 attendees."
      }
    ]
  },
  {
    id: "analytics",
    name: "Analytics",
    slug: "analytics",
    keywords: [
      "product analytics",
      "power bi pricing",
      "mixpanel pricing",
      "analytics",
      "amplitude pricing",
      "tableau pricing"
    ],
    description: "Product event tracking, conversion funnels, retention cohorts, executive BI dashboards, and data visualization.",
    summaryTemplate: "Analytics pricing breaks into two models: Product event-based (Mixpanel free up to 20M events, then ~$28/mo; Amplitude free up to 50K MTUs) vs Business Intelligence per-creator seats (Power BI Pro at $10/user/mo; Tableau Creator at $75/user/mo).",
    heroQuestion: "Calculate your analytics costs by events or BI creator licenses.",
    sources: [
      { name: "Mixpanel Official Pricing", url: "https://mixpanel.com/pricing/", verified: "2026-01-15" },
      { name: "Amplitude Pricing", url: "https://amplitude.com/pricing", verified: "2026-01-15" },
      { name: "Microsoft Power BI Pricing", url: "https://powerbi.microsoft.com/en-us/pricing/", verified: "2026-01-15" },
      { name: "Tableau Pricing", url: "https://www.tableau.com/pricing/teams-orgs", verified: "2026-01-15" }
    ],
    subTypes: ["Product analytics", "BI dashboards", "Web analytics"],
    searchPlaceholder: "Ask about Mixpanel event tiers, Power BI Pro vs Premium, or Tableau Creator...",
    video: {
      title: "Product Analytics vs BI Pricing: Event Tiers vs Seat Licenses",
      duration: "4:00",
      thumbnail: "https://images.unsplash.com/photo-1460925895917-afdab827c52f?auto=format&fit=crop&w=1200&q=80",
      poster: "https://images.unsplash.com/photo-1460925895917-afdab827c52f?auto=format&fit=crop&w=1200&q=80",
      src: "https://commondatastorage.googleapis.com/gtv-videos-bucket/sample/ForBiggerMeltdowns.mp4",
      chapters: [
        { time: "0:00", label: "Monthly Tracked Users (MTU) vs Event volumes" },
        { time: "1:10", label: "Power BI Pro ($10) vs Tableau Creator ($75) gap" },
        { time: "2:20", label: "Data warehouse sync and query costs" },
        { time: "3:15", label: "Avoiding sudden event-overage overbillings" }
      ]
    },
    followUps: [
      {
        question: "How does Mixpanel calculate pricing for event spikes?",
        answer: "Mixpanel charges based on monthly event volume. If you exceed your plan tier, you are billed overage rates per 1,000 extra events or prompted to bump up your tier."
      },
      {
        question: "Can viewers view Power BI reports without a paid license?",
        answer: "Only if the organization purchases Power BI Premium Capacity (starting around $4,995/month). Otherwise, both creators and report consumers require a $10/user/mo Power BI Pro license."
      },
      {
        question: "Why is Tableau so much more expensive than Power BI?",
        answer: "Tableau prices by role: Creator ($75/user/mo), Explorer ($42/user/mo), and Viewer ($15/user/mo) billed annually. It includes full desktop preparation and deep data science modeling tools."
      }
    ]
  },
  {
    id: "reviews-comparisons",
    name: "Reviews & Comparisons",
    slug: "reviews-comparisons",
    keywords: [
      "software reviews",
      "g2 reviews",
      "capterra",
      "reviews & comparisons",
      "trustradius"
    ],
    description: "Verified B2B software buyer reviews, quadrant grids, buyer intent data, and lead generation directories.",
    summaryTemplate: "For buyers, software review directories (G2, Capterra, TrustRadius) are 100% free. For software vendors listing their products, standard profiles are free, but sponsored PPC clicks on Capterra run $2-$15/click and G2 buyer intent marketing packages cost $10,000-$30,000+/year.",
    heroQuestion: "Understand buyer vs vendor costs on software comparison platforms.",
    sources: [
      { name: "G2 Vendor Solutions", url: "https://sell.g2.com/pricing", verified: "2026-01-15" },
      { name: "Capterra Gartner Digital Markets", url: "https://www.capterra.com/vendors/", verified: "2026-01-15" },
      { name: "TrustRadius for Vendors", url: "https://www.trustradius.com/vendor", verified: "2026-01-15" }
    ],
    subTypes: ["Review sites", "Head-to-head", "How to read reviews"],
    searchPlaceholder: "Ask about G2 grid bias, Capterra PPC bid costs, or buyer review incentives...",
    video: {
      title: "How SaaS Review Sites Make Money (And How to Read Them)",
      duration: "3:40",
      thumbnail: "https://images.unsplash.com/photo-1454165804606-c3d57bc86b40?auto=format&fit=crop&w=1200&q=80",
      poster: "https://images.unsplash.com/photo-1454165804606-c3d57bc86b40?auto=format&fit=crop&w=1200&q=80",
      src: "https://commondatastorage.googleapis.com/gtv-videos-bucket/sample/Sintel.mp4",
      chapters: [
        { time: "0:00", label: "Organic review rankings vs Pay-Per-Click placement" },
        { time: "0:50", label: "Gift card incentives ($25 Amazon cards) on reviews" },
        { time: "1:45", label: "G2 Buyer Intent packages and enterprise fees" },
        { time: "2:50", label: "How to spot authentic vs solicited user reviews" }
      ]
    },
    followUps: [
      {
        question: "Do software vendors pay to be ranked #1 on G2 grids?",
        answer: "G2's quadrant grid positions are calculated algorithmically from user satisfaction and market presence scores. However, category top listing banners and 'Compare' placements are paid sponsored ads."
      },
      {
        question: "How does Capterra make money from software comparisons?",
        answer: "Capterra (Gartner Digital Markets) operates a Pay-Per-Click (PPC) directory. Vendors bid per click (often $3-$15) to appear in the top sponsored positions of directory pages."
      },
      {
        question: "Are reviews that offered a gift card incentive trustworthy?",
        answer: "Both G2 and TrustRadius label reviews where an incentive (like a $25 gift card) was offered to verify honest usage. Review guidelines prohibit positive-bias stipulations."
      }
    ]
  }
];

export const ALL_CATEGORY = {
  id: "all",
  name: "All Software",
  slug: "all",
  keywords: ["saas", "software", "all", "pricing", "tools", "compare"],
  description: "Browse verified pricing, free plan limits, and per-seat calculations across all 8 major business SaaS categories.",
  summaryTemplate: "Across 28+ leading B2B SaaS vendors, starting prices range from free community tiers to $330/user/mo for enterprise suites. Small teams of 10 average $140-$450/month across their core tech stack. Annual billing unlocks an average 18% to 25% savings.",
  heroQuestion: "Select seats and compare total tech stack investment across all categories.",
  sources: [
    { name: "Official Vendor Pricing Pages (Aggregate)", url: "https://saas-comparison.local/sources", verified: "2026-01-15" },
    { name: "SaaS Capital Benchmarks", url: "https://www.saas-capital.com", verified: "2026-01-15" }
  ],
  subTypes: CATEGORIES.map((c) => c.name),
  searchPlaceholder: "Search any software, category, or pricing keyword...",
  video: {
    title: "The Anatomy of Modern SaaS Pricing: Seat Licenses, Add-ons & Hidden Fees",
    duration: "4:30",
      thumbnail: "https://images.unsplash.com/photo-1551288049-bebda4e38f71?auto=format&fit=crop&w=1200&q=80",
      poster: "https://images.unsplash.com/photo-1551288049-bebda4e38f71?auto=format&fit=crop&w=1200&q=80",
    src: "https://commondatastorage.googleapis.com/gtv-videos-bucket/sample/BigBuckBunny.mp4",
    chapters: [
      { time: "0:00", label: "Per-seat vs usage-based SaaS pricing" },
      { time: "1:00", label: "Why annual contracts offer 15-30% discounts" },
      { time: "2:10", label: "Hidden costs: onboarding, API limits, and extra storage" },
      { time: "3:30", label: "How to negotiate enterprise contract renewals" }
    ]
  },
  followUps: [
    {
      question: "What is the average discount for paying SaaS annually vs monthly?",
      answer: "Most SaaS vendors offer between 16% and 25% discounts for annual upfront payments (equivalent to getting 2 months free)."
    },
    {
      question: "How do I calculate true total cost of ownership for a software tool?",
      answer: "TCO = (License seat cost × count) + (Platform base fee) + (Implementation/onboarding fees) + (Add-ons for storage/integrations) + (Taxes/VAT)."
    },
    {
      question: "Are software free trials different from freemium tiers?",
      answer: "Yes: Free trials grant temporary 14-30 day access to high-tier features before requiring payment, whereas freemium provides permanently free access with capped users or features."
    },
    {
      question: "How are currency conversions and Indian GST (18%) handled?",
      answer: "US-billed SaaS purchases in India generally require international credit cards and attract 18% GST (or reverse charge OIDAR). Indian entities (like Zoho or greytHR) bill directly in INR with standard GST invoices."
    }
  ]
};

