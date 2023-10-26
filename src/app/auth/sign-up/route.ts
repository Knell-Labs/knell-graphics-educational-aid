import { createRouteHandlerClient } from '@supabase/auth-helpers-nextjs'
import { cookies } from 'next/headers'
import { NextResponse } from 'next/server'

export const dynamic = 'force-dynamic'

export async function POST(request: Request) {
    const requestUrl    = new URL(request.url)
    const formData      = await request.formData()
    const email         = String(formData.get('email'))
    const password      = String(formData.get('password'))
    const supabase      = createRouteHandlerClient({ cookies })

    const { error } = await supabase.auth.signUp({
            email,
            password,
            options: {
            emailRedirectTo: `${requestUrl.origin}/auth/callback`,
        },
    })

    if (error) {
        return new Response(
            JSON.stringify({ message: "Could not authenticate user", error: error.message }),
            {
                status: 400, // You might want to use 400 for client errors
                headers: {
                    "Content-Type": "application/json"
                }
            }
        );
    }

    return new Response(
        JSON.stringify({ message: "Check email to continue sign in process" }),
        {
            status: 200, // OK status
            headers: {
                "Content-Type": "application/json"
            }
        }
    );
}