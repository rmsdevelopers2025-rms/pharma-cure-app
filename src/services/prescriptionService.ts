import { supabase } from '@/integrations/supabase/client';

export interface PrescriptionData {
  id?: string;
  user_id?: string;
  image_url: string;
  original_filename?: string;
  analysis_results?: any;
  created_at?: string;
  updated_at?: string;
}

export const savePrescription = async (
  file: File
): Promise<{ data: any; error: any }> => {
  try {
    const { data: { user } } = await supabase.auth.getUser();
    if (!user) {
      return { data: null, error: { message: 'Not authenticated' } };
    }

    // Upload to Supabase Storage
    const fileExt = file.name.split('.').pop();
    const fileName = `${user.id}/${Date.now()}.${fileExt}`;
    
    const { data: uploadData, error: uploadError } = await supabase.storage
      .from('prescriptions')
      .upload(fileName, file);

    if (uploadError) {
      return { data: null, error: uploadError };
    }

    // Get public URL
    const { data: { publicUrl } } = supabase.storage
      .from('prescriptions')
      .getPublicUrl(fileName);

    // Save prescription record
    const { data: prescription, error: dbError } = await supabase
      .from('prescriptions')
      .insert({
        user_id: user.id,
        image_url: publicUrl,
        original_filename: file.name,
      })
      .select()
      .single();

    if (dbError) {
      return { data: null, error: dbError };
    }

    // Call edge function to analyze prescription
    const { data: analysisData, error: analysisError } = await supabase.functions.invoke('analyze-prescription', {
      body: { imageUrl: publicUrl }
    });

    if (!analysisError && analysisData) {
      // Update prescription with analysis results
      await supabase
        .from('prescriptions')
        .update({ analysis_results: analysisData })
        .eq('id', prescription.id);
      
      prescription.analysis_results = analysisData;
    }

    return { data: prescription, error: null };
  } catch (error: any) {
    console.error('Error saving prescription:', error);
    return { data: null, error };
  }
};

export const updatePrescriptionAnalysis = async (
  prescriptionId: string,
  analysisResults: any
): Promise<{ data: any; error: any }> => {
  const { data, error } = await supabase
    .from('prescriptions')
    .update({ analysis_results: analysisResults })
    .eq('id', prescriptionId)
    .select()
    .single();

  return { data, error };
};

export const getUserPrescriptions = async (): Promise<{ data: any; error: any }> => {
  const { data, error } = await supabase
    .from('prescriptions')
    .select('*')
    .order('created_at', { ascending: false });

  return { data, error };
};

export const deletePrescription = async (prescriptionId: string): Promise<{ error: any }> => {
  // First get the prescription to find the image URL
  const { data: prescription } = await supabase
    .from('prescriptions')
    .select('image_url')
    .eq('id', prescriptionId)
    .single();

  if (prescription?.image_url) {
    // Extract file path from URL
    const urlParts = prescription.image_url.split('/');
    const fileName = urlParts[urlParts.length - 1];
    const { data: { user } } = await supabase.auth.getUser();
    if (user) {
      const filePath = `${user.id}/${fileName}`;
      
      // Delete from storage
      await supabase.storage
        .from('prescriptions')
        .remove([filePath]);
    }
  }

  // Delete the prescription record
  const { error } = await supabase
    .from('prescriptions')
    .delete()
    .eq('id', prescriptionId);

  return { error };
};
