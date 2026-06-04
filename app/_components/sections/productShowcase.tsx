'use client';

import { useRef } from 'react';
import { useScroll, useTransform, motion, MotionValue, cubicBezier } from 'framer-motion';
import Image from 'next/image';

const EASE = cubicBezier(0.16, 1, 0.3, 1);

const PRODUCTS = [
  {
    src: '/products/cluee.png',
    name: 'Cluee',
    category: 'AI App',
    year: '2025',
  },
  {
    src: '/products/routem_mobile.png',
    name: 'Routem',
    category: 'Navigation',
    year: '2025',
  },
  {
    src: '/products/routem.png',
    name: 'Routem Web',
    category: 'Web App',
    year: '2024',
  },
];

function ProgressDot({
  index,
  total,
  progress,
}: {
  index: number;
  total: number;
  progress: MotionValue<number>;
}) {
  const seg = 1 / total;
  const s = index * seg;
  const e = (index + 1) * seg;
  const opacity = useTransform(
    progress,
    [s, s + seg * 0.2, e - seg * 0.2, e],
    [0.2, 1, 1, 0.2],
  );
  const scaleY = useTransform(
    progress,
    [s, s + seg * 0.2, e - seg * 0.2, e],
    [1, 3, 3, 1],
  );
  return (
    <motion.div
      style={{ opacity, scaleY }}
      className="w-px h-4 bg-foreground-0 rounded-full origin-center"
    />
  );
}

function ProductSlide({
  product,
  index,
  total,
  progress,
}: {
  product: (typeof PRODUCTS)[0];
  index: number;
  total: number;
  progress: MotionValue<number>;
}) {
  const seg = 1 / total;
  const s = index * seg;
  const e = (index + 1) * seg;

  const opacity = useTransform(
    progress,
    [s, s + seg * 0.15, e - seg * 0.15, e],
    [0, 1, 1, 0],
  );
  const y = useTransform(
    progress,
    [s, s + seg * 0.18, e - seg * 0.18, e],
    ['72px', '0px', '0px', '-72px'],
    { ease: EASE },
  );
  const scale = useTransform(
    progress,
    [s, s + seg * 0.18, e - seg * 0.18, e],
    [0.88, 1, 1, 0.88],
  );

  const textOpacity = useTransform(
    progress,
    [s + seg * 0.1, s + seg * 0.25, e - seg * 0.2, e],
    [0, 1, 1, 0],
  );
  const textY = useTransform(
    progress,
    [s + seg * 0.1, s + seg * 0.25, e - seg * 0.2, e],
    ['20px', '0px', '0px', '-20px'],
  );

  return (
    <div className="absolute inset-0 flex items-center justify-center">
      <motion.div
        style={{ opacity, y, scale }}
        className="relative aspect-[9/19.5] w-[180px] md:w-[240px] drop-shadow-2xl"
      >
        <div className="absolute inset-0 rounded-[2.25rem] overflow-hidden ring-1 ring-black/10">
          <Image
            src={product.src}
            alt={product.name}
            fill
            sizes="240px"
            className="object-cover"
          />
        </div>
      </motion.div>

      <motion.div
        style={{ opacity: textOpacity, y: textY }}
        className="absolute bottom-16 left-6 md:left-12"
      >
        <p className="text-[11px] tracking-[0.25em] text-foreground-1 uppercase font-mono mb-2">
          {product.category} — {product.year}
        </p>
        <h3 className="text-[clamp(2rem,4vw,3rem)] font-bold tracking-[-0.03em] leading-none text-foreground-0">
          {product.name}
        </h3>
      </motion.div>
    </div>
  );
}

export default function ProductShowcaseSection() {
  const ref = useRef<HTMLElement>(null);
  const { scrollYProgress } = useScroll({
    target: ref,
    offset: ['start start', 'end start'],
  });
  const total = PRODUCTS.length;

  return (
    <section ref={ref} style={{ height: `${total * 100}vh` }}>
      <div className="sticky top-0 h-screen overflow-hidden bg-background-1">
        <div className="absolute top-8 left-6 md:left-12 z-10">
          <p className="text-[11px] tracking-[0.25em] text-foreground-1 uppercase font-mono">
            Products
          </p>
        </div>

        <div className="absolute right-6 md:right-12 top-1/2 -translate-y-1/2 flex flex-col gap-3 z-10">
          {Array.from({ length: total }, (_, i) => (
            <ProgressDot key={i} index={i} total={total} progress={scrollYProgress} />
          ))}
        </div>

        {PRODUCTS.map((product, i) => (
          <ProductSlide
            key={product.src}
            product={product}
            index={i}
            total={total}
            progress={scrollYProgress}
          />
        ))}
      </div>
    </section>
  );
}
