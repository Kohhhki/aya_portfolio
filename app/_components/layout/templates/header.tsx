'use client';

import { useState, memo } from 'react';
import Link from 'next/link';
import Image from 'next/image';
import { MdMenu, MdClose } from 'react-icons/md';
import ThemeToggle from '@/app/_components/layout/ingredients/themeToggle';

const NAV_LINKS = [
  { label: 'Work',    href: '#work' },
  { label: 'About',  href: '#about' },
  { label: 'Contact', href: '#contact' },
];

const Header = memo(function Header() {
  const [isMenuOpen, setIsMenuOpen] = useState(false);

  return (
    <>
      <header className="h-12 px-4 flex items-center gap-3 bg-background-1/75 backdrop-blur-xl border border-foreground-0/8 rounded-2xl shadow-lg shadow-black/10">
        <Link href="/" className="flex items-center gap-2 shrink-0" onClick={() => setIsMenuOpen(false)}>
          <Image
            src="/logo.jpg"
            alt="logo"
            width={24}
            height={24}
            className="rounded-md object-cover"
          />
        </Link>

        <div className="w-px h-4 bg-foreground-0/12 hidden md:block" />

        <nav className="hidden md:flex items-center gap-0.5">
          {NAV_LINKS.map((link) => (
            <Link
              key={link.href}
              href={link.href}
              className="px-3 py-1.5 text-[13px] font-medium text-foreground-1 hover:text-foreground-0 rounded-lg hover:bg-foreground-0/6 transition-all duration-150"
            >
              {link.label}
            </Link>
          ))}
        </nav>

        <div className="flex items-center gap-1 ml-auto">
          <ThemeToggle />
          <button
            className="md:hidden p-1.5 hover:bg-foreground-0/8 rounded-lg transition-colors cursor-pointer"
            onClick={() => setIsMenuOpen((v) => !v)}
            aria-label="toggle menu"
          >
            {isMenuOpen
              ? <MdClose size={20} className="text-foreground-0" />
              : <MdMenu size={20} className="text-foreground-0" />
            }
          </button>
        </div>
      </header>

      {isMenuOpen && (
        <div className="md:hidden mt-2 bg-background-1/95 backdrop-blur-xl border border-foreground-0/8 rounded-2xl shadow-lg shadow-black/10 overflow-hidden">
          <nav className="flex flex-col p-2 gap-0.5">
            {NAV_LINKS.map((link) => (
              <Link
                key={link.href}
                href={link.href}
                onClick={() => setIsMenuOpen(false)}
                className="px-4 py-2.5 text-[14px] font-medium text-foreground-0 rounded-xl hover:bg-foreground-0/6 transition-colors"
              >
                {link.label}
              </Link>
            ))}
          </nav>
        </div>
      )}
    </>
  );
});

export default Header;
