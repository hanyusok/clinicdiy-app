'use client'

import { useState } from 'react'
import { useRouter } from 'next/navigation'
import { createClient } from '@/utils/supabase/client'
import { ArrowLeft, Loader2, CheckCircle } from 'lucide-react'
import Link from 'next/link'

const SERVICE_TYPES = [
  { id: '간판/사인물', label: '간판/사인물', icon: '🪧', desc: '병원 간판 제작, 원내 사인물 시공' },
  { id: '전기/조명', label: '전기/조명', icon: '⚡', desc: '전기 배선, 조명 설치 및 교체' },
  { id: '배관/위생', label: '배관/위생', icon: '🔧', desc: '배관 수리, 세면대·화장실 시공' },
  { id: 'X-ray실 차폐', label: 'X-ray실 차폐', icon: '🛡️', desc: '방사선 차폐 시공 전문' },
  { id: '도배/바닥재', label: '도배/바닥재', icon: '🏠', desc: '항균 벽지, 의료용 바닥재 시공' },
  { id: '기타', label: '기타 시공', icon: '🔨', desc: '기타 병원 인테리어 시공' },
]

export default function ServicesPage() {
  const router = useRouter()
  const supabase = createClient()
  const [loading, setLoading] = useState(false)
  const [submitted, setSubmitted] = useState(false)
  const [selectedType, setSelectedType] = useState('')

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault()
    setLoading(true)

    const formData = new FormData(e.currentTarget)
    const details = formData.get('details') as string
    const contact_info = formData.get('contact_info') as string

    try {
      const { data: { user } } = await supabase.auth.getUser()
      if (!user) {
        alert('로그인이 필요합니다.')
        router.push('/login')
        return
      }

      const { error } = await supabase.from('service_requests').insert({
        user_id: user.id,
        service_type: selectedType,
        details,
        contact_info,
      })

      if (error) throw error
      setSubmitted(true)
    } catch (error: any) {
      alert(error.message || '문의 접수 중 오류가 발생했습니다.')
    } finally {
      setLoading(false)
    }
  }

  if (submitted) {
    return (
      <div className="flex-1 flex items-center justify-center px-4 py-16">
        <div className="text-center max-w-md">
          <CheckCircle className="w-16 h-16 text-emerald-500 mx-auto mb-4" />
          <h2 className="text-2xl font-bold mb-2">문의가 접수되었습니다!</h2>
          <p className="text-gray-500 mb-8">전문 파트너가 영업일 1-2일 내로 연락드립니다.</p>
          <Link href="/market" className="inline-flex bg-blue-600 text-white font-semibold px-6 py-3 rounded-xl hover:bg-blue-700 transition-colors">
            마켓으로 돌아가기
          </Link>
        </div>
      </div>
    )
  }

  return (
    <div className="flex-1 w-full max-w-3xl mx-auto px-4 py-8 sm:px-6">
      <Link href="/market" className="inline-flex items-center gap-2 text-sm text-gray-500 hover:text-gray-900 dark:hover:text-white mb-6 transition-colors">
        <ArrowLeft className="w-4 h-4" /> 마켓으로 돌아가기
      </Link>

      <div className="bg-white dark:bg-gray-950 p-6 sm:p-8 rounded-3xl shadow-sm border border-gray-100 dark:border-gray-800">
        <h1 className="text-2xl font-bold mb-2 text-gray-900 dark:text-white">전문 시공 파트너 매칭</h1>
        <p className="text-gray-500 dark:text-gray-400 text-sm mb-8">
          병원 인테리어 전문 파트너를 연결해드립니다. 내용을 입력하시면 담당자가 직접 연락드립니다.
        </p>

        {/* Service Type Selection */}
        <div className="mb-6">
          <label className="text-sm font-semibold text-gray-700 dark:text-gray-300 block mb-3">시공 분야 선택 *</label>
          <div className="grid grid-cols-2 sm:grid-cols-3 gap-3">
            {SERVICE_TYPES.map((type) => (
              <button
                key={type.id}
                type="button"
                onClick={() => setSelectedType(type.id)}
                className={`p-4 rounded-2xl border-2 text-left transition-all ${
                  selectedType === type.id
                    ? 'border-blue-500 bg-blue-50 dark:bg-blue-900/20'
                    : 'border-gray-200 dark:border-gray-800 hover:border-gray-300 dark:hover:border-gray-700'
                }`}
              >
                <div className="text-2xl mb-2">{type.icon}</div>
                <p className="font-semibold text-sm">{type.label}</p>
                <p className="text-xs text-gray-500 mt-0.5 leading-tight">{type.desc}</p>
              </button>
            ))}
          </div>
        </div>

        <form onSubmit={handleSubmit} className="space-y-5">
          <div className="space-y-2">
            <label className="text-sm font-medium text-gray-700 dark:text-gray-300">시공 요청 상세 내용 *</label>
            <textarea
              name="details"
              required
              rows={5}
              placeholder="시공 위치, 면적, 원하시는 내용, 예산 등을 자세히 적어주실수록 정확한 견적을 받으실 수 있습니다."
              className="w-full rounded-xl px-4 py-3 bg-gray-50 dark:bg-gray-900 border border-gray-200 dark:border-gray-800 focus:outline-none focus:ring-2 focus:ring-blue-500 transition-all text-sm resize-y"
            />
          </div>
          <div className="space-y-2">
            <label className="text-sm font-medium text-gray-700 dark:text-gray-300">연락처 (이메일 또는 전화번호) *</label>
            <input
              name="contact_info"
              required
              placeholder="010-0000-0000 또는 example@email.com"
              className="w-full rounded-xl px-4 py-3 bg-gray-50 dark:bg-gray-900 border border-gray-200 dark:border-gray-800 focus:outline-none focus:ring-2 focus:ring-blue-500 transition-all text-sm"
            />
          </div>
          <div className="pt-2">
            <button
              type="submit"
              disabled={loading || !selectedType}
              className="w-full py-4 px-4 rounded-2xl text-sm font-semibold text-white bg-blue-600 hover:bg-blue-700 transition-colors disabled:opacity-50 disabled:cursor-not-allowed flex items-center justify-center gap-2"
            >
              {loading && <Loader2 className="w-4 h-4 animate-spin" />}
              문의 접수하기
            </button>
          </div>
        </form>
      </div>
    </div>
  )
}
