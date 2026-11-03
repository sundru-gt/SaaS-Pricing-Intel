/**
 * Centralized SaaS Vendors Dataset
 * Covers all 8 subcategories specified in Section 5 of PRD:
 * 1. CRM Software (Salesforce, Pipedrive, Zoho CRM, Freshsales)
 * 2. Project Management (Asana, monday.com, ClickUp, Jira, Trello)
 * 3. Accounting (QuickBooks, Xero, FreshBooks, Zoho Books, TallyPrime)
 * 4. HR & Payroll (Gusto, Rippling, Keka, greytHR)
 * 5. Team Collaboration (Slack, Microsoft Teams)
 * 6. Video Conferencing (Zoom, Webex, Google Meet, GoTo Meeting)
 * 7. Analytics (Mixpanel, Amplitude, Power BI, Tableau)
 * 8. Reviews & Comparisons (G2, Capterra, TrustRadius)
 */

export const VENDORS = [
  // =========================================================================
  // 1. CRM SOFTWARE
  // =========================================================================
  {
    id: "salesforce",
    name: "Salesforce Sales Cloud",
    shortName: "Salesforce",
    categoryId: "crm",
    subTypes: ["Enterprise", "Sales pipeline"],
    badge: "Enterprise Standard",
    logoText: "SF",
    accentColor: "#00A1E0",
    description: "The global market leader in enterprise customer relationship management, deep pipeline forecasting, and automated workflows.",
    cheapestPaidPlanSummary: "$25/user/mo billed annually (Starter Suite)",
    hasFreePlan: false,
    freePlanDetails: "30-day free trial available. No permanent free tier.",
    pricingSource: "Salesforce Sales Cloud Official Editions",
    sourceUrl: "https://www.salesforce.com/editions-pricing/sales-cloud/",
    verifiedDate: "2026-01-15",
    currency: "USD",
    inrSupported: true,
    plans: [
      {
        id: "starter",
        name: "Starter Suite",
        pricingModel: "per_user",
        minSeats: 1,
        monthlyPricePerUser: 25,
        annualPricePerUser: 25,
        isFree: false,
        features: ["Lead and opportunity tracking", "Email integration (Gmail/Outlook)", "Built-in onboarding", "Basic reporting"],
        limitations: "Max 10 users, no custom API integrations or advanced automation"
      },
      {
        id: "pro-suite",
        name: "Pro Suite",
        pricingModel: "per_user",
        minSeats: 1,
        monthlyPricePerUser: 100,
        annualPricePerUser: 100,
        isFree: false,
        features: ["Custom automation (Flows)", "Real-time chat & messaging", "Quote and contract management", "Direct phone calling"],
        limitations: "Requires 1-year annual contract billed upfront"
      },
      {
        id: "enterprise",
        name: "Enterprise",
        pricingModel: "per_user",
        minSeats: 1,
        monthlyPricePerUser: 165,
        annualPricePerUser: 165,
        isFree: false,
        features: ["Full workflow & process automation", "Advanced pipeline forecasting", "Unlimited custom apps", "Role-based security"],
        limitations: "Implementation consulting usually required ($3k-$15k)"
      }
    ],
    features: [
      "AI sales insights via Einstein 1",
      "Comprehensive AppExchange ecosystem",
      "Opportunity stage and probability weighting",
      "Multi-currency support and territory management"
    ],
    contractInfo: "Annual contract required on Pro Suite & Enterprise. Billed upfront in full. Auto-renews unless written cancellation provided 30 days prior.",
    hiddenCosts: [
      "Premier Support adds 20-30% on net license fee",
      "Data storage add-ons: $125/month per 500 MB",
      "Third-party system integrator fees often range $5,000 to $25,000"
    ]
  },
  {
    id: "pipedrive",
    name: "Pipedrive",
    shortName: "Pipedrive",
    categoryId: "crm",
    subTypes: ["Sales pipeline", "Small team"],
    badge: "Best for Deal Flow",
    logoText: "PD",
    accentColor: "#1a1a1a",
    description: "Visual, activity-based sales CRM built by salespeople to optimize conversion stages and rep velocity.",
    cheapestPaidPlanSummary: "$14/user/mo billed annually ($24 monthly)",
    hasFreePlan: false,
    freePlanDetails: "14-day full feature trial, no credit card required.",
    pricingSource: "Pipedrive Pricing Page",
    sourceUrl: "https://www.pipedrive.com/en/pricing",
    verifiedDate: "2026-01-15",
    currency: "USD",
    inrSupported: true,
    plans: [
      {
        id: "essential",
        name: "Essential",
        pricingModel: "per_user",
        minSeats: 1,
        monthlyPricePerUser: 24,
        annualPricePerUser: 14,
        isFree: false,
        features: ["Lead, deal & contact management", "Customizable visual pipelines", "24/7 support", "Mobile apps"],
        limitations: "No email sync or automated workflow triggers"
      },
      {
        id: "advanced",
        name: "Advanced",
        pricingModel: "per_user",
        minSeats: 1,
        monthlyPricePerUser: 44,
        annualPricePerUser: 29,
        isFree: false,
        features: ["Full 2-way email sync", "Automated workflow builder (30 active)", "Email open and click tracking", "Meeting scheduler"],
        limitations: "Max 30 automations per company"
      },
      {
        id: "professional",
        name: "Professional",
        pricingModel: "per_user",
        minSeats: 1,
        monthlyPricePerUser: 79,
        annualPricePerUser: 49,
        isFree: false,
        features: ["One-click e-signatures", "Advanced revenue forecasting", "Team performance analytics", "Custom reporting fields"],
        limitations: "Higher tier required for phone support"
      }
    ],
    features: [
      "Intuitive drag-and-drop Kanban pipeline",
      "Automated meeting scheduling links",
      "Email sync with read receipts",
      "Over 400 integrations via marketplace"
    ],
    contractInfo: "Available on flexible monthly or discounted annual commitment (~35% discount). Cancel anytime for the following cycle.",
    hiddenCosts: [
      "LeadBooster add-on (Chatbot, Web Forms): $32.50 to $39/month flat",
      "Campaigns email marketing: starts at $13.33/mo for 1,000 contacts",
      "Smart Docs eSign document limits on lower tiers"
    ]
  },
  {
    id: "zoho-crm",
    name: "Zoho CRM",
    shortName: "Zoho CRM",
    categoryId: "crm",
    subTypes: ["Small team", "Free plan", "Sales pipeline"],
    badge: "Top Value Pick",
    logoText: "ZC",
    accentColor: "#DF2029",
    description: "Extremely cost-effective CRM suite with deep omnichannel lead capture, Zia AI assistant, and native GST compliance in India.",
    cheapestPaidPlanSummary: "$14/user/mo billed annually (or ₹800/user/mo in India)",
    hasFreePlan: true,
    freePlanDetails: "Permanent Free Edition for up to 3 users with basic contact management.",
    pricingSource: "Zoho CRM Global Pricing",
    sourceUrl: "https://www.zoho.com/crm/pricing.html",
    verifiedDate: "2026-01-15",
    currency: "USD",
    inrSupported: true,
    plans: [
      {
        id: "free",
        name: "Free Edition",
        pricingModel: "per_user",
        minSeats: 1,
        monthlyPricePerUser: 0,
        annualPricePerUser: 0,
        isFree: true,
        features: ["Up to 3 users free forever", "Leads, accounts & deals", "Standard reports", "Mobile app access"],
        limitations: "No mass email, no workflow automation, 5,000 records cap"
      },
      {
        id: "standard",
        name: "Standard",
        pricingModel: "per_user",
        minSeats: 1,
        monthlyPricePerUser: 20,
        annualPricePerUser: 14,
        isFree: false,
        features: ["Scoring rules & lead allocation", "Automated email workflows", "Custom dashboards", "Mass emailing (250/day/user)"],
        limitations: "Limited blueprint business process modeling"
      },
      {
        id: "professional",
        name: "Professional",
        pricingModel: "per_user",
        minSeats: 1,
        monthlyPricePerUser: 35,
        annualPricePerUser: 23,
        isFree: false,
        features: ["SalesSignals real-time notifications", "Inventory management (quotes, invoices)", "Validation rules", "Web-to-case forms"],
        limitations: "Zia AI assistant reserved for Enterprise"
      }
    ],
    features: [
      "Permanent free tier for 3 reps",
      "Native integration with Zoho Books and Zoho Desk",
      "Direct phone and WhatsApp integrations",
      "Localized Indian data centers and billing"
    ],
    contractInfo: "Monthly or annual billing available. No lock-in on monthly plans. 15-day refund window on annual subscriptions.",
    hiddenCosts: [
      "Additional data storage: $4/month per 5 GB",
      "Additional file storage: $4/month per 5 GB",
      "Email credits beyond daily user allocation"
    ]
  },
  {
    id: "freshsales",
    name: "Freshsales (Freshworks)",
    shortName: "Freshsales",
    categoryId: "crm",
    subTypes: ["Small team", "Free plan"],
    badge: "Easiest Setup",
    logoText: "FS",
    accentColor: "#F37C22",
    description: "Modern sales automation tool with built-in phone dialer, email sequences, and Freddy AI contact scoring.",
    cheapestPaidPlanSummary: "$9/user/mo billed annually ($11 monthly)",
    hasFreePlan: true,
    freePlanDetails: "Free plan for up to 3 users including contact management, built-in chat, and phone dialer.",
    pricingSource: "Freshsales Pricing",
    sourceUrl: "https://www.freshworks.com/crm/pricing/",
    verifiedDate: "2026-01-15",
    currency: "USD",
    inrSupported: true,
    plans: [
      {
        id: "free",
        name: "Free Tier",
        pricingModel: "per_user",
        minSeats: 1,
        monthlyPricePerUser: 0,
        annualPricePerUser: 0,
        isFree: true,
        features: ["Up to 3 users free", "Built-in phone dialer", "Contact & deal management", "24x5 email support"],
        limitations: "No sales sequences or advanced pipeline metrics"
      },
      {
        id: "growth",
        name: "Growth",
        pricingModel: "per_user",
        minSeats: 1,
        monthlyPricePerUser: 11,
        annualPricePerUser: 9,
        isFree: false,
        features: ["Visual deal pipeline", "Freddy AI contact scoring", "Automated sales sequences", "2,000 bot sessions/month"],
        limitations: "Single deal pipeline limit"
      },
      {
        id: "pro",
        name: "Pro",
        pricingModel: "per_user",
        minSeats: 1,
        monthlyPricePerUser: 47,
        annualPricePerUser: 39,
        isFree: false,
        features: ["Multiple sales pipelines", "Sales territory management", "Deal stage rot alerts", "WhatsApp & SMS campaigns"],
        limitations: "Advanced forecasting requires Enterprise ($59/mo)"
      }
    ],
    features: [
      "Native cloud telephony built into browser",
      "Freddy AI predictive deal scoring",
      "Automated multi-step outreach sequences",
      "Fast 10-minute setup without consulting"
    ],
    contractInfo: "Monthly or annual billing. Annual billing provides ~18-20% discount. Prorated adjustments on adding seats.",
    hiddenCosts: [
      "Phone call rates billed separately per minute",
      "WhatsApp conversation marketing charges via Meta API",
      "Additional bot sessions: $100 per 1,000 sessions"
    ]
  },

  // =========================================================================
  // 2. PROJECT MANAGEMENT
  // =========================================================================
  {
    id: "asana",
    name: "Asana",
    shortName: "Asana",
    categoryId: "project-management",
    subTypes: ["Agencies", "Kanban", "Software teams"],
    badge: "Best for Cross-Team Workflows",
    logoText: "AS",
    accentColor: "#F06A6A",
    description: "Enterprise work management system connecting strategic team goals, Gantt roadmaps, and cross-functional operations.",
    cheapestPaidPlanSummary: "$10.99/user/mo billed annually ($13.49 monthly)",
    hasFreePlan: true,
    freePlanDetails: "Asana Personal is free for up to 10 users with unlimited tasks and projects.",
    pricingSource: "Asana Official Pricing",
    sourceUrl: "https://asana.com/pricing",
    verifiedDate: "2026-01-15",
    currency: "USD",
    inrSupported: true,
    plans: [
      {
        id: "personal",
        name: "Personal (Free)",
        pricingModel: "per_user",
        minSeats: 1,
        monthlyPricePerUser: 0,
        annualPricePerUser: 0,
        isFree: true,
        features: ["Up to 10 teammates free", "Unlimited tasks and projects", "Board, list & calendar views", "100+ app integrations"],
        limitations: "No timeline/Gantt view, no workflow rules, no forms"
      },
      {
        id: "starter",
        name: "Starter",
        pricingModel: "per_user",
        minSeats: 1,
        monthlyPricePerUser: 13.49,
        annualPricePerUser: 10.99,
        isFree: false,
        features: ["Timeline (Gantt) charts", "Workflow Builder & rule automations", "Forms for work intake", "Unlimited free guest collaborators"],
        limitations: "No portfolio cross-project views or workload balancing"
      },
      {
        id: "advanced",
        name: "Advanced",
        pricingModel: "per_user",
        minSeats: 1,
        monthlyPricePerUser: 30.49,
        annualPricePerUser: 24.99,
        isFree: false,
        features: ["Portfolios management", "Workload capacity balancing", "Approvals & proofing", "Time tracking natively"],
        limitations: "Higher enterprise security requires custom quote"
      }
    ],
    features: [
      "Unlimited free guest accounts for clients and agencies",
      "Interactive Timeline/Gantt dependencies",
      "Goal tracking connected directly to projects",
      "Automated rule triggers and approvals"
    ],
    contractInfo: "Monthly or annual subscription. Annual billing saves ~20%. Seats can be adjusted on renewal.",
    hiddenCosts: [
      "No single-seat increments on some enterprise tiers",
      "AI features (Asana Intelligence) have monthly prompt limits"
    ]
  },
  {
    id: "monday",
    name: "monday.com Work Management",
    shortName: "monday.com",
    categoryId: "project-management",
    subTypes: ["Agencies", "Kanban"],
    badge: "Most Customizable",
    logoText: "MO",
    accentColor: "#6161FF",
    description: "Highly visual work operating system with customizable columns, dashboards, and automated status triggers.",
    cheapestPaidPlanSummary: "$9/user/mo billed annually ($12 monthly, 3-seat minimum)",
    hasFreePlan: true,
    freePlanDetails: "Free plan for up to 2 users and 3 boards.",
    pricingSource: "monday.com Pricing Official",
    sourceUrl: "https://monday.com/pricing",
    verifiedDate: "2026-01-15",
    currency: "USD",
    inrSupported: true,
    plans: [
      {
        id: "free",
        name: "Individual (Free)",
        pricingModel: "per_user",
        minSeats: 1,
        monthlyPricePerUser: 0,
        annualPricePerUser: 0,
        isFree: true,
        features: ["Up to 2 seats free", "Up to 3 boards", "200+ templates", "iOS & Android apps"],
        limitations: "Strict 2-seat cap, no automations or integrations"
      },
      {
        id: "basic",
        name: "Basic",
        pricingModel: "per_user",
        minSeats: 3,
        monthlyPricePerUser: 12,
        annualPricePerUser: 9,
        isFree: false,
        features: ["Unlimited boards & items", "5 GB file storage", "Kanban board view", "Prioritized customer support"],
        limitations: "Enforces 3-seat minimum pack ($27/mo min annual). No Gantt or timeline."
      },
      {
        id: "standard",
        name: "Standard",
        pricingModel: "per_user",
        minSeats: 3,
        monthlyPricePerUser: 14,
        annualPricePerUser: 12,
        isFree: false,
        features: ["Timeline & Gantt views", "Calendar view", "250 automation actions/month", "Combined dashboard up to 5 boards"],
        limitations: "3-seat minimum ($36/mo min annual). Automation limits cap scaling."
      }
    ],
    features: [
      "Over 30 column types (status, people, formula, timeline)",
      "High-level executive dashboard reporting",
      "Pre-built automations (e.g. notify manager on status change)",
      "Multi-board data rollups"
    ],
    contractInfo: "Strict tiered seat tiers (3, 5, 10, 15, 20...). You cannot buy 4 or 7 seats; you must round up to the next tier bracket.",
    hiddenCosts: [
      "Seat tier rounding up: e.g. a 4-person team must buy a 5-seat tier",
      "Additional automations require upgrading to higher plans"
    ]
  },
  {
    id: "clickup",
    name: "ClickUp",
    shortName: "ClickUp",
    categoryId: "project-management",
    subTypes: ["Software teams", "Kanban", "Free plan"],
    badge: "All-In-One Feature Density",
    logoText: "CU",
    accentColor: "#7B68EE",
    description: "The 'one app to replace them all' offering tasks, whiteboards, docs, spreadsheets, and time tracking in a single price.",
    cheapestPaidPlanSummary: "$7/user/mo billed annually ($10 monthly)",
    hasFreePlan: true,
    freePlanDetails: "Free Forever plan with 100 MB storage and unlimited tasks.",
    pricingSource: "ClickUp Pricing",
    sourceUrl: "https://clickup.com/pricing",
    verifiedDate: "2026-01-15",
    currency: "USD",
    inrSupported: true,
    plans: [
      {
        id: "free",
        name: "Free Forever",
        pricingModel: "per_user",
        minSeats: 1,
        monthlyPricePerUser: 0,
        annualPricePerUser: 0,
        isFree: true,
        features: ["100 MB storage", "Unlimited tasks and members", "Collaborative docs & whiteboards", "Real-time chat"],
        limitations: "100 uses of custom fields, 100 automations/month"
      },
      {
        id: "unlimited",
        name: "Unlimited",
        pricingModel: "per_user",
        minSeats: 1,
        monthlyPricePerUser: 10,
        annualPricePerUser: 7,
        isFree: false,
        features: ["Unlimited storage", "Unlimited integrations & dashboards", "Gantt charts & native time tracking", "Guest permissions with view only"],
        limitations: "Workload management limited to 100 uses"
      },
      {
        id: "business",
        name: "Business",
        pricingModel: "per_user",
        minSeats: 1,
        monthlyPricePerUser: 19,
        annualPricePerUser: 12,
        isFree: false,
        features: ["Google SSO", "Unlimited teams & workload management", "Custom exporting", "Advanced time tracking with billing"],
        limitations: "Enterprise features require custom plan"
      }
    ],
    features: [
      "Native sprint points and agile burndown charts",
      "Embedded Docs and Mind Maps within task cards",
      "Granular guest permission sharing",
      "Flexible custom field architecture"
    ],
    contractInfo: "Monthly or annual billing. Annual billing saves ~30%. Flexible single-seat addition.",
    hiddenCosts: [
      "ClickUp Brain (AI assistant): $7/user/month optional add-on",
      "Storage caps on Free plan fill up quickly with attachments"
    ]
  },
  {
    id: "jira",
    name: "Jira Software (Atlassian)",
    shortName: "Jira",
    categoryId: "project-management",
    subTypes: ["Software teams", "Kanban", "Free plan"],
    badge: "Industry Standard for Dev Teams",
    logoText: "JR",
    accentColor: "#0052CC",
    description: "The gold standard issue tracker and sprint management system used by engineering organizations worldwide.",
    cheapestPaidPlanSummary: "$7.16/user/mo billed annually (~$8.15 monthly)",
    hasFreePlan: true,
    freePlanDetails: "Free for up to 10 users with Scrum/Kanban boards and 2 GB storage.",
    pricingSource: "Atlassian Jira Pricing",
    sourceUrl: "https://www.atlassian.com/software/jira/pricing",
    verifiedDate: "2026-01-15",
    currency: "USD",
    inrSupported: true,
    plans: [
      {
        id: "free",
        name: "Free (Up to 10)",
        pricingModel: "per_user",
        minSeats: 1,
        monthlyPricePerUser: 0,
        annualPricePerUser: 0,
        isFree: true,
        features: ["Up to 10 users free", "Scrum and Kanban boards", "Backlog and basic roadmaps", "2 GB file storage"],
        limitations: "No user roles/permissions, community support only"
      },
      {
        id: "standard",
        name: "Standard",
        pricingModel: "per_user",
        minSeats: 1,
        monthlyPricePerUser: 8.15,
        annualPricePerUser: 7.16,
        isFree: false,
        features: ["User roles and project permissions", "250 GB storage", "Audit logs", "Business hours customer support"],
        limitations: "No multi-project roadmaps or dependency alerts"
      },
      {
        id: "premium",
        name: "Premium",
        pricingModel: "per_user",
        minSeats: 1,
        monthlyPricePerUser: 16.00,
        annualPricePerUser: 14.25,
        isFree: false,
        features: ["Advanced Roadmaps (cross-project)", "Unlimited storage", "24/7 Premium support with 1hr SLA", "99.9% uptime guarantee"],
        limitations: "Complex configuration curve"
      }
    ],
    features: [
      "Native GitHub, GitLab, and Bitbucket git commit linking",
      "Release versioning and deployment tracking",
      "Deep JQL (Jira Query Language) filtering",
      "Atlassian Marketplace with 3,000+ plugins"
    ],
    contractInfo: "Monthly or annual contracts. Progressive volume discounts kick in automatically above 100 users.",
    hiddenCosts: [
      "Popular Atlassian Marketplace apps (e.g. Zephyr, ScriptRunner) charge per-seat aligned to your entire user count",
      "Atlassian Access (SSO / SCIM) is an extra $4/user/month"
    ]
  },
  {
    id: "trello",
    name: "Trello",
    shortName: "Trello",
    categoryId: "project-management",
    subTypes: ["Kanban", "Small team", "Free plan"],
    badge: "Simplest Kanban Board",
    logoText: "TR",
    accentColor: "#0079BF",
    description: "Visual card and board tool famous for tactile Kanban workflow tracking with zero setup time.",
    cheapestPaidPlanSummary: "$5/user/mo billed annually ($6 monthly)",
    hasFreePlan: true,
    freePlanDetails: "Free plan includes up to 10 boards per workspace and unlimited cards.",
    pricingSource: "Trello Official Pricing",
    sourceUrl: "https://trello.com/pricing",
    verifiedDate: "2026-01-15",
    currency: "USD",
    inrSupported: true,
    plans: [
      {
        id: "free",
        name: "Free",
        pricingModel: "per_user",
        minSeats: 1,
        monthlyPricePerUser: 0,
        annualPricePerUser: 0,
        isFree: true,
        features: ["Up to 10 boards per workspace", "Unlimited cards and power-ups", "250 Workspace command runs/mo", "iOS & Android apps"],
        limitations: "10 MB attachment limit, no custom fields or timeline view"
      },
      {
        id: "standard",
        name: "Standard",
        pricingModel: "per_user",
        minSeats: 1,
        monthlyPricePerUser: 6,
        annualPricePerUser: 5,
        isFree: false,
        features: ["Unlimited boards", "Advanced checklists & assignees", "Custom fields on cards", "250 MB file attachments"],
        limitations: "No dashboard or timeline views"
      },
      {
        id: "premium",
        name: "Premium",
        pricingModel: "per_user",
        minSeats: 1,
        monthlyPricePerUser: 12.50,
        annualPricePerUser: 10,
        isFree: false,
        features: ["Timeline, Table, Calendar & Map views", "Workspace-level board templates", "Unlimited Butler command runs", "Priority support"],
        limitations: "Limited enterprise security controls"
      }
    ],
    features: [
      "Zero learning curve Kanban columns",
      "Butler automation with natural language commands",
      "Unlimited power-up integrations on all plans",
      "Lightweight mobile board updates"
    ],
    contractInfo: "Monthly or annual billing. Pay per seat with no artificial minimums.",
    hiddenCosts: [
      "Paid third-party power-ups billed separately by developers",
      "Atlassian Access for SSO costs extra"
    ]
  },

  // =========================================================================
  // 3. ACCOUNTING SOFTWARE
  // =========================================================================
  {
    id: "quickbooks",
    name: "Intuit QuickBooks Online",
    shortName: "QuickBooks",
    categoryId: "accounting",
    subTypes: ["Small business", "GST invoicing", "Inventory"],
    badge: "Accountant Industry Standard",
    logoText: "QB",
    accentColor: "#2CA01C",
    description: "The most widely supported bookkeeping and financial reporting software for small businesses and certified accountants.",
    cheapestPaidPlanSummary: "$30/mo flat (Simple Start, 1 user) or $15/mo promotional",
    hasFreePlan: false,
    freePlanDetails: "30-day free trial or 50% discount for first 3 months.",
    pricingSource: "Intuit QuickBooks Online Pricing",
    sourceUrl: "https://quickbooks.intuit.com/pricing/",
    verifiedDate: "2026-01-15",
    currency: "USD",
    inrSupported: true,
    plans: [
      {
        id: "simple-start",
        name: "Simple Start",
        pricingModel: "flat",
        minSeats: 1,
        baseFeeMonthly: 30,
        baseFeeAnnualPerMonth: 30,
        monthlyPricePerUser: 0,
        annualPricePerUser: 0,
        isFree: false,
        features: ["Income and expense tracking", "Custom invoices & quotes", "Bank transactions auto-sync", "Sales tax calculations"],
        limitations: "Strictly 1 user + 2 accountant seats"
      },
      {
        id: "plus",
        name: "Plus (Most Popular)",
        pricingModel: "flat",
        minSeats: 1,
        baseFeeMonthly: 90,
        baseFeeAnnualPerMonth: 90,
        monthlyPricePerUser: 0,
        annualPricePerUser: 0,
        isFree: false,
        features: ["Up to 5 users included", "Inventory tracking & stock reordering", "Project profitability tracking", "Manage bills and payables"],
        limitations: "Max 5 users; extra users require Advanced plan ($200/mo)"
      }
    ],
    features: [
      "Direct bank feeds with thousands of financial institutions",
      "Seamless CPA handoff with dedicated accountant logins",
      "Automated mileage and receipt photo matching",
      "1099 contractor payments and filing"
    ],
    contractInfo: "Monthly recurring subscription. Cancel anytime without penalty. Beware introductory discount expiries (reverts to standard list after 3 months).",
    hiddenCosts: [
      "QuickBooks Payroll add-on: $45-$125/mo base + $6-$10/employee/mo",
      "QuickBooks Payments merchant processing: 2.99% + $0.25 per card transaction",
      "Plan jump to $200/mo if you exceed 5 users"
    ]
  },
  {
    id: "xero",
    name: "Xero",
    shortName: "Xero",
    categoryId: "accounting",
    subTypes: ["Small business", "Freelancers"],
    badge: "Unlimited Users Included",
    logoText: "XR",
    accentColor: "#13B5EA",
    description: "Cloud accounting platform that uniquely includes unlimited team seats on standard plans, making it very economical for growing businesses.",
    cheapestPaidPlanSummary: "$15/mo (Early) or $42/mo (Growing with unlimited invoices)",
    hasFreePlan: false,
    freePlanDetails: "30-day free trial with full access.",
    pricingSource: "Xero Pricing Plans",
    sourceUrl: "https://www.xero.com/pricing-plans/",
    verifiedDate: "2026-01-15",
    currency: "USD",
    inrSupported: true,
    plans: [
      {
        id: "early",
        name: "Early",
        pricingModel: "flat",
        minSeats: 1,
        baseFeeMonthly: 15,
        baseFeeAnnualPerMonth: 15,
        monthlyPricePerUser: 0,
        annualPricePerUser: 0,
        isFree: false,
        features: ["Send 20 invoices & quotes", "Enter 5 bills", "Bank reconciliation", "Hubdoc capture receipts"],
        limitations: "Very low invoice caps (20 invoices max per month)"
      },
      {
        id: "growing",
        name: "Growing",
        pricingModel: "flat",
        minSeats: 1,
        baseFeeMonthly: 42,
        baseFeeAnnualPerMonth: 42,
        monthlyPricePerUser: 0,
        annualPricePerUser: 0,
        isFree: false,
        features: ["Unlimited invoices & quotes", "Unlimited bills to enter", "Bulk bank transaction reconcile", "Unlimited team user logins"],
        limitations: "No multi-currency or project job costing"
      },
      {
        id: "established",
        name: "Established",
        pricingModel: "flat",
        minSeats: 1,
        baseFeeMonthly: 78,
        baseFeeAnnualPerMonth: 78,
        monthlyPricePerUser: 0,
        annualPricePerUser: 0,
        isFree: false,
        features: ["Multiple currencies with live rates", "Project tracking & job costing", "Employee expense claims", "In-depth analytics"],
        limitations: "Analytics Plus features require higher fee"
      }
    ],
    features: [
      "Unlimited team users without per-seat charges",
      "Hubdoc automated receipt fetching included free",
      "Automatic daily bank feeds",
      "Clean double-entry reconciliation interface"
    ],
    contractInfo: "Month-to-month contracts. Cancel with 30 days notice.",
    hiddenCosts: [
      "Gusto payroll integration billed separately",
      "Stripe / credit card invoice payment processing surcharges"
    ]
  },
  {
    id: "freshbooks",
    name: "FreshBooks",
    shortName: "FreshBooks",
    categoryId: "accounting",
    subTypes: ["Freelancers", "Small business"],
    badge: "Best for Client Invoicing & Time",
    logoText: "FB",
    accentColor: "#0075EB",
    description: "Invoice-first bookkeeping platform tailored for freelancers, service professionals, and creative agencies.",
    cheapestPaidPlanSummary: "$19/mo flat (Lite, 5 clients) or $9.50/mo introductory",
    hasFreePlan: false,
    freePlanDetails: "30-day free trial, no credit card required.",
    pricingSource: "FreshBooks Pricing Official",
    sourceUrl: "https://www.freshbooks.com/pricing",
    verifiedDate: "2026-01-15",
    currency: "USD",
    inrSupported: true,
    plans: [
      {
        id: "lite",
        name: "Lite",
        pricingModel: "flat",
        minSeats: 1,
        baseFeeMonthly: 19,
        baseFeeAnnualPerMonth: 15.20,
        monthlyPricePerUser: 0,
        annualPricePerUser: 0,
        isFree: false,
        features: ["Send invoices to up to 5 clients", "Track unlimited expenses", "Accept credit cards & bank transfers", "Mobile receipt scanning"],
        limitations: "Strict 5-client limit, 1 user only"
      },
      {
        id: "plus",
        name: "Plus",
        pricingModel: "flat",
        minSeats: 1,
        baseFeeMonthly: 33,
        baseFeeAnnualPerMonth: 26.40,
        monthlyPricePerUser: 0,
        annualPricePerUser: 0,
        isFree: false,
        features: ["Send invoices to up to 50 clients", "Automatic recurring invoices & late fees", "Double-entry accounting reports", "Business health reports"],
        limitations: "Extra team members cost $11/user/mo each"
      }
    ],
    features: [
      "Professional branded invoices with payment links",
      "Built-in project hour timer directly converts to billable invoices",
      "Automated late payment reminders and fees",
      "Client portal for invoice approvals"
    ],
    contractInfo: "Monthly or annual billing (~20% off annual). Cancel anytime.",
    hiddenCosts: [
      "Additional team members cost $11/user/month each",
      "Advanced Payments virtual terminal: $20/month + 3.5% + $0.30"
    ]
  },
  {
    id: "zoho-books",
    name: "Zoho Books",
    shortName: "Zoho Books",
    categoryId: "accounting",
    subTypes: ["GST invoicing", "Small business", "Free plan"],
    badge: "Best for GST Compliance in India",
    logoText: "ZB",
    accentColor: "#E02020",
    description: "End-to-end accounting platform with deep inventory tracking, certified GST e-invoicing, and affordable multi-tier pricing.",
    cheapestPaidPlanSummary: "₹749/org/mo billed annually (India) or $15/mo global",
    hasFreePlan: true,
    freePlanDetails: "Free plan for businesses with annual turnover under ₹25 Lakhs (or $50k revenue) with 1 user + 1 accountant.",
    pricingSource: "Zoho Books Pricing",
    sourceUrl: "https://www.zoho.com/books/pricing/",
    verifiedDate: "2026-01-15",
    currency: "USD",
    inrSupported: true,
    plans: [
      {
        id: "free",
        name: "Free Plan",
        pricingModel: "flat",
        minSeats: 1,
        baseFeeMonthly: 0,
        baseFeeAnnualPerMonth: 0,
        monthlyPricePerUser: 0,
        annualPricePerUser: 0,
        isFree: true,
        features: ["1 user + 1 accountant", "Manage up to 1,000 invoices/year", "Multi-lingual invoicing", "Customer portal"],
        limitations: "Restricted to revenue under ₹25L ($50k) annually"
      },
      {
        id: "standard",
        name: "Standard",
        pricingModel: "flat",
        minSeats: 1,
        baseFeeMonthly: 20,
        baseFeeAnnualPerMonth: 15,
        monthlyPricePerUser: 0,
        annualPricePerUser: 0,
        isFree: false,
        features: ["3 users included", "Manage up to 5,000 invoices", "e-Way bill generation", "Recurring expenses & billing"],
        limitations: "Extra users cost $3/user/mo (₹100/mo)"
      },
      {
        id: "professional",
        name: "Professional",
        pricingModel: "flat",
        minSeats: 1,
        baseFeeMonthly: 50,
        baseFeeAnnualPerMonth: 40,
        monthlyPricePerUser: 0,
        annualPricePerUser: 0,
        isFree: false,
        features: ["5 users included", "Inventory tracking with reorder alerts", "Sales orders & purchase orders", "Direct GST e-Invoicing filing"],
        limitations: "Warehouse management requires Premium"
      }
    ],
    features: [
      "Direct integration with GSTN portal for instant e-Way bills & e-invoices",
      "Seamless integration with ICICI, Axis, and standard bank feeds",
      "Multi-currency transaction support",
      "Client approval workflows and automated payment reminders"
    ],
    contractInfo: "Available on monthly or annual plans. Billed in INR inside India or USD internationally.",
    hiddenCosts: [
      "Additional user licenses: $3/user/month (₹100/user/mo in India)",
      "Additional branch locations: ₹749/branch/month"
    ]
  },
  {
    id: "tallyprime",
    name: "TallyPrime (Tally Solutions)",
    shortName: "TallyPrime",
    categoryId: "accounting",
    subTypes: ["GST invoicing", "Inventory", "Small business"],
    badge: "India's #1 Desktop ERP",
    logoText: "TP",
    accentColor: "#0F4C81",
    description: "India's traditional powerhouse on-premise business management software for CA audits, GST returns, and complex inventory.",
    cheapestPaidPlanSummary: "₹600/mo rental or ₹18,000 one-time perpetual (Silver)",
    hasFreePlan: false,
    freePlanDetails: "Educational mode free for learning with date entry restrictions.",
    pricingSource: "Tally Solutions Official Pricing",
    sourceUrl: "https://tallysolutions.com/tally-prime-pricing/",
    verifiedDate: "2026-01-15",
    currency: "INR",
    inrSupported: true,
    plans: [
      {
        id: "silver-rental",
        name: "Silver Rental (Single User)",
        pricingModel: "flat",
        minSeats: 1,
        baseFeeMonthly: 600,
        baseFeeAnnualPerMonth: 600,
        monthlyPricePerUser: 0,
        annualPricePerUser: 0,
        isFree: false,
        features: ["Single PC standalone installation", "Full GST & e-Invoicing suite", "Comprehensive inventory & barcode support", "Tally Software Services (TSS) included"],
        limitations: "Single user operating on one operating system"
      },
      {
        id: "silver-perpetual",
        name: "Silver Perpetual (One-Time)",
        pricingModel: "flat",
        minSeats: 1,
        baseFeeMonthly: 1500, // annualized equivalent
        baseFeeAnnualPerMonth: 1500,
        monthlyPricePerUser: 0,
        annualPricePerUser: 0,
        isFree: false,
        features: ["Perpetual one-time lifetime license (₹18,000 + 18% GST)", "1 year TSS free for updates", "Offline operation with zero internet dependency", "Accepted by 95% of Chartered Accountants in India"],
        limitations: "Annual TSS renewal fee of ₹3,600 + GST after year 1"
      },
      {
        id: "gold-perpetual",
        name: "Gold Perpetual (Multi-User LAN)",
        pricingModel: "flat",
        minSeats: 1,
        baseFeeMonthly: 4500, // annualized equivalent of 54,000
        baseFeeAnnualPerMonth: 4500,
        monthlyPricePerUser: 0,
        annualPricePerUser: 0,
        isFree: false,
        features: ["Unlimited multi-user access across local network (LAN)", "One-time purchase (₹54,000 + GST)", "Concurrent multi-user voucher entry", "High-volume transactional performance"],
        limitations: "Annual TSS renewal fee of ₹10,800 + GST after year 1"
      }
    ],
    features: [
      "100% offline capability — works without internet connection",
      "Instant audit reconciliation with Indian Chartered Accountants",
      "Full statutory compliance: GSTR-1, GSTR-3B, e-Way bills",
      "Complex manufacturing batches, stock categories, and expiry tracking"
    ],
    contractInfo: "Perpetual license or quarterly/annual subscription rentals. Local partner installation support available.",
    hiddenCosts: [
      "Annual Tally Software Services (TSS) renewal: ₹3,600 (Silver) or ₹10,800 (Gold)",
      "Cloud hosting (AWS/Azure) extra if remote access is required"
    ]
  },

  // =========================================================================
  // 4. HR & PAYROLL
  // =========================================================================
  {
    id: "gusto",
    name: "Gusto",
    shortName: "Gusto",
    categoryId: "hr-payroll",
    subTypes: ["Payroll only", "Contractors", "Full HR suite"],
    badge: "Best for US Small Business",
    logoText: "GU",
    accentColor: "#F45D48",
    description: "Modern, friendly payroll, benefits, and HR platform with automated local, state, and federal tax filings.",
    cheapestPaidPlanSummary: "$40/mo base fee + $6/person/mo (Simple plan)",
    hasFreePlan: false,
    freePlanDetails: "No free plan; contractor-only plan available at $35/mo + $6/contractor.",
    pricingSource: "Gusto Official Pricing",
    sourceUrl: "https://gusto.com/pricing",
    verifiedDate: "2026-01-15",
    currency: "USD",
    inrSupported: true,
    plans: [
      {
        id: "simple",
        name: "Simple",
        pricingModel: "per_user",
        minSeats: 1,
        baseFeeMonthly: 40,
        baseFeeAnnualPerMonth: 40,
        monthlyPricePerUser: 6,
        annualPricePerUser: 6,
        isFree: false,
        features: ["Full automated federal, state & local tax filing", "Direct deposit payroll runs", "W-2 and 1099 generation", "Basic employee self-service portal"],
        limitations: "Single state payroll only; multi-state requires Plus plan"
      },
      {
        id: "plus",
        name: "Plus",
        pricingModel: "per_user",
        minSeats: 1,
        baseFeeMonthly: 80,
        baseFeeAnnualPerMonth: 80,
        monthlyPricePerUser: 12,
        annualPricePerUser: 12,
        isFree: false,
        features: ["Multi-state payroll support", "Next-day direct deposit", "Time tracking and PTO approval requests", "Hiring and onboarding document templates"],
        limitations: "Dedicated HR resource center requires $8/user add-on"
      }
    ],
    features: [
      "Automated tax penalty guarantee",
      "Seamless integration with QuickBooks and Xero",
      "Employee benefits integration (health, 401k, commuter)",
      "Contractor self-onboarding with W-9 automated collection"
    ],
    contractInfo: "Month-to-month billing. No long-term lock-in. Billed automatically at month end based on active payees.",
    hiddenCosts: [
      "Health insurance broker management fees (carrier premiums)",
      "International contractor payouts have currency exchange fees"
    ]
  },
  {
    id: "rippling",
    name: "Rippling",
    shortName: "Rippling",
    categoryId: "hr-payroll",
    subTypes: ["Full HR suite", "Contractors"],
    badge: "Best Unified IT + HR Platform",
    logoText: "RP",
    accentColor: "#FFC629",
    description: "The workforce management platform managing payroll, HR, company devices, and software access in one unified system.",
    cheapestPaidPlanSummary: "Starts at $8/employee/mo + platform base fee (~$35/mo)",
    hasFreePlan: false,
    freePlanDetails: "Custom demo required. No permanent free tier.",
    pricingSource: "Rippling Pricing Structure",
    sourceUrl: "https://www.rippling.com/pricing",
    verifiedDate: "2026-01-15",
    currency: "USD",
    inrSupported: true,
    plans: [
      {
        id: "unity-core",
        name: "Unity Core HR + Payroll",
        pricingModel: "per_user",
        minSeats: 1,
        baseFeeMonthly: 35,
        baseFeeAnnualPerMonth: 35,
        monthlyPricePerUser: 14, // $8 HR + $6 Payroll
        annualPricePerUser: 12,
        isFree: false,
        features: ["Automated 90-second global payroll", "Employee self-onboarding & directory", "Compliance document management", "Workflow trigger automation"],
        limitations: "Device management (MDM) sold as separate module"
      }
    ],
    features: [
      "Global payroll in 50+ countries with local currency disbursement",
      "Instant laptop provisioning and security policy deployment",
      "Single sign-on (SSO) app provisioning based on employee role",
      "Custom workflow builder across HR and IT events"
    ],
    contractInfo: "Annual contract required. Billed annually or monthly commit. Pricing is modular per app enabled.",
    hiddenCosts: [
      "Foundational Rippling Platform fee ($35/mo) mandatory before apps",
      "Device Management module: ~$5/device/mo extra",
      "Global PEO services billed at separate per-head rates (~$599/head/mo)"
    ]
  },
  {
    id: "greythr",
    name: "greytHR",
    shortName: "greytHR",
    categoryId: "hr-payroll",
    subTypes: ["India payroll", "Payroll only"],
    badge: "India's Leading Cloud Payroll",
    logoText: "GH",
    accentColor: "#00A859",
    description: "India's top cloud HR and payroll software, pre-configured with 100% statutory compliance for PF, ESI, PT, and Form 16.",
    cheapestPaidPlanSummary: "₹3,495/mo base for up to 25 employees (Starter plan)",
    hasFreePlan: false,
    freePlanDetails: "7-day full functional trial with sample Indian payroll data.",
    pricingSource: "greytHR Official Pricing",
    sourceUrl: "https://www.greythr.com/pricing/",
    verifiedDate: "2026-01-15",
    currency: "INR",
    inrSupported: true,
    plans: [
      {
        id: "starter",
        name: "Starter (Payroll Only)",
        pricingModel: "per_user",
        minSeats: 25,
        baseFeeMonthly: 3495,
        baseFeeAnnualPerMonth: 2995,
        monthlyPricePerUser: 25, // for additional above 25
        annualPricePerUser: 20,
        isFree: false,
        features: ["Core Indian statutory payroll (PF, ESI, TDS, PT)", "Employee mobile self-service app", "Automated Form 16 Part A & B generation", "Bank payout salary advice files"],
        limitations: "Enforces 25-employee minimum base fee"
      },
      {
        id: "essential",
        name: "Essential (HR + Payroll)",
        pricingModel: "per_user",
        minSeats: 25,
        baseFeeMonthly: 5495,
        baseFeeAnnualPerMonth: 4995,
        monthlyPricePerUser: 35,
        annualPricePerUser: 30,
        isFree: false,
        features: ["Leave & attendance management", "Geo-mark mobile attendance", "Shift roster management", "Statutory compliance report generation"],
        limitations: "Performance appraisals require Growth plan"
      }
    ],
    features: [
      "100% compliant with Indian labour laws, PF, ESI, Gratuity & Professional Tax",
      "Direct one-click salary credit partnership with ICICI Bank",
      "Ready-to-file Form 24Q and digitally signed Form 16 generation",
      "Localized mobile app in multiple Indian languages"
    ],
    contractInfo: "Quarterly or annual subscription in INR. Base price includes first 25 employees; increments billed per active head.",
    hiddenCosts: [
      "One-time onboarding and setup fee: ₹5,000 to ₹15,000",
      "Facial recognition biometric sync hardware connector extra"
    ]
  },
  {
    id: "keka",
    name: "Keka HR",
    shortName: "Keka",
    categoryId: "hr-payroll",
    subTypes: ["India payroll", "Full HR suite"],
    badge: "Best Modern UX for Indian Tech Teams",
    logoText: "KK",
    accentColor: "#4B6BFB",
    description: "Employee-first HRMS and payroll software popular among Indian tech startups for modern performance reviews and attendance.",
    cheapestPaidPlanSummary: "₹6,999/mo base for first 100 employees + ₹60/emp/mo (Foundation)",
    hasFreePlan: false,
    freePlanDetails: "Free guided product demonstration and sandbox trial.",
    pricingSource: "Keka HR Pricing",
    sourceUrl: "https://www.keka.com/pricing",
    verifiedDate: "2026-01-15",
    currency: "INR",
    inrSupported: true,
    plans: [
      {
        id: "foundation",
        name: "Foundation",
        pricingModel: "per_user",
        minSeats: 100,
        baseFeeMonthly: 6999,
        baseFeeAnnualPerMonth: 6999,
        monthlyPricePerUser: 60,
        annualPricePerUser: 50,
        isFree: false,
        features: ["Full Indian payroll & statutory filings", "Leave & attendance tracking", "Employee portal & mobile app", "Asset management"],
        limitations: "100 employee minimum base pricing applies"
      },
      {
        id: "strength",
        name: "Strength (Full Suite)",
        pricingModel: "per_user",
        minSeats: 100,
        baseFeeMonthly: 9999,
        baseFeeAnnualPerMonth: 9999,
        monthlyPricePerUser: 90,
        annualPricePerUser: 75,
        isFree: false,
        features: ["Performance management (OKRs & 360 feedback)", "Applicant Tracking System (ATS)", "Timesheets and billable project hours", "Custom employee survey forms"],
        limitations: "Implementation onboarding required"
      }
    ],
    features: [
      "Delightful Slack-integrated attendance clock-in",
      "Goal setting and continuous peer performance feedback",
      "Automated tax declarations and proof verification",
      "Expense reimbursement approvals with receipt OCR"
    ],
    contractInfo: "Annual agreement billed annually or quarterly. 100 employee minimum block.",
    hiddenCosts: [
      "Mandatory implementation assistance: ₹20,000 to ₹40,000 one-time",
      "SMS notification pack top-ups"
    ]
  },

  // =========================================================================
  // 5. TEAM COLLABORATION
  // =========================================================================
  {
    id: "slack",
    name: "Slack (Salesforce)",
    shortName: "Slack",
    categoryId: "team-collaboration",
    subTypes: ["Chat", "Docs and wikis"],
    badge: "Best Developer Ecosystem",
    logoText: "SL",
    accentColor: "#4A154B",
    description: "The enterprise communication hub uniting channel-based messaging, asynchronous video clips, and workflow bots.",
    cheapestPaidPlanSummary: "$7.25/user/mo billed annually ($8.75 monthly)",
    hasFreePlan: true,
    freePlanDetails: "Free plan includes 90 days of message history and 1:1 audio/video huddles.",
    pricingSource: "Slack Pricing Official",
    sourceUrl: "https://slack.com/pricing",
    verifiedDate: "2026-01-15",
    currency: "USD",
    inrSupported: true,
    plans: [
      {
        id: "free",
        name: "Free",
        pricingModel: "per_user",
        minSeats: 1,
        monthlyPricePerUser: 0,
        annualPricePerUser: 0,
        isFree: true,
        features: ["90 days of message & file history", "10 app integrations", "1:1 audio & video huddles", "Canvas document creation"],
        limitations: "Messages older than 90 days are hidden; no group huddles"
      },
      {
        id: "pro",
        name: "Pro",
        pricingModel: "per_user",
        minSeats: 1,
        monthlyPricePerUser: 8.75,
        annualPricePerUser: 7.25,
        isFree: false,
        features: ["Unlimited message & file history", "Unlimited app integrations", "Group huddles up to 50 with screen share", "Slack Connect with external partners"],
        limitations: "Single workspace only; no SAML SSO"
      },
      {
        id: "business-plus",
        name: "Business+",
        pricingModel: "per_user",
        minSeats: 1,
        monthlyPricePerUser: 15.00,
        annualPricePerUser: 12.50,
        isFree: false,
        features: ["SAML-based single sign-on (SSO)", "99.99% guaranteed uptime SLA", "Data exports for all messages", "User provisioning via SCIM"],
        limitations: "Enterprise Grid required for HIPAA compliance"
      }
    ],
    features: [
      "Slack Connect: collaborate securely in shared channels with outside vendors",
      "Over 2,600 tools integrated via Slack App Directory",
      "Asynchronous audio/video clips and lightweight Huddles",
      "Native workflow builder for non-technical team automations"
    ],
    contractInfo: "Fair Billing Policy: Slack automatically computes inactive users and applies prorated account credits.",
    hiddenCosts: [
      "Slack AI search summary add-on: $10/user/month optional add-on",
      "Storage past 10 GB/user requires Business+ or Enterprise"
    ]
  },
  {
    id: "microsoft-teams",
    name: "Microsoft Teams (M365)",
    shortName: "Microsoft Teams",
    categoryId: "team-collaboration",
    subTypes: ["Chat", "Docs and wikis", "Whiteboards"],
    badge: "Best Enterprise Value",
    logoText: "MS",
    accentColor: "#6264A7",
    description: "Deeply unified communication workspace built into Microsoft 365, bundling Office apps, cloud storage, and video calling.",
    cheapestPaidPlanSummary: "$4.00/user/mo (Essentials) or $6.00/user/mo with full M365",
    hasFreePlan: true,
    freePlanDetails: "Free plan includes up to 100 participants per meeting for 60 minutes and 5 GB cloud storage.",
    pricingSource: "Microsoft Teams Options",
    sourceUrl: "https://www.microsoft.com/en-us/microsoft-teams/compare-microsoft-teams-options",
    verifiedDate: "2026-01-15",
    currency: "USD",
    inrSupported: true,
    plans: [
      {
        id: "free",
        name: "Teams Free",
        pricingModel: "per_user",
        minSeats: 1,
        monthlyPricePerUser: 0,
        annualPricePerUser: 0,
        isFree: true,
        features: ["Group meetings up to 60 mins (100 attendees)", "Unlimited chat messages and search", "5 GB cloud storage per user", "Real-time co-authoring in web apps"],
        limitations: "No meeting recordings or breakout rooms"
      },
      {
        id: "essentials",
        name: "Teams Essentials",
        pricingModel: "per_user",
        minSeats: 1,
        monthlyPricePerUser: 4.80,
        annualPricePerUser: 4.00,
        isFree: false,
        features: ["Unlimited group meetings up to 30 hours", "Up to 300 attendees per meeting", "10 GB cloud storage per user", "Anytime phone and web support"],
        limitations: "Does not include desktop Word, Excel, or Exchange email"
      },
      {
        id: "m365-basic",
        name: "Microsoft 365 Business Basic",
        pricingModel: "per_user",
        minSeats: 1,
        monthlyPricePerUser: 7.20,
        annualPricePerUser: 6.00,
        isFree: false,
        features: ["Everything in Teams Essentials", "Business-class email (50 GB mailbox)", "1 TB OneDrive secure cloud storage per user", "Web and mobile Office apps"],
        limitations: "Desktop installable Office apps requires Standard ($12.50/mo)"
      }
    ],
    features: [
      "Incredible price-to-value ratio when combined with M365 email & 1 TB OneDrive",
      "Native PowerPoint Live and whiteboard collaboration in calls",
      "Enterprise security backed by Microsoft Entra ID",
      "Meeting transcripts with live translated captions"
    ],
    contractInfo: "Annual commitment with monthly or annual payment. Cancellation fees may apply on premature termination.",
    hiddenCosts: [
      "Microsoft 365 Copilot AI add-on: $30/user/month billed annually",
      "Teams Phone System calling plans add $8-$15/user/month"
    ]
  },

  // =========================================================================
  // 6. VIDEO CONFERENCING
  // =========================================================================
  {
    id: "zoom",
    name: "Zoom Workplace",
    shortName: "Zoom",
    categoryId: "video-conferencing",
    subTypes: ["Meetings", "Webinars", "Free plan limits"],
    badge: "Most Reliable Video Call Quality",
    logoText: "ZM",
    accentColor: "#0B5CFF",
    description: "The ubiquitous video conferencing application known for rock-solid stability even on weak networks, with built-in AI summaries.",
    cheapestPaidPlanSummary: "$13.33/license/mo billed annually ($159.90/yr) or $15.99/mo",
    hasFreePlan: true,
    freePlanDetails: "Free plan allows 100 participants with a strict 40-minute limit on group meetings.",
    pricingSource: "Zoom Workplace Official Pricing",
    sourceUrl: "https://zoom.us/pricing",
    verifiedDate: "2026-01-15",
    currency: "USD",
    inrSupported: true,
    plans: [
      {
        id: "basic",
        name: "Basic (Free)",
        pricingModel: "per_user",
        minSeats: 1,
        monthlyPricePerUser: 0,
        annualPricePerUser: 0,
        isFree: true,
        features: ["Up to 100 participants per meeting", "Whiteboard (3 editable boards)", "Team chat messaging", "Automated captions"],
        limitations: "Strict 40-minute meeting limit on 3+ attendees; no cloud recording"
      },
      {
        id: "pro",
        name: "Pro",
        pricingModel: "per_user",
        minSeats: 1,
        monthlyPricePerUser: 15.99,
        annualPricePerUser: 13.33,
        isFree: false,
        features: ["Meetings up to 30 hours each", "5 GB cloud recording storage", "Zoom AI Companion included free", "Streaming to YouTube / Facebook"],
        limitations: "Max 9 host licenses per account (otherwise upgrade to Business)"
      },
      {
        id: "business",
        name: "Business",
        pricingModel: "per_user",
        minSeats: 10,
        monthlyPricePerUser: 21.99,
        annualPricePerUser: 18.33,
        isFree: false,
        features: ["Up to 300 participants per call", "SSO integration & managed domains", "Company branding on meeting URLs", "Unlimited whiteboards"],
        limitations: "Enforces 10-host minimum ($183.30/mo min annual)"
      }
    ],
    features: [
      "Zoom AI Companion included at no extra license fee",
      "Virtually zero latency on high packet loss connections",
      "Only the host requires a paid license — participants join free",
      "Virtual backgrounds with studio lighting adjustments"
    ],
    contractInfo: "Annual subscription billed upfront ($159.90/host/year) or pay-as-you-go monthly. Cancel renewal anytime.",
    hiddenCosts: [
      "Additional Cloud Storage: $10/mo for 30 GB or $100/mo for 3 TB",
      "Zoom Webinars: $79/mo for 500 attendees, up to $340/mo for 3,000",
      "Zoom Phone lines: $10 to $20/user/month"
    ]
  },
  {
    id: "google-meet",
    name: "Google Meet (Google Workspace)",
    shortName: "Google Meet",
    categoryId: "video-conferencing",
    subTypes: ["Meetings", "Free plan limits"],
    badge: "Zero Download Browser Calling",
    logoText: "GM",
    accentColor: "#00832D",
    description: "Frictionless web-native video meetings directly in Google Chrome, bundled with Gmail, Google Drive, and Gemini AI.",
    cheapestPaidPlanSummary: "$6/user/mo (Workspace Business Starter) billed annually",
    hasFreePlan: true,
    freePlanDetails: "Free personal Google account allows 1-hour group calls (up to 100 participants).",
    pricingSource: "Google Workspace Pricing",
    sourceUrl: "https://workspace.google.com/pricing.html",
    verifiedDate: "2026-01-15",
    currency: "USD",
    inrSupported: true,
    plans: [
      {
        id: "free",
        name: "Free (Personal)",
        pricingModel: "per_user",
        minSeats: 1,
        monthlyPricePerUser: 0,
        annualPricePerUser: 0,
        isFree: true,
        features: ["Up to 100 participants", "60-minute group meeting limit", "24-hour 1:1 call limit", "Live closed captions"],
        limitations: "Cannot record meetings to Google Drive; no breakout rooms"
      },
      {
        id: "starter",
        name: "Business Starter",
        pricingModel: "per_user",
        minSeats: 1,
        monthlyPricePerUser: 7.20,
        annualPricePerUser: 6.00,
        isFree: false,
        features: ["100 participant calls for 24 hours", "Custom business email (@yourcompany)", "30 GB pooled cloud storage/user", "Standard security & admin controls"],
        limitations: "Meeting recording is NOT included on Business Starter"
      },
      {
        id: "standard",
        name: "Business Standard",
        pricingModel: "per_user",
        minSeats: 1,
        monthlyPricePerUser: 14.40,
        annualPricePerUser: 12.00,
        isFree: false,
        features: ["Up to 150 participants", "Meeting recording saved directly to Google Drive", "Noise cancellation background suppression", "Breakout rooms & polling"],
        limitations: "Attendance tracking reports reserved for Business Plus"
      }
    ],
    features: [
      "Runs 100% in browser tab without downloading native desktop client",
      "Meeting recordings land automatically in Google Drive folder",
      "Direct Google Calendar integration with one-click joining",
      "Gemini AI meeting notes and live captions"
    ],
    contractInfo: "Flexible monthly plan or 1-year annual contract (~20% discount).",
    hiddenCosts: [
      "Gemini for Google Workspace add-on: $20/user/month",
      "Recording capability requires upgrading from $6 to $12 tier"
    ]
  },
  {
    id: "webex",
    name: "Cisco Webex",
    shortName: "Webex",
    categoryId: "video-conferencing",
    subTypes: ["Meetings", "Webinars"],
    badge: "Highest Enterprise Security & Audio",
    logoText: "WX",
    accentColor: "#000000",
    description: "Enterprise video meeting solution by Cisco renowned for advanced background noise removal, Webex boards, and end-to-end encryption.",
    cheapestPaidPlanSummary: "$12.00/license/mo billed annually ($14.50 monthly)",
    hasFreePlan: true,
    freePlanDetails: "Free plan supports up to 100 participants for 40 minutes with interactive whiteboarding.",
    pricingSource: "Cisco Webex Pricing",
    sourceUrl: "https://www.webex.com/pricing/index.html",
    verifiedDate: "2026-01-15",
    currency: "USD",
    inrSupported: true,
    plans: [
      {
        id: "free",
        name: "Webex Free",
        pricingModel: "per_user",
        minSeats: 1,
        monthlyPricePerUser: 0,
        annualPricePerUser: 0,
        isFree: true,
        features: ["Meetings up to 40 mins (100 participants)", "Local meeting recording", "Whiteboarding and screen sharing", "AI background noise removal"],
        limitations: "No cloud recording, limited customer support"
      },
      {
        id: "meet",
        name: "Webex Meet",
        pricingModel: "per_user",
        minSeats: 1,
        monthlyPricePerUser: 14.50,
        annualPricePerUser: 12.00,
        isFree: false,
        features: ["Meetings up to 24 hours (up to 200 attendees)", "Unlimited cloud recordings", "Closed captions & meeting transcripts", "Cohost privileges & breakout sessions"],
        limitations: "Cloud phone system requires Webex Suite"
      }
    ],
    features: [
      "Industry-leading BabbleLabs background noise removal",
      "Real-time translation in 100+ spoken languages",
      "HIPAA and FedRAMP high enterprise security certifications",
      "Seamless pairing with Cisco Room hardware"
    ],
    contractInfo: "Monthly or annual billing (~17% discount on annual).",
    hiddenCosts: [
      "Webex Webinars: starts at $275/month for 1,000 attendees",
      "Webex Calling phone numbers add $17/user/month"
    ]
  },
  {
    id: "goto-meeting",
    name: "GoTo Meeting",
    shortName: "GoTo",
    categoryId: "video-conferencing",
    subTypes: ["Meetings"],
    badge: "Simple Dedicated Conferencing",
    logoText: "GT",
    accentColor: "#FAC500",
    description: "Straightforward corporate video conferencing service offering high-capacity participant limits on starter tiers.",
    cheapestPaidPlanSummary: "$12.00/license/mo billed annually ($14.00 monthly)",
    hasFreePlan: false,
    freePlanDetails: "14-day free trial. No permanent free plan.",
    pricingSource: "GoTo Meeting Pricing",
    sourceUrl: "https://www.goto.com/pricing/meeting",
    verifiedDate: "2026-01-15",
    currency: "USD",
    inrSupported: true,
    plans: [
      {
        id: "professional",
        name: "Professional",
        pricingModel: "per_user",
        minSeats: 1,
        monthlyPricePerUser: 14,
        annualPricePerUser: 12,
        isFree: false,
        features: ["Up to 150 participants per call", "HD video with no meeting time caps", "Screen sharing & drawing tools", "Dial-in conference phone line"],
        limitations: "No cloud recording or automated transcripts"
      },
      {
        id: "business",
        name: "Business",
        pricingModel: "per_user",
        minSeats: 1,
        monthlyPricePerUser: 19,
        annualPricePerUser: 16,
        isFree: false,
        features: ["Up to 250 participants", "Unlimited cloud recording", "Smart meeting transcripts", "Note-taking and slide to PDF export"],
        limitations: "InRoom Link conference room hardware extra"
      }
    ],
    features: [
      "Generous 150 participant allowance on base paid tier",
      "Toll-free dial-in numbers in 50+ countries",
      "Commuter mode for bandwidth-saving mobile meetings",
      "Automated PDF slide summary generation"
    ],
    contractInfo: "Annual contract (~14% discount) or monthly pay-as-you-go.",
    hiddenCosts: [
      "Toll-free dial-in minutes billed on consumption at pay-as-you-go rates",
      "GoTo Webinar sold as separate product line starting at $49/mo"
    ]
  },

  // =========================================================================
  // 7. ANALYTICS
  // =========================================================================
  {
    id: "mixpanel",
    name: "Mixpanel",
    shortName: "Mixpanel",
    categoryId: "analytics",
    subTypes: ["Product analytics", "Web analytics"],
    badge: "Best for Product Event Funnels",
    logoText: "MP",
    accentColor: "#7856FF",
    description: "Self-serve product analytics for tracking user conversion funnels, retention cohorts, and feature engagement.",
    cheapestPaidPlanSummary: "$28/mo billed annually (up to 10K events/mo) or free up to 20M events",
    hasFreePlan: true,
    freePlanDetails: "Free plan includes up to 20 Million events per month and core reporting templates.",
    pricingSource: "Mixpanel Official Pricing",
    sourceUrl: "https://mixpanel.com/pricing/",
    verifiedDate: "2026-01-15",
    currency: "USD",
    inrSupported: true,
    plans: [
      {
        id: "free",
        name: "Free",
        pricingModel: "flat",
        minSeats: 1,
        baseFeeMonthly: 0,
        baseFeeAnnualPerMonth: 0,
        monthlyPricePerUser: 0,
        annualPricePerUser: 0,
        isFree: true,
        features: ["Up to 20 Million monthly events", "Unlimited user seats", "Core reports (Funnels, Retention, Insights)", "Data history 12 months"],
        limitations: "No cohort exporting or group analytics (B2B accounts)"
      },
      {
        id: "growth",
        name: "Growth",
        pricingModel: "flat",
        minSeats: 1,
        baseFeeMonthly: 35,
        baseFeeAnnualPerMonth: 28,
        monthlyPricePerUser: 0,
        annualPricePerUser: 0,
        isFree: false,
        features: ["Starts at 10k-100k events and scales smoothly", "Unlimited data retention duration", "Modeling cohorts & export to CRM", "Custom formulas and multi-property funnels"],
        limitations: "Event volume overages cost ~$0.0003/event"
      }
    ],
    features: [
      "Generous 20M events free tier enables early stage startups to run free",
      "Unlimited seats for all company employees without per-user charges",
      "Interactive retroactive funnel exploration",
      "Warehouse connector to Snowflake and BigQuery"
    ],
    contractInfo: "Self-serve pay-per-event-volume monthly or annual commitment with volume discounts.",
    hiddenCosts: [
      "Group Analytics add-on (tracking by company account): starts at $150/mo",
      "Data pipeline export to cloud warehouses: starts at $100/mo"
    ]
  },
  {
    id: "amplitude",
    name: "Amplitude Analytics",
    shortName: "Amplitude",
    categoryId: "analytics",
    subTypes: ["Product analytics"],
    badge: "Enterprise Product Analytics",
    logoText: "AM",
    accentColor: "#1D2B3A",
    description: "Digital analytics platform helping engineering and growth teams understand customer journey drop-offs and feature experiments.",
    cheapestPaidPlanSummary: "$49/mo billed annually (Plus plan) or free up to 50K MTUs",
    hasFreePlan: true,
    freePlanDetails: "Free Starter plan covers up to 50,000 Monthly Tracked Users (MTUs) and unlimited seats.",
    pricingSource: "Amplitude Pricing",
    sourceUrl: "https://amplitude.com/pricing",
    verifiedDate: "2026-01-15",
    currency: "USD",
    inrSupported: true,
    plans: [
      {
        id: "starter",
        name: "Starter (Free)",
        pricingModel: "flat",
        minSeats: 1,
        baseFeeMonthly: 0,
        baseFeeAnnualPerMonth: 0,
        monthlyPricePerUser: 0,
        annualPricePerUser: 0,
        isFree: true,
        features: ["Up to 50,000 Monthly Tracked Users (MTUs)", "Unlimited team seats", "Core funnel and retention analysis", "Collaboration notebooks"],
        limitations: "Limited behavioral cohort sync to ad networks"
      },
      {
        id: "plus",
        name: "Plus",
        pricingModel: "flat",
        minSeats: 1,
        baseFeeMonthly: 61,
        baseFeeAnnualPerMonth: 49,
        monthlyPricePerUser: 0,
        annualPricePerUser: 0,
        isFree: false,
        features: ["Custom event volume limits", "Sync cohorts with ad platforms and CRM", "Advanced behavioral cohorting", "Data schema management"],
        limitations: "A/B testing experimentation module requires Growth plan"
      }
    ],
    features: [
      "MTU-based pricing model gives predictable budgeting vs raw events",
      "Visual user pathfinder diagrams and drop-off flow analysis",
      "Root cause analysis highlights why users convert or churn",
      "Direct integration with segment, Braze, and HubSpot"
    ],
    contractInfo: "Monthly or annual subscription. Growth tiers require annual contract.",
    hiddenCosts: [
      "Amplitude Experimentation add-on: custom enterprise quote",
      "Session Replay add-on: billed by captured sessions"
    ]
  },
  {
    id: "power-bi",
    name: "Microsoft Power BI",
    shortName: "Power BI",
    categoryId: "analytics",
    subTypes: ["BI dashboards"],
    badge: "Most Cost-Effective Enterprise BI",
    logoText: "PB",
    accentColor: "#F2C811",
    description: "Microsoft's business analytics suite for connecting hundreds of SQL, Excel, and cloud data sources into interactive dashboards.",
    cheapestPaidPlanSummary: "$10/user/mo (Power BI Pro) or included in Microsoft 365 E5",
    hasFreePlan: true,
    freePlanDetails: "Power BI Desktop is 100% free for individual local report creation.",
    pricingSource: "Microsoft Power BI Pricing",
    sourceUrl: "https://powerbi.microsoft.com/en-us/pricing/",
    verifiedDate: "2026-01-15",
    currency: "USD",
    inrSupported: true,
    plans: [
      {
        id: "desktop-free",
        name: "Power BI Desktop",
        pricingModel: "per_user",
        minSeats: 1,
        monthlyPricePerUser: 0,
        annualPricePerUser: 0,
        isFree: true,
        features: ["Free authoring tool on Windows PC", "Connect to 100+ cloud and on-prem data sources", "DAX formula modeling", "Export to PDF and PowerPoint"],
        limitations: "Cannot share interactive reports securely without Pro license"
      },
      {
        id: "pro",
        name: "Power BI Pro",
        pricingModel: "per_user",
        minSeats: 1,
        monthlyPricePerUser: 10,
        annualPricePerUser: 10,
        isFree: false,
        features: ["Publish and share reports in cloud service", "10 GB storage per user", "Scheduled automated dataset refreshes (8/day)", "Mobile app access to reports"],
        limitations: "Both report authors and report viewers must have a Pro license"
      },
      {
        id: "premium-per-user",
        name: "Premium Per User (PPU)",
        pricingModel: "per_user",
        minSeats: 1,
        monthlyPricePerUser: 20,
        annualPricePerUser: 20,
        isFree: false,
        features: ["100 GB model size limit (vs 1 GB on Pro)", "48 scheduled dataset refreshes/day", "Paginated pixel-perfect financial reports", "Advanced AI (automl, text analytics)"],
        limitations: "PPU reports can only be consumed by other PPU licensed users"
      }
    ],
    features: [
      "Unbeatable $10/user price point compared to Tableau's $75/user",
      "Seamless DAX modeling familiar to Excel power users",
      "Native integration with Microsoft Azure Synapse and Fabric",
      "Direct embed into Microsoft Teams channels"
    ],
    contractInfo: "Annual commitment with monthly billing via Microsoft Admin Portal.",
    hiddenCosts: [
      "Both creators and viewers require $10 Pro licenses unless buying Capacity",
      "Power BI Fabric / Capacity starts at ~$4,995/month"
    ]
  },
  {
    id: "tableau",
    name: "Tableau (Salesforce)",
    shortName: "Tableau",
    categoryId: "analytics",
    subTypes: ["BI dashboards"],
    badge: "Gold Standard Data Visualizations",
    logoText: "TB",
    accentColor: "#E97627",
    description: "The premier data visualization platform for complex geospatial maps, statistical modeling, and executive storytelling.",
    cheapestPaidPlanSummary: "$75/user/mo billed annually (Creator) or $15/user/mo (Viewer)",
    hasFreePlan: true,
    freePlanDetails: "Tableau Public is free for publishing non-confidential public datasets.",
    pricingSource: "Tableau Pricing for Teams & Organizations",
    sourceUrl: "https://www.tableau.com/pricing/teams-orgs",
    verifiedDate: "2026-01-15",
    currency: "USD",
    inrSupported: true,
    plans: [
      {
        id: "creator",
        name: "Tableau Creator",
        pricingModel: "per_user",
        minSeats: 1,
        monthlyPricePerUser: 75,
        annualPricePerUser: 75,
        isFree: false,
        features: ["Tableau Desktop authoring suite", "Tableau Prep Builder for data cleaning", "Full report and dashboard creation rights", "Publish to Tableau Cloud/Server"],
        limitations: "Every team requires at least 1 Creator license"
      },
      {
        id: "explorer",
        name: "Tableau Explorer",
        pricingModel: "per_user",
        minSeats: 1,
        monthlyPricePerUser: 42,
        annualPricePerUser: 42,
        isFree: false,
        features: ["Self-serve web data exploration", "Build workbooks from published data sources", "Edit existing dashboards in browser", "Set data-driven email alerts"],
        limitations: "Cannot clean raw tables or connect to raw database credentials"
      },
      {
        id: "viewer",
        name: "Tableau Viewer",
        pricingModel: "per_user",
        minSeats: 1,
        monthlyPricePerUser: 15,
        annualPricePerUser: 15,
        isFree: false,
        features: ["View and interact with published dashboards", "Filter and drill into visual categories", "Download summary data tables", "Mobile app dashboard viewing"],
        limitations: "View only; cannot create or edit calculations"
      }
    ],
    features: [
      "Industry-leading visual grammar and aesthetic map projections",
      "Tableau Prep Builder simplifies complex multi-table joins",
      "Natural language queries via Ask Data",
      "Massive worldwide community with Tableau Public gallery"
    ],
    contractInfo: "Strict 1-year annual contract billed upfront. No monthly pay-as-you-go option.",
    hiddenCosts: [
      "Role licensing requires careful mix: 1 Creator ($75) + Explorers ($42) + Viewers ($15)",
      "Server hardware costs if hosting Tableau Server on-premise"
    ]
  },

  // =========================================================================
  // 8. REVIEWS & COMPARISONS
  // =========================================================================
  {
    id: "g2",
    name: "G2",
    shortName: "G2",
    categoryId: "reviews-comparisons",
    subTypes: ["Review sites", "Head-to-head", "How to read reviews"],
    badge: "Largest B2B Software Marketplace",
    logoText: "G2",
    accentColor: "#FF492C",
    description: "The world's largest B2B software review platform, featuring 2.5M+ peer reviews and proprietary Grid Quadrants.",
    cheapestPaidPlanSummary: "100% Free for buyers. Vendor marketing packages: $10,000-$35,000/year.",
    hasFreePlan: true,
    freePlanDetails: "100% free for software buyers to research and read verified user reviews.",
    pricingSource: "G2 Vendor Solutions",
    sourceUrl: "https://sell.g2.com/pricing",
    verifiedDate: "2026-01-15",
    currency: "USD",
    inrSupported: true,
    plans: [
      {
        id: "buyer-free",
        name: "Software Buyer Access",
        pricingModel: "flat",
        minSeats: 1,
        baseFeeMonthly: 0,
        baseFeeAnnualPerMonth: 0,
        monthlyPricePerUser: 0,
        annualPricePerUser: 0,
        isFree: true,
        features: ["Read 2.5M+ verified user reviews", "Compare side-by-side software grids", "Download category buyer guide PDFs", "Track software stack renewals"],
        limitations: "Free for all consumers"
      },
      {
        id: "vendor-profile",
        name: "Claimed Vendor Profile",
        pricingModel: "flat",
        minSeats: 1,
        baseFeeMonthly: 0,
        baseFeeAnnualPerMonth: 0,
        monthlyPricePerUser: 0,
        annualPricePerUser: 0,
        isFree: true,
        features: ["Claim basic product profile listing", "Collect organic user reviews", "Embed basic review badges", "Respond to customer reviews"],
        limitations: "Competitor ads show on your product page"
      }
    ],
    features: [
      "Proprietary Grid Quadrants (Leaders, High Performers, Contenders, Niche)",
      "LinkedIn authentication verifies real employee identity for reviews",
      "Head-to-head comparison pages with user satisfaction breakdown",
      "Buyer Intent data captures which companies research your competitors"
    ],
    contractInfo: "Free for software purchasers. Vendor marketing contracts are annual.",
    hiddenCosts: [
      "Vendor Buyer Intent packages: $10,000-$30,000/year",
      "Review collection campaigns often offer $25 Amazon gift cards per review"
    ]
  },
  {
    id: "capterra",
    name: "Capterra (Gartner Digital Markets)",
    shortName: "Capterra",
    categoryId: "reviews-comparisons",
    subTypes: ["Review sites", "How to read reviews"],
    badge: "Best Directory for SMB Tools",
    logoText: "CP",
    accentColor: "#0A2540",
    description: "Gartner-backed software directory helping small-to-midsize businesses discover software categories and read verified user ratings.",
    cheapestPaidPlanSummary: "100% Free for buyers. Vendors pay $2-$15 per click in PPC auctions.",
    hasFreePlan: true,
    freePlanDetails: "100% free for all software buyers. No account required.",
    pricingSource: "Capterra Gartner Digital Markets",
    sourceUrl: "https://www.capterra.com/vendors/",
    verifiedDate: "2026-01-15",
    currency: "USD",
    inrSupported: true,
    plans: [
      {
        id: "buyer-free",
        name: "Buyer Directory",
        pricingModel: "flat",
        minSeats: 1,
        baseFeeMonthly: 0,
        baseFeeAnnualPerMonth: 0,
        monthlyPricePerUser: 0,
        annualPricePerUser: 0,
        isFree: true,
        features: ["Search 1,000+ software categories", "Filter by platform, features, and pricing model", "Read verified buyer ratings", "Side-by-side comparison tables"],
        limitations: "Free for all consumers"
      }
    ],
    features: [
      "Shared listing network across Capterra, Software Advice, and GetApp",
      "Capterra Shortlist scores top products based on ratings and search popularity",
      "Clear pricing model tags (Free Trial, Freemium, Subscription, One-time)",
      "Gartner Digital Markets human verification on every published review"
    ],
    contractInfo: "Free for all users browsing or comparing software.",
    hiddenCosts: [
      "Vendors pay Pay-Per-Click bids ($2 to $15+ per qualified buyer click)",
      "Top placement on category pages is governed by bid auction"
    ]
  },
  {
    id: "trustradius",
    name: "TrustRadius",
    shortName: "TrustRadius",
    categoryId: "reviews-comparisons",
    subTypes: ["Review sites", "Head-to-head", "How to read reviews"],
    badge: "Most In-Depth Verified Reviews",
    logoText: "TR",
    accentColor: "#2B5876",
    description: "Enterprise software review platform famous for detailed, long-form reviews with pros, cons, and use-case analysis without vendor gating.",
    cheapestPaidPlanSummary: "100% Free for software buyers. Vendor packages from $12,000/year.",
    hasFreePlan: true,
    freePlanDetails: "100% free access to all long-form review reports.",
    pricingSource: "TrustRadius for Vendors",
    sourceUrl: "https://www.trustradius.com/vendor",
    verifiedDate: "2026-01-15",
    currency: "USD",
    inrSupported: true,
    plans: [
      {
        id: "buyer-free",
        name: "Buyer Research",
        pricingModel: "flat",
        minSeats: 1,
        baseFeeMonthly: 0,
        baseFeeAnnualPerMonth: 0,
        monthlyPricePerUser: 0,
        annualPricePerUser: 0,
        isFree: true,
        features: ["Access exhaustive multi-paragraph reviews", "Reviewer department and company size tags", "TrueScore unbiased rating algorithm", "No paywall for reading reports"],
        limitations: "Free for all consumers"
      }
    ],
    features: [
      "Zero vendor influence on review scores (TrueScore algorithm)",
      "Deep pros, cons, and ROI retrospective questions",
      "Explicit disclosure tags when gift card incentives were offered",
      "Integrates with LinkedIn Sales Navigator for buyer intelligence"
    ],
    contractInfo: "Free for software evaluators.",
    hiddenCosts: [
      "Vendor customer intent intelligence packages: $12,000-$25,000/year",
      "Syndicated review licensing for vendor websites"
    ]
  }
];

