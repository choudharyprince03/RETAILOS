export type OutcomeKey = 'rev' | 'margin' | 'cost' | 'speed' | 'cx' | 'inv' | 'risk' | 'comp';

export type DomainKey =
  | 'merch'
  | 'lifecycle'
  | 'content'
  | 'marketplace'
  | 'pricing'
  | 'storeops'
  | 'supply'
  | 'cx'
  | 'intel'
  | 'ai';

export type StageKey =
  | 'discover'
  | 'plan'
  | 'source'
  | 'merchandise'
  | 'catalog'
  | 'marketplace'
  | 'store'
  | 'customer'
  | 'returns';

export type BadgeKey = 'available' | 'pilot' | 'early' | 'soon' | 'innov';

export type RoleKey = 'ceo' | 'cdo' | 'cmo' | 'ecom' | 'marketplace' | 'ops' | 'marketing';

export type ProofKey = 'moar' | 'practitioner' | 'partner' | 'illustrative';

export interface CaseStudy {
  illustrative?: boolean;
  source: string;
  industry: string;
  problem: string;
  solution: string;
  outcome: string;
  timeline: string;
  tech: string[];
  impact: [string, string][];
  proof?: ProofKey;
  qual?: boolean;
}

export interface BeforeAfterScenario {
  id: string;
  label: string;
  category: string;
  beforeTitle: string;
  beforeSubtitle: string;
  beforePoints: string[];
  beforeMetrics: { label: string; value: string; status?: 'bad' | 'warn' | 'neutral' }[];
  afterTitle: string;
  afterSubtitle: string;
  afterPoints: string[];
  afterMetrics: { label: string; value: string; status?: 'good' | 'cyan' }[];
  visualType: 'imagery' | 'catalog' | 'planogram' | 'geo' | 'ar' | 'lifecycle';
  visualData?: Record<string, unknown>;
}

export interface Solution {
  id: string;
  name: string;
  domain: DomainKey;
  badge: BadgeKey;
  stages: StageKey[];
  outcomes: OutcomeKey[];
  ai: boolean;
  source: 'moar' | 'partner';
  time: string;
  tech: string[];
  demo?: string;
  related: string[];
  poweredBy?: string;
  challenge: string;
  capability: string;
  outcome: string;
  caps: string[];
  cs?: CaseStudy;
  // v9 Accuracy Layer computed fields
  exp: string;
  head: string;
  illus?: boolean;
  // PRD Phase 1 extensions
  prdAddition?: boolean;
  priorityShowcase?: boolean;
  visualScenarios?: BeforeAfterScenario[];
}

export const OUT: Record<OutcomeKey, { l: string; desc: string }> = {
  rev: { l: 'Revenue Growth', desc: 'Top-line conversion, basket size, and store/channel expansion.' },
  margin: { l: 'Margin Improvement', desc: 'Protected gross margin through localized pricing and lower markdowns.' },
  cost: { l: 'Cost Reduction', desc: 'Reduced studio, labor, and coordination overhead across operations.' },
  speed: { l: 'Speed to Market', desc: 'Faster SKU onboarding, listing creation, and brief-to-shelf timelines.' },
  cx: { l: 'Customer Experience', desc: 'Higher shopper confidence, guided discovery, and richer product pages.' },
  inv: { l: 'Inventory Optimization', desc: 'Better sell-through, lower overstock, and earlier demand-shift detection.' },
  risk: { l: 'Risk Reduction', desc: 'Fewer site-selection misses, vendor delays, and listing takedowns.' },
  comp: { l: 'Compliance', desc: 'Automated brand, channel, and regional claim governance before publish.' },
};

export const DOMAINS: Record<DomainKey, string> = {
  merch: 'Merchandising & Planning',
  lifecycle: 'Product Lifecycle',
  content: 'Catalog & Content',
  marketplace: 'Marketplace Operations',
  pricing: 'Pricing & Promotions',
  storeops: 'Store Operations',
  supply: 'Supply Chain',
  cx: 'Customer Experience',
  intel: 'Retail Intelligence',
  ai: 'AI & Automation',
};

export const DOMAIN_ORDER: DomainKey[] = [
  'merch',
  'lifecycle',
  'content',
  'marketplace',
  'pricing',
  'storeops',
  'supply',
  'cx',
  'intel',
  'ai',
];

export const FUTURE: string[] = [
  'Loss Prevention',
  'Clienteling',
  'Sustainability & ESG',
  'Workforce Enablement',
  'Finance & Controllership',
  'Last-Mile & Fulfilment',
];

export const STAGES: { key: StageKey; num: string; label: string; context: string; operatorQuestion: string }[] = [
  {
    key: 'discover',
    num: '01',
    label: 'Discover',
    context: 'Market scanning, catchment scoring, competitor mapping, and early customer sentiment signals.',
    operatorQuestion: 'Where is demand emerging and which micro-markets or categories should we enter next?',
  },
  {
    key: 'plan',
    num: '02',
    label: 'Plan',
    context: 'Assortment architecture, space & planogram planning, signal-fused demand forecasting, and site planning.',
    operatorQuestion: 'What should we buy, how much should we allocate, and how should space be structured?',
  },
  {
    key: 'source',
    num: '03',
    label: 'Source',
    context: 'End-to-end product lifecycle coordination, sampling oversight, vendor onboarding, SLAs, and QC.',
    operatorQuestion: 'How do we move from design brief to delivered goods in 22 predictable weeks?',
  },
  {
    key: 'merchandise',
    num: '04',
    label: 'Merchandise',
    context: 'Line architecture, localized store-SKU pricing, promotion depth, and shelf planogram execution.',
    operatorQuestion: 'How do we price, promote, and present ranges to maximize full-price sell-through?',
  },
  {
    key: 'catalog',
    num: '05',
    label: 'Catalog',
    context: 'AI product imagery, catalog intelligence, PDP SEO enrichment, digital asset QA, and compliance.',
    operatorQuestion: 'How do we turn raw supplier inputs into compliant, high-converting product pages in days?',
  },
  {
    key: 'marketplace',
    num: '06',
    label: 'Marketplace',
    context: 'Multi-channel item setup, bulk publishing, listing optimization, and promo intelligence across Amazon, Shopify, and DTC.',
    operatorQuestion: 'How do we syndicate and optimize millions of listings across channels without defects?',
  },
  {
    key: 'store',
    num: '07',
    label: 'Store',
    context: 'Store observability, daily manager action feeds, live aisle KPIs, planogram compliance, and demand-based staffing.',
    operatorQuestion: 'What is the single prioritized action list for each store manager on today’s shift?',
  },
  {
    key: 'customer',
    num: '08',
    label: 'Customer',
    context: 'AR virtual try-on, 3D immersive product experiences, conversational shopping assistance, and review mining.',
    operatorQuestion: 'How do we help shoppers visualize products, decide with confidence, and convert?',
  },
  {
    key: 'returns',
    num: '09',
    label: 'Returns',
    context: 'Return root-cause detection by SKU, size/fit, and channel to protect margin and feed back into PDP & sizing.',
    operatorQuestion: 'Why are specific SKUs coming back, and what upstream fix stops the margin leak?',
  },
];

export const BADGES: Record<BadgeKey, string> = {
  available: 'Available',
  pilot: 'Client Pilot',
  early: 'Early Access',
  soon: 'Coming Soon',
  innov: 'Innovation',
};

export const MAT: Record<BadgeKey, number> = {
  available: 0,
  pilot: 1,
  early: 2,
  soon: 3,
  innov: 4,
};

export const ROLES: [RoleKey, string][] = [
  ['ceo', 'CEO'],
  ['cdo', 'Chief Digital Officer'],
  ['cmo', 'Chief Merchandising Officer'],
  ['ecom', 'Head of Ecommerce'],
  ['marketplace', 'Marketplace'],
  ['ops', 'Operations'],
  ['marketing', 'Marketing'],
];

export const ROLE_RECS: Record<RoleKey, string[]> = {
  ceo: ['catchment', 'pricing_promo', 'demand_intel', 'store_obs', 'catalog_ai', 'geo_intel'],
  cdo: ['catalog_ai', 'ai_catalog_intel', 'ai_product_imagery', 'copilot', 'knowledge_agent', 'ar_tryon', 'store_obs'],
  cmo: ['assortment', 'space_planning', 'pricing_promo', 'demand_intel', 'catalog_ai', 'review_sentiment'],
  ecom: ['catalog_ai', 'ai_product_imagery', 'ai_catalog_intel', 'pdp', 'marketplace_ops', 'ar_tryon', 'shopping_assistant'],
  marketplace: ['marketplace_ops', 'pdp', 'ai_catalog_intel', 'asset_qa', 'catalog_ai', 'content_compliance'],
  ops: ['plm', 'vendor_collab', 'space_planning', 'store_obs', 'store_perf', 'workforce', 'returns_intel'],
  marketing: ['ai_product_imagery', 'ar_tryon', 'immersive_px', 'review_sentiment', 'pricing_promo', 'shopping_assistant'],
};

export const EXP: Record<string, string> = {
  catalog_ai: 'Guided Walkthrough',
  pdp: 'Guided Walkthrough',
  marketplace_ops: 'Pilot Ready',
  asset_qa: 'Guided Walkthrough',
  content_compliance: 'Guided Walkthrough',
  plm: 'Pilot Ready',
  vendor_collab: 'Guided Walkthrough',
  assortment: 'Illustrative Concept',
  pricing_promo: 'Illustrative Concept',
  store_obs: 'Illustrative Concept',
  store_perf: 'Pilot Ready',
  workforce: 'Illustrative Concept',
  returns_intel: 'Illustrative Concept',
  ar_tryon: 'Illustrative Concept',
  immersive_px: 'Illustrative Concept',
  shopping_assistant: 'Illustrative Concept',
  geo_intel: 'Illustrative Concept',
  catchment: 'Illustrative Concept',
  competitor_map: 'Illustrative Concept',
  demand_intel: 'Pilot Ready',
  review_sentiment: 'Pilot Ready',
  copilot: 'Guided Walkthrough',
  knowledge_agent: 'Co-creation Opportunity',
  // 3 PRD-added capabilities
  ai_catalog_intel: 'Guided Walkthrough',
  space_planning: 'Illustrative Concept',
  ai_product_imagery: 'Guided Walkthrough',
};

export const HEAD: Record<string, string> = {
  catalog_ai: 'Cut product-content cost by up to 90%',
  pdp: 'Product pages that rank and convert',
  marketplace_ops: 'Go live across marketplaces, faster',
  asset_qa: 'Every image on-brand and compliant',
  content_compliance: 'Catch compliance risks before they publish',
  plm: 'Design brief to delivered goods, one accountable thread',
  vendor_collab: 'Take factory queries off your HQ team',
  assortment: 'Tighter ranges, less markdown',
  pricing_promo: 'Protect margin with sharper local pricing',
  store_obs: 'One clear daily action list per store',
  store_perf: 'Store performance, live to the aisle',
  workforce: 'Staffing matched to real demand',
  returns_intel: 'Find what drives returns, and cut it',
  ar_tryon: 'Let shoppers see it before they buy',
  immersive_px: 'Immersive product pages that sell',
  shopping_assistant: 'Guide shoppers to the right product',
  geo_intel: 'Expansion on a live map of every place',
  catchment: 'Score every micro-market before you commit',
  competitor_map: 'See competitor moves in every catchment',
  demand_intel: 'Forecast on real-world signals, not just history',
  review_sentiment: 'Catch demand shifts in reviews and social',
  copilot: 'One place for teams to ask and act',
  knowledge_agent: 'Your retail know-how, one question away',
  // 3 PRD-added capabilities
  ai_catalog_intel: 'Turn raw supplier sheets into enriched, high-converting catalogs',
  space_planning: 'Optimize shelf space and planograms for every store cluster',
  ai_product_imagery: 'Generate studio-grade on-model & lifestyle imagery from one packshot',
};

export const ILLUS_FORCE = new Set(['catalog_ai', 'ai_product_imagery', 'space_planning', 'ai_catalog_intel']);

export const PROOF_CASE: Record<string, ProofKey> = {
  catalog_ai: 'moar',
  plm: 'moar',
  pricing_promo: 'partner',
  store_obs: 'partner',
  catchment: 'partner',
  geo_intel: 'partner',
  demand_intel: 'partner',
  ai_catalog_intel: 'moar',
  space_planning: 'illustrative',
  ai_product_imagery: 'moar',
};

export const CASE_QUAL = new Set([
  'catalog_ai',
  'pricing_promo',
  'store_obs',
  'catchment',
  'geo_intel',
  'demand_intel',
  'ai_catalog_intel',
  'space_planning',
  'ai_product_imagery',
]);

export const BUILD_LABEL = (s: { source: 'moar' | 'partner' }) =>
  s.source === 'partner' ? 'Partner-enabled' : 'MOAR-built';

export const PROOF_LABEL: Record<ProofKey, string> = {
  moar: 'MOAR-delivered example',
  practitioner: 'Experience of MOAR practitioners',
  partner: 'Partner-delivered example',
  illustrative: 'Illustrative use case',
};

export const QUALIFIER =
  'Illustrative outcome. Actual results depend on scope, data quality, operating environment and adoption.';

export const ENQ_LABEL: Record<string, string> = {
  demo: 'Product demo',
  pilot: 'Explore a pilot',
  usecase: 'Discuss the use case',
  early: 'Discuss early access',
  partner: 'Meet the solution team',
  cocreate: 'Co-create with MOAR',
  workshop: 'Book a workshop',
  general: 'Talk to our team',
};

export const EXP_NOTE: Record<string, string> = {
  'Guided Walkthrough':
    'A guided walkthrough of the capability. There is no live AI execution in this public preview; a MOAR operator can walk you through the workflow and scope a pilot on your data.',
  'Pilot Ready':
    'Ready to pilot on your own data, with a success metric agreed up front.',
  'Illustrative Concept':
    'An illustrative concept. We can walk you through the thinking and shape what a first version looks like for you.',
  'Co-creation Opportunity':
    'An early co-creation opportunity, built with you around your problem.',
  'Interactive Demo':
    'An interactive browser preview you can explore directly.',
};

/* Interactive Before/After Visual Scenarios for Priority & Featured Solutions */
export const VISUAL_SCENARIOS: Record<string, BeforeAfterScenario[]> = {
  catalog_ai: [
    {
      id: 'apparel_packshot',
      label: 'Apparel Packshot → On-Model Studio',
      category: 'Fashion & Apparel',
      visualType: 'imagery',
      beforeTitle: 'Raw Supplier Flat-Lay / Mannequin Shot',
      beforeSubtitle: 'Single unstyled vendor packshot with inconsistent lighting & zero lifestyle context',
      beforePoints: [
        '4–6 weeks wait for physical studio booking, talent, and post-production',
        '$120–$280 average photography & retouching cost per SKU',
        'Single static aspect ratio; fails marketplace hero-image diversity',
      ],
      beforeMetrics: [
        { label: 'Turnaround', value: '21 Days', status: 'bad' },
        { label: 'Cost / SKU', value: '$185', status: 'bad' },
        { label: 'Channel Formats', value: '1 (1:1 only)', status: 'warn' },
      ],
      afterTitle: 'MOAR Catalog AI Studio Output',
      afterSubtitle: 'On-model editorial, lifestyle scene, 4 channel crops, and SEO copy from 1 input',
      afterPoints: [
        'Generated & human-QA reviewed in under 48 hours across 4 aspect ratios',
        'Consistent brand lighting, pose guidelines, and garment drape preservation',
        'Bundled with marketplace-ready title, bullet attributes, and alt-text',
      ],
      afterMetrics: [
        { label: 'Turnaround', value: '48 Hours', status: 'good' },
        { label: 'Cost Reduction', value: '~90% Lower', status: 'cyan' },
        { label: 'Channel Formats', value: '4 Auto-Cropped', status: 'good' },
      ],
    },
    {
      id: 'footwear_lifestyle',
      label: 'Footwear Cutout → Multi-Scene Campaign',
      category: 'Footwear & Accessories',
      visualType: 'imagery',
      beforeTitle: 'White-Background Factory Sample Photo',
      beforeSubtitle: 'Basic supplier compliance shot lacking texture depth or contextual scale',
      beforePoints: [
        'Low PDP engagement and high bounce rate on social & D2C landing pages',
        'Manual cropping required for PDP square, Instagram 4:5, and Banner 16:9',
        'Missing material & care taxonomy attributes in supplier feed',
      ],
      beforeMetrics: [
        { label: 'Studio Cost', value: '100% Baseline', status: 'warn' },
        { label: 'Listing Readiness', value: '42 / 100', status: 'bad' },
        { label: 'Variants', value: 'Single Angle', status: 'warn' },
      ],
      afterTitle: 'Contextual Lifestyle + Enriched PDP Bundle',
      afterSubtitle: 'Urban & studio scenes with realistic floor shadows and auto-extracted specs',
      afterPoints: [
        'Shadow-accurate placement across Studio, Urban Street, and Editorial backdrops',
        'Automated QA checks verify sole geometry, logo sharpness, and color fidelity',
        'Instant export for Amazon A+, Shopify PDP, and paid social creatives',
      ],
      afterMetrics: [
        { label: 'Onboarding Speed', value: '70% Faster', status: 'good' },
        { label: 'Listing QA Score', value: '96 / 100', status: 'cyan' },
        { label: 'Visual Standard', value: '100% Unified', status: 'good' },
      ],
    },
  ],
  pdp: [
    {
      id: 'fashion_enrichment',
      label: 'Sparse Supplier Row → Enriched Marketplace PDP',
      category: 'Apparel & Softlines',
      visualType: 'catalog',
      beforeTitle: 'Raw Vendor CSV & Unstructured Title',
      beforeSubtitle: 'SKU #M-JKT-409: "MENS BLU JKT L LINEN BLEND"',
      beforePoints: [
        '3 of 18 mandatory marketplace attributes populated; missing fit, collar, and care',
        'Generic 12-word description invisible to organic search & LLM shopping filters',
        'Manual merchant copywriting takes 18–25 minutes per SKU',
      ],
      beforeMetrics: [
        { label: 'Attribute Completeness', value: '17%', status: 'bad' },
        { label: 'Catalog QA Score', value: '34 / 100', status: 'bad' },
        { label: 'Search Discoverability', value: 'Low', status: 'warn' },
      ],
      afterTitle: 'AI-Enriched, Taxonomy-Mapped PDP Record',
      afterSubtitle: 'Structured 18/18 attributes + SEO Title + 5 Conversion Bullets',
      afterPoints: [
        'Vision + NLP extracts Neckline (Mandarin), Sleeve (Full), Weave (Linen-Cotton), Occasion',
        'Auto-mapped to Amazon, Shopify, and internal PIM taxonomy schemas with confidence scores',
        'Built-in compliance check removes unverified fabric claims before publish',
      ],
      afterMetrics: [
        { label: 'Attribute Completeness', value: '98%', status: 'good' },
        { label: 'Catalog QA Score', value: '94 / 100', status: 'cyan' },
        { label: 'Processing Time', value: '< 8 Seconds', status: 'good' },
      ],
    },
    {
      id: 'home_hardlines',
      label: 'Home & Kitchen Spec Sheet → High-Converting Listing',
      category: 'Home & Hardlines',
      visualType: 'catalog',
      beforeTitle: 'Unformatted Factory PDF Specifications',
      beforeSubtitle: 'SKU #HM-ESP-210: Raw dimensions and metric voltage codes only',
      beforePoints: [
        'Dimension units inconsistent across suppliers (mm vs inches)',
        'Key buyer questions (compatibility, warranty, included accessories) buried or absent',
        'High return rate due to sizing misunderstanding',
      ],
      beforeMetrics: [
        { label: 'Spec Normalization', value: 'Manual', status: 'bad' },
        { label: 'Catalog QA Score', value: '41 / 100', status: 'warn' },
        { label: 'Defect Rate', value: '14% Rejected', status: 'bad' },
      ],
      afterTitle: 'Normalized Attributes + Benefit-Led Copy',
      afterSubtitle: 'Standardized regional units, comparison table, and verified safety tags',
      afterPoints: [
        'Automated unit conversion and schema validation per target marketplace country',
        'Structured bullet points highlighting countertop footprint, bar pressure, and care',
        'Zero listing rejections at marketplace syndication gate',
      ],
      afterMetrics: [
        { label: 'Spec Normalization', value: '100% Auto', status: 'good' },
        { label: 'Catalog QA Score', value: '97 / 100', status: 'cyan' },
        { label: 'Rejection Rate', value: '< 0.5%', status: 'good' },
      ],
    },
  ],
  geo_intel: [
    {
      id: 'jakarta_catchment',
      label: 'Static Census Radius → 1.2 × 0.6 km Digital Atlas Grid',
      category: 'Site Selection & Expansion',
      visualType: 'geo',
      beforeTitle: 'Legacy 5km Radius Demographic Average',
      beforeSubtitle: 'Single-source census snapshot updated every 3–5 years',
      beforePoints: [
        'Treats an entire district as uniform; misses street-level transit barriers and footfall pockets',
        'Blind to informal competitors, daytime office influx, and recent residential handovers',
        'High cannibalization risk when opening infill stores near existing flagships',
      ],
      beforeMetrics: [
        { label: 'Spatial Granularity', value: '5 km Radius', status: 'bad' },
        { label: 'Signal Freshness', value: '2–4 Years Old', status: 'bad' },
        { label: 'Site Hit-Rate', value: 'Baseline', status: 'warn' },
      ],
      afterTitle: 'Multi-Signal Micro-Market Knowledge Graph',
      afterSubtitle: '250+ signals fused per 1.2 × 0.6 km cell across 7,000+ districts',
      afterPoints: [
        'Combines mobility curves, POI density, review velocity, affluence proxies, and weather sensitivity',
        'Identifies lookalike high-performing cells and models cannibalization impact before lease signing',
        'Delivers an explainable site score (e.g., 88/100) with top positive and negative drivers',
      ],
      afterMetrics: [
        { label: 'Viable Zones Found', value: '+23% More', status: 'cyan' },
        { label: 'New-Store Revenue', value: '+15% Uplift', status: 'good' },
        { label: 'Signals Fused', value: '250+ Live', status: 'good' },
      ],
    },
    {
      id: 'competitor_catchment',
      label: 'Quarterly Field Audit → Live Catchment Competitor Map',
      category: 'Competitive Intelligence',
      visualType: 'geo',
      beforeTitle: 'Manual Field Visits & Static Store Lists',
      beforeSubtitle: 'Spreadsheet tracking of competitor openings and promotions',
      beforePoints: [
        'Regional managers learn about competitor promos weeks after launch',
        'No systematic measurement of catchment overlap or footfall diversion',
        'Blunt region-wide defensive discounting erodes margin unnecessarily',
      ],
      beforeMetrics: [
        { label: 'Detection Lag', value: '3–6 Weeks', status: 'bad' },
        { label: 'Catchment Visibility', value: 'Partial', status: 'warn' },
        { label: 'Response Precision', value: 'Region-Wide', status: 'bad' },
      ],
      afterTitle: 'Continuous Catchment & Promo Radar',
      afterSubtitle: 'Store-by-store overlap scoring and targeted response recommendations',
      afterPoints: [
        'Maps exact walking/driving isochrones and competitor density around each store',
        'Flags only the specific stores where competitor activity threatens footfall',
        'Links directly to localized pricing and store observability feeds',
      ],
      afterMetrics: [
        { label: 'Places Mapped', value: '50M+ Global', status: 'cyan' },
        { label: 'Signal Domains', value: '6 Integrated', status: 'good' },
        { label: 'Response Scope', value: 'Store-Specific', status: 'good' },
      ],
    },
  ],
  space_planning: [
    {
      id: 'beverage_aisle',
      label: 'Uniform National Planogram → Cluster-Optimized Bay Layout',
      category: 'Grocery & Convenience',
      visualType: 'planogram',
      beforeTitle: 'Static One-Size-Fits-All Gondola Planogram',
      beforeSubtitle: 'Identical 4-shelf bay allocation pushed to all 450 stores regardless of local demand',
      beforePoints: [
        'High-velocity local SKUs suffer chronic stockouts on bottom shelves with only 2 facings',
        'Slow-moving premium variants occupy prime eye-level space in value-oriented catchments',
        'Manual CAD planogram revisions take weeks and rarely match physical fixture widths',
      ],
      beforeMetrics: [
        { label: 'Eye-Level Productivity', value: '61%', status: 'warn' },
        { label: 'Shelf Stockout Rate', value: '8.4%', status: 'bad' },
        { label: 'Cluster Fit', value: '1 National Template', status: 'bad' },
      ],
      afterTitle: 'AI Space-to-Demand Planogram Studio',
      afterSubtitle: 'Localized facings, margin-weighted eye-level placement, and photo-compliance check',
      afterPoints: [
        'Reallocates facings by store cluster velocity, holding power, and gross margin return on space (GMROS)',
        'Places high-margin impulse & top-velocity SKUs at eye and touch levels (Shelves 2 & 3)',
        'Generates fixture-accurate visual packouts for store associates with mobile photo audit',
      ],
      afterMetrics: [
        { label: 'GMROS Uplift', value: '+11.4% Illustrative', status: 'cyan' },
        { label: 'Shelf Stockout Rate', value: '3.1%', status: 'good' },
        { label: 'Store Compliance', value: '94% Verified', status: 'good' },
      ],
    },
    {
      id: 'beauty_endcap',
      label: 'Seasonal Endcap Guesswork → Attribute-Balanced Merchandising',
      category: 'Beauty & Personal Care',
      visualType: 'planogram',
      beforeTitle: 'Supplier-Led Endcap Allocation',
      beforeSubtitle: 'Space allocated by historical brand share rather than localized trend & sentiment',
      beforePoints: [
        'Over-assorted duplicate price tiers cause shopper decision fatigue',
        'Trending regimen bundles split across separate aisles',
        'No visibility into whether stores actually executed the seasonal reset on time',
      ],
      beforeMetrics: [
        { label: 'Reset Execution', value: '58% On-Time', status: 'bad' },
        { label: 'Basket Attachment', value: '1.2 Units', status: 'warn' },
        { label: 'Markdown Risk', value: 'High', status: 'bad' },
      ],
      afterTitle: 'Demand-Aware Endcap & Cross-Merchandising',
      afterSubtitle: 'Co-located regimen layout with automated visual compliance scoring',
      afterPoints: [
        'Pairs complementary hero SKUs (cleanser + serum + SPF) by local catchment affinity',
        'Balances price-tier ladder from entry trial sizes to prestige trade-ups',
        'Closed-loop feedback correlates shelf position with weekly POS scan velocity',
      ],
      afterMetrics: [
        { label: 'Reset Execution', value: '92% On-Time', status: 'good' },
        { label: 'Basket Attachment', value: '1.7 Units', status: 'cyan' },
        { label: 'Space Wastage', value: '-28% Lower', status: 'good' },
      ],
    },
  ],
};

/* Base 23 Capabilities from the attached HTML prototype + 3 Phase 1 PRD Additions = 26 Total */
const RAW_SOL: Omit<Solution, 'exp' | 'head'>[] = [
  {
    id: 'catalog_ai',
    name: 'Catalog AI Studio',
    domain: 'content',
    badge: 'available',
    stages: ['catalog'],
    outcomes: ['speed', 'cost'],
    ai: true,
    source: 'moar',
    time: 'Weeks',
    tech: ['Computer Vision', 'GenAI'],
    demo: 'catalog_ai',
    related: ['pdp', 'ai_product_imagery', 'asset_qa', 'marketplace_ops', 'store_perf'],
    challenge: 'Consistent catalogue and partner content at scale.',
    capability: 'AI imagery, video and listing copy from one studio shot.',
    outcome: '~90% lower content cost, days not weeks.',
    caps: ['On-model imagery', 'Product video', 'AI SEO copy', 'Channel formats'],
    priorityShowcase: true,
    visualScenarios: VISUAL_SCENARIOS.catalog_ai,
    cs: {
      source: 'MOAR delivery',
      industry: 'Fashion & apparel',
      problem: 'Studio shoots are slow and costly across thousands of SKUs.',
      solution: 'One studio photo becomes model-worn imagery, video and listing copy, reviewed before publish.',
      outcome: 'Content produced in days, at a fraction of studio cost.',
      timeline: 'Weeks to first output',
      tech: ['Computer Vision', 'GenAI', 'Auto-retouch'],
      impact: [
        ['~90%', 'Lower content cost'],
        ['70%', 'Faster onboarding'],
        ['4', 'Channel formats'],
        ['1', 'Visual standard'],
      ],
    },
  },
  {
    id: 'pdp',
    name: 'PDP Enrichment',
    domain: 'content',
    badge: 'available',
    stages: ['catalog'],
    outcomes: ['rev', 'speed'],
    ai: true,
    source: 'moar',
    time: 'Weeks',
    tech: ['GenAI', 'Taxonomy AI'],
    demo: 'catalog',
    related: ['catalog_ai', 'ai_catalog_intel', 'asset_qa', 'marketplace_ops'],
    challenge: 'Thin product pages that neither rank nor convert.',
    capability: 'Enriches pages with SEO copy, taxonomy and a QA score.',
    outcome: 'Listing-ready content in seconds.',
    caps: ['SEO copy', 'Attribute extraction', 'Taxonomy mapping', 'QA scoring'],
    visualScenarios: VISUAL_SCENARIOS.pdp,
  },
  {
    id: 'marketplace_ops',
    name: 'Marketplace Operations Hub',
    domain: 'marketplace',
    badge: 'pilot',
    stages: ['marketplace'],
    outcomes: ['rev', 'speed'],
    ai: true,
    source: 'moar',
    time: '4–8 weeks',
    tech: ['Marketplace APIs'],
    related: ['catalog_ai', 'pdp', 'asset_qa'],
    challenge: 'Manual item setup and listing defects across channels.',
    capability: 'Bulk item creation, publishing and optimisation for Amazon, Shopify and DTC.',
    outcome: 'Faster go-live, fewer defects.',
    caps: ['Item creation', 'Bulk publishing', 'Listing optimisation', 'Order & returns sync'],
  },
  {
    id: 'asset_qa',
    name: 'Digital Asset QA',
    domain: 'content',
    badge: 'available',
    stages: ['catalog'],
    outcomes: ['risk', 'comp'],
    ai: true,
    source: 'moar',
    time: 'Weeks',
    tech: ['Computer Vision'],
    related: ['catalog_ai', 'pdp', 'content_compliance'],
    challenge: 'Off-brand images slipping into live catalogues.',
    capability: 'Automated image and content QA against brand and channel rules.',
    outcome: 'One visual standard, fewer takedowns.',
    caps: ['Image compliance', 'Brand-rule checks', 'Format validation', 'Human review'],
  },
  {
    id: 'content_compliance',
    name: 'Content Compliance',
    domain: 'content',
    badge: 'early',
    stages: ['catalog'],
    outcomes: ['comp', 'risk'],
    ai: true,
    source: 'moar',
    time: '4–8 weeks',
    tech: ['NLP', 'Rules engine'],
    related: ['asset_qa', 'pdp'],
    challenge: 'Claims and regional rules that vary by market.',
    capability: 'Flags copy and asset compliance risks before publish.',
    outcome: 'Lower compliance risk across regions.',
    caps: ['Claim checks', 'Regional rules', 'Restricted-term flags', 'Audit trail'],
  },
  {
    id: 'plm',
    name: 'Product Lifecycle Hub',
    domain: 'lifecycle',
    badge: 'pilot',
    stages: ['source', 'merchandise'],
    outcomes: ['speed', 'cost'],
    ai: false,
    source: 'moar',
    time: 'A quarter',
    tech: ['Program tooling'],
    demo: 'lifecycle',
    related: ['vendor_collab', 'assortment'],
    challenge: 'Fragmented coordination from design brief to delivered goods.',
    capability: 'One accountable thread across PLM, sampling, vendors, QC and logistics.',
    outcome: '22 weeks brief-to-goods, one point of accountability.',
    caps: ['PLM & item setup', 'Sampling oversight', 'Vendor coordination', 'Approvals & go-live'],
    cs: {
      source: 'MOAR delivery',
      industry: 'Apparel & softlines',
      problem: 'Design-to-delivery ran across many vendors with no single owner.',
      solution: 'MOAR owns the thread between three HQ gates: design, factory, QC and logistics.',
      outcome: 'A predictable 22-week path with HQ in control at each gate.',
      timeline: '22 weeks brief to goods',
      tech: ['Program governance', 'QC tooling'],
      impact: [
        ['22 wks', 'Brief to goods'],
        ['3', 'HQ gates'],
        ['1', 'Point of accountability'],
      ],
    },
  },
  {
    id: 'vendor_collab',
    name: 'Vendor Collaboration',
    domain: 'lifecycle',
    badge: 'available',
    stages: ['source'],
    outcomes: ['cost', 'risk'],
    ai: false,
    source: 'moar',
    time: '4–8 weeks',
    tech: ['Vendor portal'],
    related: ['plm'],
    challenge: 'Vendor queries pulling HQ onto the factory floor.',
    capability: 'Vendor onboarding, SLA tracking, scorecards and chargebacks.',
    outcome: 'Factory communication owned in one thread.',
    caps: ['Onboarding', 'SLA tracking', 'Scorecards', 'Chargebacks'],
  },
  {
    id: 'assortment',
    name: 'Assortment Intelligence',
    domain: 'merch',
    badge: 'soon',
    stages: ['plan', 'merchandise'],
    outcomes: ['margin', 'inv'],
    ai: true,
    source: 'moar',
    time: 'A quarter',
    tech: ['Forecasting'],
    related: ['space_planning', 'pricing_promo', 'demand_intel'],
    challenge: 'Assortment and buy plans built on instinct.',
    capability: 'AI-driven assortment, line architecture and range planning.',
    outcome: 'Tighter ranges, less markdown.',
    caps: ['Line architecture', 'OTB & buy-plan', 'Demand forecasting', 'Range planning'],
  },
  {
    id: 'pricing_promo',
    name: 'Pricing & Promotion Intelligence',
    domain: 'pricing',
    badge: 'soon',
    stages: ['merchandise', 'marketplace'],
    outcomes: ['margin', 'rev'],
    ai: true,
    source: 'partner',
    time: 'A quarter',
    tech: ['Elasticity modelling', 'Digital Atlas'],
    related: ['demand_intel', 'assortment'],
    poweredBy: 'Propheus',
    challenge: 'Blunt national pricing that leaks margin.',
    capability: 'Store-SKU pricing and promo depth from elasticity and competitor signals.',
    outcome: 'Illustrative: 40% lower promo budget, same uplift.',
    caps: ['Demand elasticity', 'Localised pricing', 'Promo ROI', 'Competitor pricing'],
    cs: {
      illustrative: true,
      source: 'Partner-delivered',
      industry: 'Consumer goods (SEA)',
      problem: 'Promo spend rising without matching revenue.',
      solution: 'An AI pricing engine estimates elasticity, simulates scenarios and recommends safe store-SKU prices.',
      outcome: 'Same revenue uplift on a materially smaller promo budget.',
      timeline: 'A quarter to first rollout',
      tech: ['Elasticity modelling', 'Digital Atlas', 'Scenario simulation'],
      impact: [
        ['$8M', 'Net yearly impact'],
        ['40%', 'Lower promo budget'],
        ['Same', 'Revenue uplift'],
      ],
    },
  },
  {
    id: 'store_obs',
    name: 'Store Observability',
    domain: 'storeops',
    badge: 'soon',
    stages: ['store'],
    outcomes: ['rev', 'cost'],
    ai: true,
    source: 'partner',
    time: 'A quarter',
    tech: ['Digital Atlas', 'Signal fusion'],
    related: ['store_perf', 'demand_intel', 'workforce'],
    poweredBy: 'Propheus',
    challenge: 'Managers flooded with data, no clear daily action.',
    capability: 'Events, competitor promos and weather fused into one daily action.',
    outcome: 'One prioritised feed for every store.',
    caps: ['Signal fusion', 'Staffing & inventory', 'Promo & competitor response', 'Shift briefings'],
    cs: {
      illustrative: true,
      source: 'Partner-delivered',
      industry: 'Multi-site retail & QSR',
      problem: 'Store teams lacked a single, daily, prioritised action list.',
      solution: 'A decision engine fuses events, competitor promos and weather into store-level recommendations.',
      outcome: 'Staffing, inventory, promos and briefings in one daily feed.',
      timeline: 'A quarter to pilot',
      tech: ['Digital Atlas', 'Signal fusion', 'LLMs'],
      impact: [
        ['1', 'Daily prioritised feed'],
        ['6', 'Decision types'],
        ['Real-time', 'Push to teams'],
      ],
    },
  },
  {
    id: 'store_perf',
    name: 'Store Performance Analytics',
    domain: 'storeops',
    badge: 'pilot',
    stages: ['store'],
    outcomes: ['rev', 'cx'],
    ai: true,
    source: 'moar',
    time: '4–8 weeks',
    tech: ['Analytics'],
    related: ['store_obs', 'workforce', 'space_planning'],
    challenge: 'Store performance seen monthly, too late to act.',
    capability: 'Live store KPIs, footfall, conversion and regional comparison.',
    outcome: 'Real-time visibility down to the aisle.',
    caps: ['Footfall & conversion', 'Heat maps', 'Regional comparison', 'Alerts'],
  },
  {
    id: 'workforce',
    name: 'Workforce Planning',
    domain: 'storeops',
    badge: 'soon',
    stages: ['store'],
    outcomes: ['cost', 'cx'],
    ai: true,
    source: 'moar',
    time: 'A quarter',
    tech: ['Forecasting'],
    related: ['store_obs', 'store_perf'],
    challenge: 'Staffing that ignores predicted demand.',
    capability: 'Demand-driven staffing and shift planning per store.',
    outcome: 'Right staff, right shifts, less labour waste.',
    caps: ['Demand-based staffing', 'Shift optimisation', 'Skill matching', 'Cost control'],
  },
  {
    id: 'returns_intel',
    name: 'Returns Intelligence',
    domain: 'supply',
    badge: 'soon',
    stages: ['returns'],
    outcomes: ['margin', 'cost'],
    ai: true,
    source: 'moar',
    time: 'A quarter',
    tech: ['ML'],
    related: ['review_sentiment', 'ar_tryon'],
    challenge: 'Returns eroding margin with no root cause.',
    capability: 'Detects return drivers by product, size and channel.',
    outcome: 'Lower returns, protected margin.',
    caps: ['Driver detection', 'Size & fit signals', 'Channel analysis', 'Prevention'],
  },
  {
    id: 'ar_tryon',
    name: 'AR / Virtual Try-On',
    domain: 'cx',
    badge: 'innov',
    stages: ['customer'],
    outcomes: ['rev', 'cx'],
    ai: true,
    source: 'moar',
    time: '4–8 weeks',
    tech: ['AR', '3D'],
    demo: 'immersive',
    related: ['immersive_px', 'shopping_assistant', 'returns_intel'],
    challenge: 'Shoppers cannot visualise products before buying.',
    capability: 'Place products in a real scene and try them on, in AR.',
    outcome: 'Illustrative: +27% confidence, -22% returns.',
    caps: ['AR placement', 'Virtual try-on', 'Scene & scale', 'PDP embed'],
  },
  {
    id: 'immersive_px',
    name: 'Immersive Product Experience',
    domain: 'cx',
    badge: 'innov',
    stages: ['customer'],
    outcomes: ['cx', 'rev'],
    ai: false,
    source: 'moar',
    time: '4–8 weeks',
    tech: ['3D', 'WebGL'],
    related: ['ar_tryon', 'shopping_assistant'],
    challenge: 'Flat pages that under-sell premium product.',
    capability: '3D spin, zoom and immersive commerce touchpoints.',
    outcome: 'Higher engagement and dwell.',
    caps: ['3D spin & zoom', 'Immersive PDP', 'Configurators', 'Shoppable scenes'],
  },
  {
    id: 'shopping_assistant',
    name: 'AI Shopping Assistant',
    domain: 'cx',
    badge: 'soon',
    stages: ['customer'],
    outcomes: ['rev', 'cx'],
    ai: true,
    source: 'moar',
    time: 'A quarter',
    tech: ['LLMs'],
    related: ['ar_tryon', 'review_sentiment'],
    challenge: 'Shoppers abandon when they cannot decide.',
    capability: 'A conversational assistant that guides discovery and checkout.',
    outcome: 'Higher conversion, lower abandonment.',
    caps: ['Guided discovery', 'Product Q&A', 'Next-best-offer', 'Checkout assist'],
  },
  {
    id: 'geo_intel',
    name: 'Geo Intelligence',
    domain: 'intel',
    badge: 'innov',
    stages: ['discover', 'plan'],
    outcomes: ['rev', 'risk'],
    ai: true,
    source: 'partner',
    time: 'A quarter',
    tech: ['Digital Atlas', 'Knowledge graphs'],
    related: ['catchment', 'competitor_map'],
    poweredBy: 'Propheus',
    challenge: 'Stale, incomplete location data behind expansion.',
    capability: 'A continuously refreshed knowledge graph of every place.',
    outcome: 'A compounding real-world data moat.',
    caps: ['Walk the Earth', 'Validate & score', 'Refresh & monitor', 'Enrich attributes'],
    priorityShowcase: true,
    visualScenarios: VISUAL_SCENARIOS.geo_intel,
    cs: {
      illustrative: true,
      source: 'Partner-delivered',
      industry: 'Cross-retail (location)',
      problem: 'Expansion ran on stale, single-source location data.',
      solution: 'A Digital Atlas organises mobility, sentiment, imagery, weather, events and places.',
      outcome: 'A continuously refreshed, multi-signal view of every micro-market.',
      timeline: 'Continuously updated since 2023',
      tech: ['Digital Atlas', 'Embeddings', 'Knowledge graphs'],
      impact: [
        ['250+', 'Multimodal signals'],
        ['50M', 'Places mapped'],
        ['6', 'Signal domains'],
      ],
    },
  },
  {
    id: 'catchment',
    name: 'Catchment Analytics',
    domain: 'intel',
    badge: 'innov',
    stages: ['discover', 'plan'],
    outcomes: ['rev', 'risk'],
    ai: true,
    source: 'partner',
    time: 'A quarter',
    tech: ['Digital Atlas', 'Grid scoring'],
    demo: 'geo',
    related: ['geo_intel', 'competitor_map', 'store_obs'],
    poweredBy: 'Propheus',
    challenge: 'Expansion needs sharper demand and competitor signal.',
    capability: 'Scores every micro-market (1.2 × 0.6 km) for demand fit.',
    outcome: 'Illustrative: 20–30% higher site accuracy.',
    caps: ['Micro-market scoring', 'Catchment reach', 'Competitor density', 'Similar-site discovery'],
    visualScenarios: VISUAL_SCENARIOS.geo_intel,
    cs: {
      illustrative: true,
      source: 'Partner-delivered',
      industry: 'Coffee retail (Indonesia)',
      problem: 'Expansion decisions lacked granular, explainable demand signal.',
      solution: 'A Digital Atlas scores every 1.2 × 0.6 km grid, validated against outlet performance.',
      outcome: 'A phased roadmap that limited cannibalisation and lifted new-store revenue.',
      timeline: 'Roadmap to 2030',
      tech: ['Digital Atlas', 'Grid scoring', 'Cannibalisation modelling'],
      impact: [
        ['7,000+', 'Districts analysed'],
        ['23%', 'More viable zones'],
        ['15%', 'Higher new-store revenue'],
      ],
    },
  },
  {
    id: 'competitor_map',
    name: 'Competitor Mapping',
    domain: 'intel',
    badge: 'innov',
    stages: ['discover'],
    outcomes: ['rev', 'risk'],
    ai: true,
    source: 'partner',
    time: 'A quarter',
    tech: ['Digital Atlas'],
    related: ['catchment', 'geo_intel'],
    poweredBy: 'Propheus',
    challenge: 'No line of sight into competitor promos per catchment.',
    capability: 'Maps competitor locations and live promotions around every store.',
    outcome: 'Faster, matched competitor response.',
    caps: ['Location mapping', 'Live promo detection', 'Catchment overlap', 'Impact scoring'],
  },
  {
    id: 'demand_intel',
    name: 'Demand Intelligence',
    domain: 'intel',
    badge: 'pilot',
    stages: ['plan'],
    outcomes: ['inv', 'rev'],
    ai: true,
    source: 'partner',
    time: 'A quarter',
    tech: ['Signal fusion', 'LLMs'],
    related: ['store_obs', 'review_sentiment', 'pricing_promo'],
    poweredBy: 'Propheus',
    challenge: 'Forecasts blind to events, weather and sentiment.',
    capability: 'Demand forecasting fused with mobility, events and social signals.',
    outcome: 'Illustrative: earlier, more accurate demand calls.',
    caps: ['Signal-fused forecasting', 'Event & weather inputs', 'Sentiment inputs', 'SKU-level output'],
    cs: {
      illustrative: true,
      source: 'Partner-delivered',
      industry: 'Retail pharmacy',
      problem: 'Forecasts missed fast, sentiment-driven demand shifts.',
      solution: 'A demand agent correlated social sentiment with footfall and seasonality.',
      outcome: 'A dip in sunscreen sprays was caught early and inventory adjusted ahead of it.',
      timeline: 'A quarter to signal',
      tech: ['Signal fusion', 'Social listening', 'LLMs'],
      impact: [
        ['Earlier', 'Demand-shift detection'],
        ['Lower', 'Overstock risk'],
        ['Proactive', 'Stock planning'],
      ],
    },
  },
  {
    id: 'review_sentiment',
    name: 'Review & Sentiment Intelligence',
    domain: 'intel',
    badge: 'pilot',
    stages: ['customer', 'discover'],
    outcomes: ['cx', 'inv'],
    ai: true,
    source: 'partner',
    time: '4–8 weeks',
    tech: ['Social listening', 'NLP'],
    related: ['demand_intel', 'shopping_assistant'],
    poweredBy: 'Propheus',
    challenge: 'Demand shifts hiding in social and review signals.',
    capability: 'Tracks sentiment spikes and dips tied to product types.',
    outcome: 'Illustrative: earlier demand calls, less overstock.',
    caps: ['Social listening', 'Review mining', 'Sentiment scoring', 'Demand correlation'],
  },
  {
    id: 'copilot',
    name: 'Retail AI Copilot',
    domain: 'ai',
    badge: 'early',
    stages: ['plan', 'store', 'customer'],
    outcomes: ['cost', 'cx'],
    ai: true,
    source: 'moar',
    time: '4–8 weeks',
    tech: ['LLMs', 'RAG'],
    related: ['knowledge_agent'],
    challenge: 'Teams jumping across tools for answers.',
    capability: 'A retail copilot that answers and acts across the platform.',
    outcome: 'One place to ask and act.',
    caps: ['NL queries', 'Cross-solution actions', 'Workflow automation', 'Explainable output'],
  },
  {
    id: 'knowledge_agent',
    name: 'Retail Knowledge Agent',
    domain: 'ai',
    badge: 'innov',
    stages: ['plan', 'store'],
    outcomes: ['cost', 'risk'],
    ai: true,
    source: 'moar',
    time: 'A quarter',
    tech: ['Knowledge graphs', 'RAG'],
    related: ['copilot'],
    challenge: 'Retail knowledge locked in people and docs.',
    capability: 'A knowledge agent grounded in your catalogue, vendors and stores.',
    outcome: 'Faster onboarding and decisions.',
    caps: ['Knowledge graph', 'Grounded answers', 'Doc & data search', 'Role-aware access'],
  },
  /* --- 3 Requested Phase 1 Scope Additions (bringing 23 Prototype -> 26 Total) --- */
  {
    id: 'ai_catalog_intel',
    name: 'AI Catalog Intelligence',
    domain: 'content',
    badge: 'available',
    stages: ['catalog', 'marketplace'],
    outcomes: ['speed', 'rev', 'comp'],
    ai: true,
    source: 'moar',
    time: 'Weeks',
    tech: ['Vision-Language Models', 'Taxonomy AI', 'Automated QA'],
    demo: 'catalog_intel',
    related: ['pdp', 'catalog_ai', 'asset_qa', 'marketplace_ops'],
    challenge: 'Supplier spreadsheets arrive with missing attributes, inconsistent sizing, and unsearchable copy.',
    capability: 'Extracts 20+ structured attributes from product images and raw text, maps taxonomy, and generates channel-ready SEO copy.',
    outcome: 'Illustrative: 95%+ attribute completeness and 10× faster catalog readiness.',
    caps: ['Visual attribute extraction', 'Automated taxonomy mapping', 'Catalog health scoring', 'Multi-marketplace syndication'],
    prdAddition: true,
    priorityShowcase: true,
    visualScenarios: VISUAL_SCENARIOS.pdp,
    cs: {
      illustrative: true,
      source: 'MOAR delivery',
      industry: 'Multi-category retail & marketplaces',
      problem: 'Merchants spent weeks manually normalizing supplier spreadsheets and tagging attributes before SKUs could go live.',
      solution: 'AI Catalog Intelligence inspects product photos and raw vendor rows to populate mandatory attributes, SEO titles, and QA scores.',
      outcome: 'Catalog backlogs cleared in days with higher search impressions and fewer marketplace rejections.',
      timeline: '2–4 weeks to pilot on first category',
      tech: ['Vision-Language Models', 'Taxonomy AI', 'Schema validation'],
      impact: [
        ['98%', 'Attribute fill rate'],
        ['10×', 'Faster SKU onboarding'],
        ['94/100', 'Avg. catalog QA score'],
        ['<1%', 'Channel rejection rate'],
      ],
    },
  },
  {
    id: 'space_planning',
    name: 'Space Planning & Planograms',
    domain: 'merch',
    badge: 'pilot',
    stages: ['plan', 'merchandise', 'store'],
    outcomes: ['margin', 'inv', 'rev'],
    ai: true,
    source: 'moar',
    time: '4–8 weeks',
    tech: ['Space-to-Sales Optimization', 'Cluster Analytics', 'Computer Vision Audit'],
    demo: 'space_planning',
    related: ['assortment', 'store_perf', 'store_obs', 'demand_intel'],
    challenge: 'Static national planograms ignore local store cluster velocity, fixture dimensions, and shelf stockout risk.',
    capability: 'Generates cluster-specific bay and shelf planograms optimized for gross margin return on space (GMROS) and verifies store compliance.',
    outcome: 'Illustrative: +8–12% shelf productivity and fewer eye-level stockouts.',
    caps: ['Cluster-specific planograms', 'Facing & capacity optimization', 'Fixture & bay rules engine', 'Photo compliance verification'],
    prdAddition: true,
    priorityShowcase: true,
    visualScenarios: VISUAL_SCENARIOS.space_planning,
    cs: {
      illustrative: true,
      source: 'Illustrative concept',
      industry: 'Grocery, convenience & specialty retail',
      problem: 'Uniform planograms over-allocated space to slow movers in urban stores while top sellers ran out of stock mid-shift.',
      solution: 'Space Planning & Planograms aligns facings with local POS velocity, margin contribution, and physical shelf constraints.',
      outcome: 'Higher sales per linear foot and streamlined store reset execution with visual compliance checks.',
      timeline: '4–8 weeks for cluster pilot',
      tech: ['GMROS optimization', 'Store clustering', 'Visual shelf audit'],
      impact: [
        ['+11%', 'Sales per linear foot'],
        ['-35%', 'Shelf stockout frequency'],
        ['94%', 'Planogram compliance'],
        ['4 wks', 'Cluster pilot cycle'],
      ],
    },
  },
  {
    id: 'ai_product_imagery',
    name: 'AI Product Imagery',
    domain: 'content',
    badge: 'available',
    stages: ['catalog', 'customer', 'marketplace'],
    outcomes: ['cost', 'speed', 'cx'],
    ai: true,
    source: 'moar',
    time: 'Weeks',
    tech: ['Generative Diffusion', 'Garment & Geometry Lock', 'Auto-Retouch'],
    demo: 'product_imagery',
    related: ['catalog_ai', 'asset_qa', 'pdp', 'ar_tryon'],
    challenge: 'Physical studio photography cannot keep pace with seasonal drops, regional models, and multi-channel aspect ratios.',
    capability: 'Transforms a single packshot or mannequin photo into on-model, lifestyle, and multi-angle imagery with strict product fidelity.',
    outcome: 'Illustrative: ~90% lower per-SKU shoot cost and 48-hour visual turnaround.',
    caps: ['Packshot-to-model generation', 'Lifestyle scene placement', 'Multi-ratio channel crops', 'Human-in-the-loop brand QA'],
    prdAddition: true,
    priorityShowcase: true,
    visualScenarios: VISUAL_SCENARIOS.catalog_ai,
    cs: {
      illustrative: true,
      source: 'MOAR delivery',
      industry: 'Fashion, footwear & home lifestyle',
      problem: 'High studio costs forced brands to launch long-tail SKUs with flat packshots only, hurting conversion.',
      solution: 'Browser-previewed AI Product Imagery pipeline locks product geometry and labels while generating on-brand model and scene visuals.',
      outcome: 'Every SKU launches with complete editorial and marketplace visual assets at a fraction of studio cost.',
      timeline: 'Weeks to production workflow',
      tech: ['Computer Vision', 'Generative AI', 'Brand QA guardrails'],
      impact: [
        ['~90%', 'Lower photo cost'],
        ['48 hrs', 'Turnaround per batch'],
        ['4×', 'Visual formats per SKU'],
        ['100%', 'Human QA before live'],
      ],
    },
  },
];

/* Apply the exact v9 Accuracy Layer transformations from the prototype */
export const SOL: Solution[] = RAW_SOL.map((raw) => {
  const s: Solution = {
    ...raw,
    exp: EXP[raw.id] || 'Guided Walkthrough',
    head: HEAD[raw.id] || raw.outcome,
    cs: raw.cs ? { ...raw.cs } : undefined,
  };
  if (typeof s.outcome === 'string' && s.outcome.indexOf('Illustrative: ') === 0) {
    s.outcome = s.outcome.slice(14);
    s.outcome = s.outcome.charAt(0).toUpperCase() + s.outcome.slice(1);
    s.illus = true;
  }
  if (ILLUS_FORCE.has(s.id)) {
    s.illus = true;
  }
  if (s.cs) {
    s.cs.proof = PROOF_CASE[s.id] || (s.cs.illustrative ? 'illustrative' : 'moar');
    s.cs.qual = CASE_QUAL.has(s.id);
  }
  return s;
});

export const byId = (id: string): Solution | undefined => SOL.find((s) => s.id === id);

export function ctaFor(s: Solution): { label: string; act: string } {
  if (s.badge === 'soon') return { label: 'Discuss the use case', act: 'usecase' };
  if (s.badge === 'early') return { label: 'Discuss early access', act: 'early' };
  if (s.source === 'partner') return { label: 'Meet the solution team', act: 'partner' };
  if (s.exp === 'Interactive Demo') return { label: 'Try the demo', act: 'demo' };
  if (s.exp === 'Pilot Ready') return { label: 'Explore a pilot', act: 'pilot' };
  if (s.exp === 'Guided Walkthrough') return { label: 'View the walkthrough', act: 'walkthrough' };
  if (s.exp === 'Illustrative Concept') return { label: 'Explore the concept', act: 'concept' };
  if (s.exp === 'Co-creation Opportunity') return { label: 'Co-create with MOAR', act: 'cocreate' };
  return { label: 'View the walkthrough', act: 'walkthrough' };
}

export function detailPrimary(s: Solution): { label: string; act: string } {
  if (s.source === 'partner') return { label: 'Meet the solution team', act: 'partner' };
  if (s.badge === 'soon') return { label: 'Discuss the use case', act: 'usecase' };
  if (s.badge === 'early') return { label: 'Discuss early access', act: 'early' };
  if (s.badge === 'innov') return { label: 'Co-create with MOAR', act: 'cocreate' };
  return { label: 'Explore a pilot', act: 'pilot' };
}

export const PROOF_METRICS: [string, string][] = [
  ['40+', 'Retailers supported'],
  ['12', 'Countries served'],
  ['8M+', 'SKUs managed'],
  ['2M+', 'Marketplace listings'],
  ['3,500+', 'Stores enabled'],
  ['60+', 'Digital catalogs built'],
  ['10+', 'Retail categories'],
  ['200+', 'Operators on the ground'],
];

export const ACTIVE_ENGAGEMENTS = [
  {
    title: 'Luxury Department Store & Convenience',
    subtitle: 'India Capability Center · established & scaling',
  },
  {
    title: 'Fortune 500 Auto Parts Retailer',
    subtitle: 'Operations & digital transformation',
  },
  {
    title: 'Aviation & Ground Handling',
    subtitle: 'Active advisory for GCC setups',
  },
];

export const ENGAGEMENT_FLOW = [
  {
    num: '01',
    title: 'Assess',
    desc: 'Diagnostic against your value chain. We map where capability meets the highest-value gaps.',
    dur: '1 to 3 weeks',
  },
  {
    num: '02',
    title: 'Pilot',
    desc: 'A scoped pilot on your own data, with a clear success metric agreed up front.',
    dur: '4 to 8 weeks',
  },
  {
    num: '03',
    title: 'Scale',
    desc: 'Roll the proven capability across categories, regions or stores with governance in place.',
    dur: 'A quarter',
  },
  {
    num: '04',
    title: 'Run',
    desc: 'We operate it with you, or hand over, under SLAs and a shared operating model.',
    dur: 'Ongoing',
  },
];

export const ASSURANCE_CARDS = [
  {
    id: 'security',
    title: 'Security',
    desc: 'Role-based access, encryption in transit and at rest, and least-privilege data handling.',
  },
  {
    id: 'governance',
    title: 'Data governance',
    desc: 'Your data stays yours. Clear retention, residency and audit trails on every workflow.',
  },
  {
    id: 'deployment',
    title: 'Deployment',
    desc: 'Cloud, private cloud or in your tenancy. Human review on any customer-facing output.',
  },
  {
    id: 'methodology',
    title: 'Methodology',
    desc: 'Operator-led delivery with defined gates, RAID governance and measurable outcomes.',
  },
];

export const MOAR_EMAIL = 'harsha.nandakumar@moaradvisory.com';

/* ============================================================================
   PHASE 1 PRD & PROJECT PLAN DATA (Product Manager Lens — Prince)
   ============================================================================ */
export const PRD_METADATA = {
  title: 'MOAR RetailOS — Phase 1 PRD & Project Plan',
  status: 'Review draft · 24 October 2026',
  owner: 'Prince (Product Manager)',
  basis: "Client's existing HTML prototype and the supplied scope discussion",
  product: "Public retail solution showcase, hosted as part of the client's existing website",
  recipientEmail: 'harsha.nandakumar@moaradvisory.com',
  goal: "Replace a static sales-deck-only experience with a guided, interactive website where prospects discover MOAR's retail solutions, understand the business scenarios they address, and express interest. Release one is a public, no-login experience; a personalized 'experience center' is a later phase and is not included here.",
  importantDisclaimer:
    'The supplied first-phase build includes a browser-based visual preview of AI Product Imagery, not a live image-generation model. Enabling a production AI demo requires approved assets, separate model/API decisions and data-handling requirements.',
};

export const PRD_SCOPE_TABLE = [
  {
    area: 'Retail lifecycle',
    criteria:
      'Nine clickable stages: Discover, Plan, Source, Merchandise, Catalog, Marketplace, Store, Customer, Returns. Selecting a stage shows context and relevant solutions.',
    status: 'Implemented in Phase 1 Prototype',
    pmNote: 'Central horizontal value-chain bar acts as the primary mental model for retail operators.',
  },
  {
    area: 'Solution library',
    criteria:
      'Full searchable, filterable list on the homepage; 23 capabilities from the supplied prototype retained plus 3 requested capabilities added (26 total).',
    status: '26 Total (23 Prototype + 3 Added)',
    pmNote: 'Supports toggle between 26 Phase 1 Scope and 23 Original Prototype items for stakeholder clarity.',
  },
  {
    area: 'Priority solutions',
    criteria:
      'Detailed examples for AI Catalog Intelligence, Space Planning / Planograms, Geo-Intelligence, and AI Product Imagery.',
    status: '4 Priority Showcases Built',
    pmNote: 'First 3 prioritized for core business value; AI Product Imagery highlighted as easiest to test/demo.',
  },
  {
    area: 'Solution details',
    criteria:
      'Each solution has a dedicated view with the challenge, approach, potential value, capabilities, related solutions, and next-step CTA.',
    status: 'Implemented for all 26',
    pmNote: 'Includes v9 dual-badge governance (Maturity + Experience Today) and honest proof attribution.',
  },
  {
    area: 'Visual examples',
    criteria:
      'Priority solutions have interactive, selectable before-and-after illustrative imagery. These examples are concepts, not actual client performance or live AI execution.',
    status: 'Interactive Before/After Studio',
    pmNote: 'Explicitly labeled as illustrative concepts to protect enterprise trust before client asset sign-off.',
  },
  {
    area: 'Leads / email',
    criteria:
      '“Connect with us” collects name, work email, company, area of interest and optional message. Submit to a same-site endpoint that emails the client team.',
    status: 'API Endpoint + Mailto Fallback',
    pmNote: 'Next.js /api/lead route mirrors lead-handler.php with honeypot check + mailto fallback.',
  },
  {
    area: 'Branding and hosting',
    criteria:
      'Use the MOAR look suggested by the existing HTML (navy / blue / cyan / yellow), pending approved brand guidelines. Publish under the existing website and hosting; no new domain.',
    status: 'Minimalist Eye-Easy Navy/Slate + Daylight',
    pmNote: 'Can mount at /retail-showcase/ on existing domain; refined contrast for executive readability.',
  },
  {
    area: 'Accessibility and mobile',
    criteria:
      'Responsive layout, functional keyboard interaction, descriptive labels, validation, and clear privacy/contact consent.',
    status: 'WCAG Keyboard & Consent Ready',
    pmNote: 'Includes skip links, ARIA roles, keyboard Esc/Enter handlers, and explicit consent checkbox.',
  },
  {
    area: 'Authentication',
    criteria: 'No login, accounts, admin dashboard or personalized access in Phase 1.',
    status: 'Scoped Out (Phase 2)',
    pmNote: 'Prevents scope creep in Release 1; Phase 2 Experience Center requirements tracked in Pending Inputs.',
  },
];

export const PRD_WORKFLOWS = [
  {
    id: 'discovery',
    name: '1. Discovery Workflow',
    persona: 'Retail Executive / VP Merchandising / COO',
    steps: [
      'Website Landing',
      'Click Lifecycle Stage (01 Discover – 09 Returns)',
      'Preview Stage Context & Filtered Solutions',
      'Open Solution Detail View',
      'Review Interactive Before/After Visual Example',
      'Connect With Us (Scoped Enquiry)',
    ],
    pmInsight:
      'Reduces cognitive load for executives who think in terms of where their operational bottleneck lives (e.g., "Catalog" or "Store") rather than MOAR internal product names.',
  },
  {
    id: 'search',
    name: '2. Search & Filter Workflow',
    persona: 'CDO / Head of Ecommerce / Transformation Lead',
    steps: [
      'Website Capability Library',
      'Search or Filter by Role, Business Outcome, Domain, or Build Type',
      'Open Capability Detail View',
      'Inspect Capabilities, Case Briefing & "Works Together With" Graph',
      'Connect With Us',
    ],
    pmInsight:
      'Supports solution-oriented buyers looking for a specific technology (e.g., "GenAI", "Digital Atlas") or business outcome (e.g., "Margin Improvement").',
  },
  {
    id: 'enquiry',
    name: '3. Enquiry & Lead Delivery Workflow',
    persona: 'Prospective Client → MOAR Advisory Team',
    steps: [
      'Visitor Completes Modal Form (Name, Work Email, Company, Area of Interest, Message, Consent)',
      'Browser POSTs to Same-Site Endpoint (/api/lead or lead-handler.php)',
      'Server Validates Input, Checks Honeypot Spam Field & Dispatches Notification Email',
      'Visitor Sees Confirmed Submission State (or Automatic Mailto Draft Fallback if Offline)',
    ],
    pmInsight:
      'Context-aware CTA passes the exact capability name and maturity action (e.g., "Explore a pilot: Catalog AI Studio") so MOAR operators know the exact intent.',
  },
];

export const PRD_MILESTONES = [
  {
    code: 'M0',
    name: 'Requirements & asset collection',
    activities: 'Confirm stakeholders, hosting stack, brand, approved copy, solution priority, photos and examples.',
    gate: 'Scope/asset sign-off.',
    status: 'In Review (Current)',
  },
  {
    code: 'M1',
    name: 'Experience design',
    activities: 'Lifecycle wireframe, information architecture, solution detail template, lead journey and responsive UI.',
    gate: 'Client approval of UI prototype.',
    status: 'Draft Prototype Ready',
  },
  {
    code: 'M2',
    name: 'Showcase implementation',
    activities: 'Build full solution library, search and filters, detailed views, four illustrative before/after previews.',
    gate: 'Content and interaction QA.',
    status: 'Built in Review App',
  },
  {
    code: 'M3',
    name: 'Contact and website integration',
    activities: 'Configure client-approved notification mailbox, connect live mail endpoint on existing hosting, adapt site header/footer and policies.',
    gate: 'Verified live delivery test.',
    status: 'Pending Hosting & SMTP',
  },
  {
    code: 'M4',
    name: 'UAT & launch',
    activities: 'Test mobile/desktop, keyboard navigation, browsers, forms, broken links, actual brand assets and final content.',
    gate: 'Client acceptance and launch approval.',
    status: 'Upcoming',
  },
];

export const PRD_PENDING_INPUTS = [
  {
    num: '01',
    category: 'Brand',
    priority: 'High (Blocks M1/M3)',
    request:
      'Official logo/wordmark, color palette, fonts, UI rules, footer and legal text, existing website URL and navigation integration conventions.',
    pmQuestionForClient:
      'Should `/retail-showcase/` inherit the parent website header/footer verbatim, or use this standalone MOAR RetailOS sub-navigation?',
  },
  {
    num: '02',
    category: 'Assets',
    priority: 'High (Blocks M2)',
    request:
      'Authorized before/after images, planogram samples, catalog input/output records, anonymized geo dashboards or maps, product imagery originals/outputs, approved brand and case-study claims.',
    pmQuestionForClient:
      'Which client-sanitized before/after visuals are cleared for public web display across the 4 priority solutions?',
  },
  {
    num: '03',
    category: 'Copy & prioritization',
    priority: 'Medium (Blocks M2)',
    request:
      'Approved names/descriptions for every listed capability, maturity labels if desired, and the most important target industries/personas.',
    pmQuestionForClient:
      'Do you approve the v9 dual-badge taxonomy (Maturity: Available/Pilot/Early/Soon/Innovation + Experience: Walkthrough/Pilot Ready/Concept) across all 26 items?',
  },
  {
    num: '04',
    category: 'Interactions',
    priority: 'High (Blocks M2)',
    request:
      'Should each solution contain a video, clickable prototype, static comparison, embedded app or live data-driven demo? What is approved for the four priorities?',
    pmQuestionForClient:
      'For AI Catalog Intelligence, Space Planning, Geo-Intelligence, and AI Product Imagery: do we ship curated interactive before/after comparisons in Phase 1, or embed recorded operator walkthrough videos?',
  },
  {
    num: '05',
    category: 'Email workflow',
    priority: 'Medium (Blocks M3)',
    request:
      'Confirm notification recipient(s), outbound mail service, consent/privacy wording, spam protection, and whether contact requests should be stored in a CRM.',
    pmQuestionForClient:
      'Is `harsha.nandakumar@moaradvisory.com` the final production recipient, and should leads also webhook into HubSpot/Salesforce?',
  },
  {
    num: '06',
    category: 'Later login (Phase 2 Discovery)',
    priority: 'Phase 2 Planning',
    request:
      'Define who logs in (prospect, client, internal team), which content/data unlocks, role-based permissions, onboarding, and the experience center’s purpose. These remain Phase 2 discovery items, not assumptions.',
    pmQuestionForClient:
      'When we scope Phase 2 Experience Center, is the primary user a MOAR sales presenter unlocking live client sandboxes during workshops, or a self-serve prospect uploading sample SKUs?',
  },
];

export const PRD_IMPLEMENTATION_NOTES = [
  'MOAR_RetailOS_Interactive_Showcase.html is a self-contained public interface (no application framework or database). It uses system/clean fonts in the review build, avoiding fragile external dependencies. Approved brand fonts can be integrated later.',
  'It can live at a path on the current website, e.g. /retail-showcase/, without a separate domain. Integration into the current site header/theme is subject to brand guidance.',
  'lead-handler.php (and Next.js /api/lead) is a small same-site email endpoint. If the existing website does not support PHP, replace the LEAD_ENDPOINT constant with a client-approved WordPress/API/serverless endpoint instead.',
  'The recipient in this draft is harsha.nandakumar@moaradvisory.com, carried over from the uploaded prototype; verify before launch.',
  'Email deliverability requires verified sender details and proper SMTP/SPF/DKIM configuration. Test actual receipt before publishing the form.',
  'The product visuals and dashboard values used to illustrate an experience are not certified production screenshots or actual measured impact; replace with approved examples before public launch.',
];

export const PRD_DEFINITION_OF_DONE = [
  'All 26 solutions are visible and navigable (23 from HTML prototype + 3 requested capabilities).',
  'Stage filter (all 9 lifecycle stages), library search/filter, detail navigation, example switches and responsive views work.',
  'The first four priority solution examples (AI Catalog Intelligence, Space Planning / Planograms, Geo-Intelligence, AI Product Imagery) are approved.',
  'Legal, privacy consent, and branding copy is approved.',
  'A real enquiry is received by the nominated mailbox during UAT.',
  'Analytics/tracking requirements have been agreed.',
  'The client signs off on launch.',
];

export const PM_ANALYSIS_CARDS = [
  {
    title: '1. Why the v9 "Accuracy Layer" in the Prototype is Crucial',
    tag: 'Trust & Positioning',
    summary:
      'Enterprise retail buyers (CEOs, CDOs, CMOs) immediately lose trust if a button says "Try Live Demo" and opens a static contact form.',
    detail:
      'The prototype’s v9 accuracy layer solves this by separating Maturity (Available, Client Pilot, Early Access, Coming Soon, Innovation) from Experience Status (Guided Walkthrough, Pilot Ready, Illustrative Concept, Co-creation Opportunity) and tailoring the CTA verb ("Explore a pilot", "Meet the solution team", "Discuss the use case"). We preserve this 100% in the Next.js build.',
  },
  {
    title: '2. Bridging the 23 → 26 Capability Count & Priority 4 Focus',
    tag: 'Scope Alignment',
    summary:
      'The supplied HTML script hardcoded 23 capabilities in SOL[], while the Phase 1 PRD specifies 23 retained + 3 added = 26 total, spotlighting 4 Priority Solutions.',
    detail:
      'In this Next.js application, we retain all 23 prototype capabilities word-for-word and add the 3 requested Phase 1 capabilities (AI Catalog Intelligence, Space Planning & Planograms, AI Product Imagery) with interactive before/after visual studios—plus a 1-click scope toggle so stakeholders can inspect either the 26 Phase 1 set or the 23 original HTML set.',
  },
  {
    title: '3. Eye-Easy Minimalist Design vs. Heavy Dark Glows',
    tag: 'UX & Visual Ergonomics',
    summary:
      'Enterprise buyers spend 8–15 minutes comparing capabilities and reading executive case briefings. High-saturation neon glows on pure #05080F black cause visual fatigue.',
    detail:
      'We re-engineered the visual hierarchy using calm, matte slate-navy surfaces, balanced typographic contrast, generous whitespace, and a 1-click Daylight / Calm Slate theme switcher—retaining MOAR’s signature navy, blue, cyan, and amber accents while making long-form analysis effortless on the eyes.',
  },
  {
    title: '4. Phase 1 Public Showcase vs. Phase 2 Experience Center Boundary',
    tag: 'Roadmap Discipline',
    summary:
      'Launching without login in Phase 1 gets MOAR out of static sales decks immediately without waiting on IAM, multi-tenant sandboxes, or live GPU inference costs.',
    detail:
      'By using deterministic browser-based before/after visual studios for the 4 priority solutions (clearly badged as Illustrative Concepts), MOAR can validate prospect demand and capture qualified leads now, using actual enquiry data to prioritize which live AI sandboxes to build in Phase 2.',
  },
];
