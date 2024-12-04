"use client";

import React, { useEffect, useState, useRef } from "react";
import { Button } from "@/components/ui/button";
import { Settings, VolumeX, Volume2, Home } from 'lucide-react';
import { Slider } from "@/components/ui/slider";
import { usePathname, useRouter } from "next/navigation";
import { motion, AnimatePresence } from "framer-motion";

export function AppWrapper({ children }: { children: React.ReactNode }) {
    const [isPlaying, setIsPlaying] = useState(false);
    const [volume, setVolume] = useState(50);
    const [showSettings, setShowSettings] = useState(false);
    const audioRef = useRef<HTMLAudioElement | null>(null);
    const router = useRouter();
    const pathname = usePathname();
    const isQuizPage = pathname === '/quiz';

    useEffect(() => {
        audioRef.current = new Audio("/music/generique.mp3");
        audioRef.current.loop = true;
        audioRef.current.volume = volume / 100;

        const playAudio = () => {
            if (audioRef.current && !isPlaying) {
                audioRef.current.play().then(() => {
                    setIsPlaying(true);
                }).catch((error) => {
                    console.log("Audio playback failed:", error);
                })
            }
        }

        document.addEventListener("click", playAudio);

        return () => {
            if (audioRef.current) {
                audioRef.current.pause();
            }
            document.removeEventListener("click", playAudio);
        }
    }, [])

    useEffect(() => {
        if (audioRef.current) {
            audioRef.current.volume = volume / 100;
        }
    }, [volume])

    const toggleMute = () => {
        setVolume(volume === 0 ? 50 : 0);
    }

    const handleQuitQuiz = () => {
        router.push('/');
    }

    return (
        <>
            {children}
            <div className="fixed top-4 right-4 z-50 flex items-center space-x-2">
                <motion.div whileHover={{ scale: 1.1 }} whileTap={{ scale: 0.9 }}>
                    <Button variant="outline" size="icon" onClick={toggleMute} className="text-white bg-white/20 backdrop-blur-sm">
                        {volume === 0 ? <VolumeX className="h-4 w-4" /> : <Volume2 className="h-4 w-4" />}
                    </Button>
                </motion.div>
                <motion.div whileHover={{ scale: 1.1 }} whileTap={{ scale: 0.9 }}>
                    <Button variant="outline" size="icon" onClick={() => setShowSettings(!showSettings)} className="text-white bg-white/20 backdrop-blur-sm">
                        <Settings className="h-4 w-4" />
                    </Button>
                </motion.div>
            </div>
            <AnimatePresence>
                {showSettings && (
                    <motion.div
                        initial={{ opacity: 0, y: -20 }}
                        animate={{ opacity: 1, y: 0 }}
                        exit={{ opacity: 0, y: -20 }}
                        className="fixed top-16 right-4 z-50 bg-white/20 backdrop-blur-sm p-4 rounded-md shadow-lg"
                    >
                        <Slider
                            className="w-32"
                            min={0}
                            max={100}
                            step={1}
                            value={[volume]}
                            onValueChange={(value) => setVolume(value[0])}
                        />
                    </motion.div>
                )}
            </AnimatePresence>
            {isQuizPage && (
                <motion.div
                    initial={{ opacity: 0, x: -20 }}
                    animate={{ opacity: 1, x: 0 }}
                    className="fixed bottom-4 left-4 z-50"
                >
                    <Button variant="outline" onClick={handleQuitQuiz} className="text-white bg-white/20 backdrop-blur-sm">
                        <Home className="h-4 w-4 mr-2" />
                        خروج
                    </Button>
                </motion.div>
            )}
        </>
    )
}
