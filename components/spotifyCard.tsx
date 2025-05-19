"use client";
import { motion } from "framer-motion";
import useSWR from "swr";
import Image from "next/image";
import fetcher from "@/app/utils/fetcher";
import { FaSpotify } from "react-icons/fa";

interface SpotifyData {
  title?: string;
  artist?: string;
  albumImage?: string;
  songUrl?: string;
  isPlaying?: boolean;
}

export const SpotifyCard = () => {
  const { data } = useSWR<SpotifyData>("/api/spotify/nowplaying", fetcher);

  return (
    <motion.a
      href={data?.songUrl || "#"}
      target="_blank"
      rel="noreferrer"
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

      {data?.albumImage && (
        <div className="dark:brightness-75 w-full flex justify-center">
          <Image
            src={data.albumImage}
            width={600}
            height={600}
            className="rounded-md w-32 h-32 md:w-64 md:h-64 object-cover "
            alt="Album Cover"
            priority={false}
          />
        </div>
      )}
      <div className="text-white w-full"> {/* Changed text color to white */}
        <h1 className="text-sm md:text-lg font-semibold truncate w-full">
          {data?.title === "No content currently playing" ? "Not Playing Anything" : data?.title}
        </h1>
        <p className="text-xs md:text-base font-light">
          {data?.artist || "—"}
        </p>
      </div>
    </motion.a>
  );
};
