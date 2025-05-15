"use client"

import { usePathname } from 'next/navigation'
import { useAdminStore } from '@/lib/store'

export default function Footer() {
  const pathname = usePathname()
  const { isAuthenticated, userRole } = useAdminStore()

  // Don't show footer on login page or for admin users
  if (pathname === '/admin/login' || 
      pathname === '/admin/forgot-password' || 
      !isAuthenticated || 
      userRole === 'admin') {
    return null
  }

  return (
    <footer className="bg-custom-base border-t border-custom-title/20">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          <div>
            <h3 className="text-lg font-semibold mb-4 text-custom-title">About Us</h3>
            <p className="text-custom-subtitle">
              NexGen Electronics is your trusted partner for cutting-edge technology and innovative electronic solutions.
            </p>
          </div>
          <div>
            <h3 className="text-lg font-semibold mb-4 text-custom-title">Quick Links</h3>
            <ul className="space-y-2">
              <li>
                <a href="/" className="text-custom-subtitle hover:text-custom-title transition-colors">Home</a>
              </li>
              <li>
                <a href="/shop" className="text-custom-subtitle hover:text-custom-title transition-colors">Shop</a>
              </li>
              <li>
                <a href="/profile" className="text-custom-subtitle hover:text-custom-title transition-colors">Profile</a>
              </li>
            </ul>
          </div>
          <div>
            <h3 className="text-lg font-semibold mb-4 text-custom-title">Contact Us</h3>
            <ul className="space-y-2 text-custom-subtitle">
              <li>Email: info@nexgen-electronics.com</li>
              <li>Phone: (123) 456-7890</li>
              <li>Address: 123 Tech Street, Digital City</li>
            </ul>
          </div>
        </div>
        <div className="mt-8 pt-8 border-t border-custom-title/20 text-center text-custom-subtitle">
          <p>&copy; {new Date().getFullYear()} NexGen Electronics. All rights reserved.</p>
        </div>
      </div>
    </footer>
  )
}