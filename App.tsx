import React from 'react';
import { HashRouter as Router, Routes, Route, Navigate } from 'react-router-dom';
import Sidebar from './components/Sidebar';
import Dashboard from './components/Dashboard';
import ProjectDetail from './components/ProjectDetail';
import { ViewModeProvider, useViewMode } from './lib/context';
import { cn } from './lib/utils';
import { UserCircle2 } from 'lucide-react';

// Top Navbar Component
const TopBar = () => {
  const { isClientMode, toggleViewMode } = useViewMode();

  return (
    <header className="sticky top-0 z-40 h-16 bg-slate-950/80 backdrop-blur-md border-b border-slate-800 flex items-center justify-between px-8">
      {/* Breadcrumb Placeholder */}
      <div className="text-sm text-slate-500">
        Orbit <span className="mx-2 text-slate-700">/</span> Gestión
      </div>

      <div className="flex items-center gap-6">
        {/* Client Mode Toggle */}
        <div className="flex items-center gap-3 bg-slate-900 rounded-full p-1 border border-slate-800">
          <button
            onClick={toggleViewMode}
            className={cn(
              "px-4 py-1.5 rounded-full text-xs font-semibold transition-all duration-300",
              !isClientMode 
                ? "bg-slate-800 text-white shadow-sm" 
                : "text-slate-500 hover:text-slate-300"
            )}
          >
            SEO View
          </button>
          <button
            onClick={toggleViewMode}
            className={cn(
              "px-4 py-1.5 rounded-full text-xs font-semibold transition-all duration-300",
              isClientMode 
                ? "bg-gradient-to-r from-emerald-500 to-emerald-600 text-white shadow-lg shadow-emerald-500/20" 
                : "text-slate-500 hover:text-slate-300"
            )}
          >
            Client Mode
          </button>
        </div>

        {/* User Profile */}
        <div className="flex items-center gap-2 text-slate-300 hover:text-white cursor-pointer transition-colors">
          <UserCircle2 className="h-6 w-6" />
          <span className="text-sm font-medium">Admin User</span>
        </div>
      </div>
    </header>
  );
};

// Layout wrapper component
const Layout: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  return (
    <div className="flex min-h-screen bg-slate-950 font-sans text-slate-100 selection:bg-emerald-500/30 selection:text-emerald-200">
      <Sidebar />
      <main className="flex-1 ml-64 min-h-screen flex flex-col">
        <TopBar />
        <div className="p-8 max-w-7xl mx-auto w-full flex-1">
          {children}
        </div>
      </main>
    </div>
  );
};

const App: React.FC = () => {
  return (
    <ViewModeProvider>
      <Router>
        <Layout>
          <Routes>
            <Route path="/" element={<Dashboard />} />
            <Route path="/projects/:id" element={<ProjectDetail />} />
            <Route path="*" element={<Navigate to="/" replace />} />
          </Routes>
        </Layout>
      </Router>
    </ViewModeProvider>
  );
};

export default App;