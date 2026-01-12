import { 
  Zap, 
  Target, 
  ShieldCheck, 
  AlertTriangle 
} from 'lucide-react';
import { MetricItem, ChartDataPoint, ProjectDetails, StrategicObjective, Quarter, KeywordData, ActivityLogItem, AssetItem, CannibalizationItem, CompetitorMetric } from './types';

// Mock Data for KPI Cards
export const KPI_METRICS: MetricItem[] = [
  {
    id: '1',
    label: 'Estrategias Activas',
    value: '124',
    change: '+12%',
    trend: 'up',
    icon: Zap,
    colorClass: 'text-emerald-400',
    bgClass: 'bg-emerald-400/10'
  },
  {
    id: '2',
    label: 'Keywords Core',
    value: '8,430',
    change: '+5.4%',
    trend: 'up',
    icon: Target,
    colorClass: 'text-violet-400',
    bgClass: 'bg-violet-400/10'
  },
  {
    id: '3',
    label: 'Anchors Seguros',
    value: '92%',
    change: '+1.2%',
    trend: 'up',
    icon: ShieldCheck,
    colorClass: 'text-blue-400',
    bgClass: 'bg-blue-400/10'
  },
  {
    id: '4',
    label: 'Próximas a Vencer',
    value: '7',
    change: '-2',
    trend: 'down',
    icon: AlertTriangle,
    colorClass: 'text-orange-400',
    bgClass: 'bg-orange-400/10'
  }
];

// Mock Data for Phase Distribution (Donut Chart - Minimalist Gray)
export const PHASE_DATA: ChartDataPoint[] = [
  { name: 'Research', value: 30, color: '#94a3b8' }, // Slate 400
  { name: 'On-Page', value: 45, color: '#475569' }, // Slate 600
  { name: 'Off-Page', value: 15, color: '#1e293b' }, // Slate 800
  { name: 'Technical', value: 10, color: '#cbd5e1' }, // Slate 300
];

// Mock Data for Status Distribution (Pie Chart - Vibrant Green)
export const STATUS_DATA: ChartDataPoint[] = [
  { name: 'Exitosas', value: 65, color: '#10b981' }, // Emerald 500
  { name: 'En Progreso', value: 20, color: '#34d399' }, // Emerald 400
  { name: 'Pausadas', value: 10, color: '#065f46' }, // Emerald 800
  { name: 'Riesgo', value: 5, color: '#6ee7b7' }, // Emerald 300
];

// Mock Data for Project Detail - UPDATED for Educa College Prep
export const MOCK_PROJECT: ProjectDetails = {
  id: 'prj-educa-001',
  name: 'Educa College Prep',
  url: 'educacollegeprep.com',
  progress: 65,
  startDate: '01 Sep, 2025',
  endDate: '30 Jun, 2026',
  status: 'active',
  type: 'custom'
};

// Mock Data for Summary Tab Charts
export const SUMMARY_EFFORT_DATA: ChartDataPoint[] = [
  { name: 'Contenido Blog', value: 40, color: '#8b5cf6' }, // Violet
  { name: 'Optimización SAT', value: 30, color: '#10b981' }, // Emerald
  { name: 'Backlinks .edu', value: 20, color: '#3b82f6' }, // Blue
  { name: 'Técnico', value: 10, color: '#64748b' }, // Slate
];

export const SUMMARY_KEYWORD_STATUS_DATA: ChartDataPoint[] = [
  { name: 'Top 3', value: 15, color: '#10b981' }, // Emerald
  { name: 'Top 10', value: 35, color: '#34d399' }, // Emerald Light
  { name: 'Oportunidad', value: 25, color: '#f59e0b' }, // Amber
  { name: 'Perdidas', value: 25, color: '#ef4444' }, // Red
];

// Mock Data for Planning Objectives
export const MOCK_OBJECTIVES: Record<Quarter, StrategicObjective[]> = {
  Q1: [
    {
      id: 'obj-1',
      title: 'Auditoría Técnica Inicial',
      description: 'Revisión completa de Core Web Vitals y estructura de URLs para la campaña.',
      kpiTarget: 'Score > 90',
      status: 'done'
    },
    {
      id: 'obj-2',
      title: 'Keyword Research Transaccional',
      description: 'Identificar oportunidades long-tail con alta intención de compra.',
      kpiTarget: '50 Keywords',
      status: 'in_progress'
    },
    {
      id: 'obj-3',
      title: 'Optimización de Landing Pages',
      description: 'Implementación de esquema de producto y mejoras de contenido.',
      kpiTarget: '+15% CTR',
      status: 'todo'
    }
  ],
  Q2: [
    {
      id: 'obj-4',
      title: 'Campaña de Linkbuilding Fase 2',
      description: 'Adquisición de enlaces en medios de tier 1 y blogs temáticos.',
      kpiTarget: '10 Backlinks',
      status: 'todo'
    }
  ],
  Q3: [],
  Q4: []
};

// --- KEYWORDS & ANCHORS DATA ---

export const KEYWORD_DISTRIBUTION_DATA: ChartDataPoint[] = [
  { name: 'Keywords Core', value: 62, color: '#8b5cf6' }, // Violet 500
  { name: 'Quick Wins', value: 38, color: '#10b981' }, // Emerald 500
];

export const ANCHOR_TEXT_DISTRIBUTION: ChartDataPoint[] = [
  { name: 'Branded', value: 45, color: '#10b981' }, // Emerald 500
  { name: 'Naked URL', value: 20, color: '#3b82f6' }, // Blue 500
  { name: 'Generic', value: 15, color: '#94a3b8' }, // Slate 400
  { name: 'Partial Match', value: 15, color: '#f59e0b' }, // Amber 500
  { name: 'Exact Match', value: 5, color: '#ef4444' }, // Red 500
];

export const ANCHOR_RISK_DISTRIBUTION: ChartDataPoint[] = [
  { name: 'Seguro (0-19%)', value: 70, color: '#10b981' }, // Emerald 500
  { name: 'Precaución (20-39%)', value: 25, color: '#f59e0b' }, // Amber 500
  { name: 'Riesgo (>40%)', value: 5, color: '#ef4444' }, // Red 500
];

export const MOCK_KEYWORDS_LIST: KeywordData[] = [
  {
    id: 'kw-1',
    term: 'curso sat online mexico',
    volume: 12500,
    kd: 45,
    potentialTraffic: 5400,
    status: 'top_3',
    secondaryKeywords: ['preparacion sat', 'examen sat fechas', 'asesoria universitaria']
  },
  {
    id: 'kw-2',
    term: 'mejores universidades estados unidos',
    volume: 8200,
    kd: 32,
    potentialTraffic: 3100,
    status: 'in_progress',
    secondaryKeywords: ['ranking universidades ivy league', 'becas usa', 'admission counseling']
  },
  {
    id: 'kw-3',
    term: 'common app essay tips',
    volume: 45000,
    kd: 78,
    potentialTraffic: 1200,
    status: 'opportunity',
    secondaryKeywords: ['ejemplos ensayos', 'common app guia', 'college essay guy español']
  },
  {
    id: 'kw-4',
    term: 'educa college prep opiniones',
    volume: 3200,
    kd: 15,
    potentialTraffic: 2800,
    status: 'top_3',
    secondaryKeywords: ['testimonios educa', 'resultados sat alumnos', 'contacto educa college']
  }
];

// --- ACTIVITY LOG DATA ---

export const MOCK_ACTIVITY_LOG: ActivityLogItem[] = [
  {
    id: 'log-1',
    date: 'Nov 01, 2023',
    title: 'Objetivo de Q1 completado',
    description: 'Se alcanzó el KPI de Score > 90 en Core Web Vitals.',
    type: 'milestone',
    user: 'System'
  },
  {
    id: 'log-2',
    date: 'Oct 28, 2023',
    title: 'Nuevo Backlink Tier 1',
    description: 'Mención detectada en Forbes.com con anchor "preparación universitaria".',
    type: 'backlink',
    user: 'Crawler'
  },
  {
    id: 'log-3',
    date: 'Oct 24, 2023',
    title: 'Optimización de Contenido',
    description: 'Actualización de metadatos y H1 en landing de producto SAT.',
    type: 'content',
    user: 'Ana (Content)'
  },
  {
    id: 'log-4',
    date: 'Oct 15, 2023',
    title: 'Ajuste de robots.txt',
    description: 'Bloqueo de parámetros de búsqueda para optimizar crawl budget.',
    type: 'technical',
    user: 'Carlos (Dev)'
  }
];

// --- NEW ASSET GRID DATA (RankUnit) ---

export const MOCK_ASSETS: AssetItem[] = [
  {
    id: 'asset-1',
    title: 'Guía Completa SAT',
    url: '/guia-completa-para-entender-el-sat-2025',
    lastMod: '27 Jan 2025',
    focusKeyword: 'que es el sat',
    rank: 5,
    status: 'needs_update',
    opportunity: 'Agregar sección de fechas 2026',
    healthScore: 65,
    country: 'MX'
  },
  {
    id: 'asset-2',
    title: 'Best Ivy League Universities',
    url: '/best-ivy-league-universities',
    lastMod: '15 Jan 2025',
    focusKeyword: 'ivy league rankings',
    rank: 2,
    status: 'performing',
    opportunity: 'Expand scholarship section',
    healthScore: 92,
    country: 'US'
  },
  {
    id: 'asset-3',
    title: 'Consejos Ensayo Common App',
    url: '/consejos-ensayo-common-app',
    lastMod: '10 Feb 2025',
    focusKeyword: 'common app essay',
    rank: 12,
    status: 'indexing',
    opportunity: 'Faltan enlaces internos',
    healthScore: 78,
    country: 'ES'
  },
  {
    id: 'asset-4',
    title: 'Becas Deportivas USA',
    url: '/becas-deportivas-estados-unidos',
    lastMod: '05 Feb 2025',
    focusKeyword: 'becas deportivas usa',
    rank: '--',
    status: 'critical',
    opportunity: 'Contenido duplicado detectado',
    healthScore: 45,
    country: 'CO'
  }
];

export const MOCK_CANNIBALIZATION: CannibalizationItem[] = [
  {
    keyword: 'curso sat online',
    primaryUrl: '/curso-sat-online-mexico',
    primaryRank: 6,
    conflictingUrl: '/clases-sat-virtuales',
    conflictingRank: 11,
    impact: 'high'
  },
  {
    keyword: 'examenes de prueba sat',
    primaryUrl: '/recursos/examen-diagnostico-sat',
    primaryRank: 4,
    conflictingUrl: '/blog/como-es-el-examen-sat',
    conflictingRank: 8,
    impact: 'medium'
  }
];

export const MOCK_GAP_ANALYSIS: CompetitorMetric[] = [
  { metric: 'Domain Authority', us: 45, top3Avg: 62, diff: -17, unit: '' },
  { metric: 'Backlinks (Dofollow)', us: 120, top3Avg: 350, diff: -230, unit: '' },
  { metric: 'Content Length', us: '2,500', top3Avg: '1,800', diff: 700, unit: 'words' },
  { metric: 'Page Speed (Mobile)', us: 85, top3Avg: 70, diff: 15, unit: '' }
];