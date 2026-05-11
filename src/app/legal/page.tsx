import { ClipboardCheck } from 'lucide-react'

export const metadata = {
  title: '법규/행정 가이드 | ClinicDIY',
  description: '병의원 개업 인테리어 법규 및 행정 고려 사항',
}

export default function LegalGuidePage() {
  return (
    <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-10 pb-20">
      <div className="mb-8">
        <div className="inline-flex items-center justify-center p-3 bg-teal-100 dark:bg-teal-900/30 rounded-2xl mb-4">
          <ClipboardCheck className="w-8 h-8 text-teal-600 dark:text-teal-400" />
        </div>
        <h1 className="text-3xl font-extrabold text-gray-900 dark:text-white mb-4">
          병의원 개원 필수 법규 및 행정 가이드
        </h1>
        <p className="text-lg text-gray-600 dark:text-gray-400 leading-relaxed">
          병의원 개업 인테리어는 일반 상업 공간과 달리 <strong>의료법</strong>, <strong>건축법</strong>, <strong>소방법</strong>, 그리고 <strong>장애인 등 편의법</strong>이 복합적으로 적용되는 '규제 산업'의 영역입니다. 준비 과정에서 놓치기 쉬운 핵심 법규 및 행정 고려 사항을 정리해 드립니다.
        </p>
      </div>

      <div className="space-y-12">
        {/* Section 1 */}
        <section>
          <h2 className="text-2xl font-bold text-gray-900 dark:text-white border-b-2 border-gray-100 dark:border-gray-800 pb-3 mb-6">
            1. 의료법상 필수 시설 및 규격 (의료법 시행규칙)
          </h2>
          <p className="text-gray-600 dark:text-gray-400 mb-4">
            의료기관의 종별(의원/병원) 및 진료과목에 따라 반드시 갖춰야 하는 공간과 규격이 법으로 정해져 있습니다.
          </p>
          <ul className="space-y-4 text-gray-700 dark:text-gray-300 list-disc list-inside ml-2">
            <li>
              <strong className="text-gray-900 dark:text-gray-100">진료실:</strong> 각 진료과목별로 구획되어야 하며, 환자의 프라이버시가 보호되는 구조여야 합니다.
            </li>
            <li className="flex flex-col gap-2">
              <strong className="text-gray-900 dark:text-gray-100">입원실 (설치 시):</strong>
              <ul className="list-[circle] list-inside ml-6 space-y-1 text-gray-600 dark:text-gray-400">
                <li><strong>면적:</strong> 1인실 기준 10㎡, 다인실은 1인당 6.3㎡ 이상의 면적 확보가 필수입니다.</li>
                <li><strong>병상 간격:</strong> 병상 간 이격거리를 최소 1.5m 이상 확보해야 합니다.</li>
                <li><strong>제한:</strong> 지하층 및 3층 이상(내화구조 제외) 설치가 원칙적으로 제한됩니다.</li>
              </ul>
            </li>
            <li>
              <strong className="text-gray-900 dark:text-gray-100">수술실:</strong> 외과계 진료과목이 있고 전신마취 수술을 하는 경우 반드시 갖춰야 하며, 각 수술실은 격벽으로 구획되어야 합니다. (공기정화설비, 예비전원설비 필수)
            </li>
            <li>
              <strong className="text-gray-900 dark:text-gray-100">대기실:</strong> 환자가 대기하기에 충분한 면적과 의자 등을 갖춰야 하며, 감염 예방을 위해 환기 시설 설치가 권장됩니다.
            </li>
          </ul>
        </section>

        {/* Section 2 */}
        <section>
          <h2 className="text-2xl font-bold text-gray-900 dark:text-white border-b-2 border-gray-100 dark:border-gray-800 pb-3 mb-6">
            2. 건축법 및 용도 변경
          </h2>
          <ul className="space-y-3 text-gray-700 dark:text-gray-300 list-disc list-inside ml-2">
            <li>
              <strong className="text-gray-900 dark:text-gray-100">건축물 용도:</strong> 해당 건물의 용도가 <strong>'제1종 근린생활시설(의원)'</strong> 또는 '의료시설(병원)'인지 확인해야 합니다. 면적 합계가 500㎡ 이상인 경우 용도 변경 신청이 필요할 수 있습니다.
            </li>
            <li>
              <strong className="text-gray-900 dark:text-gray-100">바닥 하중:</strong> 진단용 방사선 발생장치(X-ray, CT 등)나 무거운 의료기기를 설치할 경우, 해당 층의 바닥 하중 설계가 적합한지 검토해야 합니다.
            </li>
          </ul>
        </section>

        {/* Section 3 */}
        <section>
          <h2 className="text-2xl font-bold text-gray-900 dark:text-white border-b-2 border-gray-100 dark:border-gray-800 pb-3 mb-6">
            3. 장애인 편의시설 설치 (장애인 등 편의법)
          </h2>
          <p className="text-gray-600 dark:text-gray-400 mb-4">
            2022년 이후 개정 법령에 따라 소규모 의원급도 장애인 편의시설 의무화 대상이 확대되었습니다.
          </p>
          <ul className="space-y-3 text-gray-700 dark:text-gray-300 list-disc list-inside ml-2">
            <li>
              <strong className="text-gray-900 dark:text-gray-100">주출입구:</strong> 휠체어 사용자가 진입 가능한 경사로(기울기 1/12 이하) 또는 단차 제거가 필요합니다.
            </li>
            <li>
              <strong className="text-gray-900 dark:text-gray-100">내부 통로:</strong> 휠체어 교행이 가능하도록 복도 유효 폭(최소 1.2m 이상)을 확보해야 합니다.
            </li>
            <li>
              <strong className="text-gray-900 dark:text-gray-100">장애인 화장실:</strong> 면적 규격(폭 1.6m, 깊이 2.0m 이상)과 점자 블록, 도움벨 설치 여부를 확인하십시오.
            </li>
          </ul>
        </section>

        {/* Section 4 */}
        <section>
          <h2 className="text-2xl font-bold text-gray-900 dark:text-white border-b-2 border-gray-100 dark:border-gray-800 pb-3 mb-6">
            4. 소방법 및 방염 (소방시설 설치 및 관리에 관한 법률)
          </h2>
          <ul className="space-y-3 text-gray-700 dark:text-gray-300 list-disc list-inside ml-2">
            <li>
              <strong className="text-gray-900 dark:text-gray-100">방염 대상:</strong> 의료기관은 다중이용업소에 준하는 방염 규제를 받습니다. 실내 장식물(벽지, 합판, 목재 등)은 반드시 방염 성능 검사를 통과한 제품을 사용해야 합니다.
            </li>
            <li>
              <strong className="text-gray-900 dark:text-gray-100">소방 시설:</strong> 스프링클러, 화재 감지기, 유도등, 비상구 확보 등 소방 필증 발급을 위한 설비가 인테리어 도면에 포함되어야 합니다.
            </li>
          </ul>
        </section>

        {/* Section 5 */}
        <section>
          <h2 className="text-2xl font-bold text-gray-900 dark:text-white border-b-2 border-gray-100 dark:border-gray-800 pb-3 mb-6">
            5. 행정 절차 가이드라인
          </h2>
          <div className="overflow-x-auto rounded-xl border border-gray-200 dark:border-gray-800">
            <table className="w-full text-left text-sm whitespace-nowrap">
              <thead className="bg-gray-50 dark:bg-gray-900/50">
                <tr>
                  <th className="px-6 py-4 font-semibold text-gray-900 dark:text-gray-100">단계</th>
                  <th className="px-6 py-4 font-semibold text-gray-900 dark:text-gray-100">주요 내용</th>
                  <th className="px-6 py-4 font-semibold text-gray-900 dark:text-gray-100">비고</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-gray-200 dark:divide-gray-800 bg-white dark:bg-gray-950">
                <tr>
                  <td className="px-6 py-4 font-medium text-gray-900 dark:text-gray-100">사전 검토</td>
                  <td className="px-6 py-4 text-gray-600 dark:text-gray-400">관할 보건소 담당자와 도면 사전 협의</td>
                  <td className="px-6 py-4 text-gray-500 dark:text-gray-500">도면 확정 전 필수 절차</td>
                </tr>
                <tr>
                  <td className="px-6 py-4 font-medium text-gray-900 dark:text-gray-100">착공 전</td>
                  <td className="px-6 py-4 text-gray-600 dark:text-gray-400">소방시설 착공 신고 (전문 업체 대행)</td>
                  <td className="px-6 py-4 text-gray-500 dark:text-gray-500">인테리어 시작 시점</td>
                </tr>
                <tr>
                  <td className="px-6 py-4 font-medium text-gray-900 dark:text-gray-100">완공 전</td>
                  <td className="px-6 py-4 text-gray-600 dark:text-gray-400">전기안전점검확인서, 방염 완비 증명서 취득</td>
                  <td className="px-6 py-4 text-gray-500 dark:text-gray-500">개설 신고 필수 서류</td>
                </tr>
                <tr>
                  <td className="px-6 py-4 font-medium text-gray-900 dark:text-gray-100">개설 신고</td>
                  <td className="px-6 py-4 text-gray-600 dark:text-gray-400">의료기관 개설 신고서 제출 (보건소)</td>
                  <td className="px-6 py-4 text-gray-500 dark:text-gray-500">평면도, 의료인 면허 등 첨부</td>
                </tr>
              </tbody>
            </table>
          </div>
        </section>

        {/* Planner's Advice */}
        <section className="bg-blue-50 dark:bg-blue-900/20 border border-blue-100 dark:border-blue-900/50 rounded-2xl p-6 lg:p-8 mt-12">
          <div className="flex items-start gap-4">
            <div className="text-2xl mt-1">💡</div>
            <div>
              <h3 className="text-lg font-bold text-blue-900 dark:text-blue-300 mb-2">기획자적 조언</h3>
              <p className="text-blue-800 dark:text-blue-200 leading-relaxed">
                'Self DIY Clinic' 플랫폼을 기획하신다면, 위와 같은 복잡한 법규를 <strong>'자동 체크리스트'</strong> 형태로 제공하거나, 평수와 진료과목 입력 시 <strong>'법규 위반 여부를 시각화해주는 도면 툴'</strong>을 도입하는 것이 개업 의사들에게 가장 강력한 셀링 포인트가 될 것입니다.
              </p>
            </div>
          </div>
        </section>
      </div>
    </div>
  )
}
