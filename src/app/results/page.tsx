"use client";

import { useState, useEffect } from "react";
import Link from "next/link";
import Image from "next/image";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardFooter, CardHeader, CardTitle } from "@/components/ui/card";
import { Accordion, AccordionContent, AccordionItem, AccordionTrigger } from "@/components/ui/accordion";
import { motion, AnimatePresence } from "framer-motion";
import { Confetti } from "@/components/Confetti";
import { useQuiz } from "@/context/QuizContext";
import { Share2, Trophy, BookOpen, Repeat, XCircle, CheckCircle2 } from 'lucide-react';

export default function Results() {
    const { score, totalQuestions, resetQuiz, wrongQuestions } = useQuiz();
    const scorePercentage = score ? (Number(score) / totalQuestions) * 100 : 0;
    const [showShare, setShowShare] = useState(false);
    const [isAnimationComplete, setIsAnimationComplete] = useState(false);

    useEffect(() => {
        const timer = setTimeout(() => setIsAnimationComplete(true), 2000);
        return () => clearTimeout(timer);
    }, []);

    const getFeedback = () => {
        if (scorePercentage === 100) return "مبروك! إنت فان كبير متاع شوفلي حل";
        if (scorePercentage >= 70) return "برافو عليك! معلوماتك في شوفلي حل قوية";
        if (scorePercentage >= 50) return "مش خايب! أما لازم تشوف السلسلة مرة أخرى";
        return "تاعب برشا! أرجع شوف السلسة وعاود ألعب";
    };

    const shareResult = () => {
        if (navigator.share) {
            navigator.share({
                title: 'نتيجتي في شوفلي كويز',
                text: `أنا جبت ${score} من ${totalQuestions} في شوفلي كويز! جرب أنت زادة!`,
                url: window.location.origin
            }).then(() => setShowShare(false))
                .catch(console.error);
        } else {
            setShowShare(true);
        }
    };

    return (
        <>
            <Confetti />
            <motion.div
                className="absolute bottom-10 right-10 hidden md:block"
                animate={{ rotate: [0, 10, -10, 0] }}
                transition={{ duration: 2, repeat: Infinity }}
            >
                <Image src="/images/sticker-3.svg" width={150} height={150} alt="Slimane Thumbs Up" />
            </motion.div>

            <motion.div
                initial={{ scale: 0, rotate: -180 }}
                animate={{ scale: 1, rotate: 0 }}
                transition={{ type: "spring", stiffness: 260, damping: 20 }}
                className="w-full max-w-md px-4 mb-8 sm:w-3/4 lg:w-1/2"
            >
                <Card className="overflow-hidden bg-white/20 backdrop-blur-md shadow-xl">
                    <motion.div whileHover={{ scale: 1.05 }} transition={{ type: "spring", stiffness: 300 }}>
                        <Image
                            src="/images/results-main.svg"
                            width={500}
                            height={300}
                            alt="Choufli Hal"
                            className="w-full"
                        />
                    </motion.div>
                    <CardHeader>
                        <CardTitle>
                            <motion.div
                                animate={{ scale: [1, 1.2, 1] }}
                                transition={{ duration: 0.5, repeat: Infinity, repeatDelay: 1 }}
                                className="text-xl sm:text-2xl md:text-4xl text-center font-bold text-accent drop-shadow-lg"
                            >
                                نتائج الكويز
                            </motion.div>
                        </CardTitle>
                    </CardHeader>
                    <CardContent>
                        <motion.div
                            initial={{ opacity: 0, y: 20 }}
                            animate={{ opacity: 1, y: 0 }}
                            transition={{ delay: 0.5 }}
                            className="flex flex-col items-center justify-center mb-6"
                        >
                            <div className="relative w-32 h-32 sm:w-40 sm:h-40">
                                <svg className="w-full h-full" viewBox="0 0 100 100">
                                    <circle
                                        className="text-gray-200 stroke-current"
                                        strokeWidth="10"
                                        cx="50"
                                        cy="50"
                                        r="40"
                                        fill="transparent"
                                    ></circle>
                                    <motion.circle
                                        className="text-accent stroke-current"
                                        strokeWidth="10"
                                        strokeLinecap="round"
                                        cx="50"
                                        cy="50"
                                        r="40"
                                        fill="transparent"
                                        initial={{ pathLength: 0 }}
                                        animate={{ pathLength: scorePercentage / 100 }}
                                        transition={{ duration: 2, ease: "easeInOut" }}
                                    ></motion.circle>
                                </svg>
                                <div className="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 text-xl sm:text-2xl font-bold text-white">
                                    {score}/{totalQuestions}
                                </div>
                            </div>
                        </motion.div>
                    </CardContent>
                    <CardFooter className="flex flex-col items-center space-y-4">
                        <div className="flex flex-wrap justify-center gap-4">
                            <Link href="/" passHref>
                                <motion.div whileHover={{ scale: 1.05 }} whileTap={{ scale: 0.95 }}>
                                    <Button className="bg-accent hover:bg-yellow-500 text-black text-base sm:text-xl px-6 py-3 sm:py-6 rounded-full shadow-lg">
                                        <Repeat className="w-5 sm:w-6 h-5 sm:h-6 mr-2" />
                                        عاود الكويز
                                    </Button>
                                </motion.div>
                            </Link>
                            <motion.div whileHover={{ scale: 1.05 }} whileTap={{ scale: 0.95 }}>
                                <Button className="bg-blue-500 hover:bg-blue-600 text-white text-base sm:text-xl px-6 py-3 sm:py-6 rounded-full shadow-lg">
                                    <Share2 className="w-5 sm:w-6 h-5 sm:h-6 mr-2" />
                                    شارك
                                </Button>
                            </motion.div>
                        </div>
                    </CardFooter>
                </Card>
            </motion.div>

            {wrongQuestions.length > 0 && (
                <motion.div
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ delay: 1.5 }}
                    className="w-full max-w-md px-4"
                >
                    <Card className="bg-white/20 backdrop-blur-md shadow-xl">
                        <CardHeader>
                            <CardTitle className="text-2xl text-center font-bold text-white">الإجابات الخاطئة</CardTitle>
                        </CardHeader>
                        <CardContent>
                            <Accordion type="single" collapsible className="w-full">
                                {wrongQuestions.map((question, index) => (
                                    <AccordionItem key={index} value={`item-${index}`}>
                                        <AccordionTrigger className="text-white hover:text-accent">
                                            سؤال {index + 1}
                                        </AccordionTrigger>
                                        <AccordionContent>
                                            <div className="text-white">
                                                <p className="font-bold mb-2">{question.question}</p>
                                                <p className="flex items-center text-red-400 mb-2">
                                                    <XCircle className="w-5 h-5 mr-2" />
                                                    إجابتك: {question.userAnswer}
                                                </p>
                                                <p className="flex items-center text-green-400">
                                                    <CheckCircle2 className="w-5 h-5 mr-2" />
                                                    الإجابة الصحيحة: {question.correctAnswer}
                                                </p>
                                            </div>
                                        </AccordionContent>
                                    </AccordionItem>
                                ))}
                            </Accordion>
                        </CardContent>
                    </Card>
                </motion.div>
            )}
        </>
    );
}