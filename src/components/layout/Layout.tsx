import React, { useState } from 'react';
import Header from './Header';
import Sidebar from './Sidebar';
import { ThesisSection } from '../../types';

interface LayoutProps {
  sections: ThesisSection[];
  children: React.ReactNode;
  activeSection: string;
  onSectionSelect: (sectionId: string) => void;
  onSearch: (query: string) => void;
}

export const Layout: React.FC<LayoutProps> = ({
  sections,
  children,
  activeSection,
  onSectionSelect,
  onSearch,
}) => {
  const [activeTab, setActiveTab] = useState('content');
  const [isSidebarOpen, setIsSidebarOpen] = useState(false);

  const toggleSidebar = () => {
    setIsSidebarOpen(!isSidebarOpen);
  };

  const handleTabChange = (tab: string) => {
    setActiveTab(tab);
  };

  return (
    <div className="flex flex-col h-screen bg-slate-50">
      <Header
        activeTab={activeTab}
        onTabChange={handleTabChange}
        onToggleSidebar={toggleSidebar}
        isSidebarOpen={isSidebarOpen}
        onSearch={onSearch}
      />
      <div className="flex flex-1 pt-16">
        <div
          className={`fixed md:static inset-0 transform ${
            isSidebarOpen ? 'translate-x-0' : '-translate-x-full'
          } md:translate-x-0 transition-transform duration-300 ease-in-out z-20 md:z-0`}
        >
          <div className="h-full" onClick={(e) => e.stopPropagation()}>
            <Sidebar
              sections={sections}
              activeSection={activeSection}
              onSectionSelect={(sectionId) => {
                onSectionSelect(sectionId);
                setIsSidebarOpen(false);
              }}
            />
          </div>
        </div>
        {isSidebarOpen && (
          <div
            className="fixed inset-0 bg-black bg-opacity-50 z-10 md:hidden"
            onClick={toggleSidebar}
          ></div>
        )}
        <main className="flex-1 overflow-auto p-6">{children}</main>
      </div>
    </div>
  );
};

export default Layout;