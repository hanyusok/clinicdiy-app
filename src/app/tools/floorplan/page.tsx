import type { Metadata } from 'next'
import FloorPlanTool from './FloorPlanTool'

export const metadata: Metadata = {
  title: '2D 병원 도면 플래너 | ClinicDIY',
  description: '병원 공간을 직접 설계해보세요. 진료실, 대기실, 처치실 등을 드래그앤드롭으로 배치할 수 있습니다.',
}

export default function FloorPlanPage() {
  return <FloorPlanTool />
}
