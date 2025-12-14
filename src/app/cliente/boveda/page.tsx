'use client';

import { useState } from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogFooter } from '@/components/ui/dialog';
import { ConfettiSuccess } from '@/components/shared/ConfettiSuccess';
import { mockDocuments } from '@/data/mock-clients';

export default function BovedaPage() {
  const [showReuseModal, setShowReuseModal] = useState(false);
  const [selectedDoc, setSelectedDoc] = useState<string | null>(null);
  const [showConfetti, setShowConfetti] = useState(false);
  const [reusedDocs, setReusedDocs] = useState<string[]>([]);

  const handleDocumentClick = (docId: string) => {
    const doc = mockDocuments.find(d => d.id === docId);
    if (doc?.status === 'pending' && doc.reuseAvailable) {
      setSelectedDoc(docId);
      setShowReuseModal(true);
    }
  };

  const handleReuse = () => {
    if (selectedDoc) {
      setReusedDocs([...reusedDocs, selectedDoc]);
      setShowReuseModal(false);
      setShowConfetti(true);
      setTimeout(() => setShowConfetti(false), 3000);
    }
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
          Gestiona y reutiliza tus documentos
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
              const docStatus = isReused ? 'verified' : doc.status;
              
              return (
                <div 
                  key={doc.id} 
                  className={`flex items-center justify-between py-3 ${doc.reuseAvailable && doc.status === 'pending' && !isReused ? 'cursor-pointer hover:bg-slate-50 -mx-4 px-4' : ''}`}
                  onClick={() => handleDocumentClick(doc.id)}
                >
                  <div>
                    <p className="text-sm font-medium text-foreground">{doc.name}</p>
                    <p className="text-xs text-muted-foreground">{doc.type}</p>
                    {doc.reuseAvailable && doc.status === 'pending' && !isReused && (
                      <p className="text-xs text-primary mt-0.5">Disponible en historial</p>
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
            <DialogTitle className="text-base">Documento encontrado</DialogTitle>
          </DialogHeader>
          <p className="text-sm text-muted-foreground py-4">
            Encontramos este documento en tu historial. ¿Deseas reutilizarlo para este trámite?
          </p>
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
