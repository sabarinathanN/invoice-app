'use client'
import { useSession } from 'next-auth/react'
import { useRouter } from 'next/navigation'
import NextTopLoader from 'nextjs-toploader'

const Layout = ({ children }: { children: React.ReactNode }) => {
  const { status } = useSession()
  const router = useRouter()

  if (status == 'unauthenticated') {
    router.push('/auth/login')
    return
  }
  if (status == 'loading') {
    return <NextTopLoader color='#2864e6' showSpinner={false} />
  }

  return <>{children}</>
}

export default Layout
