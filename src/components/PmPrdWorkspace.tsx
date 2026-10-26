'use client';

import React, { useState } from 'react';
import {
  SOL,
  STAGES,
  BADGES,
  DOMAINS,
  PRD_METADATA,
  PRD_SCOPE_TABLE,
  PRD_WORKFLOWS,
  PRD_MILESTONES,
  PRD_PENDING_INPUTS,
  PRD_IMPLEMENTATION_NOTES,
  PRD_DEFINITION_OF_DONE,
  PM_ANALYSIS_CARDS,
  BadgeKey,
} from '@/data/retailos-data';
import {
  ClipboardCheck,
  FileText,
  GitBranch,
  Layers,
  Milestone,
  CheckCircle2,
  AlertCircle,
  Copy,
  Check,
  ArrowUpRight,
  Compass,
  BarChart3,
  ShieldAlert,
  Sparkles,
} from 'lucide-react';

interface PmPrdWorkspaceProps {
  onOpenSolution: (id: string) => void;
  onSwitchToShowcase: () => void;
  onOpenEnquiry: (capId: string | null, type: string) => void;
}

export default function PmPrdWorkspace({
  onOpenSolution,
  onSwitchToShowcase,
  onOpenEnquiry,
}: PmPrdWorkspaceProps) {
  const [activeSection, setActiveSection] = useState<
    'overview' | 'scope' | 'workflows' | 'milestones' | 'inputs' | 'dod'
  >('overview');
  const [checkedDod, setCheckedDod] = useState<Record<number, boolean>>({
    0: true,
    1: true,
    2: false,
    3: false,
    4: false,
    5: false,
    6: false,
  });
  const [copiedEmail, setCopiedEmail] = useState(false);

  // Portfolio PM telemetry computed from SOL
  const totalCount = SOL.length; // 26
  const prototypeCount = SOL.filter((s) => !s.prdAddition).length; // 23
  const addedCount = SOL.filter((s) => s.prdAddition).length; // 3
  const moarBuiltCount = SOL.filter((s) => s.source === 'moar').length;
  const partnerCount = SOL.filter((s) => s.source === 'partner').length;
  const aiCount = SOL.filter((s) => s.ai).length;

  const badgeBreakdown = (['available', 'pilot', 'early', 'soon', 'innov'] as BadgeKey[]).map(
    (b) => ({
      key: b,
      label: BADGES[b],
      count: SOL.filter((s) => s.badge === b).length,
    })
  );

  const clientFollowUpDraft = `Subject: MOAR RetailOS Phase 1 Showcase — PRD Sign-Off, Brand Guidelines & Priority Assets Request

Hi Team,

Following up on the HTML prototype and our Phase 1 scope alignment, I have prepared the interactive MOAR RetailOS Phase 1 Showcase and PRD/Project Plan for your review.

Phase 1 Scope Summary (Public, No-Login Release):
• 9 Interactive Retail Value Chain Stages (Discover → Returns) with stage context and filtering
• 26 Total Capabilities in the searchable library (23 from the prototype + 3 added: AI Catalog Intelligence, Space Planning & Planograms, AI Product Imagery)
• Priority Before/After Visual Studios for AI Catalog Intelligence, Space Planning / Planograms, Geo-Intelligence, and AI Product Imagery
• Same-site "Connect with us" enquiry workflow routing to ${PRD_METADATA.recipientEmail}

To unlock Milestones M1–M3, could you please share or confirm the following 6 pending inputs?
1. Brand & Navigation: Official logo/wordmark, approved palette/fonts, legal footer text, and how /retail-showcase/ should integrate with the existing site header.
2. Approved Visual Assets: Authorized before/after imagery, planogram samples, catalog records, and geo maps to replace the illustrative concepts before launch.
3. Copy & Maturity Labels: Sign-off on capability descriptions and our dual-badge labels (Maturity + Experience Today).
4. Priority Interactions: Confirm whether the browser-based before/after visual studios meet Phase 1 expectations for the 4 priority solutions or if video walkthroughs should be embedded.
5. Email & CRM Workflow: Confirm ${PRD_METADATA.recipientEmail} as final recipient, SMTP/SPF/DKIM setup on existing hosting, and privacy consent copy.
6. Phase 2 Discovery (Later Login / Experience Center): Initial thoughts on target user roles and gated content for Phase 2 so we keep Phase 1 cleanly decoupled.

Best regards,
Prince
Product Manager · MOAR RetailOS`;

  const copyClientEmail = () => {
    navigator.clipboard.writeText(clientFollowUpDraft);
    setCopiedEmail(true);
    setTimeout(() => setCopiedEmail(false), 2500);
  };

  return (
    <div className="mx-auto max-w-[1200px] px-5 py-10 sm:px-7">
      {/* Top PM Header Card */}
      <div className="rounded-2xl border border-[var(--line-2)] bg-[var(--surface-1)] p-6 sm:p-8">
        <div className="flex flex-wrap items-center justify-between gap-3">
          <div className="inline-flex items-center gap-2 rounded-full border border-[var(--line-2)] bg-[var(--surface-2)] px-3.5 py-1 text-xs font-semibold uppercase tracking-wider text-[var(--accent-cyan)]">
            <Compass className="h-3.5 w-3.5" />
            <span>Product Manager Workbench · Prince</span>
          </div>
          <div className="flex items-center gap-2 text-xs text-[var(--sub)]">
            <span className="rounded-md border border-amber-500/30 bg-amber-500/10 px-2.5 py-1 font-medium text-amber-400">
              {PRD_METADATA.status}
            </span>
            <button
              onClick={onSwitchToShowcase}
              className="inline-flex items-center gap-1.5 rounded-lg bg-[var(--accent-blue)] px-3.5 py-1.5 font-semibold text-white transition hover:opacity-95"
            >
              <span>View Live Showcase</span>
              <ArrowUpRight className="h-3.5 w-3.5" />
            </button>
          </div>
        </div>

        <h1 className="mt-4 font-display text-2xl font-bold tracking-tight text-[var(--ink)] sm:text-4xl">
          {PRD_METADATA.title}
        </h1>
        <p className="mt-3 max-w-3xl text-sm leading-relaxed text-[var(--sub)] sm:text-base">
          {PRD_METADATA.goal}
        </p>

        <div className="mt-5 grid grid-cols-1 gap-3 border-t border-[var(--line)] pt-5 text-xs sm:grid-cols-3">
          <div className="rounded-xl border border-[var(--line)] bg-[var(--surface-2)] p-3.5">
            <div className="font-semibold uppercase tracking-wider text-[var(--mut)]">Basis</div>
            <div className="mt-1 font-medium text-[var(--ink)]">{PRD_METADATA.basis}</div>
          </div>
          <div className="rounded-xl border border-[var(--line)] bg-[var(--surface-2)] p-3.5">
            <div className="font-semibold uppercase tracking-wider text-[var(--mut)]">
              Product &amp; Hosting
            </div>
            <div className="mt-1 font-medium text-[var(--ink)]">{PRD_METADATA.product}</div>
          </div>
          <div className="rounded-xl border border-[var(--line)] bg-[var(--surface-2)] p-3.5">
            <div className="font-semibold uppercase tracking-wider text-[var(--mut)]">
              Designated Lead Recipient
            </div>
            <div className="mt-1 font-mono font-medium text-[var(--accent-cyan)]">
              {PRD_METADATA.recipientEmail}
            </div>
          </div>
        </div>

        {/* Important Governance Callout from PRD */}
        <div className="mt-4 flex items-start gap-3 rounded-xl border border-amber-500/30 bg-amber-500/10 p-4 text-xs leading-relaxed text-amber-300">
          <ShieldAlert className="mt-0.5 h-4 w-4 shrink-0 text-amber-400" />
          <div>
            <strong className="font-semibold text-amber-200">Important Phase 1 Note: </strong>
            {PRD_METADATA.importantDisclaimer}
          </div>
        </div>
      </div>

      {/* Sub-navigation Tabs for PM Analysis & PRD Sections */}
      <div className="mt-6 flex flex-wrap gap-2 border-b border-[var(--line)] pb-4">
        {[
          { id: 'overview', label: 'PM Analysis & Portfolio Audit', icon: BarChart3 },
          { id: 'scope', label: '1–2. Goal & Phase 1 Scope', icon: Layers },
          { id: 'workflows', label: '3. User Workflows', icon: GitBranch },
          { id: 'milestones', label: '4. Milestones (M0–M4)', icon: Milestone },
          { id: 'inputs', label: '5. Pending Client Inputs (6)', icon: AlertCircle },
          { id: 'dod', label: '6–7. Notes & Definition of Done', icon: ClipboardCheck },
        ].map((tab) => {
          const Icon = tab.icon;
          const on = activeSection === tab.id;
          return (
            <button
              key={tab.id}
              onClick={() => setActiveSection(tab.id as typeof activeSection)}
              className={`inline-flex items-center gap-2 rounded-xl px-4 py-2.5 text-xs font-semibold transition ${
                on
                  ? 'bg-[var(--accent-blue)] text-white shadow-xs'
                  : 'border border-[var(--line)] bg-[var(--surface-1)] text-[var(--sub)] hover:border-[var(--line-2)] hover:text-[var(--ink)]'
              }`}
            >
              <Icon className="h-3.5 w-3.5" />
              <span>{tab.label}</span>
            </button>
          );
        })}
      </div>

      {/* SECTION 1: PM ANALYSIS & PORTFOLIO AUDIT */}
      {activeSection === 'overview' && (
        <div className="mt-7 space-y-7">
          {/* Quantitative Portfolio Breakdown */}
          <div className="grid grid-cols-2 gap-4 sm:grid-cols-4">
            <div className="rounded-2xl border border-[var(--line)] bg-[var(--surface-1)] p-5">
              <div className="text-xs font-medium text-[var(--mut)]">Total Phase 1 Capabilities</div>
              <div className="mt-2 font-display text-3xl font-bold text-[var(--ink)]">
                {totalCount}
              </div>
              <div className="mt-1 text-xs text-[var(--accent-cyan)]">
                {prototypeCount} HTML Prototype + {addedCount} PRD Additions
              </div>
            </div>
            <div className="rounded-2xl border border-[var(--line)] bg-[var(--surface-1)] p-5">
              <div className="text-xs font-medium text-[var(--mut)]">Delivery Ownership Split</div>
              <div className="mt-2 font-display text-3xl font-bold text-[var(--ink)]">
                {moarBuiltCount} / {partnerCount}
              </div>
              <div className="mt-1 text-xs text-[var(--sub)]">
                {moarBuiltCount} MOAR-built · {partnerCount} Partner (Propheus)
              </div>
            </div>
            <div className="rounded-2xl border border-[var(--line)] bg-[var(--surface-1)] p-5">
              <div className="text-xs font-medium text-[var(--mut)]">AI-Enabled Capabilities</div>
              <div className="mt-2 font-display text-3xl font-bold text-[var(--ink)]">
                {aiCount} <span className="text-lg font-normal text-[var(--mut)]">/ {totalCount}</span>
              </div>
              <div className="mt-1 text-xs text-[var(--sub)]">
                {Math.round((aiCount / totalCount) * 100)}% leverage Computer Vision, LLMs, or ML
              </div>
            </div>
            <div className="rounded-2xl border border-[var(--line)] bg-[var(--surface-1)] p-5">
              <div className="text-xs font-medium text-[var(--mut)]">Priority Visual Showcases</div>
              <div className="mt-2 font-display text-3xl font-bold text-[var(--accent-cyan)]">
                4
              </div>
              <div className="mt-1 text-xs text-[var(--sub)]">
                Catalog, Space/Planograms, Geo, Imagery
              </div>
            </div>
          </div>

          {/* Priority 4 Quick-Launch Cards */}
          <div className="rounded-2xl border border-[var(--line-2)] bg-[var(--surface-1)] p-6">
            <div className="flex flex-wrap items-center justify-between gap-2">
              <div>
                <div className="text-xs font-semibold uppercase tracking-wider text-[var(--accent-cyan)]">
                  Phase 1 Focus Areas
                </div>
                <h2 className="mt-1 font-display text-xl font-bold text-[var(--ink)]">
                  The 4 Priority Solutions &amp; Interactive Visual Previews
                </h2>
              </div>
              <span className="text-xs text-[var(--mut)]">
                Click any priority capability to inspect its detail view &amp; before/after studio
              </span>
            </div>

            <div className="mt-5 grid grid-cols-1 gap-4 md:grid-cols-2 lg:grid-cols-4">
              {[
                {
                  id: 'ai_catalog_intel',
                  title: 'AI Catalog Intelligence',
                  role: 'Priority #1 · Catalog Stage',
                  why: 'Extracts 20+ structured attributes, taxonomy, and QA scores from raw vendor feeds.',
                },
                {
                  id: 'space_planning',
                  title: 'Space Planning & Planograms',
                  role: 'Priority #2 · Plan / Merchandise',
                  why: 'Cluster-specific bay planograms optimized for GMROS and shelf stockout reduction.',
                },
                {
                  id: 'geo_intel',
                  title: 'Geo-Intelligence',
                  role: 'Priority #3 · Discover / Plan',
                  why: '250+ multimodal signals across 1.2 × 0.6 km micro-markets for site selection.',
                },
                {
                  id: 'ai_product_imagery',
                  title: 'AI Product Imagery',
                  role: 'Priority #4 · Easiest to Test/Demo',
                  why: 'Browser-based before/after studio showing packshot-to-model & 4 channel ratios.',
                },
              ].map((item) => (
                <div
                  key={item.id}
                  onClick={() => onOpenSolution(item.id)}
                  className="group cursor-pointer rounded-xl border border-[var(--line)] bg-[var(--surface-2)] p-4 transition hover:border-[var(--accent-blue)]"
                >
                  <div className="flex items-center justify-between text-[11px] font-semibold text-[var(--accent-cyan)]">
                    <span>{item.role}</span>
                    <ArrowUpRight className="h-3.5 w-3.5 transition group-hover:translate-x-0.5 group-hover:-translate-y-0.5" />
                  </div>
                  <h3 className="mt-2 font-display text-base font-bold text-[var(--ink)]">
                    {item.title}
                  </h3>
                  <p className="mt-1.5 text-xs leading-relaxed text-[var(--sub)]">{item.why}</p>
                  <div className="mt-3 inline-flex items-center gap-1 text-xs font-semibold text-[var(--accent-blue)]">
                    <span>Open visual preview</span>
                    <span>→</span>
                  </div>
                </div>
              ))}
            </div>
          </div>

          {/* 4 PM Strategic Analysis Cards */}
          <div>
            <h2 className="font-display text-xl font-bold text-[var(--ink)]">
              Product Manager Analysis of the Prototype &amp; Architecture
            </h2>
            <p className="mt-1 text-xs text-[var(--sub)]">
              Key product decisions embedded into this Next.js build to de-risk Phase 1 launch and maximize executive conversion.
            </p>
            <div className="mt-4 grid grid-cols-1 gap-4 md:grid-cols-2">
              {PM_ANALYSIS_CARDS.map((card, i) => (
                <div
                  key={i}
                  className="rounded-2xl border border-[var(--line)] bg-[var(--surface-1)] p-5"
                >
                  <span className="inline-block rounded-md border border-[var(--line-2)] bg-[var(--surface-2)] px-2.5 py-0.5 text-[11px] font-semibold text-[var(--accent-cyan)]">
                    {card.tag}
                  </span>
                  <h3 className="mt-3 font-display text-base font-bold text-[var(--ink)]">
                    {card.title}
                  </h3>
                  <p className="mt-2 text-xs font-medium leading-relaxed text-[var(--ink)]">
                    {card.summary}
                  </p>
                  <p className="mt-2 text-xs leading-relaxed text-[var(--sub)]">{card.detail}</p>
                </div>
              ))}
            </div>
          </div>

          {/* Value Chain Stage Coverage Matrix & Maturity Distribution */}
          <div className="grid grid-cols-1 gap-5 lg:grid-cols-2">
            <div className="rounded-2xl border border-[var(--line)] bg-[var(--surface-1)] p-6">
              <h3 className="font-display text-base font-bold text-[var(--ink)]">
                Value Chain Coverage (All 9 Stages)
              </h3>
              <p className="mt-1 text-xs text-[var(--sub)]">
                Number of capabilities mapped to each stage of the retail lifecycle.
              </p>
              <div className="mt-4 space-y-2.5">
                {STAGES.map((st) => {
                  const count = SOL.filter((s) => s.stages.includes(st.key)).length;
                  const pct = Math.min(100, Math.round((count / 8) * 100));
                  return (
                    <div key={st.key} className="space-y-1">
                      <div className="flex items-center justify-between text-xs">
                        <span className="font-medium text-[var(--ink)]">
                          <span className="mr-2 font-mono text-[var(--mut)]">{st.num}</span>
                          {st.label}
                        </span>
                        <span className="font-mono text-xs text-[var(--accent-cyan)]">
                          {count} {count === 1 ? 'capability' : 'capabilities'}
                        </span>
                      </div>
                      <div className="h-1.5 w-full overflow-hidden rounded-full bg-[var(--surface-2)]">
                        <div
                          className="h-full rounded-full bg-[var(--accent-blue)]"
                          style={{ width: `${pct}%` }}
                        />
                      </div>
                    </div>
                  );
                })}
              </div>
            </div>

            <div className="rounded-2xl border border-[var(--line)] bg-[var(--surface-1)] p-6">
              <h3 className="font-display text-base font-bold text-[var(--ink)]">
                Portfolio Maturity Distribution
              </h3>
              <p className="mt-1 text-xs text-[var(--sub)]">
                Honest maturity labeling ensures prospects know whether they are booking a live pilot or shaping an early concept.
              </p>
              <div className="mt-4 space-y-3">
                {badgeBreakdown.map((b) => (
                  <div
                    key={b.key}
                    className="flex items-center justify-between rounded-xl border border-[var(--line)] bg-[var(--surface-2)] px-4 py-3"
                  >
                    <div className="flex items-center gap-3">
                      <span className={`bdg ${b.key}`}>{b.label}</span>
                      <span className="text-xs text-[var(--sub)]">
                        {b.key === 'available' && 'Ready for immediate guided walkthrough & deployment'}
                        {b.key === 'pilot' && 'Proven in client pilots; ready to scope on prospect data'}
                        {b.key === 'early' && 'Early access build available for design partners'}
                        {b.key === 'soon' && 'Roadmap capability open for use-case alignment'}
                        {b.key === 'innov' && 'Next-horizon innovation & co-creation opportunity'}
                      </span>
                    </div>
                    <span className="font-display text-base font-bold text-[var(--ink)]">
                      {b.count}
                    </span>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </div>
      )}

      {/* SECTION 2: GOAL & PHASE 1 SCOPE TABLE */}
      {activeSection === 'scope' && (
        <div className="mt-7 space-y-6">
          <div className="rounded-2xl border border-[var(--line)] bg-[var(--surface-1)] p-6">
            <h2 className="font-display text-xl font-bold text-[var(--ink)]">
              2. Phase 1 Scope &amp; Acceptance Criteria
            </h2>
            <p className="mt-1 text-xs text-[var(--sub)]">
              Complete requirement traceability matrix from the Phase 1 PRD draft (24 October 2026).
            </p>

            <div className="mt-5 overflow-x-auto">
              <table className="w-full border-collapse text-left text-xs">
                <thead>
                  <tr className="border-b border-[var(--line-2)] text-[11px] font-semibold uppercase tracking-wider text-[var(--mut)]">
                    <th className="py-3 pr-4">Area</th>
                    <th className="py-3 px-4">Behavior / Acceptance Criteria</th>
                    <th className="py-3 px-4">Build Status</th>
                    <th className="py-3 pl-4">PM Analysis Note</th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-[var(--line)]">
                  {PRD_SCOPE_TABLE.map((row, idx) => (
                    <tr key={idx} className="align-top">
                      <td className="py-4 pr-4 font-semibold text-[var(--ink)] whitespace-nowrap">
                        {row.area}
                      </td>
                      <td className="py-4 px-4 leading-relaxed text-[var(--sub)]">
                        {row.criteria}
                      </td>
                      <td className="py-4 px-4 whitespace-nowrap">
                        <span className="inline-flex items-center gap-1.5 rounded-full border border-emerald-500/30 bg-emerald-500/10 px-2.5 py-0.5 text-[11px] font-medium text-emerald-400">
                          <CheckCircle2 className="h-3 w-3" />
                          {row.status}
                        </span>
                      </td>
                      <td className="py-4 pl-4 leading-relaxed text-[var(--mut)]">{row.pmNote}</td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </div>
        </div>
      )}

      {/* SECTION 3: USER WORKFLOWS */}
      {activeSection === 'workflows' && (
        <div className="mt-7 space-y-5">
          {PRD_WORKFLOWS.map((wf) => (
            <div
              key={wf.id}
              className="rounded-2xl border border-[var(--line)] bg-[var(--surface-1)] p-6"
            >
              <div className="flex flex-wrap items-center justify-between gap-2">
                <h3 className="font-display text-lg font-bold text-[var(--ink)]">{wf.name}</h3>
                <span className="rounded-full border border-[var(--line-2)] bg-[var(--surface-2)] px-3 py-1 text-xs font-medium text-[var(--accent-cyan)]">
                  Primary Persona: {wf.persona}
                </span>
              </div>

              <div className="mt-5 flex flex-wrap items-center gap-2">
                {wf.steps.map((step, i) => (
                  <React.Fragment key={i}>
                    <div className="flex items-center gap-2.5 rounded-xl border border-[var(--line-2)] bg-[var(--surface-2)] px-3.5 py-2.5 text-xs font-medium text-[var(--ink)]">
                      <span className="flex h-5 w-5 items-center justify-center rounded-full bg-[var(--accent-blue)] text-[10px] font-bold text-white">
                        {i + 1}
                      </span>
                      <span>{step}</span>
                    </div>
                    {i < wf.steps.length - 1 && (
                      <span className="text-sm font-bold text-[var(--mut)]">→</span>
                    )}
                  </React.Fragment>
                ))}
              </div>

              <div className="mt-4 rounded-xl border border-[var(--line)] bg-[var(--surface-2)] p-3.5 text-xs text-[var(--sub)]">
                <strong className="text-[var(--ink)]">PM Workflow Rationale: </strong>
                {wf.pmInsight}
              </div>
            </div>
          ))}
        </div>
      )}

      {/* SECTION 4: MILESTONES (M0-M4) */}
      {activeSection === 'milestones' && (
        <div className="mt-7 space-y-5">
          <div className="rounded-2xl border border-[var(--line)] bg-[var(--surface-1)] p-6">
            <div className="flex flex-wrap items-center justify-between gap-2">
              <div>
                <h2 className="font-display text-xl font-bold text-[var(--ink)]">
                  4. Suggested Milestones &amp; Review Gates (M0–M4)
                </h2>
                <p className="mt-1 text-xs text-[var(--sub)]">
                  Work can overlap; dates depend on approval turnaround, source content, current website stack, and who owns hosting deployment.
                </p>
              </div>
            </div>

            <div className="mt-6 space-y-4">
              {PRD_MILESTONES.map((ms) => (
                <div
                  key={ms.code}
                  className="grid grid-cols-1 gap-4 rounded-xl border border-[var(--line)] bg-[var(--surface-2)] p-5 md:grid-cols-12 md:items-center"
                >
                  <div className="md:col-span-3">
                    <span className="inline-block rounded-md bg-[var(--accent-blue)] px-2.5 py-1 font-mono text-xs font-bold text-white">
                      {ms.code}
                    </span>
                    <h3 className="mt-2 font-display text-base font-bold text-[var(--ink)]">
                      {ms.name}
                    </h3>
                    <span className="mt-1 inline-block text-[11px] font-medium text-[var(--accent-cyan)]">
                      {ms.status}
                    </span>
                  </div>
                  <div className="md:col-span-6">
                    <div className="text-[11px] font-semibold uppercase tracking-wider text-[var(--mut)]">
                      Activities
                    </div>
                    <p className="mt-1 text-xs leading-relaxed text-[var(--sub)]">
                      {ms.activities}
                    </p>
                  </div>
                  <div className="rounded-lg border border-[var(--line)] bg-[var(--surface-1)] p-3.5 md:col-span-3">
                    <div className="text-[10px] font-semibold uppercase tracking-wider text-amber-400">
                      Review Gate
                    </div>
                    <div className="mt-1 text-xs font-semibold text-[var(--ink)]">{ms.gate}</div>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>
      )}

      {/* SECTION 5: PENDING CLIENT INPUTS & CLIENT EMAIL GENERATOR */}
      {activeSection === 'inputs' && (
        <div className="mt-7 space-y-6">
          <div className="rounded-2xl border border-[var(--line-2)] bg-[var(--surface-1)] p-6">
            <div className="flex flex-wrap items-center justify-between gap-4">
              <div>
                <h2 className="font-display text-xl font-bold text-[var(--ink)]">
                  5. Pending Inputs from the Client (6 Action Areas)
                </h2>
                <p className="mt-1 text-xs text-[var(--sub)]">
                  As Prince (PM), use this checklist and pre-drafted stakeholder request to collect brand guidance, example assets, and interaction sign-off.
                </p>
              </div>
              <button
                onClick={copyClientEmail}
                className="inline-flex items-center gap-2 rounded-xl bg-[var(--accent-blue)] px-4 py-2.5 text-xs font-semibold text-white transition hover:opacity-95"
              >
                {copiedEmail ? (
                  <>
                    <Check className="h-4 w-4" />
                    <span>Copied Stakeholder Email!</span>
                  </>
                ) : (
                  <>
                    <Copy className="h-4 w-4" />
                    <span>Copy Client Request Email</span>
                  </>
                )}
              </button>
            </div>

            <div className="mt-6 grid grid-cols-1 gap-4 md:grid-cols-2">
              {PRD_PENDING_INPUTS.map((inp) => (
                <div
                  key={inp.num}
                  className="flex flex-col justify-between rounded-xl border border-[var(--line)] bg-[var(--surface-2)] p-5"
                >
                  <div>
                    <div className="flex items-center justify-between gap-2">
                      <span className="font-mono text-xs font-bold text-[var(--accent-cyan)]">
                        #{inp.num} · {inp.category}
                      </span>
                      <span className="rounded-md border border-[var(--line-2)] bg-[var(--surface-1)] px-2 py-0.5 text-[10px] font-semibold text-amber-400">
                        {inp.priority}
                      </span>
                    </div>
                    <p className="mt-3 text-xs leading-relaxed text-[var(--ink)]">{inp.request}</p>
                  </div>
                  <div className="mt-4 rounded-lg border border-[var(--line)] bg-[var(--surface-1)] p-3 text-xs">
                    <span className="font-semibold text-[var(--accent-cyan)]">
                      Prince&apos;s Key Question:{' '}
                    </span>
                    <span className="text-[var(--sub)]">{inp.pmQuestionForClient}</span>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>
      )}

      {/* SECTION 6 & 7: IMPLEMENTATION NOTES & DEFINITION OF DONE */}
      {activeSection === 'dod' && (
        <div className="mt-7 grid grid-cols-1 gap-6 lg:grid-cols-2">
          <div className="rounded-2xl border border-[var(--line)] bg-[var(--surface-1)] p-6">
            <h2 className="font-display text-lg font-bold text-[var(--ink)]">
              6. Implementation Notes
            </h2>
            <ul className="mt-4 space-y-3 text-xs leading-relaxed text-[var(--sub)]">
              {PRD_IMPLEMENTATION_NOTES.map((note, idx) => (
                <li
                  key={idx}
                  className="flex items-start gap-2.5 rounded-xl border border-[var(--line)] bg-[var(--surface-2)] p-3.5"
                >
                  <FileText className="mt-0.5 h-4 w-4 shrink-0 text-[var(--accent-cyan)]" />
                  <span>{note}</span>
                </li>
              ))}
            </ul>
          </div>

          <div className="rounded-2xl border border-[var(--line)] bg-[var(--surface-1)] p-6">
            <div className="flex items-center justify-between">
              <h2 className="font-display text-lg font-bold text-[var(--ink)]">
                7. Definition of Done (Interactive Checklist)
              </h2>
              <span className="font-mono text-xs font-semibold text-[var(--accent-cyan)]">
                {Object.values(checkedDod).filter(Boolean).length} / {PRD_DEFINITION_OF_DONE.length}{' '}
                Ready
              </span>
            </div>
            <p className="mt-1 text-xs text-[var(--sub)]">
              Click items to toggle sign-off status during UAT &amp; launch readiness review.
            </p>
            <div className="mt-4 space-y-2.5">
              {PRD_DEFINITION_OF_DONE.map((item, idx) => {
                const done = !!checkedDod[idx];
                return (
                  <button
                    key={idx}
                    onClick={() =>
                      setCheckedDod((prev) => ({ ...prev, [idx]: !prev[idx] }))
                    }
                    className={`flex w-full items-start gap-3 rounded-xl border p-3.5 text-left text-xs transition ${
                      done
                        ? 'border-emerald-500/30 bg-emerald-500/10 text-[var(--ink)]'
                        : 'border-[var(--line)] bg-[var(--surface-2)] text-[var(--sub)] hover:border-[var(--line-2)]'
                    }`}
                  >
                    <div
                      className={`mt-0.5 flex h-4 w-4 shrink-0 items-center justify-center rounded border ${
                        done
                          ? 'border-emerald-400 bg-emerald-500 text-slate-950'
                          : 'border-[var(--mut)]'
                      }`}
                    >
                      {done && <Check className="h-3 w-3 stroke-[3]" />}
                    </div>
                    <span className="leading-relaxed">{item}</span>
                  </button>
                );
              })}
            </div>

            <div className="mt-5 border-t border-[var(--line)] pt-4">
              <button
                onClick={() => onOpenEnquiry(null, 'general')}
                className="w-full rounded-xl bg-[var(--accent-blue)] py-2.5 text-xs font-semibold text-white transition hover:opacity-95"
              >
                Test Live Lead / Email Enquiry Modal (UAT Gate) →
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
