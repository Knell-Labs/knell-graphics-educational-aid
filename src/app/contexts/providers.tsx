import { createServerComponentClient } from "@supabase/auth-helpers-nextjs";
import { cookies } from "next/headers";
import { Database } from "../../supabase/database.types";

import { AuthProvider } from "./authProvider";

import { AuthProviderProps } from "@/types/auth";

export const Providers: React.FC<AuthProviderProps> = async ({ children }) => {
  const supabase = createServerComponentClient<Database>({ cookies });

  const {
    data: { session },
  } = await supabase.auth.getSession();

  return <AuthProvider session={session}>{children}</AuthProvider>;
};
