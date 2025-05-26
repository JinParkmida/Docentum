import { ThesisSection, Citation, VersionChange } from '../types';

export const mockCitations: Citation[] = [
  {
    id: 'c1',
    text: 'Research has shown significant improvements in user engagement with interactive platforms.',
    source: 'Journal of Interactive Media',
    url: 'https://example.com/journal',
    date: '2023-08-15',
    verified: true,
  },
  {
    id: 'c2',
    text: 'Traditional research repositories fail to meet the needs of modern researchers.',
    source: 'Digital Repository Evolution',
    url: 'https://example.com/evolution',
    date: '2024-01-22',
    verified: true,
  },
  {
    id: 'c3',
    text: 'User studies indicate a 42% increase in information retention when using interactive formats.',
    source: 'Human-Computer Interaction Review',
    url: 'https://example.com/hci',
    date: '2023-11-05',
    verified: false,
  },
];

export const mockThesis: ThesisSection[] = [
  {
    id: 'introduction',
    title: 'Introduction',
    content: `The digital transformation of academic research has created new opportunities for knowledge dissemination and collaboration. This thesis explores the potential of interactive web-based platforms to enhance research accessibility and engagement. By leveraging modern web technologies and user-centered design principles, we propose a framework for converting traditional academic theses into dynamic knowledge repositories that facilitate deeper understanding and broader impact.`,
    version: 3,
    lastUpdated: '2024-06-15',
    credibilityScore: 0.92,
    citations: [mockCitations[0]],
    subsections: [
      {
        id: 'background',
        title: 'Background and Motivation',
        content: `Traditional academic publishing has remained largely unchanged for decades, despite significant advances in digital technology. Researchers continue to produce static documents that fail to utilize the interactive capabilities of modern platforms. This research is motivated by the need to bridge this gap and create more engaging ways to present scholarly work.`,
        version: 2,
        lastUpdated: '2024-06-10',
        citations: [mockCitations[1]],
      },
      {
        id: 'objectives',
        title: 'Research Objectives',
        content: `This research aims to: (1) Identify the limitations of traditional research presentation formats, (2) Develop a framework for converting static research into interactive web applications, (3) Evaluate the effectiveness of interactive research platforms for knowledge transfer, and (4) Provide guidelines for researchers seeking to enhance the impact of their work through interactive presentation.`,
        version: 1,
        lastUpdated: '2024-05-28',
      }
    ]
  },
  {
    id: 'literature',
    title: 'Literature Review',
    content: `Previous research has explored various aspects of digital knowledge repositories and interactive academic content. This section reviews relevant literature on digital publishing innovations, interactive educational platforms, and user engagement with research content.`,
    version: 2,
    lastUpdated: '2024-06-12',
    credibilityScore: 0.88,
    subsections: [
      {
        id: 'digital-publishing',
        title: 'Digital Publishing Innovations',
        content: `Recent advances in digital publishing have introduced new formats for academic content, including enhanced e-books, interactive PDFs, and web-based publications. However, these innovations have seen limited adoption in formal academic publishing, where PDF remains the dominant format despite its limitations.`,
        version: 1,
        lastUpdated: '2024-05-20',
        citations: [mockCitations[1]],
      },
      {
        id: 'user-engagement',
        title: 'User Engagement with Research Content',
        content: `Studies on user engagement with academic content consistently show that interactive elements increase reader attention, comprehension, and retention. User studies indicate a 42% increase in information retention when using interactive formats compared to traditional static text. These findings suggest significant potential benefits for converting traditional theses into interactive formats.`,
        version: 2,
        lastUpdated: '2024-06-05',
        citations: [mockCitations[2]],
        credibilityScore: 0.76,
      }
    ]
  },
  {
    id: 'methodology',
    title: 'Methodology',
    content: `This research employs a mixed-methods approach combining qualitative user research, prototype development, and quantitative evaluation. The methodology was designed to ensure comprehensive exploration of both technical and user experience aspects of interactive research platforms.`,
    version: 1,
    lastUpdated: '2024-05-15',
    credibilityScore: 0.95,
    subsections: [
      {
        id: 'research-design',
        title: 'Research Design',
        content: `The research follows a three-phase design: (1) Exploratory phase involving literature review and expert interviews, (2) Development phase focusing on framework creation and prototype implementation, and (3) Evaluation phase measuring user engagement and knowledge transfer effectiveness.`,
        version: 1,
        lastUpdated: '2024-05-15',
      },
      {
        id: 'evaluation-methods',
        title: 'Evaluation Methods',
        content: `Evaluation metrics include quantitative measures of user engagement (time spent, interaction frequency, return visits) and qualitative assessments of comprehension and knowledge transfer (surveys, interviews, comprehension tests). A comparative analysis between traditional and interactive formats was conducted with a sample of 150 participants from diverse academic backgrounds.`,
        version: 1,
        lastUpdated: '2024-05-15',
      }
    ]
  }
];

export const mockVersionChanges: VersionChange[] = [
  {
    id: 'v1',
    sectionId: 'introduction',
    timestamp: '2024-05-01T09:15:30Z',
    author: 'Original Author',
    previousContent: 'The digital transformation of academic research has created new opportunities for knowledge sharing.',
    newContent: 'The digital transformation of academic research has created new opportunities for knowledge dissemination and collaboration.',
    type: 'modification'
  },
  {
    id: 'v2',
    sectionId: 'introduction',
    timestamp: '2024-06-10T14:22:45Z',
    author: 'Contributor A',
    previousContent: '',
    newContent: 'By leveraging modern web technologies and user-centered design principles, we propose a framework for converting traditional academic theses into dynamic knowledge repositories.',
    type: 'addition'
  },
  {
    id: 'v3',
    sectionId: 'user-engagement',
    timestamp: '2024-06-05T11:05:12Z',
    author: 'Reviewer B',
    previousContent: 'Studies show interactive elements increase reader attention.',
    newContent: 'Studies on user engagement with academic content consistently show that interactive elements increase reader attention, comprehension, and retention.',
    type: 'modification'
  }
];

export const mockValidationResults = {
  'introduction': {
    credibilityScore: 0.92,
    logicalFallacies: [],
    citationAccuracy: 0.95,
    statisticalValidity: 0.90,
    inconsistencies: []
  },
  'literature': {
    credibilityScore: 0.88,
    logicalFallacies: [],
    citationAccuracy: 0.85,
    statisticalValidity: 0.92,
    inconsistencies: []
  },
  'user-engagement': {
    credibilityScore: 0.76,
    logicalFallacies: ['Hasty Generalization'],
    citationAccuracy: 0.65,
    statisticalValidity: 0.70,
    inconsistencies: ['Inconsistent reporting of statistical significance']
  },
  'methodology': {
    credibilityScore: 0.95,
    logicalFallacies: [],
    citationAccuracy: 0.98,
    statisticalValidity: 0.97,
    inconsistencies: []
  }
};