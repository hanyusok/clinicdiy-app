'use client'

import { useState, useRef } from 'react'
import { useRouter } from 'next/navigation'
import { createClient } from '@/utils/supabase/client'
import { ArrowLeft, Image as ImageIcon, Loader2, X, CheckCircle2 } from 'lucide-react'
import Link from 'next/link'

const SPECIALTIES = ['내과', '소아과', '피부과', '정형외과', '치과', '안과', '산부인과', '이비인후과', '정신건강의학과', '기타']
const SCOPES = ['전체시공', '부분시공', '리모델링']
const BUDGET_RANGES = ['500만원 미만', '500~1,000만원', '1,000~2,000만원', '2,000~3,000만원', '3,000만원 이상', '비공개']

type UploadedImage = {
  file: File
  preview: string
  lightingInfo: string
  materialsInfo: string
}

export default function PortfolioWritePage() {
  const router = useRouter()
  const supabase = createClient()
  const [loading, setLoading] = useState(false)
  const [images, setImages] = useState<UploadedImage[]>([])
  const [expandedImageIdx, setExpandedImageIdx] = useState<number | null>(null)
  const fileInputRef = useRef<HTMLInputElement>(null)

  // ── Image Selection ──
  const handleFileSelect = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (!e.target.files) return
    const selected = Array.from(e.target.files)
    if (images.length + selected.length > 10) {
      alert('사진은 최대 10장까지 첨부할 수 있습니다.')
      return
    }
    const newImages: UploadedImage[] = selected.map(file => ({
      file,
      preview: URL.createObjectURL(file),
      lightingInfo: '',
      materialsInfo: '',
    }))
    setImages(prev => [...prev, ...newImages])
    if (fileInputRef.current) fileInputRef.current.value = ''
  }

  const removeImage = (idx: number) => {
    setImages(prev => {
      URL.revokeObjectURL(prev[idx].preview)
      return prev.filter((_, i) => i !== idx)
    })
    if (expandedImageIdx === idx) setExpandedImageIdx(null)
  }

  const updateImageMeta = (idx: number, field: 'lightingInfo' | 'materialsInfo', value: string) => {
    setImages(prev => prev.map((img, i) => i === idx ? { ...img, [field]: value } : img))
  }

  // ── Submit ──
  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault()
    if (images.length === 0) {
      alert('시공 사진을 최소 1장 이상 등록해주세요.')
      return
    }
    setLoading(true)

    const formData = new FormData(e.currentTarget)
    const title = formData.get('title') as string
    const specialty = formData.get('specialty') as string
    const sizePyeong = Number(formData.get('size_pyeong'))
    const scope = formData.get('scope') as string
    const budgetRange = formData.get('budget_range') as string
    const description = formData.get('description') as string

    try {
      const { data: { user } } = await supabase.auth.getUser()
      if (!user) {
        alert('로그인이 필요합니다.')
        router.push('/login')
        return
      }

      // 1. Create portfolio record
      const { data: portfolio, error: portfolioError } = await supabase
        .from('portfolios')
        .insert({ title, specialty, size_pyeong: sizePyeong, scope, budget_range: budgetRange, description, user_id: user.id })
        .select()
        .single()

      if (portfolioError) throw portfolioError

      // 2. Upload images and insert portfolio_images records
      for (let i = 0; i < images.length; i++) {
        const img = images[i]
        const ext = img.file.name.split('.').pop()
        const fileName = `${portfolio.id}/${i}_${Date.now()}.${ext}`

        const { error: uploadError } = await supabase.storage
          .from('post-images')
          .upload(fileName, img.file)

        if (uploadError) throw uploadError

        const { data: { publicUrl } } = supabase.storage
          .from('post-images')
          .getPublicUrl(fileName)

        await supabase.from('portfolio_images').insert({
          portfolio_id: portfolio.id,
          url: publicUrl,
          order_index: i,
          lighting_info: img.lightingInfo || null,
          materials_info: img.materialsInfo || null,
        })
      }

      router.push(`/portfolio/${portfolio.id}`)
      router.refresh()
    } catch (err: any) {
      console.error(err)
      alert(err.message || '등록 중 오류가 발생했습니다.')
    } finally {
      setLoading(false)
    }
  }

  return (
    <div className="flex-1 w-full max-w-3xl mx-auto px-4 py-8 sm:px-6">
      <Link
        href="/portfolio"
        className="inline-flex items-center gap-2 text-sm text-gray-500 hover:text-gray-900 dark:hover:text-white mb-6 transition-colors"
      >
        <ArrowLeft className="w-4 h-4" /> 포트폴리오 목록
      </Link>

      <div className="bg-white dark:bg-gray-950 p-6 sm:p-8 rounded-3xl shadow-sm border border-gray-100 dark:border-gray-800">
        <h1 className="text-2xl font-bold mb-1 text-gray-900 dark:text-white">포트폴리오 등록</h1>
        <p className="text-sm text-gray-500 dark:text-gray-400 mb-8">시공 사진과 상세 정보를 입력해 다른 원장님들과 경험을 나눠보세요.</p>

        <form onSubmit={handleSubmit} className="space-y-6">
          {/* ── Basic Info ── */}
          <div className="space-y-2">
            <label className="text-sm font-semibold text-gray-700 dark:text-gray-300">포트폴리오 제목 *</label>
            <input
              name="title"
              required
              placeholder="예: 소아과 30평 전체 리모델링 후기"
              className="w-full rounded-xl px-4 py-3 bg-gray-50 dark:bg-gray-900 border border-gray-200 dark:border-gray-800 focus:outline-none focus:ring-2 focus:ring-blue-500 text-sm transition-all"
            />
          </div>

          <div className="grid grid-cols-2 gap-4">
            <div className="space-y-2">
              <label className="text-sm font-semibold text-gray-700 dark:text-gray-300">진료과목 *</label>
              <select
                name="specialty"
                required
                className="w-full rounded-xl px-4 py-3 bg-gray-50 dark:bg-gray-900 border border-gray-200 dark:border-gray-800 focus:outline-none focus:ring-2 focus:ring-blue-500 text-sm appearance-none"
              >
                <option value="">선택</option>
                {SPECIALTIES.map(s => <option key={s} value={s}>{s}</option>)}
              </select>
            </div>
            <div className="space-y-2">
              <label className="text-sm font-semibold text-gray-700 dark:text-gray-300">병원 면적 (평) *</label>
              <input
                name="size_pyeong"
                type="number"
                min={1}
                required
                placeholder="예: 35"
                className="w-full rounded-xl px-4 py-3 bg-gray-50 dark:bg-gray-900 border border-gray-200 dark:border-gray-800 focus:outline-none focus:ring-2 focus:ring-blue-500 text-sm"
              />
            </div>
          </div>

          <div className="grid grid-cols-2 gap-4">
            <div className="space-y-2">
              <label className="text-sm font-semibold text-gray-700 dark:text-gray-300">시공 범위 *</label>
              <select
                name="scope"
                required
                className="w-full rounded-xl px-4 py-3 bg-gray-50 dark:bg-gray-900 border border-gray-200 dark:border-gray-800 focus:outline-none focus:ring-2 focus:ring-blue-500 text-sm appearance-none"
              >
                <option value="">선택</option>
                {SCOPES.map(s => <option key={s} value={s}>{s}</option>)}
              </select>
            </div>
            <div className="space-y-2">
              <label className="text-sm font-semibold text-gray-700 dark:text-gray-300">예산 범위</label>
              <select
                name="budget_range"
                className="w-full rounded-xl px-4 py-3 bg-gray-50 dark:bg-gray-900 border border-gray-200 dark:border-gray-800 focus:outline-none focus:ring-2 focus:ring-blue-500 text-sm appearance-none"
              >
                <option value="">선택 안함</option>
                {BUDGET_RANGES.map(b => <option key={b} value={b}>{b}</option>)}
              </select>
            </div>
          </div>

          {/* ── Images ── */}
          <div className="space-y-3">
            <div className="flex items-center justify-between">
              <label className="text-sm font-semibold text-gray-700 dark:text-gray-300">시공 사진 * <span className="font-normal text-gray-400">({images.length}/10)</span></label>
              <input
                type="file"
                multiple
                accept="image/*"
                className="hidden"
                ref={fileInputRef}
                onChange={handleFileSelect}
              />
              <button
                type="button"
                onClick={() => fileInputRef.current?.click()}
                className="inline-flex items-center gap-1.5 text-sm text-blue-600 hover:text-blue-700 dark:text-blue-400 font-medium"
              >
                <ImageIcon className="w-4 h-4" /> 사진 추가
              </button>
            </div>

            {images.length === 0 ? (
              <button
                type="button"
                onClick={() => fileInputRef.current?.click()}
                className="w-full border-2 border-dashed border-gray-200 dark:border-gray-800 rounded-2xl py-10 flex flex-col items-center gap-2 text-gray-400 hover:border-blue-400 hover:text-blue-500 transition-colors"
              >
                <ImageIcon className="w-8 h-8" />
                <span className="text-sm font-medium">클릭하여 사진 업로드</span>
                <span className="text-xs">JPG, PNG, WEBP · 최대 10장</span>
              </button>
            ) : (
              <div className="grid grid-cols-3 sm:grid-cols-4 gap-3">
                {images.map((img, idx) => (
                  <div key={idx} className="relative group">
                    <div
                      className={`aspect-square rounded-xl overflow-hidden border-2 cursor-pointer transition-all ${
                        expandedImageIdx === idx
                          ? 'border-blue-500 ring-2 ring-blue-300/50'
                          : 'border-transparent hover:border-gray-300'
                      }`}
                      onClick={() => setExpandedImageIdx(expandedImageIdx === idx ? null : idx)}
                    >
                      <img
                        src={img.preview}
                        alt={`사진 ${idx + 1}`}
                        className="w-full h-full object-cover"
                      />
                      {idx === 0 && (
                        <div className="absolute top-1 left-1 bg-blue-600 text-white text-xs px-1.5 py-0.5 rounded-md font-medium">
                          대표
                        </div>
                      )}
                    </div>
                    <button
                      type="button"
                      onClick={() => removeImage(idx)}
                      className="absolute -top-1.5 -right-1.5 bg-red-500 text-white rounded-full p-0.5 opacity-0 group-hover:opacity-100 transition-opacity shadow"
                    >
                      <X className="w-3.5 h-3.5" />
                    </button>
                  </div>
                ))}
                <button
                  type="button"
                  onClick={() => fileInputRef.current?.click()}
                  className="aspect-square rounded-xl border-2 border-dashed border-gray-200 dark:border-gray-800 flex items-center justify-center text-gray-400 hover:border-blue-400 hover:text-blue-500 transition-colors"
                >
                  <ImageIcon className="w-5 h-5" />
                </button>
              </div>
            )}

            {/* Per-image metadata accordion */}
            {expandedImageIdx !== null && images[expandedImageIdx] && (
              <div className="bg-gray-50 dark:bg-gray-900 border border-gray-200 dark:border-gray-800 rounded-2xl p-4 space-y-3">
                <p className="text-xs font-semibold text-gray-700 dark:text-gray-300">
                  📸 사진 {expandedImageIdx + 1} 추가 정보 (선택)
                </p>
                <div className="space-y-1.5">
                  <label className="text-xs text-gray-500">조명 조도 / 정보</label>
                  <input
                    value={images[expandedImageIdx].lightingInfo}
                    onChange={e => updateImageMeta(expandedImageIdx, 'lightingInfo', e.target.value)}
                    placeholder="예: CCT 3000K 간접조명, 진료실 500lux"
                    className="w-full rounded-lg px-3 py-2 bg-white dark:bg-gray-800 border border-gray-200 dark:border-gray-700 text-sm focus:outline-none focus:ring-2 focus:ring-blue-500"
                  />
                </div>
                <div className="space-y-1.5">
                  <label className="text-xs text-gray-500">마감재 / 항균 정보</label>
                  <input
                    value={images[expandedImageIdx].materialsInfo}
                    onChange={e => updateImageMeta(expandedImageIdx, 'materialsInfo', e.target.value)}
                    placeholder="예: LG Z:IN 항균 바닥재, 유한킴벌리 항균 벽지"
                    className="w-full rounded-lg px-3 py-2 bg-white dark:bg-gray-800 border border-gray-200 dark:border-gray-700 text-sm focus:outline-none focus:ring-2 focus:ring-blue-500"
                  />
                </div>
              </div>
            )}
          </div>

          {/* ── Description ── */}
          <div className="space-y-2">
            <label className="text-sm font-semibold text-gray-700 dark:text-gray-300">시공 후기 / 설명</label>
            <textarea
              name="description"
              rows={6}
              placeholder="시공 전 고민했던 점, 업체 선정 과정, 비용 절감 팁, 결과 만족도 등 자세히 적어주시면 다른 원장님들께 큰 도움이 됩니다."
              className="w-full rounded-xl px-4 py-3 bg-gray-50 dark:bg-gray-900 border border-gray-200 dark:border-gray-800 focus:outline-none focus:ring-2 focus:ring-blue-500 text-sm resize-y transition-all"
            />
          </div>

          {/* ── Checklist hint ── */}
          <div className="flex items-start gap-3 p-4 bg-blue-50 dark:bg-blue-900/20 border border-blue-100 dark:border-blue-800/50 rounded-2xl text-sm text-blue-700 dark:text-blue-300">
            <CheckCircle2 className="w-5 h-5 shrink-0 mt-0.5" />
            <div>
              <p className="font-semibold mb-0.5">시공 전 법규 확인하셨나요?</p>
              <p className="text-xs text-blue-600 dark:text-blue-400">
                <Link href="/tools/checklist" className="underline hover:no-underline">법적 시설 기준 체크리스트</Link>를 통해 소방법, 장애인 편의시설, 의료법 기준을 확인해보세요.
              </p>
            </div>
          </div>

          {/* ── Buttons ── */}
          <div className="flex gap-3 pt-2">
            <button
              type="button"
              onClick={() => router.back()}
              className="flex-1 py-3 px-4 rounded-xl text-sm font-medium text-gray-700 bg-gray-100 hover:bg-gray-200 dark:text-gray-300 dark:bg-gray-800 dark:hover:bg-gray-700 transition-colors"
            >
              취소
            </button>
            <button
              type="submit"
              disabled={loading}
              className="flex-1 py-3 px-4 rounded-xl text-sm font-semibold text-white bg-blue-600 hover:bg-blue-700 transition-colors disabled:opacity-50 disabled:cursor-not-allowed flex items-center justify-center gap-2"
            >
              {loading ? (
                <><Loader2 className="w-4 h-4 animate-spin" /> 등록 중...</>
              ) : (
                '포트폴리오 등록하기'
              )}
            </button>
          </div>
        </form>
      </div>
    </div>
  )
}
