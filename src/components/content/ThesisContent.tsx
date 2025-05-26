import React, { useState, useEffect } from 'react';
import { ThesisSection, Citation } from '../../types';
import Badge from '../ui/Badge';
import { ExternalLink, AlertCircle, CheckCircle } from 'lucide-react';

interface ThesisContentProps {
  section: ThesisSection;
}

export const ThesisContent: React.FC<ThesisContentProps> = ({ section }) => {
  const [animate, setAnimate] = useState(false);

  useEffect(() => {
    setAnimate(true);
    const timer = setTimeout(() => {
      setAnimate(false);
    }, 500);
    return () => clearTimeout(timer);
  }, [section.id]);

  const renderCredibilityIndicator = (score?: number) => {
    if (score === undefined) return null;
    
    let variant: 'success' | 'warning' | 'error' = 'success';
    let icon = CheckCircle;
    
    if (score < 0.7) {
      variant = 'error';
      icon = AlertCircle;
    } else if (score < 0.85) {
      variant = 'warning';
      icon = AlertCircle;
    }
    
    return (
      <Badge 
        variant={variant} 
        className="ml-2 flex items-center gap-1"
      >
        {React.createElement(icon, { size: 12 })}
        <span>{Math.round(score * 100)}% credible</span>
      </Badge>
    );
  };

  const renderCitations = (citations?: Citation[]) => {
    if (!citations || citations.length === 0) return null;
    
    return (
      <div className="mt-6 pt-4 border-t border-slate-200">
        <h3 className="text-sm font-medium text-slate-700 mb-2">Citations</h3>
        <ul className="space-y-2">
          {citations.map((citation) => (
            <li key={citation.id} className="text-sm bg-slate-50 p-3 rounded-md">
              <div className="flex items-start">
                <div className="flex-1">
                  <p className="text-slate-700">{citation.text}</p>
                  <div className="mt-1 flex items-center text-xs text-slate-500">
                    <span className="font-medium">{citation.source}</span>
                    <span className="mx-1">•</span>
                    <span>{citation.date}</span>
                    {citation.url && (
                      <>
                        <span className="mx-1">•</span>
                        <a 
                          href={citation.url} 
                          target="_blank" 
                          rel="noopener noreferrer"
                          className="text-blue-600 hover:underline flex items-center"
                        >
                          View source <ExternalLink size={12} className="ml-0.5" />
                        </a>
                      </>
                    )}
                  </div>
                </div>
                <Badge 
                  variant={citation.verified ? 'success' : 'warning'} 
                  size="sm"
                  className="ml-2"
                >
                  {citation.verified ? 'Verified' : 'Unverified'}
                </Badge>
              </div>
            </li>
          ))}
        </ul>
      </div>
    );
  };

  return (
    <div
      className={`bg-white rounded-lg shadow-sm p-6 transition-opacity duration-300 ${
        animate ? 'opacity-0' : 'opacity-100'
      }`}
    >
      <div className="mb-4 flex flex-wrap items-center">
        <h2 className="text-2xl font-bold text-slate-900">{section.title}</h2>
        {renderCredibilityIndicator(section.credibilityScore)}
        <div className="w-full mt-1">
          <span className="text-xs text-slate-500">
            Last updated: {section.lastUpdated} • Version: {section.version}
          </span>
        </div>
      </div>
      
      <div className="prose prose-slate max-w-none">
        <p>{section.content}</p>
      </div>
      
      {section.subsections && section.subsections.length > 0 && (
        <div className="mt-8 space-y-6">
          {section.subsections.map((subsection) => (
            <div key={subsection.id} className="border-l-2 border-slate-200 pl-4">
              <h3 className="text-xl font-semibold text-slate-800 mb-2 flex items-center">
                {subsection.title}
                {renderCredibilityIndicator(subsection.credibilityScore)}
              </h3>
              <div className="prose prose-slate max-w-none">
                <p>{subsection.content}</p>
              </div>
              {renderCitations(subsection.citations)}
            </div>
          ))}
        </div>
      )}
      
      {renderCitations(section.citations)}
    </div>
  );
};

export default ThesisContent;