import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom'; // Added useNavigate
import { 
  Calendar, 
  CheckCircle2, 
  Clock, 
  Link as LinkIcon, 
  MoreVertical, 
  FileText, 
  Layout, 
  Target, 
  BookOpen,
  Circle,
  ChevronDown,
  ChevronUp,
  TrendingUp,
  AlertCircle,
  Flag,
  Code2,
  PenTool,
  Trophy,
  ArrowUp,
  ShieldCheck,
  Users,
  Activity,
  Sparkles,
  GitMerge,
  Lightbulb,
  BarChart2,
  ListTodo,
  ExternalLink,
  RefreshCw,
  ArrowDownRight,
  MousePointerClick,
  AlertTriangle,
  Search,
  XCircle,
  Hash,
  Type,
  AlignLeft,
  ScanSearch,
  Timer,
  Hourglass,
  Globe,
  Wrench,
  Rocket,
  Check,
  Square,
  ArrowRightLeft,
  LayoutTemplate,
  PanelLeft,
  Footprints,
  Swords, 
  Scale, 
  Bot, 
  Zap,
  Copy,
  ArrowLeft,
  Maximize2,
  Split,
  Trash2
} from 'lucide-react';
import { 
  PieChart, 
  Pie, 
  Cell, 
  ResponsiveContainer, 
  Tooltip, 
  Legend,
  LineChart,
  Line,
  XAxis,
  YAxis,
  CartesianGrid
} from 'recharts';
import { cn, formatCurrency } from '../lib/utils';
import { 
  MOCK_PROJECT, 
  MOCK_OBJECTIVES, 
  KEYWORD_DISTRIBUTION_DATA,
  ANCHOR_TEXT_DISTRIBUTION,
  ANCHOR_RISK_DISTRIBUTION,
  MOCK_KEYWORDS_LIST,
  MOCK_ACTIVITY_LOG,
  SUMMARY_EFFORT_DATA,
  SUMMARY_KEYWORD_STATUS_DATA,
  MOCK_CANNIBALIZATION, 
  MOCK_GAP_ANALYSIS    
} from '../constants';
import { Quarter, ObjectiveStatus, KeywordData, LogType } from '../types';
import { useViewMode } from '../lib/context';

// Mock Data specifically for this Asset's ranking history
const RANK_HISTORY_DATA = [
  { date: 'Nov 15', rank: 3 },
  { date: 'Dec 01', rank: 3 },
  { date: 'Dec 15', rank: 2 },
  { date: 'Jan 01', rank: 3 },
  { date: 'Jan 15', rank: 4 },
  { date: 'Feb 01', rank: 5 },
];

const ProjectDetail = () => {
  const navigate = useNavigate(); // Hook usage
  // Updated tabs state - Default back to PERFORMANCE to show Cannibalization first
  const [activeTab, setActiveTab] = useState<'performance' | 'audit' | 'links' | 'action_plan'>('performance');
  const [linksSubTab, setLinksSubTab] = useState<'external' | 'internal'>('internal'); 
  const [activeQuarter, setActiveQuarter] = useState<Quarter>('Q1');
  const [openAccordionId, setOpenAccordionId] = useState<string | null>('technical'); // Default open
  
  // State for AI Copilot
  const [aiGenerating, setAiGenerating] = useState(false);
  const [aiSuggestionVisible, setAiSuggestionVisible] = useState(false);

  // State for Cannibalization Recommendations
  const [expandedCannibalization, setExpandedCannibalization] = useState<number | null>(null);

  const { isClientMode } = useViewMode();

  // TIME TRACKER LOGIC (Simulation for 3-Month Cycle)
  // Assuming a cycle from Jan 1 to March 31
  const totalDays = 90; 
  const daysPassed = 48; // Simulating we are in mid-Feb
  const daysLeft = totalDays - daysPassed;
  const progressPercentage = (daysPassed / totalDays) * 100;

  // ACTION PLAN STATE (UPDATED WITH SPECIFIC USER REQUIREMENTS)
  const [actionPlan, setActionPlan] = useState([
    {
      id: 'technical',
      title: 'Auditoría Técnica',
      icon: Wrench,
      color: 'text-blue-400',
      tasks: [
        { label: 'Optimizar Page Speed', done: false },
        { label: 'Implementar schema markup', done: false },
        { label: 'Optimizar imágenes', done: true },
        { label: 'Resolver problemas de mobile', done: true },
        { label: 'Revisar etiquetas de ahreflang (Si aplica)', done: false },
        { label: 'Canonical correcto', done: true },
        { label: 'Redirecciones', done: true },
        { label: 'Datos estructurados', done: false },
        { label: 'Core Web Vitals', done: false },
      ]
    },
    {
      id: 'onpage',
      title: 'Auditoría SEO On-Page',
      icon: FileText,
      color: 'text-violet-400',
      tasks: [
        { label: 'Optimizar title tag', done: true },
        { label: 'Optimizar meta description', done: true },
        { label: 'Optimizar H1, H2, H3', done: true },
        { label: 'Mejorar densidad de keyword', done: false },
        { label: 'Agregar keywords secundarias', done: false },
        { label: 'Optimizar alt text de imágenes', done: false },
        { label: 'Mejorar internal linking', done: false },
      ]
    },
    {
      id: 'ux_cro',
      title: 'Auditoría de UX/CRO',
      icon: MousePointerClick,
      color: 'text-emerald-400',
      tasks: [
        { label: 'CTA flotante visible en mobile', done: false },
        { label: 'CTA principal claro y repetido estratégicamente', done: false },
        { label: 'Legibilidad optimizada (párrafos cortos y escaneables)', done: true },
        { label: 'Tabla de contenidos con anclas (Sticky TOC)', done: false },
        { label: 'Microcopy persuasivo en CTAs', done: false },
        { label: 'Prueba social cercana al CTA', done: false },
        { label: 'Video o elemento multimedia explicativo', done: false },
        { label: 'CTAs contextuales dentro del contenido', done: false },
        { label: 'Formularios cortos y de baja fricción', done: true },
        { label: 'FAQ colapsables orientadas a conversión', done: true },
      ]
    },
    {
      id: 'content_plan',
      title: 'Plan de Contenido por URL',
      icon: BookOpen,
      color: 'text-amber-400',
      tasks: [
        { label: 'Freshness (Actualización de contenido)', done: false },
        { label: 'Brecha de contenido (Content Gap)', done: false },
        { label: 'Interlinking Estratégico', done: false },
      ]
    }
  ]);

  // Derived Global Progress
  const totalTasksAll = actionPlan.reduce((acc, cat) => acc + cat.tasks.length, 0);
  const completedTasksAll = actionPlan.reduce((acc, cat) => acc + cat.tasks.filter(t => t.done).length, 0);
  const globalProgress = totalTasksAll === 0 ? 0 : Math.round((completedTasksAll / totalTasksAll) * 100);

  const handleToggleTask = (categoryId: string, taskIndex: number) => {
    setActionPlan(prev => prev.map(cat => {
      if (cat.id !== categoryId) return cat;
      const newTasks = [...cat.tasks];
      newTasks[taskIndex] = { ...newTasks[taskIndex], done: !newTasks[taskIndex].done };
      return { ...cat, tasks: newTasks };
    }));
  };

  const getStatusColor = (status: ObjectiveStatus) => {
    switch(status) {
      case 'done': return 'bg-emerald-400/10 text-emerald-400 border-emerald-400/20';
      case 'in_progress': return 'bg-blue-400/10 text-blue-400 border-blue-400/20';
      case 'todo': return 'bg-slate-800 text-slate-400 border-slate-700';
    }
  };

  const toggleAccordion = (id: string) => {
    setOpenAccordionId(openAccordionId === id ? null : id);
  };
  
  const toggleCannibalization = (index: number) => {
    setExpandedCannibalization(expandedCannibalization === index ? null : index);
  };

  const handleAiGenerate = () => {
    setAiGenerating(true);
    setTimeout(() => {
      setAiGenerating(false);
      setAiSuggestionVisible(true);
    }, 1500);
  };

  // Helper for Cannibalization Content
  const getCannibalizationStrategy = (index: number) => {
    if (index === 0) {
        return {
            title: "Consolidación de Autoridad (301)",
            description: "Ambas URLs compiten por intención transaccional. La URL #11 carece de enlaces externos únicos.",
            steps: [
                { icon: GitMerge, text: "Implementar Redirect 301 desde /clases-sat-virtuales hacia /curso-sat-online-mexico" },
                { icon: FileText, text: "Migrar párrafos de valor (FAQ y Testimonios) de la URL antigua a la URL destino." },
                { icon: LinkIcon, text: "Actualizar enlaces internos del menú principal para apuntar a la URL ganadora." }
            ]
        };
    }
    return {
        title: "Diferenciación de Intención (De-optimization)",
        description: "El blog post está rankeando para una keyword transaccional. Debemos enfocarlo a 'Top of Funnel'.",
        steps: [
            { icon: Type, text: "Modificar Title Tag del blog para enfocar en 'Guía' o 'Tips' en lugar de 'Prueba'." },
            { icon: Square, text: "Eliminar la keyword exacta 'examenes de prueba' del H1 y primeros 100 caracteres." },
            { icon: ArrowUp, text: "Agregar enlace interno exact-match desde el Blog hacia la Landing Page de Recursos." }
        ]
    };
  };

  return (
    <div className="space-y-6 animate-in fade-in slide-in-from-bottom-4 duration-500">
      
      {/* Back Navigation Button */}
      <div className="flex items-center gap-2">
         <button 
           onClick={() => navigate(-1)}
           className="flex items-center gap-2 px-3 py-2 -ml-2 rounded-lg text-slate-400 hover:text-white hover:bg-slate-800 transition-all group"
         >
           <ArrowLeft className="h-5 w-5 group-hover:-translate-x-1 transition-transform" />
           <span className="text-sm font-medium">Volver al Inventario</span>
         </button>
      </div>

      {/* 1. ASSET HEADER */}
      <div className="bg-slate-900 border border-slate-800 rounded-xl p-6 shadow-sm">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-6 items-start">
          
          {/* Left: Asset Info (Col Span 5) */}
          <div className="lg:col-span-5 space-y-3">
            <div>
                <h1 className="text-2xl font-bold text-white tracking-tight leading-tight">
                  Guía Completa para entender el SAT
                </h1>
                <a href="#" className="text-slate-400 text-sm mt-1 hover:text-violet-400 transition-colors flex items-center gap-1 group w-fit">
                   educacollegeprep.com/blog/guia-completa-sat
                   <ExternalLink className="h-3 w-3 opacity-50 group-hover:opacity-100" />
                </a>
            </div>

            <div className="flex flex-wrap items-center gap-3 pt-1">
               {/* Focus KW Badge */}
               <div className="flex items-center gap-2 px-3 py-1 rounded-md bg-slate-950 border border-slate-800 shadow-sm">
                  <span className="text-[10px] text-slate-500 font-bold uppercase tracking-wider">Focus KW:</span>
                  <span className="text-xs text-slate-200 font-mono border-l border-slate-800 pl-2">"que es el sat"</span>
               </div>
               
               {/* Status Badge */}
               <div className="flex items-center gap-1.5 px-3 py-1 rounded-md bg-amber-500/10 border border-amber-500/20 shadow-sm">
                  <RefreshCw className="h-3.5 w-3.5 text-amber-400" />
                  <span className="text-xs font-semibold text-amber-400">Needs Update</span>
               </div>
            </div>
          </div>

          {/* Middle: 3-Month Cycle Timer (Col Span 4) */}
          <div className="lg:col-span-4 bg-slate-950/50 rounded-xl border border-slate-800 p-4 relative overflow-hidden group">
              {/* Background Glow */}
              <div className="absolute top-0 right-0 w-32 h-32 bg-violet-500/5 blur-3xl rounded-full pointer-events-none"></div>

              <div className="flex justify-between items-start mb-3">
                 <div className="flex items-center gap-2">
                    <div className="p-1.5 bg-slate-900 rounded border border-slate-800 text-violet-400">
                       <Timer className="h-4 w-4" />
                    </div>
                    <div>
                       <span className="text-xs font-bold text-slate-300 uppercase tracking-wide block">Ciclo Q1 2025</span>
                       <span className="text-[10px] text-slate-500">Resultados a 3 Meses</span>
                    </div>
                 </div>
                 <div className="text-right">
                    <span className="text-xl font-bold text-white block leading-none">{daysLeft}</span>
                    <span className="text-[10px] text-slate-400 font-medium uppercase">Días Restantes</span>
                 </div>
              </div>

              {/* Progress Bar Container */}
              <div className="relative pt-2 pb-1">
                 {/* Timeline Labels */}
                 <div className="flex justify-between text-[10px] text-slate-500 font-mono mb-1.5">
                    <span>Inicio (Ene 1)</span>
                    <span>Fin (Mar 31)</span>
                 </div>
                 
                 {/* Bar */}
                 <div className="h-2 w-full bg-slate-900 rounded-full overflow-hidden border border-slate-800">
                    <div 
                       className="h-full bg-gradient-to-r from-violet-600 to-indigo-500 rounded-full relative"
                       style={{ width: `${progressPercentage}%` }}
                    >
                       {/* Pulse Effect at the tip */}
                       <div className="absolute right-0 top-1/2 -translate-y-1/2 translate-x-1/2 w-3 h-3 bg-white/20 rounded-full animate-ping"></div>
                       <div className="absolute right-0 top-1/2 -translate-y-1/2 translate-x-1/2 w-1.5 h-1.5 bg-white rounded-full shadow-[0_0_10px_rgba(255,255,255,0.8)]"></div>
                    </div>
                 </div>
              </div>
          </div>

          {/* Right: Optimization Score (Col Span 3) */}
          <div className="lg:col-span-3 space-y-3 bg-slate-950/50 p-4 rounded-xl border border-slate-800 h-full flex flex-col justify-center">
              <div className="flex justify-between items-end">
                <span className="text-sm font-medium text-slate-400">Score de Optimización</span>
                <span className="text-xl font-bold text-emerald-400">65<span className="text-slate-600 text-sm font-normal">/100</span></span>
              </div>
              <div className="h-2.5 w-full bg-slate-900 rounded-full overflow-hidden border border-slate-800 relative">
                 {/* Background grid lines for bar */}
                 <div className="absolute inset-0 flex justify-between px-1">
                    <div className="w-px h-full bg-slate-800/50"></div>
                    <div className="w-px h-full bg-slate-800/50"></div>
                    <div className="w-px h-full bg-slate-800/50"></div>
                 </div>
                <div 
                  className="h-full bg-emerald-500 shadow-[0_0_12px_rgba(16,185,129,0.4)] transition-all duration-1000 ease-out relative z-10" 
                  style={{ width: `65%` }}
                />
              </div>
              <div className="flex justify-between text-[10px] text-slate-600 font-medium uppercase tracking-wide">
                  <span>Critical</span>
                  <span>Good</span>
                  <span>Perfect</span>
              </div>
          </div>

        </div>
      </div>

      {/* 2. Navigation Tabs */}
      <div className="border-b border-slate-800 sticky top-16 bg-slate-950/95 backdrop-blur z-30 pt-2">
        <nav className="flex space-x-8" aria-label="Tabs">
          {[
            { id: 'performance', label: 'Rendimiento', icon: BarChart2 },
            { id: 'audit', label: 'Auditoría On-Page', icon: FileText },
            { id: 'links', label: 'Perfil de Enlaces', icon: LinkIcon },
            { id: 'action_plan', label: 'Plan de Acción', icon: ListTodo },
          ].map((tab) => (
            <button
              key={tab.id}
              onClick={() => setActiveTab(tab.id as any)}
              className={cn(
                "group flex items-center py-4 px-1 border-b-2 font-medium text-sm transition-all",
                activeTab === tab.id
                  ? "border-violet-500 text-violet-400"
                  : "border-transparent text-slate-400 hover:text-slate-200 hover:border-slate-700"
              )}
            >
              <tab.icon className={cn(
                "mr-2 h-4 w-4",
                activeTab === tab.id ? "text-violet-400" : "text-slate-500 group-hover:text-slate-300"
              )} />
              {tab.label}
            </button>
          ))}
        </nav>
      </div>

      {/* 3. Tab Content Area */}
      <div className="min-h-[400px]">
        
        {/* TAB: PERFORMANCE */}
        {activeTab === 'performance' && (
          <div className="space-y-6 animate-in fade-in slide-in-from-bottom-2">
            
            {/* ROW 1: Metrics & Ranking History (ENHANCED CARDS) */}
            <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
              {/* Card 1: Posición */}
              <div className="relative group bg-slate-900 border border-slate-800 rounded-2xl p-6 transition-all duration-300 hover:border-violet-500/50 hover:shadow-[0_0_30px_rgba(139,92,246,0.15)] hover:-translate-y-1">
                {/* Inner Gradient */}
                <div className="absolute inset-0 bg-gradient-to-br from-violet-500/5 via-transparent to-transparent opacity-0 group-hover:opacity-100 transition-opacity rounded-2xl"></div>
                
                <div className="relative z-10">
                   <div className="flex justify-between items-start mb-4">
                     <div className="p-3 rounded-xl bg-slate-950 border border-slate-800 group-hover:bg-violet-500/10 group-hover:border-violet-500/30 transition-colors">
                       <Trophy className="h-6 w-6 text-violet-500 group-hover:text-violet-400" />
                     </div>
                     <span className="flex items-center gap-1 text-[10px] font-bold uppercase tracking-wider text-rose-400 bg-rose-500/10 px-2 py-1 rounded border border-rose-500/20">
                       <ArrowDownRight className="h-3 w-3" /> 2 POS
                     </span>
                   </div>
                   <div>
                     <span className="text-slate-400 text-xs font-bold uppercase tracking-widest">Posición Actual</span>
                     <h3 className="text-4xl font-black text-white mt-2 group-hover:text-violet-100 transition-colors">#5</h3>
                     <p className="text-xs text-slate-500 mt-2 flex items-center gap-1.5">
                       <Target className="h-3 w-3 text-violet-400" /> Objetivo Trimestral: <span className="text-slate-300 font-bold">Top 3</span>
                     </p>
                   </div>
                </div>
              </div>

              {/* Card 2: Tráfico */}
              <div className="relative group bg-slate-900 border border-slate-800 rounded-2xl p-6 transition-all duration-300 hover:border-blue-500/50 hover:shadow-[0_0_30px_rgba(59,130,246,0.15)] hover:-translate-y-1">
                <div className="absolute inset-0 bg-gradient-to-br from-blue-500/5 via-transparent to-transparent opacity-0 group-hover:opacity-100 transition-opacity rounded-2xl"></div>
                
                <div className="relative z-10">
                   <div className="flex justify-between items-start mb-4">
                     <div className="p-3 rounded-xl bg-slate-950 border border-slate-800 group-hover:bg-blue-500/10 group-hover:border-blue-500/30 transition-colors">
                       <Users className="h-6 w-6 text-blue-500 group-hover:text-blue-400" />
                     </div>
                     <span className="flex items-center gap-1 text-[10px] font-bold uppercase tracking-wider text-slate-400 bg-slate-800 px-2 py-1 rounded border border-slate-700">
                       Estable
                     </span>
                   </div>
                   <div>
                     <span className="text-slate-400 text-xs font-bold uppercase tracking-widest">Tráfico Mensual (SEO)</span>
                     <h3 className="text-4xl font-black text-white mt-2 group-hover:text-blue-100 transition-colors">450</h3>
                     <p className="text-xs text-slate-500 mt-2">
                       Aporta el <span className="text-blue-400 font-bold">8%</span> del tráfico total del blog
                     </p>
                   </div>
                </div>
              </div>

              {/* Card 3: CTR */}
              <div className="relative group bg-slate-900 border border-slate-800 rounded-2xl p-6 transition-all duration-300 hover:border-amber-500/50 hover:shadow-[0_0_30px_rgba(245,158,11,0.15)] hover:-translate-y-1">
                <div className="absolute inset-0 bg-gradient-to-br from-amber-500/5 via-transparent to-transparent opacity-0 group-hover:opacity-100 transition-opacity rounded-2xl"></div>
                
                <div className="relative z-10">
                   <div className="flex justify-between items-start mb-4">
                     <div className="p-3 rounded-xl bg-slate-950 border border-slate-800 group-hover:bg-amber-500/10 group-hover:border-amber-500/30 transition-colors">
                       <MousePointerClick className="h-6 w-6 text-amber-500 group-hover:text-amber-400" />
                     </div>
                     <span className="flex items-center gap-1 text-[10px] font-bold uppercase tracking-wider text-amber-400 bg-amber-500/10 px-2 py-1 rounded border border-amber-500/20">
                       <AlertTriangle className="h-3 w-3" /> Bajo
                     </span>
                   </div>
                   <div>
                     <span className="text-slate-400 text-xs font-bold uppercase tracking-widest">Click Through Rate</span>
                     <h3 className="text-4xl font-black text-white mt-2 group-hover:text-amber-100 transition-colors">2.1%</h3>
                     <button className="text-xs text-amber-400 mt-2 hover:text-amber-300 font-bold uppercase tracking-wide flex items-center gap-1 group/btn">
                       Mejorar Meta Title <ArrowRightLeft className="h-3 w-3 group-hover/btn:translate-x-1 transition-transform" />
                     </button>
                   </div>
                </div>
              </div>
            </div>

            {/* NEW SECTION 1: CANNIBALIZATION MONITOR (INTERACTIVE) */}
            <div className="bg-slate-900 border border-slate-800 rounded-xl p-6 relative overflow-hidden">
               <div className="absolute top-0 right-0 p-4 opacity-10">
                  <Swords className="h-24 w-24 text-rose-500" />
               </div>
               
               <h3 className="text-base font-bold text-white mb-6 flex items-center gap-2">
                  <Swords className="h-5 w-5 text-rose-400" />
                  Monitor de Canibalización
                  <span className="text-xs font-normal text-slate-500 bg-slate-950 border border-slate-800 px-2 py-0.5 rounded ml-2">2 Conflictos detectados</span>
               </h3>

               <div className="space-y-4">
                  {MOCK_CANNIBALIZATION.map((item, idx) => {
                    const isExpanded = expandedCannibalization === idx;
                    const strategy = getCannibalizationStrategy(idx);
                    
                    return (
                    <div key={idx} className={cn(
                        "bg-slate-950/50 border rounded-xl overflow-hidden transition-all duration-300",
                        isExpanded ? "border-rose-500/30 bg-slate-950 shadow-[0_0_20px_rgba(244,63,94,0.1)]" : "border-slate-800 hover:border-slate-700"
                    )}>
                       <div className="p-5 flex flex-col md:flex-row gap-6 items-center">
                           {/* Keyword & Impact */}
                           <div className="min-w-[180px]">
                              <span className="text-xs text-slate-500 uppercase font-bold tracking-wider block mb-1">Keyword Conflicto</span>
                              <div className="flex items-center gap-2">
                                 <span className="text-slate-200 font-medium font-mono text-sm bg-slate-900 px-2 py-1 rounded border border-slate-800">
                                    "{item.keyword}"
                                 </span>
                              </div>
                              <div className="mt-2">
                                 {item.impact === 'high' && (
                                    <span className="text-[10px] font-bold text-rose-400 bg-rose-500/10 border border-rose-500/20 px-2 py-1 rounded uppercase tracking-wide">Alto Impacto</span>
                                 )}
                                 {item.impact === 'medium' && (
                                    <span className="text-[10px] font-bold text-amber-400 bg-amber-500/10 border border-amber-500/20 px-2 py-1 rounded uppercase tracking-wide">Impacto Medio</span>
                                 )}
                              </div>
                           </div>

                           {/* Visual Battle */}
                           <div className="flex-1 w-full flex items-center justify-center gap-4">
                              {/* Primary URL */}
                              <div className="text-center group/url">
                                 <div className="text-[10px] text-slate-500 uppercase tracking-wider mb-1">Target URL</div>
                                 <div className="bg-emerald-500/5 border border-emerald-500/20 p-3 rounded-lg min-w-[140px] group-hover/url:bg-emerald-500/10 transition-colors">
                                    <div className="text-xs text-emerald-400 font-mono truncate max-w-[120px] mx-auto">{item.primaryUrl}</div>
                                    <div className="text-xl font-bold text-white mt-1">#{item.primaryRank}</div>
                                 </div>
                              </div>

                              {/* VS Icon */}
                              <div className="text-slate-700 font-black italic text-lg relative">
                                  VS
                                  <div className="absolute inset-0 blur-sm text-rose-500/20">VS</div>
                              </div>

                              {/* Conflicting URL */}
                              <div className="text-center group/url">
                                 <div className="text-[10px] text-slate-500 uppercase tracking-wider mb-1">Cannibal URL</div>
                                 <div className="bg-rose-500/5 border border-rose-500/20 p-3 rounded-lg min-w-[140px] group-hover/url:bg-rose-500/10 transition-colors">
                                    <div className="text-xs text-rose-400 font-mono truncate max-w-[120px] mx-auto">{item.conflictingUrl}</div>
                                    <div className="text-xl font-bold text-white mt-1">#{item.conflictingRank}</div>
                                 </div>
                              </div>
                           </div>

                           {/* Action */}
                           <div className="w-full md:w-auto text-center">
                              <button 
                                onClick={() => toggleCannibalization(idx)}
                                className={cn(
                                    "text-xs px-4 py-2.5 rounded-lg border transition-all font-medium flex items-center justify-center gap-2 min-w-[160px]",
                                    isExpanded 
                                        ? "bg-slate-800 text-white border-slate-600" 
                                        : "bg-slate-900 text-slate-300 border-slate-700 hover:text-white hover:border-violet-500 hover:shadow-[0_0_15px_rgba(139,92,246,0.2)]"
                                )}>
                                 {isExpanded ? 'Ocultar Estrategia' : 'Ver Recomendación'} 
                                 <ChevronDown className={cn("h-3 w-3 transition-transform", isExpanded && "rotate-180")} />
                              </button>
                           </div>
                       </div>

                       {/* EXPANDABLE RECOMMENDATION PANEL */}
                       {isExpanded && (
                           <div className="border-t border-slate-800 bg-slate-900/30 animate-in slide-in-from-top-2 duration-300">
                               <div className="p-6 grid grid-cols-1 md:grid-cols-3 gap-6">
                                   {/* Left: Diagnosis */}
                                   <div className="col-span-1 space-y-3">
                                       <div className="flex items-center gap-2 text-rose-400 font-bold text-sm uppercase tracking-wide">
                                           <Activity className="h-4 w-4" /> Diagnóstico
                                       </div>
                                       <p className="text-sm text-slate-400 leading-relaxed">
                                           {strategy.description}
                                       </p>
                                       <div className="mt-4 p-3 bg-slate-950 rounded border border-slate-800">
                                           <div className="text-[10px] text-slate-500 uppercase mb-1">Acción Recomendada</div>
                                           <div className="text-sm font-bold text-white flex items-center gap-2">
                                               <Split className="h-4 w-4 text-violet-400" />
                                               {strategy.title}
                                           </div>
                                       </div>
                                   </div>

                                   {/* Right: Technical Protocol */}
                                   <div className="col-span-2 bg-slate-950 border border-slate-800 rounded-xl p-5 relative overflow-hidden">
                                       {/* Decor */}
                                       <div className="absolute top-0 right-0 p-3 opacity-20">
                                           <Code2 className="h-12 w-12 text-slate-600" />
                                       </div>
                                       
                                       <h4 className="text-sm font-bold text-slate-200 mb-4 flex items-center gap-2">
                                           <Code2 className="h-4 w-4 text-emerald-400" />
                                           Protocolo de Resolución Técnica
                                       </h4>
                                       
                                       <div className="space-y-3">
                                           {strategy.steps.map((step, sIdx) => (
                                               <div key={sIdx} className="flex items-start gap-3 text-sm group/step">
                                                   <div className="mt-0.5 p-1 rounded bg-slate-900 border border-slate-800 text-slate-400 group-hover/step:text-violet-400 group-hover/step:border-violet-500/50 transition-colors">
                                                       <step.icon className="h-3.5 w-3.5" />
                                                   </div>
                                                   <span className="text-slate-400 group-hover/step:text-slate-200 transition-colors">
                                                       {step.text}
                                                   </span>
                                               </div>
                                           ))}
                                       </div>

                                       <div className="mt-5 flex items-center gap-3 pt-4 border-t border-slate-800/50">
                                           <button className="text-xs bg-violet-600 hover:bg-violet-500 text-white px-3 py-1.5 rounded font-medium shadow-lg shadow-violet-500/20 transition-all flex items-center gap-2">
                                               <Check className="h-3 w-3" /> Marcar Resuelto
                                           </button>
                                           <button className="text-xs text-slate-400 hover:text-white px-3 py-1.5 rounded hover:bg-slate-900 transition-colors flex items-center gap-2">
                                               <ExternalLink className="h-3 w-3" /> Ver Documentación
                                           </button>
                                       </div>
                                   </div>
                               </div>
                           </div>
                       )}
                    </div>
                  );})}
               </div>
            </div>

            {/* Ranking History Chart (Updated Select Style) */}
            <div className="bg-slate-900 border border-slate-800 rounded-xl p-6">
               <div className="flex items-center justify-between mb-6">
                 <h3 className="text-sm font-bold text-white flex items-center gap-2">
                    <TrendingUp className="h-4 w-4 text-violet-400" />
                    Evolución de Ranking: "que es el sat"
                  </h3>
                  <div className="relative">
                      <select className="appearance-none bg-slate-950 border border-slate-800 text-xs text-slate-300 rounded-lg px-4 py-2 pr-8 focus:outline-none focus:ring-1 focus:ring-violet-500 focus:border-violet-500 cursor-pointer hover:bg-slate-900 transition-colors">
                        <option>Últimos 3 meses</option>
                        <option>Últimos 6 meses</option>
                        <option>Año Completo</option>
                      </select>
                      <ChevronDown className="absolute right-2 top-1/2 -translate-y-1/2 h-3.5 w-3.5 text-slate-500 pointer-events-none" />
                  </div>
               </div>
               
               <div className="h-[300px] w-full">
                  <ResponsiveContainer width="100%" height="100%">
                    <LineChart data={RANK_HISTORY_DATA} margin={{ top: 10, right: 30, left: 0, bottom: 0 }}>
                      <CartesianGrid strokeDasharray="3 3" stroke="#1e293b" vertical={false} />
                      <XAxis 
                        dataKey="date" 
                        stroke="#64748b" 
                        fontSize={12} 
                        tickLine={false} 
                        axisLine={false}
                        dy={10}
                      />
                      <YAxis 
                        stroke="#64748b" 
                        fontSize={12} 
                        tickLine={false} 
                        axisLine={false} 
                        reversed={true} 
                        domain={[1, 20]}
                        dx={-10}
                      />
                      <Tooltip 
                        contentStyle={{ backgroundColor: '#020617', borderColor: '#1e293b', borderRadius: '0.5rem', color: '#f8fafc' }}
                        itemStyle={{ color: '#a78bfa' }}
                        labelStyle={{ color: '#94a3b8' }}
                      />
                      <Line 
                        type="monotone" 
                        dataKey="rank" 
                        stroke="#8b5cf6" 
                        strokeWidth={3} 
                        activeDot={{ r: 6, fill: '#8b5cf6', stroke: '#fff' }}
                        dot={{ r: 4, fill: '#1e293b', stroke: '#8b5cf6', strokeWidth: 2 }} 
                      />
                    </LineChart>
                  </ResponsiveContainer>
               </div>
            </div>
          </div>
        )}
        
        {/* TAB: AUDIT (RESTORED + NEW FEATURES) */}
        {activeTab === 'audit' && (
          <div className="space-y-6 animate-in fade-in slide-in-from-bottom-2">
            
            {/* Meta Analysis (Existing) */}
            <div className="bg-slate-900 border border-slate-800 rounded-xl p-6">
                <h3 className="text-sm font-bold text-white mb-6 flex items-center gap-2">
                   <ScanSearch className="h-4 w-4 text-blue-400" />
                   Simulación de Snippet & Meta Tags
                </h3>
                
                <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
                    <div className="lg:col-span-2">
                        <div className="bg-white rounded-lg p-5 font-sans shadow-sm border border-slate-700/50 relative overflow-hidden">
                           <div className="absolute top-2 right-2 text-[10px] font-bold text-slate-300 uppercase tracking-widest pointer-events-none">
                              Google Preview
                           </div>
                           <div className="flex items-center gap-3 mb-2">
                              <div className="w-7 h-7 bg-slate-100 rounded-full flex items-center justify-center text-[10px] text-slate-500 border border-slate-200">EC</div>
                              <div className="flex flex-col leading-tight">
                                 <span className="text-sm text-slate-800 font-medium">Educa College Prep</span>
                                 <span className="text-xs text-slate-500">https://educacollegeprep.com › blog › guia-sat</span>
                              </div>
                           </div>
                           <h4 className="text-xl text-[#1a0dab] hover:underline cursor-pointer mb-1 leading-snug">
                             Guía SAT 2024: Todo lo que necesitas saber | Educa College Prep
                           </h4>
                           <p className="text-sm text-[#4d5156] leading-relaxed">
                             Aprende qué es el examen SAT, estructura y puntajes. Prepárate para las admisiones...
                           </p>
                        </div>
                    </div>
                    <div className="space-y-4">
                        <div className="p-4 bg-slate-950 border border-slate-800 rounded-lg">
                           <div className="flex items-start gap-3">
                              <div className="mt-0.5"><AlertTriangle className="h-5 w-5 text-amber-400" /></div>
                              <div>
                                 <h5 className="text-sm font-semibold text-white">Title Tag Desactualizado</h5>
                                 <p className="text-xs text-slate-400 mt-1 leading-relaxed">
                                   Detectamos el año <span className="font-mono text-amber-300">2024</span> en el título. Actualizar a <span className="font-mono text-emerald-400">2025-2026</span>.
                                 </p>
                              </div>
                           </div>
                        </div>
                    </div>
                </div>
            </div>

            {/* NEW SECTION 2: GAP ANALYSIS */}
            <div className="bg-slate-900 border border-slate-800 rounded-xl p-6">
                <div className="flex items-center justify-between mb-6">
                   <h3 className="text-sm font-bold text-white flex items-center gap-2">
                      <Scale className="h-4 w-4 text-emerald-400" />
                      Gap Analysis vs. Competencia (Top 3)
                   </h3>
                   <span className="text-xs text-slate-500 bg-slate-950 px-2 py-1 rounded border border-slate-800">
                      Vs. Promedio del Mercado
                   </span>
                </div>

                <div className="overflow-x-auto">
                   <table className="w-full text-left border-collapse">
                      <thead>
                         <tr className="border-b border-slate-800 text-xs text-slate-500 uppercase tracking-wider">
                            <th className="px-4 py-3 font-medium">Métrica</th>
                            <th className="px-4 py-3 font-medium text-center bg-violet-500/5 text-violet-300 rounded-t-lg">Educa College Prep</th>
                            <th className="px-4 py-3 font-medium text-center">Promedio Top 3</th>
                            <th className="px-4 py-3 font-medium text-right">Diferencial</th>
                         </tr>
                      </thead>
                      <tbody className="divide-y divide-slate-800">
                         {MOCK_GAP_ANALYSIS.map((row, idx) => (
                            <tr key={idx} className="group hover:bg-slate-800/30">
                               <td className="px-4 py-3 text-sm text-slate-300 font-medium">{row.metric}</td>
                               <td className="px-4 py-3 text-sm text-white font-bold text-center bg-violet-500/5 border-x border-slate-800/50">
                                  {row.us} {row.unit}
                               </td>
                               <td className="px-4 py-3 text-sm text-slate-400 text-center font-mono">
                                  {row.top3Avg} {row.unit}
                               </td>
                               <td className="px-4 py-3 text-right">
                                  <span className={cn(
                                     "text-xs font-bold px-2 py-1 rounded",
                                     row.diff < 0 ? "bg-rose-500/10 text-rose-400" : "bg-emerald-500/10 text-emerald-400"
                                  )}>
                                     {row.diff > 0 ? '+' : ''}{row.diff} {row.unit}
                                  </span>
                               </td>
                            </tr>
                         ))}
                      </tbody>
                   </table>
                </div>
            </div>

            {/* Content & Keywords Grid (Existing - Simplified for brevity in this request context) */}
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
                <div className="bg-slate-900 border border-slate-800 rounded-xl p-6">
                   <h3 className="text-sm font-bold text-white mb-6 flex items-center gap-2">
                      <AlignLeft className="h-4 w-4 text-emerald-400" />
                      Estructura de Encabezados
                   </h3>
                   <div className="space-y-3 font-mono text-xs md:text-sm">
                      <div className="flex items-center gap-3 text-slate-200">
                         <span className="px-2 py-0.5 bg-slate-800 rounded text-slate-500 font-bold w-10 text-center">H1</span>
                         <CheckCircle2 className="h-4 w-4 text-emerald-500 shrink-0" />
                         <span className="truncate">Guía Completa para entender el SAT</span>
                      </div>
                      <div className="flex items-center gap-3 pl-6 text-rose-300 bg-rose-500/5 p-1 rounded -ml-1 border border-rose-500/10">
                         <span className="px-2 py-0.5 bg-slate-950 border border-slate-800 rounded text-slate-600 font-bold w-10 text-center">H2</span>
                         <XCircle className="h-4 w-4 text-rose-500 shrink-0" />
                         <span className="truncate">Fechas de Examen 2023</span>
                         <span className="ml-auto text-[10px] text-rose-400 font-bold uppercase tracking-wider hidden sm:block">Fecha Antigua</span>
                      </div>
                   </div>
                </div>

                <div className="bg-slate-900 border border-slate-800 rounded-xl p-6">
                   <h3 className="text-sm font-bold text-white mb-6 flex items-center gap-2">
                      <Hash className="h-4 w-4 text-violet-400" />
                      Densidad (TF-IDF)
                   </h3>
                   <div className="overflow-hidden rounded-lg border border-slate-800">
                      <table className="w-full text-left border-collapse text-sm">
                         <tbody className="divide-y divide-slate-800">
                            <tr className="bg-slate-900">
                               <td className="px-4 py-3 text-slate-200">examen sat</td>
                               <td className="px-4 py-3 text-center text-slate-400">15</td>
                               <td className="px-4 py-3 text-right"><span className="text-emerald-400 text-[10px] font-bold">ÓPTIMO</span></td>
                            </tr>
                            <tr className="bg-slate-900/50">
                               <td className="px-4 py-3 text-slate-200">college board</td>
                               <td className="px-4 py-3 text-center text-slate-400">0</td>
                               <td className="px-4 py-3 text-right"><span className="text-rose-400 text-[10px] font-bold">CRÍTICO</span></td>
                            </tr>
                         </tbody>
                      </table>
                   </div>
                </div>
            </div>

            {/* NEW SECTION 3: AI CONTENT COPILOT */}
            <div className="bg-gradient-to-br from-slate-900 to-slate-950 border border-slate-800 rounded-xl p-6 relative overflow-hidden ring-1 ring-violet-500/20">
               <div className="absolute top-0 right-0 w-64 h-64 bg-violet-500/10 blur-[100px] rounded-full pointer-events-none"></div>
               
               <div className="flex items-center gap-3 mb-6">
                  <div className="p-2 bg-violet-500 text-white rounded-lg shadow-lg shadow-violet-500/20">
                     <Bot className="h-6 w-6" />
                  </div>
                  <div>
                     <h3 className="text-lg font-bold text-white">AI Content Copilot</h3>
                     <p className="text-xs text-slate-400">Corrección contextual automática basada en los errores de auditoría detectados.</p>
                  </div>
               </div>

               <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
                  {/* Problem Context */}
                  <div className="space-y-4">
                     <div className="flex items-center gap-2 text-sm font-semibold text-rose-400 mb-2">
                        <AlertTriangle className="h-4 w-4" />
                        Problema Detectado: Relevancia Temporal (H2)
                     </div>
                     <div className="p-4 bg-slate-950/50 border border-slate-800 rounded-lg text-slate-400 italic text-sm relative">
                        <div className="absolute -top-3 left-4 px-2 bg-slate-900 text-[10px] text-slate-500 uppercase tracking-wider border border-slate-800 rounded">
                           Texto Original
                        </div>
                        "Fechas de Examen 2023: Conoce cuándo presentar tu prueba para el ciclo escolar anterior..."
                     </div>
                     <div className="text-xs text-slate-500 mt-2">
                        *Este encabezado reduce la relevancia para búsquedas actuales (2025-2026).
                     </div>
                  </div>

                  {/* AI Solution */}
                  <div className="relative">
                     {!aiSuggestionVisible ? (
                        <div className="h-full min-h-[140px] flex flex-col items-center justify-center border border-dashed border-slate-700 rounded-lg bg-slate-900/50">
                           <button 
                              onClick={handleAiGenerate}
                              disabled={aiGenerating}
                              className="flex items-center gap-2 px-5 py-2.5 bg-violet-600 hover:bg-violet-500 text-white rounded-lg font-medium transition-all shadow-lg hover:shadow-violet-500/20 disabled:opacity-70 disabled:cursor-not-allowed"
                           >
                              {aiGenerating ? (
                                 <>
                                    <RefreshCw className="h-4 w-4 animate-spin" />
                                    Generando corrección...
                                 </>
                              ) : (
                                 <>
                                    <Sparkles className="h-4 w-4" />
                                    Generar Reescritura Optimizada
                                 </>
                              )}
                           </button>
                        </div>
                     ) : (
                        <div className="animate-in fade-in slide-in-from-bottom-2 duration-500">
                           <div className="flex items-center gap-2 text-sm font-semibold text-emerald-400 mb-2">
                              <Sparkles className="h-4 w-4" />
                              Sugerencia RankUnit AI
                           </div>
                           <div className="p-4 bg-emerald-950/10 border border-emerald-500/20 rounded-lg text-emerald-100 text-sm relative">
                              <div className="absolute -top-3 left-4 px-2 bg-slate-900 text-[10px] text-emerald-500 uppercase tracking-wider border border-emerald-500/30 rounded">
                                 Texto Optimizado
                              </div>
                              <p className="font-semibold mb-1">Calendario SAT 2025-2026: Fechas Oficiales y Registro</p>
                              <p className="opacity-80">"Planifica tu admisión con el calendario actualizado. Próxima fecha límite: 04 de Marzo, 2026."</p>
                              
                              <div className="mt-3 flex gap-2">
                                 <button className="flex-1 bg-emerald-600 hover:bg-emerald-500 text-white text-xs font-bold py-1.5 rounded transition-colors shadow-lg shadow-emerald-500/20">
                                    Aplicar Cambio
                                 </button>
                                 <button className="p-1.5 text-slate-400 hover:text-white bg-slate-900 border border-slate-700 rounded transition-colors" title="Copiar">
                                    <Copy className="h-4 w-4" />
                                 </button>
                              </div>
                           </div>
                        </div>
                     )}
                  </div>
               </div>
            </div>

          </div>
        )}

        {/* TAB: LINKS (Sub-tabs logic preserved) */}
        {activeTab === 'links' && (
           <div className="space-y-6 animate-in fade-in slide-in-from-bottom-2 max-w-4xl mx-auto">
             <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4">
               <div>
                  <h3 className="text-xl font-bold text-white">Perfil de Conectividad</h3>
                  <p className="text-slate-400 text-sm">Gestiona la autoridad entrante y la distribución interna.</p>
               </div>
               <div className="flex bg-slate-900 p-1 rounded-lg border border-slate-800">
                  <button
                    onClick={() => setLinksSubTab('external')}
                    className={cn("flex items-center gap-2 px-4 py-1.5 rounded-md text-sm font-medium transition-all", linksSubTab === 'external' ? "bg-slate-800 text-white shadow-sm border border-slate-700" : "text-slate-400 hover:text-slate-200")}
                  >
                    <Globe className="h-3.5 w-3.5" /> Backlinks (Externos)
                  </button>
                  <button
                    onClick={() => setLinksSubTab('internal')}
                    className={cn("flex items-center gap-2 px-4 py-1.5 rounded-md text-sm font-medium transition-all", linksSubTab === 'internal' ? "bg-violet-600/10 text-violet-400 shadow-sm border border-violet-500/20" : "text-slate-400 hover:text-slate-200")}
                  >
                    <GitMerge className="h-3.5 w-3.5" /> Interlinking (Interno)
                  </button>
               </div>
             </div>
             {/* EXTERNAL VIEW */}
             {linksSubTab === 'external' && (
                <div className="relative border-l-2 border-slate-800 ml-4 space-y-10 pb-8 pt-4">
                    {[
                      {id: 'bl-1', date: '15 Ene 2026', tier: 'TIER 1', type: 'DOFOLLOW', source: 'observatorio.tec.mx', context: "Mención en artículo: 'Tendencias en admisiones internacionales 2026'.", anchor: "examen estandarizado SAT", tierColor: "bg-violet-500/10 text-violet-400 border-violet-500/20", followColor: "bg-emerald-500/10 text-emerald-400 border-emerald-500/20"},
                      {id: 'bl-2', date: '10 Dic 2025', tier: 'TIER 2', type: 'DOFOLLOW', source: 'mextudia.com', context: "Inclusión en listado: 'Las mejores guías para estudiar en el extranjero'.", anchor: "guía de estudio para el SAT", tierColor: "bg-blue-500/10 text-blue-400 border-blue-500/20", followColor: "bg-emerald-500/10 text-emerald-400 border-emerald-500/20"},
                      {id: 'bl-3', date: '05 Nov 2025', tier: 'TIER 1', type: 'DOFOLLOW', source: 'gaceta.unam.mx', context: "Referencia en nota educativa: 'Requisitos para posgrados en el extranjero'.", anchor: "prueba de admisión SAT", tierColor: "bg-violet-500/10 text-violet-400 border-violet-500/20", followColor: "bg-emerald-500/10 text-emerald-400 border-emerald-500/20"},
                      {id: 'bl-4', date: '22 Oct 2025', tier: 'TIER 3', type: 'NOFOLLOW', source: 'medium.com/study-abroad', context: "Comentario en post viral sobre aplicaciones a USA.", anchor: "recurso recomendado", tierColor: "bg-slate-800 text-slate-400 border-slate-700", followColor: "bg-amber-500/10 text-amber-400 border-amber-500/20"},
                    ].map((link) => (
                      <div key={link.id} className="relative ml-8 group">
                        <div className="absolute -left-[41px] top-6 h-5 w-5 rounded-full border-4 border-slate-950 flex items-center justify-center bg-slate-800 group-hover:bg-violet-500 transition-colors shadow-lg"></div>
                        <div className="bg-slate-900 border border-slate-800 rounded-xl p-5 hover:border-slate-700 transition-all hover:shadow-lg">
                          <div className="flex flex-wrap items-center gap-3 mb-3">
                             <span className="text-xs font-mono text-slate-500">{link.date}</span>
                             <span className={cn("text-[10px] font-bold uppercase tracking-wider px-2 py-0.5 rounded border", link.tierColor)}>{link.tier}</span>
                             <span className={cn("text-[10px] font-bold uppercase tracking-wider px-2 py-0.5 rounded border", link.followColor)}>{link.type}</span>
                          </div>
                          <h4 className="text-lg font-bold text-white mb-2 flex items-center gap-2"><Globe className="h-4 w-4 text-slate-400" /> {link.source}</h4>
                          <p className="text-slate-400 text-sm leading-relaxed">{link.context}</p>
                          <div className="mt-3 p-3 bg-slate-950 rounded border border-slate-800 flex items-center gap-2">
                             <span className="text-xs text-slate-500 font-semibold uppercase">Anchor:</span>
                             <span className="text-sm text-cyan-400 font-medium font-mono border-b border-dashed border-cyan-500/30 pb-0.5 truncate">{link.anchor}</span>
                          </div>
                        </div>
                      </div>
                    ))}
                </div>
             )}
             {/* INTERNAL VIEW (Simplified for brevity as it was already implemented) */}
             {linksSubTab === 'internal' && (
                <div className="relative border-l-2 border-slate-800 ml-4 space-y-8 pb-8 pt-4">
                    <div className="ml-8 mb-8 p-4 bg-slate-900 border border-slate-800 rounded-xl flex items-start gap-3">
                       <div className="p-2 bg-violet-500/10 rounded-lg border border-violet-500/20"><ArrowRightLeft className="h-5 w-5 text-violet-400" /></div>
                       <div>
                          <h4 className="text-sm font-bold text-white">Distribución de Link Juice</h4>
                          <p className="text-xs text-slate-400 mt-1">Esta URL recibe 5 enlaces internos fuertes.</p>
                       </div>
                    </div>
                    {[
                       {id: 'il-1', source: '/blog/mejores-universidades-ivy-league', title: 'Top 8 Universidades Ivy League y sus requisitos', placement: 'Content Body', placementIcon: LayoutTemplate, relevance: 'High', anchor: 'puntaje SAT perfecto'},
                       {id: 'il-2', source: '/blog/diferencias-sat-vs-act', title: 'SAT vs ACT: ¿Cuál examen debo tomar?', placement: 'Content Body', placementIcon: LayoutTemplate, relevance: 'High', anchor: 'examen SAT'},
                       {id: 'il-3', source: '/recursos/calendario-sat-2025', title: 'Calendario Oficial SAT 2025-2026', placement: 'Sidebar', placementIcon: PanelLeft, relevance: 'Medium', anchor: 'fechas SAT 2025'},
                       {id: 'il-4', source: '/blog/becas-para-mexicanos', title: 'Guía de Becas para Estudiantes Mexicanos en USA', placement: 'Content Body', placementIcon: LayoutTemplate, relevance: 'High', anchor: 'requisito académico'},
                       {id: 'il-5', source: '/servicios/tutoria-personalizada', title: 'Programa de Tutoría 1 a 1', placement: 'Footer', placementIcon: Layout, relevance: 'Medium', anchor: 'preparación experta'},
                    ].map((link) => (
                       <div key={link.id} className="relative ml-8 group">
                          <div className="absolute -left-[41px] top-6 h-5 w-5 rounded-full border-4 border-slate-950 flex items-center justify-center bg-slate-800 group-hover:bg-violet-600 transition-colors shadow-lg"><div className="w-1.5 h-1.5 rounded-full bg-slate-400 group-hover:bg-white"></div></div>
                          <div className="bg-slate-900 border border-slate-800 rounded-xl p-4 hover:border-slate-700 transition-all flex flex-col sm:flex-row gap-4 items-start sm:items-center justify-between">
                             <div className="space-y-2 flex-1 min-w-0">
                                <div className="flex items-center gap-2 mb-1">
                                   <span className={cn("text-[10px] font-bold uppercase tracking-wider px-2 py-0.5 rounded border flex items-center gap-1 bg-emerald-500/10 text-emerald-400 border-emerald-500/20")}>{link.relevance} Relevance</span>
                                </div>
                                <h4 className="text-sm font-semibold text-white truncate pr-4">{link.title}</h4>
                                <div className="flex items-center gap-1 text-xs text-slate-500 font-mono"><GitMerge className="h-3 w-3 rotate-90" /><span className="truncate">{link.source}</span></div>
                             </div>
                             <div className="w-full sm:w-auto p-3 bg-slate-950 rounded-lg border border-slate-800 min-w-[200px]">
                                <span className="text-[10px] text-slate-500 font-bold uppercase tracking-wide block mb-1">Enlaza con Anchor:</span>
                                <span className="text-sm text-violet-300 font-medium font-mono">"{link.anchor}"</span>
                             </div>
                          </div>
                       </div>
                    ))}
                </div>
             )}
          </div>
        )}

        {/* TAB: ACTION PLAN (UPDATED TO BE INTERACTIVE) */}
        {activeTab === 'action_plan' && (
          <div className="space-y-4 animate-in fade-in slide-in-from-bottom-2 max-w-4xl mx-auto">
             <div className="flex items-center justify-between mb-4 px-2">
                <h3 className="text-lg font-bold text-white">Checklist de Optimización: "Guía Completa SAT"</h3>
                <div className="text-xs text-slate-500 bg-slate-900 border border-slate-800 px-3 py-1.5 rounded-full">Progreso Total: <span className="text-white font-bold ml-1">{globalProgress}%</span></div>
             </div>
             
             {actionPlan.map((category) => {
               const isOpen = openAccordionId === category.id;
               const total = category.tasks.length;
               const completed = category.tasks.filter(t => t.done).length;
               const progress = total === 0 ? 0 : (completed / total) * 100;
               
               return (
                 <div key={category.id} className="border border-slate-800 rounded-xl overflow-hidden shadow-sm transition-all duration-300">
                    <div onClick={() => toggleAccordion(category.id)} className={cn("flex items-center justify-between p-4 cursor-pointer transition-colors select-none", isOpen ? "bg-slate-900" : "bg-slate-900/50 hover:bg-slate-900")}>
                       <div className="flex items-center gap-3">
                          <div className={cn("p-2 rounded-lg bg-slate-950 border border-slate-800", category.color)}><category.icon className="h-5 w-5" /></div>
                          <div className="flex flex-col"><span className="text-sm font-bold text-white">{category.title}</span><span className="text-[10px] text-slate-500 uppercase tracking-wide hidden sm:block">{total - completed} Tareas pendientes</span></div>
                       </div>
                       <div className="flex items-center gap-4">
                          <div className="flex items-center gap-2"><div className="text-xs font-medium text-slate-400 w-12 text-right">{completed}/{total}</div><div className="w-16 h-1.5 bg-slate-950 rounded-full overflow-hidden border border-slate-800 hidden sm:block"><div className={cn("h-full rounded-full transition-all duration-500", category.color.replace('text-', 'bg-').replace('-400', '-500'))} style={{ width: `${progress}%` }} /></div></div>
                          <div className={cn("text-slate-500 transition-transform duration-300", isOpen && "rotate-180")}><ChevronDown className="h-5 w-5" /></div>
                       </div>
                    </div>
                    <div className={cn("bg-slate-950 border-t border-slate-800 transition-all duration-300 overflow-hidden", isOpen ? "max-h-[600px] opacity-100" : "max-h-0 opacity-0")}>
                       <div className="p-2 space-y-1">
                          {category.tasks.map((task, idx) => (
                             <div 
                                key={idx} 
                                onClick={() => handleToggleTask(category.id, idx)}
                                className={cn("flex items-start gap-3 p-3 rounded-lg transition-colors group cursor-pointer", task.done ? "hover:bg-emerald-950/10" : "hover:bg-slate-900")}
                             >
                                <div className={cn("mt-0.5 flex-shrink-0 w-5 h-5 rounded border flex items-center justify-center transition-all", task.done ? "bg-emerald-500/20 border-emerald-500 text-emerald-500" : "bg-slate-900 border-slate-700 text-transparent group-hover:border-slate-500")}><Check className="h-3.5 w-3.5" strokeWidth={3} /></div>
                                <span className={cn("text-sm leading-relaxed transition-colors select-none", task.done ? "text-slate-500 line-through decoration-slate-700" : "text-slate-200")}>{task.label}</span>
                             </div>
                          ))}
                       </div>
                    </div>
                 </div>
               );
             })}
          </div>
        )}
      </div>
    </div>
  );
};

export default ProjectDetail;