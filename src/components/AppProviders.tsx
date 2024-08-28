'use client'
import { Fragment, ReactNode, useEffect } from 'react'
import Aos from 'aos'

/**
 * You can put here all the Providers which are using useContext
 */
const AppProviders = ({ children }: { children: ReactNode }) => {
  useEffect(() => {
    Aos.init()
    import('preline')

    if (document) {
      const e = document.querySelector<HTMLDivElement>('#__next_splash')
      if (e?.hasChildNodes()) {
        document.querySelector('#splash-screen')?.classList.add('remove')
      }
      e?.addEventListener('DOMNodeInserted', () => {
        document.querySelector('#splash-screen')?.classList.add('remove')
      })
    }

  }, [])

  return (
    <Fragment>
      {children}
    </Fragment>
  )
}

export default AppProviders
