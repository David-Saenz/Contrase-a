"use client"

import { useState, useEffect } from "react"
import { Button } from "@/components/ui/button"
import { Card, CardContent } from "@/components/ui/card"

export function MoodlePasswordRequest() {
  const [showThanks, setShowThanks] = useState(false)
  const [noButtonPosition, setNoButtonPosition] = useState({ x: 0, y: 0 })
  const [isMobile, setIsMobile] = useState(false)

  useEffect(() => {
    const checkMobile = () => {
      setIsMobile(window.innerWidth < 768)
    }

    checkMobile()
    window.addEventListener("resize", checkMobile)
    return () => window.removeEventListener("resize", checkMobile)
  }, [])

  const moveNoButton = () => {
    const maxX = isMobile ? 200 : 300
    const maxY = isMobile ? 100 : 150

    setNoButtonPosition({
      x: Math.random() * maxX - maxX / 2,
      y: Math.random() * maxY - maxY / 2,
    })
  }

  const handleYesClick = () => {
    setShowThanks(true)
  }

  if (showThanks) {
    return (
      <Card className="w-full max-w-md mx-auto bg-white/90 backdrop-blur-sm shadow-xl">
        <CardContent className="p-8 text-center">
          <div className="mb-6">
            <img src="/happy-cute-cat-gif-celebrating-with-sparkles.jpg" alt="Gatito feliz" className="w-32 h-32 mx-auto rounded-full" />
          </div>
          <h2 className="text-2xl font-bold text-green-600 mb-4">¡Gracias! 😸</h2>
          <p className="text-lg text-gray-700">Sabía que dirías que sí, ahora puedes mandármela por mensaje 📱</p>
        </CardContent>
      </Card>
    )
  }

  return (
    <Card className="w-full max-w-md mx-auto bg-white/90 backdrop-blur-sm shadow-xl">
      <CardContent className="p-8 text-center">
        <div className="mb-6">
          <img
            src="/sad-cute-kitten-with-big-eyes-animated-gif.jpg"
            alt="Gatito triste"
            className="w-32 h-32 mx-auto rounded-full animate-bounce"
          />
        </div>

        <h1 className="text-2xl font-bold text-gray-800 mb-8">¿Me pasas tu contraseña de Moodle? 🥺</h1>

        <div className="relative h-32 flex items-center justify-center gap-4">
          <Button
            onClick={handleYesClick}
            className="bg-green-500 hover:bg-green-600 text-white px-8 py-3 text-lg font-semibold"
          >
            Sí
          </Button>

          <Button
            variant="destructive"
            className="bg-red-500 hover:bg-red-600 text-white px-8 py-3 text-lg font-semibold transition-transform duration-300 ease-in-out"
            style={{
              transform: `translate(${noButtonPosition.x}px, ${noButtonPosition.y}px)`,
            }}
            onClick={moveNoButton}
            onMouseEnter={isMobile ? undefined : moveNoButton}
            onTouchStart={isMobile ? moveNoButton : undefined}
          >
            No
          </Button>
        </div>

        <p className="text-sm text-gray-500 mt-6">
          {isMobile ? "Toca el botón que prefieras 😏" : "Elige sabiamente 😏"}
        </p>
      </CardContent>
    </Card>
  )
}
