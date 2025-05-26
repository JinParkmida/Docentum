import * as pdfjsLib from 'pdfjs-dist';
import { ThesisSection } from '../types';

// Initialize PDF.js worker with the correct worker source
pdfjsLib.GlobalWorkerOptions.workerSrc = '/pdf.worker.js';

interface TextContent {
  items: Array<{
    str: string;
    transform: number[];
    width: number;
    height: number;
    fontName?: string;
  }>;
}

interface ProcessedSection {
  title: string;
  content: string;
  level: number;
}

export async function processPdf(file: File): Promise<ThesisSection[]> {
  try {
    const arrayBuffer = await file.arrayBuffer();
    const loadingTask = pdfjsLib.getDocument({ data: arrayBuffer });
    const pdf = await loadingTask.promise;
    const numPages = pdf.numPages;
    
    let sections: ProcessedSection[] = [];
    let currentSection: ProcessedSection | null = null;
    
    for (let pageNum = 1; pageNum <= numPages; pageNum++) {
      const page = await pdf.getPage(pageNum);
      const textContent = await page.getTextContent() as TextContent;
      
      for (const item of textContent.items) {
        const { str, fontName, transform } = item;
        const fontSize = transform[0]; // Scale factor represents font size
        
        // Skip empty strings
        if (!str.trim()) continue;
        
        // Detect headers based on font size and name
        const isHeader = fontSize > 12 || (fontName && /bold|header/i.test(fontName));
        
        if (isHeader) {
          // Save previous section if exists
          if (currentSection) {
            sections.push(currentSection);
          }
          
          // Start new section
          currentSection = {
            title: str.trim(),
            content: '',
            level: Math.max(1, Math.min(3, Math.floor(16 / fontSize))) // Convert font size to heading level
          };
        } else if (currentSection) {
          // Add content to current section
          currentSection.content += str + ' ';
        } else {
          // Create default section for initial content
          currentSection = {
            title: 'Introduction',
            content: str + ' ',
            level: 1
          };
        }
      }
    }
    
    // Add the last section
    if (currentSection) {
      sections.push(currentSection);
    }
    
    // Clean up sections
    sections = sections.map(section => ({
      ...section,
      content: section.content.trim().replace(/\s+/g, ' ')
    }));
    
    return convertToThesisSections(sections);
  } catch (error) {
    console.error('PDF processing error:', error);
    throw new Error('Failed to process PDF. Please ensure the file is a valid PDF document.');
  }
}

function convertToThesisSections(processed: ProcessedSection[]): ThesisSection[] {
  const result: ThesisSection[] = [];
  const stack: { section: ThesisSection; level: number }[] = [];
  
  processed.forEach((section, index) => {
    const thesisSection: ThesisSection = {
      id: `section-${index}`,
      title: section.title,
      content: section.content,
      version: 1,
      lastUpdated: new Date().toISOString(),
      credibilityScore: 0.85, // Default score
      subsections: []
    };
    
    // Find appropriate parent based on heading level
    while (
      stack.length > 0 && 
      stack[stack.length - 1].level >= section.level
    ) {
      stack.pop();
    }
    
    if (stack.length === 0) {
      result.push(thesisSection);
    } else {
      const parent = stack[stack.length - 1].section;
      if (!parent.subsections) {
        parent.subsections = [];
      }
      parent.subsections.push(thesisSection);
    }
    
    stack.push({ section: thesisSection, level: section.level });
  });
  
  return result;
}