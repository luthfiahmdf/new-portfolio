'use client'

import { motion } from "framer-motion"
import React from 'react'
export const ProfileCard = () => {
  return (
    <motion.div
      whileHover={{ scale: 1.04, rotate: -1 }}
      whileTap={{ scale: 0.98 }}
      transition={{
        duration: 0.2,
        ease: "easeInOut",
        rotate: { type: "spring", stiffness: 200 }
      }}
      className="group bg-[#BAD8B6] dark:bg-[#6f9983] text-black dark:text-white 
                rounded-xl p-6 shadow-md hover:shadow-lg transition-shadow
            w-full h-full sm:w-48 sm:h-48 md:w-full md:h-full xl:h-64   cursor-pointer"
    >
      <div className="flex flex-col gap-3">
        <h1 className="text-2xl md:text-3xl font-bold tracking-tight">
          Hi I&apos;m Luthfi
          <span className="ml-2 opacity-0 group-hover:opacity-100 transition-opacity">
            👋
          </span>
        </h1>

        <p className="text-base md:text-2xl leading-relaxed text-gray-800 dark:text-gray-100">
          I&apos;m your friendly neighborhood frontend developer specializing in crafting
          digital experiences. Let&apos;s collaborate to transform your web visions into
          reality. Ready to start your project? Let&apos;s connect! 🚀
        </p>
      </div>
    </motion.div>
  );
};
