"use client";
import { motion } from "framer-motion";
import Image from "next/image";
import { FaSpotify } from "react-icons/fa";
import React, { Fragment } from 'react'
import { useLanyard } from "@/app/hooks/useLanyard";


export const SpotifyCard = () => {
  const userId = process.env.NEXT_PUBLIC_DISCORD_USER_ID!
  const { spotify, isListening } = useLanyard(userId)
  return (
    <motion.div
      className="flex bg-white gap-5 flex-col justify-between  items-start max-w-md w-full p-4 dark:bg-gray-900 rounded-3xl overflow-hidden bg-gradient-to-tl from-green-400 to-emerald-900 h-full" // Added gradient and h-full
      whileHover={{ scale: 1.04, rotate: -1 }}
      whileTap={{ scale: 0.98 }}
      transition={{
        duration: 0.2,
        ease: "easeInOut",
        rotate: { type: "spring", stiffness: 200 }
      }}
    >
      <FaSpotify className="text-2xl" />

      {spotify?.album_art_url && (
        <div className="dark:brightness-75 w-full flex justify-center">
          <Image
            src={spotify.album_art_url}
            width={600}
            height={600}
            className="rounded-md w-32 h-32 md:w-64 md:h-52 object-cover "
            alt="Album Cover"
            priority={false}
          />
        </div>
      )}

      <div className="text-white w-full">
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
