"use client"

import { useState } from "react"
import { X } from "lucide-react"

export function InfoPanel({ planet, onClose }) {
  const [activeTab, setActiveTab] = useState("overview")

  if (!planet) return null

  return (
    <div className="absolute right-4 top-4 w-80 bg-black/80 backdrop-blur-md rounded-lg border border-purple-500/50 text-white overflow-hidden pointer-events-auto">
      <div className="flex justify-between items-center p-4 border-b border-purple-500/30">
        <h3 className="text-xl font-bold">{planet.name}</h3>
        <button onClick={onClose} className="text-gray-400 hover:text-white">
          <X size={20} />
        </button>
      </div>

      <div className="p-4">
        <div className="flex space-x-2 mb-4">
          <button
            className={`px-3 py-1 rounded-md text-sm ${activeTab === "overview" ? "bg-purple-600" : "bg-gray-800 hover:bg-gray-700"}`}
            onClick={() => setActiveTab("overview")}
          >
            Overview
          </button>
          <button
            className={`px-3 py-1 rounded-md text-sm ${activeTab === "facts" ? "bg-purple-600" : "bg-gray-800 hover:bg-gray-700"}`}
            onClick={() => setActiveTab("facts")}
          >
            Facts
          </button>
        </div>

        {activeTab === "overview" && (
          <div>
            <p className="text-gray-300 text-sm mb-4">{planet.description}</p>
            <div className="grid grid-cols-2 gap-2 text-xs">
              <div className="bg-gray-800 p-2 rounded">
                <span className="block text-gray-400">Diameter</span>
                <span className="font-medium">{(planet.radius * 2 * 12742).toLocaleString()} km</span>
              </div>
              <div className="bg-gray-800 p-2 rounded">
                <span className="block text-gray-400">Rotation</span>
                <span className="font-medium">{Math.round(24 / (planet.rotationSpeed * 1000))} hours</span>
              </div>
              <div className="bg-gray-800 p-2 rounded">
                <span className="block text-gray-400">Position</span>
                <span className="font-medium">{planet.position.map((p) => p.toFixed(1)).join(", ")}</span>
              </div>
              <div className="bg-gray-800 p-2 rounded">
                <span className="block text-gray-400">Type</span>
                <span className="font-medium">{planet.radius > 1.5 ? "Gas Giant" : "Terrestrial"}</span>
              </div>
            </div>
          </div>
        )}

        {activeTab === "facts" && (
          <div>
            <ul className="space-y-2">
              {planet.facts.map((fact, index) => (
                <li key={index} className="text-sm bg-gray-800/50 p-2 rounded">
                  {fact}
                </li>
              ))}
            </ul>
          </div>
        )}
      </div>

      <div className="p-4 bg-gray-900/50 border-t border-purple-500/30">
        <button
          className="w-full bg-purple-600 hover:bg-purple-700 text-white py-2 rounded-md text-sm"
          onClick={() => {
            // This would navigate to a detailed view in a real app
            alert(`Exploring ${planet.name} in detail would open a new view in a complete app`)
          }}
        >
          Explore in Detail
        </button>
      </div>
    </div>
  )
}
