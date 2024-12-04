"use client";

import Link from "next/link";
import Image from "next/image";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardFooter, CardHeader, CardTitle } from "@/components/ui/card";
import { motion } from "framer-motion";
import { Confetti } from "@/components/Confetti";
import { useQuiz } from "@/context/QuizContext";

export default function Results() {
    const { score, totalQuestions } = useQuiz();
    const scorePercentage = score ? (Number(score) / totalQuestions) * 100 : 0;

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
                                        strokeWidth="5"
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
                        <motion.div
                            initial={{ opacity: 0, y: 20 }}
                            animate={{ opacity: 1, y: 0 }}
                            transition={{ delay: 0.8 }}
                            className="text-xl md:text-2xl text-center text-white"
                        >
                            {Number(score) === totalQuestions && <p>مبروك! إنت فان كبير متاع شوفلي حل</p>}
                            {Number(score) >= totalQuestions / 2 && Number(score) < totalQuestions && <p>مش خايب! أما لازم تشوف السلسلة مرة أخرى</p>}
                            {Number(score) < totalQuestions / 2 && <p>تاعب برشا! أرجع شوف السلسة وعاود ألعب</p>}
                        </motion.div>
                    </CardContent>
                    <CardFooter className="flex justify-center">
                        <Link href="/" passHref style={{ width: '100%', maxWidth: '250px' }}>
                            <motion.div whileHover={{ scale: 1.05 }} whileTap={{ scale: 0.95 }} className="w-full">
                                <Button className="w-full bg-accent hover:bg-yellow-500 text-black font-bold text-xl py-6 rounded-full shadow-lg">
                                    عاود الكويز
                                </Button>
                            </motion.div>
                        </Link>
                    </CardFooter>
                </Card>
            </motion.div>
        </>
    );
}
