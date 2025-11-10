import { API_ENDPOINTS, getAuthHeaders } from '@/config/api';

export interface SearchHistoryData {
  id?: string;
  user_id?: string;
  query: string;
  results_count?: number;
  created_at?: string;
}

export const saveSearchHistory = async (
  query: string,
  resultsCount: number = 0
): Promise<{ data: any; error: any }> => {
  try {
    const response = await fetch(API_ENDPOINTS.SEARCH_HISTORY, {
      method: 'POST',
      headers: getAuthHeaders(),
      body: JSON.stringify({
        query: query.trim(),
        results_count: resultsCount,
      }),
    });

    if (!response.ok) {
      const error = await response.json();
      return { data: null, error: error.error || 'Failed to save search history' };
    }

    const data = await response.json();
    return { data, error: null };
  } catch (error: any) {
    console.error('Error saving search history:', error);
    return { data: null, error: error.message || 'Network error' };
  }
};

export const getUserSearchHistory = async (
  limit: number = 20
): Promise<{ data: any; error: any }> => {
  try {
    const response = await fetch(`${API_ENDPOINTS.SEARCH_HISTORY}?limit=${limit}`, {
      headers: getAuthHeaders(),
    });

    if (!response.ok) {
      const error = await response.json();
      return { data: null, error: error.error || 'Failed to get search history' };
    }

    const data = await response.json();
    return { data, error: null };
  } catch (error: any) {
    console.error('Error getting search history:', error);
    return { data: null, error: error.message || 'Network error' };
  }
};

export const clearUserSearchHistory = async (): Promise<{ error: any }> => {
  try {
    const response = await fetch(API_ENDPOINTS.SEARCH_HISTORY, {
      method: 'DELETE',
      headers: getAuthHeaders(),
    });

    if (!response.ok) {
      const error = await response.json();
      return { error: error.error || 'Failed to clear search history' };
    }

    return { error: null };
  } catch (error: any) {
    console.error('Error clearing search history:', error);
    return { error: error.message || 'Network error' };
  }
};

// Removed getPopularSearches as it requires user_id parameter now
