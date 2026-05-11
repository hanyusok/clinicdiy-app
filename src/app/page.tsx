import { createClient } from '@/utils/supabase/server'
import Link from 'next/link'
import { Images, MessageSquare, ShoppingBag, TrendingUp, Hammer, ClipboardCheck, Grid, Trash2, UserCircle } from 'lucide-react'

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
    <div className="flex flex-col min-h-full pb-20 bg-white dark:bg-gray-950">
      <main className="max-w-7xl mx-auto w-full px-4 sm:px-6 lg:px-8 pt-6">
        
        {/* Banner Section */}
        <section className="flex flex-col lg:flex-row gap-4 mb-10">
          {/* Main Banner (Left) */}
          <div className="relative flex-1 rounded-xl overflow-hidden aspect-[16/9] lg:aspect-[2/1] bg-gray-100 group cursor-pointer">
            <img src="https://images.unsplash.com/photo-1519494026892-80bbd2d6fd0d?q=80&w=2053&auto=format&fit=crop" alt="Main Banner" className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-105" />
            <div className="absolute inset-0 bg-black/20 group-hover:bg-black/30 transition-colors"></div>
            <div className="absolute bottom-0 left-0 p-8 w-full bg-gradient-to-t from-black/80 to-transparent text-white">
              <h2 className="text-2xl md:text-3xl font-bold mb-2">실제 의사가 직접 인테리어한 40평 치과</h2>
              <p className="text-gray-200 text-sm md:text-base">#치과 #40평 #모던 #우드톤 #직접시공</p>
            </div>
          </div>
          
          {/* Side Promo Banner (Right) */}
          <div className="hidden lg:flex flex-col w-[300px] xl:w-[350px] shrink-0 rounded-xl overflow-hidden bg-[#e8f3ee] p-6 relative cursor-pointer group">
            <div className="absolute top-4 left-4 bg-red-500 text-white text-xs font-bold px-2 py-1 rounded">EVENT</div>
            <div className="mt-8 z-10 relative">
              <h3 className="text-2xl font-extrabold text-emerald-900 leading-tight mb-2">
                첫 포트폴리오<br/>등록하고<br/>포인트 받기
              </h3>
              <p className="text-emerald-700 font-medium">작성만 해도 100% 당첨!</p>
            </div>
            {/* Using a placeholder for plant/gift image */}
            <img src="https://images.unsplash.com/photo-1459411552884-841db9b3cc2a?q=80&w=1000&auto=format&fit=crop" className="absolute bottom-0 right-0 w-3/4 h-3/4 object-cover rounded-tl-full opacity-60 group-hover:opacity-80 transition-opacity" alt="Promo" />
          </div>
        </section>

        {/* Quick Menu */}
        <section className="mb-14">
          <div className="flex flex-wrap md:flex-nowrap items-start justify-start md:justify-between gap-4 md:gap-2 overflow-x-auto no-scrollbar pb-4 md:pb-0">
            {[
              { name: '쇼핑하기', icon: ShoppingBag, color: 'text-purple-500', bg: 'bg-purple-100 dark:bg-purple-900/30', href: '/market' },
              { name: '포트폴리오', icon: Images, color: 'text-blue-500', bg: 'bg-blue-100 dark:bg-blue-900/30', href: '/portfolio' },
              { name: '커뮤니티', icon: MessageSquare, color: 'text-green-500', bg: 'bg-green-100 dark:bg-green-900/30', href: '/community' },
              { name: '개원도구', icon: Hammer, color: 'text-orange-500', bg: 'bg-orange-100 dark:bg-orange-900/30', href: '/tools' },
              { name: '법규가이드', icon: ClipboardCheck, color: 'text-teal-500', bg: 'bg-teal-100 dark:bg-teal-900/30', href: '/community?category=legal' },
              { name: '전문가찾기', icon: UserCircle, color: 'text-indigo-500', bg: 'bg-indigo-100 dark:bg-indigo-900/30', href: '/experts' },
              { name: '공간별팁', icon: Grid, color: 'text-pink-500', bg: 'bg-pink-100 dark:bg-pink-900/30', href: '/space' },
              { name: '인기노하우', icon: TrendingUp, color: 'text-red-500', bg: 'bg-red-100 dark:bg-red-900/30', href: '/popular' },
              { name: '폐업정리', icon: Trash2, color: 'text-gray-500', bg: 'bg-gray-100 dark:bg-gray-800', href: '/closing' },
            ].map((item, idx) => (
              <Link key={idx} href={item.href} className="flex flex-col items-center gap-2 group w-[72px] md:w-auto shrink-0">
                <div className={`w-14 h-14 md:w-16 md:h-16 rounded-[20px] md:rounded-[24px] flex items-center justify-center transition-transform group-hover:-translate-y-1 ${item.bg}`}>
                  <item.icon className={`w-7 h-7 md:w-8 md:h-8 ${item.color}`} />
                </div>
                <span className="text-xs md:text-sm font-medium text-gray-800 dark:text-gray-200">{item.name}</span>
              </Link>
            ))}
          </div>
        </section>

        {/* Latest Portfolios */}
        <section className="mb-14">
          <div className="flex items-center justify-between mb-6">
            <h2 className="text-xl md:text-2xl font-bold text-gray-900 dark:text-white">이런 포트폴리오는 어때요?</h2>
            <Link href="/portfolio" className="text-gray-500 hover:text-blue-500 text-sm font-medium transition-colors">
              더보기
            </Link>
          </div>

          {portfolios && portfolios.length > 0 ? (
            <div className="grid grid-cols-2 lg:grid-cols-4 gap-4 lg:gap-6">
              {portfolios.map((p: any) => {
                const cover = p.portfolio_images?.find((img: any) => img.order_index === 0) || p.portfolio_images?.[0]
                return (
                  <Link key={p.id} href={`/portfolio/${p.id}`} className="group cursor-pointer">
                    <div className="aspect-[4/3] rounded-xl overflow-hidden bg-gray-100 dark:bg-gray-800 mb-3 relative">
                      {cover ? (
                        <img src={cover.url} alt={p.title} className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-105" />
                      ) : (
                        <div className="w-full h-full flex items-center justify-center text-gray-400">
                          <Images className="w-8 h-8" />
                        </div>
                      )}
                    </div>
                    <div>
                      <p className="text-[15px] font-semibold text-gray-900 dark:text-gray-100 leading-snug line-clamp-2 group-hover:text-blue-500 transition-colors">
                        {p.title}
                      </p>
                      <p className="text-[13px] text-gray-500 mt-1">
                        {p.specialty} · {p.size_pyeong}평
                      </p>
                    </div>
                  </Link>
                )
              })}
            </div>
          ) : (
            <div className="bg-gray-50 dark:bg-gray-900 rounded-xl p-12 text-center text-gray-500">
              <p>아직 등록된 포트폴리오가 없습니다.</p>
              <Link href="/portfolio/write" className="mt-4 inline-block px-4 py-2 bg-blue-50 text-blue-600 rounded-lg text-sm font-medium">포트폴리오 등록하기</Link>
            </div>
          )}
        </section>

        {/* Trending Posts */}
        <section className="mb-14">
          <div className="flex items-center justify-between mb-6">
            <h2 className="text-xl md:text-2xl font-bold text-gray-900 dark:text-white">원장님들의 인기 노하우</h2>
            <Link href="/community" className="text-gray-500 hover:text-blue-500 text-sm font-medium transition-colors">
              더보기
            </Link>
          </div>

          {posts && posts.length > 0 ? (
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              {posts.map((post: any, idx: number) => (
                <Link
                  key={post.id}
                  href={`/community/${post.id}`}
                  className="flex items-center gap-4 p-4 rounded-xl border border-transparent hover:border-gray-200 dark:hover:border-gray-800 hover:bg-gray-50 dark:hover:bg-gray-900 transition-colors group"
                >
                  <span className={`text-xl font-bold w-6 text-center shrink-0 ${idx === 0 ? 'text-blue-500' : idx === 1 ? 'text-blue-400' : 'text-gray-400'}`}>
                    {idx + 1}
                  </span>
                  <div className="flex-1 min-w-0">
                    <p className="text-base font-semibold text-gray-900 dark:text-gray-100 truncate group-hover:text-blue-500 transition-colors">
                      {post.title}
                    </p>
                    <p className="text-[13px] text-gray-500 mt-1 truncate">
                      {post.profiles?.username || '익명'} · 좋아요 {post.likes_count}
                    </p>
                  </div>
                </Link>
              ))}
            </div>
          ) : (
            <div className="bg-gray-50 dark:bg-gray-900 rounded-xl p-12 text-center text-gray-500">
              <p>아직 등록된 게시글이 없습니다.</p>
            </div>
          )}
        </section>

      </main>
    </div>
  )
}
