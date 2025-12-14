'use client';

import { useState } from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Progress } from '@/components/ui/progress';
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
    return (
      <div className="text-xs space-y-1">
        <p>Último contacto: {client.lastContact}</p>
        <p>Documentación: {client.completionRate}%</p>
        {client.status === 'red' && (
          <p className="text-red-500">Requiere acción urgente</p>
        )}
      </div>
    );
  };

  return (
    <TooltipProvider>
      <div className="container mx-auto px-4 py-8 max-w-5xl">
        {/* Header */}
        <div className="mb-8">
          <h1 className="text-xl font-semibold text-foreground mb-1">
            Clientes
          </h1>
          <p className="text-sm text-muted-foreground">
            Estado de documentación por cliente
          </p>
        </div>

        {/* Filters */}
        <div className="flex gap-2 mb-6">
          <Button
            variant={filter === 'all' ? 'default' : 'outline'}
            size="sm"
            onClick={() => setFilter('all')}
          >
            Todos ({counts.all})
          </Button>
          <Button
            variant={filter === 'green' ? 'default' : 'outline'}
            size="sm"
            onClick={() => setFilter('green')}
            className={filter === 'green' ? 'bg-green-600 hover:bg-green-700' : ''}
          >
            En tiempo ({counts.green})
          </Button>
          <Button
            variant={filter === 'yellow' ? 'default' : 'outline'}
            size="sm"
            onClick={() => setFilter('yellow')}
            className={filter === 'yellow' ? 'bg-amber-500 hover:bg-amber-600' : ''}
          >
            Riesgo ({counts.yellow})
          </Button>
          <Button
            variant={filter === 'red' ? 'default' : 'outline'}
            size="sm"
            onClick={() => setFilter('red')}
            className={filter === 'red' ? 'bg-red-600 hover:bg-red-700' : ''}
          >
            Crítico ({counts.red})
          </Button>
        </div>

        {/* Client List */}
        <Card className="border-border">
          <CardContent className="p-0">
            <table className="w-full">
              <thead>
                <tr className="border-b border-border">
                  <th className="text-left py-3 px-4 text-xs font-medium text-muted-foreground uppercase tracking-wide">Estado</th>
                  <th className="text-left py-3 px-4 text-xs font-medium text-muted-foreground uppercase tracking-wide">Cliente</th>
                  <th className="text-right py-3 px-4 text-xs font-medium text-muted-foreground uppercase tracking-wide hidden sm:table-cell">Monto</th>
                  <th className="text-center py-3 px-4 text-xs font-medium text-muted-foreground uppercase tracking-wide hidden md:table-cell">Días</th>
                  <th className="text-left py-3 px-4 text-xs font-medium text-muted-foreground uppercase tracking-wide hidden lg:table-cell">Documentación</th>
                </tr>
              </thead>
              <tbody>
                {filteredClients.map((client) => (
                  <Tooltip key={client.id}>
                    <TooltipTrigger asChild>
                      <tr className="border-b border-border last:border-0 hover:bg-slate-50 cursor-default">
                        <td className="py-3 px-4">
                          <SemaphoreStatus status={client.status} size="md" />
                        </td>
                        <td className="py-3 px-4">
                          <p className="text-sm font-medium text-foreground">{client.name}</p>
                          <p className="text-xs text-muted-foreground">{client.company}</p>
                        </td>
                        <td className="py-3 px-4 text-right hidden sm:table-cell">
                          <span className="text-sm font-medium">${client.otaAmount.toLocaleString()}</span>
                        </td>
                        <td className="py-3 px-4 text-center hidden md:table-cell">
                          {client.daysOverdue > 0 ? (
                            <span className={`text-sm ${client.status === 'red' ? 'text-red-600' : client.status === 'yellow' ? 'text-amber-600' : ''}`}>
                              {client.daysOverdue}
                            </span>
                          ) : (
                            <span className="text-sm text-green-600">0</span>
                          )}
                        </td>
                        <td className="py-3 px-4 hidden lg:table-cell">
                          <div className="flex items-center gap-2">
                            <Progress value={client.completionRate} className="h-1.5 w-20" />
                            <span className="text-xs text-muted-foreground">{client.completionRate}%</span>
                          </div>
                        </td>
                      </tr>
                    </TooltipTrigger>
                    <TooltipContent 
                      side="top" 
                      align="center"
                      sideOffset={4}
                      className="bg-white border border-border shadow-lg"
                      avoidCollisions={true}
                      collisionPadding={16}
                    >
                      {getTooltipContent(client)}
                    </TooltipContent>
                  </Tooltip>
                ))}
              </tbody>
            </table>
          </CardContent>
        </Card>

        {/* Summary */}
        <div className="grid grid-cols-3 gap-4 mt-6">
          <Card className="border-border">
            <CardContent className="py-4 text-center">
              <p className="text-xs text-muted-foreground mb-1">En riesgo</p>
              <p className="text-lg font-semibold text-red-600">
                ${mockAdminClients
                  .filter(c => c.status === 'red')
                  .reduce((sum, c) => sum + c.otaAmount, 0)
                  .toLocaleString()}
              </p>
            </CardContent>
          </Card>
          <Card className="border-border">
            <CardContent className="py-4 text-center">
              <p className="text-xs text-muted-foreground mb-1">Seguimiento</p>
              <p className="text-lg font-semibold text-amber-600">
                ${mockAdminClients
                  .filter(c => c.status === 'yellow')
                  .reduce((sum, c) => sum + c.otaAmount, 0)
                  .toLocaleString()}
              </p>
            </CardContent>
          </Card>
          <Card className="border-border">
            <CardContent className="py-4 text-center">
              <p className="text-xs text-muted-foreground mb-1">En tiempo</p>
              <p className="text-lg font-semibold text-green-600">
                ${mockAdminClients
                  .filter(c => c.status === 'green')
                  .reduce((sum, c) => sum + c.otaAmount, 0)
                  .toLocaleString()}
              </p>
            </CardContent>
          </Card>
        </div>
      </div>
    </TooltipProvider>
  );
}
