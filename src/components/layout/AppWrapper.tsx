'use client'

import { useEffect, useState } from 'react'
import Link from 'next/link'
import { Button } from "@/components/ui/button"
import { Settings } from 'lucide-react'
import { usePathname } from 'next/navigation'

export function AppWrapper({ children }: { children: React.ReactNode }) {
  const [isPlaying, setIsPlaying] = useState(false)
  const pathname = usePathname()

  useEffect(() => {
    const audio = new Audio('/music/generique.mp3')
    audio.loop = true

    const playAudio = () => {
      if (!isPlaying) {
        audio.play().catch((error) => {
          console.error("Audio playback failed:", error)
        })
        setIsPlaying(true)
      }
    }

    document.addEventListener('click', playAudio)

    return () => {
      audio.pause()
      document.removeEventListener('click', playAudio)
    }
  }, [isPlaying])

  return (
    <div className="min-h-screen bg-gradient-to-r from-primary to-secondary overflow-hidden relative p-4">
      {children}
      {pathname !== '/settings' && (
        <Link href="/settings" className="fixed top-4 right-4 z-50">
          <Button variant="outline" size="icon">
            <Settings className="h-4 w-4" />
          </Button>
        </Link>
      )}
    </div>
  )
}

