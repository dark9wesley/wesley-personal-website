"use client"

import { motion } from "framer-motion"
import AnimatedCD from "@/components/animated-cd"

export default function NotFound() {
  return (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      transition={{ duration: 0.5 }}
      className="flex flex-col items-center justify-center py-20 space-y-6 text-center"
    >
      <motion.h1
        initial={{ scale: 0.8, opacity: 0 }}
        animate={{ scale: 1, opacity: 1 }}
        transition={{ delay: 0.2, duration: 0.5 }}
        className="text-6xl font-bold"
      >
        404
      </motion.h1>
      <motion.p
        initial={{ y: 20, opacity: 0 }}
        animate={{ y: 0, opacity: 1 }}
        transition={{ delay: 0.4, duration: 0.5 }}
        className="text-xl"
      >
        Nice to meet you tho!
      </motion.p>

      <AnimatedCD />
    </motion.div>
  )
}
