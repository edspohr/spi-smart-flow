'use client';

import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { KPICard } from '@/components/shared/KPICard';
import { mockKPIs, mockEfficiencyData, mockAdminClients } from '@/data/mock-clients';
import { ChartContainer, ChartTooltip, ChartTooltipContent } from '@/components/ui/chart';
import { Area, AreaChart, XAxis, YAxis, ResponsiveContainer } from 'recharts';
import Link from 'next/link';

export default function AdminDashboard() {
  const criticalClients = mockAdminClients.filter(c => c.status === 'red');

  return (
    <div className="container mx-auto px-4 py-8 max-w-5xl">
      {/* Header */}
      <div className="mb-8">
        <h1 className="text-xl font-semibold text-foreground mb-1">
          Torre de Control
        </h1>
        <p className="text-sm text-muted-foreground">
          Resumen ejecutivo de operaciones
        </p>
      </div>

      {/* KPIs Row */}
      <div className="grid grid-cols-2 md:grid-cols-4 gap-4 mb-8">
        <KPICard
          title="Cash Flow Bloqueado"
          value={`$${(mockKPIs.totalBlockedCashFlow / 1000).toFixed(1)}K`}
          trend="down"
          trendValue="12%"
        />
        <KPICard
          title="Potencial Q1"
          value={`$${(mockKPIs.potentialQ1Collection / 1000).toFixed(1)}K`}
          trend="up"
          trendValue="8%"
        />
        <KPICard
          title="Clientes en Riesgo"
          value={mockKPIs.clientsAtRisk}
          subtitle={`de ${mockKPIs.totalClients} activos`}
        />
        <KPICard
          title="Validaciones IA"
          value={mockKPIs.aiValidationsToday}
          subtitle="hoy"
        />
      </div>

      {/* Chart */}
      <Card className="mb-8 border-border">
        <CardHeader className="pb-2">
          <CardTitle className="text-sm font-medium text-muted-foreground">
            Eficiencia de documentación
          </CardTitle>
        </CardHeader>
        <CardContent>
          <div className="h-64">
            <ChartContainer 
              config={{
                manual: { label: 'Manual', color: '#e2e8f0' },
                portal: { label: 'Portal', color: '#1e3a5f' }
              }}
            >
              <ResponsiveContainer width="100%" height="100%">
                <AreaChart data={mockEfficiencyData}>
                  <XAxis 
                    dataKey="month" 
                    tickLine={false} 
                    axisLine={false}
                    tick={{ fontSize: 12, fill: '#64748b' }}
                  />
                  <YAxis 
                    tickLine={false} 
                    axisLine={false}
                    tick={{ fontSize: 12, fill: '#64748b' }}
                    tickFormatter={(value) => `${value}%`}
                  />
                  <ChartTooltip content={<ChartTooltipContent />} />
                  <Area 
                    type="monotone" 
                    dataKey="manual" 
                    stroke="#cbd5e1" 
                    fill="#f1f5f9"
                    strokeWidth={1.5}
                  />
                  <Area 
                    type="monotone" 
                    dataKey="portal" 
                    stroke="#1e3a5f" 
                    fill="#1e3a5f"
                    fillOpacity={0.1}
                    strokeWidth={1.5}
                  />
                </AreaChart>
              </ResponsiveContainer>
            </ChartContainer>
          </div>
        </CardContent>
      </Card>

      {/* Critical Clients */}
      {criticalClients.length > 0 && (
        <Card className="border-border">
          <CardHeader className="pb-2 flex flex-row items-center justify-between">
            <CardTitle className="text-sm font-medium text-muted-foreground">
              Clientes críticos
            </CardTitle>
            <Link 
              href="/admin/triage" 
              className="text-xs text-primary hover:underline"
            >
              Ver todos →
            </Link>
          </CardHeader>
          <CardContent className="pt-0">
            <div className="divide-y divide-border">
              {criticalClients.map((client) => (
                <div key={client.id} className="flex items-center justify-between py-3">
                  <div>
                    <p className="text-sm font-medium text-foreground">{client.name}</p>
                    <p className="text-xs text-muted-foreground">{client.company}</p>
                  </div>
                  <div className="text-right">
                    <p className="text-sm font-medium">${client.otaAmount.toLocaleString()}</p>
                    <p className="text-xs text-red-600">{client.daysOverdue} días</p>
                  </div>
                </div>
              ))}
            </div>
          </CardContent>
        </Card>
      )}
    </div>
  );
}
