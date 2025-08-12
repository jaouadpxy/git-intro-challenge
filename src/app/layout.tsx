import type { Metadata } from 'next';
import React from 'react';

// In a real Tailwind setup, you would import the global CSS file here
// import './globals.css';

export const metadata: Metadata = {
  title: 'DiscoverTriply',
  description: 'Your ultimate travel discovery platform.',
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en">
      <body>
        {/* In a real app, a <Header /> component would go here */}
        <main className="flex min-h-screen flex-col items-center justify-between p-24">
          {children}
        </main>
        {/* And a <Footer /> component would go here */}
      </body>
    </html>
  );
}
