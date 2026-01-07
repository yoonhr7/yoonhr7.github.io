import Header from './Header';
import './MainLayout.scss';

interface MainLayoutProps {
  children: React.ReactNode;
}

export default function MainLayout({ children }: MainLayoutProps) {
  return (
    <>
      <Header />
      <main className="main-layout">
        {children}
      </main>
    </>
  );
}
