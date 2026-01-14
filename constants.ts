import { 
  Zap, 
  Target, 
  ShieldCheck, 
  AlertTriangle,
  FileText,
  Link as LinkIcon,
  Clock,
  Layers,
  Shield,
  Swords,
  Sprout,
  CheckSquare,
  ArrowRightLeft,
  CalendarDays,
  Scale,
  BarChart,
  Megaphone,
  BookOpen,
  FileCheck,
  TrendingUp,
  Users,
  Award,
  Handshake,
  Activity
} from 'lucide-react';
import { MetricItem, ChartDataPoint, ProjectDetails, StrategicObjective, Quarter, KeywordData, ActivityLogItem, AssetItem, CannibalizationItem, CompetitorMetric, QuickWinItem, PolicyCategory } from './types';

// --- NEW QUARTER GOALS DATA ---
export const QUARTER_GOALS = [
  {
    id: 'business',
    type: 'NEGOCIO',
    title: 'Cumplimiento de Proyección',
    description: 'Alcanzar el volumen de tráfico estimado en el "Escenario Moderado".',
    kpi: '100% Tráfico Moderado',
    measurement: 'Visitas orgánicas GA4 vs. Proyección',
    icon: TrendingUp,
    color: 'emerald',
    current: 68,
    target: 100,
    context: 'El Escenario Pesimista es el piso mínimo; el Optimista, el techo ideal.'
  },
  {
    id: 'tactical',
    type: 'TÁCTICO',
    title: 'Conquista de "Quick Wins"',
    description: 'Empujar keywords en pos. 11-30 hacia la primera página.',
    kpi: '60% KWs en Top 10',
    measurement: 'Posicionamiento Ahrefs cierre vs. inicio',
    icon: Target,
    color: 'violet',
    current: 4,
    target: 6, // 60% of 10
    total: 10,
    context: 'Captura de tráfico de calidad a corto plazo.'
  },
  {
    id: 'quality',
    type: 'CALIDAD',
    title: 'Excelencia en Activos & Marca',
    description: 'Optimización técnica, visual y UX de 10 URLs Activas.',
    kpi: '100% URLs Optimizadas',
    measurement: 'Evidencia visual "Antes y Después"',
    icon: Award,
    color: 'amber',
    current: 7,
    target: 10,
    extraMetric: '25 Horas Valor Agregado',
    context: 'Mejora en código, diseño y experiencia de usuario.'
  },
  {
    id: 'alliance',
    type: 'ALIANZA',
    title: 'Eficiencia Operativa Conjunta',
    description: 'Entregas a tiempo y validaciones ágiles para evitar bloqueos.',
    kpi: '< 7 Días Validación',
    measurement: 'Promedio días aprobación cliente',
    icon: Handshake,
    color: 'blue',
    current: 5, // Days avg
    target: 7, // Max days
    inverted: true, // Lower is better
    context: 'Entregamos contenidos con 30 días de anticipación.'
  }
];

export const GOAL_SUMMARY_TABLE = [
  { label: 'Tráfico Orgánico', goal: 'Alcanzar 12,500 visitas (Escenario Moderado)', status: 'On Track' },
  { label: 'Posicionamiento', goal: '6 Keywords nuevas en Primera Página (Top 10)', status: 'At Risk' },
  { label: 'Ejecución Técnica', goal: '10 URLs optimizadas (Velocidad + UX + Contenido)', status: 'On Track' },
  { label: 'Adquisición Enlaces', goal: '8 Backlinks de alta autoridad publicados', status: 'On Track' },
  { label: 'Valor Agregado', goal: '25 Horas invertidas en Diseño y Soporte', status: 'Completed' },
];

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
      title: 'Establecer metas claras y medibles por trimestre',
      description: 'Definir objetivos concretos y cuantificables para cada quarter, como lograr que al menos 5 palabras clave estratégicas alcancen el Top 10 de los resultados de búsqueda, asegurando que las metas sean realistas y alineadas con la estrategia general.',
      kpiTarget: '5 KW Top 10',
      status: 'in_progress'
    },
    {
      id: 'obj-2',
      title: 'Definir y monitorear KPIs específicos',
      description: 'Seleccionar indicadores clave de rendimiento (KPIs) relevantes para evaluar el desempeño del trimestre, incluyendo métricas como el crecimiento del tráfico orgánico, el aumento de conversiones y la adquisición de backlinks de calidad, permitiendo un seguimiento objetivo del progreso.',
      kpiTarget: '+Traff/Conv',
      status: 'in_progress'
    },
    {
      id: 'obj-3',
      title: 'Alinear expectativas con el cliente',
      description: 'Comunicar de manera clara los objetivos del quarter para que el cliente comprenda exactamente qué resultados se esperan alcanzar en un plazo de 90 días y cómo se medirá el éxito de la estrategia.',
      kpiTarget: 'Aprobación 100%',
      status: 'done'
    },
    {
      id: 'obj-4',
      title: 'Delimitar la duración del periodo de trabajo',
      description: 'Establecer una duración fija de tres meses para cada quarter (Q1, Q2, Q3 y Q4), facilitando una planificación estructurada, evaluaciones periódicas y ajustes estratégicos al finalizar cada ciclo.',
      kpiTarget: 'Ciclo 90 Días',
      status: 'todo'
    }
  ],
  Q2: [
    {
      id: 'obj-5',
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

// --- MOCK QUICK WINS DATA (Educa College Prep Context) ---
export const MOCK_QUICK_WINS: QuickWinItem[] = [
  {
    id: 'qw-1',
    keyword: 'fechas sat 2025',
    description: 'Calendario oficial de College Board y deadlines de registro.',
    volume: 5400,
    difficulty: 12,
    country: 'México',
    potentialTraffic: 3200,
    parentKeyword: 'examen sat',
    initialRank: 14,
    targetRank: 3,
    secondaryKeywords: ['cuando es el sat', 'fechas registro sat', 'sat mexico fechas'],
    status: 'IN PROGRESS'
  },
  {
    id: 'qw-2',
    keyword: 'becas harvard mexicanos',
    description: 'Guía de ayuda financiera para estudiantes de México.',
    volume: 2100,
    difficulty: 28,
    country: 'México',
    potentialTraffic: 1500,
    initialRank: 11,
    targetRank: 5,
    secondaryKeywords: ['requisitos beca harvard', 'costo harvard para mexicanos', 'ayuda financiera usa'],
    status: 'IN PROGRESS'
  },
  {
    id: 'qw-3',
    keyword: 'estructura examen sat',
    description: 'Desglose del formato Digital SAT y tiempos por sección.',
    volume: 1800,
    difficulty: 8,
    country: 'Latam',
    potentialTraffic: 950,
    parentKeyword: 'que es el sat',
    initialRank: 18,
    targetRank: 4,
    secondaryKeywords: ['sat digital formato', 'modulos sat matematicas', 'lectura y redaccion sat'],
    status: 'IN PROGRESS'
  },
  {
    id: 'qw-4',
    keyword: 'common app essay prompt',
    description: 'Consejos para los 7 temas del ensayo principal 2025-2026.',
    volume: 8900,
    difficulty: 35,
    country: 'Global',
    potentialTraffic: 2100,
    parentKeyword: 'common app',
    initialRank: 15,
    targetRank: 7,
    secondaryKeywords: ['ejemplos ensayo common app', 'tips essay college', 'como escribir essay'],
    status: 'IN PROGRESS'
  }
];

// --- OPERATIONAL POLICIES DATA ---
export const OPERATIONAL_POLICIES: PolicyCategory[] = [
  {
    id: 'scope',
    title: 'Alcance y Límites Contractuales',
    icon: Scale,
    colorClass: 'text-indigo-400',
    content: [
      {
        subtitle: 'Core Keywords',
        text: 'Son definidas al inicio de la estrategia Global y permanecen fijas durante todo el año. Los cambios sólo son posibles en transiciones entre Q4 → Q1 del año siguiente, previo análisis estratégico documentado y aprobado por el cliente 30 días antes del cierre del quarter.'
      },
      {
        subtitle: 'Quick Wins',
        text: 'Cada quarter admite un máximo de 10 keywords Quick Win. Una vez iniciado el quarter, no se admiten adiciones. Las nuevas oportunidades detectadas se documentan para el siguiente quarter.'
      },
      {
        subtitle: 'Objetivo Principal',
        text: "El objetivo principal del quarter (ej: 'Posicionar 5 keywords en Top 10') se define en el kickoff del quarter y es inmodificable hasta el cierre. Cualquier cambio de objetivo principal invalida las métricas de cumplimiento acordadas y requiere un nuevo acuerdo de resultados esperados, con extensión del timeline."
      },
      {
        subtitle: 'Capacidad de URLs',
        list: [
          'Cada quarter tiene capacidad para trabajar un máximo de 10 URLs activas (5 Core + 5 Quick Win/Nuevas).',
          'Aprobación de presupuesto adicional para URLs extra.',
          'Extensión proporcional del timeline.',
          'Priorización: se debe pausar una URL existente para agregar una nueva.'
        ]
      }
    ]
  },
  {
    id: 'projections',
    title: 'Proyecciones y Expectativas',
    icon: BarChart,
    colorClass: 'text-emerald-400',
    content: [
      {
        text: 'El desempeño SEO se evalúa mediante proyecciones trimestrales, alineadas con la dinámica algorítmica de Google. Trabajamos con tres escenarios:'
      },
      {
        subtitle: 'Escenarios de Proyección',
        list: [
          'Pesimista: contempla core updates desfavorables, intensificación de la competencia y bloqueos operativos.',
          'Moderado: asume ejecución estándar sin eventos externos disruptivos.',
          'Optimista: considera ejecución óptima y ventanas algorítmicas favorables.'
        ]
      },
      {
        subtitle: 'Fórmulas de Proyección',
        formula: [
          'Pesimista: (Volumen Total × CTR Actual × 0.7) = Tráfico Mínimo',
          'Moderado: (Volumen Total × CTR Objetivo Promedio) = Tráfico Esperado',
          'Optimista: (Volumen Total × CTR Top 3 × 1.3) = Tráfico Máximo'
        ]
      },
      {
        highlight: 'Cláusula Crítica: La evaluación de resultados se hará contra el escenario moderado al cierre del quarter. Los resultados mensuales son informativos y no constituyen indicadores de éxito/fracaso finales.'
      }
    ]
  },
  {
    id: 'performance',
    title: 'Desempeño del Proyecto',
    icon: FileCheck,
    colorClass: 'text-blue-400',
    content: [
      {
        text: 'El desempeño se evalúa de manera integral en tres vertientes complementarias:'
      },
      {
        subtitle: '1. Métricas de Ejecución Operativa',
        list: [
          'Porcentaje de tareas ejecutadas conforme al plan.',
          'Backlinks adquiridos vs objetivos.',
          'Optimizaciones técnicas y de contenido implementadas.',
          'Tiempos de respuesta ante incidencias.'
        ]
      },
      {
        subtitle: '2. Métricas de Resultado',
        list: [
          'Evolución de posiciones de palabras clave estratégicas.',
          'Crecimiento y calidad del tráfico orgánico.'
        ]
      },
      {
        subtitle: '3. Métricas de Esfuerzo & Valor Agregado',
        list: [
          'Calendarización anticipada de activos.',
          'Aporte de hasta 25 horas sin costo adicional de soporte técnico.',
          'Impacto en branding y percepción de marca.'
        ]
      },
      {
        subtitle: 'Protocolo de Comunicación',
        text: 'Cualquier observación sobre el desempeño deberá canalizarse por canales formales a través del Director General para revisión de activity logs y evidencia objetiva.'
      }
    ]
  },
  {
    id: 'governance',
    title: 'Comunicación y Gobierno',
    icon: Megaphone,
    colorClass: 'text-amber-400',
    content: [
      {
        subtitle: 'Sesiones Mensuales',
        list: [
          'Sesión A (Operativa): Revisión de avances técnicos, diseño y contenido.',
          'Sesión B (Estratégica): Análisis de KPIs y definición de siguientes pasos (realizada estrictamente tras el cierre de mes).'
        ]
      },
      {
        subtitle: 'Puntualidad y Cancelación',
        list: [
          'Tolerancia máxima de 10 minutos. Pasado ese tiempo, se cancela.',
          'Cancelaciones requieren 24h de anticipación para reprogramación.',
          'Cancelaciones <24h se consideran realizadas y no se reprograman.'
        ]
      },
      {
        subtitle: 'Canales Oficiales',
        list: [
          'Hub de Tickets: Solicitudes operativas, validaciones y reportes.',
          'WhatsApp: Únicamente para alertas críticas y confirmaciones puntuales.',
          'Prioridades: Crítica (1h), Alta (4h), Media (8h), Baja (24h).'
        ]
      }
    ]
  },
  {
    id: 'content_policy',
    title: 'Creación y Validación de Contenido',
    icon: BookOpen,
    colorClass: 'text-rose-400',
    content: [
      {
        subtitle: 'Flujo de Trabajo',
        list: [
          'Entrega de contenido: 30 días naturales antes de publicación.',
          'Tiempo de validación cliente: 30 días naturales.',
          'Canal: Exclusivamente documentos compartidos en Google Docs.'
        ]
      },
      {
        subtitle: 'Responsabilidades',
        list: [
          'Cliente: Veracidad, identidad de marca y errores de forma.',
          'Agencia: Estrategia SEO, keywords, títulos y estructura (No modificables).'
        ]
      },
      {
        highlight: 'Auto-Publicación: En ausencia de validación dentro del plazo, el contenido será publicado automáticamente según criterio de la agencia. Una vez publicado, no se aceptan cambios.'
      }
    ]
  },
  {
    id: 'education',
    title: 'Educación y Alineación',
    icon: Sprout,
    colorClass: 'text-violet-400',
    content: [
      {
        text: 'La agencia brindará una sesión introductoria y recursos de apoyo. Ante decisiones estratégicas, se presentarán recomendaciones fundamentadas. Si el cliente opta por una dirección distinta, la decisión se documentará, asumiendo los resultados asociados a dicha estrategia.'
      }
    ]
  },
  {
    id: 'url_management',
    title: 'Gestión de Cambios y Priorización',
    icon: ArrowRightLeft,
    colorClass: 'text-orange-400',
    content: [
      {
        subtitle: 'Esquema de Intercambio 1x1',
        text: 'Las solicitudes de emergencia que impliquen la incorporación de nuevas URLs se gestionarán bajo un esquema de intercambio 1x1: por cada URL urgente incorporada, se reprogramará una URL planificada de peso equivalente.'
      },
      {
        subtitle: 'Nuevos Requerimientos',
        list: [
            'Se consideran nuevos requerimientos aquellas solicitudes que excedan el volumen de URLs definidas para el período.',
            'Las URLs adicionales fuera del alcance acordado serán incorporadas al Backlog del siguiente quarter (Q2) para su evaluación y priorización.'
        ]
      },
      {
        highlight: 'Gobernanza: Cualquier ajuste en la priorización de URLs será documentado y consensuado, asegurando claridad y continuidad estratégica.'
      }
    ]
  }
];