import { Trash2, ShoppingCart, ClipboardList, Handshake, Code } from 'lucide-react'

export const metadata = {
  title: '폐업정리 솔루션 | ClinicDIY',
  description: '병의원 폐업, 중고 매각 및 양도양수 가이드',
}

export default function ClosingPage() {
  return (
    <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-10 pb-20">
      <div className="mb-10 text-center">
        <div className="inline-flex items-center justify-center p-4 bg-gray-100 dark:bg-gray-800 rounded-2xl mb-4">
          <Trash2 className="w-8 h-8 text-gray-600 dark:text-gray-300" />
        </div>
        <h1 className="text-3xl font-extrabold text-gray-900 dark:text-white mb-4">
          병의원 폐업 및 양도양수 솔루션
        </h1>
        <p className="text-lg text-gray-600 dark:text-gray-400 max-w-2xl mx-auto leading-relaxed">
          어려운 폐업 행정 절차부터 중고 의료기기 매각, 그리고 병원 양도양수까지.
          <strong> Clinic Asset & Legal Exit</strong> 모듈 기획안을 소개합니다.
        </p>
      </div>

      <div className="space-y-8">
        {/* Service 1 */}
        <section className="bg-white dark:bg-gray-900 p-8 rounded-3xl shadow-sm border border-gray-100 dark:border-gray-800">
          <div className="flex items-start gap-4">
            <div className="p-3 bg-blue-50 dark:bg-blue-900/30 rounded-xl shrink-0">
              <ShoppingCart className="w-6 h-6 text-blue-600 dark:text-blue-400" />
            </div>
            <div>
              <h2 className="text-2xl font-bold text-gray-900 dark:text-white mb-2">
                1. Smart Disposal Market
              </h2>
              <p className="text-gray-600 dark:text-gray-400 mb-4 text-lg">
                중고 의료기기 및 인테리어 집기 매각 중개 서비스
              </p>
              <div className="bg-gray-50 dark:bg-gray-950 rounded-xl p-4 border border-gray-100 dark:border-gray-800">
                <h3 className="text-sm font-bold text-gray-900 dark:text-gray-100 mb-2">주요 기능 (Features)</h3>
                <ul className="flex flex-wrap gap-2">
                  <li className="px-3 py-1 bg-white dark:bg-gray-900 border border-gray-200 dark:border-gray-700 rounded-full text-sm text-gray-700 dark:text-gray-300">AI 적정가 산출</li>
                  <li className="px-3 py-1 bg-white dark:bg-gray-900 border border-gray-200 dark:border-gray-700 rounded-full text-sm text-gray-700 dark:text-gray-300">직거래 채팅</li>
                  <li className="px-3 py-1 bg-white dark:bg-gray-900 border border-gray-200 dark:border-gray-700 rounded-full text-sm text-gray-700 dark:text-gray-300">철거 업체 견적 비교</li>
                </ul>
              </div>
            </div>
          </div>
        </section>

        {/* Service 2 */}
        <section className="bg-white dark:bg-gray-900 p-8 rounded-3xl shadow-sm border border-gray-100 dark:border-gray-800">
          <div className="flex items-start gap-4">
            <div className="p-3 bg-emerald-50 dark:bg-emerald-900/30 rounded-xl shrink-0">
              <ClipboardList className="w-6 h-6 text-emerald-600 dark:text-emerald-400" />
            </div>
            <div>
              <h2 className="text-2xl font-bold text-gray-900 dark:text-white mb-2">
                2. Compliance Master
              </h2>
              <p className="text-gray-600 dark:text-gray-400 mb-4 text-lg">
                의료법 기반 폐업 행정 자동 가이드
              </p>
              <div className="bg-gray-50 dark:bg-gray-950 rounded-xl p-4 border border-gray-100 dark:border-gray-800">
                <h3 className="text-sm font-bold text-gray-900 dark:text-gray-100 mb-2">체크리스트 (Checklists)</h3>
                <ul className="flex flex-wrap gap-2">
                  <li className="px-3 py-1 bg-white dark:bg-gray-900 border border-gray-200 dark:border-gray-700 rounded-full text-sm text-gray-700 dark:text-gray-300">진료기록부 보관소 신고</li>
                  <li className="px-3 py-1 bg-white dark:bg-gray-900 border border-gray-200 dark:border-gray-700 rounded-full text-sm text-gray-700 dark:text-gray-300">마약류 잔여보고</li>
                  <li className="px-3 py-1 bg-white dark:bg-gray-900 border border-gray-200 dark:border-gray-700 rounded-full text-sm text-gray-700 dark:text-gray-300">방사선 장치 신고</li>
                </ul>
              </div>
            </div>
          </div>
        </section>

        {/* Service 3 */}
        <section className="bg-white dark:bg-gray-900 p-8 rounded-3xl shadow-sm border border-gray-100 dark:border-gray-800">
          <div className="flex items-start gap-4">
            <div className="p-3 bg-purple-50 dark:bg-purple-900/30 rounded-xl shrink-0">
              <Handshake className="w-6 h-6 text-purple-600 dark:text-purple-400" />
            </div>
            <div>
              <h2 className="text-2xl font-bold text-gray-900 dark:text-white mb-2">
                3. Succession Matcher
              </h2>
              <p className="text-gray-600 dark:text-gray-400 mb-4 text-lg">
                병원 양도양수 및 권리금 산정 솔루션
              </p>
              <div className="bg-gray-50 dark:bg-gray-950 rounded-xl p-4 border border-gray-100 dark:border-gray-800">
                <h3 className="text-sm font-bold text-gray-900 dark:text-gray-100 mb-2">도구 (Tools)</h3>
                <ul className="flex flex-wrap gap-2">
                  <li className="px-3 py-1 bg-white dark:bg-gray-900 border border-gray-200 dark:border-gray-700 rounded-full text-sm text-gray-700 dark:text-gray-300">매출 기반 권리금 계산기</li>
                  <li className="px-3 py-1 bg-white dark:bg-gray-900 border border-gray-200 dark:border-gray-700 rounded-full text-sm text-gray-700 dark:text-gray-300">익명 매물 등록 시스템</li>
                </ul>
              </div>
            </div>
          </div>
        </section>

        {/* JSON Code Block */}
        <section className="bg-gray-900 rounded-3xl p-6 lg:p-8 mt-12 shadow-lg">
          <div className="flex items-center gap-2 mb-4">
            <Code className="w-5 h-5 text-gray-400" />
            <h3 className="text-lg font-bold text-gray-200">데이터 스키마 (JSON)</h3>
          </div>
          <pre className="text-sm text-green-400 overflow-x-auto">
            <code>{`{
  "exit_strategy_module": {
    "category": "Clinic Asset & Legal Exit",
    "services": [
      {
        "service_name": "Smart Disposal Market",
        "description": "중고 의료기기 및 인테리어 집기 매각 중개",
        "features": ["AI 적정가 산출", "직거래 채팅", "철거 업체 견적 비교"]
      },
      {
        "service_name": "Compliance Master",
        "description": "의료법 기반 폐업 행정 자동 가이드",
        "checklists": ["진료기록부 보관소 신고", "마약류 잔여보고", "방사선 장치 신고"]
      },
      {
        "service_name": "Succession Matcher",
        "description": "병원 양도양수 및 권리금 산정 솔루션",
        "tools": ["매출 기반 권리금 계산기", "익명 매물 등록 시스템"]
      }
    ]
  }
}`}</code>
          </pre>
        </section>
      </div>
    </div>
  )
}
