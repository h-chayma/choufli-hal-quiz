"use client";

import { questions } from "@/data/questions";
import React, { createContext, useContext, useState, ReactNode } from "react";

interface QuizContextType {
    score: number;
    setScore: (score: number) => void;
    totalQuestions: number;
}

const QuizContext = createContext<QuizContextType | undefined>(undefined)

export const QuizProvider: React.FC<{ children: ReactNode }> = ({ children }) => {
    const [score, setScore] = useState(0);
    const totalQuestions = questions.length;

    return (
        <QuizContext.Provider value={{ score, setScore, totalQuestions }}>
            {children}
        </QuizContext.Provider>
    )
}

export const useQuiz = () => {
    const context = useContext(QuizContext);
    if (context === undefined) {
        throw new Error('useQuiz must be used within a QuizProvider');
    }
    return context;
}

