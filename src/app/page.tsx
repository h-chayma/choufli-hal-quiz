"use client";

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

export default function Home() {
  return (
    <div className="container mx-auto flex items-center justify-center min-h-screen bg-gradient-to-r from-yellow-200 to-yellow-500 overflow-hidden relative">
      {/* Background stickers */}
      <motion.div
        className="absolute top-10 left-10"
        animate={{ rotate: 360 }}
        transition={{ duration: 20, repeat: Infinity, ease: "linear" }}
      >
        <Image src="/images/sbou3i-boukerchin.webp" width={100} height={100} alt="Sbou3i sticker" />
      </motion.div>
      <motion.div
        className="absolute bottom-10 right-10"
        animate={{ scale: [1, 1.1, 1] }}
        transition={{ duration: 2, repeat: Infinity }}
      >
        <Image src="/images/sbou3i-ikhamim.webp" width={120} height={80} alt="Njoum Ellil sticker" />
      </motion.div>
      <motion.div
        className="absolute top-1/2 left-5 transform -translate-y-1/2 text-4xl font-bold text-yellow-800 rotate-[-20deg]"
        animate={{ opacity: [0, 1, 0] }}
        transition={{ duration: 3, repeat: Infinity }}
      >
        Chouf chouf!
      </motion.div>

      <motion.div
        initial={{ rotateY: 180, opacity: 0 }}
        animate={{ rotateY: 0, opacity: 1 }}
        transition={{ duration: 0.8 }}
      >
        <Card className="w-[350px] overflow-hidden">
          <motion.div whileHover={{ scale: 1.05 }} transition={{ type: "spring", stiffness: 300 }}>
            <Image src="/images/chouflihal.jpg" width={350} height={200} alt="Choufli Hal" className="w-full" />
          </motion.div>
          <CardHeader>
            <CardTitle>
              <motion.div animate={bounceAnimation}>
                Quiz Choufli Hal
              </motion.div>
            </CardTitle>
            <CardDescription>Yallah nraw chnouwa ta3ref 3al série mtè3na el mahbouba!</CardDescription>
          </CardHeader>
          <CardContent>
            <p>Mousta3ed bech tethada rou7ek fi as2ila 3al personnages w el mawèqef elli ma tenséhomch?</p>
          </CardContent>
          <CardFooter>
            <Link href="/quiz" passHref style={{ width: '100%' }}>
              <motion.div whileHover={{ scale: 1.05 }} whileTap={{ scale: 0.95 }}>
                <Button className="w-full bg-yellow-600 hover:bg-yellow-700">Ebda el Quiz</Button>
              </motion.div>
            </Link>
          </CardFooter>
        </Card>
      </motion.div>
    </div>
  )
}
