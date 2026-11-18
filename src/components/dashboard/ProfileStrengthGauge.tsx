'use client'

import { useEffect, useState } from 'react'

interface ProfileStrengthGaugeProps {
  score?: number
}

export function ProfileStrengthGauge({ score = 79 }: ProfileStrengthGaugeProps) {
  const [displayScore, setDisplayScore] = useState(0)
  const ringCircumference = 194.8
  const targetOffset = Math.max(0, Math.round(ringCircumference * (1 - score / 100)))
  const [offset, setOffset] = useState(ringCircumference)

  useEffect(() => {
    // Animate circular SVG stroke smoothly to target
    const timer = setTimeout(() => {
      setOffset(targetOffset)
    }, 120)

    // Animate live score counter from 0 to target score
    let startTimestamp: number | null = null
    const duration = 1400 // 1.4 seconds smooth ease-out animation

    const step = (timestamp: number) => {
      if (!startTimestamp) startTimestamp = timestamp
      const progress = Math.min((timestamp - startTimestamp) / duration, 1)

      // Smooth ease-out cubic curve: slows down gracefully near the end
      const easeOut = 1 - Math.pow(1 - progress, 3)
      const current = Math.round(easeOut * score)

      setDisplayScore(current)

      if (progress < 1) {
        window.requestAnimationFrame(step)
      }
    }

    const animFrame = window.requestAnimationFrame(step)

    return () => {
      clearTimeout(timer)
      window.cancelAnimationFrame(animFrame)
    }
  }, [score, targetOffset])

  return (
    <div
      className="gauge-circle select-none"
      style={{
        width: '74px',
        height: '74px',
        flex: 'none',
        position: 'relative',
        border: 'none',
        outline: 'none',
        boxShadow: 'none',
      }}
    >
      <svg
        width="74"
        height="74"
        viewBox="0 0 74 74"
        style={{
          transform: 'rotate(-90deg)',
          border: 'none',
          outline: 'none',
          boxShadow: 'none',
        }}
      >
        <circle
          cx="37"
          cy="37"
          r="31"
          fill="none"
          stroke="var(--line-soft)"
          strokeWidth="7"
        />
        <circle
          cx="37"
          cy="37"
          r="31"
          fill="none"
          stroke="var(--brand)"
          strokeWidth="7"
          strokeLinecap="round"
          strokeDasharray={ringCircumference}
          strokeDashoffset={offset}
          style={{
            transition: 'stroke-dashoffset 1.4s cubic-bezier(0.16, 1, 0.3, 1)',
          }}
        />
      </svg>
      <div
        className="val num"
        style={{
          position: 'absolute',
          inset: 0,
          display: 'grid',
          placeItems: 'center',
          fontSize: '18px',
          fontWeight: 700,
          letterSpacing: '-0.03em',
          border: 'none',
          outline: 'none',
          boxShadow: 'none',
        }}
      >
        {displayScore}
      </div>
    </div>
  )
}

