export interface Software {
  id: string;
  title: string;
  category: string;
  description: string;
  fullDescription: string;
  version: string;
  size: string;
  developer: string;
  releaseDate: string;
  requirements: string[];
  features: string[];
  screenshots: string[];
  image: string;
  downloadUrl: string;
  rating: number;
  downloads: number;
  tags: string[];
}

export interface Category {
  id: string;
  name: string;
  description: string;
  icon: string;
  parentId?: string;
  type: 'platform' | 'subcategory';
  count?: number;
  order: number;
}