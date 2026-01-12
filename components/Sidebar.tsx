import React from 'react';
import { useNavigate } from 'react-router-dom';
import { 
  LayoutDashboard, 
  Layers, 
  Key, 
  Settings, 
  PieChart, 
  LogOut,
  Search
} from 'lucide-react';
import { cn } from '../lib/utils';

const Sidebar = () => {
  const navigate = useNavigate();

  const navItems = [
    { icon: LayoutDashboard, label: 'Panel de Activos', active: true },
    { icon: Layers, label: 'Estrategias', active: false },
    { icon: Key, label: 'Keywords', active: false },
    { icon: PieChart, label: 'Reportes', active: false },
    { icon: Settings, label: 'Configuración', active: false },
  ];

  return (
    <aside className="fixed left-0 top-0 h-full w-64 bg-slate-900 border-r border-slate-800 flex flex-col z-50">
      {/* Logo Area */}
      <div className="h-16 flex items-center px-6 border-b border-slate-800">
        <div 
          onClick={() => navigate('/')} 
          className="flex items-center gap-2 cursor-pointer hover:opacity-90 transition-opacity"
        >
          <div className="w-8 h-8 rounded-lg bg-gradient-to-br from-violet-600 to-indigo-600 flex items-center justify-center shadow-lg shadow-violet-500/20">
            <span className="font-bold text-white text-lg">R</span>
          </div>
          <span className="text-xl font-bold text-white tracking-tight">RankUnit</span>
        </div>
      </div>

      {/* Search Placeholder */}
      <div className="p-4">
        <div className="relative">
          <Search className="absolute left-3 top-2.5 h-4 w-4 text-slate-500" />
          <input 
            type="text" 
            placeholder="Buscar URL o ID..." 
            className="w-full bg-slate-950 border border-slate-800 text-slate-200 text-sm rounded-lg pl-9 pr-3 py-2 focus:outline-none focus:border-violet-500 transition-colors placeholder:text-slate-600"
          />
        </div>
      </div>

      {/* Navigation */}
      <nav className="flex-1 px-3 py-2 space-y-1">
        {navItems.map((item) => (
          <button
            key={item.label}
            className={cn(
              "w-full flex items-center gap-3 px-3 py-2.5 rounded-lg text-sm font-medium transition-all duration-200 group",
              item.active 
                ? "bg-slate-800 text-violet-400 shadow-sm border border-slate-700/50" 
                : "text-slate-400 hover:text-slate-100 hover:bg-slate-800/50"
            )}
          >
            <item.icon className={cn(
              "h-5 w-5 transition-colors",
              item.active ? "text-violet-400" : "text-slate-500 group-hover:text-slate-300"
            )} />
            {item.label}
          </button>
        ))}
      </nav>

      {/* User / Footer */}
      <div className="p-4 border-t border-slate-800">
        <button className="flex items-center gap-3 w-full px-3 py-2 text-slate-400 hover:text-white hover:bg-slate-800 rounded-lg transition-colors text-sm font-medium">
          <LogOut className="h-5 w-5" />
          <span>Cerrar Sesión</span>
        </button>
      </div>
    </aside>
  );
};

export default Sidebar;