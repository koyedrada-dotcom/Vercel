export interface WorkExperience {
  id: string;
  title: string;
  company: string;
  location: string;
  startDate: string;
  endDate: string;
  description: string;
}

export interface Education {
  id: string;
  degree: string;
  school: string;
  location: string;
  startDate: string;
  endDate: string;
}

export interface ResumeData {
  personalInfo: {
    name: string;
    title: string;
    phone: string;
    email: string;
    location: string;
    website?: string;
  };
  summary: string;
  workExperience: WorkExperience[];
  education: Education[];
  skills: string[];
}

export type TemplateType = 'classic' | 'modern' | 'compact';

export interface FontSettings {
  family: string;
  size: 'small' | 'medium' | 'large';
}
