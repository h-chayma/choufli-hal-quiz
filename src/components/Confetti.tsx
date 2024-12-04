import React, { useEffect, useRef } from "react";
import confetti from "canvas-confetti";

export const Confetti: React.FC = () => {
    const canvasRef = useRef<HTMLCanvasElement>(null);

    useEffect(() => {
        const canvas = canvasRef.current;
        if (!canvas) return

        const myConfetti = confetti.create(canvas, {
            resize: false,
            useWorker: true,
        })

        const duration = 5000;
        const end = Date.now() + duration;
        const colors = ["#ffffff", "#facc15"];

        const frame = () => {
            myConfetti({
                particleCount: 2,
                angle: 60,
                spread: 55,
                origin: { x: 0 },
                colors: colors,
            });
            myConfetti({
                particleCount: 2,
                angle: 120,
                spread: 55,
                origin: { x: 1 },
                colors: colors,
            });

            if (Date.now() < end) {
                requestAnimationFrame(frame);
            }
        }

        frame();

        return () => {
            myConfetti.reset();
        }
    }, [])

    return (
        <canvas
            ref={canvasRef}
            className="fixed inset-0 w-full h-full z-50 pointer-events-none"
        />
    )
}
