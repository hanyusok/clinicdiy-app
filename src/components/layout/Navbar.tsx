import Link from 'next/link'
import { Hammer, UserCircle, LogOut } from 'lucide-react'
import { createClient } from '@/utils/supabase/server'
import { signout } from '@/app/login/actions'

const navLinks = [
  { name: '포트폴리오', href: '/portfolio' },
  { name: '커뮤니티', href: '/community' },
  { name: '마켓', href: '/market' },
  { name: '개원도구', href: '/tools' },
]

export default async function Navbar() {
  const supabase = await createClient()
  const { data: { user } } = await supabase.auth.getUser()

  return (
    <header className="sticky top-0 z-50 w-full border-b border-gray-200 bg-white/80 backdrop-blur-md dark:border-gray-800 dark:bg-gray-950/80">
      <div className="flex h-14 items-center justify-between px-4 sm:px-6 lg:px-8">
        <div className="flex items-center gap-8">
          <Link href="/" className="flex items-center gap-2">
            <Hammer className="h-6 w-6 text-blue-600 dark:text-blue-500" />
            <span className="font-bold text-xl tracking-tight">ClinicDIY</span>
          </Link>
          <nav className="hidden md:flex items-center gap-1">
            {navLinks.map((link) => (
              <Link
                key={link.href}
                href={link.href}
                className="px-3 py-1.5 text-sm font-medium text-gray-600 hover:text-gray-900 dark:text-gray-400 dark:hover:text-white hover:bg-gray-100 dark:hover:bg-gray-800 rounded-lg transition-colors"
              >
                {link.name}
              </Link>
            ))}
          </nav>
        </div>
        <div className="flex items-center gap-4">
          {user ? (
            <div className="flex items-center gap-4">
              <span className="text-xs text-gray-500 hidden sm:inline-block">
                {user.email?.split('@')[0]}님 환영합니다
              </span>
              <form action={signout}>
                <button type="submit" className="text-sm font-medium text-gray-600 hover:text-red-600 dark:text-gray-400 dark:hover:text-red-500 transition-colors flex items-center gap-1">
                  <LogOut className="w-4 h-4" />
                  로그아웃
                </button>
              </form>
              <Link href="/profile" aria-label="Profile">
                <UserCircle className="h-6 w-6 text-gray-600 hover:text-blue-600 dark:text-gray-400 transition-colors" />
              </Link>
            </div>
          ) : (
            <>
              <Link href="/login" className="text-sm font-medium hover:text-blue-600 transition-colors">
                로그인
              </Link>
              <Link href="/login" aria-label="Profile">
                <UserCircle className="h-6 w-6 text-gray-600 hover:text-blue-600 dark:text-gray-400 transition-colors" />
              </Link>
            </>
          )}
        </div>
      </div>
    </header>
  )
}
