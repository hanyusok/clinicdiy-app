import { NextResponse } from 'next/server'
import { createClient } from '@/utils/supabase/server'

export async function GET(request: Request) {
  const { searchParams, origin } = new URL(request.url)
  const code = searchParams.get('code')
  // if "next" is in param, use it as the redirect URL
  const next = searchParams.get('next') ?? '/community'

  if (code) {
    const supabase = await createClient()
    console.log('Standard callback: exchanging code for session')
    const { error } = await supabase.auth.exchangeCodeForSession(code)
    console.log('Standard callback: exchange error?', error?.message)
    if (!error) {
      return NextResponse.redirect(`${origin}${next}`)
    }
  }

  // return the user to an error page with instructions
  return NextResponse.redirect(`${origin}/login?message=소셜 로그인에 실패했습니다.`)
}
