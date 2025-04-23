'use client'

import { motion } from "framer-motion";
import Link from "next/link";

export default function AnimatedCD({ href }: { href?: string }) {
  return (
    <motion.div
      initial={{ y: 20, opacity: 0 }}
      animate={{ y: 0, opacity: 1 }}
      transition={{ delay: 0.6, duration: 0.5 }}
      className="mt-8 font-mono text-sm"
    >
      &gt; cd{" "}
      <Link href={href || "/"} className="text-foreground hover:underline">
        ..
      </Link>
      <motion.span
        animate={{ opacity: [1, 0, 1] }}
        transition={{ repeat: Number.POSITIVE_INFINITY, duration: 1 }}
        className="inline-block w-1 h-3 bg-foreground ml-1"
      ></motion.span>
    </motion.div>
  )
}
