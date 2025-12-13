// Mock Data - SPI Smart Flow MVP
// Este archivo puede modificarse fácilmente para personalizar la demo

export interface Client {
  id: string;
  rut: string;
  name: string;
  company: string;
  email: string;
  address: string;
}

export interface OTA {
  id: string;
  clientId: string;
  amount: number;
  discountPercentage: number;
  discountDeadline: Date;
  status: "pending_docs" | "reviewing" | "approved" | "paid";
  createdAt: Date;
}

export interface Document {
  id: string;
  name: string;
  type: "escritura" | "poder" | "cedula" | "certificado" | "otros";
  status: "pending" | "uploaded" | "validated" | "rejected";
  required: boolean;
  reuseAvailable?: boolean;
  reuseFromDate?: string;
}

export interface HistoricalDocument {
  id: string;
  name: string;
  type: string;
  uploadDate: string;
  validUntil: string;
}

// ============ DATOS MOCK ============

export const mockClient: Client = {
  id: "client-001",
  rut: "76.543.210-K",
  name: "Carlos Andrés Mendoza Fuentes",
  company: "Constructora Mendoza SpA",
  email: "carlos.mendoza@constructoramendoza.cl",
  address: "Av. Providencia 1234, Of. 501, Santiago",
};

export const mockOTA: OTA = {
  id: 'ota-001',
  clientId: 'client-001',
  amount: 12500,
  discountPercentage: 15,
  discountDeadline: new Date(Date.now() + 4 * 24 * 60 * 60 * 1000 + 12 * 60 * 60 * 1000), // 4 días y 12 horas
  status: 'pending_docs',
  createdAt: new Date(Date.now() - 10 * 24 * 60 * 60 * 1000) // Hace 10 días
};

export const mockDocuments: Document[] = [
  {
    id: "doc-001",
    name: "Escritura de Constitución",
    type: "escritura",
    status: "pending",
    required: true,
    reuseAvailable: true,
    reuseFromDate: "2023-08-15",
  },
  {
    id: "doc-002",
    name: "Poder Simple",
    type: "poder",
    status: "pending",
    required: true,
    reuseAvailable: false,
  },
  {
    id: "doc-003",
    name: "Cédula de Identidad (Representante)",
    type: "cedula",
    status: "pending",
    required: true,
    reuseAvailable: false,
  },
  {
    id: "doc-004",
    name: "Certificado de Vigencia",
    type: "certificado",
    status: "validated",
    required: true,
  },
  {
    id: "doc-005",
    name: "Última Declaración de IVA",
    type: "otros",
    status: "uploaded",
    required: false,
  },
];

export const mockHistoricalDocuments: HistoricalDocument[] = [
  {
    id: "hist-001",
    name: "Escritura de Constitución - Constructora Mendoza SpA",
    type: "escritura",
    uploadDate: "2023-08-15",
    validUntil: "2028-08-15",
  },
  {
    id: "hist-002",
    name: "Cédula de Identidad - Carlos Mendoza",
    type: "cedula",
    uploadDate: "2023-08-15",
    validUntil: "2024-02-20",
  },
];

// ============ ADMIN DASHBOARD DATA ============

export interface AdminClient {
  id: string;
  name: string;
  company: string;
  otaAmount: number;
  daysOverdue: number;
  status: "green" | "yellow" | "red";
  lastContact: string;
  completionRate: number;
}

export const mockAdminClients: AdminClient[] = [
  {
    id: 'adm-001',
    name: 'Carlos Mendoza',
    company: 'Constructora Mendoza SpA',
    otaAmount: 12500,
    daysOverdue: 0,
    status: 'green',
    lastContact: 'Hace 2 días',
    completionRate: 80
  },
  {
    id: 'adm-002',
    name: 'María González',
    company: 'Inmobiliaria Costa Sur Ltda.',
    otaAmount: 8950,
    daysOverdue: 5,
    status: 'yellow',
    lastContact: 'Hace 7 días',
    completionRate: 40
  },
  {
    id: 'adm-003',
    name: 'Roberto Sánchez',
    company: 'Holding Inversiones RS',
    otaAmount: 15800,
    daysOverdue: 15,
    status: 'red',
    lastContact: 'Hace 15 días',
    completionRate: 20
  },
  {
    id: 'adm-004',
    name: 'Ana Martínez',
    company: 'Desarrollos Urbanos AM',
    otaAmount: 11200,
    daysOverdue: 12,
    status: 'red',
    lastContact: 'Hace 18 días',
    completionRate: 10
  },
  {
    id: 'adm-005',
    name: 'Pedro Rojas',
    company: 'Construcciones del Norte SA',
    otaAmount: 9500,
    daysOverdue: 3,
    status: 'yellow',
    lastContact: 'Hace 5 días',
    completionRate: 60
  },
  {
    id: 'adm-006',
    name: 'Lucía Fernández',
    company: 'Grupo Inmobiliario LF',
    otaAmount: 14200,
    daysOverdue: 0,
    status: 'green',
    lastContact: 'Hoy',
    completionRate: 100
  },
];

export const mockKPIs = {
  totalBlockedCashFlow: 72150, // Suma de OTAs pendientes
  potentialQ1Collection: 45150,  // OTAs en verde/amarillo
  avgManualEfficiency: 45,        // Porcentaje
  avgPortalEfficiency: 87,        // Porcentaje
  totalClients: 6,
  clientsAtRisk: 2,
  documentsProcessedToday: 14,
  aiValidationsToday: 8
};

export const mockEfficiencyData = [
  { month: "Jul", manual: 35, portal: 0 },
  { month: "Ago", manual: 38, portal: 45 },
  { month: "Sep", manual: 42, portal: 62 },
  { month: "Oct", manual: 40, portal: 75 },
  { month: "Nov", manual: 45, portal: 82 },
  { month: "Dic", manual: 45, portal: 87 },
];

// Helper para calcular el descuento
export function calculateDiscount(ota: OTA): number {
  return Math.round(ota.amount * (ota.discountPercentage / 100));
}

// Helper para calcular tiempo restante
export function getTimeRemaining(deadline: Date): {
  days: number;
  hours: number;
  minutes: number;
  expired: boolean;
} {
  const now = new Date();
  const diff = deadline.getTime() - now.getTime();

  if (diff <= 0) {
    return { days: 0, hours: 0, minutes: 0, expired: true };
  }

  const days = Math.floor(diff / (1000 * 60 * 60 * 24));
  const hours = Math.floor((diff % (1000 * 60 * 60 * 24)) / (1000 * 60 * 60));
  const minutes = Math.floor((diff % (1000 * 60 * 60)) / (1000 * 60));

  return { days, hours, minutes, expired: false };
}
