import { useEffect, useState } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { Z_INDEX, ANIMATION } from '../../lib/designTokens';

interface BootSequenceProps {
  onComplete: () => void;
}

const lines = [
  "Initializing Portfolio...",
  "Loading Experience...",
  "Rendering Interface...",
  "Welcome."
];

export const BootSequence = ({ onComplete }: BootSequenceProps) => {
  const [currentLine, setCurrentLine] = useState(0);
  const [isVisible, setIsVisible] = useState(true);

  useEffect(() => {
    let timeout: ReturnType<typeof setTimeout>;
    
    if (currentLine < lines.length - 1) {
      timeout = setTimeout(() => {
        setCurrentLine(prev => prev + 1);
      }, 800); // 800ms per line
    } else {
      // Last line "Welcome." displayed, wait a bit then complete
      timeout = setTimeout(() => {
        setIsVisible(false);
        setTimeout(onComplete, 800); // Wait for fade out
      }, 1000);
    }

    return () => clearTimeout(timeout);
  }, [currentLine, onComplete]);

  return (
    <AnimatePresence>
      {isVisible && (
        <motion.div
          initial={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          transition={{ duration: ANIMATION.DURATION.SLOW }}
          style={{ zIndex: Z_INDEX.MENU + 10 }}
          className="fixed inset-0 bg-primary flex-center flex-col p-8"
        >
          <div className="w-full max-w-2xl font-mono text-sm sm:text-base text-text-primary tracking-tight">
            {lines.map((line, index) => (
              <motion.div
                key={index}
                initial={{ opacity: 0, y: 10 }}
                animate={{ 
                  opacity: index <= currentLine ? 1 : 0, 
                  y: index <= currentLine ? 0 : 10 
                }}
                transition={{ duration: ANIMATION.DURATION.FAST }}
                className="mb-4"
              >
                {line}
                {index === currentLine && index < lines.length - 1 && (
                  <motion.span
                    animate={{ opacity: [1, 0] }}
                    transition={{ repeat: Infinity, duration: 0.8 }}
                    className="ml-2 inline-block w-3 h-4 bg-text-primary align-middle"
                  />
                )}
              </motion.div>
            ))}
          </div>
        </motion.div>
      )}
    </AnimatePresence>
  );
};
