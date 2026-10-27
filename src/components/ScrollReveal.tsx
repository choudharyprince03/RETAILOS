'use client';

import React, { useEffect, useRef, useState } from 'react';

/* ------------------------------------------------------------------
   Shared scroll engine
   One passive scroll/resize listener + one rAF loop drives every
   scroll-linked element on the page (instead of one listener each).
   ------------------------------------------------------------------ */

type ScrollSubscriber = () => boolean; // return true while still animating

const subscribers = new Set<ScrollSubscriber>();
let rafId = 0;
let listening = false;

function runFrame() {
  rafId = 0;
  let needsMore = false;
  subscribers.forEach((fn) => {
    if (fn()) needsMore = true;
  });
  if (needsMore) rafId = requestAnimationFrame(runFrame);
}

function requestFrame() {
  if (!rafId) rafId = requestAnimationFrame(runFrame);
}

export function subscribeScroll(fn: ScrollSubscriber) {
  subscribers.add(fn);
  if (!listening && typeof window !== 'undefined') {
    window.addEventListener('scroll', requestFrame, { passive: true });
    window.addEventListener('resize', requestFrame, { passive: true });
    listening = true;
  }
  requestFrame();
  return () => {
    subscribers.delete(fn);
    if (subscribers.size === 0 && listening) {
      window.removeEventListener('scroll', requestFrame);
      window.removeEventListener('resize', requestFrame);
      listening = false;
    }
  };
}

export function prefersReducedMotion() {
  return (
    typeof window !== 'undefined' &&
    window.matchMedia?.('(prefers-reduced-motion: reduce)').matches
  );
}

/* ------------------------------------------------------------------
   ScrollReveal
   Crisp, zero-blur, hardware-accelerated entrance animation that
   triggers slightly ahead of the viewport so text and cards are
   immediately sharp in both light and dark modes.
   ------------------------------------------------------------------ */

type RevealVariant = 'up' | 'left' | 'right' | 'zoom' | 'fade';

interface ScrollRevealProps {
  children: React.ReactNode;
  delayMs?: number;
  className?: string;
  /** Kept for prop compatibility */
  parallaxY?: number;
  /** Horizontal entrance direction/offset (negative = from left, positive = from right) */
  shiftX?: number;
  /** Kept for prop compatibility */
  scaleFrom?: number;
  /** Entrance style; inferred from shiftX when omitted */
  variant?: RevealVariant;
}

export default function ScrollReveal({
  children,
  delayMs = 0,
  className = '',
  shiftX = 0,
  variant,
}: ScrollRevealProps) {
  const outerRef = useRef<HTMLDivElement | null>(null);
  const [visible, setVisible] = useState(false);

  const resolvedVariant: RevealVariant =
    variant ?? (shiftX < 0 ? 'left' : shiftX > 0 ? 'right' : 'up');

  const cappedDelay = Math.min(Math.max(0, delayMs), 100);

  useEffect(() => {
    const outer = outerRef.current;
    if (!outer) return;
    if (prefersReducedMotion()) {
      setVisible(true);
      return;
    }

    // Immediately reveal if already within or above the extended viewport
    const rect = outer.getBoundingClientRect();
    const vh = window.innerHeight || 800;
    if (rect.top <= vh + 100) {
      setVisible(true);
      return;
    }

    const io = new IntersectionObserver(
      (entries) => {
        if (entries.some((e) => e.isIntersecting)) {
          setVisible(true);
          io.disconnect();
        }
      },
      { threshold: 0.01, rootMargin: '0px 0px 100px 0px' }
    );
    io.observe(outer);
    return () => io.disconnect();
  }, []);

  return (
    <div
      ref={outerRef}
      style={{ transitionDelay: visible && cappedDelay ? `${cappedDelay}ms` : '0ms' }}
      data-variant={resolvedVariant}
      className={`reveal-outer ${visible ? 'reveal-visible' : 'reveal-hidden'} ${className}`}
    >
      {children}
    </div>
  );
}
