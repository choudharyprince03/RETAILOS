'use client';

import React, { useState, useEffect } from 'react';
import ScrollReveal from './ScrollReveal';
import {
  Sparkles,
  ArrowUpRight,
  Image as ImageIcon,
} from 'lucide-react';

interface FlagshipScrollChaptersProps {
  onOpenSolution: (id: string) => void;
  onOpenRequest: (capId: string, type: string) => void;
}

export default function FlagshipScrollChapters({
  onOpenSolution,
  onOpenRequest,
}: FlagshipScrollChaptersProps) {
  const [activeChapter, setActiveChapter] = useState<number>(0);

  // Interactive states for the 4 priority studios (triggered on hover OR click)
  const [imageryMode, setImageryMode] = useState<'before' | 'after'>('after');
  const [imageryRatio, setImageryRatio] = useState<'1:1' | '4:5' | '9:16' | '16:9'>('4:5');
  const [catalogMode, setCatalogMode] = useState<'before' | 'after'>('after');
  const [planoMode, setPlanoMode] = useState<'before' | 'after'>('after');
  const [selectedGeoCell, setSelectedGeoCell] = useState<number>(4);

  const geoCells = [
    { id: 'A1', name: 'North Transit Hub', score: 81, footfall: '+24%', comp: 'Low (1)', status: 'High Fit' },
    { id: 'A2', name: 'Old Industrial Belt', score: 54, footfall: '-8%', comp: 'None (0)', status: 'Hold' },
    { id: 'A3', name: 'University Quarter', score: 87, footfall: '+39%', comp: 'Med (2)', status: 'High Fit' },
    { id: 'B1', name: 'West Tech Park', score: 79, footfall: '+19%', comp: 'Med (3)', status: 'Viable' },
    { id: 'B2', name: 'Central Commuter Core', score: 94, footfall: '+52%', comp: 'Low (1)', status: 'Prime Target' },
    { id: 'B3', name: 'East Residential', score: 72, footfall: '+11%', comp: 'High (4)', status: 'Moderate' },
  ];

  useEffect(() => {
    const ids = ['chap-0', 'chap-1', 'chap-2', 'chap-3'];
    let rafId = 0;
    const updateActive = () => {
      const vhCenter = window.innerHeight * 0.45;
      let closestIdx = 0;
      let minDist = Infinity;
      ids.forEach((id, idx) => {
        const el = document.getElementById(id);
        if (!el) return;
        const rect = el.getBoundingClientRect();
        const center = rect.top + rect.height / 2;
        const dist = Math.abs(center - vhCenter);
        if (dist < minDist) {
          minDist = dist;
          closestIdx = idx;
        }
      });
      setActiveChapter(closestIdx);
    };

    const onScroll = () => {
      cancelAnimationFrame(rafId);
      rafId = requestAnimationFrame(updateActive);
    };
    window.addEventListener('scroll', onScroll, { passive: true });
    return () => {
      cancelAnimationFrame(rafId);
      window.removeEventListener('scroll', onScroll);
    };
  }, []);

  const scrollToChapter = (idx: number) => {
    const el = document.getElementById(`chap-${idx}`);
    if (el) el.scrollIntoView({ behavior: 'smooth', block: 'center' });
  };

  return (
    <section id="flagshipSec" className="relative z-10 mx-auto max-w-[1220px] px-5 py-24 sm:px-7">
      {/* Section Header */}
      <ScrollReveal scaleFrom={0.95} parallaxY={16}>
        <div className="mx-auto max-w-2xl text-center">
          <span className="glass-well inline-flex items-center gap-2 rounded-full px-4 py-1.5 text-xs font-semibold tracking-wide text-[var(--accent-cyan)]">
            <Sparkles className="h-3.5 w-3.5" />
            <span>4 Priority Transformations</span>
          </span>
          <h2 className="mt-5 font-display text-3xl font-bold tracking-tight text-[var(--ink)] sm:text-5xl">
            Designed to flow across your retail bottlenecks.
          </h2>
          <p className="mt-4 text-base leading-relaxed text-[var(--sub)] sm:text-lg">
            Scroll through our four flagship capabilities. Hover over <strong className="text-[var(--ink)]">Before</strong> and <strong className="text-[var(--ink)]">After</strong> on any stage to compare the business impact.
          </p>
        </div>
      </ScrollReveal>

      {/* Sticky Meta-Style Floating Chapter Bar with Sliding Pill */}
      <div className="sticky top-20 z-30 mt-10 flex justify-center pointer-events-none">
        <div className="apple-nav-pill pointer-events-auto relative grid grid-cols-4 items-center rounded-full p-1.5">
          {/* Sliding Active Background Pill */}
          <div
            aria-hidden="true"
            style={{
              transform: `translate3d(${activeChapter * 100}%, 0, 0)`,
              transition: 'transform 0.48s cubic-bezier(0.22, 1, 0.36, 1)',
            }}
            className="pointer-events-none absolute inset-y-1.5 left-1.5 w-[calc((100%-12px)/4)] rounded-full bg-[var(--accent-blue)] shadow-md"
          />
          {[
            '01 · AI Imagery',
            '02 · Catalog Intel',
            '03 · Planograms',
            '04 · Geo-Intel',
          ].map((label, idx) => (
            <button
              key={label}
              onClick={() => scrollToChapter(idx)}
              className={`relative z-10 rounded-full px-3.5 py-1.5 text-center text-xs font-semibold transition-colors duration-300 whitespace-nowrap ${
                activeChapter === idx
                  ? 'text-white'
                  : 'text-[var(--sub)] hover:text-[var(--ink)]'
              }`}
            >
              {label}
            </button>
          ))}
        </div>
      </div>

      <div className="mt-16 space-y-28">
        {/* ============================================================
            CHAPTER 01: LEFT NARRATIVE -> RIGHT FLOATING STUDIO
            ============================================================ */}
        <div id="chap-0">
          <ScrollReveal scaleFrom={0.94} parallaxY={18}>
            <div className="apple-glass overflow-hidden rounded-[36px] p-7 sm:p-12 lg:p-14">
              <div className="grid grid-cols-1 items-center gap-12 lg:grid-cols-12">
                {/* Left Narrative */}
                <ScrollReveal shiftX={-18} parallaxY={-10} className="lg:col-span-5">
                  <div className="flex flex-wrap items-center gap-2.5 text-xs font-semibold">
                    <span className="font-mono text-[var(--accent-cyan)]">01 / 04</span>
                    <span className="text-[var(--sub)]">Stage 05 · Catalog</span>
                    <span className="bdg available">Available</span>
                  </div>

                  <h3 className="mt-4 font-display text-3xl font-bold leading-[1.08] text-[var(--ink)] sm:text-4xl">
                    One studio packshot in. <span className="ac">Full campaign out.</span>
                  </h3>

                  <p className="mt-4 text-sm leading-relaxed text-[var(--sub)] sm:text-base">
                    Traditional photo shoots take weeks and cost $185+ per SKU. <strong className="text-[var(--ink)]">Catalog AI Studio &amp; AI Product Imagery</strong> turn one flat-lay photo into on-model imagery, lifestyle scenes, and channel-ready crops in 48 hours.
                  </p>

                  <div className="mt-7 grid grid-cols-3 gap-3">
                    <div className="glass-well rounded-2xl p-3.5">
                      <div className="font-display text-xl font-bold text-[var(--accent-cyan)] sm:text-2xl">
                        ~90%
                      </div>
                      <div className="mt-0.5 text-[11px] text-[var(--sub)]">Lower photo cost</div>
                    </div>
                    <div className="glass-well rounded-2xl p-3.5">
                      <div className="font-display text-xl font-bold text-[var(--ink)] sm:text-2xl">
                        48 hrs
                      </div>
                      <div className="mt-0.5 text-[11px] text-[var(--sub)]">Turnaround</div>
                    </div>
                    <div className="glass-well rounded-2xl p-3.5">
                      <div className="font-display text-xl font-bold text-[var(--ink)] sm:text-2xl">
                        4×
                      </div>
                      <div className="mt-0.5 text-[11px] text-[var(--sub)]">Channel crops</div>
                    </div>
                  </div>

                  <div className="mt-7 flex flex-wrap gap-3">
                    <button
                      onClick={() => onOpenSolution('catalog_ai')}
                      className="btn btn-pri btn-sm"
                    >
                      <span>Open walkthrough</span>
                      <ArrowUpRight className="h-4 w-4" />
                    </button>
                    <button
                      onClick={() => onOpenRequest('catalog_ai', 'pilot')}
                      className="btn btn-gho btn-sm"
                    >
                      Explore a pilot
                    </button>
                  </div>
                </ScrollReveal>

                {/* Right Floating Interactive Studio */}
                <ScrollReveal shiftX={18} parallaxY={22} className="lg:col-span-7">
                  <div className="glass-well rounded-[28px] p-6 sm:p-8">
                    <div className="flex flex-wrap items-center justify-between gap-3">
                      <div className="inline-flex rounded-full bg-[var(--bg-void)]/40 p-1.5 text-xs font-semibold shadow-inner">
                        <button
                          onMouseEnter={() => setImageryMode('before')}
                          onClick={() => setImageryMode('before')}
                          className={`rounded-full px-4 py-1.5 transition-all duration-300 ${
                            imageryMode === 'before'
                              ? 'bg-rose-500 text-white shadow-md'
                              : 'text-[var(--sub)] hover:text-[var(--ink)]'
                          }`}
                        >
                          Before: Raw Packshot
                        </button>
                        <button
                          onMouseEnter={() => setImageryMode('after')}
                          onClick={() => setImageryMode('after')}
                          className={`rounded-full px-4 py-1.5 transition-all duration-300 ${
                            imageryMode === 'after'
                              ? 'bg-[var(--accent-blue)] text-white shadow-md'
                              : 'text-[var(--sub)] hover:text-[var(--ink)]'
                          }`}
                        >
                          After: MOAR AI Studio
                        </button>
                      </div>
                      <span className="text-[11px] font-medium text-[var(--mut)]">
                        Hover to switch · Illustrative Concept
                      </span>
                    </div>

                    {imageryMode === 'before' ? (
                      <div
                        key="img-before"
                        className="stage-content-transition mt-6 flex flex-col items-center justify-center rounded-2xl bg-rose-500/10 p-8 text-center shadow-lg"
                      >
                        <div className="glass-well flex h-32 w-32 flex-col items-center justify-center rounded-2xl">
                          <ImageIcon className="h-9 w-9 text-[var(--mut)]" />
                          <span className="mt-2 font-mono text-[10px] text-[var(--mut)]">
                            FLAT_PACKSHOT.JPG
                          </span>
                        </div>
                        <div className="mt-4 font-display text-base font-bold text-[var(--ink)]">
                          Single Unstyled Vendor Photo
                        </div>
                        <p className="mt-1 max-w-md text-xs text-[var(--sub)]">
                          Waiting 3–4 weeks for physical studio booking, talent casting, and retouching.
                        </p>
                        <div className="mt-4 flex flex-wrap justify-center gap-2 text-xs text-rose-300">
                          <span className="rounded-full bg-rose-500/20 px-3 py-1">$185 / SKU</span>
                          <span className="rounded-full bg-rose-500/20 px-3 py-1">21 Days Wait</span>
                          <span className="rounded-full bg-rose-500/20 px-3 py-1">1 Ratio Only</span>
                        </div>
                      </div>
                    ) : (
                      <div key="img-after" className="stage-content-transition mt-6 space-y-5">
                        <div className="flex flex-wrap items-center justify-between gap-2">
                          <span className="text-xs font-medium text-[var(--sub)]">
                            Generated from 1 input photo · Hover aspect ratio:
                          </span>
                          <div className="flex gap-1.5">
                            {(['1:1', '4:5', '9:16', '16:9'] as const).map((r) => (
                              <button
                                key={r}
                                onMouseEnter={() => setImageryRatio(r)}
                                onClick={() => setImageryRatio(r)}
                                className={`rounded-full px-3 py-1 text-[11px] font-semibold transition-all duration-300 ${
                                  imageryRatio === r
                                    ? 'bg-[var(--accent-cyan)]/20 text-[var(--accent-cyan)] shadow-sm scale-105'
                                    : 'bg-[var(--surface-1)] text-[var(--mut)] hover:text-[var(--ink)]'
                                }`}
                              >
                                {r}
                              </button>
                            ))}
                          </div>
                        </div>

                        <div className="grid grid-cols-1 gap-4 sm:grid-cols-3">
                          <div className="apple-glass rounded-2xl p-4">
                            <span className="rounded-full bg-[var(--accent-cyan)]/15 px-2.5 py-1 text-[10px] font-semibold text-[var(--accent-cyan)]">
                              On-Model · {imageryRatio}
                            </span>
                            <div className="mt-3 font-display text-sm font-bold text-[var(--ink)]">
                              Editorial Studio Pose
                            </div>
                            <p className="mt-1 text-xs text-[var(--sub)]">
                              Garment weave, collar geometry, and drape locked.
                            </p>
                          </div>

                          <div className="apple-glass rounded-2xl p-4">
                            <span className="rounded-full bg-emerald-500/15 px-2.5 py-1 text-[10px] font-semibold text-emerald-400">
                              Lifestyle · {imageryRatio}
                            </span>
                            <div className="mt-3 font-display text-sm font-bold text-[var(--ink)]">
                              Architectural Daylight
                            </div>
                            <p className="mt-1 text-xs text-[var(--sub)]">
                              Natural contact shadows and soft depth-of-field.
                            </p>
                          </div>

                          <div className="apple-glass rounded-2xl p-4">
                            <span className="rounded-full bg-amber-500/15 px-2.5 py-1 text-[10px] font-semibold text-amber-400">
                              SEO Copy + QA
                            </span>
                            <div className="mt-3 font-display text-sm font-bold text-[var(--ink)]">
                              96 / 100 Brand QA
                            </div>
                            <p className="mt-1 text-xs text-[var(--sub)]">
                              Bundled with SEO title, bullets, and human review.
                            </p>
                          </div>
                        </div>
                      </div>
                    )}
                  </div>
                </ScrollReveal>
              </div>
            </div>
          </ScrollReveal>
        </div>

        {/* ============================================================
            CHAPTER 02: LAYOUT SHIFT -> STUDIO ON LEFT, NARRATIVE ON RIGHT
            ============================================================ */}
        <div id="chap-1">
          <ScrollReveal scaleFrom={0.94} parallaxY={18}>
            <div className="apple-glass overflow-hidden rounded-[36px] p-7 sm:p-12 lg:p-14">
              <div className="grid grid-cols-1 items-center gap-12 lg:grid-cols-12">
                {/* Left Floating Studio */}
                <ScrollReveal
                  shiftX={-18}
                  parallaxY={22}
                  className="order-2 lg:order-1 lg:col-span-7"
                >
                  <div className="glass-well rounded-[28px] p-6 sm:p-8">
                    <div className="flex flex-wrap items-center justify-between gap-3">
                      <div className="inline-flex rounded-full bg-[var(--bg-void)]/40 p-1.5 text-xs font-semibold shadow-inner">
                        <button
                          onMouseEnter={() => setCatalogMode('before')}
                          onClick={() => setCatalogMode('before')}
                          className={`rounded-full px-4 py-1.5 transition-all duration-300 ${
                            catalogMode === 'before'
                              ? 'bg-rose-500 text-white shadow-md'
                              : 'text-[var(--sub)] hover:text-[var(--ink)]'
                          }`}
                        >
                          Before: Raw Vendor CSV
                        </button>
                        <button
                          onMouseEnter={() => setCatalogMode('after')}
                          onClick={() => setCatalogMode('after')}
                          className={`rounded-full px-4 py-1.5 transition-all duration-300 ${
                            catalogMode === 'after'
                              ? 'bg-[var(--accent-blue)] text-white shadow-md'
                              : 'text-[var(--sub)] hover:text-[var(--ink)]'
                          }`}
                        >
                          After: Enriched PDP Record
                        </button>
                      </div>
                      <span className="font-mono text-[11px] text-[var(--mut)]">
                        Hover to compare · SKU #M-JKT-409
                      </span>
                    </div>

                    {catalogMode === 'before' ? (
                      <div
                        key="cat-before"
                        className="stage-content-transition mt-6 space-y-3 rounded-2xl bg-rose-500/10 p-6 font-mono text-xs shadow-lg"
                      >
                        <div className="flex items-center justify-between">
                          <span className="font-semibold text-rose-300">
                            QA Score: 34 / 100 (Blocked from publish)
                          </span>
                          <span className="text-[var(--mut)]">3 / 18 Attributes</span>
                        </div>
                        <div className="apple-glass rounded-xl p-4 text-[var(--sub)]">
                          <div>TITLE: &quot;MENS BLU JKT L LINEN BLEND&quot;</div>
                          <div className="mt-1">DESC: &quot;Blue jacket for men size large.&quot;</div>
                          <div className="mt-2.5 text-rose-400">
                            MISSING: Neckline, Fit Type, Sleeve Style, Care Instructions, Occasion, GSM, Country of Origin
                          </div>
                        </div>
                      </div>
                    ) : (
                      <div
                        key="cat-after"
                        className="stage-content-transition mt-6 space-y-4 rounded-2xl bg-emerald-500/10 p-6 shadow-lg"
                      >
                        <div className="flex flex-wrap items-center justify-between gap-2">
                          <div className="font-display text-base font-bold text-[var(--ink)]">
                            Men&apos;s Tailored Mandarin-Collar Linen Blend Overshirt — Navy
                          </div>
                          <span className="rounded-full bg-emerald-500/20 px-3 py-1 text-xs font-semibold text-emerald-400">
                            QA 94 / 100 · Ready
                          </span>
                        </div>

                        <p className="text-xs leading-relaxed text-[var(--sub)]">
                          Breathable 55% linen / 45% organic cotton overshirt featuring a structured Mandarin collar, mother-of-pearl buttons, and tailored resort fit.
                        </p>

                        <div className="flex flex-wrap gap-2">
                          {[
                            'Collar: Mandarin (99%)',
                            'Fabric: Linen-Cotton',
                            'Fit: Regular Tailored',
                            'Sleeve: Long Roll-Tab',
                            'Occasion: Smart Casual',
                            'Care: Machine Wash Cold',
                            'Amazon & Shopify Mapped',
                          ].map((attr) => (
                            <span
                              key={attr}
                              className="apple-glass rounded-full px-3 py-1 text-[11px] font-medium text-[var(--accent-cyan)]"
                            >
                              ✓ {attr}
                            </span>
                          ))}
                        </div>
                      </div>
                    )}
                  </div>
                </ScrollReveal>

                {/* Right Narrative */}
                <ScrollReveal
                  shiftX={18}
                  parallaxY={-12}
                  className="order-1 lg:order-2 lg:col-span-5"
                >
                  <div className="flex flex-wrap items-center gap-2.5 text-xs font-semibold">
                    <span className="font-mono text-[var(--accent-cyan)]">02 / 04</span>
                    <span className="text-[var(--sub)]">Stage 05 &amp; 06 · Catalog &amp; Marketplace</span>
                    <span className="bdg available">Available</span>
                  </div>

                  <h3 className="mt-4 font-display text-3xl font-bold leading-[1.08] text-[var(--ink)] sm:text-4xl">
                    Raw supplier sheets. <span className="ac">Ranked product pages.</span>
                  </h3>

                  <p className="mt-4 text-sm leading-relaxed text-[var(--sub)] sm:text-base">
                    Thin product pages neither rank in search nor convert shoppers. <strong className="text-[var(--ink)]">AI Catalog Intelligence &amp; PDP Enrichment</strong> inspect product images and raw vendor rows to extract 20+ attributes, map taxonomy, and score readiness in seconds.
                  </p>

                  <div className="mt-7 grid grid-cols-3 gap-3">
                    <div className="glass-well rounded-2xl p-3.5">
                      <div className="font-display text-xl font-bold text-[var(--accent-cyan)] sm:text-2xl">
                        98%
                      </div>
                      <div className="mt-0.5 text-[11px] text-[var(--sub)]">Attribute fill</div>
                    </div>
                    <div className="glass-well rounded-2xl p-3.5">
                      <div className="font-display text-xl font-bold text-[var(--ink)] sm:text-2xl">
                        10×
                      </div>
                      <div className="mt-0.5 text-[11px] text-[var(--sub)]">Faster setup</div>
                    </div>
                    <div className="glass-well rounded-2xl p-3.5">
                      <div className="font-display text-xl font-bold text-[var(--ink)] sm:text-2xl">
                        94/100
                      </div>
                      <div className="mt-0.5 text-[11px] text-[var(--sub)]">Avg. QA score</div>
                    </div>
                  </div>

                  <div className="mt-7 flex flex-wrap gap-3">
                    <button
                      onClick={() => onOpenSolution('ai_catalog_intel')}
                      className="btn btn-pri btn-sm"
                    >
                      <span>Open walkthrough</span>
                      <ArrowUpRight className="h-4 w-4" />
                    </button>
                    <button
                      onClick={() => onOpenRequest('ai_catalog_intel', 'pilot')}
                      className="btn btn-gho btn-sm"
                    >
                      Explore a pilot
                    </button>
                  </div>
                </ScrollReveal>
              </div>
            </div>
          </ScrollReveal>
        </div>

        {/* ============================================================
            CHAPTER 03: PANORAMIC CENTERED STAGE LAYOUT SHIFT
            ============================================================ */}
        <div id="chap-2">
          <ScrollReveal scaleFrom={0.93} parallaxY={20}>
            <div className="apple-glass overflow-hidden rounded-[36px] p-7 sm:p-12 lg:p-14">
              <div className="mx-auto max-w-3xl text-center">
                <div className="inline-flex flex-wrap items-center justify-center gap-2.5 text-xs font-semibold">
                  <span className="font-mono text-[var(--accent-cyan)]">03 / 04</span>
                  <span className="text-[var(--sub)]">Stage 02 &amp; 04 · Plan &amp; Merchandise</span>
                  <span className="bdg pilot">Client Pilot</span>
                </div>

                <h3 className="mt-4 font-display text-3xl font-bold leading-[1.08] text-[var(--ink)] sm:text-5xl">
                  Every shelf optimized for <span className="ac">local store demand.</span>
                </h3>

                <p className="mx-auto mt-4 max-w-2xl text-sm leading-relaxed text-[var(--sub)] sm:text-base">
                  Pushing one static planogram to 450 stores wastes prime eye-level space on slow movers while local favourites stock out. <strong className="text-[var(--ink)]">Space Planning &amp; Planograms</strong> tailors facings by store cluster velocity and gross margin return on space (GMROS).
                </p>
              </div>

              <ScrollReveal parallaxY={16} className="mt-10">
                <div className="glass-well mx-auto max-w-4xl rounded-[28px] p-6 sm:p-8">
                  <div className="flex flex-wrap items-center justify-between gap-3">
                    <div className="inline-flex rounded-full bg-[var(--bg-void)]/40 p-1.5 text-xs font-semibold shadow-inner">
                      <button
                        onMouseEnter={() => setPlanoMode('before')}
                        onClick={() => setPlanoMode('before')}
                        className={`rounded-full px-4 py-1.5 transition-all duration-300 ${
                          planoMode === 'before'
                            ? 'bg-rose-500 text-white shadow-md'
                            : 'text-[var(--sub)] hover:text-[var(--ink)]'
                        }`}
                      >
                        Before: Static National Bay
                      </button>
                      <button
                        onMouseEnter={() => setPlanoMode('after')}
                        onClick={() => setPlanoMode('after')}
                        className={`rounded-full px-4 py-1.5 transition-all duration-300 ${
                          planoMode === 'after'
                            ? 'bg-[var(--accent-blue)] text-white shadow-md'
                            : 'text-[var(--sub)] hover:text-[var(--ink)]'
                        }`}
                      >
                        After: Cluster-Optimized Bay
                      </button>
                    </div>

                    <div className="flex items-center gap-4 text-xs font-semibold">
                      <span className="text-[var(--accent-cyan)]">+11% Sales / Linear Ft</span>
                      <span className="text-emerald-400">94% Photo Compliance</span>
                    </div>
                  </div>

                  <div key={planoMode} className="stage-content-transition mt-6 space-y-3.5">
                    {planoMode === 'before' ? (
                      <>
                        <div className="apple-glass flex flex-col gap-2 rounded-2xl p-4 sm:flex-row sm:items-center">
                          <span className="w-24 text-xs font-semibold text-[var(--mut)]">
                            Eye Level
                          </span>
                          <div className="flex-1 rounded-xl bg-amber-500/15 px-4 py-2.5 text-xs font-medium text-amber-300">
                            Slow Premium SKU · 4 Facings (Over-spaced for urban commuter cluster)
                          </div>
                          <div className="flex-1 rounded-xl bg-[var(--surface-2)] px-4 py-2.5 text-xs text-[var(--sub)]">
                            Standard Variant · 4 Facings
                          </div>
                        </div>
                        <div className="apple-glass flex flex-col gap-2 rounded-2xl p-4 sm:flex-row sm:items-center">
                          <span className="w-24 text-xs font-semibold text-[var(--mut)]">
                            Touch Level
                          </span>
                          <div className="flex-1 rounded-xl bg-[var(--surface-2)] px-4 py-2.5 text-xs text-[var(--sub)]">
                            Duplicate Price Tier · 6 Facings (Cannibalizes adjacent SKU)
                          </div>
                        </div>
                        <div className="apple-glass flex flex-col gap-2 rounded-2xl bg-rose-500/10 p-4 sm:flex-row sm:items-center">
                          <span className="w-24 text-xs font-semibold text-rose-300">
                            Bottom Shelf
                          </span>
                          <div className="flex-1 rounded-xl bg-rose-500/20 px-4 py-2.5 text-xs font-semibold text-rose-200">
                            ✕ Local Bestseller · Only 2 Facings · Chronic stockouts by 2:00 PM daily
                          </div>
                        </div>
                      </>
                    ) : (
                      <>
                        <div className="apple-glass flex flex-col gap-2 rounded-2xl p-4 sm:flex-row sm:items-center">
                          <span className="w-24 text-xs font-semibold text-emerald-400">
                            Eye Level
                          </span>
                          <div className="flex-1 rounded-xl bg-emerald-500/20 px-4 py-2.5 text-xs font-semibold text-emerald-200">
                            ✓ Local Bestseller · 6 Facings (+18% GMROS · Zero Mid-Shift Stockouts)
                          </div>
                          <div className="flex-1 rounded-xl bg-cyan-500/20 px-4 py-2.5 text-xs font-medium text-cyan-200">
                            ✓ Regimen Cross-Sell · 4 Facings
                          </div>
                        </div>
                        <div className="apple-glass flex flex-col gap-2 rounded-2xl p-4 sm:flex-row sm:items-center">
                          <span className="w-24 text-xs font-semibold text-[var(--accent-cyan)]">
                            Touch Level
                          </span>
                          <div className="flex-1 rounded-xl bg-blue-500/20 px-4 py-2.5 text-xs font-medium text-blue-200">
                            Core Multipacks · 5 Facings (Matched to local commuter basket size)
                          </div>
                          <div className="rounded-xl bg-[var(--surface-2)] px-4 py-2.5 text-xs text-[var(--sub)]">
                            Selective Prestige · 2 Facings
                          </div>
                        </div>
                        <div className="apple-glass flex flex-col gap-2 rounded-2xl p-4 sm:flex-row sm:items-center">
                          <span className="w-24 text-xs font-semibold text-[var(--mut)]">
                            Bottom Shelf
                          </span>
                          <div className="flex-1 rounded-xl bg-[var(--surface-2)] px-4 py-2.5 text-xs text-[var(--sub)]">
                            High-Capacity Case Reserve · Mobile Photo Audit Verified (94%)
                          </div>
                        </div>
                      </>
                    )}
                  </div>
                </div>
              </ScrollReveal>

              <div className="mt-8 flex flex-wrap justify-center gap-3">
                <button
                  onClick={() => onOpenSolution('space_planning')}
                  className="btn btn-pri btn-sm"
                >
                  <span>Explore Space Planning &amp; Planograms</span>
                  <ArrowUpRight className="h-4 w-4" />
                </button>
                <button
                  onClick={() => onOpenRequest('space_planning', 'pilot')}
                  className="btn btn-gho btn-sm"
                >
                  Explore a pilot
                </button>
              </div>
            </div>
          </ScrollReveal>
        </div>

        {/* ============================================================
            CHAPTER 04: GEO-INTELLIGENCE & CATCHMENT SCORING
            ============================================================ */}
        <div id="chap-3">
          <ScrollReveal scaleFrom={0.94} parallaxY={18}>
            <div className="apple-glass overflow-hidden rounded-[36px] p-7 sm:p-12 lg:p-14">
              <div className="grid grid-cols-1 items-center gap-12 lg:grid-cols-12">
                {/* Left Narrative */}
                <ScrollReveal shiftX={-18} parallaxY={-10} className="lg:col-span-5">
                  <div className="flex flex-wrap items-center gap-2.5 text-xs font-semibold">
                    <span className="font-mono text-[var(--accent-cyan)]">04 / 04</span>
                    <span className="text-[var(--sub)]">Stage 01 &amp; 02 · Discover &amp; Plan</span>
                    <span className="powered">Powered by Propheus</span>
                  </div>

                  <h3 className="mt-4 font-display text-3xl font-bold leading-[1.08] text-[var(--ink)] sm:text-4xl">
                    Score every micro-market <span className="ac">before you sign a lease.</span>
                  </h3>

                  <p className="mt-4 text-sm leading-relaxed text-[var(--sub)] sm:text-base">
                    Legacy expansion relies on stale 5km census averages. <strong className="text-[var(--ink)]">Geo-Intelligence &amp; Catchment Analytics</strong> fuse 250+ multimodal signals across every 1.2 × 0.6 km grid cell to find high-converting store locations without cannibalizing existing outlets.
                  </p>

                  <div className="mt-7 grid grid-cols-3 gap-3">
                    <div className="glass-well rounded-2xl p-3.5">
                      <div className="font-display text-xl font-bold text-[var(--accent-cyan)] sm:text-2xl">
                        250+
                      </div>
                      <div className="mt-0.5 text-[11px] text-[var(--sub)]">Live signals</div>
                    </div>
                    <div className="glass-well rounded-2xl p-3.5">
                      <div className="font-display text-xl font-bold text-[var(--ink)] sm:text-2xl">
                        +23%
                      </div>
                      <div className="mt-0.5 text-[11px] text-[var(--sub)]">Viable zones</div>
                    </div>
                    <div className="glass-well rounded-2xl p-3.5">
                      <div className="font-display text-xl font-bold text-[var(--ink)] sm:text-2xl">
                        +15%
                      </div>
                      <div className="mt-0.5 text-[11px] text-[var(--sub)]">Store revenue</div>
                    </div>
                  </div>

                  <div className="mt-7 flex flex-wrap gap-3">
                    <button
                      onClick={() => onOpenSolution('geo_intel')}
                      className="btn btn-pri btn-sm"
                    >
                      <span>Explore Geo-Intelligence</span>
                      <ArrowUpRight className="h-4 w-4" />
                    </button>
                    <button
                      onClick={() => onOpenRequest('geo_intel', 'partner')}
                      className="btn btn-gho btn-sm"
                    >
                      Meet the solution team
                    </button>
                  </div>
                </ScrollReveal>

                {/* Right Interactive Floating Grid (Hover-responsive cells) */}
                <ScrollReveal shiftX={18} parallaxY={22} className="lg:col-span-7">
                  <div className="glass-well rounded-[28px] p-6 sm:p-8">
                    <div className="flex flex-wrap items-center justify-between gap-2">
                      <span className="text-xs font-semibold text-[var(--ink)]">
                        Interactive 1.2 × 0.6 km Digital Atlas Grid — Hover any block:
                      </span>
                      <span className="font-mono text-xs text-[var(--accent-cyan)]">
                        {geoCells[selectedGeoCell].id} · {geoCells[selectedGeoCell].name}
                      </span>
                    </div>

                    <div className="mt-5 grid grid-cols-2 gap-3.5 sm:grid-cols-3">
                      {geoCells.map((cell, idx) => {
                        const active = selectedGeoCell === idx;
                        return (
                          <button
                            key={cell.id}
                            onMouseEnter={() => setSelectedGeoCell(idx)}
                            onClick={() => setSelectedGeoCell(idx)}
                            className={`rounded-2xl p-4 text-left transition-all duration-300 ${
                              active
                                ? 'bg-[var(--accent-blue)] text-white shadow-xl scale-[1.03]'
                                : 'apple-glass hover:scale-[1.01]'
                            }`}
                          >
                            <div className="flex items-center justify-between">
                              <span
                                className={`font-mono text-[11px] ${
                                  active ? 'text-blue-100' : 'text-[var(--mut)]'
                                }`}
                              >
                                Block {cell.id}
                              </span>
                              <span
                                className={`font-display text-xl font-bold ${
                                  active
                                    ? 'text-white'
                                    : cell.score >= 85
                                    ? 'text-emerald-400'
                                    : cell.score >= 70
                                    ? 'text-[var(--accent-cyan)]'
                                    : 'text-amber-400'
                                }`}
                              >
                                {cell.score}
                              </span>
                            </div>
                            <div
                              className={`mt-1.5 text-xs font-bold truncate ${
                                active ? 'text-white' : 'text-[var(--ink)]'
                              }`}
                            >
                              {cell.name}
                            </div>
                            <div
                              className={`mt-1 text-[10px] ${
                                active ? 'text-blue-100' : 'text-[var(--sub)]'
                              }`}
                            >
                              Mobility {cell.footfall} · {cell.status}
                            </div>
                          </button>
                        );
                      })}
                    </div>

                    <div className="apple-glass mt-5 flex flex-wrap items-center justify-between gap-3 rounded-2xl px-5 py-4 text-xs">
                      <div>
                        <span className="text-[var(--mut)]">Micro-Market Verdict: </span>
                        <strong className="text-[var(--ink)]">
                          {geoCells[selectedGeoCell].name} — {geoCells[selectedGeoCell].status} (Score{' '}
                          {geoCells[selectedGeoCell].score}/100)
                        </strong>
                      </div>
                      <div className="font-medium text-[var(--accent-cyan)]">
                        Footfall: {geoCells[selectedGeoCell].footfall} · Competitors:{' '}
                        {geoCells[selectedGeoCell].comp}
                      </div>
                    </div>
                  </div>
                </ScrollReveal>
              </div>
            </div>
          </ScrollReveal>
        </div>
      </div>
    </section>
  );
}
