"use client"

import Link from "next/link"
import Image from "next/image"
import { ChevronRight, Star, Rocket, Info } from "lucide-react"
import { Button } from "@/components/ui/button"
import SpaceGallery from "@/components/space-gallery"
import FactsSection from "@/components/facts-section"
import SpaceHero from "@/components/space-hero"
import dynamic from "next/dynamic"
import { Suspense, useState } from "react"
import { Loader } from "@/components/loader"

// Dynamically import the 3D scene to avoid SSR issues
const SpaceExplorer = dynamic(() => import("@/components/space-explorer"), {
  ssr: false,
  loading: () => <Loader />,
})

export default function HomePage() {
  const [loadError, setLoadError] = useState(false)

  // If there's an error loading the 3D component, show a fallback
  if (loadError) {
    return (
      <div className="min-h-screen bg-black text-white flex flex-col items-center justify-center p-4">
        <h1 className="text-3xl font-bold mb-4">3D Space Explorer</h1>
        <p className="text-xl mb-8">We encountered an issue loading the 3D space environment.</p>
        <Button onClick={() => window.location.reload()} className="bg-purple-600 hover:bg-purple-700">
          Try Again
        </Button>
        <p className="mt-8 text-gray-400">You can also explore our 2D space content below.</p>
        <div className="mt-8">
          <Link href="#gallery">
            <Button variant="outline" className="border-purple-500 text-purple-400 hover:bg-purple-500/20">
              View Space Gallery
            </Button>
          </Link>
        </div>
      </div>
    )
  }

  return (
    <main className="w-full h-screen bg-black">
      <Suspense fallback={<Loader />}>
        <div className="h-screen" onError={() => setLoadError(true)}>
          <SpaceExplorer />
        </div>
      </Suspense>

      {/* Navigation */}
      <header className="fixed top-0 left-0 right-0 z-50 bg-black/50 backdrop-blur-md border-b border-white/10">
        <div className="container mx-auto px-4 py-4 flex items-center justify-between">
          <Link href="/" className="flex items-center space-x-2">
            <Rocket className="h-6 w-6 text-purple-400" />
            <span className="font-bold text-xl">CosmicVoyage</span>
          </Link>
          <nav className="hidden md:flex items-center space-x-8">
            <Link href="#gallery" className="text-sm hover:text-purple-400 transition-colors">
              Gallery
            </Link>
            <Link href="#facts" className="text-sm hover:text-purple-400 transition-colors">
              Amazing Facts
            </Link>
            <Link href="#explore" className="text-sm hover:text-purple-400 transition-colors">
              Explore
            </Link>
            <Link href="#about" className="text-sm hover:text-purple-400 transition-colors">
              About
            </Link>
          </nav>
          <Button variant="outline" className="border-purple-500 text-purple-400 hover:bg-purple-500/20">
            Explore Space
          </Button>
        </div>
      </header>

      {/* Hero Section */}
      <SpaceHero />

      {/* Gallery Section */}
      <section id="gallery" className="py-20 bg-gradient-to-b from-black to-purple-950/30">
        <div className="container mx-auto px-4">
          <div className="text-center mb-12">
            <h2 className="text-3xl md:text-4xl font-bold mb-4">Cosmic Gallery</h2>
            <p className="text-gray-400 max-w-2xl mx-auto">
              Explore breathtaking images from across the universe, from distant galaxies to our own solar system.
            </p>
          </div>
          <SpaceGallery />
        </div>
      </section>

      {/* Facts Section */}
      <section id="facts" className="py-20 bg-gradient-to-b from-purple-950/30 to-black">
        <div className="container mx-auto px-4">
          <div className="text-center mb-12">
            <h2 className="text-3xl md:text-4xl font-bold mb-4">Mind-Blowing Space Facts</h2>
            <p className="text-gray-400 max-w-2xl mx-auto">
              Discover incredible facts about our universe that will change your perspective forever.
            </p>
          </div>
          <FactsSection />
        </div>
      </section>

      {/* Explore Section */}
      <section id="explore" className="py-20 relative overflow-hidden">
        <div className="absolute inset-0 z-0">
          <Image
            src="https://images.unsplash.com/photo-1642436273791-296f1ab9ef5e"
            alt="Deep space background"
            fill
            className="object-cover opacity-30"
          />
          <div className="absolute inset-0 bg-gradient-to-t from-black via-transparent to-black"></div>
        </div>
        <div className="container mx-auto px-4 relative z-10">
          <div className="grid md:grid-cols-2 gap-12 items-center">
            <div>
              <h2 className="text-3xl md:text-4xl font-bold mb-6">Begin Your Cosmic Journey</h2>
              <p className="text-gray-300 mb-8">
                Ready to explore the wonders of the cosmos? Join us on an immersive journey through space and time,
                discovering the secrets of the universe and expanding your understanding of our place within it.
              </p>
              <div className="flex flex-wrap gap-4">
                <Button className="bg-purple-600 hover:bg-purple-700" >               
                  Start Exploring <ChevronRight className="ml-2 h-4 w-4" />
                </Button>
                <Button variant="outline" className="border-purple-500 text-purple-400 hover:bg-purple-500/20">
                  Learn More
                </Button>
              </div>
            </div>
            <div className="relative h-[400px] rounded-lg overflow-hidden border border-purple-500/30 shadow-[0_0_30px_rgba(147,51,234,0.3)]">
              <Image
                src="https://images.unsplash.com/photo-1699862160391-1aa177a3baff"
                alt="Interactive space exploration"
                fill
                className="object-cover"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-black/80 to-transparent flex items-end p-6">
                <div>
                  <h3 className="text-xl font-bold mb-2">Interactive Space Map</h3>
                  <p className="text-sm text-gray-300">Navigate through our solar system and beyond</p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Newsletter Section */}
    

      {/* Footer */}
      <footer className="bg-black border-t border-white/10 py-12">
        <div className="container mx-auto px-4">
          <div className="grid grid-cols-1 md:grid-cols-4 gap-8">
            <div>
              <Link href="/" className="flex items-center space-x-2 mb-4">
                <Rocket className="h-6 w-6 text-purple-400" />
                <span className="font-bold text-xl">CosmicVoyage</span>
              </Link>
              <p className="text-gray-400 text-sm">
                Exploring the wonders of the universe and bringing cosmic beauty to your screen.
              </p>
              <div className="flex space-x-4 mt-4">
                <a href="#" className="text-gray-400 hover:text-purple-400">
                  <span className="sr-only">Twitter</span>
                  <svg className="h-5 w-5" fill="currentColor" viewBox="0 0 24 24" aria-hidden="true">
                    <path d="M8.29 20.251c7.547 0 11.675-6.253 11.675-11.675 0-.178 0-.355-.012-.53A8.348 8.348 0 0022 5.92a8.19 8.19 0 01-2.357.646 4.118 4.118 0 001.804-2.27 8.224 8.224 0 01-2.605.996 4.107 4.107 0 00-6.993 3.743 11.65 11.65 0 01-8.457-4.287 4.106 4.106 0 001.27 5.477A4.072 4.072 0 012.8 9.713v.052a4.105 4.105 0 003.292 4.022 4.095 4.095 0 01-1.853.07 4.108 4.108 0 003.834 2.85A8.233 8.233 0 012 18.407a11.616 11.616 0 006.29 1.84" />
                  </svg>
                </a>
                <a href="#" className="text-gray-400 hover:text-purple-400">
                  <span className="sr-only">Instagram</span>
                  <svg className="h-5 w-5" fill="currentColor" viewBox="0 0 24 24" aria-hidden="true">
                    <path
                      fillRule="evenodd"
                      d="M12.315 2c2.43 0 2.784.013 3.808.06 1.064.049 1.791.218 2.427.465a4.902 4.902 0 011.772 1.153 4.902 4.902 0 011.153 1.772c.247.636.416 1.363.465 2.427.048 1.067.06 1.407.06 4.123v.08c0 2.643-.012 2.987-.06 4.043-.049 1.064-.218 1.791-.465 2.427a4.902 4.902 0 01-1.153 1.772 4.902 4.902 0 01-1.772 1.153c-.636.247-1.363.416-2.427.465-1.067.048-1.407.06-4.123.06h-.08c-2.643 0-2.987-.012-4.043-.06-1.064-.049-1.791-.218-2.427-.465a4.902 4.902 0 01-1.153-1.772 4.902 4.902 0 01-1.772-1.153c-.247-.636-.416-1.363-.465-2.427-.047-1.024-.06-1.379-.06-3.808v-.63c0-2.43.013-2.784.06-3.808.049-1.064.218-1.791.465-2.427a4.902 4.902 0 011.153-1.772A4.902 4.902 0 015.45 2.525c.636-.247 1.363-.416 2.427-.465C8.901 2.013 9.256 2 11.685 2h.63zm-.081 1.802h-.468c-2.456 0-2.784.011-3.807.058-.975.045-1.504.207-1.857.344-.467.182-.8.398-1.15.748-.35.35-.566.683-.748 1.15-.137.353-.3.882-.344 1.857-.047 1.023-.058 1.351-.058 3.807v.468c0 2.456.011 2.784.058 3.807.045.975.207 1.504.344 1.857.182.466.399.8.748 1.15.35.35.683.566 1.15.748.353.137.882.3 1.857.344 1.054.048 1.37.058 4.041.058h.08c2.597 0 2.917-.01 3.96-.058.976-.045 1.505-.207 1.858-.344.466-.182.8-.398 1.15-.748.35-.35.566-.683.748-1.15.137-.353.3-.882.344-1.857.048-1.055.058-1.37.058-4.041v-.08c0-2.597-.01-2.917-.058-3.96-.045-.976-.207-1.505-.344-1.858a3.097 3.097 0 00-.748-1.15 3.098 3.098 0 00-1.15-.748c-.353-.137-.882-.3-1.857-.344-1.023-.047-1.351-.058-3.807-.058zM12 6.865a5.135 5.135 0 110 10.27 5.135 5.135 0 010-10.27zm0 1.802a3.333 3.333 0 100 6.666 3.333 3.333 0 000-6.666zm5.338-3.205a1.2 1.2 0 110 2.4 1.2 1.2 0 010-2.4z"
                      clipRule="evenodd"
                    />
                  </svg>
                </a>
                <a href="#" className="text-gray-400 hover:text-purple-400">
                  <span className="sr-only">YouTube</span>
                  <svg className="h-5 w-5" fill="currentColor" viewBox="0 0 24 24" aria-hidden="true">
                    <path
                      fillRule="evenodd"
                      d="M19.812 5.418c.861.23 1.538.907 1.768 1.768C21.998 8.746 22 12 22 12s0 3.255-.418 4.814a2.504 2.504 0 0 1-1.768 1.768c-1.56.419-7.814.419-7.814.419s-6.255 0-7.814-.419a2.505 2.505 0 0 1-1.768-1.768C2 15.255 2 12 2 12s0-3.255.417-4.814a2.507 2.507 0 0 1 1.768-1.768C5.744 5 11.998 5 11.998 5s6.255 0 7.814.418ZM15.194 12 10 15V9l5.194 3Z"
                      clipRule="evenodd"
                    />
                  </svg>
                </a>
              </div>
            </div>
            <div>
              <h3 className="font-semibold text-lg mb-4">Explore</h3>
              <ul className="space-y-2">
                <li>
                  <Link href="#" className="text-gray-400 hover:text-purple-400 text-sm">
                    Solar System
                  </Link>
                </li>
                <li>
                  <Link href="#" className="text-gray-400 hover:text-purple-400 text-sm">
                    Galaxies
                  </Link>
                </li>
                <li>
                  <Link href="#" className="text-gray-400 hover:text-purple-400 text-sm">
                    Black Holes
                  </Link>
                </li>
                <li>
                  <Link href="#" className="text-gray-400 hover:text-purple-400 text-sm">
                    Exoplanets
                  </Link>
                </li>
                <li>
                  <Link href="#" className="text-gray-400 hover:text-purple-400 text-sm">
                    Space Missions
                  </Link>
                </li>
              </ul>
            </div>
            <div>
              <h3 className="font-semibold text-lg mb-4">Resources</h3>
              <ul className="space-y-2">
                <li>
                  <Link href="#" className="text-gray-400 hover:text-purple-400 text-sm">
                    Space News
                  </Link>
                </li>
                <li>
                  <Link href="#" className="text-gray-400 hover:text-purple-400 text-sm">
                    Educational Content
                  </Link>
                </li>
                <li>
                  <Link href="#" className="text-gray-400 hover:text-purple-400 text-sm">
                    Image Gallery
                  </Link>
                </li>
                <li>
                  <Link href="#" className="text-gray-400 hover:text-purple-400 text-sm">
                    Space Calendar
                  </Link>
                </li>
                <li>
                  <Link href="#" className="text-gray-400 hover:text-purple-400 text-sm">
                    Research Papers
                  </Link>
                </li>
              </ul>
            </div>
            <div>
              <h3 className="font-semibold text-lg mb-4">Contact</h3>
              <ul className="space-y-2">
                <li className="flex items-start space-x-2">
                  <Info className="h-5 w-5 text-purple-400 mt-0.5" />
                  <span className="text-gray-400 text-sm">
                    Have questions about space? Reach out to our team of astronomers and space enthusiasts.
                  </span>
                </li>
                <li className="flex items-center space-x-2 mt-4">
                  <Button
                    variant="outline"
                    size="sm"
                    className="border-purple-500 text-purple-400 hover:bg-purple-500/20"
                  >
                    Contact Us
                  </Button>
                </li>
              </ul>
            </div>
          </div>
          <div className="border-t border-white/10 mt-12 pt-8 text-center text-gray-400 text-sm">
            <p>
              © {new Date().getFullYear()} CosmicVoyage. All rights reserved. Images courtesy of NASA, ESA, and other
              space agencies.
            </p>
          </div>
        </div>
      </footer>
    </main>
  )
}
