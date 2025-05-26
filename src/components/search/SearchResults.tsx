import React from 'react';
import { SearchResult } from '../../types';
import { Search, ArrowRight } from 'lucide-react';
import Button from '../ui/Button';

interface SearchResultsProps {
  results: SearchResult[];
  onResultSelect: (sectionId: string) => void;
  query: string;
}

export const SearchResults: React.FC<SearchResultsProps> = ({
  results,
  onResultSelect,
  query,
}) => {
  if (!query) {
    return null;
  }

  if (results.length === 0) {
    return (
      <div className="bg-white rounded-lg shadow-sm p-6">
        <div className="text-center py-10">
          <Search className="mx-auto h-12 w-12 text-slate-300" />
          <h3 className="mt-2 text-sm font-semibold text-slate-900">No results found</h3>
          <p className="mt-1 text-sm text-slate-500">
            No matches found for "{query}". Try using different keywords.
          </p>
        </div>
      </div>
    );
  }

  const highlightMatches = (text: string, query: string) => {
    if (!query) return text;
    
    const parts = text.split(new RegExp(`(${query})`, 'gi'));
    return parts.map((part, i) => 
      part.toLowerCase() === query.toLowerCase() 
        ? <mark key={i} className="bg-yellow-200 px-0.5 rounded-sm">{part}</mark> 
        : part
    );
  };

  return (
    <div className="bg-white rounded-lg shadow-sm p-6">
      <h2 className="text-lg font-bold text-slate-900 mb-2">
        Search Results for "{query}"
      </h2>
      <p className="text-sm text-slate-500 mb-6">
        Found {results.length} {results.length === 1 ? 'result' : 'results'}
      </p>
      
      <div className="space-y-4">
        {results.map((result) => (
          <div key={result.sectionId} className="border border-slate-200 rounded-md p-4 hover:bg-slate-50 transition-colors">
            <h3 className="text-base font-medium text-slate-900 mb-1">
              {result.sectionTitle}
            </h3>
            <p className="text-sm text-slate-700 mb-3">
              {highlightMatches(result.matchText, query)}
            </p>
            <div className="flex justify-end">
              <Button
                variant="outline"
                size="sm"
                onClick={() => onResultSelect(result.sectionId)}
                icon={<ArrowRight size={14} />}
                iconPosition="right"
              >
                View section
              </Button>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default SearchResults;