// src/app/layout.tsx
import '@/styles/globals.css'; // import global styles if needed
import { ReactNode } from 'react';

export const metadata = {
  title: 'To Do App By Otabek',
  description: 'To Do App by Otabek',
};

interface RootLayoutProps {
  children: ReactNode;
}

export default function RootLayout({ children }: RootLayoutProps) {
  return (
    <html lang="en">
      <head>
        <meta charSet="UTF-8" />
        <meta name="viewport" content="width=device-width, initial-scale=1.0" />
        <title>{metadata.title}</title>
        <meta name="description" content={metadata.description} />
        <link rel="icon" href="/favicon.ico" />
      </head>
      <body>
        {children}
      </body>
    </html>
  );
}
