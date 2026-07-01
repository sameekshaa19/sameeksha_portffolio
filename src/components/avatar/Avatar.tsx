import { useEffect, useRef } from 'react';
import { motion, useSpring, useTransform, useMotionValue } from 'motion/react';
import { ANIMATION } from '../../lib/designTokens';

interface AvatarProps {
  imageSrc?: string;
}

export const Avatar = ({ imageSrc }: AvatarProps) => {
  const containerRef = useRef<HTMLDivElement>(null);
  const mouseX = useMotionValue(0);
  const mouseY = useMotionValue(0);

  // Smooth springs for eye/head tracking
  const springX = useSpring(mouseX, ANIMATION.SPRING.SLOW);
  const springY = useSpring(mouseY, ANIMATION.SPRING.SLOW);

  // Limit eye movement to 4px
  const eyeX = useTransform(springX, [-1, 1], [-4, 4]);
  const eyeY = useTransform(springY, [-1, 1], [-4, 4]);

  // Limit head tilt to 0.8 degrees
  const headRotateX = useTransform(springY, [-1, 1], [0.8, -0.8]);
  const headRotateY = useTransform(springX, [-1, 1], [-0.8, 0.8]);

  useEffect(() => {
    const handleMouseMove = (e: MouseEvent) => {
      if (!containerRef.current) return;
      const rect = containerRef.current.getBoundingClientRect();
      const centerX = rect.left + rect.width / 2;
      const centerY = rect.top + rect.height / 2;
      
      // Normalize values between -1 and 1
      const normalizedX = Math.max(-1, Math.min(1, (e.clientX - centerX) / (window.innerWidth / 2)));
      const normalizedY = Math.max(-1, Math.min(1, (e.clientY - centerY) / (window.innerHeight / 2)));
      
      mouseX.set(normalizedX);
      mouseY.set(normalizedY);
    };

    window.addEventListener('mousemove', handleMouseMove);
    return () => window.removeEventListener('mousemove', handleMouseMove);
  }, [mouseX, mouseY]);

  return (
    <motion.div
      ref={containerRef}
      className="relative w-64 h-64 md:w-80 md:h-80 lg:w-96 lg:h-96"
      style={{
        rotateX: headRotateX,
        rotateY: headRotateY,
        perspective: 1000
      }}
      // Breathing animation
      animate={{
        y: [0, -8, 0],
        scale: [1, 1.01, 1],
      }}
      transition={{
        duration: 4,
        ease: "easeInOut",
        repeat: Infinity,
        repeatType: "reverse"
      }}
    >
      {/* Dynamic shadow */}
      <motion.div
        className="absolute inset-4 rounded-full bg-black/10 blur-2xl"
        animate={{ scale: [1, 1.1, 1], opacity: [0.5, 0.3, 0.5] }}
        transition={{ duration: 4, ease: "easeInOut", repeat: Infinity, repeatType: "reverse" }}
      />
      
      {/* Avatar Body/Image */}
      <div className="absolute inset-0 rounded-[2rem] overflow-hidden bg-secondary border border-border shadow-xl">
        {imageSrc ? (
          <img src={imageSrc} alt="Avatar" className="w-full h-full object-cover" />
        ) : (
          <div className="w-full h-full flex-center text-text-muted bg-secondary">
            [Avatar Placeholder]
          </div>
        )}
        
        {/* Abstract Eyes (only shown if no image is provided, to demonstrate tracking) */}
        {!imageSrc && (
          <div className="absolute top-1/3 left-0 w-full flex justify-center gap-8">
            {/* Left Eye */}
            <div className="w-6 h-6 rounded-full bg-text-primary flex-center">
              <motion.div 
                className="w-2 h-2 rounded-full bg-surface"
                style={{ x: eyeX, y: eyeY }}
              />
            </div>
            {/* Right Eye */}
            <div className="w-6 h-6 rounded-full bg-text-primary flex-center">
              <motion.div 
                className="w-2 h-2 rounded-full bg-surface"
                style={{ x: eyeX, y: eyeY }}
              />
            </div>
          </div>
        )}
      </div>
    </motion.div>
  );
};
