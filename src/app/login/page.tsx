import { login, signup } from './actions'

export default async function LoginPage(props: { searchParams: Promise<{ message: string }> }) {
  const searchParams = await props.searchParams
  return (
    <div className="flex-1 flex flex-col w-full px-8 sm:max-w-md justify-center gap-2 mx-auto mt-20">
      <div className="flex flex-col items-center justify-center text-center space-y-4 mb-8">
        <h1 className="text-3xl font-bold tracking-tight text-gray-900 dark:text-gray-100">
          환영합니다!
        </h1>
        <p className="text-sm text-gray-500 dark:text-gray-400">
          의사들을 위한 병원 DIY 노하우 공유 커뮤니티
        </p>
      </div>

      <form className="flex-1 flex flex-col w-full justify-center gap-4 text-foreground bg-white dark:bg-gray-950 p-8 rounded-2xl shadow-[0_8px_30px_rgb(0,0,0,0.04)] dark:shadow-[0_8px_30px_rgb(0,0,0,0.1)] border border-gray-100 dark:border-gray-800">
        <div className="flex flex-col gap-2">
          <label className="text-sm font-medium text-gray-700 dark:text-gray-300" htmlFor="email">
            이메일
          </label>
          <input
            className="rounded-xl px-4 py-3 bg-gray-50 dark:bg-gray-900 border border-gray-200 dark:border-gray-800 focus:outline-none focus:ring-2 focus:ring-blue-500 transition-all text-sm"
            name="email"
            placeholder="you@example.com"
            required
          />
        </div>
        <div className="flex flex-col gap-2">
          <label className="text-sm font-medium text-gray-700 dark:text-gray-300" htmlFor="password">
            비밀번호
          </label>
          <input
            className="rounded-xl px-4 py-3 bg-gray-50 dark:bg-gray-900 border border-gray-200 dark:border-gray-800 focus:outline-none focus:ring-2 focus:ring-blue-500 transition-all text-sm"
            type="password"
            name="password"
            placeholder="••••••••"
            required
          />
        </div>
        
        <div className="mt-4 flex flex-col gap-3">
          <button
            formAction={login}
            className="bg-blue-600 hover:bg-blue-700 text-white rounded-xl px-4 py-3 text-sm font-medium transition-colors"
          >
            로그인
          </button>
          <button
            formAction={signup}
            className="bg-white hover:bg-gray-50 text-gray-900 border border-gray-200 dark:bg-gray-900 dark:text-white dark:border-gray-700 dark:hover:bg-gray-800 rounded-xl px-4 py-3 text-sm font-medium transition-colors"
          >
            회원가입
          </button>
        </div>
        
        {searchParams?.message && (
          <p className="mt-4 p-4 bg-gray-100 dark:bg-gray-800 text-gray-600 dark:text-gray-300 text-center rounded-xl text-sm">
            {searchParams.message}
          </p>
        )}
      </form>
    </div>
  )
}
