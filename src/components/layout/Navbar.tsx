import Link from 'next/link'
import { Hammer, UserCircle, LogOut, Search, ShoppingCart } from 'lucide-react'
import { createClient } from '@/utils/supabase/server'
import { signout } from '@/app/login/actions'
import NavLink from './NavLink'

const mainLinks = [
  { name: '커뮤니티', href: '/community' },
  { name: '마켓', href: '/market' },
  { name: '포트폴리오', href: '/portfolio' },
  { name: '개원도구', href: '/tools' },
]

const subLinks = [
  { name: '홈', href: '/' },
  { name: '추천', href: '/recommend' },
  { name: '인기', href: '/popular' },
  { name: '개원준비', href: '/preparation' },
  { name: '공간별', href: '/space' },
  { name: '법규/행정', href: '/legal' },
  { name: 'DIY노하우', href: '/diy' },
  { name: '전문가찾기', href: '/experts' },
  { name: '폐업정리', href: '/closing' },
]

export default async function Navbar() {
  const supabase = await createClient()
  const { data: { user } } = await supabase.auth.getUser()

  return (
    <header className="sticky top-0 z-50 w-full border-b border-gray-200 bg-white dark:border-gray-800 dark:bg-gray-950">
      <div className="max-w-7xl mx-auto">
        {/* Top Row */}
        <div className="flex h-16 items-center justify-between px-4 sm:px-6 lg:px-8">
          <div className="flex items-center gap-8">
            <Link href="/" className="flex items-center gap-2">
              <Hammer className="h-7 w-7 text-blue-500" />
              <span className="font-extrabold text-2xl tracking-tight">ClinicDIY</span>
            </Link>
            <nav className="hidden md:flex items-center gap-6 ml-2">
              {mainLinks.map((link) => (
                <Link
                  key={link.href}
                  href={link.href}
                  className="text-[17px] font-bold text-gray-800 hover:text-blue-500 dark:text-gray-200 dark:hover:text-blue-400 transition-colors"
                >
                  {link.name}
                </Link>
              ))}
            </nav>
          </div>
          
          <div className="flex items-center gap-4">
            <div className="hidden md:flex items-center gap-3">
              <button aria-label="Search" className="p-2 text-gray-700 hover:text-blue-500 dark:text-gray-300">
                <Search className="w-6 h-6" />
              </button>
              <button aria-label="Cart" className="p-2 text-gray-700 hover:text-blue-500 dark:text-gray-300">
                <ShoppingCart className="w-6 h-6" />
              </button>
            </div>
            
            <div className="h-4 w-px bg-gray-300 dark:bg-gray-700 mx-1 hidden md:block"></div>

            {user ? (
              <div className="flex items-center gap-3">
                <span className="text-sm font-medium text-gray-700 dark:text-gray-300 hidden sm:inline-block">
                  {user.email?.split('@')[0]}님
                </span>
                <form action={signout}>
                  <button type="submit" className="text-sm text-gray-500 hover:text-gray-900 dark:text-gray-400 dark:hover:text-white transition-colors">
                    로그아웃
                  </button>
                </form>
                <Link href="/profile" aria-label="Profile">
                  <UserCircle className="h-7 w-7 text-gray-600 hover:text-blue-500 transition-colors" />
                </Link>
              </div>
            ) : (
              <div className="flex items-center gap-3 text-sm">
                <Link href="/login" className="text-gray-600 hover:text-gray-900 dark:text-gray-400 dark:hover:text-white transition-colors">
                  로그인
                </Link>
                <div className="h-3 w-px bg-gray-300 dark:bg-gray-700"></div>
                <Link href="/login" className="text-gray-600 hover:text-gray-900 dark:text-gray-400 dark:hover:text-white transition-colors">
                  회원가입
                </Link>
              </div>
            )}
            
            <Link 
              href="/community/write" 
              className="hidden md:inline-flex ml-2 items-center justify-center rounded-md bg-blue-500 px-4 py-2 text-sm font-semibold text-white shadow-sm hover:bg-blue-600 transition-colors"
            >
              글쓰기
            </Link>
          </div>
        </div>

        {/* Bottom Row (Sub Navigation) */}
        <div className="flex items-center h-12 px-4 sm:px-6 lg:px-8 overflow-x-auto no-scrollbar">
          <nav className="flex items-center gap-6">
            {subLinks.map((link) => (
              <NavLink key={link.href} href={link.href}>
                {link.name}
              </NavLink>
            ))}
          </nav>
        </div>
      </div>
    </header>
  )
}
