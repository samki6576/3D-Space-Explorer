"use client"

import { useState } from "react"
import { Compass, Info, Settings, Home, HelpCircle } from "lucide-react"

export function NavigationControls({ onShowFacts, onShowControls }) {
  const [showSettings, setShowSettings] = useState(false)

  return (
    <>
      <div className="absolute bottom-4 left-4 flex flex-col space-y-2 pointer-events-auto">
        <button
          className="w-12 h-12 bg-purple-600 hover:bg-purple-700 rounded-full flex items-center justify-center text-white shadow-lg"
          onClick={onShowFacts}
          title="Space Facts"
        >
          <Info size={20} />
        </button>

        <button
          className="w-12 h-12 bg-gray-800 hover:bg-gray-700 rounded-full flex items-center justify-center text-white shadow-lg"
          onClick={onShowControls}
          title="Controls"
        >
          <Compass size={20} />
        </button>

        <button
          className="w-12 h-12 bg-gray-800 hover:bg-gray-700 rounded-full flex items-center justify-center text-white shadow-lg"
          onClick={() => setShowSettings(!showSettings)}
          title="Settings"
        >
          <Settings size={20} />
        </button>

        <button
          className="w-12 h-12 bg-gray-800 hover:bg-gray-700 rounded-full flex items-center justify-center text-white shadow-lg"
          onClick={() => {
            // Reset camera position
            window.location.reload()
          }}
          title="Reset View"
        >
          <Home size={20} />
        </button>

        <button
          className="w-12 h-12 bg-gray-800 hover:bg-gray-700 rounded-full flex items-center justify-center text-white shadow-lg"
          onClick={() => alert("Help would be shown here in a complete app")}
          title="Help"
        >
          <HelpCircle size={20} />
        </button>
      </div>

      {showSettings && (
        <div className="absolute bottom-4 left-20 bg-black/80 backdrop-blur-md rounded-lg border border-purple-500/50 text-white p-4 pointer-events-auto w-64">
          <h3 className="text-lg font-bold mb-3">Display Settings</h3>

          <div className="space-y-3">
            <div>
              <label className="flex items-center justify-between">
                <span>Show Planet Labels</span>
                <input type="checkbox" defaultChecked className="w-4 h-4 accent-purple-600" />
              </label>
            </div>

            <div>
              <label className="flex items-center justify-between">
                <span>Show Star Field</span>
                <input type="checkbox" defaultChecked className="w-4 h-4 accent-purple-600" />
              </label>
            </div>

            <div>
              <label className="flex items-center justify-between">
                <span>Show Nebulae</span>
                <input type="checkbox" defaultChecked className="w-4 h-4 accent-purple-600" />
              </label>
            </div>

            <div>
              <label className="block mb-1">Camera Speed</label>
              <input type="range" min="1" max="10" defaultValue="5" className="w-full accent-purple-600" />
            </div>

            <button
              className="w-full bg-purple-600 hover:bg-purple-700 text-white py-2 rounded-md text-sm mt-2"
              onClick={() => setShowSettings(false)}
            >
              Apply Settings
            </button>
          </div>
        </div>
      )}
    </>
  )
}
