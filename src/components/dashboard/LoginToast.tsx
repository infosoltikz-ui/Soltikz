"use client"

import { useSearchParams, useRouter } from 'next/navigation'
import { useEffect, Suspense } from 'react'
import { toast } from 'react-hot-toast'

function ToastLogic() {
  const searchParams = useSearchParams()
  const router = useRouter()

  useEffect(() => {
    if (searchParams.get('login') === 'success') {
      toast.success('Successfully logged in!')
      router.replace('/dashboard')
    }
  }, [searchParams, router])

  return null
}

export function LoginToast() {
  return (
    <Suspense fallback={null}>
      <ToastLogic />
    </Suspense>
  )
}
