'use client'
import { motion } from "motion/react";
import { useState, useEffect } from "react";

export const DayComponent = () => {
  const [time, setTime] = useState("");
  const formatter = new Intl.DateTimeFormat('id-ID', { timeZone: 'Asia/Jakarta', hour12: true, hour: 'numeric', minute: 'numeric' })
  useEffect(() => {
    const interval = setInterval(() => {
      setTime(
        formatter.format(new Date())
      );
    }, 1000);
    return () => clearInterval(interval);
  }, []);

  return (
    <div className="bg-gradient-to-br from-[#0A8DFF] to-[#98CFFF] w-full overflow-hidden col-span-1 row-span-1">
      <div className="md:m-5 m-2 mt-3 md:mt-5  justify-end">
        <div className="flex items-baseline space-x-1 md:space-x-2 opacity-85">
          <div className="rounded-full bg-white w-2 h-2 md:w-5 md:h-5"></div>
          <div className="flex flex-col">
            <div className="text-white font-bold text-2xl md:text-2xl xl:text-4xl">{time}</div>
            <div className="text-gray-900 font-thin -mt-2 text-2xl md:text-lg xl:text-2xl">West Indonesia Time</div>
          </div>
        </div>
      </div>
      <motion.div
        animate={{
          scale: [1, 1.1, 1.1, 1, 1],
        }}
        transition={{
          duration: 4,
          ease: "easeInOut",
          repeat: Infinity,
          repeatType: "reverse",
        }}
        className="absolute bottom-0 right-0 rounded-tl-full bg-white/10 pt-2 pl-2 md:pt-4 md:pl-4"
      >
        <motion.div>
          <div className="md:pt-4 md:pl-4 pt-2 pl-2 bottom-0 right-0 bg-white/20 rounded-tl-full">
            <div className="md:pt-4 md:pl-4 pt-2 pl-2 bottom-0 right-0 bg-white/20 rounded-tl-full">
              <motion.div
                initial={false}
                animate={{
                  scale: [1, 0.9, 0.9, 1, 1],
                }}
                transition={{
                  duration: 4,
                  ease: "easeInOut",
                  repeat: Infinity,
                  repeatType: "reverse",
                }}
                className="bg-[#FEEA9A] w-12 h-12 lg:w-32 lg:h-32 xl:w-56 xl:h-56 rounded-tl-full relative"
              />
            </div>
          </div>
        </motion.div>
      </motion.div>
    </div>
  );
}


