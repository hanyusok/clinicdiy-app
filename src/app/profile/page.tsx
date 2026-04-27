import { createClient } from '@/utils/supabase/server'
import { signout } from '@/app/login/actions'
import { redirect } from 'next/navigation'
import { UserCircle, LogOut } from 'lucide-react'

export default async function ProfilePage() {
  const supabase = await createClient()
  const { data: { user } } = await supabase.auth.getUser()

  if (!user) {
    redirect('/login')
  }

  // Fetch profile
  const { data: profile } = await supabase
    .from('profiles')
    .select('*')
    .eq('id', user.id)
    .single()

  return (
    <div className="flex-1 w-full max-w-2xl mx-auto px-4 py-12 sm:px-6">
      <h1 className="text-2xl font-bold mb-8">내 프로필</h1>
      
      <div className="bg-white dark:bg-gray-950 rounded-3xl p-8 border border-gray-100 dark:border-gray-800 shadow-sm flex flex-col items-center mb-8">
        <div className="w-24 h-24 rounded-full bg-blue-50 dark:bg-blue-900/20 flex items-center justify-center mb-4 text-blue-600 dark:text-blue-400">
          <UserCircle className="w-16 h-16" />
        </div>
        <h2 className="text-xl font-bold mb-1">{profile?.username || '의사 선생님'}</h2>
        <p className="text-sm text-gray-500 mb-6">{user.email}</p>
        
        <form action={signout}>
          <button className="flex items-center gap-2 px-4 py-2 text-sm font-medium text-red-600 hover:bg-red-50 dark:hover:bg-red-900/20 rounded-xl transition-colors">
            <LogOut className="w-4 h-4" /> 로그아웃
          </button>
        </form>
      </div>
      
      <div className="bg-white dark:bg-gray-950 rounded-3xl p-6 sm:p-8 border border-gray-100 dark:border-gray-800 shadow-sm">
        <h3 className="text-lg font-bold mb-4">내가 쓴 글</h3>
        <p className="text-sm text-gray-500 text-center py-8">아직 작성한 글이 없습니다.</p>
      </div>
    </div>
  )
}
