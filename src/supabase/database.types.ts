export type Json =
  | string
  | number
  | boolean
  | null
  | { [key: string]: Json | undefined }
  | Json[];

export interface Database {
  public: {
    Tables: {
      "testing-work-flow-action": {
        Row: {
          created_at: string | null;
          id: number;
        };
        Insert: {
          created_at?: string | null;
          id?: number;
        };
        Update: {
          created_at?: string | null;
          id?: number;
        };
        Relationships: [];
      };
      TestTable: {
        Row: {
          id: number;
          testing: string | null;
        };
        Insert: {
          id?: number;
          testing?: string | null;
        };
        Update: {
          id?: number;
          testing?: string | null;
        };
        Relationships: [];
      };
      users: {
        Row: {
          id: string;
          created_at: string;  // Using string to represent ISO8601 date string
          username: string | null;
          email: string;
          hashed_password: string;
          user_role: string;
          is_active: boolean;
        };
        Insert: {
          id?: string;
          created_at?: string;  // Using string to represent ISO8601 date string
          username?: string | null;
          email: string;
          hashed_password: string;
          user_role?: string;
          is_active?: boolean;
        };
        Update: {
          id?: string;
          created_at?: string;  // Using string to represent ISO8601 date string
          username?: string | null;
          email?: string;
          hashed_password?: string;
          user_role?: string;
          is_active?: boolean;
        };
        Relationships: [];
      };
    };
    Views: {
      [_ in never]: never;
    };
    Functions: {
      [_ in never]: never;
    };
    Enums: {
      [_ in never]: never;
    };
    CompositeTypes: {
      [_ in never]: never;
    };
  };
}
