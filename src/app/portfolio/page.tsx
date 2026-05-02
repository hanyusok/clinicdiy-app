import { createClient } from '@/utils/supabase/server'
import Link from 'next/link'
import { Images, Plus, SlidersHorizontal } from 'lucide-react'

const SPECIALTIES = ['전체', '내과', '소아과', '피부과', '정형외과', '치과', '안과', '산부인과', '이비인후과', '기타']
const SCOPES = ['전체', '전체시공', '부분시공', '리모델링']

export default async function PortfolioPage(props: {
  searchParams: Promise<{ specialty?: string; scope?: string }>
}) {
  const searchParams = await props.searchParams
  const specialty = searchParams.specialty || '전체'
  const scope = searchParams.scope || '전체'
  const supabase = await createClient()

  let query = supabase
    .from('portfolios')
    .select('*, portfolio_images(url, order_index)')
    .order('created_at', { ascending: false })

  if (specialty !== '전체') query = query.eq('specialty', specialty)
  if (scope !== '전체') query = query.eq('scope', scope)

  const { data: portfolios } = await query

  return (
    <div className="flex-1 w-full max-w-5xl mx-auto px-4 py-8 sm:px-6 lg:px-8">
      <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4 mb-8">
        <div>
          <h1 className="text-3xl font-bold text-gray-900 dark:text-white">클리닉 포트폴리오</h1>
          <p className="text-gray-500 dark:text-gray-400 mt-2">실제 개원 병원의 인테리어 사례를 탐색해보세요.</p>
        </div>
        <Link href="/portfolio/write" className="inline-flex items-center gap-2 bg-blue-600 hover:bg-blue-700 text-white px-4 py-2 rounded-xl font-medium transition-colors">
          <Plus className="w-5 h-5" />
          포트폴리오 등록
        </Link>
      </div>

      {/* Filters */}
      <div className="bg-white dark:bg-gray-900 border border-gray-100 dark:border-gray-800 rounded-2xl p-4 mb-8 space-y-3">
        <div className="flex items-center gap-2 mb-1">
          <SlidersHorizontal className="w-4 h-4 text-gray-500" />
          <span className="text-sm font-semibold text-gray-700 dark:text-gray-300">진료과목</span>
        </div>
        <div className="flex flex-wrap gap-2">
          {SPECIALTIES.map((s) => (
            <Link key={s} href={`/portfolio?specialty=${s}&scope=${scope}`}
              className={`px-3 py-1.5 rounded-full text-sm font-medium transition-colors ${specialty === s ? 'bg-blue-600 text-white' : 'bg-gray-100 dark:bg-gray-800 text-gray-600 dark:text-gray-400 hover:bg-gray-200 dark:hover:bg-gray-700'}`}>
              {s}
            </Link>
          ))}
        </div>
        <div className="flex items-center gap-2 mb-1">
          <span className="text-sm font-semibold text-gray-700 dark:text-gray-300">시공범위</span>
        </div>
        <div className="flex flex-wrap gap-2">
          {SCOPES.map((s) => (
            <Link key={s} href={`/portfolio?specialty=${specialty}&scope=${s}`}
              className={`px-3 py-1.5 rounded-full text-sm font-medium transition-colors ${scope === s ? 'bg-indigo-600 text-white' : 'bg-gray-100 dark:bg-gray-800 text-gray-600 dark:text-gray-400 hover:bg-gray-200 dark:hover:bg-gray-700'}`}>
              {s}
            </Link>
          ))}
        </div>
      </div>

      {/* Grid */}
      {portfolios && portfolios.length > 0 ? (
        <div className="grid grid-cols-2 md:grid-cols-3 gap-4 md:gap-6">
          {portfolios.map((p: any) => {
            const cover = p.portfolio_images?.find((img: any) => img.order_index === 0) || p.portfolio_images?.[0]
            return (
              <Link key={p.id} href={`/portfolio/${p.id}`}
                className="group rounded-2xl overflow-hidden border border-gray-100 dark:border-gray-800 bg-white dark:bg-gray-900 hover:shadow-xl hover:-translate-y-1 transition-all">
                <div className="aspect-[4/3] bg-gray-100 dark:bg-gray-800 overflow-hidden">
                  {cover ? (
                    <img src={cover.url} alt={p.title} className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-300" />
                  ) : (
                    <div className="w-full h-full flex items-center justify-center text-gray-300"><Images className="w-10 h-10" /></div>
                  )}
                </div>
                <div className="p-4">
                  <p className="font-bold text-sm truncate mb-2">{p.title}</p>
                  <div className="flex flex-wrap gap-1.5">
                    <span className="text-xs bg-blue-50 dark:bg-blue-900/20 text-blue-600 dark:text-blue-400 px-2 py-0.5 rounded-full">{p.specialty}</span>
                    <span className="text-xs bg-gray-100 dark:bg-gray-800 text-gray-600 dark:text-gray-400 px-2 py-0.5 rounded-full">{p.size_pyeong}평</span>
                    <span className="text-xs bg-gray-100 dark:bg-gray-800 text-gray-600 dark:text-gray-400 px-2 py-0.5 rounded-full">{p.scope}</span>
                  </div>
                </div>
              </Link>
            )
          })}
        </div>
      ) : (
        <div className="text-center py-20 bg-white dark:bg-gray-900 rounded-3xl border border-gray-100 dark:border-gray-800">
          <Images className="w-12 h-12 mx-auto text-gray-300 mb-4" />
          <p className="text-gray-500 mb-4">아직 등록된 포트폴리오가 없습니다.</p>
          <Link href="/portfolio/write" className="inline-flex items-center gap-2 bg-blue-600 text-white px-5 py-2.5 rounded-xl font-medium hover:bg-blue-700 transition-colors">
            <Plus className="w-4 h-4" /> 첫 포트폴리오 등록하기
          </Link>
        </div>
      )}
    </div>
  )
}
