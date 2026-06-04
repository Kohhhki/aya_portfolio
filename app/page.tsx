'use client';

import { motion } from 'framer-motion';
import Link from 'next/link';
import Image from 'next/image';
import Logo from '@/app/_components/layout/ingredients/logo';
import StripRevealSection from '@/app/_components/sections/stripReveal';
import MemberStripSection from '@/app/_components/sections/memberStrip';
import { PRODUCTS } from '@/app/_data/products';
import { MEMBERS, TEAM_DESCRIPTION } from '@/app/_data/members';
import ClueeIcon from '@/app/_components/ui/clueeIcon';

export default function Home() {
  return (
    <>
      {/* ── Fixed background logo ── */}
      <motion.div
        className="fixed inset-0 z-0 pointer-events-none flex items-center px-6 md:px-16"
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ duration: 1.2, ease: 'easeOut' }}
      >
        <Logo className="w-full h-auto text-foreground-0" />
      </motion.div>

      {/* ── Scrollable content ── */}
      <div className="relative z-10 text-foreground-0">

        {/* ── Hero ── */}
        <section className="min-h-screen flex flex-col px-6 md:px-12 pt-28 pb-12">
          <motion.div
            initial={{ opacity: 0 }} animate={{ opacity: 1 }} transition={{ duration: 0.6 }}
            className="flex items-center justify-between"
          >
            <p className="text-[11px] tracking-[0.25em] text-foreground-1 uppercase font-mono">
              千葉発 — 2024
            </p>
            <p className="text-[11px] tracking-[0.25em] text-foreground-1 uppercase font-mono hidden md:block">
              7 Members · Web &amp; Mobile
            </p>
          </motion.div>

          <motion.div
            initial={{ opacity: 0 }} animate={{ opacity: 1 }} transition={{ duration: 0.6, delay: 0.5 }}
            className="mt-auto border-t border-foreground-0/15 pt-8 flex flex-col md:flex-row md:items-end justify-between gap-6"
          >
            <p className="text-sm text-foreground-1 max-w-sm leading-relaxed">
              同じ高校の仲間が集まり、本当に使われるプロダクトを
              作り続けているチームです。
            </p>
            <div className="flex items-center gap-6 shrink-0">
              <Link
                href="#work"
                className="px-6 py-2.5 bg-foreground-0 text-background-1 text-sm font-medium rounded-full hover:opacity-75 transition-opacity"
              >
                Our Products
              </Link>
              <Link href="#members" className="text-sm text-foreground-1 hover:text-foreground-0 transition-colors">
                Meet the team →
              </Link>
            </div>
          </motion.div>
        </section>

        {/* ── Team Introduction ── */}
        <section className="relative bg-background-0 border-t border-border overflow-hidden px-6 md:px-12 py-24 md:py-32">
          {/* Ghost background text */}
          <span
            aria-hidden
            className="pointer-events-none select-none absolute inset-0 flex items-center justify-center text-[22vw] font-black leading-none tracking-tighter text-foreground-0/[0.035]"
          >
            TEAM
          </span>

          <div className="relative max-w-5xl mx-auto">
            {/* Label */}
            <motion.p
              initial={{ opacity: 0 }} whileInView={{ opacity: 1 }} viewport={{ once: true }}
              transition={{ duration: 0.5 }}
              className="text-[11px] tracking-[0.25em] text-foreground-1 uppercase font-mono mb-14"
            >
              About
            </motion.p>

            {/* Two-column: heading + description */}
            <div className="grid md:grid-cols-2 gap-10 md:gap-20 mb-16 md:mb-20">
              <motion.h2
                initial={{ opacity: 0, y: 32 }} whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }} transition={{ duration: 0.7 }}
                className="text-[clamp(2.6rem,5.5vw,5rem)] font-bold tracking-[-0.04em] leading-[0.9]"
              >
                Started in one<br />
                classroom.<br />
                Shipping to<br />
                the world.
              </motion.h2>

              <motion.div
                initial={{ opacity: 0, y: 24 }} whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }} transition={{ duration: 0.7, delay: 0.15 }}
                className="flex flex-col justify-end gap-6"
              >
                <p className="text-base leading-relaxed text-foreground-1">
                  {TEAM_DESCRIPTION}
                </p>
                <p className="text-sm leading-relaxed text-foreground-1">
                  We are developers, designers, and product thinkers — each
                  bringing a different discipline to the table, all pulling
                  in the same direction. From our first release, Cluee, to
                  our flagship product Routem, we build things we are
                  genuinely proud to ship.
                </p>
              </motion.div>
            </div>

            {/* Stats row */}
            <motion.div
              initial={{ opacity: 0 }} whileInView={{ opacity: 1 }}
              viewport={{ once: true }} transition={{ duration: 0.6, delay: 0.2 }}
              className="border-t border-border pt-10 grid grid-cols-2 md:grid-cols-4 gap-8"
            >
              {[
                { value: '07', label: 'Members' },
                { value: '03', label: 'Products' },
                { value: '2024', label: 'Founded' },
                { value: '千葉', label: 'Origins' },
              ].map(({ value, label }) => (
                <div key={label}>
                  <p className="text-[clamp(2rem,3.5vw,3rem)] font-bold tracking-tight leading-none mb-2">
                    {value}
                  </p>
                  <p className="text-[11px] tracking-[0.25em] text-foreground-1 uppercase font-mono">
                    {label}
                  </p>
                </div>
              ))}
            </motion.div>
          </div>
        </section>

        {/* ── Product Strip Reveal (horizontal) ── */}
        <StripRevealSection />

        {/* ── Product Details ── */}
        <section id="work" className="bg-background-1 px-6 md:px-12 py-24">
          <div className="max-w-5xl mx-auto">
            <motion.p
              initial={{ opacity: 0 }} whileInView={{ opacity: 1 }} viewport={{ once: true }}
              transition={{ duration: 0.5 }}
              className="text-[11px] tracking-[0.25em] text-foreground-1 uppercase font-mono mb-12"
            >
              Product Details
            </motion.p>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-px bg-border">
              {PRODUCTS.map((product, i) => (
                <Link
                  key={product.id}
                  href={`/products/${product.id}`}
                  className="group bg-background-1 hover:bg-background-0 transition-colors cursor-pointer overflow-hidden flex flex-col md:flex-row md:col-span-2"
                >
                  {/* ── Left / Top: description ── */}
                  <motion.div
                    initial={{ opacity: 0 }} whileInView={{ opacity: 1 }} viewport={{ once: true }}
                    transition={{ delay: i * 0.08, duration: 0.5 }}
                    className="p-8 flex flex-col md:w-1/2 shrink-0"
                  >
                    <div className="flex items-start justify-between mb-6">
                      <div className="flex items-center gap-3">
                        <div className="w-8 h-8 shrink-0 flex items-center justify-center">
                          {product.logo.includes('cluee') ? (
                            <ClueeIcon className="w-full h-full text-foreground-0" />
                          ) : (
                            <div className="relative w-full h-full">
                              <Image src={product.logo} alt={product.title} fill className="object-contain" />
                            </div>
                          )}
                        </div>
                        <span className="text-[11px] font-mono text-foreground-1">
                          {String(i + 1).padStart(2, '0')}
                        </span>
                      </div>
                      <div className="flex items-center gap-2">
                        {product.status && (
                          <span className="text-[9px] px-2 py-0.5 font-mono tracking-wide rounded-full border border-border text-foreground-1">
                            {product.status}
                          </span>
                        )}
                        <span className="text-[11px] font-mono text-foreground-1">{product.year}</span>
                      </div>
                    </div>
                    <h3 className="text-2xl md:text-3xl font-semibold tracking-tight mb-2">
                      {product.title}
                    </h3>
                    <p className="text-[11px] tracking-[0.2em] text-foreground-1 uppercase font-mono mb-4">
                      {product.category}
                    </p>
                    <p className="text-sm text-foreground-1 leading-relaxed mb-6">
                      {product.description}
                    </p>
                    <div className="flex flex-wrap gap-2 mb-auto">
                      {product.tags.map((tag) => (
                        <span
                          key={tag}
                          className="px-2.5 py-1 text-[11px] font-mono border border-border text-foreground-1 rounded"
                        >
                          {tag}
                        </span>
                      ))}
                    </div>
                    <div className="mt-8 flex items-center justify-between">
                      <div className="flex items-center gap-1.5 text-[12px] text-foreground-1 group-hover:text-foreground-0 transition-colors">
                        <span>View details</span>
                        <span className="transition-transform group-hover:translate-x-1">→</span>
                      </div>
                      {product.url ? (
                        <a
                          href={product.url}
                          target="_blank"
                          rel="noopener noreferrer"
                          onClick={(e) => e.stopPropagation()}
                          className="text-[11px] font-mono text-foreground-1 hover:text-foreground-0 transition-colors flex items-center gap-1"
                        >
                          Visit Site ↗
                        </a>
                      ) : (
                        <span className="flex items-center gap-1.5 text-[11px] font-mono text-foreground-1">
                          <span className="w-1.5 h-1.5 rounded-full bg-amber-400 animate-pulse" />
                          鋭意制作中
                        </span>
                      )}
                    </div>
                  </motion.div>

                  {/* ── Right / Bottom: video ── */}
                  {product.video && (
                    <div className="relative md:w-1/2 shrink-0 bg-black overflow-hidden border-t md:border-t-0 md:border-l border-border max-h-[220px] md:max-h-none">
                      <video
                        src={product.video}
                        autoPlay
                        muted
                        loop
                        playsInline
                        poster={product.image}
                        className="absolute inset-0 w-full h-full object-contain"
                      />
                    </div>
                  )}
                </Link>
              ))}
            </div>
          </div>
        </section>

        {/* ── Member Strip Reveal (vertical) ── */}
        <MemberStripSection />

        {/* ── Member Details ── */}
        <section id="members" className="bg-background-1 border-t border-border px-6 md:px-12 py-24">
          <div className="max-w-5xl mx-auto">
            <motion.div
              initial={{ opacity: 0 }} whileInView={{ opacity: 1 }} viewport={{ once: true }}
              transition={{ duration: 0.5 }}
              className="flex flex-col md:flex-row md:items-end justify-between gap-6 mb-14"
            >
              <p className="text-[11px] tracking-[0.25em] text-foreground-1 uppercase font-mono">
                Member Details
              </p>
            </motion.div>

            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-px bg-border">
              {MEMBERS.map((member, i) => (
                <motion.div
                  key={member.id}
                  initial={{ opacity: 0, y: 24 }} whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true }}
                  transition={{ delay: i * 0.07, duration: 0.6 }}
                  className="bg-background-1 p-8"
                >
                  {/* Photo */}
                  <div className="relative w-16 h-16 rounded-xl overflow-hidden ring-1 ring-border mb-6">
                    <Image
                      src={member.image}
                      alt={member.name}
                      fill
                      sizes="64px"
                      className="object-cover"
                    />
                  </div>

                  {/* Index + status */}
                  <div className="flex items-center gap-2 mb-3">
                    <span className="text-[11px] font-mono text-foreground-1">
                      {String(i + 1).padStart(2, '0')}
                    </span>
                    {member.status && (
                      <span className="text-[9px] px-1.5 py-0.5 font-mono tracking-wide rounded bg-foreground-0/8 border border-border text-foreground-1">
                        {member.status}
                      </span>
                    )}
                  </div>

                  {/* Name & role */}
                  <h3 className="text-lg font-semibold tracking-tight mb-1">{member.name}</h3>
                  <p className="text-[11px] tracking-[0.2em] text-foreground-1 uppercase font-mono mb-6">
                    {member.role}
                  </p>

                  {/* Divider */}
                  <div className="w-8 border-t border-border mb-6" />

                  {/* Bio */}
                  <p className="text-sm text-foreground-1 leading-relaxed">{member.bio}</p>
                </motion.div>
              ))}
            </div>
          </div>
        </section>

        {/* ── Contact ── */}
        <section id="contact" className="bg-background-1 border-t border-border px-6 md:px-12 py-24">
          <div className="max-w-5xl mx-auto">
            <motion.div
              initial={{ opacity: 0, y: 24 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }}
              transition={{ duration: 0.6 }}
            >
              <p className="text-[11px] tracking-[0.25em] text-foreground-1 uppercase font-mono mb-8">
                Contact
              </p>
              <h2 className="text-[clamp(2.5rem,6vw,5rem)] font-bold tracking-[-0.03em] leading-none mb-6">
                お問い合わせは<br />こちらから。
              </h2>
              <p className="text-sm text-foreground-1 leading-relaxed max-w-sm mb-8">
                プロダクトに関するお問い合わせは、PM のメールアドレスまでご連絡ください。
              </p>
              <a
                href="mailto:k.fujiyama@routem.net"
                className="inline-flex items-center gap-2 text-base text-foreground-0 underline underline-offset-4 hover:opacity-60 transition-opacity"
              >
                k.fujiyama@routem.net
              </a>
            </motion.div>
          </div>
        </section>

        {/* ── Footer ── */}
        <footer className="bg-background-1 border-t border-border px-6 md:px-12 py-8">
          <div className="max-w-5xl mx-auto flex items-center justify-between text-[11px] font-mono text-foreground-1">
            <span>© 2026</span>
            <span>Built with Next.js</span>
          </div>
        </footer>
      </div>
    </>
  );
}
