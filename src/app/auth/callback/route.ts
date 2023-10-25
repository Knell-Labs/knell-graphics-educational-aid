import { createRouteHandlerClient } from '@supabase/auth-helpers-nextjs'
import { cookies } from 'next/headers'
import { NextResponse } from 'next/server'

export async function GET( req: Request ) {
  const requestUrl = new URL(req.url)
  const { searchParams } = requestUrl
  const code = searchParams.get('code')
  
  if (code) {
    const cookieStore = cookies()
    const supabase = createRouteHandlerClient({ cookies: () => cookieStore })
    await supabase.auth.exchangeCodeForSession(code)
  }
  
  return NextResponse.next()
  // return NextResponse.redirect(requestUrl.origin);
}