import { ServiceDetail, CaseStudy, PortfolioItem, BlogPost, Testimonial } from "./types";

export const SERVICES_DATA: ServiceDetail[] = [
  {
    id: "seo",
    title: "Search Engine Optimization (SEO)",
    shortDesc: "Dominate search results, scale high-intent organic traffic, and convert organic visitors into enterprise buyers.",
    heroDesc: "Establish long-term market authority with a bespoke organic strategy. From technical optimization and local mapping to systemic content hubs, we build organic engines that deliver compound growth.",
    subcategories: ["Technical SEO & Audits", "Local SEO & GMB Authority", "On-Page Semantic Optimization", "Off-Page Link Acquisition", "Enterprise Content Hubs"],
    benefits: [
      { title: "Sustained Low-cost Leads", desc: "Build a reliable long-term pipeline that outlives immediate paid advertising campaigns." },
      { title: "Unchallenged Domain Authority", desc: "Outrank competitors for your industry's most valuable high-intent buying keywords." },
      { title: "Enhanced Brand Credibility", desc: "Organic top rankings instinctively establish premium brand recognition and authority." }
    ],
    process: [
      { step: 1, title: "Deep Crawl & Audit", desc: "Comprehensive technical analysis of site architecture, indexability, speed, and semantic gaps." },
      { step: 2, title: "Intent Keyword Mapping", desc: "Uncover transactional keyword opportunities that map directly to high-value user search behavior." },
      { step: 3, title: "On-Page Engineering", desc: "Enhancing HTML structure, schema microdata, metadata signals, and Core Web Vitals performance." },
      { step: 4, title: "Strategic Link Growth", desc: "Securing authoritative natural backlinks from top-tier publications in your niche." }
    ],
    deliverables: [
      "Bi-Weekly Keyword Progress Dashboard",
      "Comprehensive Core Web Vitals Code Optimizations",
      "High-Quality Relevant Link Profiling Report",
      "SEO Content Hub Strategy & Brief Files"
    ],
    pricingCTA: "Configure Custom SEO Roadmap"
  },
  {
    id: "ppc",
    title: "Pay-Per-Click Advertising (PPC)",
    shortDesc: "Maximize conversion volume and lower Cost Per Acquisition (CPA) on Google, Meta, LinkedIn, and YouTube.",
    heroDesc: "Precision digital ad campaign architecture backed by rigorous algorithmic bidding optimization, micro-target audiences, and high-converting creative structures.",
    subcategories: ["Google Search & Shopping Ads", "Meta (Facebook/Instagram) Acquisition", "B2B LinkedIn Lead Ads", "High-Impact YouTube Video Campaigns", "Programmatic Remarketing"],
    benefits: [
      { title: "Immediate Customer Acquisition", desc: "Skip the queue and position your brand directly in front of active buyers instantly." },
      { title: "Laser-Targeted Audiences", desc: "Target users by search intent, exact demographics, real-time interests, and custom firmographics." },
      { title: "Surgical Budget Velocity", desc: "Scale up spend instantly on top-performing campaigns and pause inefficient paths dynamically." }
    ],
    process: [
      { step: 1, title: "Funnel Matrix Mapping", desc: "Defining user pathways from impression to conversion value across multiple touchpoints." },
      { step: 2, title: "Bespoke Creative Lab", desc: "Writing ultra-compelling copy and crafting premium native-optimized interactive assets." },
      { step: 3, title: "Pixel & API Hardening", desc: "Deploying Conversions API for pristine attribution, data tracking, and bidding loop feedback." },
      { step: 4, title: "Alpha/Beta Multi-Splitting", desc: "Running constant algorithmic multi-variate tests on copy, assets, and lookalike targets." }
    ],
    deliverables: [
      "Custom Multi-Channel Campaign Architecture",
      "Weekly Attribution & Ad Spend Reports",
      "Dynamic Direct-Response Ad Creatives",
      "Advanced Audience Persona Framework Mockup"
    ],
    pricingCTA: "Claim $1,000 Ad Launch Consultation"
  },
  {
    id: "social-media-marketing",
    title: "Social Media Marketing",
    shortDesc: "Turn organic and paid social channels into highly engaged brand advocates and conversion systems.",
    heroDesc: "Modern multi-format storytelling across LinkedIn, Instagram, TikTok, and Twitter to build bulletproof culture, brand obsession, and native leads.",
    subcategories: ["Growth-focused Content Creation", "Platform-Specific Content Strategy", "Full Account Management", "Direct Response Advertising & Re-targeting", "Community Building & Cult Engagement"],
    benefits: [
      { title: "Virality Potential", desc: "Create cultural touchpoints that drive organic distribution and massive brand elevation." },
      { title: "Bespoke Brand Personality", desc: "Interact directly with your audience, turning random prospects into hyper-engaged advocates." },
      { title: "Native Leads & Sales", desc: "Utilize social checkout and in-platform native lead forms to bypass landing page friction." }
    ],
    process: [
      { step: 1, title: "Brand Identity Alignment", desc: "Nail down the ideal tone, dynamic voice, aesthetic systems, and content visual language." },
      { step: 2, title: "Weekly Content Pillars", desc: "Construct structured batch schedules for Reels, Carousel educational materials, and thought leadership." },
      { step: 3, title: "Proactive Engagement", desc: "Continuous micro-interactions and social listening to build strong industry reputation." },
      { step: 4, title: "Platform Amplification", desc: "Strategic organic syndication combined with native boost campaigns for maximum reach." }
    ],
    deliverables: [
      "Custom Visual Style & Narrative Guidelines",
      "Monthly Growth Analytics & Engagement Reports",
      "30-Day Content Scheduling Dashboard View",
      "Graphic and Short-form Video Source Files"
    ],
    pricingCTA: "Unlock Social Growth Assessment"
  },
  {
    id: "content-marketing",
    title: "Content Marketing",
    shortDesc: "Educate high-value prospects, dominate informational queries, and fuel customer acquisition maps.",
    heroDesc: "Bespoke content portfolios matching human expertise with technical SEO metrics to construct rich, authoritative guides that prospective customers seek.",
    subcategories: ["In-Depth Agency Blog Writing", "Premium Landing Page Copywriting", "Conversion Copy & Infographics", "Whitepapers & Gated Lead Magnets", "Brand Messaging Frameworks"],
    benefits: [
      { title: "Build Long-term Trust", desc: "Provide immense upfront value to establish your business as the default expert choice." },
      { title: "Social Sharing & Backlinks", desc: "Compelling guides naturally attract high-domain authority citations and organic distribution." },
      { title: "Dynamic Lead Nurturing", desc: "Equip your sales team with a multi-tiered repository of assets addressing customer friction." }
    ],
    process: [
      { step: 1, title: "Topic Cluster Definition", desc: "Mapping core categories to identify high-potential semantic search silos and clusters." },
      { step: 2, title: "Deep Domain Research", desc: "Interviewing company leaders to inject actual proprietary insights, preventing generic content output." },
      { step: 3, title: "SEO Semantic Engineering", desc: "Weave structured microdata, clear information architecture, and target queries naturally." },
      { step: 4, title: "Action-Oriented CTAs", desc: "Embedding high-relevancy triggers to convert passive readers to direct sales pipeline leads." }
    ],
    deliverables: [
      "Semantic Topic Map & Clustering Dashboard",
      "Four Ultra-High Quality Longform Pillar Guides",
      "Social Media Micro-Slices for Published Content",
      "Lead Magnet Asset Design Proposals"
    ],
    pricingCTA: "Accelerate Content Strategy Now"
  },
  {
    id: "email-marketing",
    title: "Email Marketing & Automation",
    shortDesc: "Re-engage cold traffic, automate checkout recoveries, and monetize existing direct databases.",
    heroDesc: "Hyper-segmented automated retention campaigns that convert passive subscribers into recurring high-lifetime-value promoters of your brand.",
    subcategories: ["Flows & Automated Customer Journeys", "Bespoke Promotional Campaigns", "Lead Nurturing Sequences & Sequences", "Attribution & A/B Testing Lab", "Pristine Deliverability Auditing"],
    benefits: [
      { title: "Zero Platform Ad Costs", desc: "Own your communication loop straight to an inbox without paying visual toll fees to Google or Meta." },
      { title: "Hyper-Personalization", desc: "Send exact customized messages triggered by custom behavioral database variables." },
      { title: "Significant ROI Multiplier", desc: "Nurturing existing customers routinely achieves the highest ROI efficiency in marketing." }
    ],
    process: [
      { step: 1, title: "Deliverability Restoration", desc: "Audit DNS settings, verify DMARC/SPF parameters, and clean inactive database contacts." },
      { step: 2, title: "Trigger-Based Architecture", desc: "Construct standard automated sequences: Welcome flow, abandoned cart flow, and post-purchase loops." },
      { step: 3, title: "Dynamic Copywriting", desc: "Formulate highly magnetic subject lines and text structures focusing on clear user benefit." },
      { step: 4, title: "Algorithmic Splitting", desc: "Continuously optimizing send timings, interactive templates, and subject copy configurations." }
    ],
    deliverables: [
      "Pruned Server Auditing & Deliverability Report",
      "Complete Structured Flow Architecture Maps",
      "Highly Converting Custom Subject-Line Matrix",
      "Performance Optimization & Click-attribution Logs"
    ],
    pricingCTA: "Claim Free Email Revenue Audit"
  },
  {
    id: "web-development",
    title: "Web Design & Development",
    shortDesc: "Stunning custom headless websites optimized for high conversion indices, dynamic speed, and luxury branding.",
    heroDesc: "Merging next-generation aesthetic glassmorphism designs with extreme mobile responsiveness and clean code structures built to generate sales pipeline results.",
    subcategories: ["Bespoke Brand Business Websites", "High-Velocity Target Landing Pages", "Fluid Headless E-commerce Solutions", "Custom WordPress Development", "Advanced UI/UX Interaction Maps"],
    benefits: [
      { title: "Sub-Second Load Velocities", desc: "Banish bounce rates with extremely optimized builds scoring 100 on Lighthouse tests." },
      { title: "Modern Design Authority", desc: "Instill absolute buying trust through glassmorphism, elegant typography, and stellar aesthetics." },
      { title: "Built and Tuned for Leads", desc: "Strategically placed conversion systems, dynamic tracking codes, and distraction-free paths." }
    ],
    process: [
      { step: 1, title: "Interaction UI Wireframing", desc: "Blueprint dynamic UX pathways and elegant structural elements before launching layout." },
      { step: 2, title: "Creative Branding Interface", desc: "Apply deep black themes, premium glowing mesh elements, and modern typography grids." },
      { step: 3, title: "High-Performance Build", desc: "Engineered in robust React, ensuring responsiveness, solid hydration, and optimized files." },
      { step: 4, title: "Tracking Integration", desc: "Connect standard analytics software, GTM, custom CRM inputs, and pixel modules flawlessly." }
    ],
    deliverables: [
      "High-Fidelity Interactive Wireframe Map",
      "Production-Ready Custom Front-End Codebase",
      "Standard Speed & Core Web Vital Audit Log",
      "Comprehensive CRM & Zapier Hook Documentation"
    ],
    pricingCTA: "Receive Interactive Prototype Plan"
  },
  {
    id: "video-marketing",
    title: "Video Marketing & Animation",
    shortDesc: "High-end Reels, Shorts, motion graphics, and corporate videos designed for immediate engagement.",
    heroDesc: "From custom storyboard design and cinematic filming to energetic, direct-response editing and 3D motion graphics—we tell stories that drive metric actions.",
    subcategories: ["Viral Instagram Reels & TikToks", "High-Conversion YouTube Shorts", "Corporate Explainer Videos", "Advanced 3D Motion Graphics", "Post-Production and VFX Grading"],
    benefits: [
      { title: "Immediate Visual Hook", desc: "Establish retention rate within the first 3 seconds using professional pattern-interrupted visuals." },
      { title: "Multi-Platform Scalability", desc: "Re-slice master files into highly consumable, multi-faceted short-form assets easily." },
      { title: "Unforgettable Product Explanations", desc: "Simplify complex tech architecture or SaaS applications into premium 3D animations." }
    ],
    process: [
      { step: 1, title: "Psychological Scriptwriting", desc: "Formulate compelling hooks, problem builders, solutions, and strict conversions CTAs." },
      { step: 2, title: "Dynamic Storyboarding", desc: "Pre-visualize frames, color maps, sound transitions, and text callout systems." },
      { step: 3, title: "Post-Production & Polish", desc: "Merge ultra-snappy frames, color grading, ambient audio layers, and modern captions." },
      { step: 4, title: "Attribution Tagging", desc: "Distribute assets and build tracking URLs to match direct attribution values." }
    ],
    deliverables: [
      "Premium Scripts & Interactive Storyboards",
      "Optimized High-Definition Video Renditions",
      "Modular Audio & SFX Assets Selection",
      "Platform-Specific Metadata Templates"
    ],
    pricingCTA: "Launch Elite Video Production"
  },
  {
    id: "branding",
    title: "Branding & Visual Authority",
    shortDesc: "Build bulletproof corporate identities, design stellar logos, and author cohesive visual guidelines.",
    heroDesc: "We craft enterprise visual systems that demand attention. Position your business as the undisputed category leader with high-end, iconic design assets.",
    subcategories: ["Bespoke Logo & Symbol Design", "Full Visual Identity Systems", "Premium Typography Selection", "Brand Guideline & Asset Portals", "Personal Execution Branding Packages"],
    benefits: [
      { title: "Immediate Premium Pricing", desc: "Stellar visual execution allows you to commoditize competitors and command luxury fees." },
      { title: "Corporate Cohesion", desc: "Equip your entire organization with unified templates, materials, and guidelines for unity." },
      { title: "Iconic Longevity", desc: "Establish an unforgettable brand presence that survives transient marketing styles." }
    ],
    process: [
      { step: 1, title: "Core Ethos Excavation", desc: "Identify key brand personality aspects, targeted demographics, and structural goals." },
      { step: 2, title: "Geometric Concept Design", desc: "Iterate hundreds of custom symbols, alignments, and high-impact logo structures." },
      { step: 3, title: "Aesthetic Color Mapping", desc: "Select emotional palettes (e.g. Deep Blacks, Cosmic Blues, Teal accents) to command presence." },
      { step: 4, title: "Ecosystem Deployment", desc: "Format assets into scalable vector standards and construct digital guideline portals." }
    ],
    deliverables: [
      "Master Vector Logo files & Permutations",
      "Complete Brand Guideline Asset Portal (PDF/Web)",
      "Premium Typography & Grid Documentation",
      "Ready-to-use Corporate Slide Deck & Stationery"
    ],
    pricingCTA: "Re-Brand Visual Asset Identity"
  },
  {
    id: "analytics",
    title: "Analytics, Tracking & Attribution",
    shortDesc: "Pristine multi-touch attribution, server-side tracking, and custom bi-weekly executive dashboards.",
    heroDesc: "Stop guessing. We install absolute precision tracking servers to link every single marketing dollar spent back to your actual pipeline revenue database.",
    subcategories: ["Google Analytics 4 Architecting", "Server-Side Tag Container Ops", "Meta Conversions API Sync", "Custom Dynamic Looker Studio BI", "Multi-Touch User Path Attribution"],
    benefits: [
      { title: "100% Attribution Visibility", desc: "Bypass iOS ad blockers and track user actions reliably using back-end server triggers." },
      { title: "Algorithmic Precision Bidding", desc: "Provide high-quality conversion datasets back to Ad algorithms to reduce costs automatically." },
      { title: "Unified Executive Reporting", desc: "Consolidate all ad channels, newsletters, and site data into one comprehensive panel." }
    ],
    process: [
      { step: 1, title: "Attribution Gap Mapping", desc: "Compare site actions to CRM records to locate lost analytics opportunities." },
      { step: 2, title: "Server Tag Container Setup", desc: "Configuring robust proxy servers to record customer milestones with extreme compliance." },
      { step: 3, title: "Custom BI Dashboarding", desc: "Connect raw SQL, GA4, Stripe, and platform APIs into responsive visualization suites." },
      { step: 4, title: "Weekly Calibration Loops", desc: "Review user pathways weekly and prune ineffective campaigns with data certainty." }
    ],
    deliverables: [
      "Attribution Improvement Map & Diagnosis",
      "Deployable Cloud Tag Container Settings",
      "Executive Looker Studio Dashboard Dashboard",
      "Revenue Integrity Sync Log & Ledger"
    ],
    pricingCTA: "Initiate Surgical Tracking Audit"
  },
  {
    id: "lead-generation",
    title: "Lead Generation & B2B Appointments",
    shortDesc: "Identify, source, qualify, and secure private high-value B2B client meetings with active decision makers.",
    heroDesc: "Bespoke cold outbound campaigns, LinkedIn authority systems, and automatic booking loops designed to schedule sales calls while you sleep.",
    subcategories: ["Prospect Persona Sourcing", "Cold Email Infrastructure Build", "LinkedIn Social Outbound Engines", "Automated Booking Loop Systems", "Lead Warmup & Qualification Systems"],
    benefits: [
      { title: "Direct Contact with Buyers", desc: "Bypass visual noise and hold physical and digital meetings with targeted decisions makers directly." },
      { title: "Scalable Outreach Campaigns", desc: "Send highly customized, deliverability-proven emails across thousands of secondary domains seamlessly." },
      { title: "Fully Automated Bookings", desc: "See qualified sales meetings appear dynamically on your Google or Outlook calendars." }
    ],
    process: [
      { step: 1, title: "Target Database Capture", desc: "Mine Apollo, Sales Navigator, and lists to extract target buyer records." },
      { step: 2, title: "Deliverability Insulation", desc: "Acquire secondary tracking domains, perform warmups, and configure DMARC values." },
      { step: 3, title: "Magnetic Copywriting", desc: "Draft direct value pre-propositions that prompt B2B executives to take notice instantly." },
      { step: 4, title: "Automated Rescheduling", desc: "Implement micro-funnels to warm cold prospects up before they speak to your sales reps." }
    ],
    deliverables: [
      "1,000 Verified Persona Target Database Leads",
      "Insulated Outbound Domain Infrastructure Setup",
      "Custom Multi-channel Copywriting Sequence scripts",
      "Weekly Bookmarked Qualified Calendly Appointments"
    ],
    pricingCTA: "Configure Cold Pipeline Strategy"
  }
];

export const CASE_STUDIES_DATA: CaseStudy[] = [
  {
    id: "case-1",
    client: "Aura Aesthetics Health Group",
    industry: "High-End Medical Spas",
    title: "Organic Conquest: Escalating Local High-Intent Lead Flow by +160%",
    before: "Under 45 low-quality leads, flatlining local organic reach, sluggish site velocity.",
    after: "512+ highly-qualified patient inquiries monthly, commanding organic map packs across 7 cities.",
    metrics: [
      { value: "500+", label: "Qualified Leads Generated" },
      { value: "160%", label: "Conversion Growth Index" },
      { value: "#1 Rank", label: "For 35 Industry Buying Intents" }
    ],
    challenge: "Aura Aesthetics was spending heavily on volatile social channels while ignoring highly profitable localized search categories. Their technical site structure was bloated, causing slow performance on mobile devices.",
    solution: "We deployed a complete site overhaul, accelerating loading speeds to 400ms. We then built out Local Topic Hubs targeting regional search keywords, and implemented customized schema metadata matching medical guidelines.",
    strategy: [
      "Accelerated Core Web Vitals to grade A performance across all indices.",
      "Produced 45 localized informational authority hubs covering dermatological procedures.",
      "Optimized and hyper-mapped Google Business Profiles across multiple clinic branches."
    ],
    execution: [
      "Implemented surgical programmatic schema markup to highlight doctor credentials.",
      "Secured 80 high-domain organic publisher backlinks targeting aesthetic treatments.",
      "Deployed automated direct capture forms mapped to their localized CRM systems."
    ],
    resultsText: "Within 90 days, organic keyword placements expanded threefold, establishing Aura as the absolute local authority, driving patient acquisition costs down significantly.",
    chartData: [
      { label: "M1", current: 50, previous: 45 },
      { label: "M2", current: 120, previous: 48 },
      { label: "M3", current: 245, previous: 42 },
      { label: "M4", current: 390, previous: 51 },
      { label: "M5", current: 512, previous: 44 }
    ]
  },
  {
    id: "case-2",
    client: "NovaSaaS Pro Inc.",
    industry: "Enterprise AI Workflow Tooling",
    title: "Precision PPC: Truncating Ad Spend Demands while Slicing CPA by 38%",
    before: "Exorbitant cost per demo booked ($180 CPA), high unqualified user signups.",
    after: "$111 CPA, with demo qualification rates boosting from 22% to an outstanding 70%.",
    metrics: [
      { value: "-38%", label: "Cost Per Acquisition (CPA)" },
      { value: "+210%", label: "Sales Pipeline Velocity" },
      { value: "5.4x", label: "Ad Spend Managed Efficiency (ROAS)" }
    ],
    challenge: "NovaSaaS Pro was managing complex, broad PPC campaigns that attracted low-intent search traffic, wasting critical venture capital on unprofitable Google search queries.",
    solution: "We rebuilt their tracking infrastructure using Meta Conversions API and Google Server-Side tag manager. We then narrowed targeting to specific B2B sectors, using predictive algorithmic bidding tailored for qualified buyers.",
    strategy: [
      "Re-engineered attribution modeling to target accounts booking real sales calls.",
      "Wrote high-impact direct-response ad copy using custom graphics to replace stock media.",
      "Deployed advanced B2B LinkedIn Lead Gen sequences targeting key operations teams."
    ],
    execution: [
      "Programmed server-to-server connection to feed lead-qualification values back to Facebook.",
      "Implemented surgical search modifiers to filter out generic consumer search intents.",
      "Engineered automated conversion landing pages tailored for specific enterprise vertical markets."
    ],
    resultsText: "In under 60 days, NovaSaaS stabilized customer acquisition dynamics, resulting in record-high demo acquisition efficiency with significantly higher sales conversion rates.",
    chartData: [
      { label: "M1", current: 180, previous: 185 },
      { label: "M2", current: 154, previous: 178 },
      { label: "M3", current: 132, previous: 191 },
      { label: "M4", current: 118, previous: 184 },
      { label: "M5", current: 111, previous: 179 }
    ]
  },
  {
    id: "case-3",
    client: "Velo Bikes Co.",
    industry: "Direct-to-Consumer Luxury E-Mobility",
    title: "Organic Overdrive: Achieving +220% Traffic Scaling with Custom Headless Web UI",
    before: "Suggish template eCommerce storefront, high checkout exit indices, stagnant search keywords.",
    after: "+220% Organic Search Impressions, alongside 2.4% boost in e-commerce purchase completion indexes.",
    metrics: [
      { value: "220%", label: "Organic Traffic Growth" },
      { value: "+180%", label: "Session Duration Scaling" },
      { value: "3.8%", label: "Overall Sales Conversion Index" }
    ],
    challenge: "Velo Bikes offered stunning e-mobility products, but their Shopify template platform was slow, uninspired, and failed to communicate the company's high-end engineering.",
    solution: "We designed a custom React storefront powered by super-fast dynamic caching. We integrated high-impact interactive video cards alongside technical search engine optimization content clusters.",
    strategy: [
      "Migrated bloated Shopify themes into a supercharged React static/headless build.",
      "Created highly aesthetic 3D-styled scroll interactions for responsive product education.",
      "Published detailed urban mobility keyword hubs to harvest informative searches."
    ],
    execution: [
      "Configured global performance delivery through CDN channels to bring load time under 300ms.",
      "Implemented a simplified single-screen Checkout System to remove buying friction.",
      "Integrated precise Google Tag Manager event tracking across thousands of product views."
    ],
    resultsText: "Velo Bikes scaled its transactional presence instantly, generating significant organic search ranking gains and scaling revenues to record heights.",
    chartData: [
      { label: "M1", current: 12000, previous: 11500 },
      { label: "M2", current: 18500, previous: 11800 },
      { label: "M3", current: 26000, previous: 12100 },
      { label: "M4", current: 33000, previous: 12400 },
      { label: "M5", current: 39600, previous: 12100 }
    ]
  }
];

export const PORTFOLIO_DATA: PortfolioItem[] = [
  {
    id: "p1",
    title: "Aura Premium Wellness Platform",
    category: "Websites",
    image: "/src/assets/images/analytics_dashboard_1780337067524.png",
    client: "Aura Aesthetics",
    description: "Multi-location responsive clinic locator and patient booking system utilizing glassmorphic UI card designs.",
    tag: "Next-gen React Headless Web Portal",
    results: "390ms loading speeds, +160% booking conversion growth"
  },
  {
    id: "p2",
    title: "Volta Electric Launch Identity",
    category: "Branding",
    image: "/src/assets/images/electric_brand_1780337641008.png",
    client: "Volta Automotive",
    description: "Complete visual redesign, vector symbol crafting, brand philosophy outlines, and typography specs.",
    tag: "High-End Corporate Brand Strategy",
    results: "Featured on Behance Design Spotlight, premium brand positioning"
  },
  {
    id: "p3",
    title: "Scribe SaaS Scaling Campaign",
    category: "Advertising",
    image: "/src/assets/images/saas_growth_1780337668080.png",
    client: "Scribe AI Workflow",
    description: "Algorithmic B2B retargeting search and LinkedIn ad strategy with premium direct-response asset creations.",
    tag: "Multi-channel PPC Acquisition Funnel",
    results: "Reduced average demo acquisition CPA by 38% globally"
  },
  {
    id: "p4",
    title: "Apex Fitness Brand Build",
    category: "Social Media",
    image: "https://images.unsplash.com/photo-1511512578047-dfb367046420?q=80&w=800&auto=format&fit=crop",
    client: "Apex Athleisure",
    description: "Constructing daily Reels/Shorts assets schedules, narrative templates, and growth content systems.",
    tag: "Organic & Paid Social Growth",
    results: "Scaled combined Instagram audience by +84,000 followers in 6 months"
  },
  {
    id: "p5",
    title: "Urban E-Mobility 3D Storytelling",
    category: "Video Production",
    image: "https://images.unsplash.com/photo-1517694712202-14dd9538aa97?q=80&w=800&auto=format&fit=crop",
    client: "Velo Bikes Co.",
    description: "Storyboarding, physical high-end video recording, vector 3D camera sweeps, and motion-tracked graphics.",
    tag: "Cinematic Product Video Explainer",
    results: "Accumulated 1.4M views across YouTube, driving +220% referral traffic"
  },
  {
    id: "p6",
    title: "Apex Headless Storefront",
    category: "Websites",
    image: "https://images.unsplash.com/photo-1522542550221-31fd19575a2d?q=80&w=800&auto=format&fit=crop",
    client: "Apex Ltd",
    description: "Headless Shopify commerce interface built with superfast responsive grid models for seamless shopping experiences.",
    tag: "Stunning Headless E-commerce Application",
    results: "Reduced cart exit index by 42%, boosting checkout indices by 2.4%"
  }
];

export const BLOG_DATA: BlogPost[] = [
  {
    id: "b1",
    title: "AI-Powered B2B Marketing: Scaling Pipeline Velocity in 2026",
    excerpt: "Discover how top-tier B2B enterprises leverage AI tools to identify prospective buy groups, automate personalized outbound plays, and scale conversion predictability.",
    category: "AI Marketing",
    author: {
      name: "Kabir Mehta",
      role: "Lead Performance Strategist",
      avatar: "https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?q=80&w=150&auto=format&fit=crop"
    },
    date: "May 24, 2026",
    readTime: "7 min read",
    featured: true,
    content: `## The Collision of Artificial Intelligence and Enterprise Scale B2B

In 2026, general cold email strategies and template-driven advertising systems are no longer viable. Buyers are overwhelmed with visual clutter, leading to low response rates. To capture attention, brands must move from manual execution to automated, highly targeted systems.

### 1. Unified Sourcing and Siting

First-party data collection has shifted. By linking customer footprints with predictive models, brands can identify exactly which accounts are researching topics related to their services:

- **Signal Extraction**: Monitoring when decision-makers read industry journals rather than waiting for direct contact.
- **Micro-Identity Profiles**: Segmenting targets by actual business needs instead of basic location tags.

### 2. Algorithmic Conversational Flow

Once identified, outbound campaigns are constructed natively for target audiences:

\`\`\`ts
// High-performance B2B prospecting sequence pipeline
const pipeline = {
  stage1: "Pruned Outreach Insight Outlines",
  stage2: "Personalized Gemini-powered Context Mapping",
  stage3: "Interactive Video-supported Sales Pitch",
  stage4: "Automated Rescheduling Follow-up Log"
};
\`\`\`

Dynamic personalization involves tailoring email copy to reference a brand's actual tech challenges, ensuring high relevancy.

### 3. Immediate Live Attribution Loops

To optimize spend, ensure conversion outcomes are parsed directly back to analytical tag managers, allowing machine learning ad systems to auto-calibrate and maximize ROI.`
  },
  {
    id: "b2",
    title: "Demystifying GA4 Server-Side Tagging & attribution systems",
    excerpt: "Traditional cookies are fading. Learn how setting up a container proxy server bypasses ad block systems and records pristine multi-touch attribution.",
    category: "SEO",
    author: {
      name: "Tanya Sharma",
      role: "Lead Analytics Architect",
      avatar: "https://images.unsplash.com/photo-1494790108377-be9c29b29330?q=80&w=150&auto=format&fit=crop"
    },
    date: "April 18, 2026",
    readTime: "11 min read",
    content: `## The Era of Post-Cookie Analytics Compliance

The modern marketing landscape requires robust server-side measurement solutions. Standard tracking pixels are increasingly blocked, leading to attribution gaps.

### Why Server-Side Execution Wins:

1. **Undisputed Attribution Integrity**: Keep event measurements accurate by proxying actions from your own sub-domains.
2. **Reduced Page Weight**: Remove heavy external tracking scripts on the client, improving page loading speeds.
3. **Pristine Data Cleanliness**: Filter out spam, bots, and faulty metrics before feeding values to looker reporting suites.

Setting up server-side analytics creates a clean, compliant data layer that helps advertising algorithms target the most high-value audiences.`
  },
  {
    id: "b3",
    title: "The 3-Second Rule: Direct-Response Short-Form Video frameworks",
    excerpt: "Analyze the psychological storytelling patterns involved in holding attention, preventing scroll bypasses, and driving mobile lead conversions.",
    category: "Social Media",
    author: {
      name: "Aman Sen",
      role: "Director of Motion & VFX",
      avatar: "https://images.unsplash.com/photo-1500648767791-00dcc994a43e?q=80&w=150&auto=format&fit=crop"
    },
    date: "May 09, 2026",
    readTime: "5 min read",
    content: `## Mastering Attention in Short-Form Video

With consumer attention spans shortening, short-form video requires structured, high-energy editing patterns. To convert scrolling into engagement, campaigns need three critical elements:

- **The Visual Hook (0-3s)**: Interrupt user reading patterns within the first 180 frames using high-impact visual contrasts or bold opening questions.
- **The Core Tension (3-30s)**: Build logical stakes and introduce the main challenge in a relatable, highly consumable format.
- **The Clear CTA (30-40s)**: Conclude with a direct call to action, offering a simple next step for interested viewers.`
  }
];

export const TESTIMONIALS_DATA: Testimonial[] = [
  {
    id: "t1",
    name: "Dr. Aditya Singhal",
    company: "Aura Aesthetics Health Group",
    role: "MD & Executive Director",
    rating: 5,
    review: "AimNexora completely transformed our local organic reach. In 90 days, our medical clinics went from low-quality local reach to ranking #1 for critical treatments across 7 regional hubs. Our client intake increased by 160% with zero ad spend adjustments.",
    image: "https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?q=80&w=150&auto=format&fit=crop"
  },
  {
    id: "t2",
    name: "Samantha Vance",
    company: "NovaSaaS Pro Inc.",
    role: "Chief Marketing Officer",
    rating: 5,
    review: "Managing B2B PPC is incredibly complex, but AimNexora's data-first approach and Conversions API setup reduced our customer acquisition costs (CPA) by 38% in weeks. Their live analytical dashboard gives us complete, transparent attribution data.",
    image: "https://images.unsplash.com/photo-1580489944761-15a19d654956?q=80&w=150&auto=format&fit=crop"
  },
  {
    id: "t3",
    name: "Marcus Velo",
    company: "Velo Bikes Co.",
    role: "Founder & Creative Innovator",
    rating: 5,
    review: "Their custom headless React website design completely sets us apart from generic eCommerce brands. Our mobile site speed went from lagging to sub-300ms, and our traffic scaled by 220% organically within 4 months of launch.",
    image: "https://images.unsplash.com/photo-1519085360753-af0119f7cbe7?q=80&w=150&auto=format&fit=crop"
  }
];

export const GROWTH_FRAMEWORK_STEPS = [
  {
    step: "01",
    title: "Discovery Call & Business Extraction",
    desc: "A 45-minute tactical consultation to identify current pipeline gaps, analyze target demographics, and define conversion metrics."
  },
  {
    step: "02",
    title: "Surgical Competitor Analysis",
    desc: "We analyze competitor ad strategies, scrape keyword search categories, and identify untapped organic market opportunities."
  },
  {
    step: "03",
    title: "ROI-Focused Roadmap Plan",
    desc: "We design a custom multi-channel growth plan with clear budget allocations, creative wireframes, and defined KPI metrics."
  },
  {
    step: "04",
    title: "Campaign Execution & Setup",
    desc: "We deploy fast React landing pages, launch server-side tracking containers, and release high-impact creative campaigns across target platforms."
  },
  {
    step: "05",
    title: "Continuous Testing & BI Audits",
    desc: "We run ongoing A/B tests on creative copy and landing pages, providing live Looker Studio performance dashboards for complete attribution visibility."
  }
];

export const AGENCY_JOURNEY_TIMELINE = [
  {
    year: "2022",
    title: "The Blueprint",
    desc: "AimNexora was founded by three senior ad heads. Our focus: absolute attribution visibility and data-driven client scale."
  },
  {
    year: "2023",
    title: "Data Integrity Milestone",
    desc: "We automated custom headless React marketing portals, achieving sub-400ms loading speeds that outperformed slow web templates."
  },
  {
    year: "2024",
    title: "Global Scale & $10M Managed",
    desc: "Expanded into high-converting B2B lead generation, B2B appointment setting, and advanced programmatic retargeting funnels."
  },
  {
    year: "2025",
    title: "Enterprise Brand Redefinition",
    desc: "Built custom AI-powered marketing nodes and server-side Conversions API systems, significantly reducing ad waste for clients."
  },
  {
    year: "2026",
    title: "The Nexora Standard",
    desc: "Ranked as a premier boutique enterprise digital agency, guiding premium global direct-to-consumer and business clients."
  }
];

export const AGENCY_CORE_VALUES = [
  {
    title: "Data and Truth Over Hype",
    desc: "We track every marketing dollar spent to actual pipeline sales. No inflated vanity metrics or vague reach forecasts."
  },
  {
    title: "Luxury Design & Interaction",
    desc: "Your brand is a premium asset. We deliver high-end, custom-built digital experiences that command industry attention."
  },
  {
    title: "Advanced AI Optimization",
    desc: "We integrate custom AI-guided models to improve audience targeting, personalize outreach, and optimize ad metrics."
  },
  {
    title: "Absolute Transparency",
    desc: "Our clients have 24/7 access to live CRM connections, ad spends, campaign progress, and pipeline metrics."
  },
  {
    title: "ROI-Focused Growth Strategy",
    desc: "We optimize for actual revenue margins and long-term scaling, not just short-term traffic spikes."
  },
  {
    title: "Surgical Speed Execution",
    desc: "Fast digital adaptation wins. We deploy landing pages and campaigns quickly to capture market trends."
  }
];

export const LEADERSHIP_PROFILES = [
  {
    name: "Aman Mathur",
    role: "Founder & Chief Growth Officer",
    avatar: "/src/assets/images/executive_man_1780337029708.png",
    bio: "Ex-Google enterprise ad lead. Over 12 years managing high-performance B2B pipelines and global ad campaigns.",
    specialty: "High-Immediacy Attributions, Scale Strategies"
  },
  {
    name: "Kiara Advani",
    role: "Head of Brand Design & Creative",
    avatar: "/src/assets/images/creative_woman_1780337048489.png",
    bio: "Award-winning visual designer specializing in glassmorphism, luxury brand interfaces, and high-fidelity video sets.",
    specialty: "Responsive Web UI/UX grids, Vector geometry"
  },
  {
    name: "Kabir Mehta",
    role: "Director of AI Optimization Labs",
    avatar: "https://images.unsplash.com/photo-1519085360753-af0119f7cbe7?q=80&w=200&auto=format&fit=crop",
    bio: "AI researcher focusing on machine learning engines for personalized outreach and automated bidding models.",
    specialty: "Gemini Orchestration, Deep Segment Siting"
  }
];
