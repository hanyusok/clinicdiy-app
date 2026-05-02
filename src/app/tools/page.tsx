import Link from 'next/link'
import type { Metadata } from 'next'
import { LayoutPanelLeft, ClipboardList, ArrowRight } from 'lucide-react'

export const metadata: Metadata = {
  title: '개원 도구 | ClinicDIY',
  description: '2D 도면 플래너와 법적 시설 기준 체크리스트로 병원 개원을 준비하세요.',
}

const tools = [
  {
    href: '/tools/floorplan',
    icon: LayoutPanelLeft,
    emoji: '📐',
    title: '2D 병원 도면 플래너',
    desc: '진료실, 대기실, 처치실 등을 드래그앤드롭으로 배치해 나만의 병원 레이아웃을 설계해보세요.',
    tags: ['대기실', '진료실', 'X-ray실', '동선'],
    color: 'blue',
    badge: 'New',
  },
  {
    href: '/tools/checklist',
    icon: ClipboardList,
    emoji: '📋',
    title: '법적 시설 기준 체크리스트',
    desc: '진료과목과 면적을 입력하면 소방법, 장애인 편의시설, 의료법 기준을 자동으로 생성합니다.',
    tags: ['소방시설', '장애인시설', '의료법', 'X-ray 차폐'],
    color: 'emerald',
    badge: null,
  },
]

export default function ToolsPage() {
  return (
    <div className="flex-1 w-full max-w-4xl mx-auto px-4 py-8 sm:px-6 lg:px-8">
      <div className="mb-10">
        <h1 className="text-3xl font-extrabold text-gray-900 dark:text-white mb-2">개원 도구</h1>
        <p className="text-gray-500 dark:text-gray-400">병원 개원 준비에 필요한 인터랙티브 도구를 제공합니다.</p>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        {tools.map(tool => {
          const Icon = tool.icon
          const colorMap = {
            blue:   { card: 'hover:border-blue-300 dark:hover:border-blue-700', icon: 'bg-blue-100 dark:bg-blue-900/30 text-blue-600 dark:text-blue-400', tag: 'bg-blue-50 dark:bg-blue-900/20 text-blue-600 dark:text-blue-400', badge: 'bg-blue-600' },
            emerald:{ card: 'hover:border-emerald-300 dark:hover:border-emerald-700', icon: 'bg-emerald-100 dark:bg-emerald-900/30 text-emerald-600 dark:text-emerald-400', tag: 'bg-emerald-50 dark:bg-emerald-900/20 text-emerald-600 dark:text-emerald-400', badge: 'bg-emerald-600' },
          }
          const colors = colorMap[tool.color as keyof typeof colorMap]

          return (
            <Link
              key={tool.href}
              href={tool.href}
              className={`group relative p-6 bg-white dark:bg-gray-900 rounded-3xl border border-gray-100 dark:border-gray-800 shadow-sm hover:shadow-xl hover:-translate-y-1 transition-all overflow-hidden ${colors.card}`}
            >
              {tool.badge && (
                <span className={`absolute top-4 right-4 text-xs text-white font-bold px-2 py-0.5 rounded-full ${colors.badge}`}>
                  {tool.badge}
                </span>
              )}
              <div className={`w-14 h-14 ${colors.icon} rounded-2xl flex items-center justify-center mb-5 text-2xl`}>
                {tool.emoji}
              </div>
              <h2 className="text-xl font-bold text-gray-900 dark:text-white mb-2">{tool.title}</h2>
              <p className="text-sm text-gray-500 dark:text-gray-400 leading-relaxed mb-5">{tool.desc}</p>
              <div className="flex flex-wrap gap-1.5 mb-5">
                {tool.tags.map(tag => (
                  <span key={tag} className={`text-xs px-2 py-0.5 rounded-full font-medium ${colors.tag}`}>{tag}</span>
                ))}
              </div>
              <span className={`inline-flex items-center gap-1 text-sm font-semibold group-hover:gap-2 transition-all ${colors.icon.split(' ').slice(-2).join(' ')}`}>
                도구 열기 <ArrowRight className="w-4 h-4" />
              </span>
            </Link>
          )
        })}
      </div>

      {/* Coming Soon */}
      <div className="mt-8 p-6 bg-gray-50 dark:bg-gray-900/50 border border-dashed border-gray-300 dark:border-gray-700 rounded-3xl text-center">
        <p className="text-2xl mb-2">🚀</p>
        <h3 className="font-bold text-gray-700 dark:text-gray-300 mb-1">곧 출시 예정</h3>
        <p className="text-sm text-gray-500">AI 기반 레이아웃 추천 · 개업 일정 관리 도구</p>
      </div>
    </div>
  )
}
