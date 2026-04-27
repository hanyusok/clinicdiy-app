import Link from 'next/link'
import { notFound } from 'next/navigation'
import { createClient } from '@/utils/supabase/server'
import { ArrowLeft, UserCircle, MessageSquare, ThumbsUp, Eye, Share2 } from 'lucide-react'
import { formatDistanceToNow } from 'date-fns'
import { ko } from 'date-fns/locale'

export default async function PostDetailPage(props: { params: Promise<{ id: string }> }) {
  const params = await props.params
  const supabase = await createClient()

  // Increment view count (in a real app, use an RPC call or track uniquely)
  // For simplicity, we just fetch it here.
  const { data: post, error } = await supabase
    .from('posts')
    .select('*, profiles(username, avatar_url)')
    .eq('id', params.id)
    .single()

  if (error || !post) {
    notFound()
  }

  // Fetch comments
  const { data: comments } = await supabase
    .from('comments')
    .select('*, profiles(username, avatar_url)')
    .eq('post_id', params.id)
    .order('created_at', { ascending: true })

  return (
    <div className="flex-1 w-full max-w-3xl mx-auto px-4 py-8 sm:px-6 bg-white dark:bg-gray-950 min-h-screen">
      <Link 
        href="/community" 
        className="inline-flex items-center gap-2 text-sm text-gray-500 hover:text-gray-900 dark:hover:text-white mb-8 transition-colors"
      >
        <ArrowLeft className="w-4 h-4" /> 목록으로
      </Link>

      <article className="mb-12">
        <header className="mb-8">
          <div className="flex items-center gap-2 mb-4">
            <span className="text-xs font-semibold text-blue-600 dark:text-blue-400 bg-blue-50 dark:bg-blue-900/20 px-2.5 py-1 rounded-md">
              {post.category}
            </span>
            <span className="text-sm text-gray-500">
              {formatDistanceToNow(new Date(post.created_at), { addSuffix: true, locale: ko })}
            </span>
          </div>
          <h1 className="text-2xl sm:text-3xl font-bold text-gray-900 dark:text-white mb-6 leading-tight">
            {post.title}
          </h1>
          
          <div className="flex items-center justify-between pb-6 border-b border-gray-100 dark:border-gray-800">
            <div className="flex items-center gap-3">
              {post.profiles?.avatar_url ? (
                <img src={post.profiles.avatar_url} alt="Profile" className="w-10 h-10 rounded-full object-cover" />
              ) : (
                <div className="w-10 h-10 rounded-full bg-gray-100 dark:bg-gray-800 flex items-center justify-center">
                  <UserCircle className="w-6 h-6 text-gray-400" />
                </div>
              )}
              <div>
                <p className="font-medium text-gray-900 dark:text-white text-sm">{post.profiles?.username || '익명'}</p>
                <p className="text-xs text-gray-500">원장님</p>
              </div>
            </div>
            
            <div className="flex gap-2">
              <button className="p-2 text-gray-500 hover:text-gray-900 dark:hover:text-white bg-gray-50 hover:bg-gray-100 dark:bg-gray-900 dark:hover:bg-gray-800 rounded-full transition-colors">
                <Share2 className="w-4 h-4" />
              </button>
            </div>
          </div>
        </header>

        <div className="prose prose-blue dark:prose-invert max-w-none mb-8">
          <p className="whitespace-pre-wrap text-gray-700 dark:text-gray-300 leading-relaxed">
            {post.content}
          </p>
        </div>

        {post.image_urls && post.image_urls.length > 0 && (
          <div className="grid gap-4 mb-8">
            {post.image_urls.map((url: string, i: number) => (
              <img key={i} src={url} alt={`첨부 이미지 ${i+1}`} className="w-full rounded-2xl bg-gray-100 dark:bg-gray-800" />
            ))}
          </div>
        )}

        <div className="flex items-center justify-center gap-6 py-8 border-y border-gray-100 dark:border-gray-800">
          <button className="flex flex-col items-center gap-1 group">
            <div className="w-12 h-12 rounded-full border border-gray-200 dark:border-gray-800 flex items-center justify-center group-hover:bg-blue-50 group-hover:border-blue-200 dark:group-hover:bg-blue-900/20 dark:group-hover:border-blue-800 transition-colors">
              <ThumbsUp className="w-5 h-5 text-gray-500 group-hover:text-blue-600 dark:text-gray-400 dark:group-hover:text-blue-400" />
            </div>
            <span className="text-xs font-medium text-gray-600 dark:text-gray-400 group-hover:text-blue-600 dark:group-hover:text-blue-400">
              {post.likes_count}
            </span>
          </button>
          
          <div className="flex flex-col items-center gap-1 text-gray-500">
            <div className="w-12 h-12 rounded-full border border-gray-200 dark:border-gray-800 flex items-center justify-center bg-gray-50 dark:bg-gray-900">
              <Eye className="w-5 h-5 text-gray-400" />
            </div>
            <span className="text-xs font-medium text-gray-500">{post.views_count}</span>
          </div>
        </div>
      </article>

      {/* Comments Section */}
      <section>
        <h3 className="text-lg font-bold flex items-center gap-2 mb-6 text-gray-900 dark:text-white">
          <MessageSquare className="w-5 h-5" /> 
          댓글 <span className="text-blue-600">{comments?.length || 0}</span>
        </h3>

        {/* Comment input form can be added here as a client component */}
        <div className="mb-8">
          <div className="bg-gray-50 dark:bg-gray-900 rounded-2xl p-4 border border-gray-100 dark:border-gray-800 flex gap-3">
            <div className="flex-1">
              <textarea 
                placeholder="댓글을 남겨보세요."
                className="w-full bg-transparent border-none focus:ring-0 text-sm resize-none"
                rows={2}
              />
            </div>
            <button className="self-end px-4 py-2 bg-blue-600 text-white rounded-xl text-sm font-medium">
              등록
            </button>
          </div>
        </div>

        <div className="space-y-6">
          {!comments || comments.length === 0 ? (
            <p className="text-sm text-gray-500 text-center py-4">가장 먼저 댓글을 남겨보세요!</p>
          ) : (
            comments.map((comment) => (
              <div key={comment.id} className="flex gap-3">
                <div className="w-8 h-8 rounded-full bg-gray-200 dark:bg-gray-700 shrink-0 overflow-hidden">
                  {comment.profiles?.avatar_url && (
                    <img src={comment.profiles.avatar_url} alt="" className="w-full h-full object-cover" />
                  )}
                </div>
                <div className="flex-1">
                  <div className="flex items-center gap-2 mb-1">
                    <span className="text-sm font-semibold text-gray-900 dark:text-white">
                      {comment.profiles?.username || '익명'}
                    </span>
                    <span className="text-xs text-gray-500">
                      {formatDistanceToNow(new Date(comment.created_at), { addSuffix: true, locale: ko })}
                    </span>
                  </div>
                  <p className="text-sm text-gray-700 dark:text-gray-300">
                    {comment.content}
                  </p>
                </div>
              </div>
            ))
          )}
        </div>
      </section>
    </div>
  )
}
