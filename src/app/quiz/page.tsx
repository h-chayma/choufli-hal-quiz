"use client";

import { useState, useEffect } from "react";
import { useRouter } from "next/navigation";
import Image from "next/image";
import { AnimatePresence, motion } from "framer-motion";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardFooter, CardHeader, CardTitle } from "@/components/ui/card";
import { Progress } from "@/components/ui/progress";
import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group";
import { questions } from "@/data/questions";
import { useQuiz } from "@/context/QuizContext";
import { question } from "@/types/question";

const shuffleArray = (array: question[]) => {
    for (let i = array.length - 1; i > 0; i--) {
        const j = Math.floor(Math.random() * (i + 1));
        [array[i], array[j]] = [array[j], array[i]];
    }
    return array;
};

export default function Quiz() {
    const [shuffledQuestions, setShuffledQuestions] = useState(shuffleArray([...questions]));
    const [currentQuestion, setCurrentQuestion] = useState(0);
    const [selectedAnswer, setSelectedAnswer] = useState<number | null>(null);
    const { score, setScore } = useQuiz();
    const [timeLeft, setTimeLeft] = useState(20);
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
        if (selectedAnswer === shuffledQuestions[currentQuestion].correctAnswer) {
            setScore(score + 1);
        }

        if (currentQuestion + 1 < shuffledQuestions.length) {
            setCurrentQuestion(currentQuestion + 1);
            setSelectedAnswer(null);
            setTimeLeft(20);
        } else {
            router.push("/results");
        }
    };

    return (
        <AnimatePresence mode="wait">
            <motion.div
                key={currentQuestion}
                initial={{ rotateY: 90, opacity: 0 }}
                animate={{ rotateY: 0, opacity: 1 }}
                exit={{ rotateY: -90, opacity: 0 }}
                transition={{ duration: 0.5 }}
                className="w-full max-w-md"
            >
                <Card className="overflow-hidden bg-white/10 backdrop-blur-md shadow-xl">
                    <motion.div whileHover={{ scale: 1.05 }} transition={{ type: "spring", stiffness: 300 }}>
                        <Image
                            src={shuffledQuestions[currentQuestion].image}
                            width={500}
                            height={300}
                            alt={`Question ${currentQuestion + 1}`}
                            className="w-full object-cover h-48"
                        />
                    </motion.div>
                    <CardHeader>
                        <CardTitle>
                            <motion.div
                                animate={{ scale: [1, 1.1, 1] }}
                                transition={{ duration: 0.5 }}
                                className="text-2xl md:text-3xl text-center font-bold text-accent drop-shadow-lg mb-4"
                            >
                                سؤال {currentQuestion + 1} / {shuffledQuestions.length}
                            </motion.div>
                        </CardTitle>
                        <Progress value={(timeLeft / 20) * 100} className="w-full" />
                        <p className="text-center mt-2 text-white">الوقت المتبقي: {timeLeft} ثانية</p>
                    </CardHeader>
                    <CardContent>
                        <p className="mb-4 text-center text-xl font-semibold text-white">{shuffledQuestions[currentQuestion].question}</p>
                        <RadioGroup onValueChange={(value) => setSelectedAnswer(parseInt(value))}>
                            {shuffledQuestions[currentQuestion].options.map((option, index) => (
                                <motion.div
                                    key={index}
                                    initial={{ x: -50, opacity: 0 }}
                                    animate={{ x: 0, opacity: 1 }}
                                    transition={{ delay: index * 0.1 }}
                                >
                                    <div dir="rtl" className="flex items-center space-x-2 bg-white/10 rounded-lg p-3 hover:bg-white/20 transition-colors">
                                        <RadioGroupItem value={index.toString()} id={`option-${index}`} className="border-white ml-2" />
                                        <label
                                            htmlFor={`option-${index}`}
                                            className={`${selectedAnswer === index ? "font-bold text-accent" : "font-normal text-white"
                                                } cursor-pointer flex-grow`}
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
                            className="w-full bg-accent hover:bg-yellow-500 text-black font-bold text-xl py-4 rounded-full shadow-lg"
                        >
                            تأكيد
                        </Button>
                    </CardFooter>
                </Card>
            </motion.div>
        </AnimatePresence>
    );
}
