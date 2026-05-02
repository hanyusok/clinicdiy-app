import { createClient } from '@/utils/supabase/server'
import Link from 'next/link'
import { notFound } from 'next/navigation'
import { ArrowLeft, ShoppingBag, PhoneCall } from 'lucide-react'

export default async function ProductDetailPage({ params }: { params: Promise<{ id: string }> }) {
  const { id } = await params
  const supabase = await createClient()

  const { data: product } = await supabase
    .from('products')
    .select('*')
    .eq('id', id)
    .single()

  if (!product) notFound()

  return (
    <div className="flex-1 w-full max-w-4xl mx-auto px-4 py-8 sm:px-6">
      <Link href="/market" className="inline-flex items-center gap-2 text-sm text-gray-500 hover:text-gray-900 dark:hover:text-white mb-6 transition-colors">
        <ArrowLeft className="w-4 h-4" /> 마켓으로 돌아가기
      </Link>

      <div className="bg-white dark:bg-gray-900 rounded-3xl border border-gray-100 dark:border-gray-800 overflow-hidden shadow-sm">
        <div className="md:flex">
          {/* Image */}
          <div className="md:w-1/2 aspect-square bg-gray-100 dark:bg-gray-800">
            {product.image_url ? (
              <img src={product.image_url} alt={product.name} className="w-full h-full object-cover" />
            ) : (
              <div className="w-full h-full flex items-center justify-center text-gray-300">
                <ShoppingBag className="w-16 h-16" />
              </div>
            )}
          </div>

          {/* Info */}
          <div className="md:w-1/2 p-6 md:p-8 flex flex-col">
            <span className="text-xs bg-blue-50 dark:bg-blue-900/20 text-blue-600 dark:text-blue-400 px-3 py-1 rounded-full font-medium w-fit mb-3">
              {product.category}
            </span>
            <h1 className="text-2xl font-extrabold text-gray-900 dark:text-white mb-2">{product.name}</h1>
            {product.vendor_name && (
              <p className="text-sm text-gray-500 mb-4">공급사: {product.vendor_name}</p>
            )}
            <p className="text-gray-600 dark:text-gray-400 text-sm leading-relaxed flex-1 mb-6">
              {product.description || '제품 상세 정보는 문의를 통해 확인하실 수 있습니다.'}
            </p>
            <div className="border-t border-gray-100 dark:border-gray-800 pt-6">
              <div className="text-3xl font-black text-gray-900 dark:text-white mb-6">
                {product.price ? `${product.price.toLocaleString()}원~` : '가격 문의'}
              </div>
              <Link
                href={`/market/services?product=${product.id}`}
                className="flex items-center justify-center gap-2 w-full bg-blue-600 hover:bg-blue-700 text-white font-semibold py-4 rounded-2xl transition-colors"
              >
                <PhoneCall className="w-5 h-5" />
                구매/견적 문의하기
              </Link>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}
