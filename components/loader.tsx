export function Loader() {
  return (
    <div className="w-full h-screen flex flex-col items-center justify-center bg-black text-white">
      <div className="w-16 h-16 border-4 border-purple-500 border-t-transparent rounded-full animate-spin mb-4"></div>
      <h2 className="text-2xl font-bold">Loading Space Explorer</h2>
      <p className="text-gray-400 mt-2">Preparing your journey through the cosmos...</p>
      <p className="text-gray-500 text-sm mt-4">If loading takes too long, try refreshing the page</p>
    </div>
  )
}
