'use client';

import { useState } from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogFooter } from '@/components/ui/dialog';
import { ConfettiSuccess } from '@/components/shared/ConfettiSuccess';
import { mockDocuments } from '@/data/mock-clients';

export default function BovedaPage() {
  const [showReuseModal, setShowReuseModal] = useState(false);
  const [selectedDoc, setSelectedDoc] = useState<typeof mockDocuments[0] | null>(null);
  const [showConfetti, setShowConfetti] = useState(false);
  const [reusedDocs, setReusedDocs] = useState<string[]>([]);

  const handleDocumentClick = (doc: typeof mockDocuments[0]) => {
    if (doc.status === 'pending' && doc.reuseAvailable && doc.validUntil) {
      setSelectedDoc(doc);
      setShowReuseModal(true);
    }
  };

  const handleReuse = () => {
    if (selectedDoc) {
      setReusedDocs([...reusedDocs, selectedDoc.id]);
      setShowReuseModal(false);
      setShowConfetti(true);
      setTimeout(() => setShowConfetti(false), 3000);
    }
  };

  const formatDate = (dateStr: string) => {
    return new Date(dateStr).toLocaleDateString('es-CL', {
      day: 'numeric',
      month: 'short',
      year: 'numeric'
    });
  };

  const isExpired = (dateStr?: string) => {
    if (!dateStr) return false;
    return new Date(dateStr) < new Date();
  };

  return (
    <div className="container mx-auto px-4 py-8 max-w-4xl">
      <ConfettiSuccess trigger={showConfetti} />
      
      {/* Header */}
      <div className="mb-8">
        <h1 className="text-xl font-semibold text-foreground mb-1">
          Bóveda Documental
        </h1>
        <p className="text-sm text-muted-foreground">
          Gestiona y reutiliza tus documentos vigentes
        </p>
      </div>

      {/* Info Banner */}
      <div className="bg-blue-50 border border-blue-100 rounded-lg p-4 mb-6">
        <p className="text-sm text-blue-800">
          💡 Los documentos con el indicador <span className="font-medium text-primary">Reutilizable</span> pueden recuperarse de tu historial si aún están vigentes.
        </p>
      </div>

      {/* Document List */}
      <Card className="border-border">
        <CardHeader className="pb-2">
          <CardTitle className="text-sm font-medium text-muted-foreground">
            Todos los documentos
          </CardTitle>
        </CardHeader>
        <CardContent className="pt-0">
          <div className="divide-y divide-border">
            {mockDocuments.map((doc) => {
              const isReused = reusedDocs.includes(doc.id);
              const docStatus = isReused ? 'validated' : doc.status;
              const canReuse = doc.reuseAvailable && doc.status === 'pending' && !isReused && doc.validUntil && !isExpired(doc.validUntil);
              
              return (
                <div 
                  key={doc.id} 
                  className={`flex items-center justify-between py-4 ${canReuse ? 'cursor-pointer hover:bg-slate-50 -mx-4 px-4 rounded-lg' : ''}`}
                  onClick={() => canReuse && handleDocumentClick(doc)}
                >
                  <div className="flex-1">
                    <div className="flex items-center gap-2">
                      <p className="text-sm font-medium text-foreground">{doc.name}</p>
                      {canReuse && (
                        <span className="text-xs text-primary bg-primary/10 px-2 py-0.5 rounded-full">
                          Reutilizable
                        </span>
                      )}
                    </div>
                    <p className="text-xs text-muted-foreground">{doc.type}</p>
                    {doc.validUntil && (
                      <p className={`text-xs mt-0.5 ${isExpired(doc.validUntil) ? 'text-red-500' : 'text-muted-foreground'}`}>
                        Vigente hasta: {formatDate(doc.validUntil)}
                        {isExpired(doc.validUntil) && ' (Vencido)'}
                      </p>
                    )}
                  </div>
                  <div className="flex items-center gap-2">
                    {(docStatus === 'validated' || isReused) && (
                      <>
                        <span className="w-2 h-2 rounded-full bg-green-500" />
                        <span className="text-xs text-green-600">
                          {isReused ? 'Reutilizado' : 'Verificado'}
                        </span>
                      </>
                    )}
                    {docStatus === 'pending' && !isReused && (
                      <>
                        <span className="w-2 h-2 rounded-full bg-amber-500" />
                        <span className="text-xs text-amber-600">Pendiente</span>
                      </>
                    )}
                    {docStatus === 'uploaded' && (
                      <>
                        <span className="w-2 h-2 rounded-full bg-blue-500" />
                        <span className="text-xs text-blue-600">Subido</span>
                      </>
                    )}
                  </div>
                </div>
              );
            })}
          </div>
        </CardContent>
      </Card>

      {/* Reuse Modal */}
      <Dialog open={showReuseModal} onOpenChange={setShowReuseModal}>
        <DialogContent className="sm:max-w-md">
          <DialogHeader>
            <DialogTitle className="text-base">Documento disponible en historial</DialogTitle>
          </DialogHeader>
          {selectedDoc && (
            <div className="py-4 space-y-3">
              <div className="bg-slate-50 rounded-lg p-4">
                <p className="font-medium text-sm">{selectedDoc.name}</p>
                <div className="text-xs text-muted-foreground mt-2 space-y-1">
                  {selectedDoc.reuseFromDate && (
                    <p>Subido: {formatDate(selectedDoc.reuseFromDate)}</p>
                  )}
                  {selectedDoc.validUntil && (
                    <p className="text-green-600">
                      Vigente hasta: {formatDate(selectedDoc.validUntil)}
                    </p>
                  )}
                </div>
              </div>
              <p className="text-sm text-muted-foreground">
                ¿Deseas reutilizar este documento para tu trámite actual?
              </p>
            </div>
          )}
          <DialogFooter className="gap-2">
            <Button variant="outline" onClick={() => setShowReuseModal(false)}>
              Cancelar
            </Button>
            <Button onClick={handleReuse}>
              Sí, reutilizar
            </Button>
          </DialogFooter>
        </DialogContent>
      </Dialog>
    </div>
  );
}
