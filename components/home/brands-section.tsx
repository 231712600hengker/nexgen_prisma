"use client"

export const brands = [
  { name: 'Apple', logo: 'https://upload.wikimedia.org/wikipedia/commons/f/fa/Apple_logo_black.svg' },
  { name: 'Samsung', logo: 'https://upload.wikimedia.org/wikipedia/commons/2/24/Samsung_Logo.svg' },
  { name: 'Sony', logo: 'https://upload.wikimedia.org/wikipedia/commons/c/c4/Sony_logo.svg' },
  { name: 'Dell', logo: 'https://upload.wikimedia.org/wikipedia/commons/8/82/Dell_Logo.png' },
  { name: 'LG', logo: 'https://upload.wikimedia.org/wikipedia/commons/b/bf/LG_logo_%282015%29.svg' }
]

export default function BrandsSection() {
  return (
    <section className="py-12 bg-custom-sub-base">
      <div className="max-w-7xl mx-auto px-4">
        <div className="grid grid-cols-3 md:grid-cols-5 gap-8 items-center justify-items-center">
          {brands.map((brand) => (
            <img
              key={brand.name}
              src={brand.logo}
              alt={brand.name}
              className="h-12 object-contain brightness-0 invert opacity-70 hover:opacity-100 transition-all duration-300 transform hover:scale-110"
            />
          ))}
        </div>
      </div>
    </section>
  )
}