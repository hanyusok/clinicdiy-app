'use client'

import { useState } from 'react'
import { useRouter } from 'next/navigation'
import { createClient } from '@/utils/supabase/client'
import { ArrowLeft, Image as ImageIcon, Loader2 } from 'lucide-react'

export default function WritePage() {
  const router = useRouter()
  const supabase = createClient()
  const [loading, setLoading] = useState(false)

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault()
    setLoading(true)

    const formData = new FormData(e.currentTarget)
    const title = formData.get('title') as string
    const content = formData.get('content') as string
    const category = formData.get('category') as string

    try {
      const { data: { user } } = await supabase.auth.getUser()
      if (!user) {
        alert('로그인이 필요합니다.')
        router.push('/login')
        return
      }

      const { data, error } = await supabase
        .from('posts')
        .insert({
          title,
          content,
          category,
          user_id: user.id
        })
        .select()
        .single()

      if (error) throw error

      router.push(`/community/${data.id}`)
      router.refresh()
    } catch (error) {
      console.error(error)
      alert('게시글 등록 중 오류가 발생했습니다.')
    } finally {
      setLoading(false)
    }
  }

  return (
    <div className="flex-1 w-full max-w-3xl mx-auto px-4 py-8 sm:px-6">
      <button 
        onClick={() => router.back()} 
        className="flex items-center gap-2 text-sm text-gray-500 hover:text-gray-900 dark:hover:text-white mb-6 transition-colors"
      >
        <ArrowLeft className="w-4 h-4" /> 뒤로가기
      </button>

      <div className="bg-white dark:bg-gray-950 p-6 sm:p-8 rounded-3xl shadow-sm border border-gray-100 dark:border-gray-800">
        <h1 className="text-2xl font-bold mb-8 text-gray-900 dark:text-white">글쓰기</h1>
        
        <form onSubmit={handleSubmit} className="space-y-6">
          <div className="space-y-2">
            <label className="text-sm font-medium text-gray-700 dark:text-gray-300">카테고리</label>
            <select 
              name="category" 
              required
              className="w-full rounded-xl px-4 py-3 bg-gray-50 dark:bg-gray-900 border border-gray-200 dark:border-gray-800 focus:outline-none focus:ring-2 focus:ring-blue-500 transition-all text-sm appearance-none"
            >
              <option value="knowhow">노하우/팁</option>
              <option value="tools">도구/제품</option>
              <option value="templates">템플릿</option>
              <option value="qna">질문</option>
            </select>
          </div>

          <div className="space-y-2">
            <label className="text-sm font-medium text-gray-700 dark:text-gray-300">제목</label>
            <input 
              name="title" 
              required
              placeholder="게시글 제목을 입력해주세요"
              className="w-full rounded-xl px-4 py-3 bg-gray-50 dark:bg-gray-900 border border-gray-200 dark:border-gray-800 focus:outline-none focus:ring-2 focus:ring-blue-500 transition-all text-sm"
            />
          </div>

          <div className="space-y-2">
            <label className="text-sm font-medium text-gray-700 dark:text-gray-300">내용</label>
            <textarea 
              name="content" 
              required
              rows={12}
              placeholder="상세한 노하우나 팁, 궁금한 점을 작성해주세요."
              className="w-full rounded-xl px-4 py-3 bg-gray-50 dark:bg-gray-900 border border-gray-200 dark:border-gray-800 focus:outline-none focus:ring-2 focus:ring-blue-500 transition-all text-sm resize-y"
            />
          </div>

          {/* Image Upload Placeholder */}
          <div className="flex items-center gap-4">
            <button type="button" className="inline-flex items-center gap-2 text-sm text-gray-600 hover:text-blue-600 dark:text-gray-400 dark:hover:text-blue-400 transition-colors p-2 rounded-lg hover:bg-blue-50 dark:hover:bg-blue-900/20">
              <ImageIcon className="w-5 h-5" />
              사진 첨부
            </button>
            <span className="text-xs text-gray-400">최대 5장 (기능 준비중)</span>
          </div>

          <div className="pt-4 flex gap-4">
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
              className="flex-1 py-3 px-4 rounded-xl text-sm font-medium text-white bg-blue-600 hover:bg-blue-700 transition-colors disabled:opacity-50 disabled:cursor-not-allowed flex items-center justify-center gap-2"
            >
              {loading && <Loader2 className="w-4 h-4 animate-spin" />}
              등록하기
            </button>
          </div>
        </form>
      </div>
    </div>
  )
}
