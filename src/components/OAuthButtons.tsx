'use client'

import { useState } from 'react'
import { createClient } from '@/utils/supabase/client'

export default function OAuthButtons() {
  const supabase = createClient()
  const [loadingProvider, setLoadingProvider] = useState<string | null>(null)

  const handleOAuthLogin = async (provider: 'google' | 'kakao') => {
    try {
      setLoadingProvider(provider)
      
      if (provider === 'kakao') {
        const clientId = process.env.NEXT_PUBLIC_KAKAO_CLIENT_ID
        if (!clientId) {
          alert('카카오 로그인 설정이 누락되었습니다. 관리자에게 문의하세요. (Kakao Client ID missing)')
          setLoadingProvider(null)
          return
        }
        const redirectUri = `${window.location.origin}/auth/kakao/callback`
        const kakaoAuthUrl = `https://kauth.kakao.com/oauth/authorize?client_id=${clientId}&redirect_uri=${redirectUri}&response_type=code&scope=openid profile_nickname profile_image`
        window.location.href = kakaoAuthUrl
        return // Stop here, browser will redirect
      }

      const options: any = {
        redirectTo: `${window.location.origin}/auth/callback`,
      }
      
      const { error } = await supabase.auth.signInWithOAuth({
        provider,
        options,
      })
      if (error) throw error
    } catch (error: any) {
      console.error(error)
      alert(error.message || '소셜 로그인 중 오류가 발생했습니다.')
      setLoadingProvider(null)
    }
  }

  return (
    <div className="flex flex-col gap-3 mt-4">
      <div className="relative">
        <div className="absolute inset-0 flex items-center">
          <span className="w-full border-t border-gray-200 dark:border-gray-800" />
        </div>
        <div className="relative flex justify-center text-xs uppercase">
          <span className="bg-white dark:bg-gray-950 px-2 text-gray-500">
            또는 다음으로 로그인
          </span>
        </div>
      </div>

      <button
        type="button"
        onClick={() => handleOAuthLogin('google')}
        disabled={loadingProvider !== null}
        className="w-full bg-white hover:bg-gray-50 text-gray-900 border border-gray-200 dark:bg-white dark:hover:bg-gray-100 rounded-xl px-4 py-3 text-sm font-medium transition-colors flex items-center justify-center gap-2"
      >
        <svg className="w-5 h-5" viewBox="0 0 24 24">
          <path
            fill="currentColor"
            d="M22.56 12.25c0-.78-.07-1.53-.2-2.25H12v4.26h5.92c-.26 1.37-1.04 2.53-2.21 3.31v2.77h3.57c2.08-1.92 3.28-4.74 3.28-8.09z"
          />
          <path
            fill="#34A853"
            d="M12 23c2.97 0 5.46-.98 7.28-2.66l-3.57-2.77c-.98.66-2.23 1.06-3.71 1.06-2.86 0-5.29-1.93-6.16-4.53H2.18v2.84C3.99 20.53 7.7 23 12 23z"
          />
          <path
            fill="#FBBC05"
            d="M5.84 14.09c-.22-.66-.35-1.36-.35-2.09s.13-1.43.35-2.09V7.07H2.18C1.43 8.55 1 10.22 1 12s.43 3.45 1.18 4.93l2.85-2.22.81-.62z"
          />
          <path
            fill="#EA4335"
            d="M12 5.38c1.62 0 3.06.56 4.21 1.64l3.15-3.15C17.45 2.09 14.97 1 12 1 7.7 1 3.99 3.47 2.18 7.07l3.66 2.84c.87-2.6 3.3-4.53 6.16-4.53z"
          />
        </svg>
        {loadingProvider === 'google' ? '연결 중...' : 'Google로 로그인'}
      </button>

      <button
        type="button"
        onClick={() => handleOAuthLogin('kakao')}
        disabled={loadingProvider !== null}
        className="w-full bg-[#FEE500] hover:bg-[#FEE500]/90 text-[#000000] border border-transparent rounded-xl px-4 py-3 text-sm font-medium transition-colors flex items-center justify-center gap-2"
      >
        <svg className="w-5 h-5" viewBox="0 0 24 24" fill="currentColor">
          <path d="M12 3C6.477 3 2 6.477 2 10.772c0 2.85 1.83 5.342 4.607 6.702l-1.077 3.931a.514.514 0 0 0 .753.542l4.577-3.056c.371.05.748.077 1.14.077 5.523 0 10-3.477 10-7.772C22 6.477 17.523 3 12 3z"/>
        </svg>
        {loadingProvider === 'kakao' ? '연결 중...' : 'Kakao로 로그인'}
      </button>
    </div>
  )
}
