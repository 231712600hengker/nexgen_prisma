"use client"

import { Star } from 'lucide-react'
import {
  Carousel,
  CarouselContent,
  CarouselItem,
  CarouselNext,
  CarouselPrevious,
} from "@/components/ui/carousel"

export const testimonials = [
  {
    name: "David R.",
    rating: 5,
    text: "The MacBook Pro exceeded my expectations. The M2 chip is incredibly fast, and the build quality is exceptional. Best laptop I've ever owned!"
  },
  {
    name: "Sarah M.",
    rating: 5,
    text: "Amazing customer service and lightning-fast delivery. The Sony headphones I bought are perfect for my daily commute."
  },
  {
    name: "Michael K.",
    rating: 5,
    text: "Great selection of products and competitive prices. The Samsung TV I purchased has transformed my home entertainment experience."
  },
  {
    name: "Emily L.",
    rating: 5,
    text: "Reliable and trustworthy electronics store. The iPad Air is exactly what I needed for my digital art projects."
  },
  {
    name: "John D.",
    rating: 5,
    text: "Outstanding product quality and excellent after-sales support. Very satisfied with my purchase!"
  },
  {
    name: "Lisa W.",
    rating: 5,
    text: "The VR headset I bought is amazing. Great immersive experience and top-notch build quality."
  },
  {
    name: "Robert M.",
    rating: 5,
    text: "Fast shipping and the product was exactly as described. Will definitely shop here again!"
  },
  {
    name: "Jennifer K.",
    rating: 5,
    text: "The gaming laptop I purchased has exceeded all my expectations. Amazing performance!"
  }
]

export default function TestimonialsSection() {
  return (
    <section className="py-16 bg-custom-sub-base">
      <div className="max-w-7xl mx-auto px-4">
        <h2 className="text-3xl font-bold text-center mb-12 text-custom-title">OUR HAPPY CUSTOMERS</h2>
        <Carousel
          opts={{
            align: "start",
            loop: true,
          }}
          className="w-full"
        >
          <CarouselContent className="-ml-2 md:-ml-4">
            {testimonials.map((testimonial, index) => (
              <CarouselItem key={index} className="pl-2 md:pl-4 md:basis-1/2 lg:basis-1/4">
                <div className="bg-custom-base p-6 rounded-2xl shadow-lg transform hover:scale-105 transition-all duration-300 border border-custom-title/20 h-full">
                  <div className="flex items-center mb-4">
                    {Array.from({ length: testimonial.rating }).map((_, i) => (
                      <Star key={i} className="w-5 h-5 fill-custom-title text-custom-title" />
                    ))}
                  </div>
                  <p className="text-custom-subtitle mb-4">{testimonial.text}</p>
                  <p className="font-semibold text-custom-title">{testimonial.name}</p>
                </div>
              </CarouselItem>
            ))}
          </CarouselContent>
          <CarouselPrevious className="hidden md:flex" />
          <CarouselNext className="hidden md:flex" />
        </Carousel>
      </div>
    </section>
  )
}