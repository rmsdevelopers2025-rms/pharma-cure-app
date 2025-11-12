import { supabase } from '@/integrations/supabase/client';

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
  const { data: { user } } = await supabase.auth.getUser();
  if (!user) {
    return { data: null, error: { message: 'Not authenticated' } };
  }

  const { data, error } = await supabase
    .from('search_history')
    .insert({
      user_id: user.id,
      query: query.trim(),
      results_count: resultsCount,
    })
    .select()
    .single();

  return { data, error };
};

export const getUserSearchHistory = async (
  limit: number = 20
): Promise<{ data: any; error: any }> => {
  const { data, error } = await supabase
    .from('search_history')
    .select('*')
    .order('created_at', { ascending: false })
    .limit(limit);

  return { data, error };
};

export const clearUserSearchHistory = async (): Promise<{ error: any }> => {
  const { data: { user } } = await supabase.auth.getUser();
  if (!user) {
    return { error: { message: 'Not authenticated' } };
  }

  const { error } = await supabase
    .from('search_history')
    .delete()
    .eq('user_id', user.id);

  return { error };
};
