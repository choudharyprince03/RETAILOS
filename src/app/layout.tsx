import type { Metadata } from 'next';
import { Poppins } from 'next/font/google';
import './globals.css';

const poppins = Poppins({
  subsets: ['latin'],
  weight: ['300', '400', '500', '600', '700', '800'],
  variable: '--font-poppins',
  display: 'swap',
});

export const metadata: Metadata = {
  title: 'MOAR RetailOS · The Retail Operating System | Phase 1 Showcase & PRD',
  description:
    'Advisory, AI and accelerators, productized across the retail value chain. Public Phase 1 Interactive Showcase and Product Manager PRD & Project Plan.',
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en" data-theme="slate" className={poppins.variable}>
      <body className={poppins.className}>{children}</body>
    </html>
  );
}
