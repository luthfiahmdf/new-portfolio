'use client'
import { useTheme } from "next-themes";
import GitHubCalendar from "react-github-calendar"
import { FaGithub } from "react-icons/fa";
import { motion } from 'framer-motion'
import { useEffect, useState } from 'react';

export const GithubStats = () => {
  const { theme } = useTheme();
  const [mounted, setMounted] = useState(false);

  useEffect(() => {
    setMounted(true);
  }, []);

  if (!mounted) {
    return (
      <div className="flex flex-col p-4 h-full w-full border justify-between rounded-2xl bg-white dark:bg-zinc-900">
        <div className="flex items-center gap-2 text-slate-400 dark:text-zinc-100">
          <FaGithub />
          <h1>Github</h1>
        </div>
        <div className="h-[120px] flex items-center justify-center">
          Loading...
        </div>
      </div>
    );
  }

  return (
    <motion.div
      whileHover={{ scale: 1.04, rotate: -1 }}
      whileTap={{ scale: 0.98 }}
      transition={{
        duration: 0.2,
        ease: "easeInOut",
        rotate: { type: "spring", stiffness: 200 }
      }}
      className="flex flex-col p-4 h-full w-full border justify-between rounded-2xl bg-white dark:bg-zinc-900"
    >
      <div className="flex items-center gap-2 text-slate-400 dark:text-zinc-100">
        <FaGithub />
        <h1>Github</h1>
      </div>

      <GitHubCalendar
        username="luthfiahmdf"
        year={2025}
        colorScheme={theme === "dark" ? "dark" : "light"}
        blockRadius={4}
        hideTotalCount
        hideColorLegend
        fontSize={12}
        style={{ width: '100%' }}
      />
    </motion.div>
  )
}
