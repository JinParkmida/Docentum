import React from 'react';
import Badge from '../ui/Badge';
import { AlertTriangle, CheckCircle, XCircle, AlertCircle, Info } from 'lucide-react';

interface ValidationPanelProps {
  sectionId: string;
  validationResults: Record<string, {
    credibilityScore: number;
    logicalFallacies: string[];
    citationAccuracy: number;
    statisticalValidity: number;
    inconsistencies: string[];
  }>;
}

export const ValidationPanel: React.FC<ValidationPanelProps> = ({
  sectionId,
  validationResults,
}) => {
  const results = validationResults[sectionId];

  if (!results) {
    return (
      <div className="bg-white rounded-lg shadow-sm p-6">
        <div className="text-center py-10">
          <Info className="mx-auto h-12 w-12 text-slate-300" />
          <h3 className="mt-2 text-sm font-semibold text-slate-900">No validation data</h3>
          <p className="mt-1 text-sm text-slate-500">
            This section hasn't been validated yet.
          </p>
        </div>
      </div>
    );
  }

  const getScoreColor = (score: number): 'success' | 'warning' | 'error' => {
    if (score >= 0.85) return 'success';
    if (score >= 0.7) return 'warning';
    return 'error';
  };

  const getScoreIcon = (score: number) => {
    if (score >= 0.85) return <CheckCircle size={16} />;
    if (score >= 0.7) return <AlertCircle size={16} />;
    return <XCircle size={16} />;
  };

  return (
    <div className="bg-white rounded-lg shadow-sm p-6">
      <h2 className="text-lg font-bold text-slate-900 mb-4">Research Validation</h2>
      
      <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-6">
        <div className="bg-slate-50 p-4 rounded-md">
          <div className="flex justify-between items-center mb-2">
            <h3 className="text-sm font-medium text-slate-700">Credibility Score</h3>
            <Badge 
              variant={getScoreColor(results.credibilityScore)} 
              className="flex items-center gap-1"
            >
              {getScoreIcon(results.credibilityScore)}
              <span>{Math.round(results.credibilityScore * 100)}%</span>
            </Badge>
          </div>
          <div className="w-full bg-slate-200 rounded-full h-2.5">
            <div 
              className={`h-2.5 rounded-full ${
                getScoreColor(results.credibilityScore) === 'success' 
                  ? 'bg-green-500' 
                  : getScoreColor(results.credibilityScore) === 'warning'
                    ? 'bg-amber-500'
                    : 'bg-red-500'
              }`} 
              style={{ width: `${results.credibilityScore * 100}%` }}
            ></div>
          </div>
        </div>
        
        <div className="bg-slate-50 p-4 rounded-md">
          <div className="flex justify-between items-center mb-2">
            <h3 className="text-sm font-medium text-slate-700">Citation Accuracy</h3>
            <Badge 
              variant={getScoreColor(results.citationAccuracy)} 
              className="flex items-center gap-1"
            >
              {getScoreIcon(results.citationAccuracy)}
              <span>{Math.round(results.citationAccuracy * 100)}%</span>
            </Badge>
          </div>
          <div className="w-full bg-slate-200 rounded-full h-2.5">
            <div 
              className={`h-2.5 rounded-full ${
                getScoreColor(results.citationAccuracy) === 'success' 
                  ? 'bg-green-500' 
                  : getScoreColor(results.citationAccuracy) === 'warning'
                    ? 'bg-amber-500'
                    : 'bg-red-500'
              }`} 
              style={{ width: `${results.citationAccuracy * 100}%` }}
            ></div>
          </div>
        </div>
        
        <div className="bg-slate-50 p-4 rounded-md">
          <div className="flex justify-between items-center mb-2">
            <h3 className="text-sm font-medium text-slate-700">Statistical Validity</h3>
            <Badge 
              variant={getScoreColor(results.statisticalValidity)} 
              className="flex items-center gap-1"
            >
              {getScoreIcon(results.statisticalValidity)}
              <span>{Math.round(results.statisticalValidity * 100)}%</span>
            </Badge>
          </div>
          <div className="w-full bg-slate-200 rounded-full h-2.5">
            <div 
              className={`h-2.5 rounded-full ${
                getScoreColor(results.statisticalValidity) === 'success' 
                  ? 'bg-green-500' 
                  : getScoreColor(results.statisticalValidity) === 'warning'
                    ? 'bg-amber-500'
                    : 'bg-red-500'
              }`} 
              style={{ width: `${results.statisticalValidity * 100}%` }}
            ></div>
          </div>
        </div>
      </div>
      
      {results.logicalFallacies.length > 0 && (
        <div className="mb-6">
          <h3 className="text-sm font-medium text-slate-700 mb-2">Logical Fallacies</h3>
          <div className="bg-amber-50 border border-amber-200 rounded-md p-3">
            <div className="flex">
              <AlertTriangle className="h-5 w-5 text-amber-500 mr-2 flex-shrink-0" />
              <div>
                <p className="text-sm text-amber-800 font-medium">Potential logical issues detected</p>
                <ul className="mt-1 text-sm text-amber-700 list-disc list-inside">
                  {results.logicalFallacies.map((fallacy, index) => (
                    <li key={index}>{fallacy}</li>
                  ))}
                </ul>
              </div>
            </div>
          </div>
        </div>
      )}
      
      {results.inconsistencies.length > 0 && (
        <div>
          <h3 className="text-sm font-medium text-slate-700 mb-2">Inconsistencies</h3>
          <div className="bg-red-50 border border-red-200 rounded-md p-3">
            <div className="flex">
              <XCircle className="h-5 w-5 text-red-500 mr-2 flex-shrink-0" />
              <div>
                <p className="text-sm text-red-800 font-medium">Content inconsistencies found</p>
                <ul className="mt-1 text-sm text-red-700 list-disc list-inside">
                  {results.inconsistencies.map((inconsistency, index) => (
                    <li key={index}>{inconsistency}</li>
                  ))}
                </ul>
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default ValidationPanel;