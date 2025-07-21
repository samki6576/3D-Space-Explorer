"use client"

import { X } from "lucide-react"

const amazingSpaceFacts = [
  {
    title: "Cosmic Scale",
    fact: "There are more stars in the universe than grains of sand on all the beaches on Earth. The observable universe contains more than 100 billion galaxies, each with hundreds of billions of stars.",
  },
  {
    title: "Black Hole Power",
    fact: "If you were to fall into a black hole, you would experience 'spaghettification' - your body would be stretched into a long, thin shape due to the extreme gravitational gradient.",
  },
  {
    title: "Neutron Star Density",
    fact: "Neutron stars are so dense that a teaspoon of neutron star material would weigh about 4 billion tons. They're essentially giant atomic nuclei, about 12 miles in diameter.",
  },
  {
    title: "Cosmic Sound",
    fact: "Space is not completely silent. Some objects, like black holes, emit sounds in the form of pressure waves that can be converted to audible frequencies.",
  },
  {
    title: "Time Dilation",
    fact: "Time passes slower in stronger gravitational fields, a phenomenon known as gravitational time dilation. GPS satellites have to adjust for this effect as time passes slightly faster in orbit than on Earth's surface.",
  },
  {
    title: "Galactic Collision",
    fact: "Our Milky Way galaxy is on a collision course with the Andromeda galaxy. They will merge in about 4.5 billion years to form a new galaxy sometimes called 'Milkomeda'.",
  },
  {
    title: "Cosmic Microwave Background",
    fact: "The Cosmic Microwave Background is the afterglow of the Big Bang, filling all of space. It's the oldest light in the universe, dating back to about 380,000 years after the Big Bang.",
  },
  {
    title: "Extreme Temperatures",
    fact: "The hottest planet in our solar system is Venus, not Mercury, with a surface temperature of about 462°C (864°F) - hot enough to melt lead. This is due to its thick atmosphere trapping heat in a runaway greenhouse effect.",
  },
]

export function SpaceFacts({ onClose }) {
  return (
    <div className="absolute inset-0 bg-black/80 backdrop-blur-md flex items-center justify-center p-4 pointer-events-auto">
      <div className="bg-gray-900 rounded-lg border border-purple-500/50 max-w-4xl w-full max-h-[80vh] overflow-hidden flex flex-col">
        <div className="flex justify-between items-center p-4 border-b border-purple-500/30">
          <h2 className="text-2xl font-bold text-white">Amazing Space Facts</h2>
          <button onClick={onClose} className="text-gray-400 hover:text-white">
            <X size={24} />
          </button>
        </div>

        <div className="p-4 overflow-y-auto flex-grow">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            {amazingSpaceFacts.map((item, index) => (
              <div
                key={index}
                className="bg-black/50 border border-purple-500/30 rounded-lg p-4 hover:border-purple-500/70 transition-colors"
              >
                <h3 className="text-lg font-bold text-purple-400 mb-2">{item.title}</h3>
                <p className="text-gray-300">{item.fact}</p>
              </div>
            ))}
          </div>
        </div>

        <div className="p-4 border-t border-purple-500/30 bg-gray-900">
          <p className="text-center text-gray-400 text-sm">
            Explore the 3D space environment to discover more cosmic wonders!
          </p>
        </div>
      </div>
    </div>
  )
}
