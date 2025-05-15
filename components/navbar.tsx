"use client"

import { useState } from 'react'
import Link from 'next/link'
import { usePathname, useRouter } from 'next/navigation'
import Image from 'next/image'
import { useAdminStore } from '@/lib/store'
import { Button } from '@/components/ui/button'

const Navbar = () => {
  const pathname = usePathname()
  const router = useRouter()
  const [isMenuOpen, setIsMenuOpen] = useState(false)
  const { isAuthenticated, userRole, logout } = useAdminStore()

  // Don't show navbar on login page or for admin users
  if (pathname === '/admin/login' || 
      pathname === '/admin/forgot-password' || 
      !isAuthenticated || 
      userRole === 'admin') {
    return null
  }

  const navigation = [
    { name: 'Home', href: '/' },
    { name: 'Shop', href: '/shop' },
    { name: 'About', href: '/about' },
    { name: 'Contact', href: '/contact' },
  ]

  return (
    <nav className="bg-custom-base border-b border-custom-title/20">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between h-16">
          <div className="flex items-center">
            <Link href="/" className="flex items-center">
              <Image
                src="/logo.png"
                alt="NexGen Electronics Logo"
                width={40}
                height={40}
                className="rounded-full"
              />
              <span className="ml-2 text-xl font-bold text-custom-title">NexGen Electronics</span>
            </Link>
          </div>

          {/* Desktop Menu */}
          <div className="hidden md:flex items-center space-x-4">
            <div className="flex space-x-4">
              {navigation.map((item) => (
                <Link
                  key={item.name}
                  href={item.href}
                  className={`px-3 py-2 rounded-full text-sm font-medium transition-all duration-300 ${
                    pathname === item.href
                      ? 'bg-custom-sub-base text-custom-title border border-custom-title/20'
                      : 'text-custom-subtitle hover:bg-custom-sub-base hover:text-custom-title'
                  }`}
                >
                  {item.name}
                </Link>
              ))}
            </div>
            <Button
              onClick={() => {
                logout()
                router.push('/admin/login')
              }}
              className="px-3 py-2 rounded-full text-sm font-medium bg-custom-sub-base text-custom-title hover:bg-custom-base border border-custom-title/20 transition-all duration-300"
            >
              Logout
            </Button>
          </div>

          {/* Mobile menu button */}
          <div className="md:hidden">
            <button
              onClick={() => setIsMenuOpen(!isMenuOpen)}
              className="inline-flex items-center justify-center p-2 rounded-full text-custom-subtitle hover:text-custom-title hover:bg-custom-sub-base focus:outline-none transition-all duration-300"
            >
              <span className="sr-only">Open main menu</span>
              <svg
                className={`${isMenuOpen ? 'hidden' : 'block'} h-6 w-6`}
                xmlns="http://www.w3.org/2000/svg"
                fill="none"
                viewBox="0 0 24 24"
                stroke="currentColor"
              >
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 6h16M4 12h16M4 18h16" />
              </svg>
              <svg
                className={`${isMenuOpen ? 'block' : 'hidden'} h-6 w-6`}
                xmlns="http://www.w3.org/2000/svg"
                fill="none"
                viewBox="0 0 24 24"
                stroke="currentColor"
              >
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
              </svg>
            </button>
          </div>
        </div>
      </div>

      {/* Mobile menu */}
      <div className={`${isMenuOpen ? 'block' : 'hidden'} md:hidden bg-custom-sub-base border-t border-custom-title/20`}>
        <div className="px-2 pt-2 pb-3 space-y-1 sm:px-3">
          {navigation.map((item) => (
            <Link
              key={item.name}
              href={item.href}
              className={`block px-3 py-2 rounded-full text-base font-medium transition-all duration-300 ${
                pathname === item.href
                  ? 'bg-custom-base text-custom-title border border-custom-title/20'
                  : 'text-custom-subtitle hover:bg-custom-base hover:text-custom-title'
              }`}
            >
              {item.name}
            </Link>
          ))}
          <Button
            onClick={() => {
              logout()
              router.push('/admin/login')
            }}
            className="block w-full px-3 py-2 rounded-full text-base font-medium bg-custom-base text-custom-title hover:bg-custom-sub-base border border-custom-title/20 transition-all duration-300"
          >
            Logout
          </Button>
        </div>
      </div>
    </nav>
  )
}

export default Navbar