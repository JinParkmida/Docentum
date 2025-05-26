import React from 'react';
import { ThesisSection } from '../../types';
import { ChevronDown, ChevronRight, BookOpen } from 'lucide-react';

interface SidebarProps {
  sections: ThesisSection[];
  activeSection: string;
  onSectionSelect: (sectionId: string) => void;
}

export const Sidebar: React.FC<SidebarProps> = ({
  sections,
  activeSection,
  onSectionSelect,
}) => {
  const [expandedSections, setExpandedSections] = React.useState<Record<string, boolean>>({});

  const toggleSection = (sectionId: string) => {
    setExpandedSections((prev) => ({
      ...prev,
      [sectionId]: !prev[sectionId],
    }));
  };

  const renderSection = (section: ThesisSection, level = 0) => {
    const hasSubsections = section.subsections && section.subsections.length > 0;
    const isExpanded = expandedSections[section.id] || activeSection === section.id;
    const isActive = activeSection === section.id;

    return (
      <div key={section.id} className="mb-1">
        <div
          className={`flex items-center py-2 px-3 rounded-md cursor-pointer text-sm transition-colors ${
            isActive
              ? 'bg-slate-100 text-slate-900 font-medium'
              : 'text-slate-700 hover:bg-slate-50'
          }`}
          style={{ paddingLeft: `${level > 0 ? level * 12 + 12 : 12}px` }}
          onClick={() => onSectionSelect(section.id)}
        >
          {hasSubsections ? (
            <button
              className="mr-1 p-0.5 rounded-sm hover:bg-slate-200 focus:outline-none"
              onClick={(e) => {
                e.stopPropagation();
                toggleSection(section.id);
              }}
            >
              {isExpanded ? (
                <ChevronDown size={14} className="text-slate-500" />
              ) : (
                <ChevronRight size={14} className="text-slate-500" />
              )}
            </button>
          ) : (
            <BookOpen size={14} className="mr-1 text-slate-500" />
          )}
          <span className="truncate">{section.title}</span>
        </div>
        {hasSubsections && isExpanded && (
          <div className="mt-1">
            {section.subsections!.map((subsection) =>
              renderSection(subsection, level + 1)
            )}
          </div>
        )}
      </div>
    );
  };

  return (
    <div className="w-64 border-r border-slate-200 h-full overflow-y-auto py-4 bg-white">
      <div className="px-4 mb-4">
        <h2 className="text-lg font-bold text-slate-900 mb-1">Contents</h2>
        <div className="text-xs text-slate-500">Interactive Thesis Platform</div>
      </div>
      <nav className="px-2">{sections.map((section) => renderSection(section))}</nav>
    </div>
  );
};

export default Sidebar;