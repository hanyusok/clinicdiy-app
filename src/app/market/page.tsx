import { createClient } from '@/utils/supabase/server'
import Link from 'next/link'
import { ShoppingBag, Wrench, ArrowRight, PhoneCall } from 'lucide-react'

const PRODUCT_CATEGORIES = [
  { id: '병원용 특화 가구', label: '병원용 특화 가구', emoji: '🪑', desc: '대기실 소파, 조절형 데스크, 진료용 의자' },
  { id: '친환경/항균 인테리어 자재', label: '친환경/항균 자재', emoji: '🏗️', desc: '항균 벽지, 바닥재, 실링 마감재' },
  { id: '조명 및 인테리어 소품', label: '조명 & 소품', emoji: '💡', desc: 'CCT 조절 가능 의료용 조명, 인테리어 소품' },
  { id: 'DIY 시공 키트', label: 'DIY 시공 키트', emoji: '🛠️', desc: '사인물 패키지, 셀프 도색 키트' },
]

export default async function MarketPage(props: {
  searchParams: Promise<{ category?: string }>
}) {
  const searchParams = await props.searchParams
  const category = searchParams.category || ''
  const supabase = await createClient()

  let query = supabase.from('products').select('*').order('created_at', { ascending: false })
  if (category) query = query.eq('category', category)

  const { data: products } = await query

  return (
    <div className="flex-1 w-full max-w-5xl mx-auto px-4 py-8 sm:px-6 lg:px-8">
      {/* Header */}
      <div className="mb-8">
        <h1 className="text-3xl font-bold text-gray-900 dark:text-white">클리닉 마켓</h1>
        <p className="text-gray-500 dark:text-gray-400 mt-2">병원 전용 가구, 자재, DIY 키트와 전문 시공 파트너를 찾아보세요.</p>
      </div>

      {/* Service Matching Banner */}
      <div className="mb-8 bg-gradient-to-r from-indigo-600 to-purple-600 rounded-3xl p-6 text-white flex flex-col sm:flex-row items-center justify-between gap-4">
        <div className="flex items-center gap-4">
          <div className="w-12 h-12 bg-white/20 rounded-2xl flex items-center justify-center shrink-0">
            <Wrench className="w-6 h-6" />
          </div>
          <div>
            <h3 className="font-bold text-lg">전문 시공 파트너 매칭</h3>
            <p className="text-indigo-100 text-sm">간판, 전기, 배관 전문 파트너를 연결해드립니다.</p>
          </div>
        </div>
        <Link
          href="/market/services"
          className="shrink-0 inline-flex items-center gap-2 bg-white text-indigo-700 font-semibold px-5 py-2.5 rounded-xl hover:bg-indigo-50 transition-colors"
        >
          <PhoneCall className="w-4 h-4" />
          시공 문의하기
        </Link>
      </div>

      {/* Category Filters */}
      <div className="flex flex-wrap gap-3 mb-8">
        <Link
          href="/market"
          className={`px-4 py-2 rounded-full text-sm font-medium transition-colors ${!category ? 'bg-gray-900 text-white dark:bg-white dark:text-gray-900' : 'bg-white dark:bg-gray-900 border border-gray-200 dark:border-gray-800 text-gray-600 dark:text-gray-400 hover:bg-gray-50 dark:hover:bg-gray-800'}`}
        >
          전체 상품
        </Link>
        {PRODUCT_CATEGORIES.map((cat) => (
          <Link
            key={cat.id}
            href={`/market?category=${encodeURIComponent(cat.id)}`}
            className={`px-4 py-2 rounded-full text-sm font-medium transition-colors ${category === cat.id ? 'bg-gray-900 text-white dark:bg-white dark:text-gray-900' : 'bg-white dark:bg-gray-900 border border-gray-200 dark:border-gray-800 text-gray-600 dark:text-gray-400 hover:bg-gray-50 dark:hover:bg-gray-800'}`}
          >
            {cat.emoji} {cat.label}
          </Link>
        ))}
      </div>

      {/* Category Cards (no filter selected) */}
      {!category && (
        <div className="grid grid-cols-2 md:grid-cols-4 gap-4 mb-10">
          {PRODUCT_CATEGORIES.map((cat) => (
            <Link
              key={cat.id}
              href={`/market?category=${encodeURIComponent(cat.id)}`}
              className="group p-5 bg-white dark:bg-gray-900 border border-gray-100 dark:border-gray-800 rounded-2xl hover:shadow-lg hover:-translate-y-1 transition-all"
            >
              <div className="text-3xl mb-3">{cat.emoji}</div>
              <h3 className="font-bold text-sm mb-1">{cat.label}</h3>
              <p className="text-xs text-gray-500 dark:text-gray-400 leading-relaxed">{cat.desc}</p>
              <span className="mt-3 inline-flex items-center gap-1 text-xs font-medium text-blue-600 dark:text-blue-400">
                보기 <ArrowRight className="w-3 h-3" />
              </span>
            </Link>
          ))}
        </div>
      )}

      {/* Products Grid */}
      {products && products.length > 0 ? (
        <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4">
          {products.map((product: any) => (
            <Link
              key={product.id}
              href={`/market/products/${product.id}`}
              className="group bg-white dark:bg-gray-900 border border-gray-100 dark:border-gray-800 rounded-2xl overflow-hidden hover:shadow-xl hover:-translate-y-1 transition-all"
            >
              <div className="aspect-square bg-gray-100 dark:bg-gray-800 overflow-hidden">
                {product.image_url ? (
                  <img src={product.image_url} alt={product.name} className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-300" />
                ) : (
                  <div className="w-full h-full flex items-center justify-center text-gray-300">
                    <ShoppingBag className="w-8 h-8" />
                  </div>
                )}
              </div>
              <div className="p-3">
                <p className="text-xs text-gray-500 mb-1">{product.vendor_name}</p>
                <p className="font-semibold text-sm line-clamp-2 mb-2">{product.name}</p>
                {product.price ? (
                  <p className="font-bold text-blue-600 dark:text-blue-400">
                    {product.price.toLocaleString()}원~
                  </p>
                ) : (
                  <p className="text-sm text-gray-500">가격 문의</p>
                )}
              </div>
            </Link>
          ))}
        </div>
      ) : (
        <div className="text-center py-16 bg-white dark:bg-gray-900 border border-gray-100 dark:border-gray-800 rounded-3xl">
          <ShoppingBag className="w-12 h-12 mx-auto text-gray-300 mb-4" />
          <p className="text-gray-500">준비 중입니다. 곧 다양한 병원 전용 상품이 등록됩니다.</p>
        </div>
      )}
    </div>
  )
}
