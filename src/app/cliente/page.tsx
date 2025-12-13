'use client';

import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Progress } from '@/components/ui/progress';
import { TimelineStepper } from '@/components/shared/TimelineStepper';
import { mockClient, mockOTA, mockDocuments, calculateDiscount } from '@/data/mock-clients';
import Link from 'next/link';

export default function ClienteDashboard() {
  const completedDocs = mockDocuments.filter(d => d.status === 'validated' || d.status === 'uploaded').length;
  const totalDocs = mockDocuments.filter(d => d.required).length;
  const progressPercentage = Math.round((completedDocs / totalDocs) * 100);
  const discount = calculateDiscount(mockOTA);

  return (
    <div className="container mx-auto px-4 py-8">
      {/* Welcome Section */}
      <div className="mb-8 animate-slide-up">
        <h1 className="text-3xl font-bold mb-2">
          Bienvenido, {mockClient.name.split(' ')[0]} 👋
        </h1>
        <p className="text-muted-foreground">
          Tu servicio por <span className="text-spi-accent font-semibold">${mockOTA.amount.toLocaleString()} USD</span> está en proceso. 
          Completa tu documentación para asegurar tu descuento.
        </p>
      </div>

      {/* Timeline Stepper */}
      <Card className="mb-8 glass-card animate-slide-up" style={{ animationDelay: '0.1s' }}>
        <CardHeader>
          <CardTitle className="flex items-center gap-2">
            <span>📈</span> Estado de tu Trámite
          </CardTitle>
        </CardHeader>
        <CardContent>
          <TimelineStepper />
        </CardContent>
      </Card>

      {/* Stats Grid */}
      <div className="grid md:grid-cols-3 gap-6 mb-8">
        {/* Progress Card */}
        <Card className="glass-card animate-slide-up" style={{ animationDelay: '0.2s' }}>
          <CardHeader>
            <CardTitle className="text-lg flex items-center gap-2">
              <span className="text-2xl">📋</span>
              Documentación
            </CardTitle>
          </CardHeader>
          <CardContent>
            <div className="space-y-3">
              <div className="flex justify-between text-sm">
                <span className="text-muted-foreground">Completado</span>
                <span className="font-medium">{completedDocs} de {totalDocs}</span>
              </div>
              <Progress value={progressPercentage} className="h-3" />
              <p className="text-xs text-muted-foreground">
                {progressPercentage < 100 
                  ? `Faltan ${totalDocs - completedDocs} documentos por completar`
                  : '¡Documentación completa!'}
              </p>
            </div>
          </CardContent>
        </Card>

        {/* Savings Card */}
        <Card className="glass-card gradient-success text-white animate-slide-up" style={{ animationDelay: '0.3s' }}>
          <CardHeader>
            <CardTitle className="text-lg flex items-center gap-2 text-white">
              <span className="text-2xl">💰</span>
              Tu Ahorro Potencial
            </CardTitle>
          </CardHeader>
          <CardContent>
            <p className="text-4xl font-bold mb-2">${discount.toLocaleString()} USD</p>
            <p className="text-sm text-white/80">
              {mockOTA.discountPercentage}% de descuento por pronto pago
            </p>
          </CardContent>
        </Card>

        {/* Quick Actions Card */}
        <Card className="glass-card animate-slide-up" style={{ animationDelay: '0.4s' }}>
          <CardHeader>
            <CardTitle className="text-lg flex items-center gap-2">
              <span className="text-2xl">⚡</span>
              Acciones Rápidas
            </CardTitle>
          </CardHeader>
          <CardContent className="space-y-3">
            <Link 
              href="/cliente/boveda"
              className="block w-full py-3 px-4 bg-muted hover:bg-muted/80 rounded-lg text-sm font-medium transition-all hover:translate-x-1"
            >
              🗄️ Subir documentos →
            </Link>
            <Link 
              href="/cliente/templates"
              className="block w-full py-3 px-4 bg-muted hover:bg-muted/80 rounded-lg text-sm font-medium transition-all hover:translate-x-1"
            >
              📝 Generar Poder Simple →
            </Link>
            <Link 
              href="/cliente/verificar"
              className="block w-full py-3 px-4 bg-muted hover:bg-muted/80 rounded-lg text-sm font-medium transition-all hover:translate-x-1"
            >
              🤖 Validar cédula con IA →
            </Link>
          </CardContent>
        </Card>
      </div>

      {/* Documents Preview */}
      <Card className="glass-card animate-slide-up" style={{ animationDelay: '0.5s' }}>
        <CardHeader>
          <CardTitle className="flex items-center justify-between">
            <span className="flex items-center gap-2">
              <span className="text-2xl">📑</span>
              Documentos Requeridos
            </span>
            <Link 
              href="/cliente/boveda"
              className="text-sm text-spi-primary hover:underline font-normal"
            >
              Ver todos →
            </Link>
          </CardTitle>
        </CardHeader>
        <CardContent>
          <div className="space-y-3">
            {mockDocuments.filter(d => d.required).map((doc, index) => (
              <div 
                key={doc.id}
                className="flex items-center justify-between py-3 px-4 bg-muted/50 rounded-lg animate-slide-up"
                style={{ animationDelay: `${0.6 + index * 0.1}s` }}
              >
                <div className="flex items-center gap-3">
                  <div className={`w-8 h-8 rounded-full flex items-center justify-center text-sm
                    ${doc.status === 'validated' ? 'bg-spi-accent text-white' : ''}
                    ${doc.status === 'uploaded' ? 'bg-spi-warning text-white' : ''}
                    ${doc.status === 'pending' ? 'bg-muted text-muted-foreground' : ''}
                    ${doc.status === 'rejected' ? 'bg-spi-danger text-white' : ''}
                  `}>
                    {doc.status === 'validated' && '✓'}
                    {doc.status === 'uploaded' && '⏳'}
                    {doc.status === 'pending' && '○'}
                    {doc.status === 'rejected' && '✗'}
                  </div>
                  <div>
                    <p className="font-medium text-sm">{doc.name}</p>
                    {doc.reuseAvailable && doc.status === 'pending' && (
                      <p className="text-xs text-spi-accent">📎 Documento disponible para reutilizar</p>
                    )}
                  </div>
                </div>
                <span className={`text-xs font-medium px-2 py-1 rounded-full
                  ${doc.status === 'validated' ? 'bg-spi-accent/20 text-spi-accent' : ''}
                  ${doc.status === 'uploaded' ? 'bg-spi-warning/20 text-spi-warning' : ''}
                  ${doc.status === 'pending' ? 'bg-muted text-muted-foreground' : ''}
                  ${doc.status === 'rejected' ? 'bg-spi-danger/20 text-spi-danger' : ''}
                `}>
                  {doc.status === 'validated' && 'Validado'}
                  {doc.status === 'uploaded' && 'En revisión'}
                  {doc.status === 'pending' && 'Pendiente'}
                  {doc.status === 'rejected' && 'Rechazado'}
                </span>
              </div>
            ))}
          </div>
        </CardContent>
      </Card>
    </div>
  );
}
