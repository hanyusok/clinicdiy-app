import { Hammer, Brain, Eye, Settings, Database } from 'lucide-react'

export const metadata = {
  title: 'DIY 노하우 & AI 컨셉 | ClinicDIY',
  description: 'Self DIY Clinic 플랫폼 고도화 기획안 및 노하우',
}

export default function DiyPage() {
  return (
    <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-10 pb-20">
      <div className="mb-10 text-center">
        <div className="inline-flex items-center justify-center p-4 bg-orange-100 dark:bg-orange-900/30 rounded-2xl mb-4">
          <Hammer className="w-8 h-8 text-orange-600 dark:text-orange-400" />
        </div>
        <h1 className="text-3xl font-extrabold text-gray-900 dark:text-white mb-4">
          Self DIY Clinic 고도화 노하우 및 기획
        </h1>
        <p className="text-lg text-gray-600 dark:text-gray-400 max-w-2xl mx-auto leading-relaxed">
          이 두 가지 컨셉이 결합되면, 'Self DIY Clinic'은 단순한 인테리어 쇼핑몰이 아니라 
          <strong className="text-orange-600 dark:text-orange-400"> "개업 리스크 관리 플랫폼"</strong>으로서 
          의사 커뮤니티 내에서 강력한 신뢰를 얻게 될 것입니다.
        </p>
      </div>

      <div className="space-y-12">
        {/* Concept A */}
        <section className="bg-white dark:bg-gray-900 p-8 rounded-3xl shadow-sm border border-gray-100 dark:border-gray-800">
          <div className="flex items-center gap-3 mb-6">
            <Brain className="w-8 h-8 text-blue-500" />
            <h2 className="text-2xl font-bold text-gray-900 dark:text-white">
              1. 컨셉 A: 지능형 법규 자동 체크리스트 (Compliance Engine)
            </h2>
          </div>
          <p className="text-gray-600 dark:text-gray-400 mb-6 text-lg">
            단순한 문서 제공이 아니라, 사용자가 입력한 데이터(진료과목, 평수, 층수)에 반응하는 '조건부 로직 시스템'입니다.
          </p>
          
          <div className="mb-6">
            <h3 className="text-lg font-bold text-gray-900 dark:text-gray-100 mb-3 border-l-4 border-blue-500 pl-3">주요 기능</h3>
            <ul className="space-y-3 text-gray-700 dark:text-gray-300">
              <li><strong className="text-gray-900 dark:text-gray-100">과목별 맞춤 가이드:</strong> "내과" 선택 시 검진실 유무에 따른 수질 오염 방지 시설 안내, "정형외과" 선택 시 X-ray실 차폐 시공 기준 제시.</li>
              <li><strong className="text-gray-900 dark:text-gray-100">단계별 프로세스 관리:</strong> 인테리어 전(설계), 중(방염/전기), 후(개설신고)에 필요한 행정 서류와 체크 항목을 타임라인별로 노출.</li>
              <li><strong className="text-gray-900 dark:text-gray-100">실시간 위반 경고:</strong> 예) "입원실 면적 미달", "소방 필증 대상 면적 초과" 등 법적 리스크 사전 경고.</li>
            </ul>
          </div>

          <div>
            <h3 className="text-lg font-bold text-gray-900 dark:text-gray-100 mb-3 border-l-4 border-blue-500 pl-3">데이터 스키마 예시 (JSON)</h3>
            <pre className="bg-gray-50 dark:bg-gray-950 p-4 rounded-xl overflow-x-auto text-sm text-gray-800 dark:text-gray-200 border border-gray-200 dark:border-gray-800">
              <code>{`{
  "compliance_module": {
    "input_params": ["specialty", "total_area", "floor_level"],
    "rule_engine": {
      "radiology": {
        "condition": "if X-ray included",
        "requirement": "납판 시공(Lead lining) 및 방사선 안전 관리자 선임 보고",
        "inspection_doc": "방사선 발생장치 설치신고서"
      },
      "disability_law": {
        "condition": "if area >= 50㎡ (newly opened)",
        "requirement": "장애인 경사로 및 화장실 핸드레일 설치 의무",
        "check_item": "주출입구 단차 2cm 이하 여부"
      }
    }
  }
}`}</code>
            </pre>
          </div>
        </section>

        {/* Concept B */}
        <section className="bg-white dark:bg-gray-900 p-8 rounded-3xl shadow-sm border border-gray-100 dark:border-gray-800">
          <div className="flex items-center gap-3 mb-6">
            <Eye className="w-8 h-8 text-emerald-500" />
            <h2 className="text-2xl font-bold text-gray-900 dark:text-white">
              2. 컨셉 B: 위반 여부 시각화 도면 툴 (Visual Layout Validator)
            </h2>
          </div>
          <p className="text-gray-600 dark:text-gray-400 mb-6 text-lg">
            오늘의집 3D 인테리어 기능을 벤치마킹하되, '의료법 알고리즘'을 입힌 시각화 툴입니다.
          </p>

          <div className="mb-6">
            <h3 className="text-lg font-bold text-gray-900 dark:text-gray-100 mb-3 border-l-4 border-emerald-500 pl-3">주요 기능</h3>
            <ul className="space-y-4 text-gray-700 dark:text-gray-300">
              <li><strong className="text-gray-900 dark:text-gray-100">드래그 앤 드롭 객체:</strong> 의료법상 규격을 충족하는 '표준 진료실', '표준 입원실' 박스를 도면 위에 배치.</li>
              <li className="flex flex-col gap-2">
                <strong className="text-gray-900 dark:text-gray-100">히트맵 및 레드라인(Red-line):</strong>
                <ul className="list-[circle] list-inside ml-4 space-y-1 text-gray-600 dark:text-gray-400">
                  <li>입원실 침대 간격이 1.5m 미만일 때 해당 구역이 빨간색으로 표시됨.</li>
                  <li>복도 폭이 1.2m(장애인 등 편의법 기준)보다 좁아지면 경고 아이콘 생성.</li>
                </ul>
              </li>
              <li><strong className="text-gray-900 dark:text-gray-100">동선 시뮬레이션:</strong> 환자 동선과 의료진 동선(Clean vs. Dirty)이 겹치는 구간을 시각적으로 분리하여 감염 관리 효율성 평가.</li>
            </ul>
          </div>

          <div className="bg-emerald-50 dark:bg-emerald-900/20 p-5 rounded-xl border border-emerald-100 dark:border-emerald-900/30">
            <h3 className="text-lg font-bold text-emerald-900 dark:text-emerald-300 mb-3">핵심 셀링 포인트</h3>
            <ul className="space-y-2 text-emerald-800 dark:text-emerald-200">
              <li>💡 <strong>설계비 절감:</strong> 전문 인테리어 업체에 맡기기 전, 의사가 직접 '초안 도면'을 짜봄으로써 업체와의 소통 오류를 줄이고 설계 비용 최적화.</li>
              <li>🛡️ <strong>행정 리스크 제로:</strong> 보건소 현장 실사에서 반려당할 확률을 획기적으로 낮춤.</li>
            </ul>
          </div>
        </section>

        {/* Workflow */}
        <section className="bg-white dark:bg-gray-900 p-8 rounded-3xl shadow-sm border border-gray-100 dark:border-gray-800">
          <div className="flex items-center gap-3 mb-6">
            <Settings className="w-8 h-8 text-purple-500" />
            <h2 className="text-2xl font-bold text-gray-900 dark:text-white">
              3. 통합 플랫폼 워크플로우 (Scenario)
            </h2>
          </div>
          
          <div className="space-y-4">
            <div className="flex gap-4 p-4 rounded-xl bg-gray-50 dark:bg-gray-950 border border-gray-100 dark:border-gray-800">
              <div className="font-black text-purple-500 w-16 shrink-0">진입</div>
              <div className="text-gray-700 dark:text-gray-300">의사가 진료과목(예: 가정의학과)과 상가 평수(예: 40평) 입력.</div>
            </div>
            <div className="flex gap-4 p-4 rounded-xl bg-gray-50 dark:bg-gray-950 border border-gray-100 dark:border-gray-800">
              <div className="font-black text-purple-500 w-16 shrink-0">기획</div>
              <div className="text-gray-700 dark:text-gray-300">'도면 툴'에서 대기실, 진료실, 수액실 박스를 배치 (자동으로 법적 최소 면적 가이드라인 생성).</div>
            </div>
            <div className="flex gap-4 p-4 rounded-xl bg-gray-50 dark:bg-gray-950 border border-gray-100 dark:border-gray-800">
              <div className="font-black text-purple-500 w-16 shrink-0">검증</div>
              <div className="text-gray-700 dark:text-gray-300">배치가 끝나면 '자동 체크리스트'가 작동하여 "현재 설계상 장애인 화장실 면적이 부족합니다"라는 피드백 제공.</div>
            </div>
            <div className="flex gap-4 p-4 rounded-xl bg-gray-50 dark:bg-gray-950 border border-gray-100 dark:border-gray-800">
              <div className="font-black text-purple-500 w-16 shrink-0">연결</div>
              <div className="text-gray-700 dark:text-gray-300">확정된 도면을 바탕으로 해당 지역의 '병원 전문 시공 파트너'들에게 견적 요청.</div>
            </div>
            <div className="flex gap-4 p-4 rounded-xl bg-gray-50 dark:bg-gray-950 border border-gray-100 dark:border-gray-800">
              <div className="font-black text-purple-500 w-16 shrink-0">구매</div>
              <div className="text-gray-700 dark:text-gray-300">도면에 배치된 가구와 자재(항균 벽지, 대기실 소파 등)를 '마켓플레이스'에서 바로 구매.</div>
            </div>
          </div>
        </section>

        {/* Data Points */}
        <section className="bg-gradient-to-br from-indigo-50 to-blue-50 dark:from-indigo-950/30 dark:to-blue-900/20 p-8 rounded-3xl shadow-sm border border-indigo-100 dark:border-indigo-900/30">
          <div className="flex items-center gap-3 mb-6">
            <Database className="w-8 h-8 text-indigo-500" />
            <h2 className="text-2xl font-bold text-gray-900 dark:text-white">
              4. Antigravity AI 개발을 위한 추가 데이터 포인트
            </h2>
          </div>
          <p className="text-gray-600 dark:text-gray-400 mb-6 text-lg">
            이 시스템을 AI로 고도화하려면 다음 데이터셋 확보가 우선되어야 합니다.
          </p>
          <ul className="space-y-4 text-gray-700 dark:text-gray-300">
            <li className="flex items-center gap-3">
              <span className="w-2 h-2 rounded-full bg-indigo-500"></span>
              <div><strong className="text-gray-900 dark:text-gray-100">국가법령정보센터 API:</strong> 최신 의료법, 소방법 업데이트 자동 반영.</div>
            </li>
            <li className="flex items-center gap-3">
              <span className="w-2 h-2 rounded-full bg-indigo-500"></span>
              <div><strong className="text-gray-900 dark:text-gray-100">보건소 개설신고 반려 사례집:</strong> 실제 현장에서 자주 발생하는 위반 사례를 학습시켜 예방률 향상.</div>
            </li>
            <li className="flex items-center gap-3">
              <span className="w-2 h-2 rounded-full bg-indigo-500"></span>
              <div><strong className="text-gray-900 dark:text-gray-100">표준 도면 라이브러리:</strong> 진료과별 가장 효율적인 공간 배치 데이터베이스(DB).</div>
            </li>
          </ul>
        </section>

      </div>
    </div>
  )
}
