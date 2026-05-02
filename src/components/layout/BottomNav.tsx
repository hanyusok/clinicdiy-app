'use client'

import Link from 'next/link'
import { usePathname } from 'next/navigation'
import { Home, Images, MessageSquare, ShoppingBag, UserCircle } from 'lucide-react'
import { clsx } from 'clsx'
import { twMerge } from 'tailwind-merge'

const navItems = [
  { name: '홈', href: '/', icon: Home },
  { name: '포트폴리오', href: '/portfolio', icon: Images },
  { name: '커뮤니티', href: '/community', icon: MessageSquare },
  { name: '마켓', href: '/market', icon: ShoppingBag },
  { name: '내 정보', href: '/profile', icon: UserCircle },
]

export default function BottomNav() {
  const pathname = usePathname()

  return (
    <nav className="fixed bottom-0 left-0 z-50 w-full h-16 bg-white border-t border-gray-200 dark:bg-gray-950 dark:border-gray-800 md:hidden">
      <div className="grid h-full max-w-lg grid-cols-5 mx-auto font-medium">
        {navItems.map((item) => {
          const isActive = pathname === item.href || (item.href !== '/' && pathname.startsWith(item.href))
          const Icon = item.icon
          
          return (
            <Link
              key={item.name}
              href={item.href}
              className={twMerge(
                clsx(
                  "inline-flex flex-col items-center justify-center px-2 hover:bg-gray-50 dark:hover:bg-gray-800 group",
                  isActive ? "text-blue-600 dark:text-blue-500" : "text-gray-500 dark:text-gray-400 hover:text-gray-900 dark:hover:text-white"
                )
              )}
            >
              <Icon className={clsx("w-5 h-5 mb-1 group-hover:scale-110 transition-transform", isActive ? "fill-blue-100 dark:fill-blue-900/20" : "")} />
              <span className="text-[9px] sm:text-xs">{item.name}</span>
            </Link>
          )
        })}
      </div>
    </nav>
  )
}
