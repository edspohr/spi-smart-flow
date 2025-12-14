'use client';

import Link from 'next/link';
import Image from 'next/image';
import { usePathname } from 'next/navigation';
import { cn } from '@/lib/utils';
import { CountdownBanner } from '@/components/shared/CountdownBanner';
import { mockClient } from '@/data/mock-clients';

const navItems = [
  { href: '/cliente', label: 'Dashboard' },
  { href: '/cliente/boveda', label: 'Documentos' },
  { href: '/cliente/templates', label: 'Generar' },
  { href: '/cliente/verificar', label: 'Validar' }
];

export default function ClientLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  const pathname = usePathname();

  return (
    <div className="min-h-screen flex flex-col bg-white">
      {/* Countdown Banner */}
      <CountdownBanner />

      {/* Header */}
      <header className="border-b border-border bg-white sticky top-0 z-40">
        <div className="container mx-auto px-4">
          <div className="flex items-center justify-between h-14">
            {/* Left: Back + Logo */}
            <div className="flex items-center gap-4">
              <Link 
                href="/" 
                className="text-muted-foreground hover:text-foreground transition-colors"
                title="Volver al inicio"
              >
                <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M10 19l-7-7m0 0l7-7m-7 7h18" />
                </svg>
              </Link>
              
              <Link href="/cliente" className="flex items-center gap-2">
                <Image 
                  src="/logo.png" 
                  alt="Smart Flow" 
                  width={32} 
                  height={32} 
                  className="rounded-lg"
                />
                <span className="hidden sm:block font-medium text-sm text-foreground">Smart Flow</span>
              </Link>
            </div>

            {/* Center: Navigation */}
            <nav className="hidden md:flex items-center gap-1">
              {navItems.map((item) => (
                <Link
                  key={item.href}
                  href={item.href}
                  className={cn(
                    "px-3 py-1.5 rounded-md text-sm transition-colors",
                    pathname === item.href
                      ? "bg-primary text-white"
                      : "text-muted-foreground hover:text-foreground hover:bg-muted"
                  )}
                >
                  {item.label}
                </Link>
              ))}
            </nav>

            {/* Right: User */}
            <div className="flex items-center gap-3">
              <span className="hidden sm:block text-sm text-muted-foreground">
                {mockClient.name.split(' ')[0]}
              </span>
              <div className="w-8 h-8 rounded-full bg-primary text-white flex items-center justify-center text-xs font-medium">
                {mockClient.name.charAt(0)}
              </div>
            </div>
          </div>
        </div>

        {/* Mobile Navigation */}
        <nav className="md:hidden flex border-t border-border">
          {navItems.map((item) => (
            <Link
              key={item.href}
              href={item.href}
              className={cn(
                "flex-1 py-2 text-center text-xs font-medium transition-colors",
                pathname === item.href
                  ? "bg-primary text-white"
                  : "text-muted-foreground"
              )}
            >
              {item.label}
            </Link>
          ))}
        </nav>
      </header>

      {/* Main Content */}
      <main className="flex-1 bg-slate-50">
        {children}
      </main>

      {/* Footer */}
      <footer className="bg-white border-t border-border py-4">
        <div className="container mx-auto px-4 text-center text-xs text-muted-foreground">
          © 2025 Smart Flow
        </div>
      </footer>
    </div>
  );
}
