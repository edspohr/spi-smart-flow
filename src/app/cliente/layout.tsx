'use client';

import Link from 'next/link';
import Image from 'next/image';
import { usePathname } from 'next/navigation';
import { cn } from '@/lib/utils';
import { CountdownBanner } from '@/components/shared/CountdownBanner';
import { mockClient } from '@/data/mock-clients';

const navItems = [
  { href: '/cliente', label: 'Dashboard', icon: '📊' },
  { href: '/cliente/boveda', label: 'Bóveda Documental', icon: '🗄️' },
  { href: '/cliente/templates', label: 'Generar Documentos', icon: '📝' },
  { href: '/cliente/verificar', label: 'Validación IA', icon: '🤖' }
];

export default function ClientLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  const pathname = usePathname();

  return (
    <div className="min-h-screen flex flex-col bg-gradient-to-br from-slate-50 via-white to-blue-50">
      {/* Countdown Banner */}
      <CountdownBanner />

      {/* Header */}
      <header className="bg-white/80 backdrop-blur-md border-b border-border sticky top-0 z-40 shadow-sm">
        <div className="container mx-auto px-4">
          <div className="flex items-center justify-between h-16">
            <div className="flex items-center gap-4">
              <Link href="/" className="flex items-center gap-3 group">
                <Image 
                  src="/logo.png" 
                  alt="SPI Smart Flow" 
                  width={40} 
                  height={40} 
                  className="rounded-xl shadow-sm group-hover:shadow-md transition-shadow"
                />
                <span className="hidden md:block font-semibold text-lg text-spi-primary">Smart Flow</span>
              </Link>
            </div>

            <nav className="hidden md:flex items-center gap-1">
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

            <div className="flex items-center gap-3">
              <div className="hidden md:block text-right">
                <p className="text-sm font-medium text-foreground">{mockClient.name.split(' ').slice(0, 2).join(' ')}</p>
                <p className="text-xs text-muted-foreground">{mockClient.company}</p>
              </div>
              <div className="w-10 h-10 rounded-full gradient-success flex items-center justify-center text-white font-semibold shadow-md">
                {mockClient.name.charAt(0)}
              </div>
            </div>
          </div>
        </div>

        {/* Mobile Navigation */}
        <nav className="md:hidden flex overflow-x-auto border-t border-border px-4 py-2 gap-2 bg-white/50">
          {navItems.map((item) => (
            <Link
              key={item.href}
              href={item.href}
              className={cn(
                "shrink-0 px-3 py-2 rounded-lg text-xs font-medium transition-all",
                pathname === item.href
                  ? "bg-spi-primary text-white shadow-md"
                  : "text-muted-foreground bg-slate-100"
              )}
            >
              <span className="mr-1">{item.icon}</span>
              {item.label}
            </Link>
          ))}
        </nav>
      </header>

      {/* Main Content */}
      <main className="flex-1">
        {children}
      </main>

      {/* Footer */}
      <footer className="bg-white/80 backdrop-blur-sm border-t border-border py-4">
        <div className="container mx-auto px-4 text-center text-sm text-muted-foreground">
          © 2024 SPI Smart Flow · Plataforma de Documentación Inteligente · 
          <Link href="/" className="ml-2 text-spi-primary hover:underline font-medium">
            ← Inicio
          </Link>
        </div>
      </footer>
    </div>
  );
}
