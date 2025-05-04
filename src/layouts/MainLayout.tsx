import { ReactNode } from 'react';
import NavBar from '../components/Nav';

interface MainLayoutProps {
  children: ReactNode;
}

export function MainLayout({ children }: MainLayoutProps) {
  return (
    <div className="min-h-screen flex flex-col">
      <NavBar />

      <main className=" bg-gray-50">
        {children}
      </main>
    </div>
  );
}
