'use client'

import { useState } from 'react'
import { CheckCircle2, Circle, AlertCircle, ChevronDown, ChevronUp, ClipboardList, RefreshCcw, Printer } from 'lucide-react'

// ────────── Types ──────────
type CheckItem = {
  id: string
  label: string
  detail: string
  required: boolean
  law: string
  checked: boolean
}

type Section = {
  id: string
  title: string
  emoji: string
  color: string
  items: CheckItem[]
}

// ────────── Rule Engine ──────────
function generateChecklist(specialty: string, sizePyeong: number, hasXray: boolean, hasDisabledToilet: boolean): Section[] {
  const isLarge = sizePyeong >= 50
  const isXraySpecialty = ['정형외과', '내과', '소아과', '결핵·호흡기내과'].includes(specialty)

  const sections: Section[] = [
    {
      id: 'fire',
      title: '소방시설 기준',
      emoji: '🔥',
      color: 'red',
      items: [
        {
          id: 'fire_extinguisher',
          label: '소화기 비치',
          detail: '바닥면적 33㎡(약 10평)마다 소화기 1개 이상 비치. 주요 통로 및 출입구 근처 배치.',
          required: true,
          law: '소방시설 설치 및 관리에 관한 법률 제12조',
          checked: false,
        },
        {
          id: 'sprinkler',
          label: '스프링클러 설치',
          detail: isLarge ? '연면적 400㎡(약 120평) 이상 의료시설에 스프링클러 설치 의무.' : '해당 면적 기준 미달 시 간이 스프링클러로 대체 가능.',
          required: isLarge,
          law: '화재예방, 소방시설 설치·유지 및 안전관리에 관한 법률 시행령 별표 5',
          checked: false,
        },
        {
          id: 'emergency_light',
          label: '비상구 및 유도등',
          detail: '비상구 표시 유도등, 피난구 유도등을 복도 및 출입구에 설치. 예비전원 내장형으로 60분 이상 작동.',
          required: true,
          law: '소방시설법 시행령 제15조',
          checked: false,
        },
        {
          id: 'alarm',
          label: '자동화재탐지설비',
          detail: '연면적 400㎡ 이상 또는 입원실 보유 시 의무. 감지기 설치 간격 준수 필요.',
          required: isLarge,
          law: '소방시설법 시행령 별표 4',
          checked: false,
        },
        {
          id: 'fire_door',
          label: '방화문 및 방화구획',
          detail: '면적 1,000㎡마다 방화구획 설치. 병원 건물 내 방화문은 자동폐쇄장치 부착.',
          required: isLarge,
          law: '건축법 제49조, 건축물의 피난·방화구조 등의 기준에 관한 규칙 제14조',
          checked: false,
        },
      ],
    },
    {
      id: 'disabled',
      title: '장애인 편의시설 기준',
      emoji: '♿',
      color: 'blue',
      items: [
        {
          id: 'disabled_entrance',
          label: '장애인 접근 가능 출입구',
          detail: '출입구 유효 폭 0.9m 이상. 문턱 없는 구조 또는 경사로 설치. 자동문 권장.',
          required: true,
          law: '장애인·노인·임산부 등의 편의증진 보장에 관한 법률 시행령 별표 2',
          checked: false,
        },
        {
          id: 'disabled_toilet',
          label: '장애인용 화장실',
          detail: '유효 폭 1.4m × 유효 깊이 1.8m 이상 확보. 안전손잡이, 응급호출버튼 설치. 출입문은 아웃스윙 또는 슬라이딩 도어.',
          required: sizePyeong >= 30,
          law: '장애인편의법 시행령 별표 2 제7호',
          checked: false,
        },
        {
          id: 'ramp',
          label: '경사로 (단차 해소)',
          detail: '높이 차이 있는 경우 경사로 기울기 1/12 이하. 양 측면 손잡이 설치. 폭 1.2m 이상.',
          required: true,
          law: '장애인편의법 시행령 별표 2 제3호',
          checked: false,
        },
        {
          id: 'parking',
          label: '장애인 주차구역',
          detail: '주차 10대 이상 시 의무. 주차면 폭 3.5m 이상, 별도 표시 및 안내판 필요.',
          required: isLarge,
          law: '장애인편의법 시행령 별표 2 제1호',
          checked: false,
        },
      ],
    },
    {
      id: 'medical',
      title: '의료법 시설 기준',
      emoji: '🏥',
      color: 'emerald',
      items: [
        {
          id: 'exam_room_size',
          label: '진료실 면적 기준',
          detail: `진료실 1실당 9.9㎡(3평) 이상. ${specialty} 특성상 처치 공간 포함 권장.`,
          required: true,
          law: '의료법 시행규칙 제34조 [별표 3]',
          checked: false,
        },
        {
          id: 'waiting_room',
          label: '대기실 구획',
          detail: '진료실 및 처치실과 분리된 대기실 구획. 진료 중 환자 프라이버시 보호 구조.',
          required: true,
          law: '의료법 시행규칙 제34조',
          checked: false,
        },
        {
          id: 'sink',
          label: '각 진료실 내 세면 시설',
          detail: '각 진료실 내 또는 근접 위치에 손 세정 시설(세면대) 설치 의무.',
          required: true,
          law: '의료법 시행규칙 제34조 [별표 3] 1. 공통기준',
          checked: false,
        },
        {
          id: 'sterilize_room',
          label: '소독·멸균 시설',
          detail: '의료기구 소독을 위한 별도 구획 또는 시설 보유. 오염구역과 청결구역 구분.',
          required: true,
          law: '의료법 시행규칙 제34조',
          checked: false,
        },
        ...(specialty === '산부인과' ? [{
          id: 'delivery_room',
          label: '분만실 (산부인과 전용)',
          detail: '분만실 면적 16.5㎡(5평) 이상. 산부인과 전용 필수 시설.',
          required: true,
          law: '의료법 시행규칙 [별표 3] 산부인과 기준',
          checked: false,
        }] : []),
        ...(specialty === '치과' ? [{
          id: 'dental_unit',
          label: '진료의자 간격 (치과 전용)',
          detail: '치과 진료의자(유닛체어) 1대당 유효면적 10㎡ 이상. 의자 간 간격 최소 1.8m.',
          required: true,
          law: '의료법 시행규칙 [별표 3] 치과의원 기준',
          checked: false,
        }] : []),
      ],
    },
    ...(hasXray || isXraySpecialty ? [{
      id: 'radiation',
      title: '방사선 시설 기준 (X-ray)',
      emoji: '☢️',
      color: 'purple',
      items: [
        {
          id: 'xray_shielding',
          label: '방사선 차폐 구조물',
          detail: '벽체: 납당량 1.5mm Pb 이상 또는 콘크리트 15cm 이상. 바닥·천장 포함. 시공 전 전문 방사선 방어 설계 필요.',
          required: true,
          law: '진단용 방사선 발생장치의 안전관리에 관한 규칙 제2조',
          checked: false,
        },
        {
          id: 'xray_door',
          label: '방사선실 방어문',
          detail: '납당량 1.5mm Pb 이상의 방어문. 촬영 중 잠금 장치 및 방사선 조사 중 표시등 설치 의무.',
          required: true,
          law: '진단용 방사선 발생장치의 안전관리에 관한 규칙 제3조',
          checked: false,
        },
        {
          id: 'xray_registration',
          label: '방사선 발생장치 신고',
          detail: '장치 설치 전 관할 보건소에 신고. 시설 완공 후 안전관리책임자 지정 필요.',
          required: true,
          law: '진단용 방사선 발생장치의 안전관리에 관한 규칙 제5조',
          checked: false,
        },
        {
          id: 'xray_dosimeter',
          label: '개인 방사선량 측정 장치',
          detail: '방사선 관계 종사자에 대한 개인 선량 측정기 착용 의무. 3개월마다 결과 기록 보존.',
          required: true,
          law: '원자력안전법 시행령 제148조',
          checked: false,
        },
      ],
    }] : []),
    {
      id: 'ventilation',
      title: '환기 및 위생 기준',
      emoji: '🌬️',
      color: 'sky',
      items: [
        {
          id: 'ventilation',
          label: '기계 환기 설비',
          detail: '진료 공간 시간당 환기 횟수 6회 이상 권장. 처치실 및 소독실은 별도 배기 필요.',
          required: true,
          law: '건축법 시행령 제87조, 건강친화형 주택 건설기준',
          checked: false,
        },
        {
          id: 'toilet_count',
          label: '화장실 수 기준',
          detail: '외래 환자 200명당 남녀 화장실 각 1칸 이상. 소형 의원은 공용 1칸 인정.',
          required: true,
          law: '건축물의 설비기준 등에 관한 규칙 제26조',
          checked: false,
        },
      ],
    },
  ]

  return sections
}

// ────────── Component ──────────
export default function LegalChecklist() {
  const [specialty, setSpecialty] = useState('')
  const [sizePyeong, setSizePyeong] = useState('')
  const [hasXray, setHasXray] = useState(false)
  const [hasDisabledToilet, setHasDisabledToilet] = useState(false)
  const [sections, setSections] = useState<Section[] | null>(null)
  const [openSections, setOpenSections] = useState<Set<string>>(new Set())

  const specialties = ['내과', '소아과', '피부과', '정형외과', '치과', '안과', '산부인과', '이비인후과', '정신건강의학과', '결핵·호흡기내과', '기타']

  const handleGenerate = () => {
    if (!specialty || !sizePyeong) return
    const list = generateChecklist(specialty, Number(sizePyeong), hasXray, hasDisabledToilet)
    setSections(list)
    setOpenSections(new Set(list.map(s => s.id)))
  }

  const toggleCheck = (sectionId: string, itemId: string) => {
    setSections(prev => prev?.map(s => s.id !== sectionId ? s : {
      ...s,
      items: s.items.map(item => item.id !== itemId ? item : { ...item, checked: !item.checked })
    }) ?? null)
  }

  const toggleSection = (id: string) => {
    setOpenSections(prev => {
      const next = new Set(prev)
      next.has(id) ? next.delete(id) : next.add(id)
      return next
    })
  }

  const totalItems = sections?.flatMap(s => s.items).length ?? 0
  const checkedItems = sections?.flatMap(s => s.items).filter(i => i.checked).length ?? 0
  const requiredUnchecked = sections?.flatMap(s => s.items).filter(i => i.required && !i.checked).length ?? 0

  const colorMap: Record<string, string> = {
    red:    'bg-red-50 dark:bg-red-900/20 border-red-200 dark:border-red-800',
    blue:   'bg-blue-50 dark:bg-blue-900/20 border-blue-200 dark:border-blue-800',
    emerald:'bg-emerald-50 dark:bg-emerald-900/20 border-emerald-200 dark:border-emerald-800',
    purple: 'bg-purple-50 dark:bg-purple-900/20 border-purple-200 dark:border-purple-800',
    sky:    'bg-sky-50 dark:bg-sky-900/20 border-sky-200 dark:border-sky-800',
  }
  const headerColorMap: Record<string, string> = {
    red:    'text-red-700 dark:text-red-300',
    blue:   'text-blue-700 dark:text-blue-300',
    emerald:'text-emerald-700 dark:text-emerald-300',
    purple: 'text-purple-700 dark:text-purple-300',
    sky:    'text-sky-700 dark:text-sky-300',
  }

  return (
    <div className="flex-1 w-full max-w-3xl mx-auto px-4 py-8 sm:px-6">
      <div className="mb-8">
        <div className="flex items-center gap-3 mb-2">
          <div className="w-10 h-10 bg-blue-100 dark:bg-blue-900/30 rounded-2xl flex items-center justify-center">
            <ClipboardList className="w-5 h-5 text-blue-600 dark:text-blue-400" />
          </div>
          <div>
            <h1 className="text-2xl font-extrabold text-gray-900 dark:text-white">법적 시설 기준 체크리스트</h1>
            <p className="text-sm text-gray-500 dark:text-gray-400">진료과목과 규모를 입력하면 맞춤형 법규 체크리스트를 생성해드립니다.</p>
          </div>
        </div>
      </div>

      {/* Input Form */}
      <div className="bg-white dark:bg-gray-900 rounded-3xl border border-gray-100 dark:border-gray-800 p-6 mb-8 shadow-sm">
        <h2 className="font-bold text-gray-900 dark:text-white mb-4">병원 정보 입력</h2>
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 mb-4">
          <div className="space-y-1.5">
            <label className="text-sm font-medium text-gray-700 dark:text-gray-300">진료과목 *</label>
            <select
              value={specialty}
              onChange={e => setSpecialty(e.target.value)}
              className="w-full rounded-xl px-4 py-3 bg-gray-50 dark:bg-gray-800 border border-gray-200 dark:border-gray-700 focus:outline-none focus:ring-2 focus:ring-blue-500 text-sm"
            >
              <option value="">선택하세요</option>
              {specialties.map(s => <option key={s} value={s}>{s}</option>)}
            </select>
          </div>
          <div className="space-y-1.5">
            <label className="text-sm font-medium text-gray-700 dark:text-gray-300">병원 면적 (평) *</label>
            <input
              type="number"
              min={1}
              value={sizePyeong}
              onChange={e => setSizePyeong(e.target.value)}
              placeholder="예: 35"
              className="w-full rounded-xl px-4 py-3 bg-gray-50 dark:bg-gray-800 border border-gray-200 dark:border-gray-700 focus:outline-none focus:ring-2 focus:ring-blue-500 text-sm"
            />
          </div>
        </div>
        <div className="flex flex-wrap gap-4 mb-6">
          <label className="flex items-center gap-2 cursor-pointer">
            <input
              type="checkbox"
              checked={hasXray}
              onChange={e => setHasXray(e.target.checked)}
              className="w-4 h-4 rounded accent-blue-600"
            />
            <span className="text-sm text-gray-700 dark:text-gray-300">X-ray 장비 설치 예정</span>
          </label>
          <label className="flex items-center gap-2 cursor-pointer">
            <input
              type="checkbox"
              checked={hasDisabledToilet}
              onChange={e => setHasDisabledToilet(e.target.checked)}
              className="w-4 h-4 rounded accent-blue-600"
            />
            <span className="text-sm text-gray-700 dark:text-gray-300">장애인 화장실 설치 예정</span>
          </label>
        </div>
        <button
          onClick={handleGenerate}
          disabled={!specialty || !sizePyeong}
          className="w-full py-3 rounded-2xl bg-blue-600 hover:bg-blue-700 text-white font-semibold transition-colors disabled:opacity-40 disabled:cursor-not-allowed flex items-center justify-center gap-2"
        >
          <ClipboardList className="w-5 h-5" />
          체크리스트 생성하기
        </button>
      </div>

      {/* Checklist */}
      {sections && (
        <>
          {/* Progress Summary */}
          <div className="bg-white dark:bg-gray-900 rounded-3xl border border-gray-100 dark:border-gray-800 p-5 mb-6 shadow-sm">
            <div className="flex items-center justify-between mb-3">
              <span className="font-semibold text-gray-900 dark:text-white">완료 현황</span>
              <div className="flex items-center gap-3">
                {requiredUnchecked > 0 && (
                  <span className="flex items-center gap-1 text-xs text-amber-600 bg-amber-50 dark:bg-amber-900/20 px-2 py-1 rounded-full">
                    <AlertCircle className="w-3.5 h-3.5" />
                    필수 {requiredUnchecked}개 미완료
                  </span>
                )}
                <span className="text-sm font-bold text-blue-600">{checkedItems}/{totalItems}</span>
              </div>
            </div>
            <div className="h-2 bg-gray-100 dark:bg-gray-800 rounded-full overflow-hidden">
              <div
                className="h-full bg-gradient-to-r from-blue-500 to-emerald-500 rounded-full transition-all duration-500"
                style={{ width: totalItems ? `${(checkedItems / totalItems) * 100}%` : '0%' }}
              />
            </div>
            <div className="flex justify-between text-xs text-gray-500 mt-1.5">
              <span>0%</span>
              <span>{totalItems ? Math.round((checkedItems / totalItems) * 100) : 0}% 완료</span>
              <span>100%</span>
            </div>
          </div>

          {/* Disclaimer */}
          <div className="flex items-start gap-2 p-4 bg-amber-50 dark:bg-amber-900/20 border border-amber-200 dark:border-amber-800 rounded-2xl mb-6 text-xs text-amber-700 dark:text-amber-300">
            <AlertCircle className="w-4 h-4 shrink-0 mt-0.5" />
            <p>이 체크리스트는 참고용 정보입니다. 실제 인허가 전에 관할 보건소 및 소방서에 사전 상담을 받으시기 바랍니다. 법령은 개정될 수 있습니다.</p>
          </div>

          {/* Section Cards */}
          <div className="space-y-4">
            {sections.map(section => {
              const isOpen = openSections.has(section.id)
              const sectionChecked = section.items.filter(i => i.checked).length
              return (
                <div key={section.id} className={`rounded-2xl border ${colorMap[section.color]} overflow-hidden`}>
                  <button
                    onClick={() => toggleSection(section.id)}
                    className="w-full flex items-center justify-between p-4 text-left"
                  >
                    <div className="flex items-center gap-3">
                      <span className="text-xl">{section.emoji}</span>
                      <div>
                        <h3 className={`font-bold ${headerColorMap[section.color]}`}>{section.title}</h3>
                        <p className="text-xs text-gray-500">{sectionChecked}/{section.items.length} 완료</p>
                      </div>
                    </div>
                    {isOpen ? <ChevronUp className="w-5 h-5 text-gray-400" /> : <ChevronDown className="w-5 h-5 text-gray-400" />}
                  </button>

                  {isOpen && (
                    <div className="divide-y divide-white/50 dark:divide-gray-700/50 border-t border-inherit">
                      {section.items.map(item => (
                        <div key={item.id} className="p-4 bg-white/60 dark:bg-gray-900/60">
                          <div className="flex items-start gap-3">
                            <button
                              onClick={() => toggleCheck(section.id, item.id)}
                              className="mt-0.5 shrink-0"
                            >
                              {item.checked
                                ? <CheckCircle2 className="w-5 h-5 text-emerald-500" />
                                : <Circle className={`w-5 h-5 ${item.required ? 'text-gray-400' : 'text-gray-300'}`} />
                              }
                            </button>
                            <div className="flex-1 min-w-0">
                              <div className="flex flex-wrap items-center gap-2 mb-1">
                                <span className={`text-sm font-semibold ${item.checked ? 'line-through text-gray-400' : 'text-gray-900 dark:text-white'}`}>
                                  {item.label}
                                </span>
                                {item.required && (
                                  <span className="text-xs bg-red-100 dark:bg-red-900/30 text-red-600 dark:text-red-400 px-1.5 py-0.5 rounded-md font-medium">필수</span>
                                )}
                              </div>
                              <p className="text-xs text-gray-600 dark:text-gray-400 leading-relaxed mb-2">{item.detail}</p>
                              <p className="text-xs text-gray-400 dark:text-gray-600 italic">📜 {item.law}</p>
                            </div>
                          </div>
                        </div>
                      ))}
                    </div>
                  )}
                </div>
              )
            })}
          </div>

          {/* Action Buttons */}
          <div className="flex gap-3 mt-6">
            <button
              onClick={() => { setSections(null); setSpecialty(''); setSizePyeong(''); setHasXray(false) }}
              className="flex-1 flex items-center justify-center gap-2 py-3 rounded-2xl border border-gray-200 dark:border-gray-800 text-sm font-medium text-gray-600 dark:text-gray-400 hover:bg-gray-50 dark:hover:bg-gray-800 transition-colors"
            >
              <RefreshCcw className="w-4 h-4" /> 다시 생성
            </button>
            <button
              onClick={() => window.print()}
              className="flex-1 flex items-center justify-center gap-2 py-3 rounded-2xl bg-blue-600 hover:bg-blue-700 text-white text-sm font-semibold transition-colors"
            >
              <Printer className="w-4 h-4" /> 인쇄/PDF 저장
            </button>
          </div>
        </>
      )}
    </div>
  )
}
