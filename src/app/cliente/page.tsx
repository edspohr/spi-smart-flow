'use client';

import { useState } from 'react';
import { Card, CardContent } from '@/components/ui/card';
import { Progress } from '@/components/ui/progress';
import { TimelineStepper } from '@/components/shared/TimelineStepper';
import { mockClient, mockOTA, mockDocuments, calculateDiscount } from '@/data/mock-clients';
import { ModeToggle } from '@/components/mode-toggle';
import { Camera, Upload, FileText, CheckCircle2, AlertCircle, PenTool, Palette, Type } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { SignatureCanvas } from '@/components/shared/SignatureCanvas';
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import { Input } from "@/components/ui/input";
import { Textarea } from "../../components/ui/textarea";

export default function ClientDashboard() {
  const [documents, setDocuments] = useState(mockDocuments);
  const [openSignatureId, setOpenSignatureId] = useState<string | null>(null);

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
      setDocuments(prev => prev.map(doc => 
        doc.id === docId ? { ...doc, status: 'uploaded', value: file.name } : doc
      ));
    }
  };

  const handleSignature = (docId: string, signatureData: string) => {
    setDocuments(prev => prev.map(doc => 
        doc.id === docId ? { ...doc, status: 'uploaded', value: signatureData } : doc
    ));
    setOpenSignatureId(null);
  };

  const handleColorChange = (docId: string, color: string) => {
     setDocuments(prev => prev.map(doc => 
        doc.id === docId ? { ...doc, status: 'uploaded', value: color } : doc
    ));
  };
   
  const handleTextChange = (docId: string, text: string) => {
      // Mark as uploaded if it has content, otherwise pending
      const status = text.length > 5 ? 'uploaded' : 'pending';
      setDocuments(prev => prev.map(doc => 
        doc.id === docId ? { ...doc, status, value: text } : doc
    ));
  };

  const renderInputAction = (doc: typeof mockDocuments[0]) => {
      if (doc.status === 'validated') {
          return (
             <span className="text-xs font-medium text-green-600 dark:text-green-400 px-3 py-1 bg-green-50 dark:bg-green-900/20 rounded-full">
                Aprobado
             </span>
          );
      }

      switch (doc.inputType) {
          case 'signature':
              return (
                  <Dialog open={openSignatureId === doc.id} onOpenChange={(open) => setOpenSignatureId(open ? doc.id : null)}>
                    <DialogTrigger asChild>
                        <Button size="sm" className="gap-2 bg-primary hover:bg-primary/90">
                           <PenTool className="h-4 w-4" /> 
                           {doc.status === 'uploaded' ? 'Firmado' : 'Firmar'}
                        </Button>
                    </DialogTrigger>
                    <DialogContent className="max-w-lg">
                        <DialogHeader>
                            <DialogTitle>Firma Digital: {doc.name}</DialogTitle>
                        </DialogHeader>
                        <div className="py-4">
                            <SignatureCanvas 
                                onSign={(data) => handleSignature(doc.id, data)}
                                onClear={() => {}} 
                            />
                        </div>
                    </DialogContent>
                  </Dialog>
              );
          
          case 'color':
              return (
                  <div className="flex items-center gap-3">
                      <div className="relative overflow-hidden w-10 h-10 rounded-full border border-border shadow-sm">
                        <Input 
                            type="color" 
                            className="absolute -top-2 -left-2 w-16 h-16 p-0 cursor-pointer border-0"
                            value={doc.value || "#000000"}
                            onChange={(e: React.ChangeEvent<HTMLInputElement>) => handleColorChange(doc.id, e.target.value)}
                        />
                      </div>
                      <span className="text-xs font-mono text-muted-foreground uppercase">
                          {doc.value || "Seleccionar"}
                      </span>
                  </div>
              );

          case 'text':
             if (doc.status === 'uploaded' || doc.status === 'pending') {
                 // Inline text area for "text" types
                 return null; // Handle in main render
             }
             return null;
          
          case 'file':
          default:
              return (
                <div className="relative">
                    <input
                        type="file"
                        accept="image/*,application/pdf"
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
                            <Upload className="h-4 w-4" /> Subir
                        </Button>
                        <Button 
                            size="sm" 
                            className="gap-2 bg-primary hover:bg-primary/90"
                            onClick={() => document.getElementById(`file-${doc.id}`)?.click()}
                        >
                            <Camera className="h-4 w-4" /> 
                            <span className="hidden sm:inline">Foto</span>
                        </Button>
                    </div>
                </div>
              );
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
                <div className="p-4">
                    <div className="flex items-center justify-between gap-4 mb-3">
                        <div className="flex items-center gap-4">
                            <div className={`
                            h-10 w-10 rounded-full flex items-center justify-center shrink-0
                            ${doc.status === 'validated' ? 'bg-green-100 text-green-600 dark:bg-green-900/30 dark:text-green-400' : ''}
                            ${doc.status === 'uploaded' ? 'bg-blue-100 text-blue-600 dark:bg-blue-900/30 dark:text-blue-400' : ''}
                            ${doc.status === 'pending' && doc.inputType === 'signature' ? 'bg-purple-100 text-purple-600 dark:bg-purple-900/30 dark:text-purple-400' : ''}
                            ${doc.status === 'pending' && doc.inputType !== 'signature' ? 'bg-amber-100 text-amber-600 dark:bg-amber-900/30 dark:text-amber-400' : ''}
                            `}>
                            {doc.status === 'validated' && <CheckCircle2 className="h-5 w-5" />}
                            {doc.status !== 'validated' && doc.inputType === 'signature' && <PenTool className="h-5 w-5" />}
                            {doc.status !== 'validated' && doc.inputType === 'color' && <Palette className="h-5 w-5" />}
                            {doc.status !== 'validated' && doc.inputType === 'text' && <Type className="h-5 w-5" />}
                            {doc.status !== 'validated' && doc.inputType === 'file' && <AlertCircle className="h-5 w-5" />}
                            </div>
                            <div>
                                <h4 className="font-medium text-foreground">{doc.name}</h4>
                                <p className="text-xs text-muted-foreground">{doc.type}</p>
                            </div>
                        </div>

                        <div className="flex items-center">
                            {renderInputAction(doc)}
                        </div>
                    </div>

                    {/* Render Text Area content if type is text */}
                    {doc.inputType === 'text' && (
                        <div className="mt-2">
                             <Textarea 
                                placeholder="Describa brevemente la actividad comercial principal..."
                                className="min-h-[80px]"
                                value={doc.value || ''}
                                onChange={(e: React.ChangeEvent<HTMLTextAreaElement>) => handleTextChange(doc.id, e.target.value)}
                             />
                        </div>
                    )}
                    
                    {/* Show value for Colors if selected */}
                     {doc.inputType === 'color' && doc.value && (
                        <div 
                            className="mt-2 h-4 w-full rounded-full opacity-50" 
                            style={{ backgroundColor: doc.value }} 
                        />
                     )}
                     
                     {/* Show signature if present */}
                     {doc.inputType === 'signature' && doc.value && (
                         <div className="mt-2 p-2 border border-dashed rounded bg-secondary/50">
                             {/* eslint-disable-next-line @next/next/no-img-element */}
                             <img src={doc.value} alt="Firma" className="h-12 object-contain opacity-80" />
                         </div>
                     )}

                </div>
              </Card>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
}
