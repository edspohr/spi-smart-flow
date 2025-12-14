'use client';

import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Progress } from '@/components/ui/progress';
import { TimelineStepper } from '@/components/shared/TimelineStepper';
import { mockClient, mockOTA, mockDocuments, calculateDiscount } from '@/data/mock-clients';

export default function ClientDashboard() {
  const completedDocs = mockDocuments.filter(d => d.status === 'validated').length;
  const totalDocs = mockDocuments.filter(d => d.required).length;
  const progressPercentage = Math.round((completedDocs / totalDocs) * 100);
  const discount = calculateDiscount(mockOTA);

  return (
    <div className="container mx-auto px-4 py-8 max-w-4xl">
      {/* Header */}
      <div className="mb-8">
        <h1 className="text-xl font-semibold text-foreground mb-1">
          Hola, {mockClient.name.split(' ')[0]}
        </h1>
        <p className="text-sm text-muted-foreground">
          Tu servicio por ${mockOTA.amount.toLocaleString()} está en proceso.
        </p>
      </div>

      {/* Timeline */}
      <Card className="mb-6 border-border">
        <CardHeader className="pb-2">
          <CardTitle className="text-sm font-medium text-muted-foreground">
            Estado del trámite
          </CardTitle>
        </CardHeader>
        <CardContent>
          <TimelineStepper />
        </CardContent>
      </Card>

      {/* Stats Row */}
      <div className="grid grid-cols-2 gap-4 mb-6">
        <Card className="border-border">
          <CardContent className="pt-4">
            <p className="text-xs text-muted-foreground mb-1">Documentación</p>
            <p className="text-2xl font-semibold">{progressPercentage}%</p>
            <Progress value={progressPercentage} className="h-1 mt-2" />
            <p className="text-xs text-muted-foreground mt-1">
              {completedDocs} de {totalDocs} documentos
            </p>
          </CardContent>
        </Card>
        
        <Card className="border-border">
          <CardContent className="pt-4">
            <p className="text-xs text-muted-foreground mb-1">Ahorro potencial</p>
            <p className="text-2xl font-semibold text-green-600">
              ${discount.toLocaleString()}
            </p>
            <p className="text-xs text-muted-foreground mt-2">
              {mockOTA.discountPercentage}% de descuento
            </p>
          </CardContent>
        </Card>
      </div>

      {/* Document List */}
      <Card className="border-border">
        <CardHeader className="pb-2">
          <CardTitle className="text-sm font-medium text-muted-foreground">
            Documentos requeridos
          </CardTitle>
        </CardHeader>
        <CardContent className="pt-0">
          <div className="divide-y divide-border">
            {mockDocuments.filter(d => d.required).map((doc) => (
              <div key={doc.id} className="flex items-center justify-between py-3">
                <div>
                  <p className="text-sm font-medium text-foreground">{doc.name}</p>
                  <p className="text-xs text-muted-foreground">{doc.type}</p>
                </div>
                <div className="flex items-center gap-2">
                  {doc.status === 'validated' && (
                    <>
                      <span className="w-2 h-2 rounded-full bg-green-500" />
                      <span className="text-xs text-green-600">Verificado</span>
                    </>
                  )}
                  {doc.status === 'pending' && (
                    <>
                      <span className="w-2 h-2 rounded-full bg-amber-500" />
                      <span className="text-xs text-amber-600">Pendiente</span>
                    </>
                  )}
                  {doc.status === 'uploaded' && (
                    <>
                      <span className="w-2 h-2 rounded-full bg-blue-500" />
                      <span className="text-xs text-blue-600">Subido</span>
                    </>
                  )}
                </div>
              </div>
            ))}
          </div>
        </CardContent>
      </Card>
    </div>
  );
}
