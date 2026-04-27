import { NextResponse } from 'next/server'
import { createClient } from '@/utils/supabase/server'

export async function GET(request: Request) {
  const { searchParams, origin } = new URL(request.url)
  const code = searchParams.get('code')
  const errorParam = searchParams.get('error')
  const errorDescription = searchParams.get('error_description')

  if (errorParam) {
    console.error('Kakao OAuth Error:', errorParam, errorDescription)
    return NextResponse.redirect(`${origin}/login?message=${encodeURIComponent(errorDescription || errorParam)}`)
  }

  if (!code) {
    return NextResponse.redirect(`${origin}/login?message=No code provided by Kakao`)
  }

  try {
    const clientId = process.env.NEXT_PUBLIC_KAKAO_CLIENT_ID
    const clientSecret = process.env.KAKAO_CLIENT_SECRET
    const redirectUri = `${origin}/auth/kakao/callback`

    if (!clientId) {
      throw new Error('Kakao Client ID not configured')
    }

    const bodyParams = new URLSearchParams({
      grant_type: 'authorization_code',
      client_id: clientId,
      redirect_uri: redirectUri,
      code,
    })

    if (clientSecret) {
      bodyParams.append('client_secret', clientSecret)
    }

    // 1. Exchange authorization code for tokens
    const tokenResponse = await fetch('https://kauth.kakao.com/oauth/token', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/x-www-form-urlencoded;charset=utf-8',
      },
      body: bodyParams,
    })

    const tokenData = await tokenResponse.json()

    if (!tokenResponse.ok) {
      console.error('Kakao Token Error:', tokenData)
      return NextResponse.redirect(`${origin}/login?message=Failed to retrieve Kakao token`)
    }

    const { id_token } = tokenData

    if (!id_token) {
      return NextResponse.redirect(`${origin}/login?message=No ID token in Kakao response. Make sure OpenID Connect is ON in Kakao Developers.`)
    }

    const supabase = await createClient()
    console.log('Attempting signInWithIdToken with token length:', id_token.length)
    const { data, error } = await supabase.auth.signInWithIdToken({
      provider: 'kakao',
      token: id_token,
    })

    console.log('signInWithIdToken response:', { data: !!data?.user, error })

    if (error) {
      console.error('Supabase signInWithIdToken error:', error)
      return NextResponse.redirect(`${origin}/login?message=Supabase Auth failed: ${error.message}`)
    }

    // 3. Successful login, redirect to community
    return NextResponse.redirect(`${origin}/community`)
  } catch (error: any) {
    console.error('Kakao Callback Error:', error)
    return NextResponse.redirect(`${origin}/login?message=Internal server error during Kakao login`)
  }
}
