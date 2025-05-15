"use client"

import { Truck, Shield, Zap } from 'lucide-react'

const features = [
  { icon: Truck, title: "Free Shipping", desc: "On orders over Rp 1.000.000" },
  { icon: Shield, title: "2 Year Warranty", desc: "On all products" },
  { icon: Zap, title: "Fast Delivery", desc: "Express shipping available" }
]

export default function FeaturesSection() {
  return (
    <section className="py-16 bg-custom-sub-base">
      <div className="max-w-7xl mx-auto px-4">
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          {features.map((feature, idx) => (
            <div key={idx} className="text-center p-6 rounded-2xl bg-custom-base shadow-lg transform hover:scale-105 transition-all duration-300 border border-custom-title/20">
              <feature.icon className="w-12 h-12 mx-auto mb-4 text-custom-title" />
              <h3 className="text-xl font-semibold mb-2 text-custom-title">{feature.title}</h3>
              <p className="text-custom-subtitle">{feature.desc}</p>
            </div>
          ))}
        </div>
      </div>
    </section>
  )
}