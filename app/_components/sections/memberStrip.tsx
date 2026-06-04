'use client';

import { useRef, useState, useEffect } from 'react';
import { useScroll, useTransform, motion, MotionValue, cubicBezier } from 'framer-motion';
import Image from 'next/image';
import { MEMBERS, TEAM_DESCRIPTION } from '@/app/_data/members';

// ── Strip animation constants ─────────────────────────────────────
const STRIP_COUNT = 10;
const EASE = cubicBezier(0.16, 1, 0.3, 1);
const STRIP_W = 100 / STRIP_COUNT; // 10 vw per strip

// ── Card carousel constants ───────────────────────────────────────
const CARD_W  = 140; // px
const CARD_GAP = 22; // px
const CARD_STEP = CARD_W + CARD_GAP;
const CYCLE_MS  = 2600; // auto-advance interval

// ── Member card ───────────────────────────────────────────────────
function MemberCard({
  member,
  distance,
}: {
  member: (typeof MEMBERS)[number];
  distance: number;
}) {
  const isFocus = distance === 0;
  const scale   = isFocus ? 1 : distance === 1 ? 0.9 : 0.78;
  const opacity = isFocus ? 1 : distance === 1 ? 0.5 : 0.2;

  return (
    <motion.div
      animate={{ scale, opacity }}
      transition={{ duration: 0.55, ease: [0.16, 1, 0.3, 1] }}
      style={{ width: CARD_W, flexShrink: 0 }}
      className="flex flex-col gap-3"
    >
      {/* Photo */}
      <div className="relative w-full aspect-square rounded-2xl overflow-hidden ring-1 ring-white/10">
        <Image
          src={member.image}
          alt={member.name}
          fill
          sizes={`${CARD_W}px`}
          className="object-cover"
        />
      </div>

      {/* Info */}
      <div>
        {member.status && (
          <span className="inline-block text-[9px] px-1.5 py-0.5 mb-1 font-mono tracking-wide rounded bg-foreground-1/20 text-foreground-1">
            {member.status}
          </span>
        )}
        <p className="text-sm font-semibold leading-tight text-background-1">{member.name}</p>
        <p className="text-[10px] tracking-[0.15em] uppercase font-mono text-foreground-1 mt-0.5">
          {member.role}
        </p>
      </div>
    </motion.div>
  );
}

// ── Horizontal card band ──────────────────────────────────────────
function MemberBand({ active }: { active: number }) {
  const containerRef = useRef<HTMLDivElement>(null);
  const [containerW, setContainerW] = useState(600);

  useEffect(() => {
    const el = containerRef.current;
    if (!el) return;
    const ro = new ResizeObserver(() => setContainerW(el.offsetWidth));
    ro.observe(el);
    setContainerW(el.offsetWidth);
    return () => ro.disconnect();
  }, []);

  // Shift row so the active card is centred in the container
  const x = containerW / 2 - CARD_W / 2 - active * CARD_STEP;

  return (
    <div className="flex flex-col items-center gap-5 w-full">
      {/* Scrolling band */}
      <div ref={containerRef} className="relative w-full overflow-hidden" style={{ height: CARD_W + 76 }}>
        {/* Side fade */}
        <div className="absolute inset-y-0 left-0 w-14 bg-gradient-to-r from-foreground-0 to-transparent z-10 pointer-events-none" />
        <div className="absolute inset-y-0 right-0 w-14 bg-gradient-to-l from-foreground-0 to-transparent z-10 pointer-events-none" />

        <motion.div
          animate={{ x }}
          transition={{ duration: 0.65, ease: [0.16, 1, 0.3, 1] }}
          className="absolute top-0 left-0 flex items-start"
          style={{ gap: CARD_GAP }}
        >
          {MEMBERS.map((m, i) => (
            <MemberCard key={m.id} member={m} distance={Math.abs(i - active)} />
          ))}
        </motion.div>
      </div>

      {/* Progress dots */}
      <div className="flex items-center gap-2">
        {MEMBERS.map((_, i) => (
          <motion.div
            key={i}
            animate={{ opacity: i === active ? 1 : 0.25, scale: i === active ? 1.5 : 1 }}
            transition={{ duration: 0.3 }}
            className="w-1 h-1 rounded-full bg-background-1"
          />
        ))}
      </div>
    </div>
  );
}

// ── Full-screen strip content ─────────────────────────────────────
function StripContent({ active }: { active: number }) {
  return (
    <div className="absolute inset-0 bg-foreground-0 flex flex-col md:flex-row overflow-hidden">

      {/* Left / Top: Typography */}
      <div className="shrink-0 flex flex-col justify-end md:justify-center px-6 md:px-14 pt-8 pb-5 md:py-0 md:w-[42%]">
        <p className="text-[11px] tracking-[0.25em] text-foreground-1 uppercase font-mono mb-6 md:mb-8">
          Team
        </p>
        <h2 className="text-[clamp(2.4rem,4.2vw,4.2rem)] font-bold tracking-[-0.04em] leading-[0.9] text-background-1 mb-5 md:mb-7">
          Meet<br />our team.
        </h2>
        <p className="hidden md:block text-sm text-foreground-1 leading-relaxed max-w-[22rem]">
          {TEAM_DESCRIPTION}
        </p>
      </div>

      {/* Right / Bottom: Auto-cycling card band */}
      <div className="flex-1 flex items-center justify-center px-4 md:px-8 pb-8 md:pb-0">
        <MemberBand active={active} />
      </div>
    </div>
  );
}

// ── Single vertical strip ─────────────────────────────────────────
function Strip({
  index,
  progress,
  active,
}: {
  index: number;
  progress: MotionValue<number>;
  active: number;
}) {
  const isEven = index % 2 === 0;
  const startP = (index / (STRIP_COUNT - 1)) * 0.15;
  const endP   = startP + 0.18;

  const y = useTransform(
    progress,
    [startP, endP],
    [isEven ? '-120%' : '120%', '0%'],
    { ease: EASE },
  );

  return (
    <motion.div
      style={{
        position: 'absolute',
        left: `${index * STRIP_W}%`,
        top: 0,
        bottom: 0,
        width: `${STRIP_W}%`,
        overflow: 'hidden',
        y,
        willChange: 'transform',
      }}
    >
      <div
        style={{
          position: 'absolute',
          left: `${-index * STRIP_W}vw`,
          top: 0,
          width: '100vw',
          height: '100%',
        }}
      >
        <StripContent active={active} />
      </div>
    </motion.div>
  );
}

// ── Section root ──────────────────────────────────────────────────
export default function MemberStripSection() {
  const ref = useRef<HTMLElement>(null);
  const { scrollYProgress } = useScroll({
    target: ref,
    offset: ['start start', 'end start'],
  });

  const [active, setActive] = useState(0);

  // Auto-advance independently of scroll
  useEffect(() => {
    const id = setInterval(() => {
      setActive((prev) => (prev + 1) % MEMBERS.length);
    }, CYCLE_MS);
    return () => clearInterval(id);
  }, []);

  return (
    <section ref={ref} style={{ height: '250vh' }}>
      <div className="sticky top-0 h-screen overflow-hidden">
        {Array.from({ length: STRIP_COUNT }, (_, i) => (
          <Strip key={i} index={i} progress={scrollYProgress} active={active} />
        ))}
      </div>
    </section>
  );
}
