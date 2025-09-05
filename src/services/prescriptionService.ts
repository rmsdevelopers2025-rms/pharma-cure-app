import { supabase } from '@/integrations/supabase/client';

export interface PrescriptionData {
  id?: string;
  user_id: string;
  image_url: string;
  original_filename?: string;
  analysis_results?: any;
  created_at?: string;
  updated_at?: string;
}

export const savePrescription = async (
  userId: string, 
  imageUrl: string, 
  filename?: string, 
  analysisResults?: any
): Promise<{ data: any; error: any }> => {
  return await supabase
    .from('prescriptions')
    .insert({
      user_id: userId,
      image_url: imageUrl,
      original_filename: filename,
      analysis_results: analysisResults
    })
    .select()
    .single();
};

export const updatePrescriptionAnalysis = async (
  prescriptionId: string, 
  analysisResults: any
): Promise<{ data: any; error: any }> => {
  return await supabase
    .from('prescriptions')
    .update({ analysis_results: analysisResults })
    .eq('id', prescriptionId)
    .select()
    .single();
};

export const getUserPrescriptions = async (userId: string): Promise<{ data: any; error: any }> => {
  return await supabase
    .from('prescriptions')
    .select('*')
    .eq('user_id', userId)
    .order('created_at', { ascending: false });
};

export const deletePrescription = async (prescriptionId: string): Promise<{ error: any }> => {
  return await supabase
    .from('prescriptions')
    .delete()
    .eq('id', prescriptionId);
};