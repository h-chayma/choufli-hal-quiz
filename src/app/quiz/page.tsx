'use client'

import { useState, useEffect } from 'react'
import { useRouter } from 'next/navigation'
import Image from 'next/image'
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardFooter, CardHeader, CardTitle } from "@/components/ui/card"
import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group"
import { Progress } from "@/components/ui/progress"
import { motion, AnimatePresence } from "framer-motion"

const questions = [
    {
        question: "شكون يلعب دور السبوعي؟",
        options: ["منى نور الدين", "كمال التواتي", "محسن بن عبد الله", "جميلة الشيحي"],
        correctAnswer: 1,
        image: "/placeholder.svg?height=300&width=500&text=Sbou3i",
    },
    {
        question: "في أنا عام بدات سلسلة شوفلي حل؟",
        options: ["2003", "2005", "2007", "2009"],
        correctAnswer: 1,
        image: "/placeholder.svg?height=300&width=500&text=Choufli+Hal+2005",
    },
];

export default function Quiz() {
    const [currentQuestion, setCurrentQuestion] = useState(0);
    const [selectedAnswer, setSelectedAnswer] = useState<number | null>(null);
    const [score, setScore] = useState(0);
    const [timeLeft, setTimeLeft] = useState(15);
    const router = useRouter();

    useEffect(() => {
        if (timeLeft > 0) {
            const timer = setTimeout(() => setTimeLeft(timeLeft - 1), 1000);
            return () => clearTimeout(timer);
        } else {
            handleAnswer();
        }
    }, [timeLeft]);

    const handleAnswer = () => {
        if (selectedAnswer === questions[currentQuestion].correctAnswer) {
            setScore(score + 1);
        }

        if (currentQuestion + 1 < questions.length) {
            setCurrentQuestion(currentQuestion + 1);
            setSelectedAnswer(null);
            setTimeLeft(15);
        } else {
            router.push(
                `/results?score=${score + (selectedAnswer === questions[currentQuestion].correctAnswer ? 1 : 0)
                }`
            );
        }
    };

    return (
        <>
            <motion.div
                key={currentQuestion}
                initial={{ rotateY: 90, opacity: 0 }}
                animate={{ rotateY: 0, opacity: 1 }}
                exit={{ rotateY: -90, opacity: 0 }}
                transition={{ duration: 0.5 }}
                className="w-full max-w-md px-4"
            >
                <Card>
                    <motion.div
                        whileHover={{ scale: 1.05 }}
                        transition={{ type: "spring", stiffness: 300 }}
                    >
                        <Image
                            src={questions[currentQuestion].image}
                            width={500}
                            height={300}
                            alt={`سؤال ${currentQuestion + 1}`}
                            className="w-full"
                        />
                    </motion.div>
                    <CardHeader>
                        <CardTitle>
                            <motion.div
                                animate={{ scale: [1, 1.1, 1] }}
                                transition={{ duration: 0.5 }}
                                className="text-xl md:text-2xl text-center"
                            >
                                سؤال {currentQuestion + 1} / {questions.length}
                            </motion.div>
                        </CardTitle>
                        <Progress value={(timeLeft / 15) * 100} className="w-full" />
                        <p className="text-center mt-2">الوقت المتبقي: {timeLeft} ثانية</p>
                    </CardHeader>
                    <CardContent>
                        <p className="mb-4 text-center text-lg font-semibold">
                            {questions[currentQuestion].question}
                        </p>
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
                                        <label
                                            htmlFor={`option-${index}`}
                                            className={`${selectedAnswer === index
                                                ? "font-bold underline text-accent"
                                                : "font-normal"
                                                }`}
                                        >
                                            {option}
                                        </label>
                                    </div>
                                </motion.div>
                            ))}
                        </RadioGroup>
                    </CardContent>
                    <CardFooter>
                        <Button
                            disabled={selectedAnswer === null}
                            onClick={handleAnswer}
                            className="w-full"
                        >
                            تأكيد
                        </Button>
                    </CardFooter>
                </Card>
            </motion.div>
        </>
    );
}
