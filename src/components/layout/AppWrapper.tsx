"use client"

import React, { useEffect, useState } from "react"
import { usePathname } from "next/navigation"
import { Button } from "@/components/ui/button"
import { Settings, VolumeX, Volume2 } from 'lucide-react'
import { Slider } from "@/components/ui/slider"

export function AppWrapper({ children }: { children: React.ReactNode }) {
  const [isPlaying, setIsPlaying] = useState(false)
  const [volume, setVolume] = useState(50)
  const [showSettings, setShowSettings] = useState(false)
  const pathname = usePathname()

  useEffect(() => {
    const audio = new Audio("/music/generique.mp3")
    audio.loop = true
    audio.volume = volume / 100

    const playAudio = () => {
      if (!isPlaying) {
        audio.play().catch((error) => {
          console.error("Audio playback failed:", error)
        })
        setIsPlaying(true)
      }
    }

    document.addEventListener("click", playAudio)

    return () => {
      audio.pause()
      document.removeEventListener("click", playAudio)
    }
  }, [isPlaying, volume])

  const toggleMute = () => {
    setVolume(volume === 0 ? 50 : 0)
  }

  return (
    <div className="min-h-screen flex flex-col items-center justify-center bg-gradient-to-r from-primary to-secondary p-4">
      {children}
      <div className="fixed top-4 right-4 z-50 flex items-center space-x-2">
        <Button variant="outline" size="icon" onClick={toggleMute}>
          {volume === 0 ? <VolumeX className="h-4 w-4" /> : <Volume2 className="h-4 w-4" />}
        </Button>
        <Button variant="outline" size="icon" onClick={() => setShowSettings(!showSettings)}>
          <Settings className="h-4 w-4" />
        </Button>
      </div>
      {showSettings && (
        <div className="fixed top-16 right-4 z-50 bg-background p-4 rounded-md shadow-lg">
          <Slider
            className="w-32"
            min={0}
            max={100}
            step={1}
            value={[volume]}
            onValueChange={(value) => setVolume(value[0])}
          />
        </div>
      )}
    </div>
  )
}
