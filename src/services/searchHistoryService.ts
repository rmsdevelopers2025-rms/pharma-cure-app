import { supabase } from '@/integrations/supabase/client';

export interface SearchHistoryData {
  id?: string;
  user_id: string;
  query: string;
  results_count?: number;
  created_at?: string;
}

export const saveSearchHistory = async (
  userId: string,
  query: string,
  resultsCount: number = 0
): Promise<{ data: any; error: any }> => {
  return await supabase
    .from('search_history')
    .insert({
      user_id: userId,
      query: query.trim(),
      results_count: resultsCount
    })
    .select()
    .single();
};

export const getUserSearchHistory = async (
  userId: string,
  limit: number = 20
): Promise<{ data: any; error: any }> => {
  return await supabase
    .from('search_history')
    .select('*')
    .eq('user_id', userId)
    .order('created_at', { ascending: false })
    .limit(limit);
};

export const getPopularSearches = async (
  limit: number = 10
): Promise<{ data: any; error: any }> => {
  // Simple implementation to get unique queries without aggregation
  return await supabase
    .from('search_history')
    .select('query')
    .order('created_at', { ascending: false })
    .limit(limit * 5); // Get more records and dedupe client-side
};

export const clearUserSearchHistory = async (userId: string): Promise<{ error: any }> => {
  return await supabase
    .from('search_history')
    .delete()
    .eq('user_id', userId);
};