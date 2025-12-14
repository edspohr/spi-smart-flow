'use client';

import { useState } from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { SignatureCanvas } from '@/components/shared/SignatureCanvas';
import { ConfettiSuccess } from '@/components/shared/ConfettiSuccess';
import { mockClient } from '@/data/mock-clients';

export default function TemplatesPage() {
  const [isSigned, setIsSigned] = useState(false);
  const [showConfetti, setShowConfetti] = useState(false);
  const [showSignature, setShowSignature] = useState(false);

  const handleSign = () => {
    setIsSigned(true);
    setShowConfetti(true);
    setShowSignature(false);
    setTimeout(() => setShowConfetti(false), 3000);
  };

  const today = new Date().toLocaleDateString('es-CL', {
    day: 'numeric',
    month: 'long',
    year: 'numeric'
  });

  return (
    <div className="container mx-auto px-4 py-8 max-w-4xl">
      <ConfettiSuccess trigger={showConfetti} />
      
      {/* Header */}
      <div className="mb-8">
        <h1 className="text-xl font-semibold text-foreground mb-1">
          Generar Documentos
        </h1>
        <p className="text-sm text-muted-foreground">
          Genera y firma documentos digitalmente
        </p>
      </div>

      {/* Document Preview */}
      <Card className="border-border mb-6">
        <CardHeader className="pb-2">
          <CardTitle className="text-sm font-medium text-muted-foreground flex items-center justify-between">
            <span>Poder Simple</span>
            {isSigned && (
              <span className="text-xs text-green-600 font-normal">Firmado ✓</span>
            )}
          </CardTitle>
        </CardHeader>
        <CardContent>
          <div className="bg-slate-50 rounded-lg p-6 text-sm leading-relaxed">
            <p className="text-center font-medium mb-4">PODER SIMPLE</p>
            
            <p className="mb-4">
              En Santiago, a {today}, yo, <strong>{mockClient.name}</strong>, 
              RUT <strong>{mockClient.rut}</strong>, domiciliado en {mockClient.address}, 
              otorgo poder simple a Smart Flow SpA para representarme en los trámites 
              relacionados con el servicio contratado.
            </p>
            
            <p className="mb-6">
              Este poder faculta al apoderado para presentar y retirar documentos, 
              firmar formularios y realizar todas las gestiones necesarias.
            </p>
            
            <div className="border-t border-slate-200 pt-4 text-center">
              {isSigned ? (
                <div>
                  <p className="text-xs text-muted-foreground mb-1">Firmado digitalmente por</p>
                  <p className="font-medium">{mockClient.name}</p>
                  <p className="text-xs text-muted-foreground">{today}</p>
                </div>
              ) : (
                <p className="text-xs text-muted-foreground">
                  Pendiente de firma
                </p>
              )}
            </div>
          </div>
        </CardContent>
      </Card>

      {/* Sign Button or Signature Canvas */}
      {!isSigned && (
        <>
          {!showSignature ? (
            <Button 
              className="w-full"
              onClick={() => setShowSignature(true)}
            >
              Firmar documento
            </Button>
          ) : (
            <Card className="border-border">
              <CardHeader className="pb-2">
                <CardTitle className="text-sm font-medium text-muted-foreground">
                  Firma aquí
                </CardTitle>
              </CardHeader>
              <CardContent>
                <SignatureCanvas onSign={handleSign} />
              </CardContent>
            </Card>
          )}
        </>
      )}

      {isSigned && (
        <div className="text-center py-4">
          <p className="text-sm text-green-600 font-medium">
            Documento firmado y enviado correctamente
          </p>
        </div>
      )}
    </div>
  );
}
