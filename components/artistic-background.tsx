"use client"

import { useEffect, useRef, useState } from "react"

const r180 = Math.PI
const r90 = Math.PI / 2
const r15 = Math.PI / 12
const color = "#88888825"

interface BranchStep {
  x: number
  y: number
  rad: number
  counter: { value: number }
}

export default function ArtisticBackground() {
  const canvasRef = useRef<HTMLCanvasElement>(null)
  const [dimensions, setDimensions] = useState({ width: 0, height: 0 })
  const [stopped, setStopped] = useState(false)
  const animationFrameRef = useRef<number>()
  const stepsRef = useRef<BranchStep[]>([])
  const prevStepsRef = useRef<BranchStep[]>([])
  const lastTimeRef = useRef(performance.now())
  const MIN_BRANCH = 30
  const len = 6

  // 初始化画布
  const initCanvas = (canvas: HTMLCanvasElement, width: number, height: number) => {
    const ctx = canvas.getContext("2d")!
    const dpr = window.devicePixelRatio || 1
    const bsr =
      (ctx as any).webkitBackingStorePixelRatio ||
      (ctx as any).mozBackingStorePixelRatio ||
      (ctx as any).msBackingStorePixelRatio ||
      (ctx as any).oBackingStorePixelRatio ||
      (ctx as any).backingStorePixelRatio ||
      1

    const dpi = dpr / bsr

    canvas.style.width = `${width}px`
    canvas.style.height = `${height}px`
    canvas.width = dpi * width
    canvas.height = dpi * height
    ctx.scale(dpi, dpi)

    return { ctx, dpi }
  }

  // 极坐标转笛卡尔坐标
  const polar2cart = (x = 0, y = 0, r = 0, theta = 0) => {
    const dx = r * Math.cos(theta)
    const dy = r * Math.sin(theta)
    return [x + dx, y + dy]
  }

  // 创建分支步骤
  const createStep = (x: number, y: number, rad: number, counter: { value: number } = { value: 0 }) => {
    const length = Math.random() * len
    counter.value += 1

    const [nx, ny] = polar2cart(x, y, length, rad)

    const ctx = canvasRef.current?.getContext("2d")
    if (!ctx) return

    ctx.beginPath()
    ctx.moveTo(x, y)
    ctx.lineTo(nx, ny)
    ctx.stroke()

    const rad1 = rad + Math.random() * r15
    const rad2 = rad - Math.random() * r15

    // 检查是否超出边界
    if (nx < -100 || nx > dimensions.width + 100 || ny < -100 || ny > dimensions.height + 100) return

    const rate = counter.value <= MIN_BRANCH ? 0.8 : 0.5

    // 左侧分支
    if (Math.random() < rate) {
      stepsRef.current.push({ x: nx, y: ny, rad: rad1, counter })
    }

    // 右侧分支
    if (Math.random() < rate) {
      stepsRef.current.push({ x: nx, y: ny, rad: rad2, counter })
    }
  }

  // 动画帧
  const frame = () => {
    const interval = 1000 / 40 // 40fps

    if (performance.now() - lastTimeRef.current < interval) {
      animationFrameRef.current = requestAnimationFrame(frame)
      return
    }

    prevStepsRef.current = stepsRef.current
    stepsRef.current = []
    lastTimeRef.current = performance.now()

    if (!prevStepsRef.current.length) {
      setStopped(true)
      return
    }

    // 执行上一帧的所有步骤
    prevStepsRef.current.forEach((step) => {
      // 50%的概率保留步骤到下一帧，创造更有机的外观
      if (Math.random() < 0.5) {
        stepsRef.current.push(step)
      } else {
        createStep(step.x, step.y, step.rad, step.counter)
      }
    })

    animationFrameRef.current = requestAnimationFrame(frame)
  }

  // 开始动画
  const startAnimation = () => {
    if (!canvasRef.current) return

    const canvas = canvasRef.current
    const { ctx } = initCanvas(canvas, dimensions.width, dimensions.height)
    const { width, height } = canvas

    ctx.clearRect(0, 0, width, height)
    ctx.lineWidth = 1
    ctx.strokeStyle = color

    prevStepsRef.current = []
    stepsRef.current = []

    // 随机中间值 0.2 - 0.8
    const randomMiddle = () => Math.random() * 0.6 + 0.2

    // 创建初始分支
    const initialSteps = [
      { x: randomMiddle() * dimensions.width, y: -5, rad: r90, counter: { value: 0 } },
      { x: randomMiddle() * dimensions.width, y: dimensions.height + 5, rad: -r90, counter: { value: 0 } },
      { x: -5, y: randomMiddle() * dimensions.height, rad: 0, counter: { value: 0 } },
      { x: dimensions.width + 5, y: randomMiddle() * dimensions.height, rad: r180, counter: { value: 0 } },
    ]

    // 在小屏幕上只使用两个分支
    if (dimensions.width < 500) {
      initialSteps.slice(0, 2).forEach((step) => stepsRef.current.push(step))
    } else {
      initialSteps.forEach((step) => stepsRef.current.push(step))
    }

    setStopped(false)
    lastTimeRef.current = performance.now()
    animationFrameRef.current = requestAnimationFrame(frame)
  }

  // 监听窗口大小变化
  useEffect(() => {
    const handleResize = () => {
      setDimensions({
        width: window.innerWidth,
        height: window.innerHeight,
      })
    }

    handleResize()
    window.addEventListener("resize", handleResize)

    return () => {
      window.removeEventListener("resize", handleResize)
      if (animationFrameRef.current) {
        cancelAnimationFrame(animationFrameRef.current)
      }
    }
  }, [])

  // 初始化动画
  useEffect(() => {
    if (dimensions.width > 0 && dimensions.height > 0) {
      startAnimation()
    }
  }, [dimensions])

  return (
    <div
      className="fixed top-0 bottom-0 left-0 right-0 pointer-events-none print:hidden"
      style={{ zIndex: -1 }}
    >
      <canvas
        ref={canvasRef}
        className="w-full h-full"
        style={{
          maskImage: "radial-gradient(circle, transparent, black)",
          WebkitMaskImage: "radial-gradient(circle, transparent, black)",
        }}
      />
    </div>
  )
}


// inspired by: https://github.com/antfu/antfu.me/blob/main/src/components/ArtPlum.vue
