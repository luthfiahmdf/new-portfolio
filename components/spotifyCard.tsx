"use client";
import { motion } from "framer-motion";
import Image from "next/image";
import { FaSpotify } from "react-icons/fa";
import React from 'react'
import { useLanyard } from "@/app/hooks/useLanyard";

export const SpotifyCard = () => {
  const userId = process.env.NEXT_PUBLIC_DISCORD_USER_ID!
  const { spotify, isListening } = useLanyard(userId)
  return (
    <motion.div
      className="flex bg-white gap-5 flex-col justify-between relative items-start max-w-md w-full p-4 dark:bg-gray-900 rounded-3xl bg-gradient-to-tl from-green-400 to-emerald-900 h-full"
      whileHover={{ scale: 1.04, rotate: -1 }}
      whileTap={{ scale: 0.98 }}
      transition={{
        duration: 0.2,
        ease: "easeInOut",
        rotate: { type: "spring", stiffness: 200 }
      }}
    >
      <FaSpotify className="text-2xl z-10" />

      {spotify?.album_art_url && (
        <motion.div
          whileHover={{ scale: 1.4, rotate: 45 }}
          transition={{ duration: 0.2, ease: 'easeInOut' }}
          className="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-[60%] z-0" // Adjusted vertical position
        >
          <Image
            src={spotify.album_art_url}
            width={600}
            height={600}
            className="rounded-md w-32 md:w-52 mb-4" // Added margin bottom
            alt="Album Cover"
            priority={false}
          />
        </motion.div>
      )}

      <div className="text-white w-full z-10 mt-[120px] md:mt-[140px]"> {/* Added margin top */}
        {isListening && spotify ? (
          <>
            <h1 className="text-sm md:text-lg font-semibold truncate w-full">
              {spotify.song}
            </h1>
            <p className="text-xs md:text-base font-light">
              {spotify.artist}
            </p>
          </>
        ) : (
          <h1 className="text-sm md:text-lg font-semibold truncate w-full">
            <q>Not listening to Spotify</q>
          </h1>
        )}
      </div>
    </motion.div>
  );
};
