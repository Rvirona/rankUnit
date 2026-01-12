import React from 'react';
import { useNavigate } from 'react-router-dom';
import ReactCountryFlag from 'react-country-flag';
import { MOCK_ASSETS } from '../constants';
import { cn } from '../lib/utils';
import { 
  ArrowUpRight, 
  ExternalLink, 
  FileText, 
  AlertCircle,
  CheckCircle2,
  Clock,
  RefreshCw,
  Plus
} from 'lucide-react';
import { AssetStatus } from '../types';

const Dashboard = () => {
  const navigate = useNavigate();

  // Helper to get status badge styling
  const getStatusBadge = (status: AssetStatus) => {
    switch (status) {
      case 'performing':
        return (
          <span className="flex items-center gap-1.5 px-2.5 py-1 rounded-full text-xs font-semibold bg-emerald-500/10 text-emerald-400 border border-emerald-500/20">
            <CheckCircle2 className="h-3 w-3" /> Performing
          </span>
        );
      case 'needs_update':
        return (
          <span className="flex items-center gap-1.5 px-2.5 py-1 rounded-full text-xs font-semibold bg-amber-500/10 text-amber-400 border border-amber-500/20">
            <RefreshCw className="h-3 w-3" /> Needs Update
          </span>
        );
      case 'critical':
        return (
          <span className="flex items-center gap-1.5 px-2.5 py-1 rounded-full text-xs font-semibold bg-rose-500/10 text-rose-400 border border-rose-500/20">
            <AlertCircle className="h-3 w-3" /> Critical
          </span>
        );
      case 'indexing':
        return (
          <span className="flex items-center gap-1.5 px-2.5 py-1 rounded-full text-xs font-semibold bg-blue-500/10 text-blue-400 border border-blue-500/20">
            <Clock className="h-3 w-3" /> Indexing
          </span>
        );
    }
  };

  return (
    <div className="space-y-6 animate-in fade-in duration-500">
      
      {/* Header */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
        <div>
          <h1 className="text-3xl font-bold text-white tracking-tight">Activos Digitales</h1>
          <p className="text-slate-400 mt-1">Gestión de rendimiento URL por URL.</p>
        </div>
        <div className="flex gap-3">
           <button className="px-4 py-2 bg-slate-900 border border-slate-800 hover:bg-slate-800 text-slate-300 rounded-lg text-sm font-medium transition-colors flex items-center gap-2">
            <RefreshCw className="h-4 w-4" /> Sync GSC
          </button>
          <button className="px-4 py-2 bg-violet-600 hover:bg-violet-500 text-white rounded-lg text-sm font-medium shadow-lg shadow-violet-500/20 transition-all flex items-center gap-2">
            <Plus className="h-4 w-4" /> Nuevo Asset
          </button>
        </div>
      </div>

      {/* ASSET GRID (Master Table) */}
      <div className="bg-slate-900 border border-slate-800 rounded-xl overflow-hidden shadow-sm">
        
        {/* Table Filters/Toolbar Placeholder */}
        <div className="px-6 py-4 border-b border-slate-800 flex items-center justify-between bg-slate-950/30">
          <div className="text-sm text-slate-400 font-medium">Mostrando 4 activos prioritarios</div>
          <div className="flex gap-2">
             <span className="w-3 h-3 rounded-full bg-slate-800 border border-slate-700"></span>
             <span className="w-3 h-3 rounded-full bg-slate-800 border border-slate-700"></span>
             <span className="w-3 h-3 rounded-full bg-slate-800 border border-slate-700"></span>
          </div>
        </div>

        <div className="overflow-x-auto">
          <table className="w-full text-left border-collapse">
            <thead>
              <tr className="bg-slate-950/50 text-slate-400 text-xs uppercase tracking-wider font-semibold border-b border-slate-800">
                <th className="px-6 py-4 w-[40%]">Asset & URL</th>
                <th className="px-6 py-4 w-[15%]">Focus KPI</th>
                <th className="px-6 py-4 w-[15%]">Salud On-Page</th>
                <th className="px-6 py-4 w-[15%]">Estado & Oportunidad</th>
                <th className="px-6 py-4 w-[15%] text-center">País</th>
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
                    <div className="flex items-start gap-3">
                      <div className="mt-1 p-2 rounded-lg bg-slate-950 border border-slate-800 group-hover:border-violet-500/30 transition-colors">
                        <FileText className="h-5 w-5 text-violet-400" />
                      </div>
                      <div>
                        <h3 className="text-base font-bold text-white group-hover:text-violet-300 transition-colors">
                          {asset.title}
                        </h3>
                        <a 
                          href="#" 
                          onClick={(e) => e.stopPropagation()} 
                          className="flex items-center gap-1 text-xs text-slate-500 hover:text-slate-300 mt-1 truncate max-w-[200px] sm:max-w-[300px]"
                        >
                          <ExternalLink className="h-3 w-3" />
                          <span className="truncate">{asset.url}</span>
                        </a>
                        <div className="mt-2 text-xs font-mono text-slate-400">
                          KW: <span className="text-slate-200 bg-slate-800 px-1.5 py-0.5 rounded">{asset.focusKeyword}</span>
                        </div>
                      </div>
                    </div>
                  </td>

                  {/* Column 2: Focus KPI (Rank) */}
                  <td className="px-6 py-5 align-top">
                    <div className="flex flex-col">
                      <span className="text-xs text-slate-500 mb-1">Rank Actual</span>
                      <div className="flex items-baseline gap-2">
                        <span className={cn(
                          "text-3xl font-bold tracking-tight",
                          asset.rank === '--' ? "text-slate-600" :
                          Number(asset.rank) <= 3 ? "text-emerald-400" :
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
                        <div className="flex justify-between text-xs font-medium">
                          <span className="text-slate-400">Score</span>
                          <span className={cn(
                            asset.healthScore >= 90 ? "text-emerald-400" :
                            asset.healthScore >= 60 ? "text-violet-400" : "text-rose-400"
                          )}>{asset.healthScore}/100</span>
                        </div>
                        <div className="h-2 w-full bg-slate-950 rounded-full overflow-hidden border border-slate-800">
                          <div 
                            className={cn(
                              "h-full rounded-full transition-all duration-1000",
                              asset.healthScore >= 90 ? "bg-emerald-500" :
                              asset.healthScore >= 60 ? "bg-violet-500" : "bg-rose-500"
                            )}
                            style={{ width: `${asset.healthScore}%` }}
                          />
                        </div>
                     </div>
                  </td>

                  {/* Column 4: Status & Opportunity */}
                  <td className="px-6 py-5 align-top">
                    <div className="space-y-3">
                      <div>{getStatusBadge(asset.status)}</div>
                      <div className="text-xs text-slate-300 leading-snug">
                        <span className="text-slate-500 font-semibold block mb-0.5">Oportunidad:</span>
                        {asset.opportunity}
                      </div>
                    </div>
                  </td>

                  {/* Column 5: Country Flag (Using Library) */}
                  <td className="px-6 py-5 align-middle text-center">
                     <div className="flex justify-center group-hover:scale-110 transition-transform duration-300">
                      <ReactCountryFlag
                        countryCode={asset.country}
                        svg
                        style={{
                          width: '2em',
                          height: '2em',
                          borderRadius: '100%',
                          objectFit: 'cover'
                        }}
                        className="rounded-full border-2 border-slate-800 shadow-md"
                        title={asset.country}
                      />
                    </div>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
        
        {/* Table Footer / Pagination */}
        <div className="px-6 py-4 border-t border-slate-800 bg-slate-950/30 text-xs text-slate-500 flex justify-center">
           Mostrando todos los activos activos
        </div>
      </div>
    </div>
  );
};

export default Dashboard;