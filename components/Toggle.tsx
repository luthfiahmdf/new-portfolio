
'use client'


import { ThemeAnimationType, useModeAnimation } from 'react-theme-switch-animation'
import { motion } from 'motion/react'
import SwitchDarkMode from "./ui/switch-dark-mode";
export default function Toggle() {

  const { isDarkMode, toggleSwitchTheme } = useModeAnimation({
    blurAmount: 4,
    duration: 1000,
    animationType: ThemeAnimationType.CIRCLE,
  })
  return (
    <motion.div className="flex items-center space-x-2" style={{ scale: 2 }} >


      <SwitchDarkMode
        styleId="circle-animation"
        isDarkMode={isDarkMode}
        onDarkModeChange={toggleSwitchTheme}
      />
    </motion.div>
  );
}

