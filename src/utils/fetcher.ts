import { ApiResponse } from '@/app/api/types';

export const fetcher = async <T>(url: string, options: RequestInit = {}): Promise<T> => {
  const response = await fetch(url, {
    ...options,
    headers: {
      'Content-Type': 'application/json',
      ...options.headers,
    },
  });

  if (!response.ok) {
    const error = await response.json();
    throw new Error(error.error || 'An error occurred');
  }

  const data = await response.json();
  return data;
};
