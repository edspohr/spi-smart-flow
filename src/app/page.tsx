import Link from 'next/link';
import Image from 'next/image';

export default function Home() {
  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-50 via-white to-blue-50 pattern-dots">
      {/* Decorative elements */}
      <div className="fixed inset-0 overflow-hidden pointer-events-none">
        <div className="absolute -top-40 -right-40 w-96 h-96 bg-spi-accent/5 rounded-full blur-3xl" />
        <div className="absolute -bottom-40 -left-40 w-96 h-96 bg-spi-primary/5 rounded-full blur-3xl" />
      </div>

      <div className="relative z-10 min-h-screen flex flex-col">
        {/* Header */}
        <header className="py-6 px-8">
          <div className="container mx-auto flex items-center justify-between">
            <div className="flex items-center gap-3">
              <Image 
                src="/logo.png" 
                alt="SPI" 
                width={48} 
                height={48}
                className="rounded-xl"
              />
              <span className="font-semibold text-lg text-spi-primary">Smart Flow</span>
            </div>
            <div className="hidden md:flex items-center gap-4">
              <span className="text-sm text-muted-foreground">Portal de Documentación Inteligente</span>
            </div>
          </div>
        </header>

        {/* Main Content */}
        <main className="flex-1 flex items-center justify-center px-8 py-12">
          <div className="w-full max-w-5xl mx-auto">
            {/* Hero Section */}
            <div className="text-center mb-16 animate-slide-up">
              {/* Large Logo */}
              <div className="mb-8 inline-block">
                <div className="relative">
                  <div className="absolute inset-0 bg-spi-accent/20 blur-3xl rounded-full scale-150" />
                  <Image 
                    src="/logo.png" 
                    alt="SPI Smart Flow" 
                    width={180} 
                    height={180} 
                    className="relative rounded-3xl shadow-2xl animate-float"
                    priority
                  />
                </div>
              </div>
              
              <h1 className="text-4xl md:text-5xl lg:text-6xl font-bold text-spi-primary mb-4 tracking-tight">
                Smart Flow
              </h1>
              <p className="text-xl md:text-2xl text-muted-foreground max-w-2xl mx-auto mb-2">
                Plataforma de Documentación Inteligente
              </p>
              <p className="text-base text-muted-foreground/70 max-w-xl mx-auto">
                Acelera tus procesos de OTA con validación automática de documentos potenciada por IA
              </p>
            </div>

            {/* Role Selection Cards */}
            <div className="grid md:grid-cols-2 gap-8 max-w-4xl mx-auto">
              {/* Client Portal */}
              <Link href="/cliente" className="group block">
                <div 
                  className="elevated-card rounded-2xl p-8 h-full transition-all duration-300 group-hover:scale-[1.02] animate-slide-up border-2 border-transparent group-hover:border-spi-accent/30"
                  style={{ animationDelay: '0.1s' }}
                >
                  <div className="flex flex-col items-center text-center">
                    {/* Icon */}
                    <div className="w-20 h-20 mb-6 rounded-2xl gradient-success flex items-center justify-center shadow-lg shadow-spi-accent/20 group-hover:shadow-xl group-hover:shadow-spi-accent/30 transition-all group-hover:scale-110">
                      <svg className="w-10 h-10 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M16 7a4 4 0 11-8 0 4 4 0 018 0zM12 14a7 7 0 00-7 7h14a7 7 0 00-7-7z" />
                      </svg>
                    </div>
                    
                    {/* Content */}
                    <h2 className="text-2xl font-bold text-foreground mb-3">
                      Portal Cliente
                    </h2>
                    <p className="text-muted-foreground mb-6 leading-relaxed">
                      Gestiona tu documentación, firma poderes digitales y valida documentos con inteligencia artificial
                    </p>
                    
                    {/* Features */}
                    <div className="space-y-2 mb-6 text-left w-full">
                      <div className="flex items-center gap-3 text-sm text-muted-foreground">
                        <div className="w-5 h-5 rounded-full bg-spi-accent/10 flex items-center justify-center">
                          <svg className="w-3 h-3 text-spi-accent" fill="currentColor" viewBox="0 0 20 20">
                            <path fillRule="evenodd" d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z" clipRule="evenodd" />
                          </svg>
                        </div>
                        Dashboard de progreso en tiempo real
                      </div>
                      <div className="flex items-center gap-3 text-sm text-muted-foreground">
                        <div className="w-5 h-5 rounded-full bg-spi-accent/10 flex items-center justify-center">
                          <svg className="w-3 h-3 text-spi-accent" fill="currentColor" viewBox="0 0 20 20">
                            <path fillRule="evenodd" d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z" clipRule="evenodd" />
                          </svg>
                        </div>
                        Bóveda documental inteligente
                      </div>
                      <div className="flex items-center gap-3 text-sm text-muted-foreground">
                        <div className="w-5 h-5 rounded-full bg-spi-accent/10 flex items-center justify-center">
                          <svg className="w-3 h-3 text-spi-accent" fill="currentColor" viewBox="0 0 20 20">
                            <path fillRule="evenodd" d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z" clipRule="evenodd" />
                          </svg>
                        </div>
                        Validación con IA integrada
                      </div>
                    </div>
                    
                    {/* CTA */}
                    <div className="flex items-center gap-2 text-spi-accent font-semibold group-hover:gap-3 transition-all">
                      Ingresar como Cliente
                      <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 7l5 5m0 0l-5 5m5-5H6" />
                      </svg>
                    </div>
                  </div>
                </div>
              </Link>

              {/* Admin Dashboard */}
              <Link href="/admin" className="group block">
                <div 
                  className="elevated-card rounded-2xl p-8 h-full transition-all duration-300 group-hover:scale-[1.02] animate-slide-up border-2 border-transparent group-hover:border-spi-primary/30"
                  style={{ animationDelay: '0.2s' }}
                >
                  <div className="flex flex-col items-center text-center">
                    {/* Icon */}
                    <div className="w-20 h-20 mb-6 rounded-2xl gradient-primary flex items-center justify-center shadow-lg shadow-spi-primary/20 group-hover:shadow-xl group-hover:shadow-spi-primary/30 transition-all group-hover:scale-110">
                      <svg className="w-10 h-10 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M9 19v-6a2 2 0 00-2-2H5a2 2 0 00-2 2v6a2 2 0 002 2h2a2 2 0 002-2zm0 0V9a2 2 0 012-2h2a2 2 0 012 2v10m-6 0a2 2 0 002 2h2a2 2 0 002-2m0 0V5a2 2 0 012-2h2a2 2 0 012 2v14a2 2 0 01-2 2h-2a2 2 0 01-2-2z" />
                      </svg>
                    </div>
                    
                    {/* Content */}
                    <h2 className="text-2xl font-bold text-foreground mb-3">
                      Torre de Control
                    </h2>
                    <p className="text-muted-foreground mb-6 leading-relaxed">
                      Monitorea KPIs en tiempo real, visualiza el flujo de caja y gestiona la cartera de clientes
                    </p>
                    
                    {/* Features */}
                    <div className="space-y-2 mb-6 text-left w-full">
                      <div className="flex items-center gap-3 text-sm text-muted-foreground">
                        <div className="w-5 h-5 rounded-full bg-spi-primary/10 flex items-center justify-center">
                          <svg className="w-3 h-3 text-spi-primary" fill="currentColor" viewBox="0 0 20 20">
                            <path fillRule="evenodd" d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z" clipRule="evenodd" />
                          </svg>
                        </div>
                        Dashboard ejecutivo con KPIs
                      </div>
                      <div className="flex items-center gap-3 text-sm text-muted-foreground">
                        <div className="w-5 h-5 rounded-full bg-spi-primary/10 flex items-center justify-center">
                          <svg className="w-3 h-3 text-spi-primary" fill="currentColor" viewBox="0 0 20 20">
                            <path fillRule="evenodd" d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z" clipRule="evenodd" />
                          </svg>
                        </div>
                        Matriz de triage con semáforos
                      </div>
                      <div className="flex items-center gap-3 text-sm text-muted-foreground">
                        <div className="w-5 h-5 rounded-full bg-spi-primary/10 flex items-center justify-center">
                          <svg className="w-3 h-3 text-spi-primary" fill="currentColor" viewBox="0 0 20 20">
                            <path fillRule="evenodd" d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z" clipRule="evenodd" />
                          </svg>
                        </div>
                        Análisis de eficiencia
                      </div>
                    </div>
                    
                    {/* CTA */}
                    <div className="flex items-center gap-2 text-spi-primary font-semibold group-hover:gap-3 transition-all">
                      Ingresar como Admin
                      <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 7l5 5m0 0l-5 5m5-5H6" />
                      </svg>
                    </div>
                  </div>
                </div>
              </Link>
            </div>

            {/* Trust badges */}
            <div className="mt-16 text-center animate-fade-in" style={{ animationDelay: '0.4s' }}>
              <p className="text-sm text-muted-foreground mb-4">Potenciado por tecnología de vanguardia</p>
              <div className="flex items-center justify-center gap-8 opacity-60">
                <div className="flex items-center gap-2 text-sm font-medium text-muted-foreground">
                  <svg className="w-5 h-5" viewBox="0 0 24 24" fill="currentColor">
                    <path d="M22.56 12.25c0-.78-.07-1.53-.2-2.25H12v4.26h5.92c-.26 1.37-1.04 2.53-2.21 3.31v2.77h3.57c2.08-1.92 3.28-4.74 3.28-8.09z"/>
                    <path d="M12 23c2.97 0 5.46-.98 7.28-2.66l-3.57-2.77c-.98.66-2.23 1.06-3.71 1.06-2.86 0-5.29-1.93-6.16-4.53H2.18v2.84C3.99 20.53 7.7 23 12 23z"/>
                    <path d="M5.84 14.09c-.22-.66-.35-1.36-.35-2.09s.13-1.43.35-2.09V7.07H2.18C1.43 8.55 1 10.22 1 12s.43 3.45 1.18 4.93l2.85-2.22.81-.62z"/>
                    <path d="M12 5.38c1.62 0 3.06.56 4.21 1.64l3.15-3.15C17.45 2.09 14.97 1 12 1 7.7 1 3.99 3.47 2.18 7.07l3.66 2.84c.87-2.6 3.3-4.53 6.16-4.53z"/>
                  </svg>
                  Google Gemini AI
                </div>
                <div className="flex items-center gap-2 text-sm font-medium text-muted-foreground">
                  <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 24 24">
                    <path d="M12 2L2 7l10 5 10-5-10-5zM2 17l10 5 10-5M2 12l10 5 10-5"/>
                  </svg>
                  Next.js 14
                </div>
                <div className="flex items-center gap-2 text-sm font-medium text-muted-foreground">
                  <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 24 24">
                    <path d="M12 22s8-4 8-10V5l-8-3-8 3v7c0 6 8 10 8 10z"/>
                  </svg>
                  Seguridad Enterprise
                </div>
              </div>
            </div>
          </div>
        </main>

        {/* Footer */}
        <footer className="py-6 px-8 border-t border-border/50">
          <div className="container mx-auto text-center text-sm text-muted-foreground">
            © 2025 Smart Flow · Demo MVP · Proof of Concept para Board de Directores
          </div>
        </footer>
      </div>
    </div>
  );
}
