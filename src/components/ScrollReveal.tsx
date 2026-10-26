'use client';

import React, { useEffect, useRef, useState } from 'react';

interface ScrollRevealProps {
  children: React.ReactNode;
  delayMs?: number;
  className?: string;
  /** Vertical parallax amplitude in px as element travels through viewport */
  parallaxY?: number;
  /** Subtle horizontal offset in px that converges to 0 as element centers */
  shiftX?: number;
  /** Kept for prop compatibility; handled cleanly by CSS entrance reveal */
  scaleFrom?: number;
}

export default function ScrollReveal({
  children,
  delayMs = 0,
  className = '',
  parallaxY = 0,
  shiftX = 0,
}: ScrollRevealProps) {
  const outerRef = useRef<HTMLDivElement | null>(null);
  const innerRef = useRef<HTMLDivElement | null>(null);
  const [visible, setVisible] = useState(false);

  useEffect(() => {
    const outer = outerRef.current;
    if (!outer) return;

    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            setVisible(true);
          }
        });
      },
      { threshold: 0.06, rootMargin: '0px 0px -20px 0px' }
    );
    observer.observe(outer);

    const hasMotion = parallaxY !== 0 || shiftX !== 0;
    if (!hasMotion) {
      return () => observer.disconnect();
    }

    let rafId = 0;
    let isRunning = false;
    let currY = 0;
    let currX = 0;
    let targetY = 0;
    let targetX = 0;

    const computeTargets = () => {
      if (!outer) return;
      const rect = outer.getBoundingClientRect();
      const vh = window.innerHeight || 800;
      const raw = (vh - rect.top) / (vh + rect.height);
      const progress = Math.max(0, Math.min(1, raw));

      const centerFactor = Math.max(0, 1 - Math.abs(progress - 0.48) * 1.85);
      targetY = (0.5 - progress) * parallaxY;
      targetX = (1 - centerFactor) * shiftX;
    };

    const tick = () => {
      const inner = innerRef.current;
      if (!inner) {
        isRunning = false;
        return;
      }

      currY += (targetY - currY) * 0.14;
      currX += (targetX - currX) * 0.14;

      inner.style.transform = `translate3d(${currX.toFixed(1)}px, ${currY.toFixed(
        1
      )}px, 0)`;

      const settled =
        Math.abs(targetY - currY) < 0.1 && Math.abs(targetX - currX) < 0.1;

      if (!settled) {
        rafId = requestAnimationFrame(tick);
      } else {
        isRunning = false;
      }
    };

    const onScroll = () => {
      computeTargets();
      if (!isRunning) {
        isRunning = true;
        rafId = requestAnimationFrame(tick);
      }
    };

    computeTargets();
    currY = targetY;
    currX = targetX;
    if (innerRef.current) {
      innerRef.current.style.transform = `translate3d(${currX.toFixed(
        1
      )}px, ${currY.toFixed(1)}px, 0)`;
    }

    window.addEventListener('scroll', onScroll, { passive: true });
    window.addEventListener('resize', onScroll, { passive: true });

    return () => {
      observer.disconnect();
      cancelAnimationFrame(rafId);
      window.removeEventListener('scroll', onScroll);
      window.removeEventListener('resize', onScroll);
    };
  }, [parallaxY, shiftX]);

  const hasMotion = parallaxY !== 0 || shiftX !== 0;

  return (
    <div
      ref={outerRef}
      style={{ transitionDelay: `${delayMs}ms` }}
      className={`reveal-outer ${
        visible ? 'reveal-visible' : 'reveal-hidden'
      } ${className}`}
    >
      {hasMotion ? (
        <div ref={innerRef} className="h-full">
          {children}
        </div>
      ) : (
        children
      )}
    </div>
  );
}
