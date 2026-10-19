'use client';

import { useEffect, useRef, useState, useCallback } from 'react';
import { Coach } from '@/lib/schema';

/* ============================================================
   ✏️  TUNING PANEL: starting values (the sliders override these live)
   ============================================================ */

type Layout = {
  coverAmount: number; // 0 = whole frame visible (contain), 1 = fills screen (cover)
  zoom: number;        // extra zoom on top of the fit (1 = none)
  focusX: number;      // 0 = show left edge, 0.5 = centre, 1 = show right edge
  focusY: number;      // 0 = show top, 0.5 = centre, 1 = show bottom (reveals feet)
  offsetX: number;     // nudge as a fraction of canvas width
  offsetY: number;     // nudge as a fraction of canvas height
};

const LAYOUT: { desktop: Layout; mobile: Layout } = {
  desktop: { coverAmount: 0.5, zoom: 1, focusX: 0.5, focusY: 0.7, offsetX: 0, offsetY: 0 },
  mobile: { coverAmount: 0.6, zoom: 1, focusX: 0.5, focusY: 0.7, offsetX: 0, offsetY: 0 },
};

const BG_COLOR = '#000000';       // colour behind the image where bars appear
const MOBILE_BREAKPOINT = 768;    // at or below this width, mobile frames are used
const TEST_FRAME = 1;             // which frame number to preview
const SHOW_DEBUG_PANEL = true;    // set to false to hide the tuning panel

/* ============================================================ */

interface Props {
  coach: Coach;
}

export default function CanvasSingleFrame({ coach }: Props) {
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const containerRef = useRef<HTMLDivElement>(null);
  const imgRef = useRef<HTMLImageElement | null>(null);

  const [isMobile, setIsMobile] = useState(false);
  const [layout, setLayout] = useState<Layout>(LAYOUT.desktop);
  const [info, setInfo] = useState({ canvas: '', image: '', scale: '' });
  const [loaded, setLoaded] = useState(false);

  // Keep latest layout available to the draw function without re-creating it
  const layoutRef = useRef(layout);
  layoutRef.current = layout;

  const draw = useCallback(() => {
    const canvas = canvasRef.current;
    const ctx = canvas?.getContext('2d');
    const img = imgRef.current;
    if (!canvas || !ctx || !img) return;

    const L = layoutRef.current;
    const cw = canvas.width;
    const ch = canvas.height;
    const iw = img.naturalWidth;
    const ih = img.naturalHeight;

    const contain = Math.min(cw / iw, ch / ih);
    const cover = Math.max(cw / iw, ch / ih);
    const scale = (contain + (cover - contain) * L.coverAmount) * L.zoom;

    const dw = iw * scale;
    const dh = ih * scale;
    const dx = (cw - dw) * L.focusX + L.offsetX * cw;
    const dy = (ch - dh) * L.focusY + L.offsetY * ch;

    ctx.setTransform(1, 0, 0, 1, 0, 0);
    ctx.fillStyle = BG_COLOR;
    ctx.fillRect(0, 0, cw, ch);
    ctx.drawImage(img, dx, dy, dw, dh);

    setInfo({
      canvas: `${cw} x ${ch}px`,
      image: `${iw} x ${ih}px`,
      scale: `${scale.toFixed(3)}  (drawn ${Math.round(dw)} x ${Math.round(dh)})`,
    });
  }, []);

  // Load the image and set up resizing
  useEffect(() => {
    const container = containerRef.current;
    const canvas = canvasRef.current;
    if (!container || !canvas) return;

    const mobile = window.innerWidth <= MOBILE_BREAKPOINT;
    setIsMobile(mobile);
    setLayout(mobile ? LAYOUT.mobile : LAYOUT.desktop);

    const folder = mobile ? 'm/' : '';
    const padded = String(TEST_FRAME).padStart(3, '0');
    const img = new Image();
    img.src = `/seq/${coach.slug}/${folder}ezgif-frame-${padded}.webp`;
    img.onload = () => {
      imgRef.current = img;
      setLoaded(true);
      draw();
    };

    const resize = () => {
      const dpr = window.devicePixelRatio || 1;
      canvas.width = Math.round(container.clientWidth * dpr);
      canvas.height = Math.round(container.clientHeight * dpr);
      draw();
    };

    const ro = new ResizeObserver(resize);
    ro.observe(container);
    resize();

    return () => ro.disconnect();
  }, [coach, draw]);

  // Redraw whenever a slider changes
  useEffect(() => {
    draw();
  }, [layout, draw]);

  const set = (key: keyof Layout, value: number) =>
    setLayout((prev) => ({ ...prev, [key]: value }));

  const sliders: { key: keyof Layout; min: number; max: number; step: number }[] = [
    { key: 'coverAmount', min: 0, max: 1, step: 0.01 },
    { key: 'zoom', min: 0.5, max: 2, step: 0.01 },
    { key: 'focusX', min: 0, max: 1, step: 0.01 },
    { key: 'focusY', min: 0, max: 1, step: 0.01 },
    { key: 'offsetX', min: -0.5, max: 0.5, step: 0.005 },
    { key: 'offsetY', min: -0.5, max: 0.5, step: 0.005 },
  ];

  const copyText = `${isMobile ? 'mobile' : 'desktop'}: { coverAmount: ${layout.coverAmount}, zoom: ${layout.zoom}, focusX: ${layout.focusX}, focusY: ${layout.focusY}, offsetX: ${layout.offsetX}, offsetY: ${layout.offsetY} },`;

  return (
    <div
      ref={containerRef}
      className="relative w-full overflow-hidden"
      style={{ height: '100svh', backgroundColor: BG_COLOR }}
    >
      <canvas ref={canvasRef} className="absolute inset-0 block h-full w-full" />

      <div
        aria-hidden="true"
        className="pointer-events-none absolute inset-y-0 left-0 z-10 w-1/3 bg-black/20 backdrop-blur-sm"
      />
      <div
        aria-hidden="true"
        className="pointer-events-none absolute inset-y-0 right-0 z-10 w-1/3 bg-black/20 backdrop-blur-sm"
      />

      {!loaded && (
        <div className="absolute inset-0 flex items-center justify-center text-sm text-white/60">
          Loading frame... (check the path if this never goes away)
        </div>
      )}

      {SHOW_DEBUG_PANEL && (
        <div className="absolute left-3 top-3 z-50 w-72 rounded-lg bg-black/75 p-3 font-mono text-xs text-white backdrop-blur">
          <div className="mb-2 font-semibold">
            Tuning ({isMobile ? 'mobile' : 'desktop'})
          </div>
          <div className="mb-2 space-y-0.5 text-white/60">
            <div>Canvas: {info.canvas}</div>
            <div>Image: {info.image}</div>
            <div>Scale: {info.scale}</div>
          </div>

          {sliders.map(({ key, min, max, step }) => (
            <label key={key} className="mb-1.5 block">
              <div className="flex justify-between">
                <span>{key}</span>
                <span>{layout[key].toFixed(3)}</span>
              </div>
              <input
                type="range"
                min={min}
                max={max}
                step={step}
                value={layout[key]}
                onChange={(e) => set(key, parseFloat(e.target.value))}
                className="w-full"
              />
            </label>
          ))}

          <button
            onClick={() => navigator.clipboard.writeText(copyText)}
            className="mt-2 w-full rounded bg-white/15 px-2 py-1 hover:bg-white/25"
          >
            Copy values
          </button>
          <div className="mt-2 break-words text-[10px] text-white/50">{copyText}</div>
        </div>
      )}
    </div>
  );
}