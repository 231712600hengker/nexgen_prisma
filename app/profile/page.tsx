"use client"

import { MapPin, Mail, Phone, Clock, Users, Building, Globe, Store, CreditCard } from 'lucide-react'
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

const steps = [
  {
    icon: Store,
    title: "Visit Our Store",
    description: "Come to our physical store to see and try our products directly. Our team is ready to help you choose the right product."
  },
  {
    icon: Clock,
    title: "Operating Hours",
    description: "We are open Monday-Saturday, 09:00-21:00. Sundays and holidays 10:00-20:00."
  },
  {
    icon: CreditCard,
    title: "Payment Methods",
    description: "We accept cash, debit/credit cards, and bank transfers. Payments can be made directly at the store."
  }
]

const contactInfo = [
  {
    icon: MapPin,
    label: "Address",
    value: "123 Tech Street, Digital City, Jakarta 12345"
  },
  {
    icon: Mail,
    label: "Email",
    value: "contact@nexgenelectronics.com"
  },
  {
    icon: Phone,
    label: "Phone",
    value: "+62 (021) 123-4567"
  },
  {
    icon: Clock,
    label: "Hours",
    value: "Mon-Fri: 9AM-6PM"
  }
]

export default function Profile() {
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

      {/* How to Buy Section */}
      <section className="py-16 bg-custom-sub-base">
        <div className="max-w-7xl mx-auto px-4">
          <h2 className="text-3xl font-bold text-center mb-12 text-custom-title">HOW TO BUY</h2>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            {steps.map((step, index) => (
              <Card key={index} className="bg-custom-base/50 backdrop-blur-lg border-custom-title/20">
                <CardHeader>
                  <step.icon className="w-12 h-12 text-custom-title mb-4" />
                  <CardTitle className="text-custom-title">{step.title}</CardTitle>
                </CardHeader>
                <CardContent>
                  <p className="text-custom-subtitle">{step.description}</p>
                </CardContent>
              </Card>
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

      {/* Contact Section */}
      <section className="py-16 bg-custom-sub-base">
        <div className="max-w-7xl mx-auto px-4">
          <h2 className="text-3xl font-bold text-center mb-12 text-custom-title">CONTACT US</h2>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
            {contactInfo.map((info, index) => (
              <div key={index} className="text-center bg-custom-base/50 p-6 rounded-2xl backdrop-blur-sm border border-custom-title/20 transform hover:scale-105 transition-all duration-300">
                <div className="inline-flex items-center justify-center w-12 h-12 rounded-full bg-custom-sub-base mb-4 border border-custom-title/20">
                  <info.icon className="w-6 h-6 text-custom-title" />
                </div>
                <h3 className="font-semibold text-custom-title mb-2">{info.label}</h3>
                <p className="text-custom-subtitle">{info.value}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Map Section */}
      <section className="py-16 bg-custom-base">
        <div className="max-w-7xl mx-auto px-4">
          <div className="bg-custom-sub-base/50 rounded-2xl overflow-hidden shadow-lg border border-custom-title/20">
            <iframe
              src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d3966.2834256722337!2d106.82707107575666!3d-6.226305661705123!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x2e69f3f3a3b08b67%3A0x91e92c99f032a79!2sJl.%20Gatot%20Subroto%2C%20Daerah%20Khusus%20Ibukota%20Jakarta!5e0!3m2!1sen!2sid!4v1709900000000!5m2!1sen!2sid"
              width="100%"
              height="400"
              style={{ border: 0 }}
              allowFullScreen
              loading="lazy"
              referrerPolicy="no-referrer-when-downgrade"
            ></iframe>
          </div>
        </div>
      </section>
    </div>
  )
}