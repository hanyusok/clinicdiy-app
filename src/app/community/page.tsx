import Link from 'next/link'
import { createClient } from '@/utils/supabase/server'
import { Plus, MessageSquare, ThumbsUp, Eye, Search } from 'lucide-react'
import { formatDistanceToNow } from 'date-fns'
import { ko } from 'date-fns/locale'

export default async function CommunityPage(props: { searchParams: Promise<{ category?: string }> }) {
  const searchParams = await props.searchParams
  const category = searchParams.category || 'all'
  const supabase = await createClient()

  let query = supabase
    .from('posts')
    .select('*, profiles(username, avatar_url)')
    .order('created_at', { ascending: false })

  if (category !== 'all') {
    query = query.eq('category', category)
  }

  const { data: posts } = await query

  const categories = [
    { id: 'all', name: '전체' },
    { id: 'knowhow', name: '노하우/팁' },
    { id: 'tools', name: '도구/제품' },
    { id: 'templates', name: '템플릿' },
    { id: 'qna', name: '질문' },
  ]

  return (
    <div className="flex-1 w-full max-w-5xl mx-auto px-4 py-8 sm:px-6 lg:px-8">
      <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4 mb-8">
        <div>
          <h1 className="text-3xl font-bold text-gray-900 dark:text-white">커뮤니티</h1>
          <p className="text-gray-500 dark:text-gray-400 mt-2">원장님들의 소중한 경험을 나누어주세요.</p>
        </div>
        <Link
          href="/community/write"
          className="inline-flex items-center gap-2 bg-blue-600 hover:bg-blue-700 text-white px-4 py-2 rounded-xl font-medium transition-colors"
        >
          <Plus className="w-5 h-5" />
          글쓰기
        </Link>
      </div>

      {/* Categories / Tabs */}
      <div className="flex overflow-x-auto hide-scrollbar gap-2 mb-8 pb-2">
        {categories.map((c) => (
          <Link
            key={c.id}
            href={`/community${c.id === 'all' ? '' : `?category=${c.id}`}`}
            className={`whitespace-nowrap px-4 py-2 rounded-full text-sm font-medium transition-colors ${
              category === c.id
                ? 'bg-gray-900 text-white dark:bg-gray-100 dark:text-gray-900'
                : 'bg-white text-gray-600 hover:bg-gray-100 dark:bg-gray-900 dark:text-gray-300 dark:hover:bg-gray-800 border border-gray-200 dark:border-gray-800'
            }`}
          >
            {c.name}
          </Link>
        ))}
      </div>

      {/* Posts Grid/List */}
      <div className="grid gap-4">
        {!posts || posts.length === 0 ? (
          <div className="text-center py-20 bg-white dark:bg-gray-900 rounded-3xl border border-gray-100 dark:border-gray-800">
            <p className="text-gray-500 dark:text-gray-400">아직 등록된 게시글이 없습니다.</p>
          </div>
        ) : (
          posts.map((post) => (
            <Link
              key={post.id}
              href={`/community/${post.id}`}
              className="group bg-white dark:bg-gray-900 p-5 rounded-2xl border border-gray-100 dark:border-gray-800 hover:border-blue-200 dark:hover:border-blue-900/50 hover:shadow-md transition-all flex flex-col sm:flex-row gap-4"
            >
              <div className="flex-1">
                <div className="flex items-center gap-2 mb-2">
                  <span className="text-xs font-semibold text-blue-600 dark:text-blue-400 bg-blue-50 dark:bg-blue-900/20 px-2 py-1 rounded-md">
                    {categories.find(c => c.id === post.category)?.name || post.category}
                  </span>
                  <span className="text-xs text-gray-500">
                    {formatDistanceToNow(new Date(post.created_at), { addSuffix: true, locale: ko })}
                  </span>
                </div>
                <h3 className="text-lg font-bold text-gray-900 dark:text-white group-hover:text-blue-600 dark:group-hover:text-blue-400 transition-colors mb-2">
                  {post.title}
                </h3>
                <p className="text-sm text-gray-500 dark:text-gray-400 line-clamp-2 mb-4">
                  {post.content}
                </p>
                
                <div className="flex items-center gap-4 text-xs text-gray-500">
                  <span className="flex items-center gap-1 font-medium text-gray-700 dark:text-gray-300">
                    <div className="w-5 h-5 rounded-full bg-gray-200 dark:bg-gray-700 overflow-hidden">
                      {/* Avatar placeholder */}
                    </div>
                    {post.profiles?.username || '익명'}
                  </span>
                  <span className="flex items-center gap-1 ml-auto">
                    <ThumbsUp className="w-3.5 h-3.5" /> {post.likes_count}
                  </span>
                  <span className="flex items-center gap-1">
                    <MessageSquare className="w-3.5 h-3.5" /> 0
                  </span>
                  <span className="flex items-center gap-1">
                    <Eye className="w-3.5 h-3.5" /> {post.views_count}
                  </span>
                </div>
              </div>
              
              {/* Optional Thumbnail Image */}
              {post.image_urls && post.image_urls.length > 0 && (
                <div className="w-full sm:w-32 h-32 rounded-xl bg-gray-100 dark:bg-gray-800 overflow-hidden shrink-0 mt-4 sm:mt-0">
                  <img src={post.image_urls[0]} alt={post.title} className="w-full h-full object-cover" />
                </div>
              )}
            </Link>
          ))
        )}
      </div>
    </div>
  )
}
