import { createClient } from '@/utils/supabase/server'
import Link from 'next/link'
import { notFound } from 'next/navigation'
import { ArrowLeft, FileText, Lightbulb, Shield } from 'lucide-react'

export default async function PortfolioDetailPage({ params }: { params: Promise<{ id: string }> }) {
  const { id } = await params
  const supabase = await createClient()

  const { data: portfolio } = await supabase
    .from('portfolios')
    .select('*, profiles(username, avatar_url), portfolio_images(*, image_tags(*, products(*)))')
    .eq('id', id)
    .single()

  if (!portfolio) notFound()

  const images = (portfolio.portfolio_images || []).sort((a: any, b: any) => a.order_index - b.order_index)

  return (
    <div className="flex-1 w-full max-w-4xl mx-auto px-4 py-8 sm:px-6">
      <Link href="/portfolio" className="inline-flex items-center gap-2 text-sm text-gray-500 hover:text-gray-900 dark:hover:text-white mb-6 transition-colors">
        <ArrowLeft className="w-4 h-4" /> 포트폴리오 목록
      </Link>

      <div className="bg-white dark:bg-gray-900 rounded-3xl border border-gray-100 dark:border-gray-800 overflow-hidden shadow-sm">
        {/* Header */}
        <div className="p-6 md:p-8 border-b border-gray-100 dark:border-gray-800">
          <div className="flex flex-wrap gap-2 mb-4">
            <span className="text-xs bg-blue-50 dark:bg-blue-900/20 text-blue-600 dark:text-blue-400 px-3 py-1 rounded-full font-medium">{portfolio.specialty}</span>
            <span className="text-xs bg-gray-100 dark:bg-gray-800 text-gray-600 dark:text-gray-400 px-3 py-1 rounded-full font-medium">{portfolio.size_pyeong}평</span>
            <span className="text-xs bg-gray-100 dark:bg-gray-800 text-gray-600 dark:text-gray-400 px-3 py-1 rounded-full font-medium">{portfolio.scope}</span>
            {portfolio.budget_range && (
              <span className="text-xs bg-emerald-50 dark:bg-emerald-900/20 text-emerald-600 dark:text-emerald-400 px-3 py-1 rounded-full font-medium">{portfolio.budget_range}</span>
            )}
          </div>
          <h1 className="text-2xl md:text-3xl font-extrabold text-gray-900 dark:text-white mb-3">{portfolio.title}</h1>
          <p className="text-sm text-gray-500">by {portfolio.profiles?.username || '익명'}</p>
        </div>

        {/* Image Gallery */}
        {images.length > 0 && (
          <div className="p-6 md:p-8 border-b border-gray-100 dark:border-gray-800">
            <h2 className="text-lg font-bold mb-4">시공 사진</h2>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              {images.map((img: any) => (
                <div key={img.id} className="relative rounded-2xl overflow-hidden bg-gray-100 dark:bg-gray-800">
                  <img src={img.url} alt="시공 사진" className="w-full aspect-[4/3] object-cover" />
                  {/* Shopping tags */}
                  {img.image_tags?.map((tag: any) => (
                    <Link
                      key={tag.id}
                      href={`/market/products/${tag.product_id}`}
                      style={{ left: `${tag.x_coordinate}%`, top: `${tag.y_coordinate}%` }}
                      className="absolute -translate-x-1/2 -translate-y-1/2 w-6 h-6 bg-white rounded-full shadow-lg border-2 border-blue-500 hover:scale-125 transition-transform cursor-pointer group"
                      title={tag.products?.name}
                    >
                      <span className="absolute left-7 top-1/2 -translate-y-1/2 bg-black/80 text-white text-xs px-2 py-1 rounded-lg whitespace-nowrap opacity-0 group-hover:opacity-100 transition-opacity pointer-events-none">
                        {tag.products?.name}
                      </span>
                    </Link>
                  ))}
                </div>
              ))}
            </div>
          </div>
        )}

        {/* Technical Metadata */}
        {images.some((img: any) => img.cad_pdf_url || img.lighting_info || img.materials_info) && (
          <div className="p-6 md:p-8 border-b border-gray-100 dark:border-gray-800">
            <h2 className="text-lg font-bold mb-4">기술 정보</h2>
            <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
              {images[0]?.cad_pdf_url && (
                <a href={images[0].cad_pdf_url} target="_blank" rel="noopener noreferrer"
                  className="flex items-center gap-3 p-4 bg-gray-50 dark:bg-gray-800 rounded-2xl hover:bg-blue-50 dark:hover:bg-blue-900/20 transition-colors">
                  <FileText className="w-5 h-5 text-blue-600 shrink-0" />
                  <div>
                    <p className="text-sm font-semibold">의료 동선 도면</p>
                    <p className="text-xs text-gray-500">CAD/PDF 다운로드</p>
                  </div>
                </a>
              )}
              {images[0]?.lighting_info && (
                <div className="flex items-center gap-3 p-4 bg-gray-50 dark:bg-gray-800 rounded-2xl">
                  <Lightbulb className="w-5 h-5 text-yellow-500 shrink-0" />
                  <div>
                    <p className="text-sm font-semibold">조명 정보</p>
                    <p className="text-xs text-gray-500">{images[0].lighting_info}</p>
                  </div>
                </div>
              )}
              {images[0]?.materials_info && (
                <div className="flex items-center gap-3 p-4 bg-gray-50 dark:bg-gray-800 rounded-2xl">
                  <Shield className="w-5 h-5 text-emerald-500 shrink-0" />
                  <div>
                    <p className="text-sm font-semibold">마감재 정보</p>
                    <p className="text-xs text-gray-500">{images[0].materials_info}</p>
                  </div>
                </div>
              )}
            </div>
          </div>
        )}

        {/* Description */}
        {portfolio.description && (
          <div className="p-6 md:p-8">
            <h2 className="text-lg font-bold mb-4">시공 후기</h2>
            <div className="prose dark:prose-invert max-w-none text-sm text-gray-700 dark:text-gray-300 whitespace-pre-wrap leading-relaxed">
              {portfolio.description}
            </div>
          </div>
        )}
      </div>
    </div>
  )
}
