'use client';

import { motion } from 'framer-motion';
import { showSuccessToast, showInfoToast } from '@/lib/stores/toastStore';
import {
  MdAutoAwesome,
  MdCode,
  MdPalette,
  MdSpeed,
  MdShield,
  MdDevices,
  MdArrowForward,
} from 'react-icons/md';

const fadeUp = {
  hidden: { opacity: 0, y: 24 },
  visible: (i: number) => ({
    opacity: 1,
    y: 0,
    transition: { delay: i * 0.08, duration: 0.5, ease: [0.25, 0.1, 0.25, 1] as [number, number, number, number] },
  }),
};

const FEATURES = [
  {
    icon: MdSpeed,
    title: 'Blazing Fast',
    description:
      'Built on Next.js 16 with App Router. Server components, streaming, and edge-ready by default.',
  },
  {
    icon: MdPalette,
    title: 'Design System',
    description:
      'Apple-inspired tokens, dark mode via next-themes, and Tailwind v4 — all wired up out of the box.',
  },
  {
    icon: MdShield,
    title: 'Type-Safe API',
    description:
      'Zod validation at every boundary. Error handling with structured error codes and friendly messages.',
  },
  {
    icon: MdDevices,
    title: 'Responsive',
    description:
      'Dynamic header that hides on mobile scroll and stays visible on desktop. Works beautifully everywhere.',
  },
  {
    icon: MdCode,
    title: 'Clean Architecture',
    description:
      'Feature-based directory structure with services, repositories, and hooks cleanly separated.',
  },
  {
    icon: MdAutoAwesome,
    title: 'Toast & Errors',
    description:
      'Global notification system powered by Zustand + Framer Motion. Call showSuccessToast() from anywhere.',
  },
];

const STATS = [
  { value: '16', label: 'Next.js' },
  { value: 'v4', label: 'Tailwind' },
  { value: '0ms', label: 'Style flash' },
  { value: '∞', label: 'Possibilities' },
];

export default function Home() {
  return (
    <div className="bg-background-1 overflow-hidden">
      {/* Hero */}
      <section className="relative min-h-[90vh] flex flex-col items-center justify-center px-6 text-center">
        <div className="absolute inset-0 overflow-hidden pointer-events-none">
          <div className="absolute top-1/4 left-1/4 w-[600px] h-[600px] rounded-full bg-accent-0/8 blur-[120px] -translate-x-1/2 -translate-y-1/2" />
          <div className="absolute top-1/3 right-1/4 w-[400px] h-[400px] rounded-full bg-accent-1/6 blur-[100px] translate-x-1/2 -translate-y-1/2" />
        </div>

        <div className="relative z-10 max-w-[800px] mx-auto">
          <motion.div
            custom={0}
            initial="hidden"
            animate="visible"
            variants={fadeUp}
            className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full border border-foreground-0/10 bg-background-0 text-[13px] text-foreground-1 font-medium mb-8"
          >
            <MdAutoAwesome size={14} className="text-accent-0" />
            Next.js 16 · Tailwind v4 · Framer Motion
          </motion.div>

          <motion.h1
            custom={1}
            initial="hidden"
            animate="visible"
            variants={fadeUp}
            className="text-[56px] md:text-[80px] lg:text-[96px] font-bold tracking-tight leading-[1.05] mb-6"
          >
            <span className="text-foreground-0">Build the</span>
            <br />
            <span
              style={{
                backgroundImage: 'linear-gradient(135deg, var(--accent-0) 0%, var(--accent-1) 100%)',
                backgroundClip: 'text',
                WebkitBackgroundClip: 'text',
                WebkitTextFillColor: 'transparent',
                color: 'transparent',
              }}
            >
              next big thing.
            </span>
          </motion.h1>

          <motion.p
            custom={2}
            initial="hidden"
            animate="visible"
            variants={fadeUp}
            className="text-[18px] md:text-[21px] text-foreground-1 leading-relaxed max-w-[560px] mx-auto mb-10"
          >
            A production-ready Next.js basis with dynamic header, design tokens,
            global notifications, and clean architecture — ready to ship.
          </motion.p>

          <motion.div
            custom={3}
            initial="hidden"
            animate="visible"
            variants={fadeUp}
            className="flex flex-col sm:flex-row gap-3 justify-center"
          >
            <button
              onClick={() => showSuccessToast('Welcome to Basis!', { title: 'Hello' })}
              className="inline-flex items-center justify-center gap-2 px-7 py-3.5 text-[15px] font-semibold text-background-1 bg-foreground-0 rounded-full hover:opacity-80 transition-opacity cursor-pointer"
            >
              Get Started
              <MdArrowForward size={18} />
            </button>
            <button
              onClick={() => showInfoToast('Docs are coming soon!', { title: 'Info' })}
              className="inline-flex items-center justify-center gap-2 px-7 py-3.5 text-[15px] font-semibold text-foreground-0 bg-background-0 border border-foreground-0/10 rounded-full hover:bg-foreground-0/6 transition-colors cursor-pointer"
            >
              Read the Docs
            </button>
          </motion.div>
        </div>

        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 1.2, duration: 0.6 }}
          className="absolute bottom-10 left-1/2 -translate-x-1/2 flex flex-col items-center gap-2"
        >
          <div className="w-px h-12 bg-gradient-to-b from-transparent to-foreground-1/30" />
          <span className="text-[11px] text-foreground-1/50 tracking-widest uppercase">Scroll</span>
        </motion.div>
      </section>

      {/* Stats bar */}
      <section className="border-y border-foreground-0/8 bg-background-0 py-10">
        <div className="max-w-[1200px] mx-auto px-6 grid grid-cols-2 md:grid-cols-4 gap-8">
          {STATS.map((stat, i) => (
            <motion.div
              key={stat.label}
              custom={i}
              initial="hidden"
              whileInView="visible"
              viewport={{ once: true, margin: '-60px' }}
              variants={fadeUp}
              className="text-center"
            >
              <div className="text-[36px] font-bold text-foreground-0 tracking-tight">
                {stat.value}
              </div>
              <div className="text-[14px] text-foreground-1 mt-1">{stat.label}</div>
            </motion.div>
          ))}
        </div>
      </section>

      {/* Features grid */}
      <section id="products" className="py-24 px-6">
        <div className="max-w-[1200px] mx-auto">
          <motion.div
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true, margin: '-80px' }}
            variants={fadeUp}
            custom={0}
            className="text-center mb-16"
          >
            <h2 className="text-[40px] md:text-[52px] font-bold tracking-tight text-foreground-0 mb-4">
              Everything you need.
            </h2>
            <p className="text-[18px] text-foreground-1 max-w-[500px] mx-auto">
              A complete foundation so you can focus on what makes your product unique.
            </p>
          </motion.div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
            {FEATURES.map((feature, i) => {
              const Icon = feature.icon;
              return (
                <motion.div
                  key={feature.title}
                  custom={i}
                  initial="hidden"
                  whileInView="visible"
                  viewport={{ once: true, margin: '-60px' }}
                  variants={fadeUp}
                  className="group p-8 rounded-2xl bg-background-0 border border-foreground-0/6 hover:border-foreground-0/12 transition-all duration-300"
                >
                  <div className="w-10 h-10 rounded-xl bg-accent-0/10 flex items-center justify-center mb-5">
                    <Icon size={20} className="text-accent-0" />
                  </div>
                  <h3 className="text-[17px] font-semibold text-foreground-0 mb-2">
                    {feature.title}
                  </h3>
                  <p className="text-[15px] text-foreground-1 leading-relaxed">
                    {feature.description}
                  </p>
                </motion.div>
              );
            })}
          </div>
        </div>
      </section>

      {/* Highlight section */}
      <section id="solutions" className="py-24 px-6 bg-background-0">
        <div className="max-w-[1200px] mx-auto grid md:grid-cols-2 gap-12 items-center">
          <motion.div
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true, margin: '-80px' }}
            variants={fadeUp}
            custom={0}
          >
            <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-accent-0/10 text-accent-0 text-[12px] font-semibold uppercase tracking-wider mb-6">
              Dynamic Header
            </div>
            <h2 className="text-[40px] md:text-[48px] font-bold tracking-tight text-foreground-0 mb-5 leading-tight">
              Smarter navigation,
              <br />
              more screen space.
            </h2>
            <p className="text-[17px] text-foreground-1 leading-relaxed mb-8">
              On mobile, the header gracefully slides away as you scroll down — giving you full
              focus on content. It returns instantly when you scroll back up, and stays fixed
              on desktop at all times.
            </p>
            <ul className="space-y-3">
              {[
                '10px threshold to filter micro-scrolls',
                'Framer Motion easeOut animation',
                'CSS variable --header-height for StickyWrapper',
              ].map((item) => (
                <li key={item} className="flex items-center gap-3 text-[15px] text-foreground-1">
                  <span className="w-5 h-5 rounded-full bg-accent-0/15 flex items-center justify-center flex-shrink-0">
                    <span className="w-1.5 h-1.5 rounded-full bg-accent-0" />
                  </span>
                  {item}
                </li>
              ))}
            </ul>
          </motion.div>

          <motion.div
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true, margin: '-80px' }}
            variants={fadeUp}
            custom={1}
          >
            <div className="rounded-3xl overflow-hidden border border-foreground-0/8 bg-background-1 p-6 shadow-xl">
              <div className="w-full max-w-[260px] mx-auto">
                <div className="rounded-[32px] border-2 border-foreground-0/10 overflow-hidden bg-background-0 shadow-2xl">
                  <div className="h-12 bg-background-1/90 backdrop-blur border-b border-foreground-0/8 flex items-center px-4 gap-2">
                    <div className="w-3 h-3 rounded-sm bg-foreground-0" />
                    <div className="text-[11px] font-semibold text-foreground-0">Basis</div>
                    <div className="ml-auto flex gap-2">
                      <div className="w-8 h-2 rounded-full bg-foreground-0/10" />
                      <div className="w-5 h-2 rounded-full bg-foreground-0/10" />
                    </div>
                  </div>
                  <div className="p-4 space-y-3">
                    <div className="h-16 rounded-xl bg-accent-0/10" />
                    {[60, 80, 70, 90, 65].map((w, i) => (
                      <div
                        key={i}
                        className="h-3 rounded-full bg-foreground-0/8"
                        style={{ width: `${w}%` }}
                      />
                    ))}
                    <div className="h-24 rounded-xl bg-foreground-0/4 mt-4" />
                    {[50, 75].map((w, i) => (
                      <div
                        key={i}
                        className="h-3 rounded-full bg-foreground-0/8"
                        style={{ width: `${w}%` }}
                      />
                    ))}
                  </div>
                </div>
              </div>
            </div>
          </motion.div>
        </div>
      </section>

      {/* CTA Section */}
      <section id="about" className="py-24 px-6">
        <div className="max-w-[800px] mx-auto text-center">
          <motion.div
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true, margin: '-80px' }}
            variants={fadeUp}
            custom={0}
          >
            <h2 className="text-[40px] md:text-[56px] font-bold tracking-tight text-foreground-0 mb-5">
              Ready to start building?
            </h2>
            <p className="text-[18px] text-foreground-1 mb-10 leading-relaxed">
              Clone the repo, run{' '}
              <code className="font-mono text-accent-0 text-[16px] bg-accent-0/8 px-2 py-0.5 rounded-md">
                npm run dev
              </code>
              , and ship something great.
            </p>
            <button
              onClick={() => showSuccessToast("You're all set!", { title: "Let's go" })}
              className="inline-flex items-center justify-center gap-2 px-8 py-4 text-[16px] font-semibold text-background-1 bg-foreground-0 rounded-full hover:opacity-80 transition-opacity cursor-pointer"
            >
              Start Now
              <MdArrowForward size={20} />
            </button>
          </motion.div>
        </div>
      </section>

      {/* Footer */}
      <footer id="contact" className="border-t border-foreground-0/8 py-12 px-6">
        <div className="max-w-[1200px] mx-auto flex flex-col md:flex-row items-center justify-between gap-4">
          <div className="flex items-center gap-1.5">
            <div className="w-5 h-5 rounded-md bg-foreground-0 flex items-center justify-center">
              <div className="w-2.5 h-2.5 rounded-sm bg-background-1" />
            </div>
            <span className="text-[15px] font-semibold text-foreground-0">Basis</span>
          </div>
          <p className="text-[13px] text-foreground-1">
            Built with Next.js, Tailwind CSS, and Framer Motion.
          </p>
          <div className="flex gap-6">
            {['Products', 'Docs', 'About'].map((item) => (
              <a
                key={item}
                href={`#${item.toLowerCase()}`}
                className="text-[13px] text-foreground-1 hover:text-foreground-0 transition-colors"
              >
                {item}
              </a>
            ))}
          </div>
        </div>
      </footer>
    </div>
  );
}
