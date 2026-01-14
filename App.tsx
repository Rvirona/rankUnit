import React, { useEffect } from 'react';
import { HashRouter as Router, Routes, Route, Navigate, useLocation } from 'react-router-dom';
import Sidebar from './components/Sidebar';
import Dashboard from './components/Dashboard';
import ProjectDetail from './components/ProjectDetail';
import { ViewModeProvider, useViewMode } from './lib/context';
import { cn } from './lib/utils';
import { UserCircle2 } from 'lucide-react';

// ScrollToTop Component: Handles window scroll on route transitions
const ScrollToTop = () => {
  const { pathname } = useLocation();

  useEffect(() => {
    window.scrollTo(0, 0);
  }, [pathname]);

  return null;
};

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
        <ScrollToTop />
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