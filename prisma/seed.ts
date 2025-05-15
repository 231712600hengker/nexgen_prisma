import { PrismaClient } from '@prisma/client'

const prisma = new PrismaClient()

async function main() {
  // Delete existing records
  await prisma.product.deleteMany()
  await prisma.sale.deleteMany()
  await prisma.payment.deleteMany()
  await prisma.teamMember.deleteMany()
  await prisma.statistic.deleteMany()
  await prisma.brand.deleteMany()
  await prisma.feature.deleteMany()
  await prisma.testimonial.deleteMany()
  await prisma.contactInfo.deleteMany()

  // Create products
  const products = [
    {
      name: 'Meta Quest 3',
      description: 'Standalone VR headset with high-resolution display and precise motion tracking.',
      price: 7500000,
      category: 'Virtual Reality',
      image: 'https://images.unsplash.com/photo-1622979135225-d2ba269cf1ac?ixlib=rb-1.2.1&auto=format&fit=crop&w=800&q=80',
      stock: 50,
      rating: 4.8,
      brand: 'Meta',
      isNewArrival: true,
      isTopSelling: false
    },
    {
      name: 'PlayStation VR2',
      description: 'VR headset for PlayStation 5 with haptic feedback and adaptive triggers.',
      price: 8500000,
      category: 'Virtual Reality',
      image: 'https://images.unsplash.com/photo-1592478411213-6153e4ebc07d?ixlib=rb-1.2.1&auto=format&fit=crop&w=800&q=80',
      stock: 40,
      rating: 4.7,
      brand: 'Sony',
      isNewArrival: true,
      isTopSelling: false
    }
  ]

  for (const product of products) {
    await prisma.product.create({ data: product })
  }

  // Create team members
  const teamMembers = [
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

  for (const member of teamMembers) {
    await prisma.teamMember.create({ data: member })
  }

  // Create statistics
  const statistics = [
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

  for (const stat of statistics) {
    await prisma.statistic.create({ data: stat })
  }

  // Create brands
  const brands = [
    { name: 'Apple', logo: 'https://upload.wikimedia.org/wikipedia/commons/f/fa/Apple_logo_black.svg' },
    { name: 'Samsung', logo: 'https://upload.wikimedia.org/wikipedia/commons/2/24/Samsung_Logo.svg' },
    { name: 'Sony', logo: 'https://upload.wikimedia.org/wikipedia/commons/c/c4/Sony_logo.svg' },
    { name: 'Dell', logo: 'https://upload.wikimedia.org/wikipedia/commons/8/82/Dell_Logo.png' },
    { name: 'LG', logo: 'https://upload.wikimedia.org/wikipedia/commons/b/bf/LG_logo_%282015%29.svg' }
  ]

  for (const brand of brands) {
    await prisma.brand.create({ data: brand })
  }

  // Create features
  const features = [
    { title: "Free Shipping", description: "On orders over Rp 1.000.000", icon: "Truck" },
    { title: "2 Year Warranty", description: "On all products", icon: "Shield" },
    { title: "Fast Delivery", description: "Express shipping available", icon: "Zap" }
  ]

  for (const feature of features) {
    await prisma.feature.create({ data: feature })
  }

  // Create testimonials
  const testimonials = [
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
    }
  ]

  for (const testimonial of testimonials) {
    await prisma.testimonial.create({ data: testimonial })
  }

  // Create contact info
  const contactInfo = [
    {
      type: "address",
      label: "Address",
      value: "123 Tech Street, Digital City, Jakarta 12345",
      icon: "MapPin"
    },
    {
      type: "email",
      label: "Email",
      value: "contact@nexgenelectronics.com",
      icon: "Mail"
    },
    {
      type: "phone",
      label: "Phone",
      value: "+62 (021) 123-4567",
      icon: "Phone"
    },
    {
      type: "hours",
      label: "Hours",
      value: "Mon-Fri: 9AM-6PM",
      icon: "Clock"
    }
  ]

  for (const info of contactInfo) {
    await prisma.contactInfo.create({ data: info })
  }

  // Create sales
  const sales = [
    {
      customer: 'John Doe',
      product: 'Meta Quest 3',
      amount: 7500000,
      date: new Date(),
      status: 'Completed'
    },
    {
      customer: 'Jane Smith',
      product: 'PlayStation VR2',
      amount: 8500000,
      date: new Date(),
      status: 'Pending'
    }
  ]

  for (const sale of sales) {
    await prisma.sale.create({ data: sale })
  }

  // Create payments
  const payments = [
    {
      amount: 7500000,
      status: 'Completed',
      method: 'Credit Card',
      date: new Date(),
      saleId: '1'
    },
    {
      amount: 8500000,
      status: 'Pending',
      method: 'Bank Transfer',
      date: new Date(),
      saleId: '2'
    }
  ]

  for (const payment of payments) {
    await prisma.payment.create({ data: payment })
  }
}

main()
  .catch((e) => {
    console.error(e)
    process.exit(1)
  })
  .finally(async () => {
    await prisma.$disconnect()
  })