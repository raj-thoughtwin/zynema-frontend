export interface Movie {
  id: string;
  title: string;
  poster: string;
  rating: number;
  year: number;
  category: string;
  description?: string;
  plot?: string;
  url?: string;
  filename?: string;
  mimetype?: string;
}