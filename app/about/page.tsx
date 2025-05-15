"use client"

import { useEffect } from 'react'
import { useRouter } from 'next/navigation'
import { useAdminStore } from '@/lib/store'
import { MapPin, Mail, Phone, Clock, Users, Building, Globe } from 'lucide-react'
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card'

const stats = [
  {
    label: "Products",
    value: "50+",
    description: "Premium electronic products"
  },
  {
    label: "Revenue",
    value: "3M+",
    description: "Annual revenue in electronics sales"
  },
  {
    label: "Customers",
    value: "100+",
    description: "Satisfied global customers"
  }
]

const team = [
  {
    name: "John Anderson",
    role: "CEO & Founder",
    image: "https://images.unsplash.com/photo-1560250097-0b93528c311a?ixlib=rb-1.2.1&auto=format&fit=crop&w=500&q=80",
    description: "15+ years of experience in consumer electronics and retail technology."
  },
  {
    name: "Sarah Chen",
    role: "CTO",
    image: "https://images.unsplash.com/photo-1573497019940-1c28c88b4f3e?ixlib=rb-1.2.1&auto=format&fit=crop&w=500&q=80",
    description: "Expert in VR/AR technology and emerging tech trends."
  },
  {
    name: "Michael Rodriguez",
    role: "Head of Sales",
    image: "https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?ixlib=rb-1.2.1&auto=format&fit=crop&w=500&q=80",
    description: "Specializes in enterprise solutions and customer relations."
  }
]

export default function About() {
  const router = useRouter()
  const { isAuthenticated, userRole } = useAdminStore()

  useEffect(() => {
    if (!isAuthenticated) {
      router.push('/admin/login')
    } else if (userRole === 'admin') {
      router.push('/admin/dashboard')
    }
  }, [isAuthenticated, userRole, router])

  if (!isAuthenticated || userRole === 'admin') {
    return null
  }

  return (
    <div className="min-h-screen bg-custom-base">
      {/* Hero Section */}
      <section className="relative py-20 px-4 bg-gradient-to-b from-custom-base to-custom-sub-base">
        <div className="max-w-7xl mx-auto text-center">
          <h1 className="text-4xl font-bold text-custom-title mb-6">
            ABOUT NEXGEN ELECTRONICS
          </h1>
          <p className="text-xl text-custom-subtitle max-w-3xl mx-auto">
            Your trusted partner in cutting-edge technology. We specialize in bringing the latest 
            innovations in VR, AR, AI, and smart devices to tech enthusiasts and businesses alike.
          </p>
        </div>
      </section>

      {/* Stats Section */}
      <section className="py-16 bg-custom-base">
        <div className="max-w-7xl mx-auto px-4">
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            {stats.map((stat, index) => (
              <div key={index} className="p-6 bg-custom-sub-base/50 rounded-2xl backdrop-blur-sm border border-custom-title/20 transform hover:scale-105 transition-all duration-300">
                <p className="text-4xl font-bold text-custom-title">{stat.value}</p>
                <p className="text-lg font-semibold text-custom-subtitle mt-2">{stat.label}</p>
                <p className="text-custom-subtitle/80 mt-1">{stat.description}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Team Section */}
      <section className="py-16 bg-custom-base">
        <div className="max-w-7xl mx-auto px-4">
          <h2 className="text-3xl font-bold text-center mb-12 text-custom-title">OUR TEAM</h2>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            {team.map((member) => (
              <div key={member.name} className="bg-custom-sub-base/50 rounded-2xl overflow-hidden shadow-lg transform hover:scale-105 transition-all duration-300 border border-custom-title/20">
                <img
                  src={member.image}
                  alt={member.name}
                  className="w-full h-64 object-cover"
                />
                <div className="p-6">
                  <h3 className="text-xl font-bold text-custom-title">{member.name}</h3>
                  <p className="text-custom-subtitle font-medium mb-3">{member.role}</p>
                  <p className="text-custom-subtitle/80">{member.description}</p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>
    </div>
  )
}