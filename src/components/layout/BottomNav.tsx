'use client'

import Link from 'next/link'
import { usePathname } from 'next/navigation'
import { Home, Lightbulb, Wrench, FileImage, MessageSquare } from 'lucide-react'
import { clsx } from 'clsx'
import { twMerge } from 'tailwind-merge'

const navItems = [
  { name: '홈', href: '/', icon: Home },
  { name: '노하우', href: '/community?category=knowhow', icon: Lightbulb },
  { name: '도구/제품', href: '/community?category=tools', icon: Wrench },
  { name: '템플릿', href: '/community?category=templates', icon: FileImage },
  { name: '질문', href: '/community?category=qna', icon: MessageSquare },
]

export default function BottomNav() {
  const pathname = usePathname()

  return (
    <nav className="fixed bottom-0 left-0 z-50 w-full h-16 bg-white border-t border-gray-200 dark:bg-gray-950 dark:border-gray-800 md:hidden">
      <div className="grid h-full max-w-lg grid-cols-5 mx-auto font-medium">
        {navItems.map((item) => {
          const isActive = pathname === item.href || (item.href !== '/' && pathname.startsWith(item.href.split('?')[0]))
          const Icon = item.icon
          
          return (
            <Link
              key={item.name}
              href={item.href}
              className={twMerge(
                clsx(
                  "inline-flex flex-col items-center justify-center px-5 hover:bg-gray-50 dark:hover:bg-gray-800 group",
                  isActive ? "text-blue-600 dark:text-blue-500" : "text-gray-500 dark:text-gray-400 hover:text-gray-900 dark:hover:text-white"
                )
              )}
            >
              <Icon className={clsx("w-6 h-6 mb-1 group-hover:scale-110 transition-transform", isActive ? "fill-blue-100 dark:fill-blue-900/20" : "")} />
              <span className="text-[10px] sm:text-xs">{item.name}</span>
            </Link>
          )
        })}
      </div>
    </nav>
  )
}
