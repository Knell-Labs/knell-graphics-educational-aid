"use client";
import { Auth } from "@supabase/auth-ui-react";
import { ThemeSupa, ThemeMinimal } from "@supabase/auth-ui-shared";
import { createClientComponentClient } from "@supabase/auth-helpers-nextjs";

export default function AuthForm() {
  const supabase = createClientComponentClient();

  return (
    <div className="relative">
      <Auth
        supabaseClient={supabase}
        appearance={{
          theme: ThemeSupa,
          variables: {
            default: {
              colors: {
                brand: "#4f46e5",
                brandAccent: "#3933a2",
                anchorTextColor: "#4f46e5",
                anchorTextHoverColor: "#3933a2",
                dividerBackground: "#000",
              },
            },
          },
          className: {
            message: "inset-x-0",
          },
          style: {
            container: { marginTop: "0", position: "relative" },
            message: { position: "absolute", padding: "0.5em" },
            // 'divider': { display: 'none' }
          },
        }}
        theme="dark"
        // showLinks     = {false}

        providers={[
          "apple",
          "facebook",
          "google",
          // 'twitter',
          // 'discord',
          // 'spotify',
        ]}
        // redirectTo="/"
      />
    </div>
  );
}
