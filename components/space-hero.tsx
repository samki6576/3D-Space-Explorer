"use client"

import { useEffect, useState } from "react"
import Image from "next/image"
import { motion } from "framer-motion"
import { ChevronDown } from "lucide-react"
import { Button } from "@/components/ui/button"

export default function SpaceHero() {
  const [scrollY, setScrollY] = useState(0)

  useEffect(() => {
    const handleScroll = () => {
      setScrollY(window.scrollY)
    }

    window.addEventListener("scroll", handleScroll)
    return () => window.removeEventListener("scroll", handleScroll)
  }, [])

  return (
    <section className="relative h-screen flex items-center justify-center overflow-hidden">
      {/* Parallax Stars Background */}
      <div
        className="absolute inset-0 z-0"
        style={{
          transform: `translateY(${scrollY * 0.1}px)`,
        }}
      >
        <Image
          src="https://images.unsplash.com/photo-1656489042181-7fcbafcc3c86"
          alt="Space background with stars"
          fill
          priority
          className="object-cover"
        />
      </div>

      {/* Floating planets */}
      <motion.div
        className="absolute z-10"
        initial={{ opacity: 0, x: -100 }}
        animate={{ opacity: 1, x: 0 }}
        transition={{ duration: 1, delay: 0.5 }}
        style={{
          top: "20%",
          left: "10%",
          transform: `translateY(${scrollY * 0.2}px)`,
        }}
      >
        <Image
          src="https://images.unsplash.com/photo-1654263391025-4c4809a37f5c"
          alt="Planet"
          width={150}
          height={150}
          className="rounded-full opacity-80"
        />
      </motion.div>

      <motion.div
        className="absolute z-10"
        initial={{ opacity: 0, x: 100 }}
        animate={{ opacity: 1, x: 0 }}
        transition={{ duration: 1, delay: 0.8 }}
        style={{
          top: "30%",
          right: "15%",
          transform: `translateY(${scrollY * 0.15}px)`,
        }}
      >
        <Image
          src="https://images.unsplash.com/photo-1630839437035-dac17da580d0"
          alt="Planet"
          width={180}
          height={180}
          className="rounded-full opacity-70"
        />
      </motion.div>

      {/* Hero Content */}
      <div className="container mx-auto px-4 relative z-20 mt-16">
        <motion.div
          className="text-center max-w-4xl mx-auto"
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8 }}
        >
          <motion.h1
            className="text-4xl md:text-6xl lg:text-7xl font-bold mb-6 text-white"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.2 }}
          >
            Explore the{" "}
            <span className="text-transparent bg-clip-text bg-gradient-to-r from-purple-400 to-blue-500">Wonders</span>{" "}
            of Our Universe
          </motion.h1>
          <motion.p
            className="text-xl md:text-2xl text-gray-300 mb-8"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.4 }}
          >
            Journey through galaxies, nebulae, and cosmic phenomena that will leave you in awe of our vast universe.
          </motion.p>
          <motion.div
            className="flex flex-wrap justify-center gap-4"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.6 }}
          >
            <Button className="bg-purple-600 hover:bg-purple-700 text-white px-8 py-6 text-lg">
              Begin Your Journey
            </Button>
            <Button
              variant="outline"
              className="border-purple-500 text-purple-400 hover:bg-purple-500/20 px-8 py-6 text-lg"
            >
              Discover Facts
            </Button>
          </motion.div>
        </motion.div>
      </div>

      {/* Scroll indicator */}
      <motion.div
        className="absolute bottom-8 left-1/2 transform -translate-x-1/2 z-20"
        initial={{ opacity: 0, y: -10 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{
          duration: 0.8,
          delay: 1.2,
          repeat: Number.POSITIVE_INFINITY,
          repeatType: "reverse",
          repeatDelay: 0.2,
        }}
      >
        <ChevronDown className="h-8 w-8 text-white/70" />
      </motion.div>
    </section>
  )
}
