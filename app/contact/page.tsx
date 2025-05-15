"use client"

import { useEffect } from 'react'
import { useRouter } from 'next/navigation'
import { useAdminStore } from '@/lib/store'
import { MapPin, Mail, Phone, Clock } from 'lucide-react'
import { Card, CardContent } from '@/components/ui/card'
import { Input } from '@/components/ui/input'
import { Button } from '@/components/ui/button'
import { useToast } from '@/hooks/use-toast'

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

export default function Contact() {
  const router = useRouter()
  const { isAuthenticated, userRole } = useAdminStore()
  const { toast } = useToast()

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

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault()
    toast({
      title: "Message sent",
      description: "We'll get back to you as soon as possible!",
    })
  }

  return (
    <div className="min-h-screen bg-custom-base">
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

      <section className="py-16 bg-custom-base">
        <div className="max-w-3xl mx-auto px-4">
          <Card className="bg-custom-sub-base/50 backdrop-blur-sm border-custom-title/20">
            <CardContent className="p-6">
              <form onSubmit={handleSubmit} className="space-y-6">
                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                  <Input
                    placeholder="Your Name"
                    className="bg-custom-base/50 border-custom-title/20 text-custom-title placeholder:text-custom-subtitle/60"
                  />
                  <Input
                    type="email"
                    placeholder="Your Email"
                    className="bg-custom-base/50 border-custom-title/20 text-custom-title placeholder:text-custom-subtitle/60"
                  />
                </div>
                <Input
                  placeholder="Subject"
                  className="bg-custom-base/50 border-custom-title/20 text-custom-title placeholder:text-custom-subtitle/60"
                />
                <textarea
                  placeholder="Your Message"
                  rows={6}
                  className="w-full rounded-md bg-custom-base/50 border border-custom-title/20 text-custom-title placeholder:text-custom-subtitle/60 p-3"
                ></textarea>
                <Button type="submit" className="w-full">Send Message</Button>
              </form>
            </CardContent>
          </Card>
        </div>
      </section>

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