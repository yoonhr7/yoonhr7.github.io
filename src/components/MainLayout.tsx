"use client";

import { usePathname } from 'next/navigation';
import Header from './Header';
import './MainLayout.scss';

interface MainLayoutProps {
  children: React.ReactNode;
}

export default function MainLayout({ children }: MainLayoutProps) {
  const pathname = usePathname();
  const isHome = pathname === '/';

  return (
    <>
      <Header isHome={isHome} />
      <main className="main-layout">
        {children}
      </main>
    </>
  );
}
