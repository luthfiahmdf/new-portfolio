
'use client';

import { useMemo } from 'react';
import { motion } from 'framer-motion';
import { match } from 'ts-pattern';
import { FaDiscord } from 'react-icons/fa';
import React from 'react';
import { useLanyard } from '@/app/hooks/useLanyard';

export const OnlineCard = () => {
  const userId = process.env.NEXT_PUBLIC_DISCORD_USER_ID!;
  const { discordStatus } = useLanyard(userId);

  const [statusText, bgClass] = useMemo(() => {
    return match(discordStatus)
      .with('idle', () => ['Idle..', 'bg-[#FFCF50] dark:bg-[#FFCF50]'])
      .with('dnd', () => ['DND..', 'bg-[#F6B6B6] dark:bg-[#FFADC6]'])
      .with('online', () => ['Online..', 'bg-[#6DD2B7] dark:bg-[#35AC8C]'])
      .with('offline', () => ['Offline..', 'bg-[#FFADC6] dark:bg-[#FF477E]'])
      .with(undefined, () => ['loadind...', 'bg-[#FFCF50] dark:bg-[#FFC107]'])
      .otherwise(() => ['loading..', 'bg-gray-400 dark:bg-gray-600']);
  }, [discordStatus]);

  return (
    <motion.div
      whileHover={{ scale: 1.04, rotate: 2 }}
      transition={{ duration: 0.1, ease: 'easeInOut' }}
      className={`text-white rounded-2xl flex flex-col p-4 shadow-md overflow-hidden ${bgClass} w-full h-full`}
    >
      <div className="flex justify-start w-full">
        <FaDiscord className="text-2xl" />
      </div>
      <div className="flex flex-1 items-center justify-center">
        <p className="text-4xl font-bold leading-tight">{statusText}</p>
      </div>
    </motion.div>
  );
};

