'use client'

import Link from 'next/link'
import { usePathname } from 'next/navigation'
import { clsx } from 'clsx'

export default function NavLink({ href, children }: { href: string; children: React.ReactNode }) {
  const pathname = usePathname()
  const isActive = pathname === href || (href !== '/' && pathname.startsWith(href))

  return (
    <Link
      href={href}
      className={clsx(
        "relative py-3 text-[15px] font-bold transition-colors whitespace-nowrap",
        isActive 
          ? "text-blue-500" 
          : "text-gray-700 hover:text-blue-500 dark:text-gray-300 dark:hover:text-blue-400"
      )}
    >
      {children}
      {isActive && (
        <span className="absolute bottom-0 left-0 w-full h-0.5 bg-blue-500 rounded-t-md" />
      )}
    </Link>
  )
}
