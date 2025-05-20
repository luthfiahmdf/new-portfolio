
'use client';

import { motion } from "framer-motion";
import { isAfter, isBefore } from "date-fns";
import useSWR from "swr";
import { NightComponent } from "./TimeComponents/NightComponent";
import { DayComponent } from "./TimeComponents/DayComponent";
import { useMemo } from "react";
import { fetcher } from "../lib/fetcher";
import React from 'react';

export const TimeCard = () => {
  const { data, isLoading } = useSWR('/api/time', fetcher);

  const [sunriseTime, sunsetTime] = useMemo(() => {
    if (!data) return [null, null];

    const sunrise = new Date(data.results.civil_twilight_begin);
    const sunset = new Date(data.results.civil_twilight_end);

    if (isNaN(sunrise.getTime()) || isNaN(sunset.getTime())) {
      return [null, null];
    }

    return [sunrise, sunset];
  }, [data]);

  const timeComponent = useMemo(() => {
    if (isLoading || !sunriseTime || !sunsetTime) {
      return (
        <div className="flex items-center justify-center w-full h-full bg-gray-800 rounded-3xl">
          Loading...
        </div>
      );
    }

    const now = new Date();
    const night = isAfter(now, sunsetTime) || isBefore(now, sunriseTime)

    if (night) {
      return <NightComponent />;
    }

    return <DayComponent />;
  }, [isLoading, sunriseTime, sunsetTime]);

  return (
    <motion.div
      whileHover={{ scale: 1.04, rotate: -1 }}
      whileTap={{ scale: 0.98 }}
      transition={{
        duration: 0.2,
        ease: "easeInOut",
        rotate: { type: "spring", stiffness: 200 }
      }}
      className="text-white rounded-3xl flex relative overflow-hidden min-h-[260px] max-w-md w-full"
    >
      {timeComponent}
    </motion.div>
  );
};

