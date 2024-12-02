"use client"

import Link from 'next/link'
import Image from 'next/image'
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card"
import { motion } from "framer-motion"
import { Settings } from 'lucide-react'

const bounceAnimation = {
  y: [0, -10, 0],
  transition: {
    duration: 0.5,
    repeat: Infinity,
    repeatType: "reverse" as const,
  },
}

export default function Home() {
  return (
    <div className="h-screen bg-gradient-to-r from-yellow-200 to-yellow-500 overflow-hidden relative p-4">
      <motion.div
        className="absolute top-10 left-10 hidden md:block"
        animate={{ rotate: 360 }}
        transition={{ duration: 20, repeat: Infinity, ease: "linear" }}
      >
        <Image src="/placeholder.svg?text=Sbou3i" width={100} height={100} alt="Sbou3i sticker" />
      </motion.div>
      <motion.div
        className="absolute bottom-10 right-10 hidden md:block"
        animate={{ scale: [1, 1.1, 1] }}
        transition={{ duration: 2, repeat: Infinity }}
      >
        <Image src="/placeholder.svg?text=Njoum+Ellil" width={120} height={80} alt="Njoum Ellil sticker" />
      </motion.div>
      <motion.div
        className="absolute top-1/2 left-5 transform -translate-y-1/2 text-2xl md:text-4xl font-bold text-yellow-800 rotate-[-20deg] hidden sm:block arabic-text"
        animate={{ opacity: [0, 1, 0] }}
        transition={{ duration: 3, repeat: Infinity }}
      >
        شوف شوف!
      </motion.div>

      <div className="flex justify-center items-center h-full">
        <motion.div
          initial={{ rotateY: 180, opacity: 0 }}
          animate={{ rotateY: 0, opacity: 1 }}
          transition={{ duration: 0.8 }}
        >
          <Card className="w-full max-w-md overflow-hidden">
            <motion.div whileHover={{ scale: 1.05 }} transition={{ type: "spring", stiffness: 300 }}>
              <Image src="/placeholder.svg?height=300&width=500&text=Choufli+Hal" width={500} height={300} alt="Choufli Hal" className="w-full" />
            </motion.div>
            <CardHeader>
              <CardTitle>
                <motion.div animate={bounceAnimation} className="text-2xl md:text-3xl text-center arabic-text">
                  كويز شوفلي حل
                </motion.div>
              </CardTitle>
              <CardDescription className="text-center text-base md:text-lg arabic-text">
                يالله نراو شنوة تعرف على السيري متاعنا المحبوبة!
              </CardDescription>
            </CardHeader>
            <CardContent>
              <p className="text-center text-sm md:text-base arabic-text">
                مستعد باش تتحدى روحك في أسئلة على الشخصيات و المواقف اللي ما تنساهمش؟
              </p>
            </CardContent>
            <CardFooter className="flex justify-center">
              <Link href="/quiz" passHref style={{ width: '100%', maxWidth: '250px' }}>
                <motion.div whileHover={{ scale: 1.05 }} whileTap={{ scale: 0.95 }}>
                  <Button className="w-full bg-yellow-600 hover:bg-yellow-700 text-lg py-6 arabic-text">ابدأ الكويز</Button>
                </motion.div>
              </Link>
            </CardFooter>
          </Card>
        </motion.div>
      </div>

      <Link href="/settings" className="absolute top-4 right-4">
        <Button variant="outline" size="icon">
          <Settings className="h-4 w-4" />
        </Button>
      </Link>
    </div>
  )
}
