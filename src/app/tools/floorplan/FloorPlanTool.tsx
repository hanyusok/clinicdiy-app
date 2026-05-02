'use client'

import { useState, useRef, useCallback, useEffect } from 'react'
import { Trash2, Download, RotateCcw, Grid3x3, Maximize2, Info } from 'lucide-react'

// ────────── Types ──────────
type RoomElement = {
  id: string
  type: string
  label: string
  color: string
  x: number       // grid column (0-indexed)
  y: number       // grid row (0-indexed)
  w: number       // width in grid cells
  h: number       // height in grid cells
}

// ────────── Palette of room elements ──────────
const PALETTE = [
  { type: 'waiting',    label: '대기실',     color: '#BFDBFE', w: 6, h: 5 },
  { type: 'reception',  label: '접수/수납',  color: '#A7F3D0', w: 4, h: 2 },
  { type: 'exam',       label: '진료실',     color: '#FDE68A', w: 4, h: 4 },
  { type: 'procedure',  label: '처치실',     color: '#FECACA', w: 4, h: 4 },
  { type: 'xray',       label: 'X-ray실',   color: '#E9D5FF', w: 3, h: 4 },
  { type: 'toilet',     label: '화장실',     color: '#F9A8D4', w: 2, h: 3 },
  { type: 'storage',    label: '창고/물품',  color: '#D1FAE5', w: 2, h: 2 },
  { type: 'nurse',      label: '간호사실',   color: '#FED7AA', w: 3, h: 3 },
  { type: 'office',     label: '원장실',     color: '#BAE6FD', w: 3, h: 3 },
  { type: 'corridor',   label: '복도',       color: '#E5E7EB', w: 8, h: 2 },
  { type: 'entrance',   label: '출입구',     color: '#86EFAC', w: 2, h: 1 },
  { type: 'sterilize',  label: '소독실',     color: '#FEF3C7', w: 3, h: 3 },
]

const GRID_COLS = 24
const GRID_ROWS = 18
const CELL_PX  = 32  // px per cell

// ────────── Generate unique id ──────────
function uid() {
  return Math.random().toString(36).slice(2, 9)
}

// ────────── Component ──────────
export default function FloorPlanTool() {
  const [elements, setElements] = useState<RoomElement[]>([])
  const [selected, setSelected] = useState<string | null>(null)
  const [dragging, setDragging] = useState<{ id: string; offsetX: number; offsetY: number } | null>(null)
  const [resizing, setResizing] = useState<{ id: string; startX: number; startY: number; startW: number; startH: number } | null>(null)
  const [showGrid, setShowGrid] = useState(true)
  const [paletteDragging, setPaletteDragging] = useState<string | null>(null)
  const canvasRef = useRef<HTMLDivElement>(null)

  // ── Snap pixel position to grid cell ──
  const pxToCell = useCallback((px: number, py: number): [number, number] => {
    const rect = canvasRef.current?.getBoundingClientRect()
    if (!rect) return [0, 0]
    const col = Math.floor((px - rect.left) / CELL_PX)
    const row = Math.floor((py - rect.top) / CELL_PX)
    return [
      Math.max(0, Math.min(GRID_COLS - 1, col)),
      Math.max(0, Math.min(GRID_ROWS - 1, row)),
    ]
  }, [])

  // ── Palette item drag-start ──
  const onPaletteDragStart = (type: string, e: React.DragEvent) => {
    e.dataTransfer.setData('palette_type', type)
    setPaletteDragging(type)
  }

  // ── Canvas drop from palette ──
  const onCanvasDrop = (e: React.DragEvent) => {
    e.preventDefault()
    const type = e.dataTransfer.getData('palette_type')
    if (!type) return
    const template = PALETTE.find(p => p.type === type)
    if (!template) return
    const [col, row] = pxToCell(e.clientX, e.clientY)
    setElements(prev => [
      ...prev,
      { id: uid(), ...template, x: col, y: row },
    ])
    setPaletteDragging(null)
  }

  // ── Element pointer-down (start move) ──
  const onElementPointerDown = (e: React.PointerEvent, id: string) => {
    e.stopPropagation()
    setSelected(id)
    const el = elements.find(el => el.id === id)
    if (!el) return
    const rect = canvasRef.current?.getBoundingClientRect()
    if (!rect) return
    const offsetX = Math.floor((e.clientX - rect.left) / CELL_PX) - el.x
    const offsetY = Math.floor((e.clientY - rect.top) / CELL_PX) - el.y
    setDragging({ id, offsetX, offsetY })
    ;(e.target as HTMLElement).setPointerCapture(e.pointerId)
  }

  // ── Canvas pointer-move ──
  const onCanvasPointerMove = (e: React.PointerEvent) => {
    if (!dragging) return
    const [col, row] = pxToCell(e.clientX, e.clientY)
    setElements(prev => prev.map(el => {
      if (el.id !== dragging.id) return el
      return {
        ...el,
        x: Math.max(0, Math.min(GRID_COLS - el.w, col - dragging.offsetX)),
        y: Math.max(0, Math.min(GRID_ROWS - el.h, row - dragging.offsetY)),
      }
    }))
  }

  // ── Resize handle pointer-down ──
  const onResizePointerDown = (e: React.PointerEvent, id: string) => {
    e.stopPropagation()
    const el = elements.find(el => el.id === id)
    if (!el) return
    setResizing({ id, startX: e.clientX, startY: e.clientY, startW: el.w, startH: el.h })
    ;(e.target as HTMLElement).setPointerCapture(e.pointerId)
  }

  // ── Global pointer-move for resize ──
  useEffect(() => {
    if (!resizing) return
    const onMove = (e: PointerEvent) => {
      const dCols = Math.round((e.clientX - resizing.startX) / CELL_PX)
      const dRows = Math.round((e.clientY - resizing.startY) / CELL_PX)
      setElements(prev => prev.map(el => {
        if (el.id !== resizing.id) return el
        return {
          ...el,
          w: Math.max(1, Math.min(GRID_COLS - el.x, resizing.startW + dCols)),
          h: Math.max(1, Math.min(GRID_ROWS - el.y, resizing.startH + dRows)),
        }
      }))
    }
    const onUp = () => setResizing(null)
    window.addEventListener('pointermove', onMove)
    window.addEventListener('pointerup', onUp)
    return () => {
      window.removeEventListener('pointermove', onMove)
      window.removeEventListener('pointerup', onUp)
    }
  }, [resizing])

  // ── Delete selected ──
  const deleteSelected = () => {
    if (!selected) return
    setElements(prev => prev.filter(el => el.id !== selected))
    setSelected(null)
  }

  // ── Reset ──
  const reset = () => {
    setElements([])
    setSelected(null)
  }

  // ── Export as PNG via canvas ──
  const exportPNG = () => {
    window.print()
  }

  const selectedEl = elements.find(el => el.id === selected)
  const totalArea = elements.reduce((sum, el) => sum + el.w * el.h, 0)

  return (
    <div className="flex flex-col h-[calc(100vh-56px)] bg-gray-50 dark:bg-gray-950">
      {/* ── Toolbar ── */}
      <div className="flex items-center gap-3 px-4 py-2 bg-white dark:bg-gray-900 border-b border-gray-200 dark:border-gray-800 shrink-0">
        <h1 className="font-bold text-lg hidden sm:block">2D 병원 도면 플래너</h1>
        <span className="text-xs text-gray-500 hidden sm:block">요소를 캔버스에 드래그하여 배치하세요</span>

        <div className="ml-auto flex items-center gap-2">
          <span className="text-xs text-gray-500 bg-gray-100 dark:bg-gray-800 px-2 py-1 rounded-lg">
            {elements.length}개 공간 · {totalArea} 칸
          </span>
          <button
            onClick={() => setShowGrid(v => !v)}
            className={`p-2 rounded-lg transition-colors ${showGrid ? 'bg-blue-100 dark:bg-blue-900/30 text-blue-600' : 'text-gray-500 hover:bg-gray-100 dark:hover:bg-gray-800'}`}
            title="그리드 토글"
          >
            <Grid3x3 className="w-4 h-4" />
          </button>
          <button
            onClick={deleteSelected}
            disabled={!selected}
            className="p-2 rounded-lg text-gray-500 hover:bg-red-50 hover:text-red-500 dark:hover:bg-red-900/20 transition-colors disabled:opacity-30"
            title="선택 삭제"
          >
            <Trash2 className="w-4 h-4" />
          </button>
          <button
            onClick={reset}
            className="p-2 rounded-lg text-gray-500 hover:bg-gray-100 dark:hover:bg-gray-800 transition-colors"
            title="초기화"
          >
            <RotateCcw className="w-4 h-4" />
          </button>
          <button
            onClick={exportPNG}
            className="flex items-center gap-1.5 px-3 py-1.5 rounded-lg bg-blue-600 hover:bg-blue-700 text-white text-sm font-medium transition-colors"
          >
            <Download className="w-4 h-4" />
            내보내기
          </button>
        </div>
      </div>

      <div className="flex flex-1 overflow-hidden">
        {/* ── Left Palette ── */}
        <aside className="w-36 sm:w-44 shrink-0 bg-white dark:bg-gray-900 border-r border-gray-200 dark:border-gray-800 overflow-y-auto p-2">
          <p className="text-xs font-semibold text-gray-500 dark:text-gray-400 px-1 mb-2 mt-1">공간 요소</p>
          <div className="flex flex-col gap-1.5">
            {PALETTE.map(item => (
              <div
                key={item.type}
                draggable
                onDragStart={(e) => onPaletteDragStart(item.type, e)}
                onDragEnd={() => setPaletteDragging(null)}
                className={`flex items-center gap-2 px-2 py-2 rounded-xl cursor-grab active:cursor-grabbing border-2 transition-all select-none ${
                  paletteDragging === item.type
                    ? 'border-blue-400 shadow-md scale-95'
                    : 'border-transparent hover:border-gray-200 dark:hover:border-gray-700'
                }`}
                style={{ backgroundColor: item.color + '60' }}
              >
                <div className="w-3 h-3 rounded-sm shrink-0" style={{ backgroundColor: item.color }} />
                <span className="text-xs font-medium text-gray-800 dark:text-gray-200 truncate">{item.label}</span>
              </div>
            ))}
          </div>
          <div className="mt-4 mx-1 p-2 bg-blue-50 dark:bg-blue-900/20 rounded-xl">
            <div className="flex items-center gap-1 text-blue-600 dark:text-blue-400 mb-1">
              <Info className="w-3 h-3" />
              <span className="text-xs font-semibold">사용법</span>
            </div>
            <p className="text-xs text-gray-500 dark:text-gray-400 leading-relaxed">요소를 드래그해 캔버스에 올려두세요. 선택 후 모서리를 드래그해 크기를 조절할 수 있어요.</p>
          </div>
        </aside>

        {/* ── Canvas Area ── */}
        <main className="flex-1 overflow-auto bg-gray-100 dark:bg-gray-950 flex items-start justify-start p-4">
          <div
            ref={canvasRef}
            className="relative bg-white dark:bg-gray-900 shadow-xl rounded-2xl overflow-hidden shrink-0"
            style={{
              width:  GRID_COLS * CELL_PX,
              height: GRID_ROWS * CELL_PX,
              backgroundImage: showGrid
                ? `linear-gradient(to right, #e5e7eb 1px, transparent 1px), linear-gradient(to bottom, #e5e7eb 1px, transparent 1px)`
                : 'none',
              backgroundSize: `${CELL_PX}px ${CELL_PX}px`,
            }}
            onDragOver={e => e.preventDefault()}
            onDrop={onCanvasDrop}
            onPointerMove={onCanvasPointerMove}
            onPointerUp={() => setDragging(null)}
            onPointerDown={() => setSelected(null)}
          >
            {elements.map(el => (
              <div
                key={el.id}
                onPointerDown={(e) => onElementPointerDown(e, el.id)}
                className={`absolute flex items-center justify-center text-center rounded-lg border-2 cursor-move select-none transition-shadow ${
                  selected === el.id
                    ? 'border-blue-500 shadow-lg ring-2 ring-blue-300/50 z-10'
                    : 'border-white/60 hover:border-gray-400/60 z-0'
                }`}
                style={{
                  left:            el.x * CELL_PX + 1,
                  top:             el.y * CELL_PX + 1,
                  width:           el.w * CELL_PX - 2,
                  height:          el.h * CELL_PX - 2,
                  backgroundColor: el.color + 'CC',
                }}
              >
                <span className="text-xs font-bold text-gray-700 leading-tight px-1 pointer-events-none">
                  {el.label}
                  <br />
                  <span className="font-normal text-gray-500">{el.w}×{el.h}</span>
                </span>

                {/* Resize handle */}
                {selected === el.id && (
                  <div
                    onPointerDown={(e) => onResizePointerDown(e, el.id)}
                    className="absolute bottom-0 right-0 w-4 h-4 bg-blue-500 rounded-tl-lg cursor-se-resize flex items-center justify-center"
                  >
                    <Maximize2 className="w-2.5 h-2.5 text-white" />
                  </div>
                )}
              </div>
            ))}
          </div>
        </main>

        {/* ── Right Properties Panel ── */}
        <aside className="w-44 shrink-0 bg-white dark:bg-gray-900 border-l border-gray-200 dark:border-gray-800 p-3">
          <p className="text-xs font-semibold text-gray-500 dark:text-gray-400 mb-3">속성</p>
          {selectedEl ? (
            <div className="space-y-3">
              <div className="p-3 rounded-xl" style={{ backgroundColor: selectedEl.color + '40' }}>
                <p className="font-bold text-sm">{selectedEl.label}</p>
              </div>
              <div className="space-y-2 text-xs text-gray-600 dark:text-gray-400">
                <div className="flex justify-between">
                  <span>위치 X</span>
                  <span className="font-mono font-semibold">{selectedEl.x}</span>
                </div>
                <div className="flex justify-between">
                  <span>위치 Y</span>
                  <span className="font-mono font-semibold">{selectedEl.y}</span>
                </div>
                <div className="flex justify-between">
                  <span>너비</span>
                  <span className="font-mono font-semibold">{selectedEl.w}칸</span>
                </div>
                <div className="flex justify-between">
                  <span>높이</span>
                  <span className="font-mono font-semibold">{selectedEl.h}칸</span>
                </div>
                <div className="flex justify-between border-t border-gray-100 dark:border-gray-800 pt-2">
                  <span>면적</span>
                  <span className="font-mono font-semibold text-blue-600">{selectedEl.w * selectedEl.h}칸</span>
                </div>
              </div>
              <button
                onClick={deleteSelected}
                className="w-full flex items-center justify-center gap-1.5 py-2 rounded-xl text-xs font-medium text-red-600 bg-red-50 hover:bg-red-100 dark:bg-red-900/20 dark:hover:bg-red-900/40 transition-colors"
              >
                <Trash2 className="w-3.5 h-3.5" /> 삭제
              </button>
            </div>
          ) : (
            <div className="text-center text-xs text-gray-400 dark:text-gray-600 mt-8">
              <Grid3x3 className="w-8 h-8 mx-auto mb-2 opacity-30" />
              요소를 클릭하면 속성이 표시됩니다
            </div>
          )}

          {elements.length > 0 && (
            <div className="mt-6 pt-4 border-t border-gray-100 dark:border-gray-800">
              <p className="text-xs font-semibold text-gray-500 mb-2">배치 현황</p>
              <div className="space-y-1">
                {elements.map(el => (
                  <button
                    key={el.id}
                    onClick={() => setSelected(el.id)}
                    className={`w-full text-left flex items-center gap-2 px-2 py-1.5 rounded-lg text-xs transition-colors ${
                      selected === el.id ? 'bg-blue-50 dark:bg-blue-900/20 text-blue-700 dark:text-blue-300' : 'hover:bg-gray-50 dark:hover:bg-gray-800 text-gray-600 dark:text-gray-400'
                    }`}
                  >
                    <div className="w-2.5 h-2.5 rounded-sm shrink-0" style={{ backgroundColor: el.color }} />
                    <span className="truncate">{el.label}</span>
                  </button>
                ))}
              </div>
            </div>
          )}
        </aside>
      </div>
    </div>
  )
}
