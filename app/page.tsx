'use client';

import { motion } from 'framer-motion';
import Link from 'next/link';
import Logo from '@/app/_components/layout/ingredients/logo';

const PROJECTS = [
  {
    id: '01',
    title: 'Project Alpha',
    category: 'Web App',
    year: '2025',
    description: 'A full-stack application built with Next.js and TypeScript. Focused on performance and developer experience.',
    tags: ['Next.js', 'TypeScript', 'Prisma'],
    wide: true,
  },
  {
    id: '02',
    title: 'Project Beta',
    category: 'Design System',
    year: '2025',
    description: 'Component library and design tokens for a large-scale product.',
    tags: ['React', 'Tailwind', 'Storybook'],
    wide: false,
  },
  {
    id: '03',
    title: 'Project Gamma',
    category: 'Mobile',
    year: '2024',
    description: 'Cross-platform mobile experience with native-feel interactions.',
    tags: ['React Native', 'Expo'],
    wide: false,
  },
];

const SKILLS = ['TypeScript', 'React', 'Next.js', 'Node.js', 'PostgreSQL', 'Figma', 'Docker', 'AWS'];

export default function Home() {
  return (
    <>
      {/* ── Fixed background logo layer ── */}
      <motion.div
        className="fixed inset-0 z-0 pointer-events-none flex items-center px-6 md:px-16"
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ duration: 1.2, ease: 'easeOut' }}
      >
        <Logo className="w-full h-auto text-foreground-0" />
      </motion.div>

      {/* ── Scrollable content layer ── */}
      <div className="relative z-10 text-foreground-0">

        {/* Hero — transparent, logo shows through */}
        <section className="min-h-screen flex flex-col px-6 md:px-12 pt-28 pb-12">
          <motion.div
            initial={{ opacity: 0 }} animate={{ opacity: 1 }} transition={{ duration: 0.6 }}
            className="flex items-center justify-between"
          >
            <p className="text-[11px] tracking-[0.25em] text-foreground-1 uppercase font-mono">
              Portfolio — 2026
            </p>
            <p className="text-[11px] tracking-[0.25em] text-foreground-1 uppercase font-mono hidden md:block">
              Full-stack Developer
            </p>
          </motion.div>

          <motion.div
            initial={{ opacity: 0 }} animate={{ opacity: 1 }} transition={{ duration: 0.6, delay: 0.5 }}
            className="mt-auto border-t border-foreground-0/15 pt-8 flex flex-col md:flex-row md:items-end justify-between gap-6"
          >
            <p className="text-sm text-foreground-1 max-w-sm leading-relaxed">
              Building exceptional digital products.
              Obsessed with performance, clean code, and great UX.
            </p>
            <div className="flex items-center gap-6 shrink-0">
              <Link
                href="#work"
                className="px-6 py-2.5 bg-foreground-0 text-background-1 text-sm font-medium rounded-full hover:opacity-75 transition-opacity"
              >
                View Work
              </Link>
              <Link href="#contact" className="text-sm text-foreground-1 hover:text-foreground-0 transition-colors">
                Get in touch →
              </Link>
            </div>
          </motion.div>
        </section>

        {/* ── Work — solid bg covers fixed logo on scroll ── */}
        <section id="work" className="bg-background-1 px-6 md:px-12 py-24">
          <div className="max-w-5xl mx-auto">
            <motion.p
              initial={{ opacity: 0 }} whileInView={{ opacity: 1 }} viewport={{ once: true }}
              transition={{ duration: 0.5 }}
              className="text-[11px] tracking-[0.25em] text-foreground-1 uppercase font-mono mb-12"
            >
              Selected Work
            </motion.p>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-px bg-border">
              {PROJECTS.map((project, i) => (
                <motion.div
                  key={project.id}
                  initial={{ opacity: 0 }} whileInView={{ opacity: 1 }} viewport={{ once: true }}
                  transition={{ delay: i * 0.08, duration: 0.5 }}
                  className={`group bg-background-1 p-8 hover:bg-background-0 transition-colors cursor-pointer${project.wide ? ' md:col-span-2' : ''}`}
                >
                  <div className="flex items-start justify-between mb-6">
                    <span className="text-[11px] font-mono text-foreground-1">{project.id}</span>
                    <span className="text-[11px] font-mono text-foreground-1">{project.year}</span>
                  </div>
                  <h3 className="text-2xl md:text-3xl font-semibold tracking-tight mb-2">{project.title}</h3>
                  <p className="text-[11px] tracking-[0.2em] text-foreground-1 uppercase font-mono mb-4">{project.category}</p>
                  <p className="text-sm text-foreground-1 leading-relaxed mb-6 max-w-md">{project.description}</p>
                  <div className="flex flex-wrap gap-2">
                    {project.tags.map((tag) => (
                      <span key={tag} className="px-2.5 py-1 text-[11px] font-mono border border-border text-foreground-1 rounded">
                        {tag}
                      </span>
                    ))}
                  </div>
                  <div className="mt-8 flex items-center gap-1.5 text-[12px] text-foreground-1 group-hover:text-foreground-0 transition-colors">
                    <span>View project</span>
                    <span className="transition-transform group-hover:translate-x-1">→</span>
                  </div>
                </motion.div>
              ))}
            </div>
          </div>
        </section>

        {/* ── About ── */}
        <section id="about" className="bg-background-1 border-t border-border px-6 md:px-12 py-24">
          <div className="max-w-5xl mx-auto grid md:grid-cols-2 gap-16">
            <motion.div
              initial={{ opacity: 0, y: 24 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }}
              transition={{ duration: 0.6 }}
            >
              <p className="text-[11px] tracking-[0.25em] text-foreground-1 uppercase font-mono mb-8">About</p>
              <p className="text-lg leading-relaxed mb-6">
                I&apos;m a developer based in Japan, focused on building
                products that are fast, beautiful, and easy to use.
              </p>
              <p className="text-sm text-foreground-1 leading-relaxed">
                With a background spanning frontend architecture, backend APIs,
                and product design, I bring a holistic perspective to every
                project I work on.
              </p>
            </motion.div>

            <motion.div
              initial={{ opacity: 0, y: 24 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }}
              transition={{ duration: 0.6, delay: 0.1 }}
            >
              <p className="text-[11px] tracking-[0.25em] text-foreground-1 uppercase font-mono mb-8">Skills</p>
              <div className="grid grid-cols-2 gap-px bg-border">
                {SKILLS.map((skill) => (
                  <div key={skill} className="bg-background-1 px-4 py-3 text-sm font-mono text-foreground-1 hover:text-foreground-0 hover:bg-background-0 transition-colors">
                    {skill}
                  </div>
                ))}
              </div>
            </motion.div>
          </div>
        </section>

        {/* ── Contact ── */}
        <section id="contact" className="bg-background-1 border-t border-border px-6 md:px-12 py-24">
          <div className="max-w-5xl mx-auto">
            <motion.div
              initial={{ opacity: 0, y: 24 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }}
              transition={{ duration: 0.6 }}
              className="flex flex-col md:flex-row md:items-end justify-between gap-12"
            >
              <div>
                <p className="text-[11px] tracking-[0.25em] text-foreground-1 uppercase font-mono mb-8">Contact</p>
                <h2 className="text-[clamp(2.5rem,6vw,5rem)] font-bold tracking-[-0.03em] leading-none mb-6">
                  Let&apos;s work<br />together.
                </h2>
                <a
                  href="mailto:hello@example.com"
                  className="text-foreground-1 hover:text-foreground-0 transition-colors text-base underline underline-offset-4"
                >
                  hello@example.com
                </a>
              </div>
              <div className="flex flex-col gap-3 text-sm">
                {[
                  { label: 'GitHub',   href: '#' },
                  { label: 'Twitter',  href: '#' },
                  { label: 'LinkedIn', href: '#' },
                ].map((link) => (
                  <Link
                    key={link.label}
                    href={link.href}
                    className="flex items-center gap-2 text-foreground-1 hover:text-foreground-0 transition-colors group"
                  >
                    <span className="transition-transform group-hover:translate-x-1">→</span>
                    <span>{link.label}</span>
                  </Link>
                ))}
              </div>
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
