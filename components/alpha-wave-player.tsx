'use client'

import { useState, useRef, useEffect } from 'react'
import { Slider } from "@/components/ui/slider"
import { Button } from "@/components/ui/button"
import { Play, Pause, Volume2, AlertCircle } from 'lucide-react'
import { Alert, AlertDescription, AlertTitle } from "@/components/ui/alert"

const AUDIO_SOURCES = [
  "/audio/432test.mp3",
  "https://file-examples.com/wp-content/storage/2017/11/file_example_MP3_700KB.mp3", // Replace with an actual backup URL
]

export default function AlphaWavePlayer() {
  const [isPlaying, setIsPlaying] = useState(false)
  const [volume, setVolume] = useState(0.5)
  const [error, setError] = useState<string | null>(null)
  const [currentSourceIndex, setCurrentSourceIndex] = useState(0)
  const audioRef = useRef<HTMLAudioElement | null>(null)

  useEffect(() => {
    const setupAudio = () => {
      if (audioRef.current) {
        audioRef.current.pause()
        audioRef.current.removeEventListener('canplaythrough', handleCanPlayThrough)
        audioRef.current.removeEventListener('error', handleError)
      }

      audioRef.current = new Audio(AUDIO_SOURCES[currentSourceIndex])
      audioRef.current.loop = true
      audioRef.current.volume = volume

      audioRef.current.addEventListener('canplaythrough', handleCanPlayThrough)
      audioRef.current.addEventListener('error', handleError)
    }

    setupAudio()

    return () => {
      if (audioRef.current) {
        audioRef.current.pause()
        audioRef.current.removeEventListener('canplaythrough', handleCanPlayThrough)
        audioRef.current.removeEventListener('error', handleError)
      }
    }
  }, [currentSourceIndex, volume])

  const handleCanPlayThrough = () => setError(null)

  const handleError = () => {
    if (currentSourceIndex < AUDIO_SOURCES.length - 1) {
      setCurrentSourceIndex(currentSourceIndex + 1)
    } else {
      setError("Unable to load audio. Please check your connection or try again later.")
    }
  }

  const togglePlayPause = () => {
    if (!audioRef.current) return

    if (isPlaying) {
      audioRef.current.pause()
    } else {
      audioRef.current.play().catch(e => {
        console.error("Error playing audio:", e)
        setError("Unable to play audio. Please check your browser settings or try again.")
      })
    }
    setIsPlaying(!isPlaying)
  }

  const handleVolumeChange = (newVolume: number[]) => {
    setVolume(newVolume[0])
    if (audioRef.current) {
      audioRef.current.volume = newVolume[0]
    }
  }

  return (
    <div className="bg-white p-6 rounded-lg shadow-lg w-full max-w-md">
      <div className="flex items-center justify-between mb-4">
        <Button onClick={togglePlayPause} size="lg" className="w-16 h-16 rounded-full" disabled={!!error}>
          {isPlaying ? <Pause className="h-8 w-8" /> : <Play className="h-8 w-8" />}
        </Button>
        <div className="flex items-center space-x-2 flex-1 ml-4">
          <Volume2 className="h-5 w-5 text-gray-500" />
          <Slider
            value={[volume]}
            max={1}
            step={0.01}
            onValueChange={handleVolumeChange}
            className="w-full"
          />
        </div>
      </div>
      {error ? (
        <Alert variant="destructive">
          <AlertCircle className="h-4 w-4" />
          <AlertTitle>Error</AlertTitle>
          <AlertDescription>{error}</AlertDescription>
        </Alert>
      ) : (
        <p className="text-center text-gray-600">
          {isPlaying ? "Now playing 432 Hz alpha wave music" : "Click play to start the music"}
        </p>
      )}
    </div>
  )
}

