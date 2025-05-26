import { useState, useCallback } from 'react';
import { ThesisSection, SearchResult } from '../types';

export const useSearch = (sections: ThesisSection[]) => {
  const [searchResults, setSearchResults] = useState<SearchResult[]>([]);
  const [searchQuery, setSearchQuery] = useState('');

  const getAllSections = useCallback((sections: ThesisSection[]): ThesisSection[] => {
    let allSections: ThesisSection[] = [...sections];
    
    sections.forEach(section => {
      if (section.subsections && section.subsections.length > 0) {
        allSections = [...allSections, ...getAllSections(section.subsections)];
      }
    });
    
    return allSections;
  }, []);

  const search = useCallback((query: string) => {
    if (!query.trim()) {
      setSearchResults([]);
      setSearchQuery('');
      return;
    }
    
    setSearchQuery(query);
    
    const allSections = getAllSections(sections);
    const results: SearchResult[] = [];
    
    const searchTerms = query.toLowerCase().split(' ').filter(term => term.length > 0);
    
    allSections.forEach(section => {
      const content = section.content.toLowerCase();
      let matchCount = 0;
      
      searchTerms.forEach(term => {
        const regex = new RegExp(term, 'gi');
        const matches = content.match(regex);
        if (matches) {
          matchCount += matches.length;
        }
      });
      
      if (matchCount > 0) {
        // Extract a relevant snippet of text around the match
        let matchText = section.content;
        const firstTerm = searchTerms[0];
        const matchIndex = content.indexOf(firstTerm);
        
        if (matchIndex !== -1) {
          const startIndex = Math.max(0, matchIndex - 50);
          const endIndex = Math.min(section.content.length, matchIndex + firstTerm.length + 100);
          matchText = section.content.substring(startIndex, endIndex);
          
          if (startIndex > 0) {
            matchText = '...' + matchText;
          }
          
          if (endIndex < section.content.length) {
            matchText = matchText + '...';
          }
        }
        
        results.push({
          sectionId: section.id,
          sectionTitle: section.title,
          matchText,
          relevanceScore: matchCount
        });
      }
    });
    
    // Sort by relevance score (highest first)
    results.sort((a, b) => b.relevanceScore - a.relevanceScore);
    
    setSearchResults(results);
  }, [sections, getAllSections]);
  
  return { search, searchResults, searchQuery };
};

export default useSearch;