import type { Metadata } from 'next';
import './globals.css';

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
    <html lang="en" data-theme="slate">
      <body>{children}</body>
    </html>
  );
}
