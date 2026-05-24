'use client';

import { useState, memo } from 'react';
import Link from 'next/link';
import { MdMenu, MdClose } from 'react-icons/md';
import PageTitle from '@/app/_components/layout/ingredients/pageTitle';
import ThemeToggle from '@/app/_components/layout/ingredients/themeToggle';

const NAV_LINKS = [
  { label: 'Products', href: '#products' },
  { label: 'Solutions', href: '#solutions' },
  { label: 'Docs', href: '#docs' },
  { label: 'About', href: '#about' },
];

const Header = memo(function Header() {
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);

  return (
    <>
      <header className="block w-full h-[50px] md:h-[60px] bg-background-1/80 backdrop-blur-xl border-b border-foreground-0/8 box-border">
        <div className="px-5 md:px-8 w-full h-full flex items-center max-w-[1200px] mx-auto gap-4">
          <button
            className="md:hidden p-1.5 -ml-1.5 hover:bg-foreground-0/8 rounded-lg transition-colors cursor-pointer"
            onClick={() => setIsMobileMenuOpen((v) => !v)}
            aria-label="toggle menu"
          >
            {isMobileMenuOpen
              ? <MdClose size={22} className="text-foreground-0" />
              : <MdMenu size={22} className="text-foreground-0" />
            }
          </button>

          <PageTitle />

          <nav className="hidden md:flex items-center gap-1 flex-1 ml-6">
            {NAV_LINKS.map((link) => (
              <Link
                key={link.href}
                href={link.href}
                className="px-3 py-1.5 text-[14px] text-foreground-1 hover:text-foreground-0 rounded-lg hover:bg-foreground-0/6 transition-all duration-150 font-medium"
              >
                {link.label}
              </Link>
            ))}
          </nav>

          <div className="flex items-center gap-2 ml-auto md:ml-0">
            <ThemeToggle />
            <Link
              href="#contact"
              className="hidden md:inline-flex items-center px-4 py-1.5 text-[14px] font-medium text-background-1 bg-foreground-0 rounded-full hover:opacity-80 transition-opacity"
            >
              Get Started
            </Link>
          </div>
        </div>
      </header>

      {isMobileMenuOpen && (
        <div className="md:hidden fixed top-[50px] left-0 right-0 z-40 bg-background-1/95 backdrop-blur-xl border-b border-foreground-0/8">
          <nav className="flex flex-col px-5 py-4 gap-1 max-w-[1200px] mx-auto">
            {NAV_LINKS.map((link) => (
              <Link
                key={link.href}
                href={link.href}
                onClick={() => setIsMobileMenuOpen(false)}
                className="px-3 py-2.5 text-[15px] text-foreground-0 font-medium rounded-xl hover:bg-foreground-0/6 transition-colors"
              >
                {link.label}
              </Link>
            ))}
            <div className="mt-2 pt-2 border-t border-foreground-0/8">
              <Link
                href="#contact"
                onClick={() => setIsMobileMenuOpen(false)}
                className="flex items-center justify-center w-full py-2.5 text-[15px] font-medium text-background-1 bg-foreground-0 rounded-xl hover:opacity-80 transition-opacity"
              >
                Get Started
              </Link>
            </div>
          </nav>
        </div>
      )}
    </>
  );
});

export default Header;
