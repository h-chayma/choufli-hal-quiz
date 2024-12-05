"use client";

import { useState, useEffect } from "react";
import Link from "next/link";
import Image from "next/image";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardFooter, CardHeader, CardTitle } from "@/components/ui/card";
import { motion, AnimatePresence } from "framer-motion";
import { Confetti } from "@/components/Confetti";
import { useQuiz } from "@/context/QuizContext";
import { Share2, Trophy, BookOpen, Repeat } from 'lucide-react';

export default function Results() {
    const { score, totalQuestions, resetQuiz } = useQuiz();
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
                className="w-full max-w-md px-4"
            >
                <Card className="overflow-hidden bg-white/20 backdrop-blur-md shadow-xl">
                    <motion.div whileHover={{ scale: 1.05 }} transition={{ type: "spring", stiffness: 300 }}>
                        <Image src="/images/results-main.svg" width={500} height={300} alt="Choufli Hal" className="w-full" />
                    </motion.div>
                    <CardHeader>
                        <CardTitle>
                            <motion.div
                                animate={{ scale: [1, 1.2, 1] }}
                                transition={{ duration: 0.5, repeat: Infinity, repeatDelay: 1 }}
                                className="text-3xl md:text-4xl text-center font-bold text-accent drop-shadow-lg"
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
                            <div className="relative w-40 h-40">
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
                                <div className="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 text-3xl font-bold text-white">
                                    {score}/{totalQuestions}
                                </div>
                            </div>
                        </motion.div>
                        <AnimatePresence>
                            {isAnimationComplete && (
                                <motion.div
                                    initial={{ opacity: 0, y: 20 }}
                                    animate={{ opacity: 1, y: 0 }}
                                    exit={{ opacity: 0, y: -20 }}
                                    transition={{ delay: 0.8 }}
                                    className="text-xl md:text-2xl text-center text-white"
                                >
                                    <p>{getFeedback()}</p>
                                    <motion.div
                                        className="flex justify-center mt-4 space-x-4"
                                        initial={{ opacity: 0 }}
                                        animate={{ opacity: 1 }}
                                        transition={{ delay: 1.2 }}
                                    >
                                        {scorePercentage === 100 && (
                                            <Trophy className="text-accent w-8 h-8" />
                                        )}
                                        <BookOpen className="text-primary w-8 h-8" />
                                    </motion.div>
                                </motion.div>
                            )}
                        </AnimatePresence>
                    </CardContent>
                    <CardFooter className="flex flex-col items-center space-y-4">
                        <div className="flex space-x-4 rtl:space-x-reverse">
                            <Link href="/" passHref>
                                <motion.div whileHover={{ scale: 1.05 }} whileTap={{ scale: 0.95 }}>
                                    <Button onClick={resetQuiz} className="bg-accent hover:bg-yellow-500 text-black font-bold text-xl py-6 px-8 rounded-full shadow-lg">
                                        <Repeat className="w-6 h-6 mr-2" />
                                        عاود الكويز
                                    </Button>
                                </motion.div>
                            </Link>
                            <motion.div whileHover={{ scale: 1.05 }} whileTap={{ scale: 0.95 }}>
                                <Button onClick={shareResult} className="bg-blue-500 hover:bg-blue-600 text-white font-bold text-xl py-6 px-8 rounded-full shadow-lg">
                                    <Share2 className="w-6 h-6 mr-2" />
                                    شارك
                                </Button>
                            </motion.div>
                        </div>
                        <AnimatePresence>
                            {showShare && (
                                <motion.div
                                    initial={{ opacity: 0, y: 20 }}
                                    animate={{ opacity: 1, y: 0 }}
                                    exit={{ opacity: 0, y: -20 }}
                                    className="text-white text-center"
                                >
                                    انسخ هذا الرابط لمشاركة نتيجتك:
                                    <input
                                        type="text"
                                        value={window.location.origin}
                                        readOnly
                                        className="mt-2 p-2 w-full bg-white/20 rounded text-white text-center"
                                        onClick={(e) => e.currentTarget.select()}
                                    />
                                </motion.div>
                            )}
                        </AnimatePresence>
                    </CardFooter>
                </Card>
            </motion.div>
        </>
    );
}
