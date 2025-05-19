
'use client';

import { motion } from 'framer-motion';
import Toggle from './Toggle';

export const ToggleCard = () => {
  return (
    <motion.div
      whileHover={{ scale: 1.04, rotate: -1 }}
      whileTap={{ scale: 0.98 }}
      transition={{
        duration: 0.2,
        ease: "easeInOut",
        rotate: { type: "spring", stiffness: 200 }
      }}
      className="bg-[#FFAF45] dark:bg-[#94B4C1] rounded-3xl  shadow-md flex justify-center aspect-square items-center w-full h-42 sm:w-48 sm:h-48 md:w-56 md:h-56 xl:w-64 xl:h-64"
    >
      <Toggle />
    </motion.div>
  );
};

