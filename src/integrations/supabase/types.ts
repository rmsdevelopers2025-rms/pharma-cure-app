export type Json =
  | string
  | number
  | boolean
  | null
  | { [key: string]: Json | undefined }
  | Json[]

export type Database = {
  // Allows to automatically instantiate createClient with right options
  // instead of createClient<Database, { PostgrestVersion: 'XX' }>(URL, KEY)
  __InternalSupabase: {
    PostgrestVersion: "13.0.4"
  }
  public: {
    Tables: {
      drugs: {
        Row: {
          available_strengths: string[]
          brands: string[]
          category: string | null
          composition: Json
          contraindications: string[]
          created_at: string
          disorders: string[]
          dosage: Json
          dosage_forms: string[]
          drug_interactions: string[]
          generic_name: string | null
          id: string
          incompatibility: string[]
          indications: string[]
          is_premium: boolean
          lactation: string | null
          mechanism: string | null
          monitoring: string[]
          name: string
          overdose: string | null
          pharmacokinetics: Json
          pharmacological_class: string | null
          pregnancy_category: string | null
          side_effects: string[]
          storage: string | null
          therapeutic_class: string | null
          updated_at: string
          warnings: string[]
        }
        Insert: {
          available_strengths?: string[]
          brands?: string[]
          category?: string | null
          composition?: Json
          contraindications?: string[]
          created_at?: string
          disorders?: string[]
          dosage?: Json
          dosage_forms?: string[]
          drug_interactions?: string[]
          generic_name?: string | null
          id?: string
          incompatibility?: string[]
          indications?: string[]
          is_premium?: boolean
          lactation?: string | null
          mechanism?: string | null
          monitoring?: string[]
          name: string
          overdose?: string | null
          pharmacokinetics?: Json
          pharmacological_class?: string | null
          pregnancy_category?: string | null
          side_effects?: string[]
          storage?: string | null
          therapeutic_class?: string | null
          updated_at?: string
          warnings?: string[]
        }
        Update: {
          available_strengths?: string[]
          brands?: string[]
          category?: string | null
          composition?: Json
          contraindications?: string[]
          created_at?: string
          disorders?: string[]
          dosage?: Json
          dosage_forms?: string[]
          drug_interactions?: string[]
          generic_name?: string | null
          id?: string
          incompatibility?: string[]
          indications?: string[]
          is_premium?: boolean
          lactation?: string | null
          mechanism?: string | null
          monitoring?: string[]
          name?: string
          overdose?: string | null
          pharmacokinetics?: Json
          pharmacological_class?: string | null
          pregnancy_category?: string | null
          side_effects?: string[]
          storage?: string | null
          therapeutic_class?: string | null
          updated_at?: string
          warnings?: string[]
        }
        Relationships: []
      }
      prescriptions: {
        Row: {
          analysis_results: Json | null
          created_at: string
          id: string
          image_url: string
          original_filename: string | null
          updated_at: string
          user_id: string
        }
        Insert: {
          analysis_results?: Json | null
          created_at?: string
          id?: string
          image_url: string
          original_filename?: string | null
          updated_at?: string
          user_id: string
        }
        Update: {
          analysis_results?: Json | null
          created_at?: string
          id?: string
          image_url?: string
          original_filename?: string | null
          updated_at?: string
          user_id?: string
        }
        Relationships: []
      }
      profiles: {
        Row: {
          age: number | null
          created_at: string
          email: string | null
          height: number | null
          id: string
          medical_info: string | null
          name: string | null
          sex: string | null
          updated_at: string
          weight: number | null
        }
        Insert: {
          age?: number | null
          created_at?: string
          email?: string | null
          height?: number | null
          id: string
          medical_info?: string | null
          name?: string | null
          sex?: string | null
          updated_at?: string
          weight?: number | null
        }
        Update: {
          age?: number | null
          created_at?: string
          email?: string | null
          height?: number | null
          id?: string
          medical_info?: string | null
          name?: string | null
          sex?: string | null
          updated_at?: string
          weight?: number | null
        }
        Relationships: []
      }
      search_history: {
        Row: {
          created_at: string
          id: string
          query: string
          results_count: number | null
          user_id: string
        }
        Insert: {
          created_at?: string
          id?: string
          query: string
          results_count?: number | null
          user_id: string
        }
        Update: {
          created_at?: string
          id?: string
          query?: string
          results_count?: number | null
          user_id?: string
        }
        Relationships: []
      }
      user_subscriptions: {
        Row: {
          created_at: string
          expires_at: string | null
          id: string
          plan_name: string
          plan_type: string
          started_at: string
          status: string
          updated_at: string
          user_id: string
        }
        Insert: {
          created_at?: string
          expires_at?: string | null
          id?: string
          plan_name: string
          plan_type: string
          started_at?: string
          status?: string
          updated_at?: string
          user_id: string
        }
        Update: {
          created_at?: string
          expires_at?: string | null
          id?: string
          plan_name?: string
          plan_type?: string
          started_at?: string
          status?: string
          updated_at?: string
          user_id?: string
        }
        Relationships: []
      }
    }
    Views: {
      [_ in never]: never
    }
    Functions: {
      get_auto_correct_suggestion: {
        Args: { q: string }
        Returns: string
      }
      gtrgm_compress: {
        Args: { "": unknown }
        Returns: unknown
      }
      gtrgm_decompress: {
        Args: { "": unknown }
        Returns: unknown
      }
      gtrgm_in: {
        Args: { "": unknown }
        Returns: unknown
      }
      gtrgm_options: {
        Args: { "": unknown }
        Returns: undefined
      }
      gtrgm_out: {
        Args: { "": unknown }
        Returns: unknown
      }
      search_drugs: {
        Args: { q: string }
        Returns: {
          available_strengths: string[]
          brands: string[]
          category: string | null
          composition: Json
          contraindications: string[]
          created_at: string
          disorders: string[]
          dosage: Json
          dosage_forms: string[]
          drug_interactions: string[]
          generic_name: string | null
          id: string
          incompatibility: string[]
          indications: string[]
          is_premium: boolean
          lactation: string | null
          mechanism: string | null
          monitoring: string[]
          name: string
          overdose: string | null
          pharmacokinetics: Json
          pharmacological_class: string | null
          pregnancy_category: string | null
          side_effects: string[]
          storage: string | null
          therapeutic_class: string | null
          updated_at: string
          warnings: string[]
        }[]
      }
      set_limit: {
        Args: { "": number }
        Returns: number
      }
      show_limit: {
        Args: Record<PropertyKey, never>
        Returns: number
      }
      show_trgm: {
        Args: { "": string }
        Returns: string[]
      }
    }
    Enums: {
      [_ in never]: never
    }
    CompositeTypes: {
      [_ in never]: never
    }
  }
}

type DatabaseWithoutInternals = Omit<Database, "__InternalSupabase">

type DefaultSchema = DatabaseWithoutInternals[Extract<keyof Database, "public">]

export type Tables<
  DefaultSchemaTableNameOrOptions extends
    | keyof (DefaultSchema["Tables"] & DefaultSchema["Views"])
    | { schema: keyof DatabaseWithoutInternals },
  TableName extends DefaultSchemaTableNameOrOptions extends {
    schema: keyof DatabaseWithoutInternals
  }
    ? keyof (DatabaseWithoutInternals[DefaultSchemaTableNameOrOptions["schema"]]["Tables"] &
        DatabaseWithoutInternals[DefaultSchemaTableNameOrOptions["schema"]]["Views"])
    : never = never,
> = DefaultSchemaTableNameOrOptions extends {
  schema: keyof DatabaseWithoutInternals
}
  ? (DatabaseWithoutInternals[DefaultSchemaTableNameOrOptions["schema"]]["Tables"] &
      DatabaseWithoutInternals[DefaultSchemaTableNameOrOptions["schema"]]["Views"])[TableName] extends {
      Row: infer R
    }
    ? R
    : never
  : DefaultSchemaTableNameOrOptions extends keyof (DefaultSchema["Tables"] &
        DefaultSchema["Views"])
    ? (DefaultSchema["Tables"] &
        DefaultSchema["Views"])[DefaultSchemaTableNameOrOptions] extends {
        Row: infer R
      }
      ? R
      : never
    : never

export type TablesInsert<
  DefaultSchemaTableNameOrOptions extends
    | keyof DefaultSchema["Tables"]
    | { schema: keyof DatabaseWithoutInternals },
  TableName extends DefaultSchemaTableNameOrOptions extends {
    schema: keyof DatabaseWithoutInternals
  }
    ? keyof DatabaseWithoutInternals[DefaultSchemaTableNameOrOptions["schema"]]["Tables"]
    : never = never,
> = DefaultSchemaTableNameOrOptions extends {
  schema: keyof DatabaseWithoutInternals
}
  ? DatabaseWithoutInternals[DefaultSchemaTableNameOrOptions["schema"]]["Tables"][TableName] extends {
      Insert: infer I
    }
    ? I
    : never
  : DefaultSchemaTableNameOrOptions extends keyof DefaultSchema["Tables"]
    ? DefaultSchema["Tables"][DefaultSchemaTableNameOrOptions] extends {
        Insert: infer I
      }
      ? I
      : never
    : never

export type TablesUpdate<
  DefaultSchemaTableNameOrOptions extends
    | keyof DefaultSchema["Tables"]
    | { schema: keyof DatabaseWithoutInternals },
  TableName extends DefaultSchemaTableNameOrOptions extends {
    schema: keyof DatabaseWithoutInternals
  }
    ? keyof DatabaseWithoutInternals[DefaultSchemaTableNameOrOptions["schema"]]["Tables"]
    : never = never,
> = DefaultSchemaTableNameOrOptions extends {
  schema: keyof DatabaseWithoutInternals
}
  ? DatabaseWithoutInternals[DefaultSchemaTableNameOrOptions["schema"]]["Tables"][TableName] extends {
      Update: infer U
    }
    ? U
    : never
  : DefaultSchemaTableNameOrOptions extends keyof DefaultSchema["Tables"]
    ? DefaultSchema["Tables"][DefaultSchemaTableNameOrOptions] extends {
        Update: infer U
      }
      ? U
      : never
    : never

export type Enums<
  DefaultSchemaEnumNameOrOptions extends
    | keyof DefaultSchema["Enums"]
    | { schema: keyof DatabaseWithoutInternals },
  EnumName extends DefaultSchemaEnumNameOrOptions extends {
    schema: keyof DatabaseWithoutInternals
  }
    ? keyof DatabaseWithoutInternals[DefaultSchemaEnumNameOrOptions["schema"]]["Enums"]
    : never = never,
> = DefaultSchemaEnumNameOrOptions extends {
  schema: keyof DatabaseWithoutInternals
}
  ? DatabaseWithoutInternals[DefaultSchemaEnumNameOrOptions["schema"]]["Enums"][EnumName]
  : DefaultSchemaEnumNameOrOptions extends keyof DefaultSchema["Enums"]
    ? DefaultSchema["Enums"][DefaultSchemaEnumNameOrOptions]
    : never

export type CompositeTypes<
  PublicCompositeTypeNameOrOptions extends
    | keyof DefaultSchema["CompositeTypes"]
    | { schema: keyof DatabaseWithoutInternals },
  CompositeTypeName extends PublicCompositeTypeNameOrOptions extends {
    schema: keyof DatabaseWithoutInternals
  }
    ? keyof DatabaseWithoutInternals[PublicCompositeTypeNameOrOptions["schema"]]["CompositeTypes"]
    : never = never,
> = PublicCompositeTypeNameOrOptions extends {
  schema: keyof DatabaseWithoutInternals
}
  ? DatabaseWithoutInternals[PublicCompositeTypeNameOrOptions["schema"]]["CompositeTypes"][CompositeTypeName]
  : PublicCompositeTypeNameOrOptions extends keyof DefaultSchema["CompositeTypes"]
    ? DefaultSchema["CompositeTypes"][PublicCompositeTypeNameOrOptions]
    : never

export const Constants = {
  public: {
    Enums: {},
  },
} as const
