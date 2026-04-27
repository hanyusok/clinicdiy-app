import Link from 'next/link'
import { Hammer, UserCircle } from 'lucide-react'

export default function Navbar() {
  return (
    <header className="sticky top-0 z-50 w-full border-b border-gray-200 bg-white/80 backdrop-blur-md dark:border-gray-800 dark:bg-gray-950/80">
      <div className="flex h-14 items-center justify-between px-4 sm:px-6 lg:px-8">
        <Link href="/" className="flex items-center gap-2">
          <Hammer className="h-6 w-6 text-blue-600 dark:text-blue-500" />
          <span className="font-bold text-xl tracking-tight">ClinicDIY</span>
        </Link>
        <div className="flex items-center gap-4">
          <Link href="/login" className="text-sm font-medium hover:text-blue-600 transition-colors">
            로그인
          </Link>
          <Link href="/profile" aria-label="Profile">
            <UserCircle className="h-6 w-6 text-gray-600 hover:text-blue-600 dark:text-gray-400 transition-colors" />
          </Link>
        </div>
      </div>
    </header>
  )
}
