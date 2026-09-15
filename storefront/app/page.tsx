'use client'

import Link from 'next/link'
import Image from 'next/image'
import { useState } from 'react'
import { ArrowRight, Truck, RotateCcw, Shield, Award, Plus, Minus } from 'lucide-react'
import { useProducts } from '@/hooks/use-products'
import { formatPrice } from '@/lib/utils/format-price'
import { getProductImage } from '@/lib/utils/placeholder-images'
import { trackMetaEvent } from '@/lib/meta-pixel'

const SIGNATURE_COLLECTION_ID = 'pcol_01KPGYDN3BHMNVWSA3ZWDANZA8'

const FAQS = [
  {
    q: 'What leather do you use?',
    a: 'Full-grain, vegetable-tanned leather sourced from Italian tanneries. It softens and deepens in color with age rather than wearing out.',
  },
  {
    q: 'How long does shipping take?',
    a: 'Orders ship within 2 business days. Shipping is free on orders over $75, with delivery typically in 4-7 business days.',
  },
  {
    q: 'What is your return policy?',
    a: 'Return any unused piece within 30 days of delivery, in its original dust bag, for a full refund.',
  },
  {
    q: 'How do I care for my bag?',
    a: 'Keep it in its dust bag when not in use, avoid prolonged exposure to water and direct sun, and condition the leather every few months.',
  },
  {
    q: 'Do bags come with an authenticity card?',
    a: 'Every bag ships with a dust bag and a signed brand card confirming its materials and origin.',
  },
]

function FaqItem({ q, a }: { q: string; a: string }) {
  const [open, setOpen] = useState(false)
  return (
    <div className="hairline-b">
      <button
        onClick={() => setOpen((o) => !o)}
        className="w-full flex items-center justify-between gap-4 py-6 text-left"
        aria-expanded={open}
      >
        <span className="font-heading text-lg">{q}</span>
        <span className="shrink-0 text-accent transition-transform duration-500">
          {open ? <Minus className="h-4 w-4" /> : <Plus className="h-4 w-4" />}
        </span>
      </button>
      <div
        className={`grid transition-all duration-500 ease-out ${
          open ? 'grid-rows-[1fr] opacity-100' : 'grid-rows-[0fr] opacity-0'
        }`}
      >
        <div className="overflow-hidden">
          <p className="pb-6 text-sm text-muted-foreground leading-relaxed max-w-xl">{a}</p>
        </div>
      </div>
    </div>
  )
}

export default function HomePage() {
  const { data: products, isLoading } = useProducts({ limit: 4, collection_id: SIGNATURE_COLLECTION_ID })
  const [newsletterEmail, setNewsletterEmail] = useState('')

  const handleNewsletterSubmit = (e: React.FormEvent) => {
    e.preventDefault()
    if (!newsletterEmail.trim()) return
    trackMetaEvent('Lead', { content_name: 'newsletter_signup', status: 'submitted' })
  }

  return (
    <>
      {/* Hero */}
      <section className="relative min-h-screen flex items-center justify-center overflow-hidden">
        <Image
          src="https://images.unsplash.com/photo-1566150905458-1bf1fc113f0d?w=1920&q=80"
          alt="The Siena Leather Tote"
          fill
          priority
          sizes="100vw"
          className="object-cover"
        />
        {/* Scrim for legibility */}
        <div className="absolute inset-0 bg-gradient-to-b from-background/80 via-background/55 to-background/90" />
        <div className="absolute inset-0" style={{ boxShadow: 'inset 0 0 12rem 4rem hsl(var(--background) / 0.7)' }} />

        <div className="relative z-10 container-custom flex flex-col items-center text-center px-6">
          <div className="hairline-t w-16 mb-8" />
          <p className="eyebrow mb-6">Italian Leather, Made By Hand</p>
          <h1 className="font-heading text-display text-balance max-w-3xl">
            Carry Something Worth Keeping
          </h1>
          <p className="mt-6 text-base sm:text-lg text-muted-foreground max-w-md leading-relaxed">
            Full-grain leather bags cut, stitched and finished for daily use — and for years beyond it.
          </p>
          <div className="mt-10 flex flex-wrap items-center justify-center gap-5">
            <Link
              href="/products"
              className="inline-flex items-center gap-2 bg-primary text-primary-foreground px-9 py-4 text-xs font-medium uppercase tracking-[0.15em] transition-opacity hover:opacity-85"
              prefetch={true}
            >
              Shop the Collection
              <ArrowRight className="h-3.5 w-3.5" />
            </Link>
            <Link
              href="/about"
              className="inline-flex items-center gap-2 border border-foreground/30 px-9 py-4 text-xs font-medium uppercase tracking-[0.15em] transition-colors hover:border-foreground"
              prefetch={true}
            >
              Our Story
            </Link>
          </div>
          <div className="hairline-t w-16 mt-10" />
        </div>
      </section>

      {/* Collection Showcase */}
      <section className="py-28 sm:py-36">
        <div className="container-custom">
          <div className="text-center mb-16">
            <p className="eyebrow mb-4">The Signature Collection</p>
            <h2 className="font-heading text-h2">Four Silhouettes, One Standard</h2>
          </div>

          {isLoading ? (
            <div className="grid grid-cols-2 lg:grid-cols-4 gap-px bg-border">
              {[1, 2, 3, 4].map((i) => (
                <div key={i} className="aspect-[3/4] bg-muted animate-pulse" />
              ))}
            </div>
          ) : (
            <div className="grid grid-cols-2 lg:grid-cols-4 gap-px bg-border">
              {products?.map((product: any) => {
                const variant = product.variants?.[0]
                const amount = variant?.calculated_price?.calculated_amount
                const currency = variant?.calculated_price?.currency_code || 'usd'
                return (
                  <Link
                    key={product.id}
                    href={`/products/${product.handle}`}
                    className="group relative aspect-[3/4] overflow-hidden bg-background block"
                    prefetch={true}
                  >
                    <Image
                      src={getProductImage(product.thumbnail, product.id)}
                      alt={product.title}
                      fill
                      sizes="(max-width: 1024px) 50vw, 25vw"
                      className="object-cover transition-transform duration-700 ease-out group-hover:scale-105"
                    />
                    <div className="absolute inset-0 bg-gradient-to-t from-background/90 via-background/10 to-transparent" />
                    <div className="absolute inset-x-0 bottom-0 p-5">
                      <h3 className="font-heading text-base text-foreground">{product.title}</h3>
                      {amount != null && (
                        <p className="mt-1 text-xs tracking-wide text-accent">
                          From {formatPrice(amount, currency)}
                        </p>
                      )}
                    </div>
                    <div className="absolute inset-0 border border-transparent group-hover:border-accent/40 transition-colors duration-500" />
                  </Link>
                )
              })}
            </div>
          )}
        </div>
      </section>

      {/* FAQ */}
      <section className="py-24 sm:py-32 hairline-t">
        <div className="container-custom max-w-2xl">
          <div className="text-center mb-14">
            <p className="eyebrow mb-4">Good to Know</p>
            <h2 className="font-heading text-h2">Questions, Answered</h2>
          </div>
          <div>
            {FAQS.map((item) => (
              <FaqItem key={item.q} q={item.q} a={item.a} />
            ))}
          </div>
        </div>
      </section>

      {/* Trust Strip */}
      <section className="hairline-y">
        <div className="container-custom py-10">
          <div className="grid grid-cols-2 lg:grid-cols-4 gap-8">
            <div className="flex flex-col items-center text-center gap-2.5">
              <Truck className="h-5 w-5 text-accent" strokeWidth={1.25} />
              <p className="text-xs uppercase tracking-widest">Free Shipping</p>
              <p className="text-xs text-muted-foreground">On orders over $75</p>
            </div>
            <div className="flex flex-col items-center text-center gap-2.5">
              <RotateCcw className="h-5 w-5 text-accent" strokeWidth={1.25} />
              <p className="text-xs uppercase tracking-widest">30-Day Returns</p>
              <p className="text-xs text-muted-foreground">Unused, original bag</p>
            </div>
            <div className="flex flex-col items-center text-center gap-2.5">
              <Award className="h-5 w-5 text-accent" strokeWidth={1.25} />
              <p className="text-xs uppercase tracking-widest">Full-Grain Leather</p>
              <p className="text-xs text-muted-foreground">Vegetable-tanned, Italy</p>
            </div>
            <div className="flex flex-col items-center text-center gap-2.5">
              <Shield className="h-5 w-5 text-accent" strokeWidth={1.25} />
              <p className="text-xs uppercase tracking-widest">Secure Checkout</p>
              <p className="text-xs text-muted-foreground">256-bit SSL encryption</p>
            </div>
          </div>
        </div>
      </section>

      {/* Lookbook */}
      <section className="py-28 sm:py-36">
        <div className="container-custom">
          <div className="text-center mb-14">
            <p className="eyebrow mb-4">The Lookbook</p>
            <h2 className="font-heading text-h2">Made to Be Used</h2>
          </div>
          <div className="grid grid-cols-2 lg:grid-cols-6 gap-3">
            <Link href="/products/the-milano-shoulder-bag" className="col-span-1 lg:col-span-2 relative aspect-[3/4] overflow-hidden image-vignette group" prefetch={true}>
              <Image src="https://images.unsplash.com/photo-1591561954557-26941169b49e?w=1200&q=80" alt="The Milano Shoulder Bag detail" fill sizes="33vw" className="object-cover transition-transform duration-700 group-hover:scale-105" />
            </Link>
            <Link href="/products/the-siena-leather-tote" className="col-span-1 lg:col-span-2 relative aspect-[3/4] overflow-hidden image-vignette group" prefetch={true}>
              <Image src="https://images.unsplash.com/photo-1553062407-98eeb64c6a62?w=1200&q=80" alt="The Siena Leather Tote detail" fill sizes="33vw" className="object-cover transition-transform duration-700 group-hover:scale-105" />
            </Link>
            <Link href="/products/the-amalfi-mini-crossbody" className="col-span-1 lg:col-span-2 relative aspect-[3/4] overflow-hidden image-vignette group" prefetch={true}>
              <Image src="https://images.unsplash.com/photo-1622560480605-d83c853bc5c3?w=1200&q=80" alt="The Amalfi Mini Crossbody detail" fill sizes="33vw" className="object-cover transition-transform duration-700 group-hover:scale-105" />
            </Link>
            <Link href="/products/the-portofino-bucket-bag" className="col-span-2 lg:col-span-3 relative aspect-[3/4] sm:aspect-[16/10] overflow-hidden image-vignette group" prefetch={true}>
              <Image src="https://images.unsplash.com/photo-1528812969535-4bcefc3926bb?w=1600&q=80" alt="The Portofino Bucket Bag detail" fill sizes="50vw" className="object-cover transition-transform duration-700 group-hover:scale-105" />
            </Link>
            <Link href="/products/the-siena-leather-tote" className="col-span-2 lg:col-span-3 relative aspect-[3/4] sm:aspect-[16/10] overflow-hidden image-vignette group" prefetch={true}>
              <Image src="https://images.unsplash.com/photo-1590874103328-eac38a683ce7?w=1600&q=80" alt="The Siena Leather Tote styled" fill sizes="50vw" className="object-cover transition-transform duration-700 group-hover:scale-105" />
            </Link>
          </div>
        </div>
      </section>

      {/* Stats Band */}
      <section className="hairline-y bg-muted/40">
        <div className="container-custom py-20">
          <div className="grid grid-cols-2 lg:grid-cols-4 gap-10 text-center">
            <div>
              <p className="font-heading text-4xl sm:text-5xl text-accent">4</p>
              <p className="mt-2 text-xs uppercase tracking-widest text-muted-foreground">Signature Silhouettes</p>
            </div>
            <div>
              <p className="font-heading text-4xl sm:text-5xl text-accent">3</p>
              <p className="mt-2 text-xs uppercase tracking-widest text-muted-foreground">Colorways Each</p>
            </div>
            <div>
              <p className="font-heading text-4xl sm:text-5xl text-accent">100%</p>
              <p className="mt-2 text-xs uppercase tracking-widest text-muted-foreground">Full-Grain Leather</p>
            </div>
            <div>
              <p className="font-heading text-4xl sm:text-5xl text-accent">30</p>
              <p className="mt-2 text-xs uppercase tracking-widest text-muted-foreground">Day Return Window</p>
            </div>
          </div>
        </div>
      </section>

      {/* Editorial Quote */}
      <section className="py-28 sm:py-36">
        <div className="container-custom max-w-2xl text-center">
          <p className="font-heading text-2xl sm:text-3xl leading-snug text-balance">
            &ldquo;Bags built the old way — cut by hand, stitched to last, and finished
            to be carried every single day.&rdquo;
          </p>
          <p className="mt-6 eyebrow">The Atelier Note</p>
        </div>
      </section>

      {/* Newsletter */}
      <section className="py-24 hairline-t">
        <div className="container-custom max-w-xl text-center">
          <p className="eyebrow mb-4">Stay Close</p>
          <h2 className="font-heading text-h2">Join the List</h2>
          <p className="mt-3 text-muted-foreground text-sm">
            New silhouettes, early access and the occasional note from the workshop.
          </p>
          <form className="mt-8 flex gap-2" onSubmit={handleNewsletterSubmit}>
            <input
              type="email"
              value={newsletterEmail}
              onChange={(e) => setNewsletterEmail(e.target.value)}
              placeholder="Enter your email"
              className="flex-1 border-b border-foreground/30 bg-transparent px-1 py-3 text-sm placeholder:text-muted-foreground focus:border-accent focus:outline-none transition-colors"
            />
            <button
              type="submit"
              className="bg-primary text-primary-foreground px-6 py-3 text-xs font-medium uppercase tracking-[0.15em] hover:opacity-85 transition-opacity whitespace-nowrap"
            >
              Subscribe
            </button>
          </form>
        </div>
      </section>
    </>
  )
}
