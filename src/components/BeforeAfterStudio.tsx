'use client';

import React, { useState } from 'react';
import { BeforeAfterScenario } from '@/data/retailos-data';
import {
  Sparkles,
  CheckCircle2,
  AlertTriangle,
  FileSpreadsheet,
  Image as ImageIcon,
} from 'lucide-react';

interface BeforeAfterStudioProps {
  solutionName: string;
  scenarios: BeforeAfterScenario[];
}

export default function BeforeAfterStudio({
  solutionName,
  scenarios,
}: BeforeAfterStudioProps) {
  const [selectedIdx, setSelectedIdx] = useState(0);
  const [viewMode, setViewMode] = useState<'split' | 'before' | 'after'>('split');
  const [selectedChannel, setSelectedChannel] = useState<'1:1' | '4:5' | '9:16' | '16:9'>('4:5');
  const [selectedCell, setSelectedCell] = useState<number>(4);

  if (!scenarios || scenarios.length === 0) return null;
  const active = scenarios[selectedIdx] || scenarios[0];

  return (
    <div className="apple-glass mt-10 rounded-[36px] p-7 sm:p-11">
      {/* Top Header & Concept Disclaimer — No Border Lines */}
      <div className="flex flex-wrap items-start justify-between gap-4">
        <div>
          <div className="flex items-center gap-2 text-xs font-semibold uppercase tracking-wider text-[var(--accent-cyan)]">
            <Sparkles className="h-3.5 w-3.5" />
            <span>Interactive Before &amp; After Concept Preview</span>
          </div>
          <h3 className="mt-2 font-display text-2xl font-bold tracking-tight text-[var(--ink)]">
            Visual Scenario Explorer · {solutionName}
          </h3>
          <p className="mt-1 text-xs text-[var(--sub)] sm:text-sm">
            Select a retail scenario below to compare baseline manual operations against the target MOAR RetailOS workflow.
          </p>
        </div>

        <span className="inline-flex items-center gap-1.5 rounded-full bg-amber-500/12 px-3.5 py-1.5 text-[11px] font-medium text-amber-400">
          <AlertTriangle className="h-3.5 w-3.5" />
          Illustrative Concept · Not Live AI Execution
        </span>
      </div>

      {/* Controls Bar: Scenario Selector + View Mode Switcher */}
      <div className="mt-7 flex flex-wrap items-center justify-between gap-3">
        <div className="flex flex-wrap gap-2" role="tablist" aria-label="Visual scenarios">
          {scenarios.map((sc, idx) => (
            <button
              key={sc.id}
              role="tab"
              aria-selected={selectedIdx === idx}
              onClick={() => setSelectedIdx(idx)}
              className={`rounded-full px-4 py-2 text-xs font-semibold transition-all ${
                selectedIdx === idx
                  ? 'bg-[var(--accent-blue)] text-white shadow-lg'
                  : 'glass-well text-[var(--sub)] hover:text-[var(--ink)]'
              }`}
            >
              <span className="opacity-75">{sc.category}:</span> {sc.label}
            </button>
          ))}
        </div>

        <div className="glass-well inline-flex rounded-full p-1 text-xs font-medium">
          <button
            onClick={() => setViewMode('before')}
            className={`rounded-full px-3.5 py-1.5 transition ${
              viewMode === 'before'
                ? 'bg-[var(--accent-blue)] text-white shadow-sm'
                : 'text-[var(--sub)] hover:text-[var(--ink)]'
            }`}
          >
            Before Only
          </button>
          <button
            onClick={() => setViewMode('split')}
            className={`rounded-full px-3.5 py-1.5 transition ${
              viewMode === 'split'
                ? 'bg-[var(--accent-blue)] text-white shadow-sm'
                : 'text-[var(--sub)] hover:text-[var(--ink)]'
            }`}
          >
            Side-by-Side
          </button>
          <button
            onClick={() => setViewMode('after')}
            className={`rounded-full px-3.5 py-1.5 transition ${
              viewMode === 'after'
                ? 'bg-[var(--accent-blue)] text-white shadow-sm'
                : 'text-[var(--sub)] hover:text-[var(--ink)]'
            }`}
          >
            After (MOAR)
          </button>
        </div>
      </div>

      {/* Interactive Visual Canvas based on visualType */}
      <div
        className={`mt-7 grid gap-6 ${
          viewMode === 'split' ? 'grid-cols-1 lg:grid-cols-2' : 'grid-cols-1'
        }`}
      >
        {/* BEFORE PANEL */}
        {(viewMode === 'split' || viewMode === 'before') && (
          <div className="glass-well flex flex-col justify-between rounded-[28px] p-6 sm:p-7">
            <div>
              <div className="flex items-center justify-between gap-2">
                <span className="inline-flex items-center gap-1.5 rounded-full bg-rose-500/15 px-3 py-1 text-[11px] font-semibold uppercase tracking-wider text-rose-400">
                  Baseline · Before
                </span>
                <span className="text-xs text-[var(--mut)]">{active.category}</span>
              </div>
              <h4 className="mt-3.5 font-display text-lg font-bold text-[var(--ink)]">
                {active.beforeTitle}
              </h4>
              <p className="mt-1 text-xs text-[var(--sub)]">{active.beforeSubtitle}</p>

              {/* Visual Diagram — BEFORE */}
              <div className="apple-glass my-5 rounded-2xl p-5">
                {active.visualType === 'imagery' && (
                  <div className="flex flex-col items-center justify-center py-3 text-center">
                    <div className="glass-well relative flex h-36 w-36 items-center justify-center rounded-2xl">
                      <ImageIcon className="h-10 w-10 text-[var(--mut)] opacity-50" />
                      <span className="absolute bottom-2 rounded-full bg-black/50 px-2.5 py-0.5 text-[10px] text-slate-300">
                        RAW_PACKSHOT_01.JPG
                      </span>
                    </div>
                    <div className="mt-3 text-xs text-[var(--mut)]">
                      Single static flat-lay · Flat lighting · No model or lifestyle context
                    </div>
                  </div>
                )}

                {active.visualType === 'catalog' && (
                  <div className="space-y-2.5 font-mono text-xs">
                    <div className="flex items-center justify-between text-[11px] text-[var(--mut)]">
                      <span className="flex items-center gap-1.5">
                        <FileSpreadsheet className="h-3.5 w-3.5" /> supplier_feed_raw.csv
                      </span>
                      <span className="text-rose-400">15 Missing Mandatory Fields</span>
                    </div>
                    <div className="glass-well rounded-xl p-3.5 text-[11px] text-[var(--sub)]">
                      <div>
                        <span className="text-[var(--mut)]">SKU:</span> M-JKT-409
                      </div>
                      <div>
                        <span className="text-[var(--mut)]">TITLE:</span> &quot;MENS BLU JKT L LINEN BLEND&quot;
                      </div>
                      <div>
                        <span className="text-[var(--mut)]">ATTRS:</span> Color=Blue; Size=L;{' '}
                        <span className="text-rose-400">[Neckline: NULL] [Sleeve: NULL] [Care: NULL]</span>
                      </div>
                    </div>
                  </div>
                )}

                {active.visualType === 'planogram' && (
                  <div className="space-y-2.5">
                    <div className="flex items-center justify-between text-[11px] text-[var(--mut)]">
                      <span>Standard National Bay (All 450 Stores)</span>
                      <span className="text-rose-400">Stockout &amp; Dead-Space Hotspots</span>
                    </div>
                    <div className="space-y-2 rounded-xl bg-[var(--bg-void)]/30 p-3">
                      <div className="flex items-center gap-2">
                        <span className="w-14 text-[10px] text-[var(--mut)]">Eye Lvl</span>
                        <div className="flex-1 rounded-lg bg-amber-500/15 px-2.5 py-1.5 text-[10px] text-amber-300">
                          Slow Premium SKU (4 Facings · 0.8/day)
                        </div>
                        <div className="flex-1 rounded-lg bg-slate-500/15 px-2.5 py-1.5 text-[10px] text-[var(--sub)]">
                          Standard SKU (4 Facings)
                        </div>
                      </div>
                      <div className="flex items-center gap-2">
                        <span className="w-14 text-[10px] text-[var(--mut)]">Touch Lvl</span>
                        <div className="flex-1 rounded-lg bg-slate-500/15 px-2.5 py-1.5 text-[10px] text-[var(--sub)]">
                          Multipack (3 Facings)
                        </div>
                        <div className="flex-1 rounded-lg bg-amber-500/15 px-2.5 py-1.5 text-[10px] text-amber-300">
                          Duplicate Tier (3 Facings)
                        </div>
                      </div>
                      <div className="flex items-center gap-2">
                        <span className="w-14 text-[10px] text-[var(--mut)]">Bottom</span>
                        <div className="flex-1 rounded-lg bg-rose-500/20 px-2.5 py-1.5 text-[10px] font-medium text-rose-300">
                          Top Local Seller (Only 2 Facings · Stockout 2pm)
                        </div>
                      </div>
                    </div>
                  </div>
                )}

                {active.visualType === 'geo' && (
                  <div className="flex flex-col items-center justify-center py-2">
                    <div className="glass-well relative flex h-32 w-full items-center justify-center rounded-xl">
                      <div className="flex h-24 w-24 items-center justify-center rounded-full bg-rose-500/15 text-center shadow-inner">
                        <div>
                          <div className="text-xs font-semibold text-rose-300">5 km Radius</div>
                          <div className="text-[10px] text-[var(--mut)]">2022 Census Avg</div>
                        </div>
                      </div>
                    </div>
                    <p className="mt-2.5 text-[11px] text-[var(--mut)]">
                      Single static radius treats rivers, highways, and micro-neighborhoods identically
                    </p>
                  </div>
                )}
              </div>

              <ul className="space-y-2 text-xs text-[var(--sub)]">
                {active.beforePoints.map((pt, i) => (
                  <li key={i} className="flex items-start gap-2">
                    <span className="mt-0.5 text-rose-400">✕</span>
                    <span>{pt}</span>
                  </li>
                ))}
              </ul>
            </div>

            <div className="mt-6 grid grid-cols-3 gap-2.5">
              {active.beforeMetrics.map((m, i) => (
                <div key={i} className="apple-glass rounded-2xl p-3">
                  <div className="text-sm font-bold text-rose-400">{m.value}</div>
                  <div className="mt-0.5 text-[11px] text-[var(--mut)]">{m.label}</div>
                </div>
              ))}
            </div>
          </div>
        )}

        {/* AFTER PANEL */}
        {(viewMode === 'split' || viewMode === 'after') && (
          <div className="glass-well flex flex-col justify-between rounded-[28px] p-6 sm:p-7">
            <div>
              <div className="flex items-center justify-between gap-2">
                <span className="inline-flex items-center gap-1.5 rounded-full bg-emerald-500/15 px-3 py-1 text-[11px] font-semibold uppercase tracking-wider text-emerald-400">
                  Target · With MOAR RetailOS
                </span>
                <span className="text-xs text-[var(--accent-cyan)]">Interactive Preview</span>
              </div>
              <h4 className="mt-3.5 font-display text-lg font-bold text-[var(--ink)]">
                {active.afterTitle}
              </h4>
              <p className="mt-1 text-xs text-[var(--sub)]">{active.afterSubtitle}</p>

              {/* Visual Diagram — AFTER (Interactive per type) */}
              <div className="apple-glass my-5 rounded-2xl p-5">
                {active.visualType === 'imagery' && (
                  <div>
                    <div className="mb-3 flex items-center justify-between">
                      <span className="text-[11px] font-medium text-[var(--sub)]">
                        Select output channel ratio:
                      </span>
                      <div className="flex gap-1.5">
                        {(['1:1', '4:5', '9:16', '16:9'] as const).map((ratio) => (
                          <button
                            key={ratio}
                            onClick={() => setSelectedChannel(ratio)}
                            className={`rounded-full px-2.5 py-0.5 text-[10px] font-semibold transition ${
                              selectedChannel === ratio
                                ? 'bg-[var(--accent-blue)] text-white shadow-sm'
                                : 'bg-[var(--surface-2)] text-[var(--mut)] hover:text-[var(--ink)]'
                            }`}
                          >
                            {ratio}
                          </button>
                        ))}
                      </div>
                    </div>
                    <div className="grid grid-cols-3 gap-2.5">
                      <div className="glass-well rounded-xl p-3 text-center">
                        <div className="text-[10px] font-semibold text-[var(--accent-cyan)]">
                          On-Model ({selectedChannel})
                        </div>
                        <div className="mt-1.5 text-xs font-medium text-[var(--ink)]">
                          Editorial Studio Pose
                        </div>
                        <div className="mt-1 text-[10px] text-[var(--mut)]">Drape &amp; weave locked</div>
                      </div>
                      <div className="glass-well rounded-xl p-3 text-center">
                        <div className="text-[10px] font-semibold text-emerald-400">
                          Lifestyle ({selectedChannel})
                        </div>
                        <div className="mt-1.5 text-xs font-medium text-[var(--ink)]">
                          Architectural Daylight
                        </div>
                        <div className="mt-1 text-[10px] text-[var(--mut)]">Natural contact shadow</div>
                      </div>
                      <div className="glass-well rounded-xl p-3 text-center">
                        <div className="text-[10px] font-semibold text-amber-400">SEO Copy + QA</div>
                        <div className="mt-1.5 text-xs font-medium text-[var(--ink)]">
                          96/100 Brand QA
                        </div>
                        <div className="mt-1 text-[10px] text-[var(--mut)]">Human verified</div>
                      </div>
                    </div>
                  </div>
                )}

                {active.visualType === 'catalog' && (
                  <div className="space-y-3 text-xs">
                    <div className="flex items-center justify-between">
                      <span className="font-semibold text-[var(--ink)]">
                        Men&apos;s Tailored Mandarin-Collar Linen Blend Overshirt — Navy
                      </span>
                      <span className="rounded-full bg-emerald-500/15 px-2.5 py-0.5 text-[10px] font-semibold text-emerald-400">
                        QA 94 / 100
                      </span>
                    </div>
                    <div className="flex flex-wrap gap-1.5">
                      {[
                        'Collar: Mandarin (99%)',
                        'Fabric: 55% Linen / 45% Cotton',
                        'Fit: Regular Tailored',
                        'Sleeve: Long Roll-Tab',
                        'Occasion: Resort & Smart Casual',
                        'Care: Machine Wash Cold',
                      ].map((tag) => (
                        <span
                          key={tag}
                          className="rounded-full bg-[var(--accent-blue)]/15 px-2.5 py-1 text-[10px] font-medium text-[var(--accent-cyan)]"
                        >
                          {tag}
                        </span>
                      ))}
                    </div>
                  </div>
                )}

                {active.visualType === 'planogram' && (
                  <div className="space-y-2.5">
                    <div className="flex items-center justify-between text-[11px]">
                      <span className="font-medium text-[var(--ink)]">
                        Cluster A (Urban Commuter) · GMROS-Optimized Bay
                      </span>
                      <span className="text-emerald-400">94% Photo Compliance</span>
                    </div>
                    <div className="space-y-2 rounded-xl bg-[var(--bg-void)]/30 p-3">
                      <div className="flex items-center gap-2">
                        <span className="w-14 text-[10px] text-[var(--mut)]">Eye Lvl</span>
                        <div className="flex-1 rounded-lg bg-emerald-500/20 px-2.5 py-1.5 text-[10px] text-emerald-300">
                          Top Local Seller (6 Facings · +18% Margin)
                        </div>
                        <div className="flex-1 rounded-lg bg-cyan-500/20 px-2.5 py-1.5 text-[10px] text-cyan-300">
                          Co-Merchandised Regimen (4 Facings)
                        </div>
                      </div>
                      <div className="flex items-center gap-2">
                        <span className="w-14 text-[10px] text-[var(--mut)]">Touch Lvl</span>
                        <div className="flex-1 rounded-lg bg-blue-500/20 px-2.5 py-1.5 text-[10px] text-blue-300">
                          Core Multipack (4 Facings · Zero Stockout)
                        </div>
                        <div className="flex-1 rounded-lg bg-slate-500/15 px-2.5 py-1.5 text-[10px] text-[var(--sub)]">
                          Selective Prestige (2 Facings)
                        </div>
                      </div>
                      <div className="flex items-center gap-2">
                        <span className="w-14 text-[10px] text-[var(--mut)]">Bottom</span>
                        <div className="flex-1 rounded-lg bg-slate-500/15 px-2.5 py-1.5 text-[10px] text-[var(--sub)]">
                          Bulk Case Reserve &amp; Backstock Buffer
                        </div>
                      </div>
                    </div>
                  </div>
                )}

                {active.visualType === 'geo' && (
                  <div>
                    <div className="mb-2.5 flex items-center justify-between text-[11px]">
                      <span className="text-[var(--sub)]">
                        Click a 1.2 × 0.6 km micro-market cell to inspect score:
                      </span>
                      <span className="font-mono text-[var(--accent-cyan)]">
                        Cell #{selectedCell + 101} · Score {[74, 82, 68, 79, 92, 86][selectedCell]}/100
                      </span>
                    </div>
                    <div className="grid grid-cols-6 gap-2">
                      {[
                        { score: 74, label: 'Mod' },
                        { score: 82, label: 'High' },
                        { score: 68, label: 'Hold' },
                        { score: 79, label: 'Good' },
                        { score: 92, label: 'Prime' },
                        { score: 86, label: 'High' },
                      ].map((cell, idx) => (
                        <button
                          key={idx}
                          onClick={() => setSelectedCell(idx)}
                          className={`rounded-xl p-2.5 text-center transition-all ${
                            selectedCell === idx
                              ? 'bg-[var(--accent-blue)] text-white shadow-lg scale-[1.04]'
                              : 'glass-well text-[var(--sub)] hover:text-[var(--ink)]'
                          }`}
                        >
                          <div
                            className={`font-mono text-xs font-bold ${
                              selectedCell === idx ? 'text-white' : 'text-[var(--accent-cyan)]'
                            }`}
                          >
                            {cell.score}
                          </div>
                          <div
                            className={`text-[9px] ${
                              selectedCell === idx ? 'text-blue-100' : 'text-[var(--mut)]'
                            }`}
                          >
                            {cell.label}
                          </div>
                        </button>
                      ))}
                    </div>
                  </div>
                )}
              </div>

              <ul className="space-y-2 text-xs text-[var(--sub)]">
                {active.afterPoints.map((pt, i) => (
                  <li key={i} className="flex items-start gap-2">
                    <CheckCircle2 className="mt-0.5 h-3.5 w-3.5 shrink-0 text-emerald-400" />
                    <span>{pt}</span>
                  </li>
                ))}
              </ul>
            </div>

            <div className="mt-6 grid grid-cols-3 gap-2.5">
              {active.afterMetrics.map((m, i) => (
                <div key={i} className="apple-glass rounded-2xl p-3">
                  <div
                    className={`text-sm font-bold ${
                      m.status === 'cyan' ? 'text-[var(--accent-cyan)]' : 'text-emerald-400'
                    }`}
                  >
                    {m.value}
                  </div>
                  <div className="mt-0.5 text-[11px] text-[var(--mut)]">{m.label}</div>
                </div>
              ))}
            </div>
          </div>
        )}
      </div>
    </div>
  );
}
