'use client';

import { useState, memo } from 'react';
import Link from 'next/link';
import { MdMenu, MdClose } from 'react-icons/md';
import ThemeToggle from '@/app/_components/layout/ingredients/themeToggle';
import Logo from '@/app/_components/layout/ingredients/logo';

const NAV_LINKS = [
  { label: 'Products', href: '#work' },
  { label: 'Team',     href: '#members' },
  { label: 'Contact',  href: '#contact' },
];

const Header = memo(function Header() {
  const [isMenuOpen, setIsMenuOpen] = useState(false);

  return (
    <>
      <header className="h-[72px] px-6 flex items-center gap-4 bg-background-1/75 backdrop-blur-xl border border-foreground-0/8 rounded-2xl shadow-lg shadow-black/10">
        <Link href="/" className="flex items-center shrink-0" onClick={() => setIsMenuOpen(false)}>
          <Logo className="h-8 w-auto text-foreground-0" />
        </Link>

        <div className="w-px h-5 bg-foreground-0/12 hidden md:block" />

        <nav className="hidden md:flex items-center gap-0.5">
          {NAV_LINKS.map((link) => (
            <Link
              key={link.href}
              href={link.href}
              className="px-4 py-2 text-[14px] font-medium text-foreground-1 hover:text-foreground-0 rounded-lg hover:bg-foreground-0/6 transition-all duration-150"
            >
              {link.label}
            </Link>
          ))}
        </nav>

        <div className="flex items-center gap-1 ml-auto">
          <ThemeToggle />
          <button
            className="md:hidden p-2 hover:bg-foreground-0/8 rounded-lg transition-colors cursor-pointer"
            onClick={() => setIsMenuOpen((v) => !v)}
            aria-label="toggle menu"
          >
            {isMenuOpen
              ? <MdClose size={22} className="text-foreground-0" />
              : <MdMenu size={22} className="text-foreground-0" />
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
                className="px-4 py-3 text-[15px] font-medium text-foreground-0 rounded-xl hover:bg-foreground-0/6 transition-colors"
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
