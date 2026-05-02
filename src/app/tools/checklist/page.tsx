import type { Metadata } from 'next'
import LegalChecklist from './LegalChecklist'

export const metadata: Metadata = {
  title: '법적 시설 기준 체크리스트 | ClinicDIY',
  description: '진료과목과 병원 규모를 입력하면 소방, 장애인 편의시설, 의료법 시설 기준을 자동으로 생성해드립니다.',
}

export default function LegalChecklistPage() {
  return <LegalChecklist />
}
