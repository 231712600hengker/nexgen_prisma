"use client"

import { Input } from '@/components/ui/input'
import { Button } from '@/components/ui/button'

export default function NewsletterSection() {
  return (
    <section className="py-16 bg-custom-base border-t border-custom-title/20">
      <div className="max-w-7xl mx-auto px-4 text-center">
        <h2 className="text-3xl font-bold mb-8 text-custom-title">STAY UP TO DATE ABOUT<br />OUR LATEST OFFERS</h2>
        <div className="max-w-md mx-auto flex gap-4">
          <Input
            type="email"
            placeholder="Enter your email address"
            className="bg-custom-sub-base/50 border-custom-title/20 text-custom-subtitle placeholder:text-custom-subtitle/60 rounded-full"
          />
          <Button className="bg-custom-title text-custom-base hover:bg-custom-subtitle rounded-full px-8">
            Subscribe
          </Button>
        </div>
      </div>
    </section>
  )
}