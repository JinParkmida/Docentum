import React, { useState } from 'react';
import Layout from './components/layout/Layout';
import ThesisContent from './components/content/ThesisContent';
import VersionHistory from './components/versions/VersionHistory';
import ValidationPanel from './components/validation/ValidationPanel';
import SearchResults from './components/search/SearchResults';
import PdfUploader from './components/upload/PdfUploader';
import { mockThesis, mockVersionChanges, mockValidationResults } from './data/mockThesis';
import useSearch from './hooks/useSearch';
import { ThesisSection } from './types';

function App() {
  const [thesisData, setThesisData] = useState<ThesisSection[]>(mockThesis);
  const [activeSection, setActiveSection] = useState(thesisData[0].id);
  const [activeTab, setActiveTab] = useState('content');
  const [uploadError, setUploadError] = useState<string | null>(null);
  const { search, searchResults, searchQuery } = useSearch(thesisData);
  
  const handleSearch = (query: string) => {
    search(query);
    setActiveTab('search');
  };
  
  const handleSectionSelect = (sectionId: string) => {
    setActiveSection(sectionId);
    if (activeTab === 'search') {
      setActiveTab('content');
    }
  };
  
  const handlePdfProcessed = (processedData: ThesisSection[]) => {
    setThesisData(processedData);
    setActiveSection(processedData[0].id);
    setActiveTab('content');
    setUploadError(null);
  };
  
  const getActiveSectionData = () => {
    for (const section of thesisData) {
      if (section.id === activeSection) {
        return section;
      }
      
      if (section.subsections) {
        for (const subsection of section.subsections) {
          if (subsection.id === activeSection) {
            return subsection;
          }
        }
      }
    }
    
    return thesisData[0];
  };
  
  const renderActiveTabContent = () => {
    if (activeTab === 'upload') {
      return (
        <div className="bg-white rounded-lg shadow-sm p-6">
          <h2 className="text-lg font-bold text-slate-900 mb-4">Upload Thesis</h2>
          <PdfUploader
            onProcessComplete={handlePdfProcessed}
            onError={(error) => setUploadError(error)}
          />
          {uploadError && (
            <div className="mt-4 p-4 bg-red-50 text-red-700 rounded-md">
              {uploadError}
            </div>
          )}
        </div>
      );
    }
    
    if (activeTab === 'search' && searchQuery) {
      return (
        <SearchResults 
          results={searchResults} 
          onResultSelect={handleSectionSelect} 
          query={searchQuery}
        />
      );
    }
    
    const sectionData = getActiveSectionData();
    
    switch (activeTab) {
      case 'content':
        return <ThesisContent section={sectionData} />;
      case 'versions':
        return <VersionHistory changes={mockVersionChanges} activeSectionId={activeSection} />;
      case 'validation':
        return <ValidationPanel 
          sectionId={activeSection} 
          validationResults={mockValidationResults} 
        />;
      default:
        return <ThesisContent section={sectionData} />;
    }
  };
  
  return (
    <Layout
      sections={thesisData}
      activeSection={activeSection}
      onSectionSelect={handleSectionSelect}
      onSearch={handleSearch}
    >
      <div className="max-w-4xl mx-auto">
        {renderActiveTabContent()}
      </div>
    </Layout>
  );
}

export default App;