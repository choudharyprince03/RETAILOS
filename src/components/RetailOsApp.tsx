'use client';

import React, { useState, useMemo, useEffect } from 'react';
import {
  SOL,
  STAGES,
  ROLES,
  ROLE_RECS,
  OUT,
  DOMAINS,
  DOMAIN_ORDER,
  FUTURE,
  BADGES,
  BUILD_LABEL,
  PROOF_METRICS,
  ACTIVE_ENGAGEMENTS,
  ENGAGEMENT_FLOW,
  ASSURANCE_CARDS,
  StageKey,
  RoleKey,
  DomainKey,
  OutcomeKey,
  Solution,
  byId,
  ctaFor,
} from '@/data/retailos-data';
import FlagshipScrollChapters from './FlagshipScrollChapters';
import HeroShowcase from './HeroShowcase';
import SolutionDetailView from './SolutionDetailView';
import PmPrdWorkspace from './PmPrdWorkspace';
import EnquiryModal from './EnquiryModal';
import ScrollReveal from './ScrollReveal';
import {
  Search,
  Sun,
  Moon,
  Compass,
  Shield,
  Database,
  Server,
  LineChart,
  ArrowUpRight,
  ArrowRight,
  X,
  SlidersHorizontal,
} from 'lucide-react';

export default function RetailOsApp() {
  const [activeTab, setActiveTab] = useState<'showcase' | 'pm_prd'>('showcase');
  const [selectedSolId, setSelectedSolId] = useState<string | null>(null);
  const [theme, setTheme] = useState<'slate' | 'daylight'>('slate');

  // Hover-driven stage for the 9-Stage Value Chain Bar (defaults to 'discover' so preview is always fluid)
  const [hoveredStage, setHoveredStage] = useState<StageKey>('discover');

  // Interactive Value Chain & Library filters for the 26-capability grid
  const [stage, setStage] = useState<StageKey | null>(null);
  const [role, setRole] = useState<RoleKey | ''>('');
  const [domain, setDomain] = useState<DomainKey | 'all' | 'future'>('all');
  const [q, setQ] = useState<string>('');
  const [outcome, setOutcome] = useState<OutcomeKey | ''>('');
  const [build, setBuild] = useState<'ai' | 'moar' | 'partner' | ''>('');
  const [showMoreFilters, setShowMoreFilters] = useState<boolean>(false);

  // Enquiry modal state
  const [modalOpen, setModalOpen] = useState<boolean>(false);
  const [modalCapId, setModalCapId] = useState<string | null>(null);
  const [modalReqType, setModalReqType] = useState<string>('general');

  useEffect(() => {
    document.documentElement.setAttribute('data-theme', theme);
  }, [theme]);

  const noFilters =
    !stage && !role && domain === 'all' && !q && !outcome && !build;

  const filteredList = useMemo(() => {
    return SOL.filter((s) => {
      if (domain !== 'all' && domain !== 'future' && s.domain !== domain) return false;
      if (stage && !s.stages.includes(stage)) return false;
      if (role && !ROLE_RECS[role]?.includes(s.id)) return false;
      if (outcome && !s.outcomes.includes(outcome)) return false;
      if (build === 'ai' && !s.ai) return false;
      if (build === 'moar' && s.source !== 'moar') return false;
      if (build === 'partner' && s.source !== 'partner') return false;
      if (q.trim()) {
        const query = q.toLowerCase();
        const hay = [
          s.name,
          s.head,
          s.challenge,
          s.capability,
          s.caps.join(' '),
          (s.tech || []).join(' '),
          DOMAINS[s.domain],
          s.outcomes.map((o) => OUT[o].l).join(' '),
        ]
          .join(' ')
          .toLowerCase();
        if (!hay.includes(query)) return false;
      }
      return true;
    });
  }, [domain, stage, role, outcome, build, q]);

  const domainCounts = useMemo(() => {
    const counts: Record<string, number> = {};
    SOL.forEach((s) => {
      counts[s.domain] = (counts[s.domain] || 0) + 1;
    });
    return counts;
  }, []);

  const clearFilters = () => {
    setStage(null);
    setRole('');
    setDomain('all');
    setQ('');
    setOutcome('');
    setBuild('');
  };

  const openSol = (id: string) => {
    setSelectedSolId(id);
    setActiveTab('showcase');
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  const openRequest = (capId: string | null, type: string) => {
    setModalCapId(capId);
    setModalReqType(type || 'general');
    setModalOpen(true);
  };

  const doCta = (s: Solution) => {
    const c = ctaFor(s);
    if (c.act === 'walkthrough' || c.act === 'concept' || c.act === 'demo') {
      openSol(s.id);
    } else {
      openRequest(s.id, c.act);
    }
  };

  const scrollToId = (id: string) => {
    setSelectedSolId(null);
    setActiveTab('showcase');
    setTimeout(() => {
      const el = document.getElementById(id);
      if (el) el.scrollIntoView({ behavior: 'smooth', block: 'start' });
    }, 60);
  };

  const hoveredStageIdx = useMemo(
    () => Math.max(0, STAGES.findIndex((s) => s.key === hoveredStage)),
    [hoveredStage]
  );
  const activeStageObj = useMemo(
    () => STAGES[hoveredStageIdx] || STAGES[0],
    [hoveredStageIdx]
  );
  const stageSolutions = useMemo(
    () => SOL.filter((s) => s.stages.includes(activeStageObj.key)),
    [activeStageObj]
  );
  const currentDetailSolution = selectedSolId ? byId(selectedSolId) : undefined;

  return (
    <div className="relative min-h-screen bg-[var(--bg-void)] text-[var(--ink)] transition-colors">
      {/* Ambient Apple/Meta Mesh Glow */}
      <div className="ambient-mesh" aria-hidden="true" />

      {/* Floating Borderless Apple Liquid-Glass Pill Navigation */}
      <header className="fixed inset-x-0 top-4 z-40 mx-auto max-w-[1120px] px-4">
        <nav
          aria-label="Primary"
          className="apple-nav-pill flex items-center justify-between gap-2 rounded-full px-4 py-2.5 sm:px-6"
        >
          {/* Brand */}
          <button
            onClick={() => {
              setSelectedSolId(null);
              setActiveTab('showcase');
              window.scrollTo({ top: 0, behavior: 'smooth' });
            }}
            className="flex items-center gap-2.5 text-left font-display text-base font-bold tracking-tight text-[var(--ink)]"
          >
            <span className="logo" aria-hidden="true" />
            <span>MOAR RetailOS</span>
          </button>

          {/* Center Navigation Links */}
          <div className="hidden items-center gap-1 md:flex">
            <button
              onClick={() => scrollToId('valuechain')}
              className="rounded-full px-3.5 py-1.5 text-xs font-medium text-[var(--sub)] transition hover:bg-[var(--surface-1)] hover:text-[var(--ink)]"
            >
              Value Chain
            </button>
            <button
              onClick={() => scrollToId('flagshipSec')}
              className="rounded-full px-3.5 py-1.5 text-xs font-medium text-[var(--sub)] transition hover:bg-[var(--surface-1)] hover:text-[var(--ink)]"
            >
              4 Priority Previews
            </button>
            <button
              onClick={() => scrollToId('explorerSec')}
              className="rounded-full px-3.5 py-1.5 text-xs font-medium text-[var(--sub)] transition hover:bg-[var(--surface-1)] hover:text-[var(--ink)]"
            >
              All 26 Solutions
            </button>
            <button
              onClick={() => scrollToId('proofSec')}
              className="rounded-full px-3.5 py-1.5 text-xs font-medium text-[var(--sub)] transition hover:bg-[var(--surface-1)] hover:text-[var(--ink)]"
            >
              Proof &amp; How We Work
            </button>
            <button
              onClick={() =>
                setActiveTab(activeTab === 'pm_prd' ? 'showcase' : 'pm_prd')
              }
              className={`inline-flex items-center gap-1.5 rounded-full px-3.5 py-1.5 text-xs font-semibold transition ${
                activeTab === 'pm_prd'
                  ? 'bg-[var(--accent-cyan)]/20 text-[var(--accent-cyan)] shadow-sm'
                  : 'text-[var(--sub)] hover:bg-[var(--surface-1)] hover:text-[var(--ink)]'
              }`}
            >
              <Compass className="h-3.5 w-3.5" />
              <span>PRD &amp; Plan</span>
            </button>
          </div>

          {/* Right Actions */}
          <div className="flex items-center gap-2">
            <button
              onClick={() =>
                setActiveTab(activeTab === 'pm_prd' ? 'showcase' : 'pm_prd')
              }
              className="glass-well inline-flex items-center gap-1 rounded-full px-3 py-1.5 text-xs font-medium text-[var(--sub)] md:hidden"
            >
              <Compass className="h-3.5 w-3.5" />
              <span>{activeTab === 'pm_prd' ? 'Showcase' : 'PRD'}</span>
            </button>

            <button
              onClick={() =>
                setTheme((t) => (t === 'slate' ? 'daylight' : 'slate'))
              }
              aria-label="Toggle light or dark appearance"
              title="Toggle appearance"
              className="glass-well flex h-9 w-9 items-center justify-center rounded-full text-[var(--sub)] transition hover:text-[var(--ink)]"
            >
              {theme === 'slate' ? (
                <Sun className="h-4 w-4 text-amber-400" />
              ) : (
                <Moon className="h-4 w-4 text-blue-600" />
              )}
            </button>

            <button
              onClick={() => openRequest(null, 'general')}
              className="btn btn-pri btn-sm"
            >
              Connect with us
            </button>
          </div>
        </nav>
      </header>

      {/* VIEW 1: PM PRD & PROJECT PLAN WORKBENCH */}
      {activeTab === 'pm_prd' && (
        <div className="relative z-10 pt-24">
          <PmPrdWorkspace
            onOpenSolution={(id) => openSol(id)}
            onSwitchToShowcase={() => {
              setSelectedSolId(null);
              setActiveTab('showcase');
            }}
            onOpenEnquiry={(capId, type) => openRequest(capId, type)}
          />
        </div>
      )}

      {/* VIEW 2: DEDICATED SOLUTION DETAIL VIEW */}
      {activeTab === 'showcase' && currentDetailSolution && (
        <SolutionDetailView
          solution={currentDetailSolution}
          onBack={() => setSelectedSolId(null)}
          onSelectSolution={(id) => openSol(id)}
          onOpenRequest={(capId, type) => openRequest(capId, type)}
        />
      )}

      {/* VIEW 3: APPLE / META SCROLL-STORYTELLING SHOWCASE */}
      {activeTab === 'showcase' && !currentDetailSolution && (
        <main className="relative z-10">
          {/* ==============================================================
              1. CREATIVE SPATIAL COMMAND-DECK HERO
              ============================================================== */}
          <HeroShowcase
            onSelectSolution={(id) => openSol(id)}
            onSelectStage={(st) => setHoveredStage(st)}
            onScrollTo={(id) => scrollToId(id)}
            onOpenRequest={(capId, type) => openRequest(capId, type)}
          />

          {/* ==============================================================
              2. HOVER-DRIVEN 9-STAGE RETAIL LIFECYCLE DOCK (SLIDING PILL)
              ============================================================== */}
          <section
            id="valuechain"
            className="mx-auto max-w-[1200px] px-5 py-16 sm:px-7"
          >
            <ScrollReveal>
              <div className="text-center">
                <div className="text-xs font-semibold uppercase tracking-widest text-[var(--accent-cyan)]">
                  The Retail Value Chain · 9 Stages
                </div>
                <h2 className="mt-2 font-display text-3xl font-bold tracking-tight text-[var(--ink)] sm:text-5xl">
                  Where is your biggest retail bottleneck?
                </h2>
                <p className="mt-3 text-sm text-[var(--sub)] sm:text-base">
                  Hover across any stage below to smoothly preview the scenario it solves and its matching MOAR capabilities.
                </p>
              </div>

              {/* Liquid Glass 9-Stage Bar — Hover-Activated with Gliding Blue Pill */}
              <div
                className="apple-glass relative mt-10 grid grid-cols-3 gap-1.5 overflow-hidden rounded-[32px] p-2.5 sm:grid-cols-5 lg:grid-cols-9 lg:gap-0"
                role="tablist"
                aria-label="Retail value chain stages"
              >
                {/* Desktop Gliding Blue Highlight Pill (slides smoothly across the 9 columns on hover) */}
                <div
                  aria-hidden="true"
                  style={{
                    transform: `translate3d(${hoveredStageIdx * 100}%, 0, 0)`,
                    transition:
                      'transform 0.42s cubic-bezier(0.22, 1, 0.36, 1)',
                  }}
                  className="pointer-events-none absolute inset-y-2.5 left-2.5 hidden w-[calc((100%-20px)/9)] rounded-[22px] bg-[var(--accent-blue)] lg:block"
                />

                {STAGES.map((st) => {
                  const isOn = hoveredStage === st.key;
                  const count = SOL.filter((s) => s.stages.includes(st.key)).length;
                  return (
                    <button
                      key={st.key}
                      role="tab"
                      aria-selected={isOn}
                      onMouseEnter={() => setHoveredStage(st.key)}
                      onFocus={() => setHoveredStage(st.key)}
                      onClick={() => {
                        setHoveredStage(st.key);
                        setStage(st.key);
                      }}
                      className={`group relative z-10 flex flex-col items-center justify-between rounded-[22px] px-2 py-4 text-center transition-colors duration-200 ${
                        isOn
                          ? 'bg-[var(--accent-blue)] text-white lg:bg-transparent'
                          : 'text-[var(--ink)] hover:text-[var(--accent-cyan)]'
                      }`}
                    >
                      <span
                        className={`font-mono text-[10px] font-semibold transition-colors duration-200 ${
                          isOn ? 'text-blue-100' : 'text-[var(--mut)]'
                        }`}
                      >
                        {st.num}
                      </span>
                      <span className="mt-1.5 font-display text-xs font-bold sm:text-sm">
                        {st.label}
                      </span>
                      <span
                        className={`mt-2 rounded-full px-2.5 py-0.5 text-[10px] font-medium transition-colors duration-200 ${
                          isOn
                            ? 'bg-white/25 text-white'
                            : 'bg-[var(--surface-2)] text-[var(--mut)]'
                        }`}
                      >
                        {count}
                      </span>
                    </button>
                  );
                })}
              </div>

              {/* Smoothly Cross-Fading Stage Context & Solutions Preview Card */}
              <div className="apple-glass mt-6 rounded-[32px] p-7 sm:p-9">
                <div
                  key={activeStageObj.key}
                  className="stage-content-transition"
                >
                  <div className="flex flex-wrap items-start justify-between gap-4">
                    <div className="max-w-2xl">
                      <div className="flex items-center gap-2 text-xs font-semibold text-[var(--accent-cyan)]">
                        <span>
                          Stage {activeStageObj.num} · {activeStageObj.label}
                        </span>
                        <span>·</span>
                        <span>{stageSolutions.length} Solutions</span>
                      </div>
                      <h3 className="mt-2 font-display text-xl font-bold text-[var(--ink)] sm:text-2xl">
                        &ldquo;{activeStageObj.operatorQuestion}&rdquo;
                      </h3>
                      <p className="mt-1.5 text-sm text-[var(--sub)]">
                        {activeStageObj.context}
                      </p>
                    </div>
                    <button
                      onClick={() => {
                        setStage(activeStageObj.key);
                        scrollToId('explorerSec');
                      }}
                      className="btn btn-gho btn-sm"
                    >
                      <span>Filter library by {activeStageObj.label}</span>
                      <ArrowRight className="h-3.5 w-3.5" />
                    </button>
                  </div>

                  {/* Quick clickable shadow cards for this stage's solutions */}
                  <div className="mt-7 grid grid-cols-1 gap-4 sm:grid-cols-2 lg:grid-cols-3">
                    {stageSolutions.map((s) => (
                      <div
                        key={s.id}
                        onClick={() => openSol(s.id)}
                        className="apple-glass-interactive group cursor-pointer rounded-2xl p-5"
                      >
                        <div className="flex items-center justify-between gap-2">
                          <span className="text-xs font-bold text-[var(--ink)]">
                            {s.name}
                          </span>
                          <span className={`bdg ${s.badge}`}>
                            {BADGES[s.badge]}
                          </span>
                        </div>
                        <p className="mt-2 text-xs text-[var(--sub)] line-clamp-2">
                          {s.head} — {s.capability}
                        </p>
                        <div className="mt-3 flex items-center gap-1 text-xs font-semibold text-[var(--accent-cyan)]">
                          <span>Inspect solution</span>
                          <ArrowUpRight className="h-3.5 w-3.5 transition group-hover:translate-x-0.5" />
                        </div>
                      </div>
                    ))}
                  </div>
                </div>
              </div>
            </ScrollReveal>
          </section>

          {/* ==============================================================
              3. META-STYLE SCROLL SHOWCASE FOR THE 4 PRIORITY SOLUTIONS
              ============================================================== */}
          <FlagshipScrollChapters
            onOpenSolution={(id) => openSol(id)}
            onOpenRequest={(capId, type) => openRequest(capId, type)}
          />

          {/* ==============================================================
              4. ALL 26 CAPABILITIES — BORDERLESS SHADOW BENTO EXPLORER
              ============================================================== */}
          <section
            id="explorerSec"
            className="mx-auto max-w-[1220px] px-5 py-24 sm:px-7"
          >
            <ScrollReveal scaleFrom={0.95} parallaxY={16}>
              <div className="flex flex-wrap items-end justify-between gap-4">
                <div>
                  <div className="text-xs font-semibold uppercase tracking-widest text-[var(--accent-cyan)]">
                    Complete Solution Library · 26 Capabilities
                  </div>
                  <h2 className="mt-2 font-display text-3xl font-bold tracking-tight text-[var(--ink)] sm:text-5xl">
                    Every capability. One operating system.
                  </h2>
                  <p className="mt-2.5 max-w-2xl text-sm text-[var(--sub)] sm:text-base">
                    Filter by your role, business outcome, or capability domain. Hover or click any domain pill below, or click a card to open its full briefing.
                  </p>
                </div>

                {!noFilters && (
                  <button
                    onClick={clearFilters}
                    className="btn btn-gho btn-sm text-[var(--accent-cyan)]"
                  >
                    <X className="h-3.5 w-3.5" />
                    <span>Reset all filters ({filteredList.length} shown)</span>
                  </button>
                )}
              </div>

              {/* Borderless Apple-Glass Search & Filter Bar */}
              <div className="apple-glass mt-9 rounded-[32px] p-5 sm:p-6">
                <div className="flex flex-wrap items-center gap-3">
                  {/* Search Input */}
                  <label className="glass-well flex min-w-[240px] flex-1 items-center gap-3 rounded-full px-4 py-3">
                    <Search className="h-4 w-4 shrink-0 text-[var(--mut)]" />
                    <input
                      type="text"
                      value={q}
                      onChange={(e) => setQ(e.target.value)}
                      placeholder="Search 26 capabilities, outcomes, or technologies…"
                      className="w-full bg-transparent text-xs text-[var(--ink)] placeholder:text-[var(--mut)] focus:outline-none sm:text-sm"
                    />
                    {q && (
                      <button
                        onClick={() => setQ('')}
                        aria-label="Clear search"
                        className="text-[var(--mut)] hover:text-[var(--ink)]"
                      >
                        <X className="h-3.5 w-3.5" />
                      </button>
                    )}
                  </label>

                  {/* Role Selector */}
                  <select
                    aria-label="Filter by your role"
                    value={role}
                    onChange={(e) => {
                      const val = e.target.value as RoleKey | '';
                      setRole(val);
                      if (val) {
                        setStage(null);
                        setDomain('all');
                      }
                    }}
                    className="glass-well rounded-full px-4 py-3 text-xs font-medium text-[var(--ink)] focus:outline-none"
                  >
                    <option value="">Filter by Role (All)</option>
                    {ROLES.map(([k, lbl]) => (
                      <option key={k} value={k}>
                        For {lbl}
                      </option>
                    ))}
                  </select>

                  {/* Outcome Selector */}
                  <select
                    aria-label="Filter by business outcome"
                    value={outcome}
                    onChange={(e) => setOutcome(e.target.value as OutcomeKey | '')}
                    className="glass-well rounded-full px-4 py-3 text-xs font-medium text-[var(--ink)] focus:outline-none"
                  >
                    <option value="">Any Business Outcome</option>
                    {(Object.keys(OUT) as OutcomeKey[]).map((k) => (
                      <option key={k} value={k}>
                        {OUT[k].l}
                      </option>
                    ))}
                  </select>

                  {/* Toggle Extra Build Chips */}
                  <button
                    onClick={() => setShowMoreFilters((prev) => !prev)}
                    className={`inline-flex items-center gap-1.5 rounded-full px-4 py-3 text-xs font-medium transition ${
                      showMoreFilters || build
                        ? 'bg-[var(--accent-cyan)]/20 text-[var(--accent-cyan)] shadow-md'
                        : 'glass-well text-[var(--sub)] hover:text-[var(--ink)]'
                    }`}
                  >
                    <SlidersHorizontal className="h-3.5 w-3.5" />
                    <span>Delivery Type</span>
                  </button>
                </div>

                {showMoreFilters && (
                  <div className="mt-4 flex flex-wrap items-center gap-2 pt-2">
                    <span className="text-xs text-[var(--mut)]">Filter by build:</span>
                    {[
                      { k: 'ai', l: 'AI Powered' },
                      { k: 'moar', l: 'MOAR Built' },
                      { k: 'partner', l: 'Partner Powered (Propheus)' },
                    ].map((chip) => {
                      const on = build === chip.k;
                      return (
                        <button
                          key={chip.k}
                          onClick={() =>
                            setBuild(on ? '' : (chip.k as 'ai' | 'moar' | 'partner'))
                          }
                          className={`rounded-full px-3.5 py-1.5 text-xs font-semibold transition ${
                            on
                              ? 'bg-[var(--accent-cyan)]/20 text-[var(--accent-cyan)] shadow-sm'
                              : 'glass-well text-[var(--sub)] hover:text-[var(--ink)]'
                          }`}
                        >
                          {chip.l}
                        </button>
                      );
                    })}
                  </div>
                )}

                {/* Horizontal Domain Pills — Hover & Click Activated */}
                <div
                  className="mt-5 flex gap-2 overflow-x-auto pb-1"
                  role="tablist"
                  aria-label="Capability domains"
                >
                  <button
                    role="tab"
                    aria-selected={domain === 'all'}
                    onMouseEnter={() => setDomain('all')}
                    onClick={() => setDomain('all')}
                    className={`whitespace-nowrap rounded-full px-4 py-2 text-xs font-semibold transition-all duration-300 ${
                      domain === 'all'
                        ? 'bg-[var(--accent-blue)] text-white shadow-md scale-[1.02]'
                        : 'glass-well text-[var(--sub)] hover:text-[var(--ink)]'
                    }`}
                  >
                    All 26 ({SOL.length})
                  </button>
                  {DOMAIN_ORDER.filter((d) => domainCounts[d]).map((d) => (
                    <button
                      key={d}
                      role="tab"
                      aria-selected={domain === d}
                      onMouseEnter={() => setDomain(d)}
                      onClick={() => setDomain(d)}
                      className={`whitespace-nowrap rounded-full px-4 py-2 text-xs font-semibold transition-all duration-300 ${
                        domain === d
                          ? 'bg-[var(--accent-blue)] text-white shadow-md scale-[1.02]'
                          : 'glass-well text-[var(--sub)] hover:text-[var(--ink)]'
                      }`}
                    >
                      {DOMAINS[d]} ({domainCounts[d]})
                    </button>
                  ))}
                  <button
                    role="tab"
                    aria-selected={domain === 'future'}
                    onMouseEnter={() => setDomain('future')}
                    onClick={() => setDomain('future')}
                    className={`whitespace-nowrap rounded-full px-4 py-2 text-xs font-semibold transition-all duration-300 ${
                      domain === 'future'
                        ? 'bg-[var(--accent-blue)] text-white shadow-md scale-[1.02]'
                        : 'glass-well text-[var(--mut)] hover:text-[var(--ink)]'
                    }`}
                  >
                    Future Roadmap
                  </button>
                </div>
              </div>
            </ScrollReveal>

            {/* Capability Bento Cards — Staggered Scroll Parallax & Shadow Depth */}
            <div className="mt-14">
              {domain === 'future' ? (
                <ScrollReveal>
                  <div className="apple-glass rounded-[32px] p-10 text-center sm:p-14">
                    <h3 className="font-display text-2xl font-bold text-[var(--ink)]">
                      On the MOAR RetailOS Roadmap
                    </h3>
                    <p className="mx-auto mt-2 max-w-xl text-sm text-[var(--sub)]">
                      MOAR RetailOS is architected to scale to 100+ capabilities. These domains are being productized next from our operator playbooks:
                    </p>
                    <div className="mt-7 flex flex-wrap justify-center gap-3">
                      {FUTURE.map((f) => (
                        <span
                          key={f}
                          className="glass-well rounded-full px-5 py-2.5 text-xs font-semibold text-[var(--ink)]"
                        >
                          {f}
                        </span>
                      ))}
                    </div>
                  </div>
                </ScrollReveal>
              ) : filteredList.length === 0 ? (
                <div className="apple-glass rounded-[32px] p-14 text-center">
                  <p className="text-base text-[var(--sub)]">
                    No capabilities match those filters.
                  </p>
                  <button
                    onClick={clearFilters}
                    className="btn btn-pri btn-sm mt-4"
                  >
                    Clear filters
                  </button>
                </div>
              ) : (
                <div className="space-y-16">
                  {DOMAIN_ORDER.filter((d) =>
                    filteredList.some((s) => s.domain === d)
                  ).map((d) => {
                    const items = filteredList.filter((s) => s.domain === d);
                    return (
                      <div key={d}>
                        {/* Clean Domain Heading */}
                        <ScrollReveal>
                          <div className="mb-6 flex items-center gap-3">
                            <h3 className="font-display text-xl font-bold text-[var(--ink)] sm:text-2xl">
                              {DOMAINS[d]}
                            </h3>
                            <span className="glass-well rounded-full px-3 py-1 text-xs font-semibold text-[var(--accent-cyan)]">
                              {items.length}
                            </span>
                          </div>
                        </ScrollReveal>

                        <div className="grid grid-cols-1 gap-6 md:grid-cols-2 lg:grid-cols-3">
                          {items.map((s, idx) => {
                            const c = ctaFor(s);
                            const colParallax =
                              idx % 3 === 1 ? 18 : idx % 3 === 2 ? -12 : 10;
                            return (
                              <ScrollReveal
                                key={s.id}
                                delayMs={(idx % 3) * 50}
                                parallaxY={colParallax}
                                scaleFrom={0.96}
                              >
                                <div
                                  role="button"
                                  tabIndex={0}
                                  onClick={() => openSol(s.id)}
                                  onKeyDown={(e) => {
                                    if (e.key === 'Enter') openSol(s.id);
                                  }}
                                  className="apple-glass-interactive group flex h-full cursor-pointer flex-col justify-between rounded-[28px] p-7"
                                >
                                  <div>
                                    {/* Top Row: Maturity + Experience */}
                                    <div className="flex items-center justify-between gap-2">
                                      <span className={`bdg ${s.badge}`}>
                                        {BADGES[s.badge]}
                                      </span>
                                      <span className="text-[11px] font-medium text-[var(--mut)]">
                                        {s.exp}
                                      </span>
                                    </div>

                                    {/* Outcome-First Headline & Name */}
                                    <h4 className="mt-5 font-display text-xl font-bold leading-snug text-[var(--ink)]">
                                      {s.head}
                                    </h4>
                                    <div className="mt-1.5 flex items-center gap-2 text-xs font-semibold text-[var(--accent-cyan)]">
                                      <span>{s.name}</span>
                                      {s.priorityShowcase && (
                                        <span className="rounded-full bg-[var(--accent-cyan)]/15 px-2.5 py-0.5 text-[10px]">
                                          Visual Demo
                                        </span>
                                      )}
                                    </div>

                                    {/* Clean 1-Sentence Explanation */}
                                    <p className="mt-3 text-xs leading-relaxed text-[var(--sub)] sm:text-sm">
                                      {s.capability}
                                    </p>

                                    {/* Shadow-Well Impact Pill */}
                                    <div className="glass-well mt-5 rounded-2xl px-4 py-3 text-xs">
                                      <span className="text-[var(--mut)]">Impact: </span>
                                      <strong className="font-medium text-[var(--ink)]">
                                        {s.outcome}
                                      </strong>
                                      {s.illus && (
                                        <span className="illtag">Illustrative</span>
                                      )}
                                    </div>
                                  </div>

                                  {/* Footer Row */}
                                  <div className="mt-6 flex items-center justify-between pt-2">
                                    <div className="flex items-center gap-1.5">
                                      <span
                                        className={`buildchip ${
                                          s.source === 'partner' ? 'partner' : ''
                                        }`}
                                      >
                                        {BUILD_LABEL(s)}
                                      </span>
                                      {s.poweredBy && (
                                        <span className="powered">
                                          {s.poweredBy}
                                        </span>
                                      )}
                                    </div>

                                    <button
                                      onClick={(e) => {
                                        e.stopPropagation();
                                        doCta(s);
                                      }}
                                      className="inline-flex items-center gap-1 text-xs font-semibold text-[var(--accent-cyan)] transition group-hover:translate-x-1"
                                    >
                                      <span>{c.label}</span>
                                      <ArrowRight className="h-3.5 w-3.5" />
                                    </button>
                                  </div>
                                </div>
                              </ScrollReveal>
                            );
                          })}
                        </div>
                      </div>
                    );
                  })}
                </div>
              )}
            </div>
          </section>

          {/* ==============================================================
              5. PROOF AT GLOBAL SCALE & HOW WE ENGAGE
              ============================================================== */}
          <section
            id="proofSec"
            className="mx-auto max-w-[1200px] px-5 py-24 sm:px-7"
          >
            <ScrollReveal scaleFrom={0.94} parallaxY={18}>
              <div className="apple-glass rounded-[36px] p-8 sm:p-14">
                <div className="max-w-2xl">
                  <div className="text-xs font-semibold uppercase tracking-widest text-[var(--accent-cyan)]">
                    Operator-Led Proof
                  </div>
                  <h2 className="mt-2 font-display text-3xl font-bold tracking-tight text-[var(--ink)] sm:text-5xl">
                    Advisory and delivery under one roof.
                  </h2>
                  <p className="mt-3 text-sm leading-relaxed text-[var(--sub)] sm:text-base">
                    Built by operators who have run global retail functions across Bengaluru, Hyderabad, Dallas, Chennai, and Manila.
                  </p>
                </div>

                <div className="mt-10 grid grid-cols-2 gap-5 sm:grid-cols-4">
                  {PROOF_METRICS.map(([val, lbl]) => (
                    <div
                      key={lbl}
                      className="glass-well rounded-[24px] p-6"
                    >
                      <strong className="block font-display text-3xl font-bold tracking-tight text-[var(--ink)] sm:text-4xl">
                        {val}
                      </strong>
                      <span className="mt-1.5 block text-xs text-[var(--sub)]">
                        {lbl}
                      </span>
                    </div>
                  ))}
                </div>

                <div className="mt-8 grid grid-cols-1 gap-4 md:grid-cols-3">
                  {ACTIVE_ENGAGEMENTS.map((eng) => (
                    <div
                      key={eng.title}
                      className="glass-well rounded-[24px] p-6"
                    >
                      <div className="text-sm font-bold text-[var(--ink)]">
                        {eng.title}
                      </div>
                      <div className="mt-1.5 text-xs font-medium text-[var(--accent-cyan)]">
                        {eng.subtitle}
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            </ScrollReveal>

            {/* 4-Step Operator Engagement Model */}
            <div className="mt-24">
              <ScrollReveal>
                <div className="text-center">
                  <div className="text-xs font-semibold uppercase tracking-widest text-[var(--accent-cyan)]">
                    How We Engage
                  </div>
                  <h2 className="mt-2 font-display text-3xl font-bold tracking-tight text-[var(--ink)] sm:text-5xl">
                    From first question to production run-state.
                  </h2>
                </div>
              </ScrollReveal>

              <div className="mt-10 grid grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-4">
                {ENGAGEMENT_FLOW.map((step, i) => (
                  <ScrollReveal
                    key={step.num}
                    delayMs={i * 60}
                    parallaxY={i % 2 === 0 ? 14 : 24}
                  >
                    <div className="apple-glass h-full rounded-[28px] p-7">
                      <div className="font-mono text-xs font-bold text-[var(--accent-cyan)]">
                        STEP {step.num}
                      </div>
                      <h4 className="mt-3 font-display text-xl font-bold text-[var(--ink)]">
                        {step.title}
                      </h4>
                      <p className="mt-2 text-xs leading-relaxed text-[var(--sub)] sm:text-sm">
                        {step.desc}
                      </p>
                      <div className="glass-well mt-6 inline-block rounded-full px-3.5 py-1 text-[11px] font-medium text-[var(--mut)]">
                        {step.dur}
                      </div>
                    </div>
                  </ScrollReveal>
                ))}
              </div>
            </div>

            {/* Enterprise Governance & Assurance */}
            <div className="mt-14 grid grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-4">
              {ASSURANCE_CARDS.map((ac, i) => (
                <ScrollReveal key={ac.id} delayMs={i * 50} parallaxY={12}>
                  <div className="apple-glass h-full rounded-[28px] p-7">
                    <div className="mb-4 flex h-11 w-11 items-center justify-center rounded-2xl bg-[var(--accent-blue)]/15 text-[var(--accent-cyan)] shadow-md">
                      {ac.id === 'security' && <Shield className="h-5 w-5" />}
                      {ac.id === 'governance' && <Database className="h-5 w-5" />}
                      {ac.id === 'deployment' && <Server className="h-5 w-5" />}
                      {ac.id === 'methodology' && <LineChart className="h-5 w-5" />}
                    </div>
                    <h4 className="font-display text-base font-bold text-[var(--ink)]">
                      {ac.title}
                    </h4>
                    <p className="mt-2 text-xs leading-relaxed text-[var(--sub)]">
                      {ac.desc}
                    </p>
                  </div>
                </ScrollReveal>
              ))}
            </div>
          </section>

          {/* ==============================================================
              6. CLOSING WORKSHOP CTA
              ============================================================== */}
          <section className="mx-auto max-w-[1140px] px-5 pb-24 sm:px-7">
            <ScrollReveal scaleFrom={0.93} parallaxY={18}>
              <div className="apple-glass relative overflow-hidden rounded-[36px] px-6 py-16 text-center sm:px-14">
                <h2 className="font-display text-3xl font-bold tracking-tight text-[var(--ink)] sm:text-5xl">
                  Bring a retail problem. <span className="ac">Leave with a plan.</span>
                </h2>
                <p className="mx-auto mt-4 max-w-xl text-sm leading-relaxed text-[var(--sub)] sm:text-base">
                  Book a working session with MOAR&apos;s operators, or request a scoped 4–8 week pilot on your own data for any capability above.
                </p>
                <div className="mt-9 flex flex-wrap justify-center gap-4">
                  <button
                    onClick={() => openRequest(null, 'workshop')}
                    className="btn btn-pri px-8 py-4 text-sm"
                  >
                    Book a workshop →
                  </button>
                  <button
                    onClick={() => setActiveTab('pm_prd')}
                    className="btn btn-gho px-7 py-4 text-sm"
                  >
                    <Compass className="h-4 w-4" />
                    <span>View Phase 1 PRD &amp; Project Plan</span>
                  </button>
                </div>
              </div>
            </ScrollReveal>
          </section>
        </main>
      )}

      {/* Minimalist Line-Free Footer */}
      <footer className="relative z-10 py-10">
        <div className="mx-auto flex max-w-[1140px] flex-wrap items-center justify-between gap-4 px-5 text-xs text-[var(--mut)] sm:px-7">
          <div className="flex items-center gap-2 font-display text-sm font-bold text-[var(--ink)]">
            <span className="logo" />
            <span>MOAR RetailOS</span>
          </div>
          <div className="flex flex-wrap items-center gap-5">
            <span>A MOAR Advisory product concept · moaradvisory.com</span>
            <button
              onClick={() =>
                setActiveTab(activeTab === 'pm_prd' ? 'showcase' : 'pm_prd')
              }
              className="font-semibold text-[var(--accent-cyan)] hover:underline"
            >
              {activeTab === 'pm_prd'
                ? 'Back to Interactive Showcase'
                : 'PM PRD & Project Plan'}
            </button>
          </div>
        </div>
      </footer>

      {/* Same-Site Lead / Enquiry Modal */}
      <EnquiryModal
        isOpen={modalOpen}
        capId={modalCapId}
        reqType={modalReqType}
        onClose={() => setModalOpen(false)}
      />
    </div>
  );
}
