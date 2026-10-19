'use client';

import { useEffect, useRef, useState } from 'react';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';

gsap.registerPlugin(ScrollTrigger);

const FRAME_COUNT = 192;
const SLUG = 'john-smith';

/**
 * Builds the public URL for a given frame index (1-based).
 * Files are named: ezgif-frame-001.webp … ezgif-frame-192.webp
 */
function frameSrc(index: number): string {
  const padded = String(index).padStart(3, '0');
  return `/sequence/${SLUG}/ezgif-frame-${padded}.webp`;
}

export default function HeroSection() {
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const containerRef = useRef<HTMLDivElement>(null);
  const [loadedPercent, setLoadedPercent] = useState(0);
  const [isReducedMotion, setIsReducedMotion] = useState(false);
  const [activeBeat, setActiveBeat] = useState(0);

  useEffect(() => {
    const mq = window.matchMedia('(prefers-reduced-motion: reduce)');
    setIsReducedMotion(mq.matches);
    if (mq.matches) return;

    const canvas = canvasRef.current;
    const ctx = canvas?.getContext('2d');
    if (!canvas || !ctx) return;

    const imageCache = new Map<number, HTMLImageElement>();
    let loadedImages = 0;
    let currentFrame = 1;

    let viewportWidth = 0;
    let viewportHeight = 0;

    // ── Render a frame without cropping the source image ───────
    const renderFrame = (index: number) => {
      const img = imageCache.get(index);
      if (!img || !canvas) return;

      const w = viewportWidth;
      const h = viewportHeight;
      if (!w || !h) return;

      const hRatio = w / img.naturalWidth;
      const vRatio = h / img.naturalHeight;
      const ratio = Math.min(hRatio, vRatio);
      const cx = (w - img.naturalWidth * ratio) / 2;
      const cy = (h - img.naturalHeight * ratio) / 2;

      ctx.clearRect(0, 0, w, h);
      ctx.drawImage(
        img,
        0, 0, img.naturalWidth, img.naturalHeight,
        cx, cy, img.naturalWidth * ratio, img.naturalHeight * ratio,
      );
    };

    // ── High-DPI canvas sizing ─────────────────────────────────
    const resizeCanvas = () => {
      const dpr = window.devicePixelRatio || 1;
      viewportWidth = canvas.clientWidth;
      viewportHeight = canvas.clientHeight;
      canvas.width = Math.round(viewportWidth * dpr);
      canvas.height = Math.round(viewportHeight * dpr);
      ctx.setTransform(dpr, 0, 0, dpr, 0, 0);
      renderFrame(currentFrame);
    };

    // ── Load all frames ────────────────────────────────────────
    for (let i = 1; i <= FRAME_COUNT; i++) {
      const img = new Image();
      img.src = frameSrc(i);
      img.onload = () => {
        loadedImages++;
        imageCache.set(i, img);
        setLoadedPercent(Math.round((loadedImages / FRAME_COUNT) * 100));
        if (i === 1) renderFrame(1);
      };
    }

    window.addEventListener('resize', resizeCanvas);
    resizeCanvas();

    // ── GSAP scroll-scrub ──────────────────────────────────────
    const trigger = ScrollTrigger.create({
      trigger: containerRef.current,
      start: 'top top',
      end: '+=400%',
      pin: true,
      scrub: 0.15,
      onUpdate: (self) => {
        const beat = self.progress < 0.34 ? 0 : self.progress < 0.67 ? 1 : 2;
        setActiveBeat((currentBeat) => (currentBeat === beat ? currentBeat : beat));
        const target = Math.max(
          1,
          Math.min(FRAME_COUNT, Math.ceil(self.progress * FRAME_COUNT)),
        );
        if (target !== currentFrame) {
          currentFrame = target;
          renderFrame(target);
        }
      },
    });

    return () => {
      window.removeEventListener('resize', resizeCanvas);
      trigger.kill();
      ScrollTrigger.getAll().forEach((t) => t.kill());
    };
  }, []);

  // ── Reduced-motion fallback: static poster ───────────────────
  if (isReducedMotion) {
    return (
      <div className="relative h-screen w-full overflow-hidden bg-black">
        <img
          src={frameSrc(1)}
          alt="Hero poster"
          className="h-full w-full object-contain"
        />
        <div
          aria-hidden="true"
          className="pointer-events-none absolute inset-y-0 left-0 w-1/3 bg-black/20 backdrop-blur-sm"
        />
        <div
          aria-hidden="true"
          className="pointer-events-none absolute inset-y-0 right-0 w-1/3 bg-black/20 backdrop-blur-sm"
        />
        <div className="absolute inset-0 flex items-center px-8 md:px-20">
          <div className="max-w-xl text-white">
            <p className="mb-4 text-xs uppercase tracking-[0.35em] text-white/60">Welcome</p>
            <h1 className="text-5xl font-semibold tracking-tight md:text-8xl">John Smith</h1>
            <p className="mt-5 max-w-sm text-base leading-relaxed text-white/75 md:text-lg">
              Performance, leadership, and a modern approach to the game.
            </p>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div id="intro" ref={containerRef} className="relative h-screen w-full overflow-hidden bg-black">
      {/* Loading indicator */}
      {loadedPercent < 100 && (
        <div className="absolute top-4 right-4 z-50 text-white/50 text-sm font-mono">
          {loadedPercent}%
        </div>
      )}

      {/* Frame canvas */}
      <canvas
        ref={canvasRef}
        className="absolute inset-0 block h-full w-full"
      />

      <div
        aria-hidden="true"
        className="pointer-events-none absolute inset-y-0 left-0 z-10 w-1/3 bg-black/20 backdrop-blur-sm"
      />
      <div
        aria-hidden="true"
        className="pointer-events-none absolute inset-y-0 right-0 z-10 w-1/3 bg-black/20 backdrop-blur-sm"
      />

      <div className="pointer-events-none absolute inset-0 z-10 flex items-center px-8 md:px-20">
        <div className="max-w-xl text-white">
          <p className="mb-4 text-xs uppercase tracking-[0.35em] text-white/60">
            {activeBeat === 0 ? 'Welcome' : 'The complete athlete'}
          </p>
          <h1 className="text-5xl font-semibold tracking-tight md:text-8xl">
            {activeBeat === 0 && 'John Smith'}
            {activeBeat === 1 && 'Built from the chest out'}
            {activeBeat === 2 && 'Grounded for the next play'}
          </h1>
          <p className="mt-5 max-w-sm text-base leading-relaxed text-white/75 md:text-lg">
            {activeBeat === 0 && 'Performance, leadership, and a modern approach to the game.'}
            {activeBeat === 1 && 'Strength, control, and intent shape every movement.'}
            {activeBeat === 2 && 'A foundation built to move with confidence and purpose.'}
          </p>
        </div>
      </div>

      {/* Scroll hint */}
      <div className="absolute bottom-8 left-1/2 -translate-x-1/2 text-white/70 animate-pulse text-sm uppercase tracking-widest z-10">
        Scroll down
      </div>
    </div>
  );
}
