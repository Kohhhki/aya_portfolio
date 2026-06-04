'use client';

import { useRef } from 'react';
import {
  useScroll, useTransform, useSpring,
  motion, MotionValue, cubicBezier,
} from 'framer-motion';
import Image from 'next/image';
import ClueeIcon from '@/app/_components/ui/clueeIcon';

const STRIP_COUNT = 12;
const EASE = cubicBezier(0.16, 1, 0.3, 1);

// ── Carousel constants ────────────────────────────────────────────
const CAROUSEL_START = 0.48; // progress when strips finish assembling
const PHONE_GAP = 80;        // px between phones
const PHONE_W = 200;         // px – phone card width
const PHONE_STEP = PHONE_W + PHONE_GAP; // 280 – distance between phone centers

const N = 3;
const CD = (1.0 - CAROUSEL_START) / N;  // progress duration per phone ≈ 0.173
const T  = 0.055;                        // transition half-width in progress

// pre-computed keyframes for the raw x trajectory
const KP = [
  CAROUSEL_START,
  CAROUSEL_START + CD - T,
  CAROUSEL_START + CD + T,
  CAROUSEL_START + CD * 2 - T,
  CAROUSEL_START + CD * 2 + T,
  1.0,
] as const;

const PRODUCTS = [
  { src: '/products/phone/cluee.png',         logo: '/products/logos/cluee.svg',          name: 'Cluee',         category: 'Knowledge Platform', year: '2024' },
  { src: '/products/phone/routem.png',        logo: '/products/logos/routem.svg',         name: 'Routem',        category: 'Travel Planning',    year: '2025' },
  { src: '/products/phone/routem_mobile.png', logo: '/products/logos/routem_mobile.svg',  name: 'Routem Mobile', category: 'Mobile App',         year: '2025' },
] as const;

// ── Progress dots ─────────────────────────────────────────────────
function ProgressDot({ index, xNum }: { index: number; xNum: MotionValue<number> }) {
  const cx = (1 - index) * PHONE_STEP;
  const scale   = useTransform(xNum, [cx - PHONE_STEP, cx, cx + PHONE_STEP], [0.5, 1.4, 0.5]);
  const opacity = useTransform(xNum, [cx - PHONE_STEP, cx, cx + PHONE_STEP], [0.3, 1, 0.3]);
  return (
    <motion.div
      style={{ scale, opacity }}
      className="w-1 h-1 rounded-full bg-background-1"
    />
  );
}

// ── Per-product text card (absolutely stacked, fades in/out) ──────
function TextCard({
  product, index, xNum,
}: {
  product: (typeof PRODUCTS)[number];
  index: number;
  xNum: MotionValue<number>;
}) {
  const cx      = (1 - index) * PHONE_STEP;
  const opacity = useTransform(xNum, [cx - PHONE_STEP, cx, cx + PHONE_STEP], [0, 1, 0]);
  const y       = useTransform(xNum, [cx - PHONE_STEP, cx, cx + PHONE_STEP], ['16px', '0px', '-16px']);

  return (
    <motion.div
      style={{ opacity, y }}
      className="absolute inset-0 flex flex-col justify-center pointer-events-none"
    >
      <div className="w-8 h-8 mb-3 flex items-center justify-center">
        {product.logo.includes('cluee') ? (
          <ClueeIcon className="w-full h-full text-background-1" />
        ) : (
          <div className="relative w-full h-full">
            <Image src={product.logo} alt={product.name} fill className="object-contain" />
          </div>
        )}
      </div>
      <p className="text-[11px] tracking-[0.25em] text-foreground-1 uppercase font-mono mb-2">
        {product.category} — {product.year}
      </p>
      <p className="text-xl md:text-2xl font-semibold tracking-[-0.02em] text-background-1">
        {product.name}
      </p>
    </motion.div>
  );
}

// ── Phone card (scale + opacity based on distance from center) ────
function PhoneCard({
  product, index, xNum,
}: {
  product: (typeof PRODUCTS)[number];
  index: number;
  xNum: MotionValue<number>;
}) {
  const dist    = useTransform(xNum, (v) => Math.abs((index - 1) * PHONE_STEP + v));
  const scale   = useTransform(dist, [0, PHONE_STEP], [1, 0.78]);
  const opacity = useTransform(dist, [0, PHONE_STEP], [1, 0.18]);

  return (
    <motion.div
      style={{ scale, opacity, width: PHONE_W, flexShrink: 0 }}
      className="flex flex-col items-center"
    >
      <div
        className="relative w-full rounded-[2.25rem] overflow-hidden ring-1 ring-white/10 max-h-[52vh]"
        style={{ aspectRatio: '9/19.5', boxShadow: '0 24px 56px rgba(0,0,0,0.6)' }}
      >
        <Image
          src={product.src}
          alt={product.name}
          fill
          sizes={`${PHONE_W}px`}
          className="object-cover"
        />
      </div>
    </motion.div>
  );
}

// ── Full-screen content inside each strip ─────────────────────────
function StripContent({ xNum }: { xNum: MotionValue<number> }) {
  const x = useTransform(xNum, (v) => `${v}px`);

  return (
    <div className="absolute inset-0 bg-foreground-0 flex flex-col md:flex-row overflow-hidden">

      {/* Left (desktop) / Top (mobile): Typography */}
      <div className="shrink-0 flex flex-col justify-end md:justify-center px-6 md:px-14 pt-8 pb-5 md:py-0 md:w-[44%]">

        {/* Label */}
        <p className="text-[11px] tracking-[0.25em] text-foreground-1 uppercase font-mono mb-6 md:mb-8">
          Products
        </p>

        {/* Static hero heading */}
        <h2 className="text-[clamp(2.4rem,4.2vw,4.2rem)] font-bold tracking-[-0.04em] leading-[0.9] text-background-1 mb-5 md:mb-7">
          Introducing<br />our products.
        </h2>

        {/* Body copy — desktop only */}
        <p className="hidden md:block text-sm text-foreground-1 leading-relaxed max-w-[22rem] mb-10">
          自分たちが本当に面白いと思えるものを、
          丁寧に設計・開発してリリースし続けています。
        </p>

        {/* Divider */}
        <div className="w-10 border-t border-foreground-1/25 mb-6 md:mb-8" />

        {/* Animated per-product label */}
        <div className="relative h-24 md:h-28">
          {PRODUCTS.map((p, i) => (
            <TextCard key={p.src} product={p} index={i} xNum={xNum} />
          ))}
        </div>

        {/* Progress dots */}
        <div className="flex items-center gap-2.5 mt-6 md:mt-8">
          {PRODUCTS.map((_, i) => (
            <ProgressDot key={i} index={i} xNum={xNum} />
          ))}
        </div>
      </div>

      {/* Right (desktop) / Bottom (mobile): Phone carousel */}
      <div className="relative flex-1 flex items-center justify-center overflow-hidden">
        {/* Side gradients to fade off-screen phones */}
        <div className="absolute inset-y-0 left-0 w-[22%] bg-gradient-to-r from-foreground-0 to-transparent z-10 pointer-events-none" />
        <div className="absolute inset-y-0 right-0 w-[22%] bg-gradient-to-l from-foreground-0 to-transparent z-10 pointer-events-none" />

        <motion.div style={{ x, gap: `${PHONE_GAP}px` }} className="flex items-center">
          {PRODUCTS.map((p, i) => (
            <PhoneCard key={p.src} product={p} index={i} xNum={xNum} />
          ))}
        </motion.div>
      </div>
    </div>
  );
}

// ── Single strip (horizontal slice that flies in) ─────────────────
function Strip({
  index,
  progress,
  xNum,
}: {
  index: number;
  progress: MotionValue<number>;
  xNum: MotionValue<number>;
}) {
  const isEven = index % 2 === 0;
  const stripH = 100 / STRIP_COUNT;
  const startP = (index / (STRIP_COUNT - 1)) * 0.26;
  const endP   = startP + 0.22;

  const x = useTransform(
    progress,
    [startP, endP],
    [isEven ? '-120%' : '120%', '0%'],
    { ease: EASE },
  );

  return (
    <motion.div
      style={{
        position: 'absolute',
        top: `${index * stripH}vh`,
        left: 0,
        right: 0,
        height: `${stripH}vh`,
        overflow: 'hidden',
        x,
        willChange: 'transform',
      }}
    >
      <div
        style={{
          position: 'absolute',
          top: `-${index * stripH}vh`,
          left: 0,
          right: 0,
          height: '100vh',
        }}
      >
        <StripContent xNum={xNum} />
      </div>
    </motion.div>
  );
}

// ── Section root ──────────────────────────────────────────────────
export default function StripRevealSection() {
  const ref = useRef<HTMLElement>(null);
  const { scrollYProgress } = useScroll({
    target: ref,
    offset: ['start start', 'end start'],
  });

  // Raw step positions: [phone0 centered → phone1 centered → phone2 centered]
  const rawX = useTransform(
    scrollYProgress,
    [...KP],
    [PHONE_STEP, PHONE_STEP, 0, 0, -PHONE_STEP, -PHONE_STEP],
  );

  // Spring makes transitions feel organic and smooth
  const xNum = useSpring(rawX, { stiffness: 200, damping: 26, mass: 0.8 });

  return (
    <section ref={ref} style={{ height: '300vh' }}>
      <div className="sticky top-0 h-screen overflow-hidden">
        {Array.from({ length: STRIP_COUNT }, (_, i) => (
          <Strip key={i} index={i} progress={scrollYProgress} xNum={xNum} />
        ))}
      </div>
    </section>
  );
}
