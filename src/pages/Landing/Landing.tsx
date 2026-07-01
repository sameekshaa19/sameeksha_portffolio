import { useEffect, useState } from 'react';
import { motion, useScroll, useTransform } from 'motion/react';
import { Avatar } from '../../components/avatar/Avatar';
import avatarImg from '../../assets/avatar.png';
import { ANIMATION, Z_INDEX } from '../../lib/designTokens';
import { ArrowDownIcon } from '../../components/ui/icons';

const SUBTITLES = [
  "Full Stack Developer",
  "AI/ML Enthusiast",
  "Creative Thinker",
  "Product Builder"
];

export const Landing = () => {
  const [subtitleIndex, setSubtitleIndex] = useState(0);
  const { scrollY } = useScroll();

  // Scroll transforms for smooth transition to Page 2
  const gridOpacity = useTransform(scrollY, [0, 500], [0.03, 0]);
  const avatarScale = useTransform(scrollY, [0, 500], [1, 0.9]);
  const avatarOpacity = useTransform(scrollY, [0, 500], [1, 0]);
  const leftColY = useTransform(scrollY, [0, 500], [0, -60]);
  const leftColOpacity = useTransform(scrollY, [0, 500], [1, 0]);
  const indicatorOpacity = useTransform(scrollY, [0, 150], [1, 0]);

  useEffect(() => {
    const interval = setInterval(() => {
      setSubtitleIndex((prev) => (prev + 1) % SUBTITLES.length);
    }, 3000);
    return () => clearInterval(interval);
  }, []);

  return (
    <section id="home" className="relative w-full min-h-screen flex items-center overflow-hidden pt-24 pb-12 bg-primary">
      {/* Background Perspective Grid */}
      <motion.div 
        className="absolute inset-0 pointer-events-none"
        style={{ 
          zIndex: Z_INDEX.GRID,
          opacity: gridOpacity
        }}
      >
        <div className="w-full h-full" style={{
          backgroundImage: `
            linear-gradient(to right, var(--color-text-primary) 1px, transparent 1px),
            linear-gradient(to bottom, var(--color-text-primary) 1px, transparent 1px)
          `,
          backgroundSize: '48px 48px',
          transform: 'perspective(500px) rotateX(60deg) scale(2)',
          transformOrigin: 'top center'
        }} />
      </motion.div>

      <div 
        className="container mx-auto px-6 md:px-12 lg:px-24 flex flex-col md:flex-row items-center justify-between w-full h-full gap-12"
        style={{ zIndex: Z_INDEX.CONTENT }}
      >
        {/* Left Column */}
        <motion.div 
          style={{ y: leftColY, opacity: leftColOpacity }}
          className="flex-1 flex flex-col justify-center w-full max-w-2xl"
        >
          <motion.p 
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: ANIMATION.DURATION.NORMAL, delay: 0.1 }}
            className="text-text-muted font-mono tracking-widest uppercase mb-4 md:mb-6 text-sm"
          >
            Hey There.
          </motion.p>
          
          <motion.h1 
            initial={{ opacity: 0, y: 40 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: ANIMATION.DURATION.SLOW, ease: ANIMATION.EASE.DEFAULT }}
            className="text-5xl sm:text-7xl lg:text-8xl font-bold leading-[1.1] tracking-tighter text-text-primary mb-6"
          >
            I'm <br /> Sameeksha S.
          </motion.h1>
          
          <motion.div 
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ duration: ANIMATION.DURATION.NORMAL, delay: 0.4 }}
            className="text-lg md:text-xl text-text-secondary font-sans max-w-md h-20"
          >
            <p className="mb-2">Computer Science & Design Undergraduate</p>
            <div className="relative overflow-hidden h-8">
              <motion.div
                key={subtitleIndex}
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: -20 }}
                transition={{ duration: ANIMATION.DURATION.FAST }}
                className="absolute text-text-primary font-medium"
              >
                {SUBTITLES[subtitleIndex]}
              </motion.div>
            </div>
          </motion.div>
        </motion.div>

        {/* Right Column */}
        <motion.div 
          style={{ scale: avatarScale, opacity: avatarOpacity }}
          initial={{ opacity: 0, scale: 0.96 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ duration: ANIMATION.DURATION.SLOW, ease: ANIMATION.EASE.DEFAULT, delay: 0.2 }}
          className="flex-1 flex justify-center md:justify-end items-center w-full mt-12 md:mt-0"
        >
          <Avatar imageSrc={avatarImg} />
        </motion.div>
      </div>

      {/* Scroll Indicator */}
      <motion.div 
        style={{ opacity: indicatorOpacity, zIndex: Z_INDEX.CONTENT }}
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ duration: ANIMATION.DURATION.NORMAL, delay: 1 }}
        className="absolute bottom-8 left-1/2 -translate-x-1/2 flex flex-col items-center gap-2 text-text-muted"
      >
        <span className="font-mono text-xs uppercase tracking-widest">Scroll</span>
        <motion.div
          animate={{ y: [0, 8, 0] }}
          transition={{ duration: 1.5, repeat: Infinity, ease: "easeInOut" }}
        >
          <ArrowDownIcon />
        </motion.div>
      </motion.div>
    </section>
  );
};
