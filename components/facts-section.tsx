"use client"

import { useState } from "react"
import { motion } from "framer-motion"
import { Star, Moon, Sun, Rocket, Globe, Clock, Zap, Thermometer } from "lucide-react"
import { Button } from "@/components/ui/button"

const spaceFacts = [
  {
    id: 1,
    icon: <Star className="h-10 w-10 text-yellow-400" />,
    title: "Cosmic Scale",
    fact: "There are more stars in the universe than grains of sand on all the beaches on Earth. The observable universe contains more than 100 billion galaxies, each with hundreds of billions of stars.",
    color: "from-yellow-600/20 to-yellow-900/20",
  },
  {
    id: 2,
    icon: <Moon className="h-10 w-10 text-gray-300" />,
    title: "Moon Mysteries",
    fact: "The Moon is slowly moving away from Earth at a rate of about 3.8 cm per year. In about 50 billion years, the Moon will stop moving away from us and settle into a stable orbit.",
    color: "from-gray-600/20 to-gray-900/20",
  },
  {
    id: 3,
    icon: <Sun className="h-10 w-10 text-orange-400" />,
    title: "Solar Power",
    fact: "The Sun converts 600 million tons of hydrogen into helium every second, releasing an enormous amount of energy. In a single second, our Sun produces enough energy to meet Earth's power needs for almost 500,000 years.",
    color: "from-orange-600/20 to-orange-900/20",
  },
  {
    id: 4,
    icon: <Rocket className="h-10 w-10 text-blue-400" />,
    title: "Space Travel",
    fact: "If you could drive your car to the Sun at 100 km/h, it would take about 170 years to get there. Light from the Sun takes only 8 minutes and 20 seconds to reach Earth.",
    color: "from-blue-600/20 to-blue-900/20",
  },
  {
    id: 5,
    icon: <Globe className="h-10 w-10 text-green-400" />,
    title: "Earth's Rotation",
    fact: "Earth is spinning at over 1,000 miles per hour at the equator, and it's orbiting the Sun at 67,000 miles per hour. Our solar system is also moving through the galaxy at 490,000 miles per hour.",
    color: "from-green-600/20 to-green-900/20",
  },
  {
    id: 6,
    icon: <Clock className="h-10 w-10 text-purple-400" />,
    title: "Time Dilation",
    fact: "Time passes slower in stronger gravitational fields, a phenomenon known as gravitational time dilation. GPS satellites have to adjust for this effect as time passes slightly faster in orbit than on Earth's surface.",
    color: "from-purple-600/20 to-purple-900/20",
  },
  {
    id: 7,
    icon: <Zap className="h-10 w-10 text-red-400" />,
    title: "Black Hole Power",
    fact: "If you were to fall into a black hole, you would experience 'spaghettification' - your body would be stretched into a long, thin shape due to the extreme gravitational gradient.",
    color: "from-red-600/20 to-red-900/20",
  },
  {
    id: 8,
    icon: <Thermometer className="h-10 w-10 text-cyan-400" />,
    title: "Extreme Temperatures",
    fact: "The hottest planet in our solar system is Venus, not Mercury, with a surface temperature of about 462°C (864°F) - hot enough to melt lead. This is due to its thick atmosphere trapping heat in a runaway greenhouse effect.",
    color: "from-cyan-600/20 to-cyan-900/20",
  },
]

export default function FactsSection() {
  const [expandedFact, setExpandedFact] = useState<number | null>(null)

  return (
    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
      {spaceFacts.map((fact, index) => (
        <motion.div
          key={fact.id}
          className={`rounded-lg p-6 bg-gradient-to-br ${fact.color} border border-purple-500/30 backdrop-blur-sm relative overflow-hidden group`}
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5, delay: index * 0.1 }}
        >
          <div className="absolute -right-10 -top-10 opacity-10 transform scale-150">{fact.icon}</div>
          <div className="relative z-10">
            <div className="mb-4">{fact.icon}</div>
            <h3 className="text-xl font-bold mb-2">{fact.title}</h3>
            <p className="text-gray-300 text-sm line-clamp-3 group-hover:line-clamp-none transition-all duration-300">
              {fact.fact}
            </p>
            <Button
              variant="ghost"
              size="sm"
              className="mt-4 text-purple-400 hover:text-purple-300 hover:bg-purple-900/20 p-0"
              onClick={() => setExpandedFact(expandedFact === fact.id ? null : fact.id)}
            >
              {expandedFact === fact.id ? "Read Less" : "Read More"}
            </Button>
          </div>
        </motion.div>
      ))}
    </div>
  )
}
