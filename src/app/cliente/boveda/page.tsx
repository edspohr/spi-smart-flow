'use client';

import { useState } from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogDescription } from '@/components/ui/dialog';
import { Badge } from '@/components/ui/badge';
import { ConfettiSuccess } from '@/components/shared/ConfettiSuccess';
import { mockDocuments, mockHistoricalDocuments, Document } from '@/data/mock-clients';

export default function BovedaPage() {
  const [documents, setDocuments] = useState<Document[]>(mockDocuments);
  const [selectedDoc, setSelectedDoc] = useState<Document | null>(null);
  const [showReuseModal, setShowReuseModal] = useState(false);
  const [showConfetti, setShowConfetti] = useState(false);
  const [recentlyCompleted, setRecentlyCompleted] = useState<string | null>(null);

  const handleDocumentClick = (doc: Document) => {
    if (doc.status === 'pending' && doc.reuseAvailable) {
      setSelectedDoc(doc);
      setShowReuseModal(true);
    }
  };

  const handleReuseDocument = () => {
    if (!selectedDoc) return;

    // Animate the completion
    setShowConfetti(true);
    setRecentlyCompleted(selectedDoc.id);

    // Update document status
    setDocuments(docs =>
      docs.map(d =>
        d.id === selectedDoc.id
          ? { ...d, status: 'validated' as const }
          : d
      )
    );

    setShowReuseModal(false);
    setSelectedDoc(null);

    // Hide confetti after animation
    setTimeout(() => setShowConfetti(false), 3000);
    setTimeout(() => setRecentlyCompleted(null), 2000);
  };

  const historicalDoc = selectedDoc?.reuseAvailable
    ? mockHistoricalDocuments.find(h => h.type === selectedDoc.type)
    : null;

  const statusConfig = {
    validated: { label: 'Validado', color: 'bg-spi-accent text-white', icon: '✓' },
    uploaded: { label: 'En revisión', color: 'bg-spi-warning text-white', icon: '⏳' },
    pending: { label: 'Pendiente', color: 'bg-muted text-muted-foreground', icon: '○' },
    rejected: { label: 'Rechazado', color: 'bg-spi-danger text-white', icon: '✗' }
  };

  return (
    <div className="container mx-auto px-4 py-8">
      {showConfetti && <ConfettiSuccess />}

      <div className="mb-8 animate-slide-up">
        <h1 className="text-3xl font-bold mb-2 flex items-center gap-3">
          <span className="text-4xl">🗄️</span>
          Bóveda Inteligente
        </h1>
        <p className="text-muted-foreground">
          Gestiona tus documentos requeridos. Nuestro sistema detecta automáticamente documentos 
          reutilizables de operaciones anteriores.
        </p>
      </div>

      {/* Info Banner */}
      <Card className="mb-8 bg-spi-primary/10 border-spi-primary/30 animate-slide-up" style={{ animationDelay: '0.1s' }}>
        <CardContent className="py-4">
          <div className="flex items-center gap-3">
            <span className="text-2xl">💡</span>
            <p className="text-sm">
              <strong>Tip:</strong> Los documentos marcados con <Badge variant="outline" className="mx-1 text-spi-accent border-spi-accent">📎 Reutilizable</Badge> 
              pueden completarse instantáneamente desde tu historial.
            </p>
          </div>
        </CardContent>
      </Card>

      {/* Documents Grid */}
      <div className="grid md:grid-cols-2 gap-4">
        {documents.map((doc, index) => (
          <Card
            key={doc.id}
            className={`glass-card cursor-pointer transition-all duration-300 hover:scale-[1.02] hover:shadow-xl animate-slide-up
              ${doc.status === 'pending' && doc.reuseAvailable ? 'ring-2 ring-spi-accent/50' : ''}
              ${recentlyCompleted === doc.id ? 'ring-4 ring-spi-accent animate-check-bounce' : ''}
            `}
            style={{ animationDelay: `${0.1 + index * 0.05}s` }}
            onClick={() => handleDocumentClick(doc)}
          >
            <CardContent className="py-6">
              <div className="flex items-start justify-between">
                <div className="flex items-start gap-4">
                  <div
                    className={`w-12 h-12 rounded-xl flex items-center justify-center text-lg font-bold
                      ${statusConfig[doc.status].color}
                      ${recentlyCompleted === doc.id ? 'animate-check-bounce' : ''}
                    `}
                  >
                    {statusConfig[doc.status].icon}
                  </div>
                  <div>
                    <h3 className="font-semibold mb-1">{doc.name}</h3>
                    <div className="flex items-center gap-2">
                      <Badge
                        variant={doc.status === 'validated' ? 'default' : 'outline'}
                        className={doc.status === 'validated' ? 'bg-spi-accent' : ''}
                      >
                        {statusConfig[doc.status].label}
                      </Badge>
                      {doc.required && (
                        <Badge variant="outline" className="text-spi-warning border-spi-warning">
                          Requerido
                        </Badge>
                      )}
                    </div>
                  </div>
                </div>

                {doc.status === 'pending' && doc.reuseAvailable && (
                  <Badge className="bg-spi-accent/20 text-spi-accent border-spi-accent animate-pulse">
                    📎 Reutilizable
                  </Badge>
                )}
              </div>

              {doc.status === 'pending' && doc.reuseAvailable && (
                <div className="mt-4 flex items-center gap-2 text-sm text-spi-accent">
                  <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 7l5 5m0 0l-5 5m5-5H6" />
                  </svg>
                  <span>Haz clic para revisar documento disponible</span>
                </div>
              )}

              {doc.status === 'pending' && !doc.reuseAvailable && (
                <div className="mt-4">
                  <Button variant="outline" className="w-full" disabled>
                    Subir documento
                  </Button>
                </div>
              )}
            </CardContent>
          </Card>
        ))}
      </div>

      {/* Reuse Modal */}
      <Dialog open={showReuseModal} onOpenChange={setShowReuseModal}>
        <DialogContent className="glass-card border-spi-accent/30">
          <DialogHeader>
            <DialogTitle className="flex items-center gap-2 text-xl">
              <span className="text-2xl">🔍</span>
              Documento Detectado
            </DialogTitle>
            <DialogDescription className="text-muted-foreground">
              Encontramos un documento válido en tu historial
            </DialogDescription>
          </DialogHeader>

          {historicalDoc && (
            <div className="space-y-4">
              <div className="bg-spi-accent/10 border border-spi-accent/30 rounded-lg p-4">
                <div className="flex items-start gap-3">
                  <div className="w-10 h-10 rounded-lg bg-spi-accent/20 flex items-center justify-center">
                    📄
                  </div>
                  <div>
                    <p className="font-medium">{historicalDoc.name}</p>
                    <p className="text-sm text-muted-foreground">
                      Subido: {historicalDoc.uploadDate} · Vigente hasta: {historicalDoc.validUntil}
                    </p>
                  </div>
                </div>
              </div>

              <div className="bg-muted/50 rounded-lg p-4 text-center">
                <p className="text-sm text-muted-foreground mb-2">
                  ¿Deseas usar este documento para completar el requerimiento?
                </p>
                <p className="text-lg font-semibold text-spi-accent">
                  "{selectedDoc?.name}"
                </p>
              </div>

              <div className="flex gap-3">
                <Button
                  variant="outline"
                  className="flex-1"
                  onClick={() => setShowReuseModal(false)}
                >
                  No, subir nuevo
                </Button>
                <Button
                  className="flex-1 gradient-success hover:opacity-90"
                  onClick={handleReuseDocument}
                >
                  ✓ Sí, reutilizar
                </Button>
              </div>
            </div>
          )}
        </DialogContent>
      </Dialog>
    </div>
  );
}
