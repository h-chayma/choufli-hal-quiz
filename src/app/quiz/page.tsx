'use client'

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
        question: "شكون يلعب دور السبوعي؟",
        options: ["منى نور الدين", "كمال التواتي", "محسن بن عبد الله", "جميلة الشيحي"],
        correctAnswer: 1,
        image: "/placeholder.svg?height=300&width=500&text=Sbou3i"
    },
    {
        question: "في أنا عام بدات سلسلة شوفلي حل؟",
        options: ["2003", "2005", "2007", "2009"],
        correctAnswer: 1,
        image: "/placeholder.svg?height=300&width=500&text=Choufli+Hal+2005"
    },
];

const backgroundQuotes = [
    "شوف شوف!",
    "يا ولدي!",
    "ملا نهار!",
    "صاحبي، صاحبي!",
]

export default function Quiz() {
    const [currentQuestion, setCurrentQuestion] = useState(0)
    const [selectedAnswer, setSelectedAnswer] = useState<number | null>(null)
    const [score, setScore] = useState(0)
    const [timeLeft, setTimeLeft] = useState(15)
    const router = useRouter()

    useEffect(() => {
        const audio = new Audio('/music/generique.mp3');
        const playAudio = () => {
            audio.loop = true;
            audio.play().catch((error) => {
                console.error("Audio playback failed:", error);
            });
        };
    
        document.addEventListener('click', playAudio);
    
        return () => {
            audio.pause();
            document.removeEventListener('click', playAudio);
        };
    }, []);
    
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
        <div className="h-screen bg-gradient-to-r from-yellow-200 to-yellow-500 overflow-hidden relative p-4">
            {backgroundQuotes.map((quote, index) => (
                <motion.div
                    key={index}
                    className="absolute text-xl md:text-2xl font-bold text-yellow-800 opacity-20 hidden sm:block arabic-text"
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

            <div className="flex justify-center items-center h-full">
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
                                <Image src={questions[currentQuestion].image} width={500} height={300} alt={`سؤال ${currentQuestion + 1}`} className="w-full" />
                            </motion.div>
                            <CardHeader>
                                <CardTitle>
                                    <motion.div animate={{ scale: [1, 1.1, 1] }} transition={{ duration: 0.5 }} className="text-xl md:text-2xl text-center arabic-text">
                                        سؤال {currentQuestion + 1} / {questions.length}
                                    </motion.div>
                                </CardTitle>
                                <Progress value={(timeLeft / 15) * 100} className="w-full" />
                                <p className="text-center mt-2 arabic-text">الوقت المتبقي: {timeLeft} ثانية</p>
                            </CardHeader>
                            <CardContent>
                                <p className="mb-4 text-center text-lg font-semibold arabic-text">{questions[currentQuestion].question}</p>
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
                                                <Label htmlFor={`option-${index}`} className="text-base md:text-lg arabic-text">{option}</Label>
                                            </div>
                                        </motion.div>
                                    ))}
                                </RadioGroup>
                            </CardContent>
                            <CardFooter>
                                <motion.div className="w-full" whileHover={{ scale: 1.05 }} whileTap={{ scale: 0.95 }}>
                                    <Button onClick={handleAnswer} disabled={selectedAnswer === null} className="w-full bg-yellow-600 hover:bg-yellow-700 text-lg py-6 arabic-text">
                                        {currentQuestion + 1 === questions.length ? 'كمل' : 'السؤال اللي بعدو'}
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
