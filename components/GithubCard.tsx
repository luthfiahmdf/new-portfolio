import { motion } from "motion/react"
import { FaGithub } from "react-icons/fa"
import { CiLocationArrow1 } from "react-icons/ci";
export const GithubCard = () => {
  return (
    <motion.div whileHover={{ scale: 1.04, rotate: -1 }}
      whileTap={{ scale: 0.98 }}
      transition={{
        duration: 0.2,
        ease: "easeInOut",
        rotate: { type: "spring", stiffness: 200 }
      }} className="group w-full flex flex-col h-full md:w-48 md:h-48 border-2 xl:w-64 xl:h-64 bg-zinc-300 dark:bg-gray-900 rounded-3xl">
      <div className="flex-1 flex justify-center items-center relative">
        <FaGithub className="text-[6rem] mt-[2rem] md:text-[8rem] xl:text-[10rem] " />
      </div>
      <span className="opacity-0 group-hover:opacity-100 transition-opacity flex justify-end items-end p-3"><CiLocationArrow1 className="text-5xl text-gray-800 dark:text-gray-100" /></span>
    </motion.div>

  )
}
