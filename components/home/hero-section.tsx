"use client"

import Link from 'next/link'
import { ArrowRight } from 'lucide-react'
import { Button } from '@/components/ui/button'

export default function HeroSection() {
  return (
    <section className="relative py-20 px-4 sm:px-6 lg:px-8 overflow-hidden">
      <div className="absolute inset-0 bg-gradient-to-br from-custom-base via-custom-sub-base to-custom-base"></div>
      <div className="absolute inset-0 bg-[url('/grid.svg')] bg-center [mask-image:linear-gradient(180deg,white,rgba(255,255,255,0))] opacity-10"></div>
      <div className="relative max-w-7xl mx-auto">
        <div className="text-center">
          <h1 className="text-5xl sm:text-7xl font-bold mb-8 text-custom-title tracking-tight">
            DISCOVER THE LATEST
            <span className="block">TECH INNOVATIONS</span>
          </h1>
          <p className="text-xl text-custom-subtitle mb-10 max-w-2xl mx-auto">
            Explore our wide range of cutting-edge electronics, from smartphones to smart home devices.
            Your gateway to tomorrow's technology.
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center items-center">
            <Link href="/shop">
              <Button size="lg" className="bg-custom-sub-base hover:bg-custom-base text-custom-title px-8 rounded-full transition-all duration-300 transform hover:scale-105 border border-custom-title">
                Shop Now <ArrowRight className="ml-2" />
              </Button>
            </Link>
          </div>
          <div className="mt-12 grid grid-cols-1 md:grid-cols-3 gap-8 text-center">
            <div className="p-6 rounded-2xl bg-custom-sub-base/50 backdrop-blur-sm shadow-xl transform hover:scale-105 transition-all duration-300 border border-custom-title/20">
              <p className="text-4xl font-bold text-custom-title">500+</p>
              <p className="mt-2 text-custom-subtitle">Premium Products</p>
            </div>
            <div className="p-6 rounded-2xl bg-custom-sub-base/50 backdrop-blur-sm shadow-xl transform hover:scale-105 transition-all duration-300 border border-custom-title/20">
              <p className="text-4xl font-bold text-custom-title">10K+</p>
              <p className="mt-2 text-custom-subtitle">Happy Customers</p>
            </div>
            <div className="p-6 rounded-2xl bg-custom-sub-base/50 backdrop-blur-sm shadow-xl transform hover:scale-105 transition-all duration-300 border border-custom-title/20">
              <p className="text-4xl font-bold text-custom-title">50+</p>
              <p className="mt-2 text-custom-subtitle">Top Brands</p>
            </div>
          </div>
        </div>
      </div>
    </section>
  )
}