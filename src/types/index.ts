export interface ThesisSection {
  id: string;
  title: string;
  content: string;
  subsections?: ThesisSection[];
  citations?: Citation[];
  credibilityScore?: number;
  version: number;
  lastUpdated: string;
}

export interface Citation {
  id: string;
  text: string;
  source: string;
  url?: string;
  date: string;
  verified: boolean;
}

export interface SearchResult {
  sectionId: string;
  sectionTitle: string;
  matchText: string;
  relevanceScore: number;
}

export interface VersionChange {
  id: string;
  sectionId: string;
  timestamp: string;
  author: string;
  previousContent: string;
  newContent: string;
  type: 'addition' | 'modification' | 'deletion';
}

export interface ValidationResult {
  sectionId: string;
  credibilityScore: number;
  logicalFallacies: string[];
  citationAccuracy: number;
  statisticalValidity: number;
  inconsistencies: string[];
}