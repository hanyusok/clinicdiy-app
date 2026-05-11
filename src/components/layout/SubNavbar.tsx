'use client'

import { usePathname } from 'next/navigation'
import NavLink from './NavLink'

const SUB_MENUS = {
  community: [
    { name: '홈', href: '/' },
    { name: '추천', href: '/recommend' },
    { name: '인기', href: '/popular' },
    { name: '개원준비', href: '/preparation' },
    { name: '법규/행정', href: '/legal' },
    { name: 'DIY노하우', href: '/diy' },
    { name: '폐업정리', href: '/closing' },
  ],
  portfolio: [
    { name: '홈', href: '/portfolio' },
    { name: '공간별 팁', href: '/space' },
    { name: '평수별', href: '/portfolio/size' },
    { name: '진료과별', href: '/portfolio/specialty' },
  ],
  market: [
    { name: '홈', href: '/market' },
    { name: '베스트', href: '/market/best' },
    { name: '특가/기획전', href: '/market/special' },
    { name: '가구/집기', href: '/market/furniture' },
    { name: '의료기기', href: '/market/medical' },
  ],
  services: [
    { name: '전문가찾기', href: '/experts' },
    { name: '개원도구', href: '/tools' },
  ]
}

export default function SubNavbar() {
  const pathname = usePathname()

  let currentCategory = 'community'
  if (pathname.startsWith('/portfolio')) {
    currentCategory = 'portfolio'
  } else if (pathname.startsWith('/market')) {
    currentCategory = 'market'
  } else if (pathname.startsWith('/tools') || pathname.startsWith('/experts')) {
    currentCategory = 'services'
  }
  // `/legal`, `/diy`, `/closing` defaults to `community` as designed.

  const currentLinks = SUB_MENUS[currentCategory as keyof typeof SUB_MENUS] || SUB_MENUS.community

  return (
    <div className="flex items-center h-12 px-4 sm:px-6 lg:px-8 overflow-x-auto no-scrollbar border-t border-gray-100 dark:border-gray-800">
      <nav className="flex items-center gap-6">
        {currentLinks.map((link) => (
          <NavLink key={link.name} href={link.href}>
            {link.name}
          </NavLink>
        ))}
      </nav>
    </div>
  )
}
