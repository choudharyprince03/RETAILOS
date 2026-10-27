'use client';

import React, { useEffect, useMemo, useRef, useState } from 'react';
import { SOL, DOMAINS, BADGES } from '@/data/retailos-data';
import {
  Search,
  CornerDownLeft,
  ArrowUp,
  ArrowDown,
  Layers,
  Sparkles,
  Compass,
  Calendar,
  MessageCircle,
  SunMoon,
  Workflow,
  ShieldCheck,
  LayoutGrid,
} from 'lucide-react';

export type PaletteAction =
  | { type: 'solution'; id: string }
  | { type: 'section'; id: string }
  | { type: 'request'; kind: string }
  | { type: 'theme' }
  | { type: 'prd' };

interface CommandPaletteProps {
  open: boolean;
  onClose: () => void;
  onAction: (action: PaletteAction) => void;
}

interface Item {
  key: string;
  group: 'Jump to' | 'Capabilities' | 'Actions';
  title: string;
  hint?: string;
  badge?: string;
  badgeClass?: string;
  icon: React.ReactNode;
  haystack: string;
  action: PaletteAction;
}

const SECTION_ITEMS: Item[] = [
  {
    key: 'sec-valuechain',
    group: 'Jump to',
    title: 'Retail value chain',
    hint: '9 lifecycle stages',
    icon: <Workflow className="h-4 w-4" />,
    haystack: 'value chain stages lifecycle bottleneck',
    action: { type: 'section', id: 'valuechain' },
  },
  {
    key: 'sec-flagship',
    group: 'Jump to',
    title: 'Priority previews',
    hint: '4 interactive before / after studios',
    icon: <Sparkles className="h-4 w-4" />,
    haystack: 'priority previews flagship demos before after',
    action: { type: 'section', id: 'flagshipSec' },
  },
  {
    key: 'sec-explorer',
    group: 'Jump to',
    title: 'Solution library',
    hint: `All ${SOL.length} capabilities by domain`,
    icon: <LayoutGrid className="h-4 w-4" />,
    haystack: 'solutions library capabilities all explorer',
    action: { type: 'section', id: 'explorerSec' },
  },
  {
    key: 'sec-proof',
    group: 'Jump to',
    title: 'Proof & how we engage',
    hint: 'Metrics, engagement model, assurance',
    icon: <ShieldCheck className="h-4 w-4" />,
    haystack: 'proof process engage metrics security governance',
    action: { type: 'section', id: 'proofSec' },
  },
];

const ACTION_ITEMS: Item[] = [
  {
    key: 'act-workshop',
    group: 'Actions',
    title: 'Book an operator workshop',
    icon: <Calendar className="h-4 w-4" />,
    haystack: 'book workshop session meeting',
    action: { type: 'request', kind: 'workshop' },
  },
  {
    key: 'act-connect',
    group: 'Actions',
    title: 'Connect with the MOAR team',
    icon: <MessageCircle className="h-4 w-4" />,
    haystack: 'connect contact talk enquiry email',
    action: { type: 'request', kind: 'general' },
  },
  {
    key: 'act-theme',
    group: 'Actions',
    title: 'Toggle light / dark appearance',
    icon: <SunMoon className="h-4 w-4" />,
    haystack: 'theme dark light appearance mode',
    action: { type: 'theme' },
  },
  {
    key: 'act-prd',
    group: 'Actions',
    title: 'Open Phase 1 PRD & project plan',
    icon: <Compass className="h-4 w-4" />,
    haystack: 'prd plan project phase product requirements',
    action: { type: 'prd' },
  },
];

const SOLUTION_ITEMS: Item[] = SOL.map((s) => ({
  key: `sol-${s.id}`,
  group: 'Capabilities' as const,
  title: s.name,
  hint: s.head,
  badge: BADGES[s.badge],
  badgeClass: s.badge,
  icon: <Layers className="h-4 w-4" />,
  haystack: [s.name, s.head, s.capability, DOMAINS[s.domain], s.caps.join(' '), (s.tech || []).join(' ')]
    .join(' ')
    .toLowerCase(),
  action: { type: 'solution', id: s.id },
}));

export default function CommandPalette({ open, onClose, onAction }: CommandPaletteProps) {
  const [query, setQuery] = useState('');
  const [cursor, setCursor] = useState(0);
  const inputRef = useRef<HTMLInputElement | null>(null);
  const listRef = useRef<HTMLDivElement | null>(null);

  const results = useMemo(() => {
    const q = query.trim().toLowerCase();
    if (!q) {
      return [...SECTION_ITEMS, ...SOLUTION_ITEMS.slice(0, 6), ...ACTION_ITEMS];
    }
    const terms = q.split(/\s+/);
    const match = (it: Item) =>
      terms.every((t) => it.haystack.includes(t) || it.title.toLowerCase().includes(t));
    return [
      ...SOLUTION_ITEMS.filter(match),
      ...SECTION_ITEMS.filter(match),
      ...ACTION_ITEMS.filter(match),
    ];
  }, [query]);

  // Reset on open
  useEffect(() => {
    if (!open) return;
    setQuery('');
    setCursor(0);
    const t = window.setTimeout(() => inputRef.current?.focus(), 20);
    const prev = document.body.style.overflow;
    document.body.style.overflow = 'hidden';
    return () => {
      window.clearTimeout(t);
      document.body.style.overflow = prev;
    };
  }, [open]);

  useEffect(() => setCursor(0), [query]);

  // Keep highlighted row visible
  useEffect(() => {
    const el = listRef.current?.querySelector<HTMLElement>(`[data-idx="${cursor}"]`);
    el?.scrollIntoView({ block: 'nearest' });
  }, [cursor]);

  if (!open) return null;

  const run = (it: Item | undefined) => {
    if (!it) return;
    onClose();
    // let the modal unmount before scrolling / opening
    window.setTimeout(() => onAction(it.action), 10);
  };

  const onKeyDown = (e: React.KeyboardEvent) => {
    if (e.key === 'ArrowDown') {
      e.preventDefault();
      setCursor((c) => Math.min(results.length - 1, c + 1));
    } else if (e.key === 'ArrowUp') {
      e.preventDefault();
      setCursor((c) => Math.max(0, c - 1));
    } else if (e.key === 'Enter') {
      e.preventDefault();
      run(results[cursor]);
    } else if (e.key === 'Escape') {
      e.preventDefault();
      onClose();
    }
  };

  let lastGroup = '';

  return (
    <div
      className="fixed inset-0 z-[70] flex items-start justify-center px-4 pt-[12vh]"
      role="dialog"
      aria-modal="true"
      aria-label="Search RetailOS"
      onKeyDown={onKeyDown}
    >
      <div
        className="palette-backdrop absolute inset-0 bg-[#060b1a]/70 backdrop-blur-md"
        onClick={onClose}
      />

      <div className="palette-panel apple-glass relative w-full max-w-[620px] overflow-hidden rounded-[26px]">
        {/* Brand hairline */}
        <div
          aria-hidden="true"
          className="absolute inset-x-0 top-0 h-px bg-gradient-to-r from-transparent via-[#ffc502]/70 to-transparent"
        />

        {/* Input */}
        <div className="flex items-center gap-3 border-b border-[var(--line-2)] px-5 py-4">
          <Search className="h-4.5 w-4.5 shrink-0 text-[var(--accent-cyan)]" />
          <input
            ref={inputRef}
            value={query}
            onChange={(e) => setQuery(e.target.value)}
            placeholder="Search capabilities, sections or actions…"
            className="w-full bg-transparent text-[15px] text-[var(--ink)] placeholder:text-[var(--mut)] focus:outline-none"
            aria-controls="palette-list"
            aria-activedescendant={results[cursor] ? `pal-${results[cursor].key}` : undefined}
          />
          <kbd className="kbd">esc</kbd>
        </div>

        {/* Results */}
        <div
          id="palette-list"
          ref={listRef}
          role="listbox"
          className="max-h-[52vh] overflow-y-auto p-2"
        >
          {results.length === 0 && (
            <div className="px-4 py-12 text-center">
              <p className="text-sm text-[var(--sub)]">No matches for &ldquo;{query}&rdquo;</p>
              <button
                onClick={() => run(ACTION_ITEMS[1])}
                className="mt-3 text-xs font-semibold text-[var(--accent-cyan)] hover:underline"
              >
                Ask the MOAR team instead →
              </button>
            </div>
          )}

          {results.map((it, idx) => {
            const showHeader = it.group !== lastGroup;
            lastGroup = it.group;
            const on = idx === cursor;
            return (
              <React.Fragment key={it.key}>
                {showHeader && (
                  <div className="px-3 pb-1.5 pt-3 text-[10.5px] font-semibold uppercase tracking-widest text-[var(--mut)]">
                    {it.group}
                  </div>
                )}
                <button
                  id={`pal-${it.key}`}
                  data-idx={idx}
                  role="option"
                  aria-selected={on}
                  onMouseMove={() => setCursor(idx)}
                  onClick={() => run(it)}
                  className={`group relative flex w-full items-center gap-3 rounded-2xl px-3 py-2.5 text-left transition-colors ${
                    on ? 'bg-[var(--surface-2)]' : ''
                  }`}
                >
                  {on && (
                    <span
                      aria-hidden="true"
                      className="absolute left-0 top-1/2 h-5 w-[3px] -translate-y-1/2 rounded-full bg-[#ffc502]"
                    />
                  )}
                  <span
                    className={`flex h-8 w-8 shrink-0 items-center justify-center rounded-xl transition-colors ${
                      on
                        ? 'bg-[#1756d7] text-white'
                        : 'bg-[var(--surface-1)] text-[var(--sub)]'
                    }`}
                  >
                    {it.icon}
                  </span>
                  <span className="min-w-0 flex-1">
                    <span className="block truncate text-sm font-medium text-[var(--ink)]">
                      {it.title}
                    </span>
                    {it.hint && (
                      <span className="block truncate text-xs text-[var(--mut)]">{it.hint}</span>
                    )}
                  </span>
                  {it.badge && <span className={`bdg ${it.badgeClass} hidden sm:inline`}>{it.badge}</span>}
                  <CornerDownLeft
                    className={`h-3.5 w-3.5 shrink-0 text-[var(--mut)] transition-opacity ${
                      on ? 'opacity-100' : 'opacity-0'
                    }`}
                  />
                </button>
              </React.Fragment>
            );
          })}
        </div>

        {/* Footer hints */}
        <div className="flex items-center justify-between gap-3 border-t border-[var(--line-2)] px-5 py-3 text-[11px] text-[var(--mut)]">
          <div className="flex items-center gap-3">
            <span className="flex items-center gap-1.5">
              <kbd className="kbd"><ArrowUp className="h-3 w-3" /></kbd>
              <kbd className="kbd"><ArrowDown className="h-3 w-3" /></kbd>
              navigate
            </span>
            <span className="flex items-center gap-1.5">
              <kbd className="kbd"><CornerDownLeft className="h-3 w-3" /></kbd>
              open
            </span>
          </div>
          <span className="flex items-center gap-1.5">
            <img src="/moar-logo-white.png" alt="" className="moar-logo-white h-2.5 w-auto opacity-70" />
            <img src="/moar-logo-dark.png" alt="" className="moar-logo-dark h-2.5 w-auto opacity-70" />
            <span>RetailOS</span>
          </span>
        </div>
      </div>
    </div>
  );
}
