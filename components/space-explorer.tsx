"use client"

import { ReactNode, useRef, useState, useEffect, Suspense } from "react"
import { Canvas, useFrame, useThree } from "@react-three/fiber"
import { Stars, OrbitControls, PerspectiveCamera, Text, Environment, Billboard } from "@react-three/drei"
import * as THREE from "three"
import { InfoPanel } from "./info-panel"
import { NavigationControls } from "./navigation-controls"
import { SpaceFacts } from "./space-facts"

export interface PlanetType {
  id: string;
  name: string;
  position: [number, number, number];
  radius: number;
  rotationSpeed: number;
  color: string;
  description: string;
  facts: string[];
}

interface ErrorBoundaryProps {
  children: ReactNode;
  onError: (error: Error) => void;
}

interface SpaceSceneProps {
  setActivePlanet: (planet: PlanetType | null) => void;
}

interface PlanetProps {
  planet: PlanetType;
  onClick: () => void;
}

interface NebulaProps {
  position: [number, number, number];
  color: string;
  scale: number;
}

interface SpaceStationProps {
  position: [number, number, number];
}

interface AsteroidBeltProps {
  count: number;
  radius: number;
  width: number;
}

export default function SpaceExplorer() {
  const [activePlanet, setActivePlanet] = useState<PlanetType | null>(null)
  const [showControls, setShowControls] = useState<boolean>(true)
  const [showFacts, setShowFacts] = useState<boolean>(false)
  const [error, setError] = useState<Error | null>(null)

  useEffect(() => {
    // Hide controls after 5 seconds
    const timer = setTimeout(() => {
      setShowControls(false)
    }, 5000)

    return () => clearTimeout(timer)
  }, [])

  // Error handler for the entire component
  if (error) {
    return (
      <div className="w-full h-screen flex flex-col items-center justify-center bg-black text-white p-4">
        <h2 className="text-2xl font-bold text-red-500 mb-4">Something went wrong</h2>
        <p className="mb-4">{error.message || "An error occurred while loading the space explorer"}</p>
        <button
          onClick={() => window.location.reload()}
          className="px-4 py-2 bg-purple-600 hover:bg-purple-700 rounded-md"
        >
          Reload Page
        </button>
      </div>
    )
  }

  return (
    <div className="relative w-full h-screen">
      <ErrorBoundary onError={(e: Error) => setError(e)}>
        <Canvas shadows dpr={[1, 2]}>
          <PerspectiveCamera makeDefault position={[0, 0, 15]} fov={60} />
          <color attach="background" args={["#000010"]} />

          <ambientLight intensity={0.2} />
          <pointLight position={[0, 0, 0]} intensity={2} color="#ffffff" />

          <Stars radius={100} depth={50} count={5000} factor={4} saturation={0} fade speed={1} />

          <Suspense fallback={null}>
            <SpaceScene setActivePlanet={setActivePlanet} />
          </Suspense>

          <OrbitControls
            enablePan={true}
            enableZoom={true}
            enableRotate={true}
            minDistance={2}
            maxDistance={100}
            zoomSpeed={0.5}
          />

          <Environment preset="night" />
        </Canvas>
      </ErrorBoundary>

      {/* UI Overlay */}
      <div className="absolute top-0 left-0 w-full h-full pointer-events-none">
        {activePlanet && <InfoPanel planet={activePlanet} onClose={() => setActivePlanet(null)} />}

        {showControls && (
          <div className="absolute bottom-8 left-1/2 transform -translate-x-1/2 bg-black/70 text-white p-4 rounded-lg border border-purple-500/50 max-w-md text-center pointer-events-auto">
            <h3 className="text-xl font-bold mb-2">Welcome to Space Explorer</h3>
            <p className="mb-4">Use your mouse to navigate through space:</p>
            <ul className="text-sm text-gray-300 space-y-1 mb-4">
              <li>• Left click + drag to rotate the view</li>
              <li>• Scroll to zoom in and out</li>
              <li>• Right click + drag to pan</li>
            </ul>
            <button
              onClick={() => setShowControls(false)}
              className="bg-purple-600 hover:bg-purple-700 px-4 py-2 rounded-md text-sm"
            >
              Got it!
            </button>
          </div>
        )}

        <NavigationControls onShowFacts={() => setShowFacts(true)} onShowControls={() => setShowControls(true)} />

        {showFacts && <SpaceFacts onClose={() => setShowFacts(false)} />}
      </div>
    </div>
  )
}

// Simple error boundary component
function ErrorBoundary({ children, onError }: ErrorBoundaryProps) {
  try {
    return children
  } catch (error) {
    if (error instanceof Error) {
      onError(error)
    } else {
      onError(new Error("Unknown error"))
    }
    return null
  }
}

function SpaceScene({ setActivePlanet }: SpaceSceneProps) {
  // Planet data
  const planets: PlanetType[] = [
    {
      id: "earth",
      name: "Earth",
      position: [0, 0, 0],
      radius: 1,
      rotationSpeed: 0.001,
      // Remove texture path and use color instead
      color: "#1d7dff",
      description:
        "Our home planet, the only known world with abundant liquid water and life. Earth has a diverse ecosystem and a protective atmosphere that shields us from harmful radiation.",
      facts: [
        "Earth is the third planet from the Sun and the only astronomical object known to harbor life.",
        "About 71% of Earth's surface is covered with water.",
        "Earth's atmosphere is composed of 78% nitrogen, 21% oxygen, and 1% other gases.",
      ],
    },
    {
      id: "mars",
      name: "Mars",
      position: [5, 1, -3],
      radius: 0.5,
      rotationSpeed: 0.0008,
      color: "#c1440e",
      description:
        "The Red Planet, named for its rusty iron-rich soil. Mars has polar ice caps, extinct volcanoes, and evidence of ancient flowing water.",
      facts: [
        "Mars is the fourth planet from the Sun and the second-smallest planet in the Solar System.",
        "Mars has the largest dust storms in the solar system, which can last for months and cover the entire planet.",
        "Mars has two small moons, Phobos and Deimos, which may be captured asteroids.",
      ],
    },
    {
      id: "jupiter",
      name: "Jupiter",
      position: [-8, 2, -10],
      radius: 2.5,
      rotationSpeed: 0.002,
      color: "#e0a568",
      description:
        "The largest planet in our solar system, a gas giant with a distinctive system of bands and a Great Red Spot - a storm larger than Earth that has raged for centuries.",
      facts: [
        "Jupiter is the fifth planet from the Sun and the largest in the Solar System.",
        "Jupiter has at least 79 moons, including the four large Galilean moons discovered by Galileo Galilei in 1610.",
        "Jupiter's Great Red Spot is a giant storm that has been raging for at least 400 years.",
      ],
    },
    {
      id: "saturn",
      name: "Saturn",
      position: [12, -3, -15],
      radius: 2,
      rotationSpeed: 0.0015,
      color: "#f4d4a9",
      description:
        "Famous for its spectacular ring system, Saturn is a gas giant composed mainly of hydrogen and helium with a small rocky core.",
      facts: [
        "Saturn is the sixth planet from the Sun and the second-largest in the Solar System.",
        "Saturn's rings are made mostly of ice particles, with a smaller amount of rocky debris and dust.",
        "Saturn has at least 82 moons, with Titan being the largest and the only moon in the solar system with a substantial atmosphere.",
      ],
    },
    {
      id: "neptune",
      name: "Neptune",
      position: [-15, 0, -20],
      radius: 1.2,
      rotationSpeed: 0.001,
      color: "#3454eb",
      description:
        "The windiest planet in our solar system, with supersonic winds reaching up to 1,200 mph. Neptune is an ice giant with a mysterious dark storm similar to Jupiter's Great Red Spot.",
      facts: [
        "Neptune is the eighth and farthest known planet from the Sun in the Solar System.",
        "Neptune was the first planet located through mathematical calculations rather than through observation.",
        "Neptune has 14 known moons, with Triton being the largest and the only large moon in the solar system that orbits in the opposite direction to its planet's rotation.",
      ],
    },
  ]

  // Nebula positions
  const nebulae: NebulaProps[] = [
    { position: [30, 10, -40], color: "#ff7b00", scale: 15 },
    { position: [-40, -15, -30], color: "#9c00ff", scale: 20 },
    { position: [0, 30, -50], color: "#00a2ff", scale: 25 },
  ]

  return (
    <>
      {/* Sun */}
      <mesh position={[50, 20, -100]}>
        <sphereGeometry args={[10, 32, 32]} />
        <meshBasicMaterial color="#ffff80" />
        <pointLight intensity={1.5} distance={1000} decay={2} />
      </mesh>

      {/* Planets */}
      {planets.map((planet) => (
        <Planet key={planet.id} planet={planet} onClick={() => setActivePlanet(planet)} />
      ))}

      {/* Nebulae */}
      {nebulae.map((nebula, index) => (
        <Nebula key={index} {...nebula} />
      ))}

      {/* Space Station */}
      <SpaceStation position={[3, 2, 5]} />

      {/* Asteroid Belt */}
      <AsteroidBelt count={100} radius={20} width={5} />
    </>
  )
}

function Planet({ planet, onClick }: PlanetProps) {
  const meshRef = useRef<THREE.Mesh>(null)
  const textRef = useRef<THREE.Object3D>(null)
  const { camera } = useThree()
  const [isHovered, setIsHovered] = useState<boolean>(false)
  const [distance, setDistance] = useState<number>(0)
  /*  ─────────────────────────────────────────────────────────────
    We no longer attempt to load textures; every planet uses the
    provided fallback color material so the loader never receives
    an undefined path.
   ───────────────────────────────────────────────────────────── */

  useFrame((state, delta) => {
    if (meshRef.current) {
      // Rotate the planet
      meshRef.current.rotation.y += planet.rotationSpeed

      // Calculate distance to camera
      const distanceToCamera = meshRef.current.position.distanceTo(camera.position)
      setDistance(distanceToCamera)

      // Make text face the camera
      if (textRef.current) {
        textRef.current.lookAt(camera.position)
      }
    }
  })

  // Determine if label should be visible based on distance
  const showLabel = distance < 30

  return (
    <group position={planet.position}>
      <mesh
        ref={meshRef}
        onClick={onClick}
        onPointerOver={() => setIsHovered(true)}
        onPointerOut={() => setIsHovered(false)}
      >
        <sphereGeometry args={[planet.radius, 32, 32]} />
        <meshStandardMaterial color={planet.color || "#4d79ff"} />
      </mesh>

      {/* Planet atmosphere glow effect */}
      <mesh scale={[1.05, 1.05, 1.05]}>
        <sphereGeometry args={[planet.radius, 32, 32]} />
        <meshBasicMaterial color={planet.color || "#4d79ff"} transparent={true} opacity={0.1} />
      </mesh>

      {/* Planet name label */}
      {showLabel && (
        <Billboard follow={true} lockX={false} lockY={false} lockZ={false}>
          <Text
            ref={textRef}
            position={[0, planet.radius + 0.5, 0]}
            fontSize={0.5}
            color="white"
            anchorX="center"
            anchorY="middle"
            outlineWidth={0.05}
            outlineColor="#000000"
          >
            {planet.name}
          </Text>
        </Billboard>
      )}

      {/* Hover indicator */}
      {isHovered && (
        <mesh scale={[1.1, 1.1, 1.1]}>
          <sphereGeometry args={[planet.radius, 32, 32]} />
          <meshBasicMaterial color="#ffffff" wireframe={true} transparent={true} opacity={0.2} />
        </mesh>
      )}
    </group>
  )
}

function Nebula({ position, color, scale }: NebulaProps) {
  const meshRef = useRef<THREE.Mesh>(null)

  useFrame((state, delta) => {
    if (meshRef.current) {
      meshRef.current.rotation.x += 0.0001
      meshRef.current.rotation.y += 0.0001
    }
  })

  return (
    <group position={position}>
      <mesh ref={meshRef}>
        <sphereGeometry args={[scale, 16, 16]} />
        <meshBasicMaterial color={color} transparent={true} opacity={0.15} side={THREE.BackSide} />
      </mesh>
    </group>
  )
}

function SpaceStation({ position }: SpaceStationProps) {
  const groupRef = useRef<THREE.Group>(null)

  useFrame((state, delta) => {
    if (groupRef.current) {
      groupRef.current.rotation.y += 0.001
    }
  })

  return (
    <group ref={groupRef} position={position}>
      {/* Main module */}
      <mesh position={[0, 0, 0]}>
        <cylinderGeometry args={[0.3, 0.3, 1.5, 16]} />
        <meshStandardMaterial color="#888888" metalness={0.8} roughness={0.2} />
      </mesh>

      {/* Solar panels */}
      <mesh position={[1.2, 0, 0]} rotation={[0, 0, Math.PI / 2]}>
        <boxGeometry args={[2, 0.05, 0.8]} />
        <meshStandardMaterial color="#2266ff" metalness={0.5} roughness={0.2} />
      </mesh>

      <mesh position={[-1.2, 0, 0]} rotation={[0, 0, Math.PI / 2]}>
        <boxGeometry args={[2, 0.05, 0.8]} />
        <meshStandardMaterial color="#2266ff" metalness={0.5} roughness={0.2} />
      </mesh>

      {/* Docking module */}
      <mesh position={[0, 0, 1]}>
        <sphereGeometry args={[0.4, 16, 16]} />
        <meshStandardMaterial color="#aaaaaa" metalness={0.8} roughness={0.2} />
      </mesh>

      {/* Station label */}
      <Billboard follow={true} lockX={false} lockY={false} lockZ={false}>
        <Text
          position={[0, 1, 0]}
          fontSize={0.3}
          color="white"
          anchorX="center"
          anchorY="middle"
          outlineWidth={0.05}
          outlineColor="#000000"
        >
          ISS Alpha
        </Text>
      </Billboard>

      {/* Blinking light */}
      <pointLight position={[0, 0.5, 0]} intensity={0.5} distance={5} color="#ff0000" />
    </group>
  )
}

function AsteroidBelt({ count, radius, width }: AsteroidBeltProps) {
  const asteroids: { position: [number, number, number]; rotation: [number, number, number]; size: number }[] = []

  for (let i = 0; i < count; i++) {
    // Calculate random position on a ring
    const angle = Math.random() * Math.PI * 2
    const distance = radius + (Math.random() - 0.5) * width
    const x = Math.cos(angle) * distance
    const z = Math.sin(angle) * distance
    const y = (Math.random() - 0.5) * width

    // Random size
    const size = Math.random() * 0.3 + 0.1

    // Random rotation
    const rotX = Math.random() * Math.PI
    const rotY = Math.random() * Math.PI
    const rotZ = Math.random() * Math.PI

    asteroids.push({
      position: [x, y, z],
      rotation: [rotX, rotY, rotZ],
      size,
    })
  }

  return (
    <group>
      {asteroids.map((asteroid, index) => (
        <mesh key={index} position={asteroid.position} rotation={asteroid.rotation}>
          <dodecahedronGeometry args={[asteroid.size, 0]} />
          <meshStandardMaterial
            color={`rgb(${100 + Math.random() * 50}, ${100 + Math.random() * 50}, ${100 + Math.random() * 50})`}
            roughness={0.8}
          />
        </mesh>
      ))}
    </group>
  )
}
