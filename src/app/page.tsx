import Link from 'next/link';
import Image from 'next/image';

export default function Home() {
  return (
    <div className="min-h-screen bg-white flex flex-col">
      {/* Main Content */}
      <main className="flex-1 flex items-center justify-center px-6">
        <div className="w-full max-w-md mx-auto text-center">
          {/* Logo */}
          <div className="mb-8 animate-fade-in">
            <Image 
              src="/logo.png" 
              alt="Smart Flow" 
              width={80} 
              height={80} 
              className="mx-auto mb-6"
              priority
            />
            <h1 className="text-2xl font-semibold text-foreground mb-2">
              Smart Flow
            </h1>
            <p className="text-muted-foreground text-sm">
              Documentación Inteligente
            </p>
          </div>

          {/* Navigation Buttons */}
          <div className="space-y-3 animate-slide-up">
            <Link 
              href="/cliente"
              className="block w-full py-3 px-4 bg-primary text-white rounded-lg font-medium text-sm hover:opacity-90 transition-opacity"
            >
              Portal Cliente
            </Link>
            
            <Link 
              href="/admin"
              className="block w-full py-3 px-4 bg-secondary text-foreground border border-border rounded-lg font-medium text-sm hover:bg-muted transition-colors"
            >
              Torre de Control
            </Link>
          </div>
        </div>
      </main>

      {/* Footer */}
      <footer className="py-6 text-center">
        <p className="text-xs text-muted-foreground">
          © 2025 Smart Flow
        </p>
      </footer>
    </div>
  );
}
