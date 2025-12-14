'use client';

import { useState } from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Skeleton } from '@/components/ui/skeleton';

export default function VerificarPage() {
  const [file, setFile] = useState<File | null>(null);
  const [isAnalyzing, setIsAnalyzing] = useState(false);
  const [result, setResult] = useState<{name?: string; expiry?: string; valid: boolean} | null>(null);

  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const selectedFile = e.target.files?.[0];
    if (selectedFile) {
      setFile(selectedFile);
      setResult(null);
    }
  };

  const handleAnalyze = async () => {
    if (!file) return;
    
    setIsAnalyzing(true);
    
    // Simulate AI analysis
    await new Promise(resolve => setTimeout(resolve, 2000));
    
    setResult({
      name: 'Juan Carlos Mendoza López',
      expiry: '15/03/2028',
      valid: true
    });
    
    setIsAnalyzing(false);
  };

  return (
    <div className="container mx-auto px-4 py-8 max-w-4xl">
      {/* Header */}
      <div className="mb-8">
        <h1 className="text-xl font-semibold text-foreground mb-1">
          Validación con IA
        </h1>
        <p className="text-sm text-muted-foreground">
          Sube un documento para validar automáticamente
        </p>
      </div>

      {/* Upload */}
      <Card className="border-border mb-6">
        <CardHeader className="pb-2">
          <CardTitle className="text-sm font-medium text-muted-foreground">
            Subir documento
          </CardTitle>
        </CardHeader>
        <CardContent>
          <div className="space-y-4">
            <div className="border border-dashed border-border rounded-lg p-6 text-center">
              <Input
                type="file"
                accept="image/*,.pdf"
                onChange={handleFileChange}
                className="hidden"
                id="file-upload"
              />
              <label 
                htmlFor="file-upload" 
                className="cursor-pointer text-sm text-muted-foreground hover:text-foreground"
              >
                {file ? (
                  <span className="text-foreground font-medium">{file.name}</span>
                ) : (
                  <>Click para seleccionar archivo</>
                )}
              </label>
            </div>
            
            <Button 
              className="w-full" 
              onClick={handleAnalyze}
              disabled={!file || isAnalyzing}
            >
              {isAnalyzing ? 'Analizando...' : 'Analizar con IA'}
            </Button>
          </div>
        </CardContent>
      </Card>

      {/* Loading State */}
      {isAnalyzing && (
        <Card className="border-border">
          <CardContent className="py-6">
            <div className="space-y-3">
              <Skeleton className="h-4 w-3/4" />
              <Skeleton className="h-4 w-1/2" />
              <Skeleton className="h-4 w-2/3" />
            </div>
            <p className="text-xs text-muted-foreground text-center mt-4">
              Procesando con Gemini AI...
            </p>
          </CardContent>
        </Card>
      )}

      {/* Result */}
      {result && !isAnalyzing && (
        <Card className="border-border">
          <CardHeader className="pb-2">
            <CardTitle className="text-sm font-medium text-muted-foreground flex items-center gap-2">
              <span className="w-2 h-2 rounded-full bg-green-500" />
              Documento validado
            </CardTitle>
          </CardHeader>
          <CardContent>
            <div className="space-y-3">
              <div>
                <p className="text-xs text-muted-foreground">Nombre detectado</p>
                <p className="text-sm font-medium">{result.name}</p>
              </div>
              <div>
                <p className="text-xs text-muted-foreground">Fecha de vencimiento</p>
                <p className="text-sm font-medium">{result.expiry}</p>
              </div>
            </div>
          </CardContent>
        </Card>
      )}
    </div>
  );
}
