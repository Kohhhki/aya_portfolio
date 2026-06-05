import type { Metadata } from 'next';
import { Inter } from 'next/font/google';
import './globals.css';
import RootClient from '@/app/rootClient';
import { ThemeProvider } from '@/app/_components/providers/themeProvider';

const inter = Inter({
  subsets: ['latin'],
  variable: '--font-inter',
  display: 'swap',
});

export const metadata: Metadata = {
  title: 'AYAstudio',
  description: 'AYAstudio portfolio',
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="ja" suppressHydrationWarning>
      <body className={`${inter.variable} font-sans antialiased`}>
        <ThemeProvider
          attribute="class"
          defaultTheme="dark"
          enableSystem
          disableTransitionOnChange
        >
          <RootClient>{children}</RootClient>
        </ThemeProvider>
      </body>
    </html>
  );
}
