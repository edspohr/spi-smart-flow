'use client';

import { useState } from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { SignatureCanvas } from '@/components/shared/SignatureCanvas';
import { ConfettiSuccess } from '@/components/shared/ConfettiSuccess';
import { mockClient } from '@/data/mock-clients';

type DocumentState = 'preview' | 'signing' | 'signed';

export default function TemplatesPage() {
  const [docState, setDocState] = useState<DocumentState>('preview');
  const [showConfetti, setShowConfetti] = useState(false);

  const handleSign = (signatureData: string) => {
    console.log('Signature captured:', signatureData.substring(0, 50) + '...');
    setDocState('signed');
    setShowConfetti(true);
    setTimeout(() => setShowConfetti(false), 3000);
  };

  const handleReset = () => {
    setDocState('preview');
  };

  return (
    <div className="container mx-auto px-4 py-8">
      {showConfetti && <ConfettiSuccess />}

      <div className="mb-8 animate-slide-up">
        <h1 className="text-3xl font-bold mb-2 flex items-center gap-3">
          <span className="text-4xl">📝</span>
          Generador de Documentos
        </h1>
        <p className="text-muted-foreground">
          Genera y firma documentos legales directamente en la plataforma. Tus datos ya están pre-completados.
        </p>
      </div>

      <div className="grid lg:grid-cols-2 gap-8">
        {/* Document Preview */}
        <Card className="glass-card animate-slide-up" style={{ animationDelay: '0.1s' }}>
          <CardHeader>
            <CardTitle className="flex items-center justify-between">
              <span className="flex items-center gap-2">
                <span className="text-xl">📄</span>
                Poder Simple
              </span>
              <Badge 
                className={
                  docState === 'signed' 
                    ? 'bg-spi-accent' 
                    : docState === 'signing' 
                    ? 'bg-spi-warning' 
                    : 'bg-muted'
                }
              >
                {docState === 'signed' && '✓ Firmado'}
                {docState === 'signing' && '⏳ Esperando firma'}
                {docState === 'preview' && 'Borrador'}
              </Badge>
            </CardTitle>
          </CardHeader>
          <CardContent>
            {/* Fake Legal Document */}
            <div className="bg-gradient-to-b from-amber-50 to-amber-100 text-gray-800 p-6 rounded-lg shadow-inner font-serif text-sm leading-relaxed">
              <div className="text-center mb-6">
                <h2 className="text-xl font-bold text-gray-900 mb-1">PODER SIMPLE</h2>
                <p className="text-xs text-gray-600">Documento generado automáticamente por SPI Smart Flow</p>
              </div>

              <p className="mb-4 text-justify">
                En Santiago, a {new Date().toLocaleDateString('es-CL', { day: 'numeric', month: 'long', year: 'numeric' })}, 
                ante mí comparece:
              </p>

              <div className="bg-white/50 rounded p-3 mb-4 border-l-4 border-spi-primary">
                <p><strong>Nombre:</strong> {mockClient.name}</p>
                <p><strong>RUT:</strong> {mockClient.rut}</p>
                <p><strong>Domicilio:</strong> {mockClient.address}</p>
                <p><strong>En representación de:</strong> {mockClient.company}</p>
              </div>

              <p className="mb-4 text-justify">
                Quien por el presente instrumento viene a otorgar <strong>PODER SIMPLE</strong> a 
                <strong> SPI Servicios Profesionales Integrales SpA</strong>, RUT 76.XXX.XXX-X, 
                para que en su nombre y representación pueda realizar las siguientes gestiones:
              </p>

              <ul className="list-disc list-inside mb-4 pl-4 space-y-1">
                <li>Gestionar y tramitar documentos ante entidades públicas y privadas</li>
                <li>Solicitar y retirar certificados, antecedentes y documentación</li>
                <li>Firmar en su representación los documentos que sean necesarios</li>
                <li>Realizar todas las gestiones administrativas pertinentes</li>
              </ul>

              <p className="mb-6 text-justify">
                El presente poder tendrá vigencia por el plazo de <strong>90 días</strong> desde la fecha de firma, 
                pudiendo ser revocado en cualquier momento mediante comunicación escrita.
              </p>

              {/* Signature Area */}
              <div className="border-t-2 border-gray-400 pt-4 mt-8">
                <div className="flex justify-between items-end">
                  <div className="text-center">
                    <div className="w-48 h-16 border-b-2 border-gray-400 flex items-end justify-center pb-2">
                      {docState === 'signed' && (
                        <span className="text-spi-primary font-script text-2xl italic">
                          {mockClient.name.split(' ')[0]} {mockClient.name.split(' ')[1]}
                        </span>
                      )}
                    </div>
                    <p className="text-xs mt-1">{mockClient.name}</p>
                    <p className="text-xs text-gray-500">{mockClient.rut}</p>
                  </div>
                  <div className="text-center">
                    <div className="w-32 h-16 border-2 border-dashed border-gray-400 flex items-center justify-center">
                      {docState === 'signed' ? (
                        <span className="text-spi-accent text-xs font-bold">FIRMADO</span>
                      ) : (
                        <span className="text-gray-400 text-xs">Sello SPI</span>
                      )}
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </CardContent>
        </Card>

        {/* Action Panel */}
        <div className="space-y-6">
          {/* Status Card */}
          <Card className={`glass-card animate-slide-up ${docState === 'signed' ? 'ring-2 ring-spi-accent' : ''}`} style={{ animationDelay: '0.2s' }}>
            <CardContent className="py-6">
              {docState === 'preview' && (
                <div className="text-center space-y-4">
                  <div className="w-16 h-16 mx-auto rounded-full bg-spi-primary/20 flex items-center justify-center">
                    <span className="text-3xl">📝</span>
                  </div>
                  <div>
                    <h3 className="text-lg font-semibold mb-1">Documento Listo para Firmar</h3>
                    <p className="text-sm text-muted-foreground">
                      Revisa el documento y procede a firmarlo digitalmente
                    </p>
                  </div>
                  <Button 
                    className="w-full gradient-primary hover:opacity-90"
                    onClick={() => setDocState('signing')}
                  >
                    Generar y Firmar
                  </Button>
                </div>
              )}

              {docState === 'signing' && (
                <div className="space-y-4">
                  <div className="text-center">
                    <h3 className="text-lg font-semibold mb-1">Firma Digital</h3>
                    <p className="text-sm text-muted-foreground">
                      Dibuja tu firma en el área de abajo
                    </p>
                  </div>
                  <SignatureCanvas 
                    onSign={handleSign}
                    onClear={() => {}}
                  />
                </div>
              )}

              {docState === 'signed' && (
                <div className="text-center space-y-4">
                  <div className="w-20 h-20 mx-auto rounded-full gradient-success flex items-center justify-center animate-check-bounce">
                    <span className="text-4xl">✓</span>
                  </div>
                  <div>
                    <h3 className="text-lg font-semibold text-spi-accent mb-1">
                      ¡Documento Firmado Exitosamente!
                    </h3>
                    <p className="text-sm text-muted-foreground">
                      El documento ha sido enviado automáticamente a SPI
                    </p>
                  </div>
                  <div className="bg-muted/50 rounded-lg p-4 text-left">
                    <p className="text-sm"><strong>Fecha de firma:</strong> {new Date().toLocaleString('es-CL')}</p>
                    <p className="text-sm"><strong>Estado:</strong> <span className="text-spi-accent">Enviado</span></p>
                    <p className="text-sm"><strong>Referencia:</strong> POD-{Date.now().toString().slice(-8)}</p>
                  </div>
                  <Button 
                    variant="outline"
                    className="w-full"
                    onClick={handleReset}
                  >
                    Generar Otro Documento
                  </Button>
                </div>
              )}
            </CardContent>
          </Card>

          {/* Info Card */}
          <Card className="glass-card bg-spi-primary/10 border-spi-primary/30 animate-slide-up" style={{ animationDelay: '0.3s' }}>
            <CardContent className="py-4">
              <div className="flex items-start gap-3">
                <span className="text-2xl">🔒</span>
                <div>
                  <h4 className="font-medium mb-1">Firma Digital Segura</h4>
                  <p className="text-sm text-muted-foreground">
                    Tu firma digital tiene validez legal según la Ley 19.799. 
                    El documento queda registrado con timestamp y huella digital única.
                  </p>
                </div>
              </div>
            </CardContent>
          </Card>
        </div>
      </div>
    </div>
  );
}
