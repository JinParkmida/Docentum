import * as pdfjsLib from 'pdfjs-dist';
import { ThesisSection } from '../types';

// Initialize PDF.js worker
const workerSrc = new URL(
  'pdfjs-dist/build/pdf.worker.js',
  import.meta.url
).toString();
pdfjsLib.GlobalWorkerOptions.workerSrc = workerSrc;

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
  console.log('Starting PDF processing:', file.name);
  
  try {
    const arrayBuffer = await file.arrayBuffer();
    console.log('File loaded into ArrayBuffer');
    
    const loadingTask = pdfjsLib.getDocument({ data: arrayBuffer });
    console.log('PDF loading task created');
    
    const pdf = await loadingTask.promise;
    console.log(`PDF loaded successfully. Total pages: ${pdf.numPages}`);
    
    const numPages = pdf.numPages;
    let sections: ProcessedSection[] = [];
    let currentSection: ProcessedSection | null = null;
    
    for (let pageNum = 1; pageNum <= numPages; pageNum++) {
      console.log(`Processing page ${pageNum}/${numPages}`);
      const page = await pdf.getPage(pageNum);
      const textContent = await page.getTextContent() as TextContent;
      
      for (const item of textContent.items) {
        const { str, fontName, transform } = item;
        const fontSize = transform[0];
        
        if (!str.trim()) continue;
        
        const isHeader = fontSize > 12 || (fontName && /bold|header/i.test(fontName));
        
        if (isHeader) {
          console.log(`Found header: "${str.trim()}" (fontSize: ${fontSize})`);
          if (currentSection) {
            sections.push(currentSection);
          }
          
          currentSection = {
            title: str.trim(),
            content: '',
            level: Math.max(1, Math.min(3, Math.floor(16 / fontSize)))
          };
        } else if (currentSection) {
          currentSection.content += str + ' ';
        } else {
          currentSection = {
            title: 'Introduction',
            content: str + ' ',
            level: 1
          };
        }
      }
    }
    
    if (currentSection) {
      sections.push(currentSection);
    }
    
    sections = sections.map(section => ({
      ...section,
      content: section.content.trim().replace(/\s+/g, ' ')
    }));
    
    console.log('PDF processing completed successfully');
    return convertToThesisSections(sections);
  } catch (error) {
    console.error('PDF processing error:', error);
    throw new Error(`Failed to process PDF: ${error instanceof Error ? error.message : 'Unknown error'}`);
  }
}

function convertToThesisSections(processed: ProcessedSection[]): ThesisSection[] {
  console.log('Converting processed sections to thesis format');
  const result: ThesisSection[] = [];
  const stack: { section: ThesisSection; level: number }[] = [];
  
  processed.forEach((section, index) => {
    const thesisSection: ThesisSection = {
      id: `section-${index}`,
      title: section.title,
      content: section.content,
      version: 1,
      lastUpdated: new Date().toISOString(),
      credibilityScore: 0.85,
      subsections: []
    };
    
    while (stack.length > 0 && stack[stack.length - 1].level >= section.level) {
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
  
  console.log('Conversion completed:', result);
  return result;
}