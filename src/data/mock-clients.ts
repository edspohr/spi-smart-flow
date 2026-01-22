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
  type: string;
  inputType: 'file' | 'signature' | 'color' | 'text';
  value?: string; // For saving text, hex codes, or signature data URLs
  status: "pending" | "uploaded" | "validated" | "rejected";
  required: boolean;
  reuseAvailable?: boolean;
  reuseFromDate?: string;
  validUntil?: string;
}

export const mockClient: Client = {
  id: "client-001",
  rut: "76.543.210-K",
  name: "Carlos Andrés Mendoza Fuentes",
  company: "Startup Innovadora SpA",
  email: "carlos.mendoza@startup.cl",
  address: "Av. Providencia 1234, Of. 501, Santiago",
};

export const mockOTA: OTA = {
  id: 'ota-001',
  clientId: 'client-001',
  amount: 8500, // Adjusted for PI service
  discountPercentage: 10,
  discountDeadline: new Date(Date.now() + 4 * 24 * 60 * 60 * 1000), 
  status: 'pending_docs',
  createdAt: new Date(Date.now() - 2 * 24 * 60 * 60 * 1000)
};

export const mockDocuments: Document[] = [
  {
    id: "doc-001",
    name: "Poder Simple",
    type: "legal",
    inputType: "signature",
    status: "pending",
    required: true,
  },
  {
    id: "doc-002",
    name: "Logo Corporativo",
    type: "brand",
    inputType: "file",
    status: "pending",
    required: true,
  },
  {
    id: "doc-003",
    name: "Pantón de Colores (Principal)",
    type: "brand",
    inputType: "color",
    status: "pending",
    required: true,
  },
  {
    id: "doc-004",
    name: "Descripción Actividad Comercial",
    type: "info",
    inputType: "text",
    status: "pending",
    required: true,
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
