'use client';

import Link from 'next/link';
import Image from 'next/image';
import { usePathname } from 'next/navigation';
import { cn } from '@/lib/utils';

const navItems = [
  { href: '/admin', label: 'Dashboard', icon: '📊' },
  { href: '/admin/triage', label: 'Matriz de Triage', icon: '🚦' }
];

export default function AdminLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  const pathname = usePathname();

  return (
    <div className="min-h-screen flex flex-col bg-gradient-to-br from-slate-50 via-white to-indigo-50">
      {/* Header */}
      <header className="bg-white/80 backdrop-blur-md border-b border-border sticky top-0 z-40 shadow-sm">
        <div className="container mx-auto px-4">
          <div className="flex items-center justify-between h-16">
            <div className="flex items-center gap-4">
              {/* Back to Home Button */}
              <Link 
                href="/" 
                className="flex items-center gap-2 text-spi-primary hover:text-spi-primary/80 bg-spi-primary/10 hover:bg-spi-primary/20 px-4 py-2 rounded-xl font-semibold transition-all"
              >
                <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M10 19l-7-7m0 0l7-7m-7 7h18" />
                </svg>
                <span className="hidden md:inline">Inicio</span>
              </Link>
              
              {/* Logo */}
              <Link href="/admin" className="flex items-center gap-3 group">
                <Image 
                  src="/logo.png" 
                  alt="Smart Flow" 
                  width={40} 
                  height={40} 
                  className="rounded-xl shadow-sm group-hover:shadow-md transition-shadow"
                />
                <div className="hidden md:flex items-center gap-2">
                  <span className="font-semibold text-lg text-spi-primary">Smart Flow</span>
                  <span className="text-xs bg-spi-primary/10 text-spi-primary px-2 py-1 rounded-full font-semibold">
                    ADMIN
                  </span>
                </div>
              </Link>
            </div>

            <nav className="flex items-center gap-1">
              {navItems.map((item) => (
                <Link
                  key={item.href}
                  href={item.href}
                  className={cn(
                    "px-4 py-2 rounded-xl text-sm font-medium transition-all duration-200",
                    pathname === item.href
                      ? "bg-spi-primary text-white shadow-lg shadow-spi-primary/20"
                      : "text-muted-foreground hover:text-foreground hover:bg-slate-100"
                  )}
                >
                  <span className="mr-2">{item.icon}</span>
                  {item.label}
                </Link>
              ))}
            </nav>

            <div className="w-10 h-10 rounded-full gradient-primary flex items-center justify-center text-white font-semibold shadow-md">
              A
            </div>
          </div>
        </div>
      </header>

      {/* Main Content */}
      <main className="flex-1">
        {children}
      </main>

      {/* Footer */}
      <footer className="bg-white/80 backdrop-blur-sm border-t border-border py-4">
        <div className="container mx-auto px-4 text-center text-sm text-muted-foreground">
          © 2025 Smart Flow · Torre de Control Ejecutivo
        </div>
      </footer>
    </div>
  );
}
