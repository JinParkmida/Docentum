import React, { useState, useEffect } from 'react';
import { Search, BookOpen, History, CheckCircle, Menu, X, Upload } from 'lucide-react';
import Button from '../ui/Button';

interface HeaderProps {
  activeTab: string;
  onTabChange: (tab: string) => void;
  onToggleSidebar: () => void;
  isSidebarOpen: boolean;
  onSearch: (query: string) => void;
}

export const Header: React.FC<HeaderProps> = ({
  activeTab,
  onTabChange,
  onToggleSidebar,
  isSidebarOpen,
  onSearch,
}) => {
  const [searchQuery, setSearchQuery] = useState('');
  const [isScrolled, setIsScrolled] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 10);
    };

    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const handleSearch = (e: React.FormEvent) => {
    e.preventDefault();
    onSearch(searchQuery);
  };

  return (
    <header
      className={`fixed top-0 left-0 right-0 z-10 transition-all duration-300 ${
        isScrolled ? 'bg-white shadow-sm' : 'bg-transparent'
      }`}
    >
      <div className="container mx-auto px-4 py-3 flex items-center justify-between">
        <div className="flex items-center">
          <Button
            variant="ghost"
            size="sm"
            className="mr-2 md:hidden"
            onClick={onToggleSidebar}
            aria-label={isSidebarOpen ? "Close sidebar" : "Open sidebar"}
            icon={isSidebarOpen ? <X size={20} /> : <Menu size={20} />}
          />
          <h1 className="font-bold text-lg text-slate-900 mr-6">Research Platform</h1>
          <div className="hidden md:flex items-center space-x-1">
            <Button
              variant={activeTab === 'content' ? 'secondary' : 'ghost'}
              size="sm"
              onClick={() => onTabChange('content')}
              icon={<BookOpen size={16} />}
            >
              Content
            </Button>
            <Button
              variant={activeTab === 'versions' ? 'secondary' : 'ghost'}
              size="sm"
              onClick={() => onTabChange('versions')}
              icon={<History size={16} />}
            >
              Versions
            </Button>
            <Button
              variant={activeTab === 'validation' ? 'secondary' : 'ghost'}
              size="sm"
              onClick={() => onTabChange('validation')}
              icon={<CheckCircle size={16} />}
            >
              Validation
            </Button>
            <Button
              variant={activeTab === 'upload' ? 'secondary' : 'ghost'}
              size="sm"
              onClick={() => onTabChange('upload')}
              icon={<Upload size={16} />}
            >
              Upload
            </Button>
          </div>
        </div>
        <div className="flex items-center">
          <form onSubmit={handleSearch} className="relative">
            <input
              type="text"
              placeholder="Search thesis..."
              className="py-1.5 pl-9 pr-3 text-sm border border-slate-300 rounded-md focus:outline-none focus:ring-2 focus:ring-slate-500 focus:border-transparent w-32 md:w-64 transition-all duration-300"
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
            />
            <Search
              size={16}
              className="absolute left-3 top-1/2 transform -translate-y-1/2 text-slate-400"
            />
          </form>
        </div>
      </div>
    </header>
  );
}

export default Header;