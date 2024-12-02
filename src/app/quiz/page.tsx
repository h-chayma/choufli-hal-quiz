'use client'

import { useState } from 'react'
import { useRouter } from 'next/navigation'
import Image from 'next/image'
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardFooter, CardHeader, CardTitle } from "@/components/ui/card"
import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group"
import { Label } from "@/components/ui/label"
import { motion, AnimatePresence } from "framer-motion"

const questions = [
    {
        question: "Chkoun yel3eb dour Sbou3i?",
        options: ["Mouna Noureddine", "Kamel Touati", "Soufien Chaari", "Jamila Chihi"],
        correctAnswer: 2,
        image: "/images/sbou3i.jpg"
    },
    {
        question: "Fi èna 3am bdet série Choufli Hal?",
        options: ["2003", "2005", "2007", "2009"],
        correctAnswer: 1,
        image: "/images/chouflihal-tv.jpg"
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
    const router = useRouter()

    const handleAnswer = () => {
        if (selectedAnswer === null) return

        if (selectedAnswer === questions[currentQuestion].correctAnswer) {
            setScore(score + 1)
        }

        if (currentQuestion + 1 < questions.length) {
            setCurrentQuestion(currentQuestion + 1)
            setSelectedAnswer(null)
        } else {
            router.push(`/results?score=${score + (selectedAnswer === questions[currentQuestion].correctAnswer ? 1 : 0)}`)
        }
    }

    return (
        <div className="container mx-auto flex items-center justify-center min-h-screen bg-gradient-to-r from-yellow-200 to-yellow-500 overflow-hidden relative">
            {/* Background quotes */}
            {backgroundQuotes.map((quote, index) => (
                <motion.div
                    key={index}
                    className="absolute text-2xl font-bold text-yellow-800 opacity-20"
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

            <AnimatePresence mode="wait">
                <motion.div
                    key={currentQuestion}
                    initial={{ rotateY: 90, opacity: 0 }}
                    animate={{ rotateY: 0, opacity: 1 }}
                    exit={{ rotateY: -90, opacity: 0 }}
                    transition={{ duration: 0.5 }}
                >
                    <Card className="w-[350px] overflow-hidden">
                        <motion.div whileHover={{ scale: 1.05 }} transition={{ type: "spring", stiffness: 300 }}>
                            <Image src={questions[currentQuestion].image} width={350} height={200} alt={`Question ${currentQuestion + 1}`} className="w-full" />
                        </motion.div>
                        <CardHeader>
                            <CardTitle>
                                <motion.div animate={{ scale: [1, 1.1, 1] }} transition={{ duration: 0.5 }}>
                                    Sou2èl {currentQuestion + 1}
                                </motion.div>
                            </CardTitle>
                        </CardHeader>
                        <CardContent>
                            <p className="mb-4">{questions[currentQuestion].question}</p>
                            <RadioGroup onValueChange={(value) => setSelectedAnswer(parseInt(value))}>
                                {questions[currentQuestion].options.map((option, index) => (
                                    <motion.div
                                        key={index}
                                        initial={{ x: -50, opacity: 0 }}
                                        animate={{ x: 0, opacity: 1 }}
                                        transition={{ delay: index * 0.1 }}
                                    >
                                        <div className="flex items-center space-x-2 my-2">
                                            <RadioGroupItem value={index.toString()} id={`option-${index}`} />
                                            <Label htmlFor={`option-${index}`}>{option}</Label>
                                        </div>
                                    </motion.div>
                                ))}
                            </RadioGroup>
                        </CardContent>
                        <CardFooter>
                            <motion.div className="w-full" whileHover={{ scale: 1.05 }} whileTap={{ scale: 0.95 }}>
                                <Button onClick={handleAnswer} disabled={selectedAnswer === null} className="w-full bg-yellow-600 hover:bg-yellow-700">
                                    {currentQuestion + 1 === questions.length ? 'Kammel' : 'El sou2èl elli ba3dou'}
                                </Button>
                            </motion.div>
                        </CardFooter>
                    </Card>
                </motion.div>
            </AnimatePresence>
        </div>
    )
}
