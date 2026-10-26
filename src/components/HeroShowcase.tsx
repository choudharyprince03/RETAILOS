'use client';

import React, { useState, useEffect, useRef } from 'react';
import { STAGES, StageKey } from '@/data/retailos-data';
import {
  Sparkles,
  ArrowRight,
  ArrowUpRight,
  Layers,
  MapPin,
  Image as ImageIcon,
  FileSpreadsheet,
  CheckCircle2,
  Globe2,
  Zap,
  ShieldCheck,
} from 'lucide-react';

interface HeroShowcaseProps {
  onSelectSolution: (id: string) => void;
  onSelectStage: (stage: StageKey) => void;
  onScrollTo: (id: string) => void;
  onOpenRequest: (capId: string | null, type: string) => void;
}

const HERO_MODES = [
  {
    id: 'catalog_ai',
    code: '01',
    pill: 'AI Product Imagery',
    stage: 'Stage 05 · Catalog',
    badge: 'Available Now',
    headline: '1 Packshot In → Full Studio Campaign Out',
    metricMain: '~90%',
    metricLabel: 'Lower content cost',
    metricSecondary: '48 hrs',
    metricSecLabel: 'Batch turnaround',
  },
  {
    id: 'ai_catalog_intel',
    code: '02',
    pill: 'AI Catalog Intelligence',
    stage: 'Stage 05 & 06 · Catalog & Marketplace',
    badge: 'Available Now',
    headline: 'Raw Vendor Row → 98% Enriched PDP',
    metricMain: '94/100',
    metricLabel: 'Automated QA score',
    metricSecondary: '10×',
    metricSecLabel: 'Faster SKU setup',
  },
  {
    id: 'space_planning',
    code: '03',
    pill: 'Space & Planograms',
    stage: 'Stage 02 & 04 · Plan & Merchandise',
    badge: 'Client Pilot',
    headline: 'Cluster-Specific Shelf & Bay Optimization',
    metricMain: '+11.4%',
    metricLabel: 'Sales per linear ft',
    metricSecondary: '-35%',
    metricSecLabel: 'Shelf stockouts',
  },
  {
    id: 'geo_intel',
    code: '04',
    pill: 'Geo-Intelligence',
    stage: 'Stage 01 & 02 · Discover & Plan',
    badge: 'Powered by Propheus',
    headline: '1.2 × 0.6 km Digital Atlas Site Scoring',
    metricMain: '250+',
    metricLabel: 'Multimodal signals',
    metricSecondary: '+15%',
    metricSecLabel: 'New-store revenue',
  },
] as const;

export default function HeroShowcase({
  onSelectSolution,
  onSelectStage,
  onScrollTo,
  onOpenRequest,
}: HeroShowcaseProps) {
  const [activeIdx, setActiveIdx] = useState(0);
  const [isPaused, setIsPaused] = useState(false);

  // Subtle mouse-driven spatial parallax for the floating VisionOS satellite cards
  const heroRef = useRef<HTMLElement | null>(null);
  const leftCardRef = useRef<HTMLDivElement | null>(null);
  const rightCardRef = useRef<HTMLDivElement | null>(null);
  const mainDeckRef = useRef<HTMLDivElement | null>(null);

  useEffect(() => {
    if (isPaused) return;
    const timer = setInterval(() => {
      setActiveIdx((prev) => (prev + 1) % HERO_MODES.length);
    }, 4400);
    return () => clearInterval(timer);
  }, [isPaused]);

  useEffect(() => {
    const el = heroRef.current;
    if (!el) return;

    let rafId = 0;
    let targetX = 0;
    let targetY = 0;
    let currX = 0;
    let currY = 0;
    let running = false;

    const tick = () => {
      currX += (targetX - currX) * 0.1;
      currY += (targetY - currY) * 0.1;

      if (leftCardRef.current) {
        leftCardRef.current.style.transform = `translate3d(${(currX * -14).toFixed(
          1
        )}px, ${(currY * -12).toFixed(1)}px, 0)`;
      }
      if (rightCardRef.current) {
        rightCardRef.current.style.transform = `translate3d(${(currX * 16).toFixed(
          1
        )}px, ${(currY * 12).toFixed(1)}px, 0)`;
      }
      if (mainDeckRef.current) {
        mainDeckRef.current.style.transform = `translate3d(${(currX * 5).toFixed(
          1
        )}px, ${(currY * 4).toFixed(1)}px, 0)`;
      }

      if (Math.abs(targetX - currX) > 0.01 || Math.abs(targetY - currY) > 0.01) {
        rafId = requestAnimationFrame(tick);
      } else {
        running = false;
      }
    };

    const onMouseMove = (e: MouseEvent) => {
      const rect = el.getBoundingClientRect();
      const nx = ((e.clientX - rect.left) / rect.width - 0.5) * 2;
      const ny = ((e.clientY - rect.top) / rect.height - 0.5) * 2;
      targetX = Math.max(-1, Math.min(1, nx));
      targetY = Math.max(-1, Math.min(1, ny));
      if (!running) {
        running = true;
        rafId = requestAnimationFrame(tick);
      }
    };

    const onMouseLeave = () => {
      targetX = 0;
      targetY = 0;
      if (!running) {
        running = true;
        rafId = requestAnimationFrame(tick);
      }
    };

    el.addEventListener('mousemove', onMouseMove, { passive: true });
    el.addEventListener('mouseleave', onMouseLeave, { passive: true });
    return () => {
      cancelAnimationFrame(rafId);
      el.removeEventListener('mousemove', onMouseMove);
      el.removeEventListener('mouseleave', onMouseLeave);
    };
  }, []);

  const currentMode = HERO_MODES[activeIdx];

  return (
    <section
      ref={heroRef}
      className="relative mx-auto max-w-[1260px] overflow-hidden px-5 pt-28 pb-16 sm:px-7 sm:pt-36"
    >
      {/* Subtle Perspective Architectural Grid + Center Horizon Glow */}
      <div
        aria-hidden="true"
        className="pointer-events-none absolute inset-0 -z-10"
        style={{
          backgroundImage: `
            linear-gradient(to right, rgba(56, 189, 248, 0.045) 1px, transparent 1px),
            linear-gradient(to bottom, rgba(56, 189, 248, 0.045) 1px, transparent 1px)
          `,
          backgroundSize: '56px 56px',
          maskImage:
            'radial-gradient(ellipse 75% 60% at 50% 38%, black 15%, transparent 75%)',
          WebkitMaskImage:
            'radial-gradient(ellipse 75% 60% at 50% 38%, black 15%, transparent 75%)',
        }}
      />
      <div
        aria-hidden="true"
        className="pointer-events-none absolute left-1/2 top-24 -z-10 h-[420px] w-[760px] -translate-x-1/2 rounded-full bg-gradient-to-tr from-blue-600/20 via-cyan-400/12 to-teal-400/10 blur-[110px]"
      />

      {/* Top Split: Editorial Copy + Quick Telemetry */}
      <div className="mx-auto max-w-4xl text-center">
        {/* Live OS Status Pill */}
        <div className="glass-well inline-flex flex-wrap items-center justify-center gap-2.5 rounded-full px-4 py-1.5 text-xs font-semibold">
          <span className="inline-flex items-center gap-1.5 text-[var(--accent-cyan)]">
            <span className="h-2 w-2 rounded-full bg-[var(--accent-cyan)] animate-ping" />
            <span>MOAR RetailOS</span>
          </span>
          <span className="opacity-30">|</span>
          <span className="text-[var(--ink)]">9 Lifecycle Stages</span>
          <span className="opacity-30">·</span>
          <span className="text-[var(--sub)]">26 Productized Capabilities</span>
        </div>

        {/* Sculpted Hero Headline */}
        <h1 className="mx-auto mt-6 max-w-[16ch] font-display text-4xl font-bold leading-[1.02] tracking-tight text-[var(--ink)] sm:text-6xl lg:text-[74px]">
          The operating system for{' '}
          <span className="ac">retail transformation.</span>
        </h1>

        <p className="mx-auto mt-5 max-w-2xl text-base leading-relaxed text-[var(--sub)] sm:text-lg">
          Advisory, AI, and operational accelerators unified into one guided platform. Hover across the live command deck below to preview how MOAR transforms catalog, space, location, and store operations.
        </p>

        {/* Primary Action Row */}
        <div className="mt-8 flex flex-wrap items-center justify-center gap-3.5">
          <button
            onClick={() => onScrollTo('flagshipSec')}
            className="btn btn-pri px-7 py-3.5 text-sm"
          >
            <span>Explore interactive demos</span>
            <ArrowRight className="h-4 w-4" />
          </button>
          <button
            onClick={() => onScrollTo('valuechain')}
            className="btn btn-gho px-6 py-3.5 text-sm"
          >
            <span>Browse 9 retail stages</span>
          </button>
          <button
            onClick={() => onOpenRequest(null, 'workshop')}
            className="inline-flex items-center gap-1.5 px-4 py-2 text-xs font-semibold text-[var(--accent-cyan)] transition hover:translate-x-0.5"
          >
            <span>Book an operator workshop</span>
            <ArrowUpRight className="h-3.5 w-3.5" />
          </button>
        </div>
      </div>

      {/* ====================================================================
          CENTERPIECE: SPATIAL RETAILOS COMMAND DECK + FLOATING SATELLITE CARDS
          ==================================================================== */}
      <div
        className="relative mt-12 lg:mt-14"
        onMouseEnter={() => setIsPaused(true)}
        onMouseLeave={() => setIsPaused(false)}
      >
        {/* LEFT FLOATING SATELLITE WIDGET (Desktop Spatial Layer) */}
        <div
          ref={leftCardRef}
          className="apple-glass hidden xl:block absolute -left-4 top-10 z-20 w-64 rounded-[26px] p-5 transition-transform duration-75"
        >
          <div className="flex items-center justify-between text-[11px] font-semibold text-[var(--accent-cyan)]">
            <span className="flex items-center gap-1.5">
              <Zap className="h-3.5 w-3.5" />
              <span>Value Chain Pulse</span>
            </span>
            <span className="font-mono text-[10px] text-[var(--mut)]">9 STAGES</span>
          </div>
          <div className="mt-3 flex flex-wrap gap-1.5">
            {STAGES.map((st, idx) => (
              <button
                key={st.key}
                onClick={() => {
                  onSelectStage(st.key);
                  onScrollTo('valuechain');
                }}
                className={`rounded-full px-2.5 py-1 text-[10px] font-semibold transition ${
                  idx === 0 || idx === 1 || idx === 4
                    ? 'bg-[var(--accent-blue)]/25 text-[var(--accent-cyan)]'
                    : 'bg-[var(--surface-1)] text-[var(--sub)] hover:text-[var(--ink)]'
                }`}
              >
                {st.num} {st.label}
              </button>
            ))}
          </div>
          <div className="mt-4 rounded-2xl bg-[var(--surface-1)] p-3">
            <div className="font-display text-lg font-bold text-[var(--ink)]">
              8M+ SKUs
            </div>
            <div className="text-[11px] text-[var(--sub)]">
              Managed across 40+ global retailers
            </div>
          </div>
        </div>

        {/* RIGHT FLOATING SATELLITE WIDGET (Desktop Spatial Layer) */}
        <div
          ref={rightCardRef}
          className="apple-glass hidden xl:block absolute -right-4 bottom-8 z-20 w-64 rounded-[26px] p-5 transition-transform duration-75"
        >
          <div className="flex items-center justify-between text-[11px] font-semibold text-emerald-400">
            <span className="flex items-center gap-1.5">
              <Globe2 className="h-3.5 w-3.5" />
              <span>Operator Delivery</span>
            </span>
            <span className="font-mono text-[10px] text-[var(--mut)]">5 HUBS</span>
          </div>
          <div className="mt-2.5 font-display text-xl font-bold text-[var(--ink)]">
            200+ Operators
          </div>
          <p className="mt-1 text-[11px] leading-relaxed text-[var(--sub)]">
            Bengaluru · Hyderabad · Dallas · Chennai · Manila
          </p>
          <div className="mt-3.5 space-y-1.5">
            {[
              'Luxury Dept Store GCC',
              'Fortune 500 Auto Parts',
              'Aviation Ground Handling',
            ].map((client) => (
              <div
                key={client}
                className="flex items-center gap-2 rounded-xl bg-[var(--surface-1)] px-3 py-1.5 text-[11px] font-medium text-[var(--ink)]"
              >
                <span className="h-1.5 w-1.5 rounded-full bg-emerald-400" />
                <span className="truncate">{client}</span>
              </div>
            ))}
          </div>
        </div>

        {/* MAIN INTERACTIVE OS COMMAND DECK */}
        <div
          ref={mainDeckRef}
          className="apple-glass mx-auto max-w-[960px] overflow-hidden rounded-[34px] p-3 sm:p-5 transition-transform duration-75"
        >
          {/* OS Top Window Bar + Hover Mode Switcher Pills */}
          <div className="flex flex-wrap items-center justify-between gap-3 rounded-[24px] bg-[var(--bg-void)]/45 px-4 py-3">
            <div className="flex items-center gap-2">
              <span className="h-2.5 w-2.5 rounded-full bg-rose-500/70" />
              <span className="h-2.5 w-2.5 rounded-full bg-amber-400/70" />
              <span className="h-2.5 w-2.5 rounded-full bg-emerald-400/70" />
              <span className="ml-2 font-mono text-[11px] font-medium text-[var(--mut)] hidden sm:inline">
                moar.retailos // priority-preview
              </span>
            </div>

            {/* 4 Hover-Activated OS Mode Tabs with Gliding Pill */}
            <div
              className="relative grid grid-cols-2 gap-1 rounded-full bg-[var(--surface-1)] p-1 sm:grid-cols-4"
              role="tablist"
              aria-label="Priority OS modes"
            >
              <div
                aria-hidden="true"
                style={{
                  transform: `translate3d(${activeIdx * 100}%, 0, 0)`,
                  transition: 'transform 0.42s cubic-bezier(0.22, 1, 0.36, 1)',
                }}
                className="pointer-events-none absolute inset-y-1 left-1 hidden w-[calc((100%-8px)/4)] rounded-full bg-[var(--accent-blue)] sm:block"
              />
              {HERO_MODES.map((m, idx) => {
                const on = activeIdx === idx;
                return (
                  <button
                    key={m.id}
                    role="tab"
                    aria-selected={on}
                    onMouseEnter={() => setActiveIdx(idx)}
                    onClick={() => setActiveIdx(idx)}
                    className={`relative z-10 rounded-full px-3 py-1.5 text-center text-[11px] font-semibold transition-colors duration-200 whitespace-nowrap ${
                      on
                        ? 'bg-[var(--accent-blue)] text-white sm:bg-transparent'
                        : 'text-[var(--sub)] hover:text-[var(--ink)]'
                    }`}
                  >
                    <span className="mr-1 font-mono opacity-75">{m.code}</span>
                    {m.pill}
                  </button>
                );
              })}
            </div>
          </div>

          {/* Dynamic OS Stage Body */}
          <div
            key={currentMode.id}
            className="stage-content-transition mt-3 grid grid-cols-1 items-center gap-6 rounded-[26px] bg-[var(--bg-void)]/30 p-6 sm:p-8 lg:grid-cols-12"
          >
            {/* Left Column: Selected Priority Mode Summary & Live Telemetry */}
            <div className="lg:col-span-5">
              <div className="flex flex-wrap items-center gap-2 text-xs font-semibold">
                <span className="text-[var(--accent-cyan)]">{currentMode.stage}</span>
                <span className="rounded-full bg-emerald-500/15 px-2.5 py-0.5 text-[10px] text-emerald-400">
                  {currentMode.badge}
                </span>
              </div>

              <h2 className="mt-3 font-display text-2xl font-bold leading-tight text-[var(--ink)] sm:text-3xl">
                {currentMode.headline}
              </h2>

              <div className="mt-5 grid grid-cols-2 gap-3">
                <div className="glass-well rounded-2xl p-4">
                  <div className="font-display text-2xl font-bold text-[var(--accent-cyan)] sm:text-3xl">
                    {currentMode.metricMain}
                  </div>
                  <div className="mt-1 text-xs text-[var(--sub)]">
                    {currentMode.metricLabel}
                  </div>
                </div>
                <div className="glass-well rounded-2xl p-4">
                  <div className="font-display text-2xl font-bold text-[var(--ink)] sm:text-3xl">
                    {currentMode.metricSecondary}
                  </div>
                  <div className="mt-1 text-xs text-[var(--sub)]">
                    {currentMode.metricSecLabel}
                  </div>
                </div>
              </div>

              <div className="mt-6 flex flex-wrap items-center gap-3">
                <button
                  onClick={() => onSelectSolution(currentMode.id)}
                  className="btn btn-pri btn-sm"
                >
                  <span>Open {currentMode.pill}</span>
                  <ArrowUpRight className="h-3.5 w-3.5" />
                </button>
                <span className="text-[11px] text-[var(--mut)]">
                  Illustrative concept preview
                </span>
              </div>
            </div>

            {/* Right Column: Bespoke Visual Simulation for Each Mode */}
            <div className="lg:col-span-7">
              {currentMode.id === 'catalog_ai' && (
                <div className="grid grid-cols-1 gap-3.5 sm:grid-cols-12 sm:items-center">
                  {/* Input Packshot Card */}
                  <div className="glass-well rounded-2xl p-4 text-center sm:col-span-4">
                    <span className="rounded-full bg-rose-500/15 px-2.5 py-0.5 text-[10px] font-semibold text-rose-300">
                      Input · Raw Shot
                    </span>
                    <div className="my-4 flex h-24 items-center justify-center rounded-xl bg-[var(--bg-void)]/40">
                      <ImageIcon className="h-8 w-8 text-[var(--mut)]" />
                    </div>
                    <div className="font-mono text-[10px] text-[var(--sub)]">
                      1 Studio Flat-Lay
                    </div>
                  </div>

                  {/* Animated Flow Arrow */}
                  <div className="flex justify-center sm:col-span-1">
                    <ArrowRight className="h-5 w-5 text-[var(--accent-cyan)] rotate-90 sm:rotate-0" />
                  </div>

                  {/* Output Multi-Format Campaign Grid */}
                  <div className="glass-well space-y-2.5 rounded-2xl p-4 sm:col-span-7">
                    <div className="flex items-center justify-between">
                      <span className="rounded-full bg-emerald-500/15 px-2.5 py-0.5 text-[10px] font-semibold text-emerald-400">
                        MOAR AI Studio Output
                      </span>
                      <span className="font-mono text-[10px] text-[var(--accent-cyan)]">
                        1:1 · 4:5 · 9:16 · 16:9
                      </span>
                    </div>
                    <div className="grid grid-cols-2 gap-2.5 pt-1">
                      <div className="rounded-xl bg-[var(--accent-blue)]/20 p-3">
                        <div className="text-[10px] font-semibold text-[var(--accent-cyan)]">
                          On-Model Editorial
                        </div>
                        <div className="mt-1 text-xs font-bold text-[var(--ink)]">
                          Drape &amp; Weave Locked
                        </div>
                        <div className="mt-1 text-[10px] text-[var(--sub)]">
                          Human QA verified
                        </div>
                      </div>
                      <div className="rounded-xl bg-emerald-500/15 p-3">
                        <div className="text-[10px] font-semibold text-emerald-400">
                          Lifestyle + SEO Copy
                        </div>
                        <div className="mt-1 text-xs font-bold text-[var(--ink)]">
                          Listing-Ready Bundle
                        </div>
                        <div className="mt-1 text-[10px] text-[var(--sub)]">
                          96/100 Brand Score
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
              )}

              {currentMode.id === 'ai_catalog_intel' && (
                <div className="glass-well space-y-3.5 rounded-2xl p-5">
                  <div className="flex items-center justify-between text-xs">
                    <span className="flex items-center gap-1.5 font-mono text-[var(--mut)]">
                      <FileSpreadsheet className="h-3.5 w-3.5 text-[var(--accent-cyan)]" />
                      <span>SKU #M-JKT-409 Enrichment Pipeline</span>
                    </span>
                    <span className="rounded-full bg-emerald-500/20 px-2.5 py-0.5 text-[10px] font-semibold text-emerald-400">
                      17% → 98% Complete
                    </span>
                  </div>

                  <div className="rounded-xl bg-[var(--bg-void)]/45 p-3.5">
                    <div className="text-[10px] uppercase tracking-wider text-[var(--mut)]">
                      AI-Generated Marketplace Title
                    </div>
                    <div className="mt-1 font-display text-sm font-bold text-[var(--ink)]">
                      Men&apos;s Tailored Mandarin-Collar Linen Blend Overshirt — Navy
                    </div>
                  </div>

                  <div className="flex flex-wrap gap-1.5">
                    {[
                      'Collar: Mandarin (99%)',
                      'Fabric: 55% Linen / 45% Cotton',
                      'Fit: Regular Tailored',
                      'Sleeve: Long Roll-Tab',
                      'Amazon & Shopify Schema Mapped',
                    ].map((attr) => (
                      <span
                        key={attr}
                        className="rounded-full bg-[var(--accent-blue)]/20 px-3 py-1 text-[11px] font-medium text-[var(--accent-cyan)]"
                      >
                        ✓ {attr}
                      </span>
                    ))}
                  </div>
                </div>
              )}

              {currentMode.id === 'space_planning' && (
                <div className="glass-well space-y-2.5 rounded-2xl p-5">
                  <div className="flex items-center justify-between text-xs">
                    <span className="font-semibold text-[var(--ink)]">
                      Cluster A · Urban Commuter Gondola Bay
                    </span>
                    <span className="text-emerald-400 font-semibold">
                      94% Photo Audit Verified
                    </span>
                  </div>
                  <div className="space-y-2 pt-1">
                    <div className="flex items-center gap-2.5 rounded-xl bg-emerald-500/15 px-3.5 py-2.5 text-xs">
                      <span className="w-16 font-mono text-[10px] text-emerald-300">
                        EYE LVL
                      </span>
                      <span className="font-semibold text-[var(--ink)]">
                        Local Bestseller · 6 Facings (+18% GMROS · Zero Stockout)
                      </span>
                    </div>
                    <div className="flex items-center gap-2.5 rounded-xl bg-[var(--accent-blue)]/15 px-3.5 py-2.5 text-xs">
                      <span className="w-16 font-mono text-[10px] text-[var(--accent-cyan)]">
                        TOUCH LVL
                      </span>
                      <span className="text-[var(--ink)]">
                        Co-Merchandised Regimen + Core Multipacks (5 Facings)
                      </span>
                    </div>
                    <div className="flex items-center gap-2.5 rounded-xl bg-[var(--bg-void)]/40 px-3.5 py-2 text-xs">
                      <span className="w-16 font-mono text-[10px] text-[var(--mut)]">
                        LOWER BAY
                      </span>
                      <span className="text-[var(--sub)]">
                        High-Capacity Case Reserve Buffer (-35% Stockouts)
                      </span>
                    </div>
                  </div>
                </div>
              )}

              {currentMode.id === 'geo_intel' && (
                <div className="glass-well rounded-2xl p-5">
                  <div className="flex items-center justify-between text-xs">
                    <span className="font-semibold text-[var(--ink)]">
                      1.2 × 0.6 km Digital Atlas Catchment Scoring
                    </span>
                    <span className="font-mono text-[11px] text-[var(--accent-cyan)]">
                      7,000+ Districts Mapped
                    </span>
                  </div>
                  <div className="mt-3 grid grid-cols-3 gap-2.5">
                    {[
                      { id: 'A1', name: 'Transit Hub', score: 84, tag: 'High Fit' },
                      { id: 'B2', name: 'Commuter Core', score: 94, tag: 'Prime Target', prime: true },
                      { id: 'C3', name: 'Tech Quarter', score: 88, tag: 'High Fit' },
                    ].map((cell) => (
                      <div
                        key={cell.id}
                        className={`rounded-xl p-3.5 ${
                          cell.prime
                            ? 'bg-[var(--accent-blue)] text-white shadow-lg'
                            : 'bg-[var(--bg-void)]/45 text-[var(--ink)]'
                        }`}
                      >
                        <div className="flex items-center justify-between">
                          <span className="font-mono text-[10px] opacity-75">
                            Cell {cell.id}
                          </span>
                          <span className="font-display text-lg font-bold">
                            {cell.score}
                          </span>
                        </div>
                        <div className="mt-1 text-xs font-bold truncate">
                          {cell.name}
                        </div>
                        <div className="mt-0.5 text-[10px] opacity-80">
                          {cell.tag}
                        </div>
                      </div>
                    ))}
                  </div>
                </div>
              )}
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
