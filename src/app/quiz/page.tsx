"use client";

import { useState, useEffect } from 'react'
import { useRouter } from 'next/navigation'
import Image from 'next/image'
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardFooter, CardHeader, CardTitle } from "@/components/ui/card"
import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group"
import { Label } from "@/components/ui/label"
import { Progress } from "@/components/ui/progress"
import { motion, AnimatePresence } from "framer-motion"

const questions = [
    {
        question: "Chkoun yel3eb dour Sbou3i?",
        options: ["Mouna Noureddine", "Kamel Touati", "Mohsen Ben Abdallah", "Jamila Chihi"],
        correctAnswer: 1,
        image: "/placeholder.svg?height=300&width=500&text=Sbou3i"
    },
    {
        question: "Fi èna 3am bdet série Choufli Hal?",
        options: ["2003", "2005", "2007", "2009"],
        correctAnswer: 1,
        image: "/placeholder.svg?height=300&width=500&text=Choufli+Hal+2005"
    },
    // Add more questions here
]

const backgroundQuotes = [
    "Chouf chouf!",
    "Ya weldi!",
    "Malla nhar!",
    "Sahbi, sahbi!",
]

export default function Quiz() {
    const [currentQuestion, setCurrentQuestion] = useState(0)
    const [selectedAnswer, setSelectedAnswer] = useState<number | null>(null)
    const [score, setScore] = useState(0)
    const [timeLeft, setTimeLeft] = useState(15)
    const router = useRouter()

    useEffect(() => {
        if (timeLeft > 0) {
            const timer = setTimeout(() => setTimeLeft(timeLeft - 1), 1000)
            return () => clearTimeout(timer)
        } else {
            handleAnswer()
        }
    }, [timeLeft])

    const handleAnswer = () => {
        if (selectedAnswer === questions[currentQuestion].correctAnswer) {
            setScore(score + 1)
        }

        if (currentQuestion + 1 < questions.length) {
            setCurrentQuestion(currentQuestion + 1)
            setSelectedAnswer(null)
            setTimeLeft(15)
        } else {
            router.push(`/results?score=${score + (selectedAnswer === questions[currentQuestion].correctAnswer ? 1 : 0)}`)
        }
    }

    return (
        <div className="min-h-screen bg-gradient-to-r from-yellow-200 to-yellow-500 overflow-hidden relative p-4">
            {/* Background quotes */}
            {backgroundQuotes.map((quote, index) => (
                <motion.div
                    key={index}
                    className="absolute text-xl md:text-2xl font-bold text-yellow-800 opacity-20 hidden sm:block"
                    initial={{ opacity: 0, x: -100 }}
                    animate={{ opacity: 0.2, x: 0 }}
                    transition={{ delay: index * 0.5, duration: 0.5 }}
                    style={{
                        top: `${25 * (index + 1)}%`,
                        left: `${Math.random() * 80}%`,
                        transform: `rotate(${Math.random() * 20 - 10}deg)`,
                    }}
                >
                    {quote}
                </motion.div>
            ))}

            <div className="flex justify-center items-center min-h-screen">
                <AnimatePresence mode="wait">
                    <motion.div
                        key={currentQuestion}
                        initial={{ rotateY: 90, opacity: 0 }}
                        animate={{ rotateY: 0, opacity: 1 }}
                        exit={{ rotateY: -90, opacity: 0 }}
                        transition={{ duration: 0.5 }}
                    >
                        <Card className="w-full max-w-md overflow-hidden">
                            <motion.div whileHover={{ scale: 1.05 }} transition={{ type: "spring", stiffness: 300 }}>
                                <Image src={questions[currentQuestion].image} width={500} height={300} alt={`Question ${currentQuestion + 1}`} className="w-full" />
                            </motion.div>
                            <CardHeader>
                                <CardTitle>
                                    <motion.div animate={{ scale: [1, 1.1, 1] }} transition={{ duration: 0.5 }} className="text-xl md:text-2xl text-center">
                                        Sou2èl {currentQuestion + 1} / {questions.length}
                                    </motion.div>
                                </CardTitle>
                                <Progress value={(timeLeft / 15) * 100} className="w-full" />
                                <p className="text-center mt-2">Time left: {timeLeft}s</p>
                            </CardHeader>
                            <CardContent>
                                <p className="mb-4 text-center text-lg font-semibold">{questions[currentQuestion].question}</p>
                                <RadioGroup onValueChange={(value) => setSelectedAnswer(parseInt(value))}>
                                    {questions[currentQuestion].options.map((option, index) => (
                                        <motion.div
                                            key={index}
                                            initial={{ x: -50, opacity: 0 }}
                                            animate={{ x: 0, opacity: 1 }}
                                            transition={{ delay: index * 0.1 }}
                                        >
                                            <div className="flex items-center space-x-2 my-3">
                                                <RadioGroupItem value={index.toString()} id={`option-${index}`} />
                                                <Label htmlFor={`option-${index}`} className="text-base md:text-lg">{option}</Label>
                                            </div>
                                        </motion.div>
                                    ))}
                                </RadioGroup>
                            </CardContent>
                            <CardFooter>
                                <motion.div className="w-full" whileHover={{ scale: 1.05 }} whileTap={{ scale: 0.95 }}>
                                    <Button onClick={handleAnswer} disabled={selectedAnswer === null} className="w-full bg-yellow-600 hover:bg-yellow-700 text-lg py-6">
                                        {currentQuestion + 1 === questions.length ? 'Kammel' : 'El sou2èl elli ba3dou'}
                                    </Button>
                                </motion.div>
                            </CardFooter>
                        </Card>
                    </motion.div>
                </AnimatePresence>
            </div>
        </div>
    )
}
