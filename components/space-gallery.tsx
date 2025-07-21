"use client"

import { useState } from "react"
import Image from "next/image"
import { motion } from "framer-motion"
import { ChevronLeft, ChevronRight, Maximize2 } from "lucide-react"

const spaceImages = [
  {
    id: 1,
    src: "https://images.unsplash.com/photo-1681673211082-6e931dcab8db",
    alt: "Spiral Galaxy",
    title: "Spiral Galaxy",
    description: "A stunning spiral galaxy with vibrant arms stretching across thousands of light years.",
  },
  {
    id: 2,
    src: "https://images.unsplash.com/photo-1716881139357-ddcb2f52940c",
    alt: "Nebula",
    title: "Eagle Nebula",
    description: "A stellar nursery where new stars are born from cosmic dust and gas.",
  },
  {
    id: 3,
    src: "https://images.unsplash.com/photo-1670884307458-4977f638a933 ",
    alt: "Black Hole",
    title: "Black Hole Visualization",
    description: "An artist's impression of a supermassive black hole warping spacetime around it.",
  },
  {
    id: 4,
    src: "https://images.unsplash.com/photo-1645235142939-096560a17aab ",
    alt: "Solar Flare",
    title: "Solar Flare",
    description: "A massive eruption of plasma from our Sun, reaching millions of kilometers into space.",
  },
  {
    id: 5,
    src: "https://images.unsplash.com/photo-1640386355103-83ebf7c6c83e ",
    alt: "Exoplanet",
    title: "Exoplanet System",
    description: "A distant planetary system with multiple worlds orbiting an alien star.",
  },
  {
    id: 6,
    src: "https://images.unsplash.com/photo-1615381034338-0ce3a8d47866",
    alt: "Supernova Remnant",
    title: "Supernova Remnant",
    description: "The beautiful aftermath of a massive star's explosive death.",
  },
]

export default function SpaceGallery() {
  const [currentImageIndex, setCurrentImageIndex] = useState(0)
  const [showLightbox, setShowLightbox] = useState(false)

  const nextImage = () => {
    setCurrentImageIndex((prev) => (prev + 1) % spaceImages.length)
  }

  const prevImage = () => {
    setCurrentImageIndex((prev) => (prev - 1 + spaceImages.length) % spaceImages.length)
  }

  return (
    <>
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {spaceImages.map((image, index) => (
          <motion.div
            key={image.id}
            className="relative group overflow-hidden rounded-lg border border-purple-500/30 shadow-lg"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, delay: index * 0.1 }}
          >
            <div className="aspect-[4/3] relative">
              <Image
                src={image.src || "/placeholder"}
                alt={image.alt}
                fill
                className="object-cover transition-transform duration-500 group-hover:scale-110"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/30 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300 flex items-end">
                <div className="p-4">
                  <h3 className="text-xl font-bold text-white">{image.title}</h3>
                  <p className="text-sm text-gray-300 mt-1">{image.description}</p>
                </div>
              </div>
              <button
                className="absolute top-2 right-2 bg-black/50 p-2 rounded-full opacity-0 group-hover:opacity-100 transition-opacity duration-300"
                onClick={() => {
                  setCurrentImageIndex(index)
                  setShowLightbox(true)
                }}
              >
                <Maximize2 className="h-5 w-5 text-white" />
              </button>
            </div>
          </motion.div>
        ))}
      </div>

      {/* Lightbox */}
      {showLightbox && (
        <div className="fixed inset-0 z-50 bg-black/95 flex items-center justify-center">
          <button className="absolute top-4 right-4 text-white text-2xl" onClick={() => setShowLightbox(false)}>
            ✕
          </button>
          <button
            className="absolute left-4 top-1/2 transform -translate-y-1/2 bg-black/50 p-2 rounded-full"
            onClick={prevImage}
          >
            <ChevronLeft className="h-8 w-8 text-white" />
          </button>
          <div className="max-w-4xl max-h-[80vh] relative">
            <Image
              src={spaceImages[currentImageIndex].src || "/placeholder"}
              alt={spaceImages[currentImageIndex].alt}
              width={1000}
              height={750}
              className="max-h-[80vh] w-auto object-contain"
            />
            <div className="absolute bottom-0 left-0 right-0 bg-black/70 p-4">
              <h3 className="text-xl font-bold text-white">{spaceImages[currentImageIndex].title}</h3>
              <p className="text-sm text-gray-300 mt-1">{spaceImages[currentImageIndex].description}</p>
            </div>
          </div>
          <button
            className="absolute right-4 top-1/2 transform -translate-y-1/2 bg-black/50 p-2 rounded-full"
            onClick={nextImage}
          >
            <ChevronRight className="h-8 w-8 text-white" />
          </button>
        </div>
      )}
    </>
  )
}
