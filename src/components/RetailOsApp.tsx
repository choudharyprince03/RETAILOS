'use client';

import React, { useState, useMemo, useEffect, useRef, useCallback } from 'react';
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
import ScrollReveal, { subscribeScroll } from './ScrollReveal';
import CommandPalette, { PaletteAction } from './CommandPalette';
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
  ArrowUp,
  Command,
} from 'lucide-react';

const NAV_HINTS = [
  `Search ${SOL.length} capabilities…`,
  'Try “planogram”',
  'Try “pricing & promotions”',
  'Try “catalog AI”',
  'Try “site selection”',
  'Jump to any section…',
];

export default function RetailOsApp() {
  const [activeTab, setActiveTab] = useState<'showcase' | 'pm_prd'>('showcase');
  const [selectedSolId, setSelectedSolId] = useState<string | null>(null);
  const [theme, setTheme] = useState<'slate' | 'daylight'>('slate');

  // Hover-driven stage for the 9-Stage Value Chain Bar (defaults to 'discover' so preview is always fluid)
  const [hoveredStage, setHoveredStage] = useState<StageKey>('discover');

  // Interactive Value Chain & Library filters for the 26-capability grid
  const [stage, setStage] = useState<StageKey | null>(null);
  const [role, setRole] = useState<RoleKey | ''>('');
  // Notion-style scroll-spy: which domain section is currently in view
  const [activeSection, setActiveSection] = useState<DomainKey | 'future' | null>(null);
  const spyLockRef = useRef<boolean>(false);
  const spyLockTimer = useRef<number | undefined>(undefined);
  const mobileTocRef = useRef<HTMLDivElement | null>(null);

  // Header chrome: condensed state, page progress
  const [scrolled, setScrolled] = useState<boolean>(false);
  const [showTop, setShowTop] = useState<boolean>(false);
  const progressRef = useRef<HTMLSpanElement | null>(null);

  // ⌘K command palette
  const [paletteOpen, setPaletteOpen] = useState<boolean>(false);
  const [isMac, setIsMac] = useState<boolean>(true);
  const [hintIdx, setHintIdx] = useState<number>(0);
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
    !stage && !role && !q && !outcome && !build;

  const filteredList = useMemo(() => {
    return SOL.filter((s) => {
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
  }, [stage, role, outcome, build, q]);

  // Global shortcuts: ⌘K / Ctrl+K / "/" open the palette
  useEffect(() => {
    setIsMac(/Mac|iPhone|iPad/.test(navigator.platform || navigator.userAgent));
    const onKey = (e: KeyboardEvent) => {
      const target = e.target as HTMLElement | null;
      const typing =
        !!target && (target.tagName === 'INPUT' || target.tagName === 'TEXTAREA' || target.isContentEditable);
      if ((e.metaKey || e.ctrlKey) && e.key.toLowerCase() === 'k') {
        e.preventDefault();
        setPaletteOpen((o) => !o);
      } else if (e.key === '/' && !typing) {
        e.preventDefault();
        setPaletteOpen(true);
      }
    };
    window.addEventListener('keydown', onKey);
    return () => window.removeEventListener('keydown', onKey);
  }, []);

  // Rotating search hints in the navbar
  useEffect(() => {
    const t = window.setInterval(() => setHintIdx((i) => (i + 1) % NAV_HINTS.length), 2800);
    return () => window.clearInterval(t);
  }, []);

  // Shared scroll loop: progress bar, condensed header
  useEffect(() => {
    return subscribeScroll(() => {
      const y = window.scrollY;
      const max = document.documentElement.scrollHeight - window.innerHeight;
      if (progressRef.current) {
        progressRef.current.style.setProperty('--p', String(max > 0 ? Math.min(1, y / max) : 0));
      }
      setScrolled(y > 24);
      setShowTop(y > 1400);
      return false;
    });
  }, [activeTab, selectedSolId]);

  // Live per-domain counts for the current filter set (drives the side TOC)
  const filteredCounts = useMemo(() => {
    const counts: Partial<Record<DomainKey, number>> = {};
    filteredList.forEach((s) => {
      counts[s.domain] = (counts[s.domain] || 0) + 1;
    });
    return counts;
  }, [filteredList]);

  const visibleDomains = useMemo(
    () => DOMAIN_ORDER.filter((d) => (filteredCounts[d] || 0) > 0),
    [filteredCounts]
  );

  // Sections rendered in the library, in order (domains with results + roadmap)
  const tocSections = useMemo<(DomainKey | 'future')[]>(
    () => [...visibleDomains, 'future'],
    [visibleDomains]
  );

  // Scroll-spy: highlight the section whose heading has crossed the top offset
  useEffect(() => {
    if (selectedSolId || activeTab !== 'showcase') return;
    const OFFSET = 160;
    let raf = 0;

    const compute = () => {
      raf = 0;
      if (spyLockRef.current) return;
      let current: DomainKey | 'future' | null = null;
      for (const key of tocSections) {
        const el = document.getElementById(`cap-${key}`);
        if (!el) continue;
        if (el.getBoundingClientRect().top - OFFSET <= 0) current = key;
        else break;
      }
      // Reaching the bottom of the page always activates the last section
      const lastKey = tocSections[tocSections.length - 1];
      const lastEl = lastKey ? document.getElementById(`cap-${lastKey}`) : null;
      if (lastEl && lastEl.getBoundingClientRect().bottom < window.innerHeight * 0.6) {
        current = lastKey;
      }
      setActiveSection(current ?? tocSections[0] ?? null);
    };

    const onScroll = () => {
      if (!raf) raf = requestAnimationFrame(compute);
    };

    compute();
    window.addEventListener('scroll', onScroll, { passive: true });
    window.addEventListener('resize', onScroll, { passive: true });
    return () => {
      cancelAnimationFrame(raf);
      window.removeEventListener('scroll', onScroll);
      window.removeEventListener('resize', onScroll);
    };
  }, [tocSections, selectedSolId, activeTab]);

  // Keep the active pill visible in the mobile horizontal TOC
  useEffect(() => {
    const strip = mobileTocRef.current;
    if (!strip || !activeSection) return;
    const pill = strip.querySelector<HTMLElement>(`[data-toc="${activeSection}"]`);
    if (pill) {
      strip.scrollTo({
        left: pill.offsetLeft - strip.clientWidth / 2 + pill.clientWidth / 2,
        behavior: 'smooth',
      });
    }
  }, [activeSection]);

  const jumpToSection = useCallback((key: DomainKey | 'future') => {
    const el = document.getElementById(`cap-${key}`);
    if (!el) return;
    setActiveSection(key);
    // Lock the spy while the smooth scroll is in flight so the highlight doesn't flicker
    spyLockRef.current = true;
    window.clearTimeout(spyLockTimer.current);
    spyLockTimer.current = window.setTimeout(() => {
      spyLockRef.current = false;
    }, 900);
    const top = el.getBoundingClientRect().top + window.scrollY - 120;
    window.scrollTo({ top, behavior: 'smooth' });
  }, []);

  const clearFilters = () => {
    setStage(null);
    setRole('');
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

  const handlePalette = (a: PaletteAction) => {
    if (a.type === 'solution') openSol(a.id);
    else if (a.type === 'section') scrollToId(a.id);
    else if (a.type === 'request') openRequest(null, a.kind);
    else if (a.type === 'theme') setTheme((t) => (t === 'slate' ? 'daylight' : 'slate'));
    else if (a.type === 'prd') {
      setActiveTab('pm_prd');
      window.scrollTo({ top: 0, behavior: 'smooth' });
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

      {/* Floating Liquid-Glass Navigation */}
      <header
        className={`fixed inset-x-0 z-40 mx-auto max-w-[1180px] px-3 transition-[top] duration-500 sm:px-4 ${
          scrolled ? 'top-2.5' : 'top-4'
        }`}
      >
        <nav
          aria-label="Primary"
          data-scrolled={scrolled}
          className={`site-nav apple-nav-pill relative grid grid-cols-[auto_1fr_auto] items-center gap-2 overflow-hidden rounded-full pl-4 pr-1.5 sm:gap-3 sm:pl-5 sm:pr-2 ${
            scrolled ? 'py-1.5' : 'py-2'
          }`}
        >
          {/* Brand */}
          <button
            onClick={() => {
              setSelectedSolId(null);
              setActiveTab('showcase');
              window.scrollTo({ top: 0, behavior: 'smooth' });
            }}
            aria-label="MOAR RetailOS home"
            className="group flex min-w-0 items-center gap-2 rounded-full py-1 text-left sm:gap-2.5"
          >
            <img
              src="/moar-logo-white.png"
              alt="MOAR."
              className="moar-logo-white h-4 w-auto object-contain transition-transform duration-500 group-hover:scale-[1.04] sm:h-5"
            />
            <img
              src="/moar-logo-dark.png"
              alt="MOAR."
              className="moar-logo-dark h-4 w-auto object-contain transition-transform duration-500 group-hover:scale-[1.04] sm:h-5"
            />
            <span className="h-4 w-px bg-[var(--line-2)]" aria-hidden="true" />
            <span className="font-display text-[13px] font-semibold tracking-tight text-[var(--accent-cyan)] sm:text-sm">
              RetailOS
            </span>
            <span className="ml-1 hidden items-center gap-1.5 rounded-full bg-emerald-500/10 px-2 py-0.5 text-[10px] font-semibold uppercase tracking-wider text-emerald-400 xl:inline-flex">
              <span className="relative flex h-1.5 w-1.5">
                <span className="absolute inline-flex h-full w-full animate-ping rounded-full bg-emerald-400 opacity-60" />
                <span className="relative inline-flex h-1.5 w-1.5 rounded-full bg-emerald-400" />
              </span>
              Phase 1 Live
            </span>
          </button>

          {/* Center: ⌘K search trigger with rotating hints */}
          <div className="flex justify-center">
            <button
              onClick={() => setPaletteOpen(true)}
              aria-label="Search capabilities"
              aria-keyshortcuts="Meta+K Control+K"
              className="nav-search group hidden h-10 w-full max-w-[420px] items-center gap-3 rounded-full pl-4 pr-1.5 text-left md:flex"
            >
              <Search className="h-4 w-4 shrink-0 text-[var(--mut)] transition-colors group-hover:text-[var(--accent-cyan)]" />
              <span className="relative flex-1 overflow-hidden text-[13px] text-[var(--mut)]">
                <span className="invisible">Search {SOL.length} capabilities</span>
                <span key={hintIdx} className="hint-roll absolute inset-0 truncate">
                  {NAV_HINTS[hintIdx]}
                </span>
              </span>
              <span className="flex items-center gap-1">
                <kbd className="kbd">{isMac ? <Command className="h-3 w-3" /> : 'Ctrl'}</kbd>
                <kbd className="kbd">K</kbd>
              </span>
            </button>
          </div>

          {/* Right Actions */}
          <div className="flex items-center gap-1 sm:gap-2">
            <button
              onClick={() => setPaletteOpen(true)}
              aria-label="Search capabilities"
              className="glass-well flex h-9 w-9 items-center justify-center rounded-full text-[var(--sub)] transition hover:text-[var(--ink)] md:hidden"
            >
              <Search className="h-4 w-4" />
            </button>

            <button
              onClick={() =>
                setTheme((t) => (t === 'slate' ? 'daylight' : 'slate'))
              }
              aria-label="Toggle light or dark appearance"
              title="Toggle appearance"
              className="theme-toggle glass-well relative flex h-9 w-9 items-center justify-center overflow-hidden rounded-full"
              data-mode={theme}
            >
              <Sun className="theme-icon theme-sun h-4 w-4 text-[#ffc502]" />
              <Moon className="theme-icon theme-moon h-4 w-4 text-[#1756d7]" />
            </button>

            <button
              onClick={() => openRequest(null, 'general')}
              className="btn btn-pri btn-shine btn-sm group"
            >
              <span className="hidden sm:inline">Connect with us</span>
              <span className="sm:hidden">Connect</span>
              <ArrowRight className="h-3.5 w-3.5 transition-transform duration-300 group-hover:translate-x-0.5" />
            </button>
          </div>

          {/* Reading progress, tucked into the bottom edge of the pill */}
          {activeTab === 'showcase' && !currentDetailSolution && (
            <span ref={progressRef} className="nav-progress" aria-hidden="true" />
          )}
        </nav>
      </header>

      <CommandPalette
        open={paletteOpen}
        onClose={() => setPaletteOpen(false)}
        onAction={handlePalette}
      />

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
            </ScrollReveal>

            <ScrollReveal>
              {/* Liquid Glass 9-Stage Bar — Hover-Activated with Synchronized Pill */}
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
                      'transform 0.2s cubic-bezier(0.22, 1, 0.36, 1)',
                  }}
                  className="pointer-events-none absolute inset-y-2.5 left-2.5 hidden w-[calc((100%-20px)/9)] rounded-[22px] bg-[var(--accent-blue)] shadow-md lg:block"
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
                      className={`group relative z-10 flex flex-col items-center justify-between rounded-[22px] px-2 py-4 text-center transition-colors duration-150 ${
                        isOn
                          ? 'bg-[var(--accent-blue)] text-white shadow-sm'
                          : 'text-[var(--ink)] hover:text-[var(--accent-cyan)]'
                      }`}
                    >
                      <span
                        className={`font-mono text-[10px] font-semibold transition-colors duration-150 ${
                          isOn ? 'text-blue-100' : 'text-[var(--mut)]'
                        }`}
                      >
                        {st.num}
                      </span>
                      <span className="mt-1.5 font-display text-xs font-bold sm:text-sm">
                        {st.label}
                      </span>
                      <span
                        className={`mt-2 rounded-full px-2.5 py-0.5 text-[10px] font-medium transition-colors duration-150 ${
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
            className="mx-auto max-w-[1240px] px-5 py-24 sm:px-7"
          >
            <ScrollReveal>
              <div className="flex flex-wrap items-end justify-between gap-6">
                <div className="max-w-2xl">
                  <div className="text-xs font-semibold uppercase tracking-widest text-[var(--accent-cyan)]">
                    Complete Solution Library · {SOL.length} Capabilities
                  </div>
                  <h2 className="mt-2 font-display text-3xl font-bold tracking-tight text-[var(--ink)] sm:text-5xl">
                    Every capability. One operating system.
                  </h2>
                  <p className="mt-3 text-sm leading-relaxed text-[var(--sub)] sm:text-base">
                    Browse by domain using the index, or narrow down by role, business outcome, or delivery type. Click any card to open its full briefing.
                  </p>
                </div>
              </div>

              {/* Search & Filter Bar */}
              <div className="apple-glass mt-10 rounded-[28px] p-3 sm:p-3.5">
                <div className="flex flex-col gap-2.5 lg:flex-row lg:items-center">
                  {/* Search Input */}
                  <label className="glass-well flex min-w-0 flex-1 items-center gap-3 rounded-full px-4 py-3">
                    <Search className="h-4 w-4 shrink-0 text-[var(--mut)]" />
                    <input
                      type="text"
                      value={q}
                      onChange={(e) => setQ(e.target.value)}
                      placeholder={`Search ${SOL.length} capabilities, outcomes, or technologies…`}
                      className="w-full bg-transparent text-sm text-[var(--ink)] placeholder:text-[var(--mut)] focus:outline-none"
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

                  <div className="grid grid-cols-2 gap-2.5 sm:flex sm:items-center">
                    {/* Role Selector */}
                    <select
                      aria-label="Filter by your role"
                      value={role}
                      onChange={(e) => {
                        const val = e.target.value as RoleKey | '';
                        setRole(val);
                        if (val) setStage(null);
                      }}
                      className={`glass-well min-w-0 rounded-full px-4 py-3 text-xs font-medium focus:outline-none sm:min-w-[170px] ${
                        role ? 'text-[var(--accent-cyan)]' : 'text-[var(--ink)]'
                      }`}
                    >
                      <option value="">All Roles</option>
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
                      className={`glass-well min-w-0 rounded-full px-4 py-3 text-xs font-medium focus:outline-none sm:min-w-[170px] ${
                        outcome ? 'text-[var(--accent-cyan)]' : 'text-[var(--ink)]'
                      }`}
                    >
                      <option value="">Any Outcome</option>
                      {(Object.keys(OUT) as OutcomeKey[]).map((k) => (
                        <option key={k} value={k}>
                          {OUT[k].l}
                        </option>
                      ))}
                    </select>

                    {/* Toggle Extra Build Chips */}
                    <button
                      onClick={() => setShowMoreFilters((prev) => !prev)}
                      aria-expanded={showMoreFilters}
                      className={`col-span-2 inline-flex items-center justify-center gap-1.5 whitespace-nowrap rounded-full px-4 py-3 text-xs font-medium transition sm:col-span-1 ${
                        showMoreFilters || build
                          ? 'bg-[var(--accent-cyan)]/15 text-[var(--accent-cyan)]'
                          : 'glass-well text-[var(--sub)] hover:text-[var(--ink)]'
                      }`}
                    >
                      <SlidersHorizontal className="h-3.5 w-3.5" />
                      <span>Delivery</span>
                      {build && (
                        <span className="h-1.5 w-1.5 rounded-full bg-[var(--accent-cyan)]" />
                      )}
                    </button>
                  </div>
                </div>

                {showMoreFilters && (
                  <div className="flex flex-wrap items-center gap-2 px-2 pb-1 pt-3.5">
                    <span className="mr-1 text-[11px] font-semibold uppercase tracking-wider text-[var(--mut)]">
                      Delivery type
                    </span>
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
                              ? 'bg-[var(--accent-cyan)]/15 text-[var(--accent-cyan)]'
                              : 'glass-well text-[var(--sub)] hover:text-[var(--ink)]'
                          }`}
                        >
                          {chip.l}
                        </button>
                      );
                    })}
                  </div>
                )}
              </div>

              {/* Active filter summary */}
              {!noFilters && (
                <div className="mt-4 flex flex-wrap items-center gap-2 px-1 text-xs">
                  <span className="text-[var(--mut)]">
                    Showing <strong className="font-semibold text-[var(--ink)]">{filteredList.length}</strong> of {SOL.length}
                  </span>
                  {stage && (
                    <button
                      onClick={() => setStage(null)}
                      className="glass-well inline-flex items-center gap-1.5 rounded-full px-3 py-1 font-medium text-[var(--sub)] hover:text-[var(--ink)]"
                    >
                      Stage: {STAGES.find((st) => st.key === stage)?.label}
                      <X className="h-3 w-3" />
                    </button>
                  )}
                  <button
                    onClick={clearFilters}
                    className="ml-auto inline-flex items-center gap-1 font-semibold text-[var(--accent-cyan)] hover:underline"
                  >
                    <X className="h-3.5 w-3.5" />
                    Reset filters
                  </button>
                </div>
              )}
            </ScrollReveal>

            {/* Mobile / tablet: sticky horizontal topic index */}
            <div className="sticky top-[72px] z-20 -mx-5 mt-8 px-5 sm:-mx-7 sm:px-7 lg:hidden">
              <div
                ref={mobileTocRef}
                className="apple-nav-pill flex gap-1.5 overflow-x-auto rounded-full p-1.5 [scrollbar-width:none] [&::-webkit-scrollbar]:hidden"
              >
                {tocSections.map((key) => {
                  const on = activeSection === key;
                  return (
                    <button
                      key={key}
                      data-toc={key}
                      onClick={() => jumpToSection(key)}
                      className={`whitespace-nowrap rounded-full px-3.5 py-1.5 text-xs font-semibold transition-colors ${
                        on
                          ? 'bg-[var(--accent-blue)] text-white'
                          : 'text-[var(--sub)] hover:text-[var(--ink)]'
                      }`}
                    >
                      {key === 'future' ? 'Roadmap' : DOMAINS[key]}
                    </button>
                  );
                })}
              </div>
            </div>

            {/* Two-column layout: Notion-style sticky index + content */}
            <div className="mt-8 lg:mt-14 lg:grid lg:grid-cols-[236px_minmax(0,1fr)] lg:gap-12">
              {/* Desktop sticky topic index */}
              <aside className="hidden lg:block">
                <nav
                  aria-label="Capability domains"
                  className="sticky top-24 max-h-[calc(100vh-7rem)] overflow-y-auto pb-6 pt-2"
                >
                  <div className="mb-4 flex items-center justify-between px-3">
                    <span className="text-[11px] font-semibold uppercase tracking-widest text-[var(--mut)]">
                      Domains
                    </span>
                    <span className="text-[11px] font-medium tabular-nums text-[var(--mut)]">
                      {filteredList.length}
                    </span>
                  </div>

                  <ul className="relative space-y-0.5 border-l border-[var(--line-2)] ml-3">
                    {DOMAIN_ORDER.map((d) => {
                      const count = filteredCounts[d] || 0;
                      const disabled = count === 0;
                      const on = activeSection === d;
                      return (
                        <li key={d}>
                          <button
                            onClick={() => !disabled && jumpToSection(d)}
                            disabled={disabled}
                            aria-current={on ? 'location' : undefined}
                            className={`group relative -ml-px flex w-full items-center justify-between gap-3 border-l-2 py-2 pl-4 pr-2 text-left text-[13px] transition-all duration-300 ${
                              on
                                ? 'border-[var(--accent-cyan)] font-semibold text-[var(--ink)]'
                                : disabled
                                ? 'cursor-default border-transparent text-[var(--mut)] opacity-40'
                                : 'border-transparent text-[var(--sub)] hover:border-[var(--sub)]/40 hover:text-[var(--ink)]'
                            }`}
                          >
                            <span className="truncate">{DOMAINS[d]}</span>
                            <span
                              className={`shrink-0 rounded-full px-1.5 text-[11px] tabular-nums transition-colors ${
                                on
                                  ? 'bg-[var(--accent-cyan)]/15 text-[var(--accent-cyan)]'
                                  : 'text-[var(--mut)]'
                              }`}
                            >
                              {count}
                            </span>
                          </button>
                        </li>
                      );
                    })}
                    <li className="pt-2">
                      <button
                        onClick={() => jumpToSection('future')}
                        aria-current={activeSection === 'future' ? 'location' : undefined}
                        className={`relative -ml-px flex w-full items-center border-l-2 py-2 pl-4 pr-2 text-left text-[13px] transition-all duration-300 ${
                          activeSection === 'future'
                            ? 'border-[var(--accent-cyan)] font-semibold text-[var(--ink)]'
                            : 'border-transparent text-[var(--mut)] hover:text-[var(--ink)]'
                        }`}
                      >
                        Future Roadmap
                      </button>
                    </li>
                  </ul>

                  <button
                    onClick={() => openRequest(null, 'general')}
                    className="mt-8 ml-3 inline-flex items-center gap-1.5 text-xs font-semibold text-[var(--accent-cyan)] hover:underline"
                  >
                    Can&apos;t find it? Talk to us
                    <ArrowRight className="h-3.5 w-3.5" />
                  </button>
                </nav>
              </aside>

              {/* Content column */}
              <div className="min-w-0">
                {filteredList.length === 0 && (
                  <div className="apple-glass mb-16 rounded-[28px] p-12 text-center">
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
                )}

                <div className="space-y-20">
                  {visibleDomains.map((d) => {
                    const items = filteredList.filter((s) => s.domain === d);
                    return (
                      <section
                        key={d}
                        id={`cap-${d}`}
                        aria-labelledby={`cap-${d}-title`}
                        className="scroll-mt-32"
                      >
                        {/* Domain Heading */}
                        <div className="mb-6 flex items-baseline justify-between gap-4 border-b border-[var(--line-2)] pb-4">
                          <h3
                            id={`cap-${d}-title`}
                            className="font-display text-2xl font-bold text-[var(--ink)] sm:text-[28px]"
                          >
                            {DOMAINS[d]}
                          </h3>
                          <span className="shrink-0 text-xs font-medium tabular-nums text-[var(--mut)]">
                            {items.length} {items.length === 1 ? 'capability' : 'capabilities'}
                          </span>
                        </div>

                        <div className="grid grid-cols-1 gap-5 md:grid-cols-2">
                          {items.map((s, idx) => {
                            const c = ctaFor(s);
                            return (
                              <ScrollReveal key={s.id} delayMs={(idx % 2) * 60}>
                                <div
                                  role="button"
                                  tabIndex={0}
                                  onClick={() => openSol(s.id)}
                                  onKeyDown={(e) => {
                                    if (e.key === 'Enter') openSol(s.id);
                                  }}
                                  className="apple-glass-interactive group flex h-full cursor-pointer flex-col rounded-[24px] p-6 sm:p-7"
                                >
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
                                  <h4 className="mt-5 font-display text-lg font-bold leading-snug text-[var(--ink)] sm:text-xl">
                                    {s.head}
                                  </h4>
                                  <div className="mt-1.5 flex flex-wrap items-center gap-2 text-xs font-semibold text-[var(--accent-cyan)]">
                                    <span>{s.name}</span>
                                    {s.priorityShowcase && (
                                      <span className="rounded-full bg-[var(--accent-cyan)]/15 px-2.5 py-0.5 text-[10px]">
                                        Visual Demo
                                      </span>
                                    )}
                                  </div>

                                  {/* 1-Sentence Explanation */}
                                  <p className="mt-3 text-sm leading-relaxed text-[var(--sub)]">
                                    {s.capability}
                                  </p>

                                  {/* Impact */}
                                  <div className="glass-well mt-5 rounded-2xl px-4 py-3 text-xs leading-relaxed">
                                    <span className="text-[var(--mut)]">Impact: </span>
                                    <strong className="font-medium text-[var(--ink)]">
                                      {s.outcome}
                                    </strong>
                                    {s.illus && (
                                      <span className="illtag">Illustrative</span>
                                    )}
                                  </div>

                                  {/* Footer Row */}
                                  <div className="mt-auto flex flex-wrap items-center justify-between gap-3 pt-6">
                                    <div className="flex flex-wrap items-center gap-1.5">
                                      <span
                                        className={`buildchip ${
                                          s.source === 'partner' ? 'partner' : ''
                                        }`}
                                      >
                                        {BUILD_LABEL(s)}
                                      </span>
                                      {s.poweredBy && (
                                        <span className="powered">{s.poweredBy}</span>
                                      )}
                                    </div>

                                    <button
                                      onClick={(e) => {
                                        e.stopPropagation();
                                        doCta(s);
                                      }}
                                      className="inline-flex items-center gap-1 whitespace-nowrap text-xs font-semibold text-[var(--accent-cyan)] transition group-hover:translate-x-1"
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
                      </section>
                    );
                  })}

                  {/* Future Roadmap */}
                  <section
                    id="cap-future"
                    aria-labelledby="cap-future-title"
                    className="scroll-mt-32"
                  >
                    <div className="mb-6 flex items-baseline justify-between gap-4 border-b border-[var(--line-2)] pb-4">
                      <h3
                        id="cap-future-title"
                        className="font-display text-2xl font-bold text-[var(--ink)] sm:text-[28px]"
                      >
                        Future Roadmap
                      </h3>
                      <span className="shrink-0 text-xs font-medium text-[var(--mut)]">
                        Coming next
                      </span>
                    </div>
                    <ScrollReveal>
                      <div className="apple-glass rounded-[24px] p-7 sm:p-9">
                        <p className="max-w-xl text-sm leading-relaxed text-[var(--sub)]">
                          MOAR RetailOS is architected to scale to 100+ capabilities. These domains are being productized next from our operator playbooks:
                        </p>
                        <div className="mt-6 flex flex-wrap gap-2.5">
                          {FUTURE.map((f) => (
                            <span
                              key={f}
                              className="glass-well rounded-full px-4 py-2 text-xs font-semibold text-[var(--ink)]"
                            >
                              {f}
                            </span>
                          ))}
                        </div>
                      </div>
                    </ScrollReveal>
                  </section>
                </div>
              </div>
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

                <div className="stagger mt-10 grid grid-cols-2 gap-4 sm:grid-cols-4 sm:gap-5">
                  {PROOF_METRICS.map(([val, lbl]) => (
                    <div
                      key={lbl}
                      className="glass-well group rounded-[24px] p-6 transition-colors duration-300 hover:bg-[var(--surface-2)]"
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

                <div className="stagger mt-6 grid grid-cols-1 gap-4 md:grid-cols-3">
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
                  <ScrollReveal key={step.num} delayMs={i * 90}>
                    <div className="apple-glass-interactive relative h-full rounded-[28px] p-7">
                      <div className="flex items-center gap-3">
                        <span className="flex h-9 w-9 items-center justify-center rounded-full bg-[var(--accent-blue)]/15 font-mono text-xs font-bold text-[var(--accent-cyan)]">
                          {step.num}
                        </span>
                        <span className="hairline flex-1" aria-hidden="true" />
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
                <ScrollReveal key={ac.id} delayMs={i * 90}>
                  <div className="apple-glass-interactive h-full rounded-[28px] p-7">
                    <div className="mb-5 flex h-11 w-11 items-center justify-center rounded-2xl bg-gradient-to-br from-[var(--accent-blue)]/25 to-[var(--accent-cyan)]/10 text-[var(--accent-cyan)]">
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
              <div className="apple-glass relative overflow-hidden rounded-[36px] px-6 py-16 text-center sm:px-14 sm:py-20">
                <div
                  aria-hidden="true"
                  className="pointer-events-none absolute left-1/2 top-0 -z-10 h-[320px] w-[720px] -translate-x-1/2 -translate-y-1/3 rounded-full bg-gradient-to-r from-[#1756d7]/30 via-[#1a2953]/30 to-[#ffc502]/20 blur-[90px]"
                />
                <div
                  aria-hidden="true"
                  className="pointer-events-none absolute inset-0 -z-10 opacity-60"
                  style={{
                    backgroundImage:
                      'linear-gradient(to right, rgba(255,197,2,0.06) 1px, transparent 1px), linear-gradient(to bottom, rgba(23,86,215,0.08) 1px, transparent 1px)',
                    backgroundSize: '44px 44px',
                    maskImage: 'radial-gradient(ellipse 60% 70% at 50% 0%, black, transparent 75%)',
                    WebkitMaskImage: 'radial-gradient(ellipse 60% 70% at 50% 0%, black, transparent 75%)',
                  }}
                />
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

      {/* Footer */}
      <footer className="relative z-10 mt-6">
        <div className="mx-auto max-w-[1180px] px-5 sm:px-7">
          <div className="hairline" aria-hidden="true" />
          <div className="flex flex-col gap-6 py-10 sm:flex-row sm:items-center sm:justify-between">
            <div>
              <div className="flex items-center gap-2.5 font-display text-sm font-semibold text-[var(--ink)]">
                <img
                  src="/moar-logo-white.png"
                  alt="MOAR."
                  className="moar-logo-white h-5 w-auto object-contain"
                />
                <img
                  src="/moar-logo-dark.png"
                  alt="MOAR."
                  className="moar-logo-dark h-5 w-auto object-contain"
                />
                <span className="h-3.5 w-px bg-[var(--line-2)]" aria-hidden="true" />
                <span className="text-[var(--accent-cyan)]">RetailOS</span>
              </div>
              <p className="mt-2 text-xs text-[var(--mut)]">
                A MOAR Advisory product concept · moaradvisory.com
              </p>
            </div>
            <div className="flex flex-wrap items-center gap-x-6 gap-y-3 text-xs">
              {[
                { id: 'valuechain', label: 'Value Chain' },
                { id: 'explorerSec', label: 'Solutions' },
                { id: 'proofSec', label: 'Proof' },
              ].map((l) => (
                <button
                  key={l.id}
                  onClick={() => scrollToId(l.id)}
                  className="font-medium text-[var(--sub)] transition hover:text-[var(--ink)]"
                >
                  {l.label}
                </button>
              ))}
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
        </div>
      </footer>

      {/* Back to top */}
      <button
        onClick={() => window.scrollTo({ top: 0, behavior: 'smooth' })}
        aria-label="Back to top"
        className={`apple-nav-pill fixed bottom-6 right-6 z-40 flex h-11 w-11 items-center justify-center rounded-full text-[var(--sub)] transition-all duration-500 hover:-translate-y-0.5 hover:text-[var(--ink)] ${
          showTop && activeTab === 'showcase'
            ? 'translate-y-0 opacity-100'
            : 'pointer-events-none translate-y-4 opacity-0'
        }`}
      >
        <ArrowUp className="h-4 w-4" />
      </button>

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
