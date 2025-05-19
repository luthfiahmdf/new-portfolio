'use client';

import { useMemo } from 'react';
import useSWR from 'swr';
import { motion } from 'framer-motion';
import fetcher from '@/app/utils/fetcher';
import { match } from 'ts-pattern';
import { FaDiscord } from 'react-icons/fa';

export const OnlineCard = () => {
  const { data } = useSWR("/api/discord", fetcher);

  const [status, bgClass] = useMemo(() => {
    const discordStatus = data?.data?.discord_status;
    return match(discordStatus)
      .with("idle", () => ["Idle..", "bg-[#FFCF50] dark:bg-[#FFC107]"])
      .with("dnd", () => ["DND..", "bg-[#F6B6B6] dark:bg-[#FFADC6]"])
      .with("online", () => ["Online..", "bg-[#6DD2B7] dark:bg-[#35AC8C]"])
      .with("offline", () => ["Offline..", "bg-[#FFADC6] dark:bg-[#FF477E]"])
      .with(undefined, () => ["Loading...", "bg-gray-400 dark:bg-gray-600"])
      .otherwise(() => ["Unknown", "bg-gray-400 dark:bg-gray-600"]);
  }, [data]);

  return (
    <motion.div
      whileHover={{ scale: 1.04, rotate: 2 }}
      transition={{ duration: 0.1, ease: "easeInOut" }}
      className={`text-white rounded-2xl flex flex-col p-4 shadow-md overflow-hidden ${bgClass} w-full h-full`}
    >
      <div className="flex justify-start w-full">
        <FaDiscord className='text-2xl' />
      </div>
      <div className="flex flex-1 items-center justify-center">
        <p className="text-4xl font-bold leading-tight">
          {status}
        </p>
      </div>
    </motion.div>
  );
}
