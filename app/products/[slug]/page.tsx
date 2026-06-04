import { notFound } from 'next/navigation';
import Link from 'next/link';
import Image from 'next/image';
import { PRODUCTS } from '@/app/_data/products';
import ClueeIcon from '@/app/_components/ui/clueeIcon';

export function generateStaticParams() {
  return PRODUCTS.map((p) => ({ slug: p.id }));
}

type Props = { params: Promise<{ slug: string }> };

export default async function ProductPage({ params }: Props) {
  const { slug } = await params;
  const product = PRODUCTS.find((p) => p.id === slug);
  if (!product) notFound();

  return (
    <main className="min-h-screen bg-background-1 text-foreground-0">

      {/* ── Nav ── */}
      <nav className="px-6 md:px-12 py-8 border-b border-border flex items-center justify-between">
        <Link
          href="/#work"
          className="flex items-center gap-2 text-sm text-foreground-1 hover:text-foreground-0 transition-colors"
        >
          <span>←</span>
          <span>Product Details</span>
        </Link>
        <div className="flex items-center gap-3">
          {product.status && (
            <span className="text-[9px] px-2.5 py-1 font-mono tracking-wide rounded-full border border-border text-foreground-1">
              {product.status}
            </span>
          )}
          <p className="text-[11px] tracking-[0.25em] text-foreground-1 uppercase font-mono">
            {product.category}
          </p>
        </div>
      </nav>

      {/* ── Hero ── */}
      <section className="px-6 md:px-12 py-20 md:py-28 border-b border-border">
        <div className="max-w-5xl mx-auto">
          {/* Logo + year */}
          <div className="flex items-center gap-4 mb-8">
            <div className="w-10 h-10 flex items-center justify-center shrink-0">
              {product.logo.includes('cluee') ? (
                <ClueeIcon className="w-full h-full text-foreground-0" />
              ) : (
                <div className="relative w-full h-full">
                  <Image src={product.logo} alt={`${product.title} logo`} fill className="object-contain" />
                </div>
              )}
            </div>
            <p className="text-[11px] tracking-[0.25em] text-foreground-1 uppercase font-mono">
              {product.category} — {product.year}
            </p>
          </div>

          <h1 className="text-[clamp(3rem,8vw,8rem)] font-bold tracking-[-0.04em] leading-[0.9] mb-8">
            {product.title}
          </h1>

          {/* CTA row */}
          <div className="flex flex-wrap items-center gap-4 mb-12">
            {product.url ? (
              <a
                href={product.url}
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex items-center gap-2 px-6 py-2.5 bg-foreground-0 text-background-1 text-sm font-medium rounded-full hover:opacity-75 transition-opacity"
              >
                Visit Site
                <span aria-hidden>↗</span>
              </a>
            ) : (
              <span className="inline-flex items-center gap-2 px-5 py-2 text-sm font-medium border border-border text-foreground-1 rounded-full">
                <span className="w-1.5 h-1.5 rounded-full bg-amber-400 animate-pulse" />
                鋭意制作中 — Coming Soon
              </span>
            )}
          </div>

          <div className="grid md:grid-cols-2 gap-10 md:gap-20">
            <p className="text-base md:text-lg text-foreground-1 leading-relaxed">
              {product.longDescription}
            </p>
            <div className="flex flex-col gap-8">
              {/* Tech tags */}
              <div>
                <p className="text-[11px] tracking-[0.25em] text-foreground-1 uppercase font-mono mb-3">
                  Tech Stack
                </p>
                <div className="flex flex-wrap gap-2">
                  {product.tags.map((tag) => (
                    <span
                      key={tag}
                      className="px-3 py-1.5 text-[11px] font-mono border border-border text-foreground-1 rounded"
                    >
                      {tag}
                    </span>
                  ))}
                </div>
              </div>

              {/* Developers (if present) */}
              {product.developers && (
                <div>
                  <p className="text-[11px] tracking-[0.25em] text-foreground-1 uppercase font-mono mb-3">
                    Developed by
                  </p>
                  <div className="flex flex-col gap-1">
                    {product.developers.map((dev) => (
                      <p key={dev} className="text-sm text-foreground-0">{dev}</p>
                    ))}
                  </div>
                </div>
              )}
            </div>
          </div>
        </div>
      </section>

      {/* ── Demo video / screenshot ── */}
      <section className="border-b border-border bg-background-0">
        <div className="max-w-5xl mx-auto px-6 md:px-12 py-16">
          {product.video ? (
            <div className="relative overflow-hidden rounded-xl border border-border bg-black max-h-[70vh] flex items-center justify-center">
              <video
                src={product.video}
                autoPlay
                muted
                loop
                playsInline
                poster={product.image}
                className="w-full h-full object-contain max-h-[70vh]"
              />
            </div>
          ) : (
            <div className="relative w-full overflow-hidden rounded-xl border border-border">
              <Image
                src={product.image}
                alt={product.title}
                width={1200}
                height={800}
                className="w-full h-auto object-contain"
              />
            </div>
          )}
        </div>
      </section>

      {/* ── Highlights ── */}
      <section className="px-6 md:px-12 py-20 border-b border-border">
        <div className="max-w-5xl mx-auto">
          <p className="text-[11px] tracking-[0.25em] text-foreground-1 uppercase font-mono mb-10">
            Highlights
          </p>
          <ul className="grid md:grid-cols-2 gap-px bg-border">
            {product.highlights.map((item) => (
              <li
                key={item}
                className="bg-background-1 px-8 py-6 text-sm text-foreground-1 leading-relaxed flex items-start gap-4"
              >
                <span className="shrink-0 mt-0.5 text-foreground-0">—</span>
                <span>{item}</span>
              </li>
            ))}
          </ul>
        </div>
      </section>

      {/* ── Other products ── */}
      <section className="px-6 md:px-12 py-20">
        <div className="max-w-5xl mx-auto">
          <p className="text-[11px] tracking-[0.25em] text-foreground-1 uppercase font-mono mb-12">
            Other Products
          </p>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-px bg-border">
            {PRODUCTS.filter((p) => p.id !== slug).map((p) => (
              <Link
                key={p.id}
                href={`/products/${p.id}`}
                className="group bg-background-1 p-8 hover:bg-background-0 transition-colors"
              >
                <div className="flex items-center gap-3 mb-4">
                  <div className="w-6 h-6 flex items-center justify-center shrink-0">
                    {p.logo.includes('cluee') ? (
                      <ClueeIcon className="w-full h-full text-foreground-0" />
                    ) : (
                      <div className="relative w-full h-full">
                        <Image src={p.logo} alt={p.title} fill className="object-contain" />
                      </div>
                    )}
                  </div>
                  <p className="text-[11px] font-mono text-foreground-1">
                    {p.category} — {p.year}
                  </p>
                  {p.status && (
                    <span className="text-[9px] px-2 py-0.5 font-mono rounded-full border border-border text-foreground-1">
                      {p.status}
                    </span>
                  )}
                </div>
                <h3 className="text-2xl font-semibold tracking-tight mb-2">{p.title}</h3>
                <p className="text-sm text-foreground-1 leading-relaxed mb-6">{p.description}</p>
                <span className="text-[12px] text-foreground-1 group-hover:text-foreground-0 transition-colors">
                  View project →
                </span>
              </Link>
            ))}
          </div>
        </div>
      </section>

    </main>
  );
}
