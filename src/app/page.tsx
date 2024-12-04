"use client";

import Link from "next/link";
import Image from "next/image";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card";
import { motion } from "framer-motion";

const bounceAnimation = {
  y: [0, -10, 0],
  transition: {
    duration: 0.5,
    repeat: Infinity,
    repeatType: "reverse" as const,
  },
};

export default function Home() {
  return (
    <>
      <motion.div
        className="absolute top-10 left-10 hidden md:block"
        animate={{ rotate: 360 }}
        transition={{ duration: 20, repeat: Infinity, ease: "linear" }}
      >
        <Image
          src="/images/sticker-1.svg"
          width={100}
          height={100}
          alt="Sbou3i sticker"
        />
      </motion.div>
      <motion.div
        className="absolute bottom-10 right-10 hidden md:block"
        animate={{ scale: [1, 1.1, 1] }}
        transition={{ duration: 2, repeat: Infinity }}
      >
        <Image
          src="/images/sticker-2.svg"
          width={120}
          height={80}
          alt="Slimane sticker"
        />
      </motion.div>

      <motion.div
        initial={{ rotateY: 180, opacity: 0 }}
        animate={{ rotateY: 0, opacity: 1 }}
        transition={{ duration: 0.8 }}
        className="w-full max-w-md px-4"
      >
        <Card className="overflow-hidden bg-white/20 backdrop-blur-md shadow-xl">
          <motion.div
            whileHover={{ scale: 1.05 }}
            transition={{ type: "spring", stiffness: 300 }}
          >
            <Image
              src="/images/home-main.svg"
              width={500}
              height={300}
              alt="Choufli Hal"
              className="w-full"
            />
          </motion.div>
          <CardHeader>
            <CardTitle>
              <motion.div
                animate={bounceAnimation}
                className="text-3xl md:text-4xl text-center font-bold text-accent drop-shadow-lg"
              >
                كويز شوفلي حل
              </motion.div>
            </CardTitle>
            <CardDescription className="text-center text-white text-lg mt-2">
              يلا نكتشفو شنوّة تعرف على السيري اللي مفماش واحد فينا ماتفرجش فيها
            </CardDescription>
          </CardHeader>
          <CardContent className="text-center text-white">
            مستعد باش تختبر معلوماتك في أسئلة على الشخصيات والمواقف اللي ما تنساهش؟
          </CardContent>
          <CardFooter className="flex justify-center">
            <Link href="/quiz" passHref style={{ width: "100%", maxWidth: "250px" }}>
              <motion.div
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
                className="w-full"
              >
                <Button className="w-full bg-accent hover:bg-yellow-500 text-black font-bold text-xl py-6 rounded-full shadow-lg">
                  ابدأ الكويز
                </Button>
              </motion.div>
            </Link>
          </CardFooter>
        </Card>
      </motion.div>
    </>
  );
}
