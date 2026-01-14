import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import ReactCountryFlag from 'react-country-flag';
import { MOCK_ASSETS, MOCK_QUICK_WINS, OPERATIONAL_POLICIES, QUARTER_GOALS, GOAL_SUMMARY_TABLE } from '../constants';
import { cn } from '../lib/utils';
import { useViewMode } from '../lib/context';
import { 
  ArrowUpRight, 
  ExternalLink, 
  FileText, 
  AlertCircle,
  CheckCircle2,
  Clock,
  RefreshCw,
  Target,
  Calendar,
  Zap,
  LayoutGrid,
  ChevronDown,
  BarChart2,
  FileBadge,
  Sparkles,
  Command,
  Info,
  TrendingUp,
  Award,
  Handshake,
  Maximize2
} from 'lucide-react';
import { AssetStatus } from '../types';
import { ResponsiveContainer, RadialBarChart, RadialBar, Tooltip as RechartsTooltip, Cell } from 'recharts';

const Dashboard = () => {
  const navigate = useNavigate();
  const { isClientMode, toggleViewMode } = useViewMode();
  
  // State for Accordions
  const [expandedQuickWin, setExpandedQuickWin] = useState<string | null>(null);
  const [expandedPolicy, setExpandedPolicy] = useState<string | null>('scope');
  
  // New State for Goals Accordion
  const [expandedGoal, setExpandedGoal] = useState<string | null>('business');

  const toggleQuickWin = (id: string) => {
    setExpandedQuickWin(prev => prev === id ? null : id);
  };

  const togglePolicy = (id: string) => {
    setExpandedPolicy(prev => prev === id ? null : id);
  };

  const toggleGoal = (id: string) => {
    setExpandedGoal(prev => prev === id ? null : id);
  };

  // Helper to get status badge styling
  const getStatusBadge = (status: AssetStatus) => {
    switch (status) {
      case 'performing':
        return (
          <span className="flex items-center gap-1.5 px-2.5 py-1 rounded-full text-xs font-semibold bg-emerald-500/10 text-emerald-400 border border-emerald-500/20 shadow-[0_0_10px_rgba(16,185,129,0.15)]">
            <CheckCircle2 className="h-3 w-3" /> Performing
          </span>
        );
      case 'needs_update':
        return (
          <span className="flex items-center gap-1.5 px-2.5 py-1 rounded-full text-xs font-semibold bg-amber-500/10 text-amber-400 border border-amber-500/20 shadow-[0_0_10px_rgba(245,158,11,0.15)]">
            <RefreshCw className="h-3 w-3" /> Needs Update
          </span>
        );
      case 'critical':
        return (
          <span className="flex items-center gap-1.5 px-2.5 py-1 rounded-full text-xs font-semibold bg-rose-500/10 text-rose-400 border border-rose-500/20 shadow-[0_0_10px_rgba(244,63,94,0.15)]">
            <AlertCircle className="h-3 w-3" /> Critical
          </span>
        );
      case 'indexing':
        return (
          <span className="flex items-center gap-1.5 px-2.5 py-1 rounded-full text-xs font-semibold bg-blue-500/10 text-blue-400 border border-blue-500/20 shadow-[0_0_10px_rgba(59,130,246,0.15)]">
            <Clock className="h-3 w-3" /> Indexing
          </span>
        );
    }
  };

  // Enhanced Section Header Component with Neon Aesthetics
  const SectionHeader = ({ number, title, subtitle, icon: Icon, colorClass = "text-violet-500" }: { number: string, title: string, subtitle: string, icon: any, colorClass?: string }) => (
    <div className="flex flex-col mb-10 relative group">
      <div className="flex items-end gap-5 mb-2 relative z-10">
         {/* Neon Number */}
         <div className="relative">
            <span className={cn(
              "text-5xl font-black font-mono tracking-tighter bg-clip-text text-transparent bg-gradient-to-br from-slate-200 to-slate-600",
            )}>
                {number}
            </span>
            <div className={cn("absolute -bottom-2 -right-2 w-12 h-12 blur-[40px] opacity-20 rounded-full", colorClass.replace('text-', 'bg-'))}></div>
         </div>

         {/* Title Block */}
         <div className="relative pb-1">
            <div className="flex items-center gap-3 mb-1">
                <div className={cn(
                    "p-2 rounded-lg border bg-slate-950/80 backdrop-blur-sm shadow-lg", 
                    colorClass.replace('text-', 'border-').replace('500', '500/30'),
                    colorClass.replace('text-', 'shadow-').replace('500', '500/20')
                )}>
                   <Icon className={cn("h-5 w-5", colorClass)} />
                </div>
                <h2 className="text-3xl font-bold text-white tracking-tight drop-shadow-sm">
                   {title}
                </h2>
            </div>
            <p className="text-slate-400 text-sm font-medium uppercase tracking-widest pl-1">
                {subtitle}
            </p>
         </div>
      </div>
      
      {/* Decorative Line */}
      <div className="h-px w-full bg-gradient-to-r from-slate-800 via-slate-800 to-transparent mt-2 relative">
          <div className={cn("absolute left-0 top-0 h-full w-32 bg-gradient-to-r from-transparent via-current to-transparent opacity-50", colorClass)}></div>
      </div>
    </div>
  );

  return (
    <div className="space-y-24 animate-in fade-in duration-700 pb-32">
      
      {/* Global Dashboard Header */}
      <div className="flex flex-col md:flex-row md:items-end justify-between gap-6 pb-6 relative">
         {/* Ambient Background Glow */}
         <div className="absolute top-[-100px] left-[-100px] w-[500px] h-[500px] bg-violet-500/5 blur-[120px] rounded-full pointer-events-none"></div>

        <div className="relative z-10">
          <h1 className="text-4xl font-bold text-white tracking-tight mb-2">Dashboard de Proyecto</h1>
          <div className="flex items-center gap-2 text-slate-400">
             <div className="w-2 h-2 rounded-full bg-emerald-500 shadow-[0_0_8px_rgba(16,185,129,0.6)] animate-pulse"></div>
             <p className="text-sm font-medium">Sistema Operativo v2.4 • Conectado</p>
          </div>
        </div>

        {/* View Mode Toggle - MOVED HERE */}
        <div className="relative z-10 flex items-center gap-3 bg-slate-900 rounded-full p-1.5 border border-slate-800 shadow-xl">
          <button
            onClick={toggleViewMode}
            className={cn(
              "px-5 py-2 rounded-full text-xs font-bold uppercase tracking-wider transition-all duration-300",
              !isClientMode 
                ? "bg-slate-800 text-white shadow-md border border-slate-700" 
                : "text-slate-500 hover:text-slate-300"
            )}
          >
            Fundación
          </button>
          <button
            onClick={toggleViewMode}
            className={cn(
              "px-5 py-2 rounded-full text-xs font-bold uppercase tracking-wider transition-all duration-300",
              isClientMode 
                ? "bg-gradient-to-r from-emerald-500 to-emerald-600 text-white shadow-lg shadow-emerald-500/20" 
                : "text-slate-500 hover:text-slate-300"
            )}
          >
            Quarter
          </button>
        </div>
      </div>

      {/* ---------------------------------------------------------------------- */}
      {/* FRANJA 01: OBJETIVOS ESTRATÉGICOS (EXPANDABLE CARDS) */}
      {/* ---------------------------------------------------------------------- */}
      <section>
        <SectionHeader 
           number="01" 
           title="Objetivos & Compromisos" 
           subtitle="Barómetro de Éxito Trimestral" 
           icon={Target}
           colorClass="text-emerald-500"
        />

        {/* EXPANDABLE GRID LAYOUT */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
           
           {QUARTER_GOALS.map((goal) => {
              const isOpen = expandedGoal === goal.id;
              
              // Dynamic Colors Configuration
              let colors = {
                  text: 'text-slate-400',
                  bg: 'bg-slate-500',
                  border: 'border-slate-500',
                  glow: 'shadow-slate-500/20',
                  gradient: 'from-slate-500 to-slate-700'
              };

              if (goal.color === 'emerald') {
                  colors = { text: 'text-emerald-400', bg: 'bg-emerald-500', border: 'border-emerald-500', glow: 'shadow-[0_0_25px_rgba(16,185,129,0.15)]', gradient: 'from-emerald-400 to-emerald-600' };
              } else if (goal.color === 'violet') {
                  colors = { text: 'text-violet-400', bg: 'bg-violet-500', border: 'border-violet-500', glow: 'shadow-[0_0_25px_rgba(139,92,246,0.15)]', gradient: 'from-violet-400 to-violet-600' };
              } else if (goal.color === 'amber') {
                  colors = { text: 'text-amber-400', bg: 'bg-amber-500', border: 'border-amber-500', glow: 'shadow-[0_0_25px_rgba(245,158,11,0.15)]', gradient: 'from-amber-400 to-amber-600' };
              } else if (goal.color === 'blue') {
                  colors = { text: 'text-blue-400', bg: 'bg-blue-500', border: 'border-blue-500', glow: 'shadow-[0_0_25px_rgba(59,130,246,0.15)]', gradient: 'from-blue-400 to-blue-600' };
              }

              const percentage = (goal.current / (goal.total || goal.target)) * 100;

              return (
                <div 
                   key={goal.id} 
                   onClick={() => toggleGoal(goal.id)}
                   className={cn(
                      "relative rounded-2xl border transition-all duration-500 cursor-pointer overflow-hidden group",
                      isOpen 
                        ? cn("bg-slate-900 border-opacity-50", colors.border, colors.glow) 
                        : "bg-slate-950 border-slate-800 hover:border-slate-700"
                   )}
                >
                   {/* Background Gradient Effect on Open */}
                   <div className={cn(
                      "absolute top-0 right-0 w-[300px] h-[300px] blur-[100px] rounded-full pointer-events-none transition-opacity duration-700",
                      isOpen ? "opacity-20" : "opacity-0",
                      colors.bg
                   )}></div>

                   {/* --- HEADER (Always Visible) --- */}
                   <div className="p-6 relative z-10">
                      <div className="flex items-center justify-between gap-4">
                         
                         {/* Icon & Title */}
                         <div className="flex items-center gap-4">
                            <div className={cn(
                               "w-12 h-12 rounded-xl border flex items-center justify-center transition-all duration-300 shadow-lg",
                               isOpen ? cn("bg-slate-900", colors.border, colors.text) : "bg-slate-900 border-slate-800 text-slate-500"
                            )}>
                               <goal.icon className="h-6 w-6" />
                            </div>
                            <div>
                               <div className="flex items-center gap-2 mb-1">
                                  <span className={cn(
                                     "text-[10px] font-bold uppercase tracking-widest px-2 py-0.5 rounded border transition-colors",
                                     isOpen ? cn("bg-slate-950", colors.border, colors.text) : "bg-slate-900 border-slate-800 text-slate-500"
                                  )}>
                                     {goal.type}
                                  </span>
                               </div>
                               <h3 className={cn("text-lg font-bold transition-colors", isOpen ? "text-white" : "text-slate-300")}>
                                  {goal.title}
                               </h3>
                            </div>
                         </div>

                         {/* Right Side: Mini Status & Toggle */}
                         <div className="flex items-center gap-5">
                            {/* Visual Indicator (Slim Bar) */}
                            <div className="hidden sm:flex flex-col items-end gap-1 min-w-[80px]">
                               <div className="flex justify-between w-full text-[10px] font-bold uppercase tracking-wider text-slate-500">
                                  <span>Progreso</span>
                                  <span className={cn(isOpen ? colors.text : "text-slate-400")}>{Math.round(percentage)}%</span>
                               </div>
                               <div className="w-24 h-1.5 bg-slate-950 rounded-full overflow-hidden border border-slate-800">
                                  <div 
                                    className={cn("h-full rounded-full transition-all duration-1000", colors.bg)}
                                    style={{ width: `${percentage}%` }}
                                  ></div>
                               </div>
                            </div>

                            {/* Chevron Button */}
                            <div className={cn(
                               "w-8 h-8 rounded-full flex items-center justify-center border transition-all duration-300",
                               isOpen 
                                  ? cn("bg-slate-800 text-white rotate-180", colors.border) 
                                  : "bg-slate-950 border-slate-800 text-slate-500 group-hover:bg-slate-900"
                            )}>
                               <ChevronDown className="h-4 w-4" />
                            </div>
                         </div>
                      </div>
                   </div>

                   {/* --- EXPANDABLE BODY --- */}
                   <div className={cn(
                      "grid transition-[grid-template-rows] duration-500 ease-[cubic-bezier(0.4,0,0.2,1)]",
                      isOpen ? "grid-rows-[1fr]" : "grid-rows-[0fr]"
                   )}>
                      <div className="overflow-hidden">
                         <div className="px-6 pb-6 pt-0 relative z-10">
                            
                            {/* Divider */}
                            <div className="h-px w-full bg-slate-800/50 mb-6"></div>

                            {/* Content Grid */}
                            <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
                               
                               {/* Description & KPI Box */}
                               <div className="space-y-4">
                                  <p className="text-sm text-slate-300 leading-relaxed font-light">
                                     {goal.description}
                                  </p>
                                  
                                  {/* Featured KPI Box */}
                                  <div className="bg-slate-950/60 backdrop-blur-md rounded-xl p-4 border border-slate-800/60 flex items-center gap-4">
                                     <div className={cn("p-2 rounded-full bg-slate-900 border", colors.border)}>
                                        <TrendingUp className={cn("h-5 w-5", colors.text)} />
                                     </div>
                                     <div>
                                        <span className="text-[10px] text-slate-500 font-bold uppercase tracking-wider block mb-0.5">Métrica de Éxito (KPI)</span>
                                        <span className="text-base font-bold text-white">{goal.kpi}</span>
                                     </div>
                                  </div>
                               </div>

                               {/* Measurement & Context */}
                               <div className="space-y-4">
                                  <div className="flex flex-col gap-1">
                                     <span className="text-[10px] text-slate-500 font-bold uppercase tracking-wider flex items-center gap-1">
                                        <Maximize2 className="h-3 w-3" /> Método de Medición
                                     </span>
                                     <span className="text-xs font-mono text-slate-400 bg-slate-900/50 px-3 py-2 rounded border border-slate-800/50">
                                        {goal.measurement}
                                     </span>
                                  </div>

                                  <div className={cn("p-3 rounded-lg border text-xs leading-relaxed flex gap-2", colors.border.replace('border-', 'border-opacity-20 '), colors.bg.replace('bg-', 'bg-opacity-5 '))}>
                                     <Info className={cn("h-4 w-4 shrink-0 mt-0.5", colors.text)} />
                                     <span className="text-slate-400">{goal.context}</span>
                                  </div>

                                  {/* Detailed Footer Stats */}
                                  <div className="flex items-center justify-between text-[10px] text-slate-500 font-mono pt-2 border-t border-slate-800/30">
                                     <span>Current: <span className="text-white">{goal.current}</span></span>
                                     <span>Target: <span className="text-white">{goal.total || goal.target}</span></span>
                                  </div>
                               </div>

                            </div>
                         </div>
                      </div>
                   </div>
                </div>
              );
           })}
        </div>
        
        {/* SUMMARY TABLE STRIP (Kept as is, underneath the cards) */}
        <div className="mt-8 bg-slate-950/50 border border-slate-800 rounded-xl overflow-hidden">
           <div className="px-6 py-3 bg-slate-900/80 border-b border-slate-800 flex justify-between items-center">
              <h4 className="text-xs font-bold text-slate-400 uppercase tracking-widest">Resumen de Metas Numéricas</h4>
              <BarChart2 className="h-4 w-4 text-slate-600" />
           </div>
           <div className="grid grid-cols-1 md:grid-cols-5 divide-y md:divide-y-0 md:divide-x divide-slate-800">
              {GOAL_SUMMARY_TABLE.map((item, idx) => (
                 <div key={idx} className="p-4 flex flex-col justify-center hover:bg-slate-900/30 transition-colors">
                    <span className="text-[10px] text-slate-500 font-bold uppercase mb-1">{item.label}</span>
                    <span className="text-sm font-medium text-slate-200 leading-snug">{item.goal}</span>
                 </div>
              ))}
           </div>
        </div>
      </section>

      {/* ---------------------------------------------------------------------- */}
      {/* FRANJA 02: QUICK WINS */}
      {/* ---------------------------------------------------------------------- */}
      <section>
        <SectionHeader 
           number="02" 
           title="Victorias Rápidas" 
           subtitle="Oportunidades High Impact / Low Effort" 
           icon={Zap}
           colorClass="text-emerald-500"
        />
        
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
           {MOCK_QUICK_WINS.map((win) => {
              const isOpen = expandedQuickWin === win.id;
              return (
                 <div key={win.id} className={cn(
                    "bg-slate-900 border rounded-xl overflow-hidden transition-all duration-300 hover:shadow-lg",
                    isOpen ? "border-emerald-500/30 col-span-1 md:col-span-2 shadow-[0_0_20px_rgba(16,185,129,0.1)]" : "border-slate-800 hover:border-slate-700"
                 )}>
                    {/* Header */}
                    <div 
                       onClick={() => toggleQuickWin(win.id)}
                       className={cn(
                          "flex items-center justify-between p-5 cursor-pointer relative overflow-hidden",
                       )}
                    >
                       {/* Background Gradient on Active */}
                       {isOpen && <div className="absolute inset-0 bg-emerald-500/5 pointer-events-none"></div>}

                       <div className="flex items-center gap-4 relative z-10">
                          <div className={cn(
                             "flex items-center justify-center w-12 h-12 rounded-xl border transition-all duration-300",
                             isOpen 
                                ? "bg-emerald-500 text-white border-emerald-400 shadow-[0_0_15px_rgba(16,185,129,0.4)]" 
                                : "bg-slate-950 text-emerald-500 border-slate-800"
                          )}>
                             {isOpen ? <Sparkles className="h-6 w-6" /> : <Zap className="h-6 w-6" />}
                          </div>
                          <div>
                             <h4 className={cn("text-lg font-bold transition-colors", isOpen ? "text-white" : "text-slate-200")}>
                                {win.keyword}
                             </h4>
                             <div className="flex items-center gap-3 text-xs text-slate-500 mt-1.5 font-mono">
                                <span className="flex items-center gap-1.5 px-1.5 py-0.5 rounded bg-slate-950 border border-slate-800">
                                   <BarChart2 className="h-3 w-3" />
                                   Vol: <span className="text-slate-300">{win.volume.toLocaleString()}</span>
                                </span>
                                <span className="flex items-center gap-1.5 px-1.5 py-0.5 rounded bg-slate-950 border border-slate-800">
                                   <Target className="h-3 w-3" />
                                   KD: <span className={cn(win.difficulty > 30 ? "text-amber-400" : "text-emerald-400")}>{win.difficulty}</span>
                                </span>
                             </div>
                          </div>
                       </div>
                       
                       <div className="flex items-center gap-5 relative z-10">
                          <div className="hidden sm:block text-right">
                             <span className="text-[10px] text-slate-500 uppercase tracking-wider block mb-0.5">Potencial</span>
                             <span className="text-sm font-bold text-emerald-400 drop-shadow-sm">+{win.potentialTraffic.toLocaleString()} visitas</span>
                          </div>
                          <div className={cn(
                             "w-8 h-8 flex items-center justify-center rounded-full bg-slate-950 border border-slate-800 text-slate-400 transition-transform duration-300",
                             isOpen ? "rotate-180 bg-slate-800 text-white border-slate-700" : ""
                          )}>
                             <ChevronDown className="h-4 w-4" />
                          </div>
                       </div>
                    </div>

                    {/* Body */}
                    <div className={cn(
                       "grid transition-[grid-template-rows] duration-300 ease-out",
                       isOpen ? "grid-rows-[1fr]" : "grid-rows-[0fr]"
                    )}>
                       <div className="overflow-hidden">
                          <div className="px-5 pb-6 pt-2 border-t border-slate-800/50 bg-slate-950/30">
                             
                             <div className="mt-4 mb-6 p-4 bg-emerald-950/10 border border-emerald-500/10 rounded-lg">
                                <p className="text-sm text-slate-300 leading-relaxed">
                                   <span className="text-emerald-400 font-bold uppercase tracking-wider text-xs mr-2 border border-emerald-500/20 px-1.5 py-0.5 rounded bg-emerald-500/10">Oportunidad</span>
                                   {win.description}
                                </p>
                             </div>

                             <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mb-6">
                                <div className="bg-slate-900/80 border border-slate-800 rounded-lg p-4 flex flex-col justify-center">
                                   <span className="text-[10px] text-slate-500 uppercase tracking-wider block mb-2">Posición Actual vs Meta</span>
                                   <div className="flex items-center gap-3">
                                      <span className="text-2xl font-mono text-slate-500">#{win.initialRank}</span>
                                      <div className="flex-1 h-px bg-slate-700 relative">
                                        <div className="absolute right-0 -top-1 border-t-[4px] border-t-transparent border-b-[4px] border-b-transparent border-l-[6px] border-l-slate-700"></div>
                                      </div>
                                      <span className="text-3xl font-bold font-mono text-white text-shadow-glow">#{win.targetRank}</span>
                                   </div>
                                </div>
                                
                                <div className="bg-slate-900/80 border border-slate-800 rounded-lg p-4 flex flex-col justify-center">
                                   <span className="text-[10px] text-slate-500 uppercase tracking-wider block mb-2">Geo-Targeting</span>
                                   <div className="text-base font-bold text-white flex items-center gap-3">
                                      {win.country === 'México' && <ReactCountryFlag countryCode="MX" svg className="rounded-sm w-6 h-4 shadow-sm" />}
                                      {win.country === 'Latam' && <ReactCountryFlag countryCode="CO" svg className="rounded-sm w-6 h-4 shadow-sm" />}
                                      {win.country === 'Global' && <div className="w-6 h-4 rounded-sm bg-blue-600 flex items-center justify-center text-[8px] text-white">GL</div>}
                                      {win.country}
                                   </div>
                                </div>

                                <div className="bg-slate-900/80 border border-slate-800 rounded-lg p-4 flex flex-col justify-center">
                                   <span className="text-[10px] text-slate-500 uppercase tracking-wider block mb-2">Estado</span>
                                   <div className="flex justify-between items-center">
                                      <span className="text-xs font-bold text-emerald-400 bg-emerald-500/10 px-2 py-1 rounded border border-emerald-500/20 shadow-[0_0_8px_rgba(16,185,129,0.2)]">{win.status}</span>
                                      <button className="text-[10px] uppercase font-bold text-slate-400 hover:text-white transition-colors flex items-center gap-1">
                                         SERP <ExternalLink className="h-3 w-3" />
                                      </button>
                                   </div>
                                </div>
                             </div>

                             <div className="flex flex-wrap items-center gap-2">
                                <span className="text-[10px] text-slate-500 font-bold uppercase mr-2 flex items-center gap-1">
                                   <Command className="h-3 w-3" /> Variaciones
                                </span>
                                {win.secondaryKeywords.map((sk, idx) => (
                                   <span key={idx} className="text-xs text-slate-400 bg-slate-900 border border-slate-700 px-3 py-1 rounded-full hover:text-white hover:border-slate-500 transition-colors cursor-default">
                                      {sk}
                                   </span>
                                ))}
                             </div>

                          </div>
                       </div>
                    </div>
                 </div>
              );
           })}
        </div>
      </section>

      {/* ---------------------------------------------------------------------- */}
      {/* FRANJA 03: ASSET GRID (MASTER TABLE) */}
      {/* ---------------------------------------------------------------------- */}
      <section>
        <SectionHeader 
           number="03" 
           title="Inventario de Activos" 
           subtitle="Gestión y Rendimiento URL por URL" 
           icon={LayoutGrid}
           colorClass="text-blue-500"
        />

        <div className="bg-slate-900/50 backdrop-blur-sm border border-slate-800 rounded-2xl overflow-hidden shadow-2xl transition-all">
          <div className="px-6 py-4 border-b border-slate-800 flex items-center justify-between bg-slate-950/50">
            <div className="flex items-center gap-2">
                <div className="w-2 h-2 rounded-full bg-blue-500 animate-pulse"></div>
                <div className="text-sm text-slate-400 font-medium">4 Activos Prioritarios</div>
            </div>
            {/* Fake Controls */}
            <div className="flex gap-1.5">
               <div className="w-2.5 h-2.5 rounded-full bg-slate-800"></div>
               <div className="w-2.5 h-2.5 rounded-full bg-slate-800"></div>
            </div>
          </div>

          <div className="overflow-x-auto">
            <table className="w-full text-left border-collapse">
              <thead>
                <tr className="bg-slate-950/80 text-slate-500 text-[11px] uppercase tracking-widest font-bold border-b border-slate-800">
                  <th className="px-6 py-5 w-[40%]">Asset & URL</th>
                  <th className="px-6 py-5 w-[15%]">Focus KPI</th>
                  <th className="px-6 py-5 w-[15%]">Salud On-Page</th>
                  <th className="px-6 py-5 w-[15%]">Estado & Oportunidad</th>
                  <th className="px-6 py-5 w-[15%] text-center">País</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-slate-800/50">
                {MOCK_ASSETS.map((asset) => (
                  <tr 
                    key={asset.id} 
                    onClick={() => navigate('/projects/1')}
                    className="group hover:bg-slate-800/40 transition-colors cursor-pointer"
                  >
                    {/* Column 1: Asset Info */}
                    <td className="px-6 py-5 align-top">
                      <div className="flex items-start gap-4">
                        <div className="mt-1 p-2.5 rounded-xl bg-slate-950 border border-slate-800 group-hover:border-violet-500/30 group-hover:shadow-[0_0_15px_rgba(139,92,246,0.15)] transition-all">
                          <FileText className="h-5 w-5 text-violet-400" />
                        </div>
                        <div>
                          <h3 className="text-base font-bold text-white group-hover:text-violet-300 transition-colors leading-tight">
                            {asset.title}
                          </h3>
                          <a 
                            href="#" 
                            onClick={(e) => e.stopPropagation()} 
                            className="flex items-center gap-1.5 text-xs text-slate-500 hover:text-slate-300 mt-1.5 truncate max-w-[200px] sm:max-w-[300px] transition-colors"
                          >
                            <ExternalLink className="h-3 w-3" />
                            <span className="truncate underline decoration-slate-700 decoration-dashed underline-offset-2">{asset.url}</span>
                          </a>
                          <div className="mt-2.5 inline-flex items-center px-2 py-0.5 rounded border border-slate-800 bg-slate-900/50">
                             <span className="text-[10px] text-slate-500 font-bold uppercase mr-2">KW:</span>
                             <span className="text-xs text-slate-300 font-mono">{asset.focusKeyword}</span>
                          </div>
                        </div>
                      </div>
                    </td>

                    {/* Column 2: Focus KPI (Rank) */}
                    <td className="px-6 py-5 align-top">
                      <div className="flex flex-col">
                        <span className="text-[10px] text-slate-500 uppercase tracking-wide mb-1">Rank Actual</span>
                        <div className="flex items-baseline gap-2">
                          <span className={cn(
                            "text-3xl font-black tracking-tight",
                            asset.rank === '--' ? "text-slate-700" :
                            Number(asset.rank) <= 3 ? "text-transparent bg-clip-text bg-gradient-to-br from-emerald-300 to-emerald-600 drop-shadow-[0_0_10px_rgba(16,185,129,0.3)]" :
                            Number(asset.rank) <= 10 ? "text-white" : "text-amber-400"
                          )}>
                            {typeof asset.rank === 'number' ? `#${asset.rank}` : asset.rank}
                          </span>
                          {typeof asset.rank === 'number' && (
                            <ArrowUpRight className="h-4 w-4 text-emerald-500" />
                          )}
                        </div>
                      </div>
                    </td>

                    {/* Column 3: Health Score */}
                    <td className="px-6 py-5 align-top">
                       <div className="flex flex-col gap-2 max-w-[120px]">
                          <div className="flex justify-between text-xs font-bold uppercase tracking-wide">
                            <span className="text-slate-500">Score</span>
                            <span className={cn(
                              asset.healthScore >= 90 ? "text-emerald-400" :
                              asset.healthScore >= 60 ? "text-violet-400" : "text-rose-400"
                            )}>{asset.healthScore}/100</span>
                          </div>
                          <div className="h-2 w-full bg-slate-950 rounded-full overflow-hidden border border-slate-800 shadow-inner">
                            <div 
                              className={cn(
                                "h-full rounded-full transition-all duration-1000 relative",
                                asset.healthScore >= 90 ? "bg-emerald-500 shadow-[0_0_10px_rgba(16,185,129,0.4)]" :
                                asset.healthScore >= 60 ? "bg-violet-500 shadow-[0_0_10px_rgba(139,92,246,0.4)]" : "bg-rose-500 shadow-[0_0_10px_rgba(244,63,94,0.4)]"
                              )}
                              style={{ width: `${asset.healthScore}%` }}
                            >
                                <div className="absolute inset-0 bg-white/20 animate-pulse"></div>
                            </div>
                          </div>
                       </div>
                    </td>

                    {/* Column 4: Status & Opportunity */}
                    <td className="px-6 py-5 align-top">
                      <div className="space-y-3">
                        <div>{getStatusBadge(asset.status)}</div>
                        <div className="text-xs text-slate-300 leading-snug p-2 rounded bg-slate-950/50 border border-slate-800/50">
                          <span className="text-slate-500 font-bold block mb-0.5 text-[10px] uppercase">Oportunidad:</span>
                          {asset.opportunity}
                        </div>
                      </div>
                    </td>

                    {/* Column 5: Country Flag */}
                    <td className="px-6 py-5 align-middle text-center">
                       <div className="flex justify-center group-hover:scale-110 transition-transform duration-300">
                        <ReactCountryFlag
                          countryCode={asset.country}
                          svg
                          style={{
                            width: '2.5em',
                            height: '2.5em',
                            borderRadius: '100%',
                            objectFit: 'cover'
                          }}
                          className="rounded-full border-2 border-slate-800 shadow-lg"
                          title={asset.country}
                        />
                      </div>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>
      </section>

      {/* ---------------------------------------------------------------------- */}
      {/* FRANJA 04: OPERATIONAL POLICY (NEON REDESIGN) */}
      {/* ---------------------------------------------------------------------- */}
      <section>
         <SectionHeader 
           number="04" 
           title="Política Operativa" 
           subtitle="Reglas, Gobernanza y Protocolos" 
           icon={FileBadge}
           colorClass="text-slate-400"
        />

        <div className="flex flex-col gap-6">
           {OPERATIONAL_POLICIES.map((policy) => {
             const isOpen = expandedPolicy === policy.id;
             const Icon = policy.icon;
             
             // Extract base color for neon effects
             const baseColorClass = policy.colorClass; // e.g., 'text-indigo-400'
             
             // Determine shadow color based on the text color class logic
             // (Using tailwind arbitrary values for dynamic-like behavior in mapping)
             let shadowColor = "shadow-slate-500/20";
             let borderColor = "border-slate-700";
             let glowBg = "bg-slate-500/10";
             
             if (baseColorClass.includes('indigo')) { shadowColor = "shadow-[0_0_20px_rgba(129,140,248,0.25)]"; borderColor = "border-indigo-500/50"; glowBg="bg-indigo-500/10"; }
             else if (baseColorClass.includes('emerald')) { shadowColor = "shadow-[0_0_20px_rgba(52,211,153,0.25)]"; borderColor = "border-emerald-500/50"; glowBg="bg-emerald-500/10"; }
             else if (baseColorClass.includes('blue')) { shadowColor = "shadow-[0_0_20px_rgba(96,165,250,0.25)]"; borderColor = "border-blue-500/50"; glowBg="bg-blue-500/10"; }
             else if (baseColorClass.includes('amber')) { shadowColor = "shadow-[0_0_20px_rgba(251,191,36,0.25)]"; borderColor = "border-amber-500/50"; glowBg="bg-amber-500/10"; }
             else if (baseColorClass.includes('rose')) { shadowColor = "shadow-[0_0_20px_rgba(251,113,133,0.25)]"; borderColor = "border-rose-500/50"; glowBg="bg-rose-500/10"; }
             else if (baseColorClass.includes('violet')) { shadowColor = "shadow-[0_0_20px_rgba(167,139,250,0.25)]"; borderColor = "border-violet-500/50"; glowBg="bg-violet-500/10"; }
             else if (baseColorClass.includes('orange')) { shadowColor = "shadow-[0_0_20px_rgba(251,146,60,0.25)]"; borderColor = "border-orange-500/50"; glowBg="bg-orange-500/10"; }

             return (
               <div 
                  key={policy.id} 
                  className={cn(
                     "rounded-2xl overflow-hidden transition-all duration-500 border group",
                     isOpen 
                        ? cn("bg-slate-900", borderColor, shadowColor) 
                        : "bg-slate-950/40 border-slate-800 hover:border-slate-600"
                  )}
               >
                  {/* Header */}
                  <div 
                    onClick={() => togglePolicy(policy.id)}
                    className="flex items-center justify-between p-6 cursor-pointer relative"
                  >
                     {/* Hover Glow Effect */}
                     <div className={cn("absolute inset-0 opacity-0 group-hover:opacity-100 transition-opacity duration-500 pointer-events-none", glowBg)}></div>

                    <div className="flex items-center gap-6 relative z-10">
                       {/* Icon Box with Neon Glow */}
                       <div className={cn(
                          "w-14 h-14 rounded-xl border flex items-center justify-center transition-all duration-300 shadow-lg", 
                          isOpen 
                             ? cn("bg-slate-900", borderColor.replace('border-', 'border-'), policy.colorClass.replace('text-', 'shadow-').replace('400', '500/40'))
                             : "bg-slate-950 border-slate-800"
                       )}>
                          <Icon className={cn("h-7 w-7", policy.colorClass, isOpen && "animate-pulse")} />
                       </div>
                       
                       <div className="flex flex-col gap-1.5">
                          <h3 className={cn("text-xl font-bold transition-colors tracking-tight", isOpen ? "text-white" : "text-slate-300")}>
                             {policy.title}
                          </h3>
                          {/* Neon Pill Badge */}
                          <div className={cn(
                             "inline-flex items-center px-2.5 py-0.5 rounded text-[10px] font-bold uppercase tracking-widest border w-fit",
                             isOpen 
                                ? cn(glowBg, borderColor, policy.colorClass) 
                                : "bg-slate-900 border-slate-800 text-slate-500"
                          )}>
                             <span className={cn("w-1.5 h-1.5 rounded-full mr-2", isOpen ? policy.colorClass.replace('text-', 'bg-') : "bg-slate-600")}></span>
                             PROTOCOL {policy.id.substring(0,3).toUpperCase()}
                          </div>
                       </div>
                    </div>

                    <div className={cn(
                       "w-10 h-10 flex items-center justify-center rounded-full bg-slate-950 border border-slate-800 text-slate-500 transition-all duration-500 relative z-10", 
                       isOpen && cn("rotate-180 bg-slate-800 text-white", borderColor)
                    )}>
                       <ChevronDown className="h-5 w-5" />
                    </div>
                  </div>

                  {/* Body */}
                  <div className={cn("grid transition-[grid-template-rows] duration-500 ease-[cubic-bezier(0.4,0,0.2,1)]", isOpen ? "grid-rows-[1fr]" : "grid-rows-[0fr]")}>
                     <div className="overflow-hidden">
                        <div className="px-6 pb-8 pt-0 ml-[80px] mr-6 border-t border-slate-800/50 pt-6 space-y-8">
                           {policy.content.map((block, idx) => (
                             <div key={idx} className="space-y-3 relative">
                                {/* Decorator Line for sections */}
                                <div className="absolute -left-6 top-2 bottom-2 w-px bg-slate-800"></div>

                                {/* Subtitle */}
                                {block.subtitle && (
                                   <div className="flex items-center gap-3">
                                      <div className={cn("w-2 h-2 rounded-sm rotate-45", policy.colorClass.replace('text-', 'bg-'))}></div>
                                      <h4 className={cn("text-sm font-bold uppercase tracking-widest", policy.colorClass)}>{block.subtitle}</h4>
                                   </div>
                                )}
                                
                                {/* Plain Text */}
                                {block.text && (
                                   <p className="text-sm text-slate-300 leading-7 font-light">{block.text}</p>
                                )}

                                {/* Lists */}
                                {block.list && (
                                   <ul className="space-y-3 mt-2">
                                      {block.list.map((item, i) => (
                                         <li key={i} className="flex items-start gap-3 text-sm text-slate-300 group/item">
                                            <span className={cn(
                                               "mt-2 w-1.5 h-1.5 rounded-full shrink-0 transition-colors", 
                                               "bg-slate-700 group-hover/item:bg-white"
                                            )}></span>
                                            <span className="leading-relaxed font-light">{item}</span>
                                         </li>
                                      ))}
                                   </ul>
                                )}

                                {/* Formulas - Code Block Style */}
                                {block.formula && (
                                   <div className="space-y-3 mt-3">
                                      {block.formula.map((f, i) => (
                                         <div key={i} className="relative group/code">
                                            <div className="absolute inset-0 bg-slate-800/50 rounded-lg blur opacity-0 group-hover/code:opacity-100 transition-opacity"></div>
                                            <div className="relative bg-slate-950 border border-slate-800 rounded-lg px-4 py-3 text-xs font-mono text-slate-300 flex items-center gap-3 shadow-inner">
                                               <span className="text-slate-600 select-none">$</span>
                                               <span className="tracking-wide">{f}</span>
                                            </div>
                                         </div>
                                      ))}
                                   </div>
                                )}

                                {/* Highlight/Clause - Warning Box Style */}
                                {block.highlight && (
                                   <div className="mt-4 p-4 bg-rose-950/10 border border-rose-500/20 rounded-lg text-sm text-rose-200/80 flex items-start gap-3 relative overflow-hidden">
                                      <div className="absolute left-0 top-0 bottom-0 w-1 bg-rose-500"></div>
                                      <AlertCircle className="h-5 w-5 text-rose-500 shrink-0 mt-0.5" />
                                      <div className="leading-relaxed">
                                         <span className="font-bold text-rose-400 block mb-1 uppercase text-xs tracking-wider">Cláusula Crítica</span>
                                         <span className="italic">{block.highlight}</span>
                                      </div>
                                   </div>
                                )}
                             </div>
                           ))}
                        </div>
                     </div>
                  </div>
               </div>
             );
           })}
        </div>
      </section>

    </div>
  );
};

export default Dashboard;