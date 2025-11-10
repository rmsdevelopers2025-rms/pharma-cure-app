import { API_ENDPOINTS, getAuthHeaders } from '@/config/api';

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
    const formData = new FormData();
    formData.append('image', file);

    const token = localStorage.getItem('auth_token');
    const response = await fetch(API_ENDPOINTS.PRESCRIPTIONS, {
      method: 'POST',
      headers: {
        Authorization: `Bearer ${token}`,
      },
      body: formData,
    });

    if (!response.ok) {
      const error = await response.json();
      return { data: null, error: error.error || 'Failed to save prescription' };
    }

    const data = await response.json();
    return { data, error: null };
  } catch (error: any) {
    console.error('Error saving prescription:', error);
    return { data: null, error: error.message || 'Network error' };
  }
};

export const updatePrescriptionAnalysis = async (
  prescriptionId: string,
  analysisResults: any
): Promise<{ data: any; error: any }> => {
  try {
    const response = await fetch(`${API_ENDPOINTS.PRESCRIPTIONS}/${prescriptionId}/analysis`, {
      method: 'PUT',
      headers: getAuthHeaders(),
      body: JSON.stringify({ analysis_results: analysisResults }),
    });

    if (!response.ok) {
      const error = await response.json();
      return { data: null, error: error.error || 'Failed to update analysis' };
    }

    const data = await response.json();
    return { data, error: null };
  } catch (error: any) {
    console.error('Error updating prescription analysis:', error);
    return { data: null, error: error.message || 'Network error' };
  }
};

export const getUserPrescriptions = async (): Promise<{ data: any; error: any }> => {
  try {
    const response = await fetch(API_ENDPOINTS.PRESCRIPTIONS, {
      headers: getAuthHeaders(),
    });

    if (!response.ok) {
      const error = await response.json();
      return { data: null, error: error.error || 'Failed to get prescriptions' };
    }

    const data = await response.json();
    return { data, error: null };
  } catch (error: any) {
    console.error('Error getting prescriptions:', error);
    return { data: null, error: error.message || 'Network error' };
  }
};

export const deletePrescription = async (prescriptionId: string): Promise<{ error: any }> => {
  try {
    const response = await fetch(`${API_ENDPOINTS.PRESCRIPTIONS}/${prescriptionId}`, {
      method: 'DELETE',
      headers: getAuthHeaders(),
    });

    if (!response.ok) {
      const error = await response.json();
      return { error: error.error || 'Failed to delete prescription' };
    }

    return { error: null };
  } catch (error: any) {
    console.error('Error deleting prescription:', error);
    return { error: error.message || 'Network error' };
  }
};
