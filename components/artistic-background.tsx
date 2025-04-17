"use client"

import { useTheme } from "next-themes"
import { useEffect, useRef, useState } from "react"

export default function ArtisticBackground() {
  const { theme } = useTheme()
  const [mounted, setMounted] = useState(false)
  const [mousePosition, setMousePosition] = useState({ x: 0, y: 0 })
  const canvasRef = useRef<HTMLCanvasElement>(null)
  const requestRef = useRef<number>()
  const previousTimeRef = useRef<number>()
  const [dimensions, setDimensions] = useState({ width: 0, height: 0 })

  useEffect(() => {
    setMounted(true)
    setDimensions({
      width: window.innerWidth,
      height: window.innerHeight,
    })

    const handleResize = () => {
      setDimensions({
        width: window.innerWidth,
        height: window.innerHeight,
      })
    }

    const handleMouseMove = (e: MouseEvent) => {
      setMousePosition({
        x: e.clientX,
        y: e.clientY,
      })
    }

    window.addEventListener("resize", handleResize)
    window.addEventListener("mousemove", handleMouseMove)

    return () => {
      window.removeEventListener("resize", handleResize)
      window.removeEventListener("mousemove", handleMouseMove)
      if (requestRef.current) {
        cancelAnimationFrame(requestRef.current)
      }
    }
  }, [])

  useEffect(() => {
    if (!mounted) return

    const canvas = canvasRef.current
    if (!canvas) return

    const ctx = canvas.getContext("2d")
    if (!ctx) return

    // 设置画布尺寸
    canvas.width = dimensions.width
    canvas.height = dimensions.height

    // 定义颜色
    const isDark = theme === "dark"
    const primaryColor = isDark ? "rgba(255, 255, 255, 0.03)" : "rgba(0, 0, 0, 0.02)"
    const accentColor = isDark ? "rgba(99, 102, 241, 0.05)" : "rgba(79, 70, 229, 0.03)"

    // 波浪线参数
    const waves = [
      { amplitude: 20, frequency: 0.02, speed: 0.001, color: primaryColor },
      { amplitude: 15, frequency: 0.03, speed: 0.002, color: accentColor },
      { amplitude: 10, frequency: 0.01, speed: -0.001, color: primaryColor },
    ]

    // 动态点参数
    const points = Array.from({ length: 20 }, () => ({
      x: Math.random() * dimensions.width,
      y: Math.random() * dimensions.height,
      radius: Math.random() * 1 + 0.5,
      xSpeed: (Math.random() - 0.5) * 0.3,
      ySpeed: (Math.random() - 0.5) * 0.3,
      color: Math.random() > 0.5 ? primaryColor : accentColor,
    }))

    // 动画函数
    let time = 0
    const animate = (timestamp: number) => {
      if (previousTimeRef.current === undefined) {
        previousTimeRef.current = timestamp
      }

      const deltaTime = timestamp - previousTimeRef.current
      previousTimeRef.current = timestamp
      time += deltaTime * 0.01

      // 清除画布
      ctx.clearRect(0, 0, canvas.width, canvas.height)

      // 绘制波浪线
      for (let i = 0; i < waves.length; i++) {
        const wave = waves[i]

        // 水平波浪线
        for (let y = 0; y < canvas.height; y += 80) {
          ctx.beginPath()
          ctx.strokeStyle = wave.color
          ctx.lineWidth = 1

          for (let x = 0; x < canvas.width; x += 5) {
            const distanceToMouse = Math.sqrt(Math.pow(x - mousePosition.x, 2) + Math.pow(y - mousePosition.y, 2))

            // 鼠标影响因子
            const mouseFactor = Math.max(0, 1 - distanceToMouse / 200) * 10

            const yOffset =
              wave.amplitude * Math.sin(x * wave.frequency + time * wave.speed) +
              mouseFactor * Math.sin(distanceToMouse * 0.05)

            if (x === 0) {
              ctx.moveTo(x, y + yOffset)
            } else {
              ctx.lineTo(x, y + yOffset)
            }
          }
          ctx.stroke()
        }

        // 垂直波浪线
        for (let x = 0; x < canvas.width; x += 120) {
          ctx.beginPath()
          ctx.strokeStyle = wave.color
          ctx.lineWidth = 1

          for (let y = 0; y < canvas.height; y += 5) {
            const distanceToMouse = Math.sqrt(Math.pow(x - mousePosition.x, 2) + Math.pow(y - mousePosition.y, 2))

            // 鼠标影响因子
            const mouseFactor = Math.max(0, 1 - distanceToMouse / 200) * 10

            const xOffset =
              wave.amplitude * Math.sin(y * wave.frequency + time * wave.speed) +
              mouseFactor * Math.sin(distanceToMouse * 0.05)

            if (y === 0) {
              ctx.moveTo(x + xOffset, y)
            } else {
              ctx.lineTo(x + xOffset, y)
            }
          }
          ctx.stroke()
        }
      }

      // 绘制动态点
      points.forEach((point) => {
        // 更新位置
        point.x += point.xSpeed
        point.y += point.ySpeed

        // 边界检查
        if (point.x < 0 || point.x > dimensions.width) point.xSpeed *= -1
        if (point.y < 0 || point.y > dimensions.height) point.ySpeed *= -1

        // 绘制点
        ctx.beginPath()
        ctx.arc(point.x, point.y, point.radius, 0, Math.PI * 2)
        ctx.fillStyle = point.color
        ctx.fill()

        // 绘制连接线
        points.forEach((otherPoint) => {
          const distance = Math.sqrt(Math.pow(point.x - otherPoint.x, 2) + Math.pow(point.y - otherPoint.y, 2))

          if (distance < 100) {
            ctx.beginPath()
            ctx.moveTo(point.x, point.y)
            ctx.lineTo(otherPoint.x, otherPoint.y)
            ctx.strokeStyle = `rgba(${isDark ? "255, 255, 255" : "0, 0, 0"}, ${0.02 * (1 - distance / 100)})`
            ctx.stroke()
          }
        })
      })

      requestRef.current = requestAnimationFrame(animate)
    }

    requestRef.current = requestAnimationFrame(animate)

    return () => {
      if (requestRef.current) {
        cancelAnimationFrame(requestRef.current)
      }
    }
  }, [dimensions, mousePosition, theme, mounted])

  return (
    <>
      <canvas
        ref={canvasRef}
        className="fixed top-0 left-0 w-full h-full -z-10 pointer-events-none"
        aria-hidden="true"
      />
      <div
        className="fixed top-0 left-0 w-full h-full -z-20 bg-gradient-to-br from-transparent via-transparent to-accent/5 pointer-events-none"
        aria-hidden="true"
      />
    </>
  )
}
