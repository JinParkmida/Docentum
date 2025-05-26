import React from 'react';
import { VersionChange } from '../../types';
import Badge from '../ui/Badge';
import { Clock, Edit, Plus, Trash2 } from 'lucide-react';

interface VersionHistoryProps {
  changes: VersionChange[];
  activeSectionId: string;
}

export const VersionHistory: React.FC<VersionHistoryProps> = ({
  changes,
  activeSectionId,
}) => {
  const filteredChanges = changes.filter(
    (change) => change.sectionId === activeSectionId
  );

  const getChangeTypeIcon = (type: string) => {
    switch (type) {
      case 'addition':
        return <Plus size={14} />;
      case 'deletion':
        return <Trash2 size={14} />;
      case 'modification':
        return <Edit size={14} />;
      default:
        return null;
    }
  };

  const getChangeTypeColor = (type: string): 'success' | 'error' | 'warning' => {
    switch (type) {
      case 'addition':
        return 'success';
      case 'deletion':
        return 'error';
      case 'modification':
        return 'warning';
      default:
        return 'warning';
    }
  };

  const formatTimestamp = (timestamp: string) => {
    const date = new Date(timestamp);
    return date.toLocaleString();
  };

  if (filteredChanges.length === 0) {
    return (
      <div className="bg-white rounded-lg shadow-sm p-6">
        <div className="text-center py-10">
          <Clock className="mx-auto h-12 w-12 text-slate-300" />
          <h3 className="mt-2 text-sm font-semibold text-slate-900">No version history</h3>
          <p className="mt-1 text-sm text-slate-500">
            No changes have been recorded for this section yet.
          </p>
        </div>
      </div>
    );
  }

  return (
    <div className="bg-white rounded-lg shadow-sm p-6">
      <h2 className="text-lg font-bold text-slate-900 mb-4">Version History</h2>
      <div className="space-y-6">
        {filteredChanges.map((change) => (
          <div key={change.id} className="border-l-2 border-slate-200 pl-4 relative">
            <div
              className="absolute -left-1.5 top-0 h-3 w-3 rounded-full bg-white border-2 border-slate-300"
              aria-hidden="true"
            />
            <div className="flex items-center mb-2">
              <Badge
                variant={getChangeTypeColor(change.type)}
                size="sm"
                className="flex items-center space-x-1"
              >
                {getChangeTypeIcon(change.type)}
                <span>{change.type.charAt(0).toUpperCase() + change.type.slice(1)}</span>
              </Badge>
              <span className="ml-2 text-xs text-slate-500">
                {formatTimestamp(change.timestamp)} by {change.author}
              </span>
            </div>
            
            {change.type === 'modification' && (
              <>
                <div className="bg-red-50 p-3 rounded-md mb-2">
                  <h4 className="text-xs font-medium text-red-800 mb-1">Previous Version</h4>
                  <p className="text-sm text-slate-700">{change.previousContent || '(Empty)'}</p>
                </div>
                <div className="bg-green-50 p-3 rounded-md">
                  <h4 className="text-xs font-medium text-green-800 mb-1">New Version</h4>
                  <p className="text-sm text-slate-700">{change.newContent}</p>
                </div>
              </>
            )}
            
            {change.type === 'addition' && (
              <div className="bg-green-50 p-3 rounded-md">
                <h4 className="text-xs font-medium text-green-800 mb-1">Added Content</h4>
                <p className="text-sm text-slate-700">{change.newContent}</p>
              </div>
            )}
            
            {change.type === 'deletion' && (
              <div className="bg-red-50 p-3 rounded-md">
                <h4 className="text-xs font-medium text-red-800 mb-1">Deleted Content</h4>
                <p className="text-sm text-slate-700">{change.previousContent}</p>
              </div>
            )}
          </div>
        ))}
      </div>
    </div>
  );
};

export default VersionHistory;