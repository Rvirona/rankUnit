import { LucideIcon } from "lucide-react";

export interface MetricItem {
  id: string;
  label: string;
  value: string | number;
  change?: string;
  trend?: 'up' | 'down' | 'neutral';
  icon: LucideIcon;
  colorClass: string;
  bgClass: string;
}

export interface ChartDataPoint {
  name: string;
  value: number;
  color: string;
}

export interface NavItem {
  label: string;
  href: string;
  icon: LucideIcon;
  active?: boolean;
}

export type Quarter = 'Q1' | 'Q2' | 'Q3' | 'Q4';
export type ObjectiveStatus = 'todo' | 'in_progress' | 'done';

export interface StrategicObjective {
  id: string;
  title: string;
  description: string;
  kpiTarget: string;
  status: ObjectiveStatus;
}

export interface ProjectDetails {
  id: string;
  name: string;
  url: string;
  progress: number;
  startDate: string;
  endDate: string;
  status: 'active' | 'paused' | 'completed';
  type: 'custom' | 'standard';
}

export interface KeywordData {
  id: string;
  term: string;
  volume: number;
  kd: number;
  potentialTraffic: number;
  status: 'top_3' | 'in_progress' | 'opportunity';
  secondaryKeywords: string[];
}

export type LogType = 'milestone' | 'technical' | 'backlink' | 'content';

export interface ActivityLogItem {
  id: string;
  date: string;
  title: string;
  description: string;
  type: LogType;
  user?: string;
}

export interface ViewModeContextType {
  isClientMode: boolean;
  toggleViewMode: () => void;
}

// NEW TYPES FOR ASSET GRID
export type AssetStatus = 'performing' | 'needs_update' | 'critical' | 'indexing';

export interface AssetItem {
  id: string;
  title: string;
  url: string;
  lastMod: string;
  focusKeyword: string;
  rank: number | string; // number or "--"
  status: AssetStatus;
  opportunity: string;
  healthScore: number; // 0 to 100
  country: string; // ISO code like 'mx', 'co', etc.
}

// NEW TYPES FOR ADVANCED FEATURES
export interface CannibalizationItem {
  keyword: string;
  primaryUrl: string;
  primaryRank: number;
  conflictingUrl: string;
  conflictingRank: number;
  impact: 'high' | 'medium' | 'low';
}

export interface CompetitorMetric {
  metric: string;
  us: string | number;
  top3Avg: string | number;
  diff: number; // positive is good, negative needs work
  unit?: string;
}

// NEW TYPE FOR QUICK WINS SECTION
export interface QuickWinItem {
  id: string;
  keyword: string;
  description: string;
  volume: number;
  difficulty: number;
  country: string;
  potentialTraffic: number;
  parentKeyword?: string;
  initialRank: number;
  targetRank: number;
  secondaryKeywords: string[];
  status: 'IN PROGRESS' | 'DONE';
}

// UPDATED TYPES FOR POLICY SECTION (Structured Text)
export interface PolicyContentBlock {
  subtitle?: string;
  text?: string;
  list?: string[];
  formula?: string[]; // For specific formula styling
  highlight?: string; // For critical clauses
}

export interface PolicyCategory {
  id: string;
  title: string;
  icon: LucideIcon;
  colorClass: string;
  content: PolicyContentBlock[];
}