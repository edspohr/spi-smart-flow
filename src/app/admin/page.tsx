'use client';

import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { KPICard } from '@/components/shared/KPICard';
import { mockKPIs, mockEfficiencyData, mockAdminClients } from '@/data/mock-clients';
import { 
  ChartContainer, 
  ChartTooltip, 
  ChartTooltipContent,
  type ChartConfig
} from '@/components/ui/chart';
import { LineChart, Line, XAxis, YAxis, CartesianGrid, ResponsiveContainer, Legend, Area, AreaChart } from 'recharts';
import Link from 'next/link';

const chartConfig: ChartConfig = {
  manual: {
    label: "Proceso Manual",
    color: "#64748b"
  },
  portal: {
    label: "SPI Smart Flow",
    color: "#10b981"
  }
};

export default function AdminDashboard() {
  const clientsAtRisk = mockAdminClients.filter(c => c.status === 'red');
  const totalBlocked = mockAdminClients.reduce((sum, c) => sum + c.otaAmount, 0);

  return (
    <div className="container mx-auto px-4 py-8">
      {/* Header */}
      <div className="mb-8 animate-slide-up">
        <h1 className="text-3xl font-bold mb-2 flex items-center gap-3">
          <span className="text-4xl">🏢</span>
          Torre de Control
        </h1>
        <p className="text-muted-foreground">
          Vista ejecutiva del estado de las operaciones y flujo de documentación.
        </p>
      </div>

      {/* KPI Cards */}
      <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-6 mb-8">
        <KPICard
          title="Cash Flow Bloqueado"
          value={`$${(totalBlocked / 1000).toFixed(0)}K`}
          subtitle="Total OTAs pendientes"
          variant="danger"
          trend="down"
          trendValue="12%"
          icon={
            <svg className="w-6 h-6 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 8c-1.657 0-3 .895-3 2s1.343 2 3 2 3 .895 3 2-1.343 2-3 2m0-8c1.11 0 2.08.402 2.599 1M12 8V7m0 1v8m0 0v1m0-1c-1.11 0-2.08-.402-2.599-1M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
            </svg>
          }
        />

        <KPICard
          title="Potencial Recaudo Q1"
          value={`$${(mockKPIs.potentialQ1Collection / 1000).toFixed(0)}K`}
          subtitle="OTAs en verde/amarillo"
          variant="success"
          trend="up"
          trendValue="23%"
          icon={
            <svg className="w-6 h-6 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 7h8m0 0v8m0-8l-8 8-4-4-6 6" />
            </svg>
          }
        />

        <KPICard
          title="Clientes en Riesgo"
          value={clientsAtRisk.length}
          subtitle={`de ${mockAdminClients.length} clientes totales`}
          variant="warning"
          icon={
            <svg className="w-6 h-6 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 9v2m0 4h.01m-6.938 4h13.856c1.54 0 2.502-1.667 1.732-3L13.732 4c-.77-1.333-2.694-1.333-3.464 0L3.34 16c-.77 1.333.192 3 1.732 3z" />
            </svg>
          }
        />

        <KPICard
          title="Validaciones IA Hoy"
          value={mockKPIs.aiValidationsToday}
          subtitle={`${mockKPIs.documentsProcessedToday} docs procesados`}
          variant="default"
          trend="up"
          trendValue="45%"
          icon={
            <svg className="w-6 h-6 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9.75 17L9 20l-1 1h8l-1-1-.75-3M3 13h18M5 17h14a2 2 0 002-2V5a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z" />
            </svg>
          }
        />
      </div>

      {/* Charts Row */}
      <div className="grid lg:grid-cols-2 gap-6 mb-8">
        {/* Efficiency Chart */}
        <Card className="glass-card animate-slide-up" style={{ animationDelay: '0.2s' }}>
          <CardHeader>
            <CardTitle className="flex items-center gap-2">
              <span className="text-xl">📈</span>
              Eficiencia de Documentación
            </CardTitle>
          </CardHeader>
          <CardContent>
            <ChartContainer config={chartConfig} className="h-64 w-full">
              <ResponsiveContainer width="100%" height="100%">
                <AreaChart data={mockEfficiencyData}>
                  <defs>
                    <linearGradient id="colorManual" x1="0" y1="0" x2="0" y2="1">
                      <stop offset="5%" stopColor="#64748b" stopOpacity={0.3}/>
                      <stop offset="95%" stopColor="#64748b" stopOpacity={0}/>
                    </linearGradient>
                    <linearGradient id="colorPortal" x1="0" y1="0" x2="0" y2="1">
                      <stop offset="5%" stopColor="#10b981" stopOpacity={0.3}/>
                      <stop offset="95%" stopColor="#10b981" stopOpacity={0}/>
                    </linearGradient>
                  </defs>
                  <CartesianGrid strokeDasharray="3 3" stroke="#374151" />
                  <XAxis dataKey="month" stroke="#94a3b8" fontSize={12} />
                  <YAxis stroke="#94a3b8" fontSize={12} tickFormatter={(v) => `${v}%`} />
                  <ChartTooltip content={<ChartTooltipContent />} />
                  <Area 
                    type="monotone" 
                    dataKey="manual" 
                    stroke="#64748b" 
                    fillOpacity={1} 
                    fill="url(#colorManual)"
                    strokeWidth={2}
                    name="Proceso Manual"
                  />
                  <Area 
                    type="monotone" 
                    dataKey="portal" 
                    stroke="#10b981" 
                    fillOpacity={1} 
                    fill="url(#colorPortal)"
                    strokeWidth={2}
                    name="SPI Smart Flow"
                  />
                </AreaChart>
              </ResponsiveContainer>
            </ChartContainer>
            <div className="flex justify-center gap-6 mt-4">
              <div className="flex items-center gap-2">
                <div className="w-3 h-3 rounded-full bg-gray-500" />
                <span className="text-sm text-muted-foreground">Proceso Manual</span>
              </div>
              <div className="flex items-center gap-2">
                <div className="w-3 h-3 rounded-full bg-spi-accent" />
                <span className="text-sm text-muted-foreground">SPI Smart Flow</span>
              </div>
            </div>
          </CardContent>
        </Card>

        {/* At Risk Clients */}
        <Card className="glass-card animate-slide-up" style={{ animationDelay: '0.3s' }}>
          <CardHeader>
            <CardTitle className="flex items-center justify-between">
              <span className="flex items-center gap-2">
                <span className="text-xl">🚨</span>
                Clientes Críticos
              </span>
              <Link href="/admin/triage" className="text-sm text-spi-primary hover:underline font-normal">
                Ver todos →
              </Link>
            </CardTitle>
          </CardHeader>
          <CardContent>
            <div className="space-y-4">
              {clientsAtRisk.map((client, index) => (
                <div 
                  key={client.id}
                  className="flex items-center justify-between p-4 bg-spi-danger/10 border border-spi-danger/30 rounded-lg animate-slide-up"
                  style={{ animationDelay: `${0.4 + index * 0.1}s` }}
                >
                  <div className="flex items-center gap-3">
                    <div className="w-10 h-10 rounded-full bg-spi-danger/20 flex items-center justify-center">
                      <span className="text-lg">🔴</span>
                    </div>
                    <div>
                      <p className="font-medium">{client.name}</p>
                      <p className="text-sm text-muted-foreground">{client.company}</p>
                    </div>
                  </div>
                  <div className="text-right">
                    <p className="font-bold text-spi-danger">${client.otaAmount.toLocaleString()}</p>
                    <p className="text-xs text-spi-danger">{client.daysOverdue} días de retraso</p>
                  </div>
                </div>
              ))}
            </div>
          </CardContent>
        </Card>
      </div>

      {/* Summary Stats */}
      <Card className="glass-card animate-slide-up" style={{ animationDelay: '0.5s' }}>
        <CardHeader>
          <CardTitle className="flex items-center gap-2">
            <span className="text-xl">📊</span>
            Resumen de Impacto
          </CardTitle>
        </CardHeader>
        <CardContent>
          <div className="grid md:grid-cols-3 gap-6">
            <div className="text-center p-6 bg-muted/50 rounded-lg">
              <p className="text-4xl font-bold text-spi-accent mb-2">
                {mockKPIs.avgPortalEfficiency}%
              </p>
              <p className="text-sm text-muted-foreground">Eficiencia con Portal</p>
              <p className="text-xs text-spi-accent mt-1">
                +{mockKPIs.avgPortalEfficiency - mockKPIs.avgManualEfficiency}% vs manual
              </p>
            </div>
            <div className="text-center p-6 bg-muted/50 rounded-lg">
              <p className="text-4xl font-bold text-spi-warning mb-2">
                {Math.round(mockAdminClients.reduce((sum, c) => sum + c.completionRate, 0) / mockAdminClients.length)}%
              </p>
              <p className="text-sm text-muted-foreground">Tasa Promedio Completado</p>
              <p className="text-xs text-muted-foreground mt-1">De documentación requerida</p>
            </div>
            <div className="text-center p-6 bg-muted/50 rounded-lg">
              <p className="text-4xl font-bold text-spi-primary mb-2">
                2.5<span className="text-lg">días</span>
              </p>
              <p className="text-sm text-muted-foreground">Tiempo Promedio Resolución</p>
              <p className="text-xs text-spi-accent mt-1">↓ 60% con IA</p>
            </div>
          </div>
        </CardContent>
      </Card>
    </div>
  );
}
