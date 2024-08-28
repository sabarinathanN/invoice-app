'use client'
import { useEffect, useRef } from 'react'
import Link from 'next/link'
import Image from 'next/image'
import { getHorizontalMenuItems, getMenuItems } from '@/helpers/menu'
import { OffcanvasLayout } from '@/components'
import AppMenu from './Menu'
import VerticalMenu from './VerticalMenu'
import { useToggle } from '@/hooks'
import ithotsLogo from "../../app/(pages)/(public)/images/iThots-Logo.png"

//images
import logoDark from '@/assets/images/logo-dark.png'
import { FaBars, FaXmark } from 'react-icons/fa6'

const Navbar = () => {
  const [isOpenOffcanvas, toggleOffcanvas, _openOffcanvas, closeOffcanvas] =
    useToggle()

  const navbarRef = useRef<HTMLDivElement>(null)

  useEffect(() => {
    document.addEventListener('scroll', (e) => {
      e.preventDefault()
      if (navbarRef.current) {
        if (window.scrollY >= 80)
          navbarRef.current.classList.add('bg-white', 'shadow', 'lg:bg-white')
        else
          navbarRef.current.classList.remove(
            'bg-white',
            'shadow',
            'lg:bg-white'
          )
      }
    })
  }, [])

  return (
    <>
      <header
        id="navbar"
        ref={navbarRef}
        className="fixed top-0 inset-x-0 flex items-center z-40 w-full lg:bg-transparent bg-white transition-all py-5"
      >
        <div className="container w-10/12">
          <nav className="flex items-center">
            <Link href="/">
              <Image src={ithotsLogo} className="h-8" width={126} alt="Logo" />
            </Link>
            <div className="lg:block hidden ms-auto">
             <ul className='flex'>
              <li className='ml-4'>
                <Link href={'/'}>Home</Link>
                
              </li>
              <li className='ml-4'>
                <Link href={'/company'}>Company</Link>
              </li>
              <li className='ml-4'>
                <Link href={'/clientlist'}>Client</Link>
              </li>
              <li className='ml-4'>
                <Link href={'/invoice'}>Invoice</Link>
              </li>
             </ul>
            </div>
            
            <div className="lg:hidden flex items-center ms-auto px-2.5">
              <button type="button" onClick={toggleOffcanvas}>
                <FaBars size={24} />
              </button>
            </div>
          </nav>
        </div>
      </header>
      <OffcanvasLayout
        placement="end"
        sizeClassName="w-[447px] bg-white border-s"
        open={isOpenOffcanvas}
        toggleOffcanvas={closeOffcanvas}
      >
        <div className="flex flex-col h-[100vh] divide-y-2 divide-gray-200">
          {/* Mobile Menu Topbar Logo (Header) */}
          <div className="p-6 flex items-center justify-between">
            <Link href="/">
              <Image src={logoDark} width={126} className="h-8" alt="Logo" />
            </Link>
            <button className="flex items-center px-2" onClick={closeOffcanvas}>
              <FaXmark size={20} />
            </button>
          </div>
          {/* Mobile Menu Link List */}
          <div className="p-6 overflow-scroll h-full" id="right-menu">
            <VerticalMenu menuItems={getMenuItems()} />
          </div>
          {/* Mobile Menu Download Button (Footer) */}
          <div className="p-6 flex items-center justify-center">
            <Link
              target="_blank"
              href="https://themeforest.net/item/prompt-tailwind-css-multipurpose-landing-template/46369753"
              className="bg-primary w-full text-white p-3 rounded flex items-center justify-center text-sm"
            >
              Download
            </Link>
          </div>
        </div>
      </OffcanvasLayout>
    </>
  )
}

export default Navbar
