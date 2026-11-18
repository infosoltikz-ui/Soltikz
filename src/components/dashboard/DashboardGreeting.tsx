'use client'

import { useState, useEffect } from 'react'

interface DashboardGreetingProps {
  name: string
  subtitle?: string
}

export function DashboardGreeting({ name, subtitle }: DashboardGreetingProps) {
  const getGreeting = () => {
    const hour = new Date().getHours()
    if (hour >= 5 && hour < 12) return 'Good morning'
    if (hour >= 12 && hour < 17) return 'Good afternoon'
    if (hour >= 17 && hour < 22) return 'Good evening'
    return 'Good evening'
  }

  const [greeting, setGreeting] = useState<string>(getGreeting)

  useEffect(() => {
    // Immediately calculate from user's actual browser local clock
    setGreeting(getGreeting())

    // Update dynamically every 30 seconds
    const interval = setInterval(() => {
      setGreeting(getGreeting())
    }, 30000)

    return () => clearInterval(interval)
  }, [])

  return (
    <div>
      <h1
        className="text-2xl font-bold tracking-tight"
        style={{ color: 'var(--ink)' }}
      >
        {greeting}, {name}
      </h1>
      {subtitle && (
        <p
          className="sub text-[13.5px] mt-1"
          style={{ color: 'var(--ink-2)' }}
        >
          {subtitle}
        </p>
      )}
    </div>
  )
}
