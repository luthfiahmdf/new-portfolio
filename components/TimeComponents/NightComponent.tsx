'use client'
import { motion } from "motion/react";
import { useEffect, useRef, useState } from "react";

export const NightComponent = () => {
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const [time, setTime] = useState("");

  const formatter = new Intl.DateTimeFormat('id-ID', { timeZone: 'Asia/Jakarta', hour12: true, hour: 'numeric', minute: 'numeric' })


  // Update time every second
  useEffect(() => {
    const updateTime = () => {
      setTime(formatter.format(new Date()));
    };

    updateTime(); // Initial update
    const interval = setInterval(updateTime, 1000);
    return () => clearInterval(interval);
  }, []);

  // Draw stars on canvas
  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;

    const ctx = canvas.getContext("2d");
    if (!ctx) return;

    const resizeCanvas = () => {
      const isMobile = window.innerWidth < 768;
      canvas.width = isMobile ? window.innerWidth : window.innerWidth / 3;
      canvas.height = isMobile ? window.innerHeight : window.innerHeight / 3;

      // Redraw stars after resize
      drawStars(ctx, canvas.width, canvas.height);
    };

    const drawStars = (ctx: CanvasRenderingContext2D, width: number, height: number) => {
      ctx.clearRect(0, 0, width, height); // Clear previous stars
      ctx.fillStyle = "white";

      for (let i = 0; i < 100; i++) {
        ctx.beginPath();
        ctx.arc(
          Math.random() * width,
          Math.random() * height,
          Math.random() * 2,
          0,
          Math.PI * 2
        );
        ctx.fill();
      }
    };

    resizeCanvas();
    window.addEventListener('resize', resizeCanvas);

    return () => {
      window.removeEventListener('resize', resizeCanvas);
    };
  }, []);

  return (
    <div className="relative bg-[#001324] w-full h-full overflow-hidden">
      <canvas
        ref={canvasRef}
        className="absolute inset-0 w-full h-full opacity-70 md:opacity-100"
      />

      {/* Time Display */}
      <div className="relative z-10 md:m-5 m-2 mt-3 md:mt-5 flex justify-end">
        <div className="flex items-baseline space-x-1 md:space-x-2 opacity-85">
          <div className="rounded-full bg-white w-2 h-2 md:w-5 md:h-5"></div>
          <div className="flex flex-col">
            <div className="text-white font-bold text-2xl md:text-2xl xl:text-4xl">{time}</div>
            <div className="text-white font-thin -mt-2 text-2xl md:text-lg xl:text-2xl">West Indonesia Time</div>
          </div>
        </div>
      </div>

      {/* Animated Moon */}
      <motion.div
        animate={{
          scale: [1, 1.05, 1.05, 1, 1],
        }}
        transition={{
          duration: 4,
          ease: "easeInOut",
          repeat: Infinity,
          repeatType: "reverse",
        }}
        className="absolute bottom-0 right-0"
      >
        <div className="relative">
          <motion.div
            animate={{
              scale: [1, 0.95, 0.95, 1, 1],
            }}
            transition={{
              duration: 4,
              ease: "easeInOut",
              repeat: Infinity,
              repeatType: "reverse",
            }}
            className="bg-[#DFDFDF] w-16 h-16 md:w-24 md:h-24 lg:w-32 lg:h-32 rounded-tl-full"
          />

          {/* Moon craters */}
          <div className="absolute top-1/4 left-1/4 w-2 h-2 md:w-3 md:h-3 rounded-full bg-[#C2C2C2]" />
          <div className="absolute top-1/2 left-1/2 w-3 h-3 md:w-4 md:h-4 rounded-full bg-[#C2C2C2]" />
          <div className="absolute top-1/3 left-1/3 w-1 h-1 md:w-2 md:h-2 rounded-full bg-[#C2C2C2]" />
        </div>
      </motion.div>
    </div>
  );
};
