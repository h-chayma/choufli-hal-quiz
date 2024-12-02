"use client";

import { useSearchParams } from 'next/navigation'
import Link from 'next/link'
import Image from 'next/image'
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardFooter, CardHeader, CardTitle } from "@/components/ui/card"
import { motion } from "framer-motion"

const celebrationEmojis = ["🎉", "🎊", "🥳", "👏", "🙌"]

export default function Results() {
    const searchParams = useSearchParams()
    const score = searchParams.get('score')
    const totalQuestions = 2 // Update this when you add more questions

    return (
        <div className="min-h-screen bg-gradient-to-r from-yellow-200 to-yellow-500 overflow-hidden relative p-4">
            {/* Celebration emojis */}
            {celebrationEmojis.map((emoji, index) => (
                <motion.div
                    key={index}
                    className="absolute text-4xl hidden sm:block"
                    initial={{ y: -50, opacity: 0 }}
                    animate={{ y: 0, opacity: 1 }}
                    transition={{ delay: index * 0.2, duration: 0.5 }}
                    style={{
                        top: `${Math.random() * 80}%`,
                        left: `${Math.random() * 80}%`,
                    }}
                >
                    {emoji}
                </motion.div>
            ))}

            {/* Character sticker */}
            <motion.div
                className="absolute bottom-10 right-10 hidden md:block"
                animate={{ rotate: [0, 10, -10, 0] }}
                transition={{ duration: 2, repeat: Infinity }}
            >
                <Image src="/placeholder.svg?text=Sbou3i+Thumbs+Up" width={150} height={150} alt="Sbou3i Thumbs Up" />
            </motion.div>

            <div className="flex justify-center items-center min-h-screen">
                <motion.div
                    initial={{ scale: 0, rotate: -180 }}
                    animate={{ scale: 1, rotate: 0 }}
                    transition={{ type: "spring", stiffness: 260, damping: 20 }}
                >
                    <Card className="w-full max-w-md overflow-hidden">
                        <motion.div whileHover={{ scale: 1.05 }} transition={{ type: "spring", stiffness: 300 }}>
                            <Image src="/placeholder.svg?height=300&width=500&text=Mabrouk!" width={500} height={300} alt="Quiz Results" className="w-full" />
                        </motion.div>
                        <CardHeader>
                            <CardTitle>
                                <motion.div animate={{ scale: [1, 1.2, 1] }} transition={{ duration: 0.5, repeat: Infinity, repeatDelay: 1 }} className="text-2xl md:text-3xl text-center">
                                    Natèyej el Quiz
                                </motion.div>
                            </CardTitle>
                        </CardHeader>
                        <CardContent>
                            <motion.p
                                initial={{ opacity: 0, y: 20 }}
                                animate={{ opacity: 1, y: 0 }}
                                transition={{ delay: 0.5 }}
                                className="text-xl md:text-2xl text-center font-bold mb-4"
                            >
                                Natijtek: {score} mel {totalQuestions}
                            </motion.p>
                            <motion.div
                                initial={{ opacity: 0, y: 20 }}
                                animate={{ opacity: 1, y: 0 }}
                                transition={{ delay: 0.8 }}
                                className="text-lg md:text-xl text-center"
                            >
                                {Number(score) === totalQuestions && <p>Mabrouk! Inti fan kbir mta3 Choufli Hal!</p>}
                                {Number(score) >= totalQuestions / 2 && Number(score) < totalQuestions && <p>Mech khayeb! Amma lazem tchuf el série marra okhra!</p>}
                                {Number(score) < totalQuestions / 2 && <p>Yèzzi mel ghoch w arja3 chuf el série!</p>}
                            </motion.div>
                        </CardContent>
                        <CardFooter className="flex justify-center">
                            <Link href="/" passHref style={{ width: '100%', maxWidth: '250px' }}>
                                <motion.div whileHover={{ scale: 1.05 }} whileTap={{ scale: 0.95 }}>
                                    <Button className="w-full bg-yellow-600 hover:bg-yellow-700 text-lg py-6">A3awed el Quiz</Button>
                                </motion.div>
                            </Link>
                        </CardFooter>
                    </Card>
                </motion.div>
            </div>
        </div>
    )
}
