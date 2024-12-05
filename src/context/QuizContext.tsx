"use client";

import { questions } from "@/data/questions";
import React, { createContext, useContext, useState, ReactNode } from "react";

interface WrongQuestion {
    question: string;
    userAnswer: string;
    correctAnswer: string;
}

interface QuizContextType {
    score: number;
    setScore: (score: number) => void;
    totalQuestions: number;
    resetQuiz: () => void;
    wrongQuestions: WrongQuestion[];
    addWrongQuestion: (question: WrongQuestion) => void;
}

const QuizContext = createContext<QuizContextType | undefined>(undefined)

export const QuizProvider: React.FC<{ children: ReactNode }> = ({ children }) => {
    const [score, setScore] = useState(0);
    const [wrongQuestions, setWrongQuestions] = useState<WrongQuestion[]>([]);
    const totalQuestions = questions.length;

    const resetQuiz = () => {
        setScore(0);
        setWrongQuestions([]);
    };

    const addWrongQuestion = (question: WrongQuestion) => {
        setWrongQuestions((prev) => [...prev, question]);
    };

    return (
        <QuizContext.Provider value={{ score, setScore, totalQuestions, resetQuiz, wrongQuestions, addWrongQuestion }}>
            {children}
        </QuizContext.Provider>
    );
}

export const useQuiz = () => {
    const context = useContext(QuizContext);
    if (context === undefined) {
        throw new Error('useQuiz must be used within a QuizProvider');
    }
    return context;
}

