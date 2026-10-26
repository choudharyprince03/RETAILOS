'use client';

import React from 'react';
import {
  Solution,
  DOMAINS,
  BADGES,
  OUT,
  BUILD_LABEL,
  PROOF_LABEL,
  QUALIFIER,
  EXP_NOTE,
  detailPrimary,
  byId,
} from '@/data/retailos-data';
import BeforeAfterStudio from './BeforeAfterStudio';
import ScrollReveal from './ScrollReveal';
import {
  ArrowLeft,
  ArrowRight,
  Sparkles,
  CheckCircle2,
  Clock,
  Layers,
  ShieldCheck,
} from 'lucide-react';

interface SolutionDetailViewProps {
  solution: Solution;
  onBack: () => void;
  onSelectSolution: (id: string) => void;
  onOpenRequest: (capId: string | null, type: string) => void;
}

export default function SolutionDetailView({
  solution: s,
  onBack,
  onSelectSolution,
  onOpenRequest,
}: SolutionDetailViewProps) {
  const dp = detailPrimary(s);
  const c = s.cs;

  return (
    <div className="relative z-10 mx-auto max-w-[1140px] px-5 pt-28 pb-24 sm:px-7">
      {/* Top Bar */}
      <div className="flex flex-wrap items-center justify-between gap-3">
        <button onClick={onBack} className="btn btn-gho btn-sm">
          <ArrowLeft className="h-3.5 w-3.5" />
          <span>Back to all capabilities</span>
        </button>

        {s.priorityShowcase && (
          <span className="glass-well inline-flex items-center gap-1.5 rounded-full px-4 py-1.5 text-xs font-semibold text-[var(--accent-cyan)]">
            <Sparkles className="h-3.5 w-3.5" />
            <span>Priority Showcase Solution</span>
          </span>
        )}
      </div>

      {/* Hero Header — Borderless Shadow Glass */}
      <ScrollReveal scaleFrom={0.93} parallaxY={18} className="mt-8">
        <div className="apple-glass rounded-[36px] p-8 sm:p-12">
          <div className="flex flex-wrap items-center gap-2.5 text-xs font-semibold">
            <span className="uppercase tracking-wider text-[var(--accent-cyan)]">
              {DOMAINS[s.domain]}
            </span>
            <span className={`bdg ${s.badge}`}>{BADGES[s.badge]}</span>
            <span className="expchip">{s.exp}</span>
            <span className={`buildchip ${s.source === 'partner' ? 'partner' : ''}`}>
              {BUILD_LABEL(s)}
            </span>
            {s.poweredBy && <span className="powered">Powered by {s.poweredBy}</span>}
          </div>

          <h1 className="mt-5 font-display text-3xl font-bold tracking-tight text-[var(--ink)] sm:text-5xl">
            {s.head}
          </h1>
          <p className="mt-4 max-w-3xl text-base leading-relaxed text-[var(--sub)] sm:text-xl">
            <strong className="font-semibold text-[var(--ink)]">{s.name}.</strong> {s.capability}
          </p>

          {/* 3-Column Problem / How It Works / Business Outcome — Shadow Wells, No Borders */}
          <div className="mt-9 grid grid-cols-1 gap-5 md:grid-cols-3">
            <div className="glass-well rounded-[24px] p-6">
              <div className="text-[11px] font-semibold uppercase tracking-wider text-[var(--mut)]">
                The Problem
              </div>
              <p className="mt-2.5 text-sm leading-relaxed text-[var(--sub)]">{s.challenge}</p>
            </div>
            <div className="glass-well rounded-[24px] p-6">
              <div className="text-[11px] font-semibold uppercase tracking-wider text-[var(--mut)]">
                How It Works
              </div>
              <p className="mt-2.5 text-sm leading-relaxed text-[var(--sub)]">{s.capability}</p>
            </div>
            <div className="glass-well rounded-[24px] p-6">
              <div className="text-[11px] font-semibold uppercase tracking-wider text-[var(--mut)]">
                Business Outcome
              </div>
              <p className="mt-2.5 text-sm font-medium leading-relaxed text-[var(--ink)]">
                {s.outcome}
                {s.illus && <span className="illtag">Illustrative</span>}
              </p>
            </div>
          </div>

          {s.illus && <div className="qualifier">{QUALIFIER}</div>}

          {/* Capabilities & Outcomes */}
          <div className="mt-7 flex flex-wrap gap-2.5">
            {s.outcomes.map((o) => (
              <span key={o} className="otag">
                <CheckCircle2 className="h-3.5 w-3.5 text-[var(--accent-cyan)]" />
                <span>{OUT[o].l}</span>
              </span>
            ))}
            {s.caps.map((cap) => (
              <span key={cap} className="cap">
                {cap}
              </span>
            ))}
          </div>
        </div>
      </ScrollReveal>

      {/* Interactive Before & After Visual Studio */}
      {s.visualScenarios && s.visualScenarios.length > 0 && (
        <ScrollReveal delayMs={80} scaleFrom={0.93} parallaxY={22}>
          <BeforeAfterStudio solutionName={s.name} scenarios={s.visualScenarios} />
        </ScrollReveal>
      )}

      {/* Executive Briefing Case Study — Shadow Elevated Cards Instead of Divider Lines */}
      {c && (
        <ScrollReveal delayMs={100} scaleFrom={0.93} parallaxY={22}>
          <div className="apple-glass mt-10 rounded-[36px] p-8 sm:p-12">
            <div className="flex flex-wrap items-center justify-between gap-3">
              <div>
                <div className="text-xs font-semibold uppercase tracking-wider text-[var(--accent-cyan)]">
                  Real-World Context
                </div>
                <h3 className="mt-1 font-display text-2xl font-bold text-[var(--ink)]">
                  Executive Case Briefing
                </h3>
              </div>
              {c.proof && (
                <span className={`proofchip ${c.proof}`}>{PROOF_LABEL[c.proof]}</span>
              )}
            </div>

            <div className="mt-7 grid grid-cols-1 gap-4 sm:grid-cols-2">
              {[
                ['Industry', c.industry],
                ['Timeline', c.timeline],
                ['Business problem', c.problem],
                ['Solution', c.solution],
              ].map(([k, v]) => (
                <div key={k} className="glass-well rounded-[22px] p-5">
                  <div className="text-[11px] font-semibold uppercase tracking-wider text-[var(--mut)]">
                    {k}
                  </div>
                  <div className="mt-1.5 text-sm leading-relaxed text-[var(--sub)]">
                    {v}
                  </div>
                </div>
              ))}
            </div>

            <div className="glass-well mt-4 rounded-[22px] p-5">
              <div className="text-[11px] font-semibold uppercase tracking-wider text-[var(--mut)]">
                Business Outcome &amp; Technologies
              </div>
              <div className="mt-1.5 text-sm font-medium text-[var(--ink)]">{c.outcome}</div>
              <div className="mt-3 flex flex-wrap gap-2">
                {c.tech.map((t) => (
                  <span
                    key={t}
                    className="rounded-full bg-[var(--accent-blue)]/15 px-3 py-1 text-xs font-medium text-[var(--accent-cyan)]"
                  >
                    {t}
                  </span>
                ))}
              </div>
            </div>

            <div className="mt-6 grid grid-cols-2 gap-4 sm:grid-cols-4">
              {c.impact.map(([val, lbl], idx) => (
                <div key={idx} className="glass-well rounded-[22px] p-5">
                  <div className="font-display text-2xl font-bold text-[var(--accent-cyan)] sm:text-3xl">
                    {val}
                  </div>
                  <div className="mt-1 text-xs text-[var(--sub)]">{lbl}</div>
                </div>
              ))}
            </div>

            {c.qual && <div className="qualifier mt-5">{QUALIFIER}</div>}
          </div>
        </ScrollReveal>
      )}

      {/* Related Solutions ("Works together with") */}
      {s.related && s.related.length > 0 && (
        <ScrollReveal delayMs={130} parallaxY={16}>
          <div className="apple-glass mt-10 rounded-[32px] p-7 sm:p-9">
            <div className="text-xs font-semibold uppercase tracking-wider text-[var(--mut)]">
              Connected Capabilities · Works Together With
            </div>
            <div className="mt-4 flex flex-wrap items-center gap-3">
              <span className="rounded-full bg-[var(--accent-blue)] px-4 py-2 text-xs font-semibold text-white shadow-md">
                {s.name}
              </span>
              {s.related.map((relId) => {
                const rel = byId(relId);
                if (!rel) return null;
                return (
                  <React.Fragment key={relId}>
                    <ArrowRight className="h-3.5 w-3.5 text-[var(--mut)]" />
                    <button
                      onClick={() => onSelectSolution(rel.id)}
                      className="glass-well rounded-full px-4 py-2 text-xs font-semibold text-[var(--ink)] transition hover:-translate-y-0.5 hover:text-[var(--accent-cyan)]"
                    >
                      {rel.name}
                    </button>
                  </React.Fragment>
                );
              })}
            </div>
          </div>
        </ScrollReveal>
      )}

      {/* Next Step Engagement Panel */}
      <ScrollReveal delayMs={160} scaleFrom={0.93} parallaxY={20}>
        <div className="apple-glass mt-10 grid grid-cols-1 gap-8 rounded-[36px] p-8 sm:p-12 lg:grid-cols-12 lg:items-center">
          <div className="lg:col-span-7">
            <div className="text-xs font-semibold uppercase tracking-widest text-[var(--accent-cyan)]">
              Next step
            </div>
            <h2 className="mt-2 font-display text-2xl font-bold tracking-tight text-[var(--ink)] sm:text-4xl">
              {dp.label} on {s.name}
            </h2>
            <p className="mt-3 max-w-xl text-sm leading-relaxed text-[var(--sub)] sm:text-base">
              {EXP_NOTE[s.exp]}
            </p>
            <div className="mt-7 flex flex-wrap gap-3.5">
              <button
                onClick={() => onOpenRequest(s.id, dp.act)}
                className="btn btn-pri"
              >
                <span>{dp.label} →</span>
              </button>
              <button
                onClick={() => onOpenRequest(s.id, 'general')}
                className="btn btn-gho"
              >
                <span>Talk to our team</span>
              </button>
            </div>
          </div>

          <div className="grid grid-cols-1 gap-3.5 lg:col-span-5">
            <div className="glass-well flex items-start gap-3.5 rounded-2xl p-4">
              <Layers className="mt-0.5 h-4 w-4 shrink-0 text-[var(--accent-cyan)]" />
              <div>
                <div className="text-xs font-semibold text-[var(--ink)]">Maturity</div>
                <div className="text-xs text-[var(--sub)]">{BADGES[s.badge]}</div>
              </div>
            </div>
            <div className="glass-well flex items-start gap-3.5 rounded-2xl p-4">
              <Clock className="mt-0.5 h-4 w-4 shrink-0 text-[var(--accent-cyan)]" />
              <div>
                <div className="text-xs font-semibold text-[var(--ink)]">Experience today</div>
                <div className="text-xs text-[var(--sub)]">{s.exp}</div>
              </div>
            </div>
            <div className="glass-well flex items-start gap-3.5 rounded-2xl p-4">
              <ShieldCheck className="mt-0.5 h-4 w-4 shrink-0 text-[var(--accent-cyan)]" />
              <div>
                <div className="text-xs font-semibold text-[var(--ink)]">Delivery</div>
                <div className="text-xs text-[var(--sub)]">
                  {BUILD_LABEL(s)}
                  {s.poweredBy ? ` with ${s.poweredBy}` : ''} · Typical timeline: {s.time}
                </div>
              </div>
            </div>
          </div>
        </div>
      </ScrollReveal>
    </div>
  );
}
