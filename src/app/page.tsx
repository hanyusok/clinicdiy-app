import Link from 'next/link'
import { ArrowRight, Wrench, Lightbulb, FileImage, TrendingUp } from 'lucide-react'

export default function Home() {
  return (
    <div className="flex flex-col min-h-full">
      {/* Hero Section */}
      <section className="relative overflow-hidden bg-gradient-to-b from-blue-50 to-white dark:from-gray-900 dark:to-gray-950 px-6 py-12 md:py-24">
        <div className="absolute top-0 right-0 -translate-y-12 translate-x-1/3">
          <div className="w-96 h-96 bg-blue-400/20 rounded-full blur-3xl" />
        </div>
        <div className="relative z-10 max-w-4xl mx-auto flex flex-col items-center text-center space-y-6">
          <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-blue-100 dark:bg-blue-900/30 text-blue-700 dark:text-blue-300 text-sm font-medium">
            <Wrench className="w-4 h-4" />
            <span>개원의를 위한 DIY 커뮤니티</span>
          </div>
          <h1 className="text-4xl md:text-6xl font-extrabold tracking-tight text-gray-900 dark:text-white">
            우리 병원 수선은 <br className="md:hidden" />
            <span className="text-transparent bg-clip-text bg-gradient-to-r from-blue-600 to-cyan-500">
              내 손으로 직접
            </span>
          </h1>
          <p className="text-lg md:text-xl text-gray-600 dark:text-gray-300 max-w-2xl">
            간단한 인테리어 보수부터 조명 교체, 간판 템플릿까지. 
            의사 선생님들의 생생한 노하우와 꿀팁을 공유해보세요.
          </p>
          <div className="flex items-center gap-4 pt-4">
            <Link
              href="/community/write"
              className="bg-blue-600 hover:bg-blue-700 text-white rounded-xl px-6 py-3 font-semibold transition-all hover:scale-105 shadow-lg shadow-blue-500/30"
            >
              노하우 공유하기
            </Link>
            <Link
              href="/community"
              className="bg-white dark:bg-gray-800 text-gray-900 dark:text-white border border-gray-200 dark:border-gray-700 hover:bg-gray-50 dark:hover:bg-gray-700 rounded-xl px-6 py-3 font-semibold transition-all"
            >
              커뮤니티 둘러보기
            </Link>
          </div>
        </div>
      </section>

      {/* Main Categories Section */}
      <section className="px-6 py-12 max-w-5xl mx-auto w-full">
        <div className="flex items-center justify-between mb-8">
          <h2 className="text-2xl font-bold">인기 카테고리</h2>
          <Link href="/community" className="text-blue-600 text-sm font-medium flex items-center gap-1">
            전체보기 <ArrowRight className="w-4 h-4" />
          </Link>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          {/* Card 1 */}
          <Link href="/community?category=knowhow" className="group relative p-6 bg-white dark:bg-gray-900 rounded-3xl border border-gray-100 dark:border-gray-800 shadow-sm hover:shadow-xl transition-all overflow-hidden">
            <div className="absolute top-0 right-0 w-32 h-32 bg-yellow-400/10 rounded-full blur-2xl -translate-y-1/2 translate-x-1/2 group-hover:bg-yellow-400/20 transition-all" />
            <div className="relative z-10 flex flex-col h-full">
              <div className="w-12 h-12 bg-yellow-100 dark:bg-yellow-900/30 rounded-2xl flex items-center justify-center mb-4">
                <Lightbulb className="w-6 h-6 text-yellow-600 dark:text-yellow-500" />
              </div>
              <h3 className="text-xl font-bold mb-2">노하우 & 팁</h3>
              <p className="text-gray-500 dark:text-gray-400 text-sm flex-1">
                대기실 의자 천갈이부터 수액걸이 수리까지 생생한 팁을 만나보세요.
              </p>
            </div>
          </Link>

          {/* Card 2 */}
          <Link href="/community?category=tools" className="group relative p-6 bg-white dark:bg-gray-900 rounded-3xl border border-gray-100 dark:border-gray-800 shadow-sm hover:shadow-xl transition-all overflow-hidden">
            <div className="absolute top-0 right-0 w-32 h-32 bg-blue-400/10 rounded-full blur-2xl -translate-y-1/2 translate-x-1/2 group-hover:bg-blue-400/20 transition-all" />
            <div className="relative z-10 flex flex-col h-full">
              <div className="w-12 h-12 bg-blue-100 dark:bg-blue-900/30 rounded-2xl flex items-center justify-center mb-4">
                <Wrench className="w-6 h-6 text-blue-600 dark:text-blue-500" />
              </div>
              <h3 className="text-xl font-bold mb-2">유용한 도구/제품</h3>
              <p className="text-gray-500 dark:text-gray-400 text-sm flex-1">
                DIY에 꼭 필요한 가성비 공구와 추천 제품을 소개합니다.
              </p>
            </div>
          </Link>

          {/* Card 3 */}
          <Link href="/community?category=templates" className="group relative p-6 bg-white dark:bg-gray-900 rounded-3xl border border-gray-100 dark:border-gray-800 shadow-sm hover:shadow-xl transition-all overflow-hidden">
            <div className="absolute top-0 right-0 w-32 h-32 bg-purple-400/10 rounded-full blur-2xl -translate-y-1/2 translate-x-1/2 group-hover:bg-purple-400/20 transition-all" />
            <div className="relative z-10 flex flex-col h-full">
              <div className="w-12 h-12 bg-purple-100 dark:bg-purple-900/30 rounded-2xl flex items-center justify-center mb-4">
                <FileImage className="w-6 h-6 text-purple-600 dark:text-purple-500" />
              </div>
              <h3 className="text-xl font-bold mb-2">간판/안내문 템플릿</h3>
              <p className="text-gray-500 dark:text-gray-400 text-sm flex-1">
                진료시간표, 원내 안내문 등 깔끔한 디자인 템플릿을 공유합니다.
              </p>
            </div>
          </Link>
        </div>
      </section>

      {/* Trending Section Placeholder */}
      <section className="px-6 py-12 max-w-5xl mx-auto w-full mb-8">
        <div className="flex items-center gap-2 mb-6">
          <TrendingUp className="w-6 h-6 text-red-500" />
          <h2 className="text-2xl font-bold">주간 인기글</h2>
        </div>
        <div className="bg-white dark:bg-gray-900 border border-gray-100 dark:border-gray-800 rounded-3xl p-6 shadow-sm">
          <div className="text-center py-12 text-gray-500">
            <p>아직 등록된 게시글이 없습니다. 첫 번째 노하우를 공유해주세요!</p>
          </div>
        </div>
      </section>
    </div>
  )
}
