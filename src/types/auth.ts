import { Session, User } from "@supabase/auth-helpers-nextjs";
export type { Session, User };

export type AuthContextType = {
  session: Session | null;
};

export interface AuthProviderProps {
  children: React.ReactNode;
  session: AuthContextType["session"];
}
