'use client';

import { useState } from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { Progress } from '@/components/ui/progress';
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from '@/components/ui/table';
import {
  Tooltip,
  TooltipContent,
  TooltipProvider,
  TooltipTrigger,
} from '@/components/ui/tooltip';
import { SemaphoreStatus } from '@/components/shared/SemaphoreStatus';
import { mockAdminClients, AdminClient } from '@/data/mock-clients';

type FilterStatus = 'all' | 'green' | 'yellow' | 'red';

export default function TriagePage() {
  const [filter, setFilter] = useState<FilterStatus>('all');

  const filteredClients = filter === 'all' 
    ? mockAdminClients 
    : mockAdminClients.filter(c => c.status === filter);

  const counts = {
    all: mockAdminClients.length,
    green: mockAdminClients.filter(c => c.status === 'green').length,
    yellow: mockAdminClients.filter(c => c.status === 'yellow').length,
    red: mockAdminClients.filter(c => c.status === 'red').length
  };

  const getTooltipContent = (client: AdminClient) => {
    if (client.status === 'red') {
      return (
        <div className="space-y-2 max-w-xs">
          <p className="font-semibold text-spi-danger">⚠️ Riesgo de pérdida de incentivo</p>
          <p className="text-sm">Último contacto: {client.lastContact}</p>
          <p className="text-sm">Documentación: {client.completionRate}% completada</p>
          <p className="text-sm text-muted-foreground">
            Acción recomendada: Contacto urgente requerido
          </p>
        </div>
      );
    }
    if (client.status === 'yellow') {
      return (
        <div className="space-y-2 max-w-xs">
          <p className="font-semibold text-spi-warning">⏳ Requiere seguimiento</p>
          <p className="text-sm">Último contacto: {client.lastContact}</p>
          <p className="text-sm">Documentación: {client.completionRate}% completada</p>
        </div>
      );
    }
    return (
      <div className="space-y-2 max-w-xs">
        <p className="font-semibold text-spi-accent">✓ En buen estado</p>
        <p className="text-sm">Último contacto: {client.lastContact}</p>
        <p className="text-sm">Documentación: {client.completionRate}% completada</p>
      </div>
    );
  };

  return (
    <TooltipProvider>
      <div className="container mx-auto px-4 py-8">
        {/* Header */}
        <div className="mb-8 animate-slide-up">
          <h1 className="text-3xl font-bold mb-2 flex items-center gap-3">
            <span className="text-4xl">🚦</span>
            Matriz de Seguimiento (Triage)
          </h1>
          <p className="text-muted-foreground">
            Monitorea el estado de todos los clientes y prioriza acciones según urgencia.
          </p>
        </div>

        {/* Filter Buttons */}
        <div className="flex flex-wrap gap-3 mb-6 animate-slide-up" style={{ animationDelay: '0.1s' }}>
          <Button
            variant={filter === 'all' ? 'default' : 'outline'}
            onClick={() => setFilter('all')}
            className={filter === 'all' ? 'gradient-primary' : ''}
          >
            Todos ({counts.all})
          </Button>
          <Button
            variant={filter === 'green' ? 'default' : 'outline'}
            onClick={() => setFilter('green')}
            className={filter === 'green' ? 'bg-spi-accent hover:bg-spi-accent/90' : ''}
          >
            <span className="w-2 h-2 rounded-full bg-spi-accent mr-2" />
            En tiempo ({counts.green})
          </Button>
          <Button
            variant={filter === 'yellow' ? 'default' : 'outline'}
            onClick={() => setFilter('yellow')}
            className={filter === 'yellow' ? 'bg-spi-warning hover:bg-spi-warning/90' : ''}
          >
            <span className="w-2 h-2 rounded-full bg-spi-warning mr-2" />
            Riesgo ({counts.yellow})
          </Button>
          <Button
            variant={filter === 'red' ? 'default' : 'outline'}
            onClick={() => setFilter('red')}
            className={filter === 'red' ? 'bg-spi-danger hover:bg-spi-danger/90' : ''}
          >
            <span className="w-2 h-2 rounded-full bg-spi-danger mr-2 animate-pulse" />
            Crítico ({counts.red})
          </Button>
        </div>

        {/* Table */}
        <Card className="glass-card animate-slide-up" style={{ animationDelay: '0.2s' }}>
          <CardContent className="p-0">
            <Table>
              <TableHeader>
                <TableRow className="border-border hover:bg-transparent">
                  <TableHead className="w-12">Estado</TableHead>
                  <TableHead>Cliente</TableHead>
                  <TableHead>Empresa</TableHead>
                  <TableHead className="text-right">Monto OTA</TableHead>
                  <TableHead className="text-center">Días Retraso</TableHead>
                  <TableHead className="w-40">Documentación</TableHead>
                  <TableHead>Último Contacto</TableHead>
                </TableRow>
              </TableHeader>
              <TableBody>
                {filteredClients.map((client, index) => (
                  <Tooltip key={client.id}>
                    <TooltipTrigger asChild>
                      <TableRow 
                        className={`
                          border-border cursor-pointer transition-all
                          ${client.status === 'red' ? 'bg-spi-danger/5 hover:bg-spi-danger/10' : ''}
                          ${client.status === 'yellow' ? 'bg-spi-warning/5 hover:bg-spi-warning/10' : ''}
                          ${client.status === 'green' ? 'hover:bg-muted/50' : ''}
                          animate-slide-up
                        `}
                        style={{ animationDelay: `${0.3 + index * 0.05}s` }}
                      >
                        <TableCell>
                          <SemaphoreStatus status={client.status} size="md" />
                        </TableCell>
                        <TableCell className="font-medium">{client.name}</TableCell>
                        <TableCell className="text-muted-foreground">{client.company}</TableCell>
                        <TableCell className="text-right font-semibold">
                          ${client.otaAmount.toLocaleString()}
                        </TableCell>
                        <TableCell className="text-center">
                          {client.daysOverdue > 0 ? (
                            <Badge 
                              variant="outline" 
                              className={
                                client.status === 'red' 
                                  ? 'border-spi-danger text-spi-danger' 
                                  : client.status === 'yellow'
                                  ? 'border-spi-warning text-spi-warning'
                                  : ''
                              }
                            >
                              {client.daysOverdue} días
                            </Badge>
                          ) : (
                            <span className="text-spi-accent">Al día</span>
                          )}
                        </TableCell>
                        <TableCell>
                          <div className="space-y-1">
                            <Progress 
                              value={client.completionRate} 
                              className="h-2"
                            />
                            <span className="text-xs text-muted-foreground">
                              {client.completionRate}%
                            </span>
                          </div>
                        </TableCell>
                        <TableCell className="text-muted-foreground text-sm">
                          {client.lastContact}
                        </TableCell>
                      </TableRow>
                    </TooltipTrigger>
                    <TooltipContent side="left" className="glass-card border-border">
                      {getTooltipContent(client)}
                    </TooltipContent>
                  </Tooltip>
                ))}
              </TableBody>
            </Table>
          </CardContent>
        </Card>

        {/* Summary */}
        <div className="grid md:grid-cols-3 gap-4 mt-6">
          <Card className="glass-card bg-spi-danger/10 border-spi-danger/30 animate-slide-up" style={{ animationDelay: '0.5s' }}>
            <CardContent className="py-4">
              <div className="flex items-center gap-3">
                <span className="text-2xl">💰</span>
                <div>
                  <p className="text-sm text-muted-foreground">En riesgo de pérdida</p>
                  <p className="text-xl font-bold text-spi-danger">
                    ${mockAdminClients
                      .filter(c => c.status === 'red')
                      .reduce((sum, c) => sum + c.otaAmount, 0)
                      .toLocaleString()}
                  </p>
                </div>
              </div>
            </CardContent>
          </Card>

          <Card className="glass-card bg-spi-warning/10 border-spi-warning/30 animate-slide-up" style={{ animationDelay: '0.6s' }}>
            <CardContent className="py-4">
              <div className="flex items-center gap-3">
                <span className="text-2xl">⏳</span>
                <div>
                  <p className="text-sm text-muted-foreground">Requiere seguimiento</p>
                  <p className="text-xl font-bold text-spi-warning">
                    ${mockAdminClients
                      .filter(c => c.status === 'yellow')
                      .reduce((sum, c) => sum + c.otaAmount, 0)
                      .toLocaleString()}
                  </p>
                </div>
              </div>
            </CardContent>
          </Card>

          <Card className="glass-card bg-spi-accent/10 border-spi-accent/30 animate-slide-up" style={{ animationDelay: '0.7s' }}>
            <CardContent className="py-4">
              <div className="flex items-center gap-3">
                <span className="text-2xl">✅</span>
                <div>
                  <p className="text-sm text-muted-foreground">En buen estado</p>
                  <p className="text-xl font-bold text-spi-accent">
                    ${mockAdminClients
                      .filter(c => c.status === 'green')
                      .reduce((sum, c) => sum + c.otaAmount, 0)
                      .toLocaleString()}
                  </p>
                </div>
              </div>
            </CardContent>
          </Card>
        </div>
      </div>
    </TooltipProvider>
  );
}
