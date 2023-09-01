export type User = {
  id:         string;
  email:      string;
  name?:      string;
  created_at: Date;
};

export type Json =
  | string
  | number
  | boolean
  | null
  | { [key: string]: Json | undefined }
  | Json[]

export interface Database {
  public: {
    Tables: {
      "testing-work-flow-action": {
        Row: {
          created_at: string | null
          id: number
        }
        Insert: {
          created_at?: string | null
          id?: number
        }
        Update: {
          created_at?: string | null
          id?: number
        }
        Relationships: []
      }
      TestTable: {
        Row: {
          id: number
          testing: string | null
        }
        Insert: {
          id?: number
          testing?: string | null
        }
        Update: {
          id?: number
          testing?: string | null
        }
        Relationships: []
      }
    }
    Views: {
      [_ in never]: never
    }
    Functions: {
      [_ in never]: never
    }
    Enums: {
      [_ in never]: never
    }
    CompositeTypes: {
      [_ in never]: never
    }
  }
}
