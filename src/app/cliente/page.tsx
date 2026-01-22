'use client';

import { useState } from 'react';
import { Card, CardContent } from '@/components/ui/card';
import { Progress } from '@/components/ui/progress';
import { TimelineStepper } from '@/components/shared/TimelineStepper';
import { mockClient, mockOTA, mockDocuments, calculateDiscount } from '@/data/mock-clients';
import { ModeToggle } from '@/components/mode-toggle';
import { Camera, Upload, FileText, CheckCircle2, Clock, AlertCircle } from 'lucide-react';
import { Button } from '@/components/ui/button';

export default function ClientDashboard() {
  const [documents, setDocuments] = useState(mockDocuments);
  const completedDocs = documents.filter(d => d.status === 'validated').length;
  const uploadedDocs = documents.filter(d => d.status === 'uploaded').length;
  
  // Calculate total progress including uploaded but not validated
  const totalProgress = completedDocs + uploadedDocs;
  const totalRequired = documents.filter(d => d.required).length;
  const progressPercentage = Math.round((totalProgress / totalRequired) * 100);
  
  const discount = calculateDiscount(mockOTA);

  const handleFileUpload = (docId: string, event: React.ChangeEvent<HTMLInputElement>) => {
    const file = event.target.files?.[0];
    if (file) {
      // Simulate upload success
      setDocuments(prev => prev.map(doc => 
        doc.id === docId ? { ...doc, status: 'uploaded' } : doc
      ));
    }
  };

  return (
    <div className="min-h-screen bg-secondary/30 pb-20">
      {/* Premium Header with Glass Effect */}
      <div className="sticky top-0 z-10 w-full backdrop-blur-xl bg-background/80 border-b border-border/50">
        <div className="container mx-auto px-4 h-16 flex items-center justify-between max-w-5xl">
          <div className="flex items-center gap-2">
            <div className="h-8 w-8 rounded-lg bg-primary flex items-center justify-center text-primary-foreground font-bold">
              SF
            </div>
            <span className="font-semibold text-lg hidden sm:block">Smart Flow</span>
          </div>
          <div className="flex items-center gap-4">
            <ModeToggle />
            <div className="h-8 w-8 rounded-full bg-linear-to-tr from-blue-500 to-purple-500 ring-2 ring-background" />
          </div>
        </div>
      </div>

      <div className="container mx-auto px-4 py-8 max-w-5xl space-y-8">
        
        {/* Welcome Section */}
        <div className="animate-fade-in">
          <h1 className="text-3xl font-bold tracking-tight text-foreground mb-2">
            Hola, {mockClient.name.split(' ')[0]}
          </h1>
          <p className="text-muted-foreground text-lg max-w-2xl">
            Gestiona tu servicio de <span className="text-foreground font-medium">${mockOTA.amount.toLocaleString()}</span> de forma simple y rápida.
          </p>
        </div>

        {/* Timeline - Elegant & Minimal */}
        <div className="animate-slide-up" style={{ animationDelay: '0.1s' }}>
          <Card className="border-0 shadow-lg bg-card/50 backdrop-blur-sm overflow-hidden">
            <CardContent className="pt-6">
               <TimelineStepper />
            </CardContent>
          </Card>
        </div>

        {/* Stats Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6 animate-slide-up" style={{ animationDelay: '0.2s' }}>
          {/* Progress Card */}
          <Card className="border-border/50 shadow-md hover:shadow-lg transition-all duration-300 group">
            <CardContent className="pt-6">
              <div className="flex justify-between items-start mb-4">
                <div>
                  <p className="text-sm font-medium text-muted-foreground">Progreso Documental</p>
                  <h3 className="text-4xl font-bold mt-2">{progressPercentage}%</h3>
                </div>
                <div className="p-3 rounded-full bg-primary/10 text-primary group-hover:bg-primary group-hover:text-primary-foreground transition-colors">
                  <FileText className="h-6 w-6" />
                </div>
              </div>
              <Progress value={progressPercentage} className="h-2 mb-2" />
              <p className="text-sm text-muted-foreground">
                <span className="text-foreground font-medium">{totalProgress}</span> de {totalRequired} documentos listos
              </p>
            </CardContent>
          </Card>

          {/* Savings Card */}
          <Card className="border-border/50 shadow-md hover:shadow-lg transition-all duration-300 group">
            <CardContent className="pt-6">
              <div className="flex justify-between items-start mb-4">
                <div>
                  <p className="text-sm font-medium text-muted-foreground">Ahorro Potencial Estimado</p>
                  <h3 className="text-4xl font-bold mt-2 text-green-600 dark:text-green-400">
                    ${discount.toLocaleString()}
                  </h3>
                </div>
                <div className="p-3 rounded-full bg-green-100 dark:bg-green-900/30 text-green-600 dark:text-green-400">
                  <CheckCircle2 className="h-6 w-6" />
                </div>
              </div>
              <div className="flex items-center gap-2 text-sm text-muted-foreground">
                 <span className="px-2 py-1 rounded-md bg-green-100 dark:bg-green-900/30 text-green-700 dark:text-green-300 font-medium text-xs">
                   {mockOTA.discountPercentage}% OFF
                 </span>
                 <span>aplicado al finalizar el proceso</span>
              </div>
            </CardContent>
          </Card>
        </div>

        {/* Actionable Documents List */}
        <div className="animate-slide-up" style={{ animationDelay: '0.3s' }}>
          <div className="flex items-center justify-between mb-4">
            <h2 className="text-xl font-semibold">Tu Lista de Tareas</h2>
            <span className="text-sm text-muted-foreground bg-secondary px-3 py-1 rounded-full">
              {documents.filter(d => d.status === 'pending' && d.required).length} pendientes
            </span>
          </div>

          <div className="space-y-3">
            {documents.filter(d => d.required).map((doc) => (
              <Card 
                key={doc.id} 
                className={`
                  border-0 shadow-sm transition-all duration-200 overflow-hidden
                  ${doc.status === 'pending' ? 'border-l-4 border-l-amber-500 bg-card hover:translate-x-1' : 'opacity-75 bg-secondary/50'}
                `}
              >
                <div className="p-4 flex items-center justify-between gap-4">
                  <div className="flex items-center gap-4">
                    <div className={`
                      h-10 w-10 rounded-full flex items-center justify-center shrink-0
                      ${doc.status === 'validated' ? 'bg-green-100 text-green-600 dark:bg-green-900/30 dark:text-green-400' : ''}
                      ${doc.status === 'uploaded' ? 'bg-blue-100 text-blue-600 dark:bg-blue-900/30 dark:text-blue-400' : ''}
                      ${doc.status === 'pending' ? 'bg-amber-100 text-amber-600 dark:bg-amber-900/30 dark:text-amber-400' : ''}
                    `}>
                      {doc.status === 'validated' && <CheckCircle2 className="h-5 w-5" />}
                      {doc.status === 'uploaded' && <Clock className="h-5 w-5" />}
                      {doc.status === 'pending' && <AlertCircle className="h-5 w-5" />}
                    </div>
                    <div>
                      <h4 className="font-medium text-foreground">{doc.name}</h4>
                      <p className="text-xs text-muted-foreground">{doc.type}</p>
                    </div>
                  </div>

                  <div className="flex items-center">
                    {doc.status === 'pending' && (
                      <div className="relative">
                        <input
                          type="file"
                          accept="image/*"
                          capture="environment"
                          id={`file-${doc.id}`}
                          className="hidden"
                          onChange={(e) => handleFileUpload(doc.id, e)}
                        />
                        <div className="flex gap-2">
                           <Button 
                            variant="outline" 
                            size="sm" 
                            className="hidden sm:flex gap-2"
                            onClick={() => document.getElementById(`file-${doc.id}`)?.click()}
                          >
                             <Upload className="h-4 w-4" /> Subir PDF
                           </Button>
                           <Button 
                             size="sm" 
                             className="gap-2 bg-primary hover:bg-primary/90"
                             onClick={() => document.getElementById(`file-${doc.id}`)?.click()}
                           >
                             <Camera className="h-4 w-4" /> 
                             <span className="hidden sm:inline">Tomar Foto</span>
                             <span className="sm:hidden">Foto</span>
                           </Button>
                        </div>
                      </div>
                    )}
                    
                    {doc.status === 'uploaded' && (
                       <span className="text-xs font-medium text-blue-600 dark:text-blue-400 px-3 py-1 bg-blue-50 dark:bg-blue-900/20 rounded-full">
                         En Revisión
                       </span>
                    )}

                    {doc.status === 'validated' && (
                       <span className="text-xs font-medium text-green-600 dark:text-green-400 px-3 py-1 bg-green-50 dark:bg-green-900/20 rounded-full">
                         Aprobado
                       </span>
                    )}
                  </div>
                </div>
              </Card>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
}
