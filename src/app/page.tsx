"use client"

import Link from 'next/link'
import Image from 'next/image'
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card"
import { motion } from "framer-motion"

const bounceAnimation = {
  y: [0, -10, 0],
  transition: {
    duration: 0.5,
    repeat: Infinity,
    repeatType: "reverse" as const,
  },
}

const backgroundQuotes = [
  "شوف شوف!",
  "يا ولدي!",
  "ملا نهار!",
  "صاحبي، صاحبي!",
]

export default function Home() {
  return (
    <div className="flex flex-col items-center justify-center min-h-screen">
      <motion.div
        className="absolute top-10 left-10 hidden md:block"
        animate={{ rotate: 360 }}
        transition={{ duration: 20, repeat: Infinity, ease: "linear" }}
      >
        <Image src="/images/sticker-1.svg" width={100} height={100} alt="Sbou3i sticker" />
      </motion.div>
      <motion.div
        className="absolute bottom-10 right-10 hidden md:block"
        animate={{ scale: [1, 1.1, 1] }}
        transition={{ duration: 2, repeat: Infinity }}
      >
        <Image src="/images/sticker-2.svg" width={120} height={80} alt="Njoum Ellil sticker" />
      </motion.div>

      {/* Fixed background quotes */}
      <div className="fixed inset-0 pointer-events-none">
        {backgroundQuotes.map((quote, index) => (
          <motion.div
            key={index}
            className="absolute bg-white bg-opacity-20 rounded-lg p-2 text-xl md:text-2xl font-bold text-yellow-500"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: index * 0.5 }}
            style={{
              top: `${25 * (index + 1)}%`,
              left: `${Math.random() * 60 + 20}%`,
              transform: `rotate(${Math.random() * 20 - 10}deg)`,
            }}
          >
            {quote}
          </motion.div>
        ))}
      </div>

      <motion.div
        initial={{ rotateY: 180, opacity: 0 }}
        animate={{ rotateY: 0, opacity: 1 }}
        transition={{ duration: 0.8 }}
        className="w-full max-w-md px-4"
      >
        <Card className="overflow-hidden">
          <motion.div whileHover={{ scale: 1.05 }} transition={{ type: "spring", stiffness: 300 }}>
            <Image src="/images/home-main.svg" width={500} height={300} alt="Choufli Hal" className="w-full" />
          </motion.div>
          <CardHeader>
            <CardTitle>
              <motion.div animate={bounceAnimation} className="text-2xl md:text-3xl text-center">
                كويز شوفلي حل
              </motion.div>
            </CardTitle>
            <CardDescription className="text-center text-base md:text-lg">
              يالله نراو شنوة تعرف على السيري متاعنا المحبوبة!
            </CardDescription>
          </CardHeader>
          <CardContent>
            <p className="text-center text-sm md:text-base">
              مستعد باش تتحدى روحك في أسئلة على الشخصيات و المواقف اللي ما تنساهمش؟
            </p>
          </CardContent>
          <CardFooter className="flex justify-center">
            <Link href="/quiz" passHref style={{ width: '100%', maxWidth: '250px' }}>
              <motion.div whileHover={{ scale: 1.05 }} whileTap={{ scale: 0.95 }} className="w-full">
                <Button className="w-full bg-accent hover:bg-yellow-700 text-lg py-6">ابدأ الكويز</Button>
              </motion.div>
            </Link>
          </CardFooter>
        </Card>
      </motion.div>
    </div>
  )
}
