'use client';

import { useState, useRef } from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Badge } from '@/components/ui/badge';
import { Skeleton } from '@/components/ui/skeleton';
import { ConfettiSuccess } from '@/components/shared/ConfettiSuccess';

interface AIResult {
  success: boolean;
  name?: string;
  expirationDate?: string;
  documentNumber?: string;
  error?: string;
}

type VerificationState = 'idle' | 'uploading' | 'analyzing' | 'success' | 'error';

export default function VerificarPage() {
  const [state, setState] = useState<VerificationState>('idle');
  const [result, setResult] = useState<AIResult | null>(null);
  const [fileName, setFileName] = useState<string>('');
  const [showConfetti, setShowConfetti] = useState(false);
  const fileInputRef = useRef<HTMLInputElement>(null);

  const handleFileSelect = async (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (!file) return;

    setFileName(file.name);
    setState('uploading');

    // Simulate upload delay
    await new Promise(r => setTimeout(r, 800));
    setState('analyzing');

    // Call the API
    const formData = new FormData();
    formData.append('file', file);

    try {
      const response = await fetch('/api/analyze-document', {
        method: 'POST',
        body: formData
      });

      const data = await response.json();

      if (data.success) {
        setState('success');
        setResult(data);
        setShowConfetti(true);
        setTimeout(() => setShowConfetti(false), 3000);
      } else {
        setState('error');
        setResult(data);
      }
    } catch (error) {
      setState('error');
      setResult({ 
        success: false, 
        error: 'Error de conexión. Por favor intenta de nuevo.' 
      });
    }
  };

  const handleReset = () => {
    setState('idle');
    setResult(null);
    setFileName('');
    if (fileInputRef.current) {
      fileInputRef.current.value = '';
    }
  };

  return (
    <div className="container mx-auto px-4 py-8">
      {showConfetti && <ConfettiSuccess />}

      <div className="mb-8 animate-slide-up">
        <h1 className="text-3xl font-bold mb-2 flex items-center gap-3">
          <span className="text-4xl">🤖</span>
          Validación con Inteligencia Artificial
        </h1>
        <p className="text-muted-foreground">
          Sube tu documento de identidad y nuestra IA extraerá automáticamente los datos clave.
        </p>
      </div>

      <div className="grid lg:grid-cols-2 gap-8">
        {/* Upload Section */}
        <Card className="glass-card animate-slide-up" style={{ animationDelay: '0.1s' }}>
          <CardHeader>
            <CardTitle className="flex items-center gap-2">
              <span className="text-xl">📤</span>
              Subir Documento
            </CardTitle>
          </CardHeader>
          <CardContent>
            <div className="space-y-6">
              {/* File Upload Area */}
              <div
                className={`border-2 border-dashed rounded-xl p-8 text-center transition-all cursor-pointer
                  ${state === 'idle' ? 'border-muted-foreground/30 hover:border-spi-primary hover:bg-spi-primary/5' : ''}
                  ${state === 'uploading' || state === 'analyzing' ? 'border-spi-warning bg-spi-warning/5' : ''}
                  ${state === 'success' ? 'border-spi-accent bg-spi-accent/5' : ''}
                  ${state === 'error' ? 'border-spi-danger bg-spi-danger/5' : ''}
                `}
                onClick={() => state === 'idle' && fileInputRef.current?.click()}
              >
                <input
                  ref={fileInputRef}
                  type="file"
                  accept="image/*,.pdf"
                  className="hidden"
                  onChange={handleFileSelect}
                  disabled={state !== 'idle'}
                />

                {state === 'idle' && (
                  <>
                    <div className="w-16 h-16 mx-auto mb-4 rounded-full bg-muted flex items-center justify-center">
                      <span className="text-3xl">🪪</span>
                    </div>
                    <p className="font-medium mb-2">Arrastra tu cédula aquí</p>
                    <p className="text-sm text-muted-foreground mb-4">
                      o haz clic para seleccionar
                    </p>
                    <p className="text-xs text-muted-foreground">
                      Formatos: JPG, PNG, PDF · Máximo 10MB
                    </p>
                  </>
                )}

                {(state === 'uploading' || state === 'analyzing') && (
                  <>
                    <div className="w-16 h-16 mx-auto mb-4 rounded-full gradient-warning flex items-center justify-center animate-pulse">
                      <span className="text-3xl">🔄</span>
                    </div>
                    <p className="font-medium mb-2">
                      {state === 'uploading' ? 'Subiendo documento...' : 'Analizando con IA...'}
                    </p>
                    <p className="text-sm text-spi-warning animate-shimmer">
                      {state === 'analyzing' && 'Validando con Inteligencia Artificial...'}
                    </p>
                    <p className="text-xs text-muted-foreground mt-2">{fileName}</p>
                  </>
                )}

                {state === 'success' && (
                  <>
                    <div className="w-16 h-16 mx-auto mb-4 rounded-full gradient-success flex items-center justify-center animate-check-bounce">
                      <span className="text-3xl text-white">✓</span>
                    </div>
                    <p className="font-medium text-spi-accent mb-2">
                      ¡Documento Validado por IA!
                    </p>
                    <p className="text-xs text-muted-foreground">{fileName}</p>
                  </>
                )}

                {state === 'error' && (
                  <>
                    <div className="w-16 h-16 mx-auto mb-4 rounded-full gradient-danger flex items-center justify-center">
                      <span className="text-3xl text-white">✗</span>
                    </div>
                    <p className="font-medium text-spi-danger mb-2">
                      No se pudo validar
                    </p>
                    <p className="text-sm text-muted-foreground">{result?.error}</p>
                  </>
                )}
              </div>

              {(state === 'success' || state === 'error') && (
                <Button variant="outline" className="w-full" onClick={handleReset}>
                  Subir otro documento
                </Button>
              )}
            </div>
          </CardContent>
        </Card>

        {/* Results Section */}
        <Card className="glass-card animate-slide-up" style={{ animationDelay: '0.2s' }}>
          <CardHeader>
            <CardTitle className="flex items-center justify-between">
              <span className="flex items-center gap-2">
                <span className="text-xl">📋</span>
                Datos Extraídos
              </span>
              {state === 'success' && (
                <Badge className="bg-spi-accent">
                  Validado por IA
                </Badge>
              )}
            </CardTitle>
          </CardHeader>
          <CardContent>
            {state === 'idle' && (
              <div className="text-center py-12 text-muted-foreground">
                <span className="text-4xl mb-4 block">🔍</span>
                <p>Sube un documento para ver los datos extraídos</p>
              </div>
            )}

            {(state === 'uploading' || state === 'analyzing') && (
              <div className="space-y-4">
                <div>
                  <label className="text-sm text-muted-foreground mb-2 block">Nombre Completo</label>
                  <Skeleton className="h-10 w-full animate-shimmer" />
                </div>
                <div>
                  <label className="text-sm text-muted-foreground mb-2 block">Número de Documento</label>
                  <Skeleton className="h-10 w-full animate-shimmer" />
                </div>
                <div>
                  <label className="text-sm text-muted-foreground mb-2 block">Fecha de Vencimiento</label>
                  <Skeleton className="h-10 w-full animate-shimmer" />
                </div>
              </div>
            )}

            {state === 'success' && result && (
              <div className="space-y-4">
                <div>
                  <label className="text-sm text-muted-foreground mb-2 block">Nombre Completo</label>
                  <Input 
                    value={result.name || ''} 
                    readOnly 
                    className="bg-spi-accent/10 border-spi-accent/30"
                  />
                </div>
                <div>
                  <label className="text-sm text-muted-foreground mb-2 block">Número de Documento</label>
                  <Input 
                    value={result.documentNumber || ''} 
                    readOnly 
                    className="bg-spi-accent/10 border-spi-accent/30"
                  />
                </div>
                <div>
                  <label className="text-sm text-muted-foreground mb-2 block">Fecha de Vencimiento</label>
                  <Input 
                    value={result.expirationDate || ''} 
                    readOnly 
                    className="bg-spi-accent/10 border-spi-accent/30"
                  />
                </div>

                <div className="bg-spi-accent/10 border border-spi-accent/30 rounded-lg p-4 mt-6">
                  <div className="flex items-center gap-2 text-spi-accent">
                    <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z" />
                    </svg>
                    <span className="font-medium">Verificación Completada</span>
                  </div>
                  <p className="text-sm text-muted-foreground mt-2">
                    Los datos han sido extraídos y validados automáticamente. 
                    El requerimiento "Cédula de Identidad" se ha marcado como completado.
                  </p>
                </div>
              </div>
            )}

            {state === 'error' && (
              <div className="text-center py-8">
                <div className="bg-spi-danger/10 border border-spi-danger/30 rounded-lg p-6">
                  <span className="text-4xl mb-4 block">⚠️</span>
                  <p className="font-medium text-spi-danger mb-2">Error en la validación</p>
                  <p className="text-sm text-muted-foreground">
                    {result?.error || 'El documento no pudo ser procesado. Por favor, asegúrate de subir una imagen clara de tu cédula de identidad.'}
                  </p>
                </div>
              </div>
            )}
          </CardContent>
        </Card>
      </div>

      {/* Info Banner */}
      <Card className="mt-8 glass-card bg-spi-primary/10 border-spi-primary/30 animate-slide-up" style={{ animationDelay: '0.3s' }}>
        <CardContent className="py-4">
          <div className="flex items-start gap-4">
            <span className="text-3xl">🧠</span>
            <div>
              <h4 className="font-medium mb-1">Potenciado por Google Gemini</h4>
              <p className="text-sm text-muted-foreground">
                Utilizamos inteligencia artificial de última generación para analizar documentos. 
                El proceso es seguro y cumple con las normativas de protección de datos.
                Los documentos son procesados en tiempo real y no se almacenan.
              </p>
            </div>
          </div>
        </CardContent>
      </Card>
    </div>
  );
}
