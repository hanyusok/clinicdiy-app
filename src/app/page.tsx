import { createClient } from '@/utils/supabase/server'
import Link from 'next/link'
import { Images, MessageSquare, ShoppingBag, TrendingUp, ArrowRight, Hammer, ClipboardCheck } from 'lucide-react'

export default async function Home() {
  const supabase = await createClient()

  const { data: portfolios } = await supabase
    .from('portfolios')
    .select('*, portfolio_images(url, order_index)')
    .order('created_at', { ascending: false })
    .limit(4)

  const { data: posts } = await supabase
    .from('posts')
    .select('*, profiles(username)')
    .order('likes_count', { ascending: false })
    .limit(4)

  return (
    <div className="flex flex-col min-h-full">
      {/* Hero Section */}
      <section className="relative overflow-hidden bg-gradient-to-br from-blue-600 via-blue-700 to-indigo-800 px-6 py-16 md:py-28 text-white">
        <div className="absolute inset-0 bg-[url('data:image/svg+xml;base64,PHN2ZyB3aWR0aD0iNjAiIGhlaWdodD0iNjAiIHZpZXdCb3g9IjAgMCA2MCA2MCIgeG1sbnM9Imh0dHA6Ly93d3cudzMub3JnLzIwMDAvc3ZnIj48ZyBmaWxsPSJub25lIiBmaWxsLXJ1bGU9ImV2ZW5vZGQiPjxnIGZpbGw9IiNmZmZmZmYiIGZpbGwtb3BhY2l0eT0iMC4wNCI+PHBhdGggZD0iTTM2IDM0djZoNnYtNmgtNnptMCAwdi02aC02djZoNnptNiAwaDZ2LTZoLTZ2NnptLTEyIDBoLTZ2Nmg2di02eiIvPjwvZz48L2c+PC9zdmc+')] opacity-40" />
        <div className="relative z-10 max-w-5xl mx-auto flex flex-col items-center text-center space-y-6">
          <div className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full bg-white/15 backdrop-blur-sm text-white text-sm font-medium border border-white/20">
            <Hammer className="w-4 h-4" />
            <span>개원의를 위한 셀프 병원 인테리어 플랫폼</span>
          </div>
          <h1 className="text-4xl md:text-6xl font-extrabold tracking-tight leading-tight">
            우리 병원 인테리어,<br className="hidden md:block" />
            <span className="text-blue-200">의사가 직접 만든다</span>
          </h1>
          <p className="text-lg md:text-xl text-blue-100 max-w-2xl leading-relaxed">
            의료법을 준수하면서 진료 효율을 높이는 병원 인테리어 노하우.
            실제 개원의들의 생생한 경험과 전문 파트너를 한 곳에서.
          </p>
          <div className="flex flex-wrap items-center justify-center gap-3 pt-2">
            <Link
              href="/portfolio"
              className="bg-white text-blue-700 hover:bg-blue-50 rounded-xl px-6 py-3 font-semibold transition-all hover:scale-105 shadow-lg"
            >
              포트폴리오 보기
            </Link>
            <Link
              href="/community/write"
              className="bg-white/15 hover:bg-white/25 border border-white/30 text-white rounded-xl px-6 py-3 font-semibold transition-all backdrop-blur-sm"
            >
              노하우 공유하기
            </Link>
          </div>
        </div>
      </section>

      {/* 3C Pillars */}
      <section className="px-6 py-12 max-w-5xl mx-auto w-full">
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          <Link href="/portfolio" className="group relative p-6 bg-white dark:bg-gray-900 rounded-3xl border border-gray-100 dark:border-gray-800 shadow-sm hover:shadow-xl hover:-translate-y-1 transition-all overflow-hidden">
            <div className="absolute top-0 right-0 w-32 h-32 bg-blue-400/10 rounded-full blur-2xl -translate-y-1/2 translate-x-1/2 group-hover:bg-blue-400/20 transition-all" />
            <div className="relative z-10">
              <div className="w-12 h-12 bg-blue-100 dark:bg-blue-900/30 rounded-2xl flex items-center justify-center mb-4">
                <Images className="w-6 h-6 text-blue-600 dark:text-blue-400" />
              </div>
              <h3 className="text-xl font-bold mb-2">포트폴리오</h3>
              <p className="text-gray-500 dark:text-gray-400 text-sm leading-relaxed">
                실제 개원 병원의 인테리어 사례. 진료과, 평수, 예산별로 탐색하세요.
              </p>
              <span className="mt-4 inline-flex items-center gap-1 text-sm font-medium text-blue-600 dark:text-blue-400">
                사례 보기 <ArrowRight className="w-4 h-4" />
              </span>
            </div>
          </Link>

          <Link href="/community" className="group relative p-6 bg-white dark:bg-gray-900 rounded-3xl border border-gray-100 dark:border-gray-800 shadow-sm hover:shadow-xl hover:-translate-y-1 transition-all overflow-hidden">
            <div className="absolute top-0 right-0 w-32 h-32 bg-emerald-400/10 rounded-full blur-2xl -translate-y-1/2 translate-x-1/2 group-hover:bg-emerald-400/20 transition-all" />
            <div className="relative z-10">
              <div className="w-12 h-12 bg-emerald-100 dark:bg-emerald-900/30 rounded-2xl flex items-center justify-center mb-4">
                <MessageSquare className="w-6 h-6 text-emerald-600 dark:text-emerald-400" />
              </div>
              <h3 className="text-xl font-bold mb-2">커뮤니티</h3>
              <p className="text-gray-500 dark:text-gray-400 text-sm leading-relaxed">
                법규 가이드, 공간 최적화, DIY 노하우까지. 원장님들의 생생한 경험을 나눠요.
              </p>
              <span className="mt-4 inline-flex items-center gap-1 text-sm font-medium text-emerald-600 dark:text-emerald-400">
                커뮤니티 입장 <ArrowRight className="w-4 h-4" />
              </span>
            </div>
          </Link>

          <Link href="/market" className="group relative p-6 bg-white dark:bg-gray-900 rounded-3xl border border-gray-100 dark:border-gray-800 shadow-sm hover:shadow-xl hover:-translate-y-1 transition-all overflow-hidden">
            <div className="absolute top-0 right-0 w-32 h-32 bg-violet-400/10 rounded-full blur-2xl -translate-y-1/2 translate-x-1/2 group-hover:bg-violet-400/20 transition-all" />
            <div className="relative z-10">
              <div className="w-12 h-12 bg-violet-100 dark:bg-violet-900/30 rounded-2xl flex items-center justify-center mb-4">
                <ShoppingBag className="w-6 h-6 text-violet-600 dark:text-violet-400" />
              </div>
              <h3 className="text-xl font-bold mb-2">마켓</h3>
              <p className="text-gray-500 dark:text-gray-400 text-sm leading-relaxed">
                병원 전용 가구, 항균 자재, DIY 키트. 전문 시공 파트너 매칭까지.
              </p>
              <span className="mt-4 inline-flex items-center gap-1 text-sm font-medium text-violet-600 dark:text-violet-400">
                쇼핑하기 <ArrowRight className="w-4 h-4" />
              </span>
            </div>
          </Link>
        </div>
      </section>

      {/* Latest Portfolios */}
      <section className="px-6 py-8 max-w-5xl mx-auto w-full">
        <div className="flex items-center justify-between mb-6">
          <div className="flex items-center gap-2">
            <Images className="w-5 h-5 text-blue-600" />
            <h2 className="text-2xl font-bold">최신 포트폴리오</h2>
          </div>
          <Link href="/portfolio" className="text-blue-600 text-sm font-medium flex items-center gap-1 hover:gap-2 transition-all">
            전체보기 <ArrowRight className="w-4 h-4" />
          </Link>
        </div>

        {portfolios && portfolios.length > 0 ? (
          <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
            {portfolios.map((p: any) => {
              const cover = p.portfolio_images?.find((img: any) => img.order_index === 0) || p.portfolio_images?.[0]
              return (
                <Link key={p.id} href={`/portfolio/${p.id}`} className="group rounded-2xl overflow-hidden border border-gray-100 dark:border-gray-800 hover:shadow-lg transition-all">
                  <div className="aspect-square bg-gray-100 dark:bg-gray-800 overflow-hidden">
                    {cover ? (
                      <img src={cover.url} alt={p.title} className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-300" />
                    ) : (
                      <div className="w-full h-full flex items-center justify-center text-gray-400">
                        <Images className="w-8 h-8" />
                      </div>
                    )}
                  </div>
                  <div className="p-3">
                    <p className="text-sm font-semibold truncate">{p.title}</p>
                    <p className="text-xs text-gray-500 mt-0.5">{p.specialty} · {p.size_pyeong}평</p>
                  </div>
                </Link>
              )
            })}
          </div>
        ) : (
          <div className="bg-white dark:bg-gray-900 border border-gray-100 dark:border-gray-800 rounded-3xl p-8 text-center text-gray-500">
            <p>아직 등록된 포트폴리오가 없습니다.</p>
            <Link href="/portfolio/write" className="mt-3 inline-flex text-blue-600 text-sm font-medium">첫 번째 포트폴리오 등록하기 →</Link>
          </div>
        )}
      </section>

      {/* Trending Posts */}
      <section className="px-6 py-8 max-w-5xl mx-auto w-full mb-8">
        <div className="flex items-center justify-between mb-6">
          <div className="flex items-center gap-2">
            <TrendingUp className="w-5 h-5 text-red-500" />
            <h2 className="text-2xl font-bold">인기 노하우</h2>
          </div>
          <Link href="/community" className="text-blue-600 text-sm font-medium flex items-center gap-1 hover:gap-2 transition-all">
            전체보기 <ArrowRight className="w-4 h-4" />
          </Link>
        </div>

        {posts && posts.length > 0 ? (
          <div className="grid gap-3">
            {posts.map((post: any, idx: number) => (
              <Link
                key={post.id}
                href={`/community/${post.id}`}
                className="flex items-center gap-4 p-4 bg-white dark:bg-gray-900 rounded-2xl border border-gray-100 dark:border-gray-800 hover:border-blue-200 dark:hover:border-blue-900 hover:shadow-md transition-all group"
              >
                <span className={`text-2xl font-black w-8 text-center shrink-0 ${idx === 0 ? 'text-blue-600' : idx === 1 ? 'text-blue-400' : 'text-gray-300'}`}>
                  {idx + 1}
                </span>
                <div className="flex-1 min-w-0">
                  <p className="font-semibold text-sm truncate group-hover:text-blue-600 transition-colors">{post.title}</p>
                  <p className="text-xs text-gray-500 mt-0.5">{post.profiles?.username || '익명'} · 좋아요 {post.likes_count}</p>
                </div>
                <ArrowRight className="w-4 h-4 text-gray-300 group-hover:text-blue-400 transition-colors shrink-0" />
              </Link>
            ))}
          </div>
        ) : (
          <div className="bg-white dark:bg-gray-900 border border-gray-100 dark:border-gray-800 rounded-3xl p-8 text-center text-gray-500">
            <p>아직 등록된 게시글이 없습니다. 첫 번째 노하우를 공유해주세요!</p>
          </div>
        )}
      </section>

      {/* CTA Banner */}
      <section className="px-6 pb-12 max-w-5xl mx-auto w-full">
        <div className="bg-gradient-to-r from-blue-600 to-indigo-600 rounded-3xl p-8 text-white text-center">
          <ClipboardCheck className="w-10 h-10 mx-auto mb-3 text-blue-200" />
          <h3 className="text-2xl font-bold mb-2">법적 시설 기준, 놓치지 마세요</h3>
          <p className="text-blue-100 mb-6 text-sm">소방시설법, 장애인 편의시설, 의료법상 면적 기준을 자동으로 체크해드립니다.</p>
          <Link
            href="/community?category=legal"
            className="inline-flex bg-white text-blue-700 font-semibold px-6 py-3 rounded-xl hover:bg-blue-50 transition-colors"
          >
            법규 가이드 보기
          </Link>
        </div>
      </section>
    </div>
  )
}
