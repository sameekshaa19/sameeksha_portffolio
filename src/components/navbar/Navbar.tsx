import { useState } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { MenuIcon, CloseIcon } from '../ui/icons';
import { Z_INDEX, ANIMATION } from '../../lib/designTokens';

export const Navbar = () => {
  const [isOpen, setIsOpen] = useState(false);

  return (
    <>
      <motion.nav 
        initial={{ opacity: 0, y: -20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: ANIMATION.DURATION.NORMAL, delay: 0.2 }}
        className="fixed top-0 left-0 right-0 p-6 flex justify-between items-center mix-blend-difference text-surface"
        style={{ zIndex: Z_INDEX.NAVBAR }}
      >
        <div className="font-heading font-bold text-xl tracking-tighter">
          SS.
        </div>
        
        <button 
          onClick={() => setIsOpen(true)}
          className="p-2 hover:opacity-70 transition-opacity"
          aria-label="Open menu"
        >
          <MenuIcon />
        </button>
      </motion.nav>

      <AnimatePresence>
        {isOpen && (
          <motion.div
            initial={{ opacity: 0, clipPath: 'circle(0% at top right)' }}
            animate={{ opacity: 1, clipPath: 'circle(150% at top right)' }}
            exit={{ opacity: 0, clipPath: 'circle(0% at top right)' }}
            transition={{ duration: ANIMATION.DURATION.NORMAL, ease: ANIMATION.EASE.DEFAULT }}
            className="fixed inset-0 bg-text-primary text-surface flex flex-col p-6"
            style={{ zIndex: Z_INDEX.MENU }}
          >
            <div className="flex justify-between items-center">
              <div className="font-heading font-bold text-xl tracking-tighter">
                SS.
              </div>
              <button 
                onClick={() => setIsOpen(false)}
                className="p-2 hover:opacity-70 transition-opacity"
                aria-label="Close menu"
              >
                <CloseIcon />
              </button>
            </div>
            
            <div className="flex-1 flex flex-col justify-center items-center gap-8 font-heading text-4xl sm:text-6xl tracking-tight">
              {['Home', 'About', 'Experience', 'Projects', 'Contact'].map((item, i) => (
                <motion.a
                  key={item}
                  href={`#${item.toLowerCase()}`}
                  onClick={() => setIsOpen(false)}
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: 0.1 * i + 0.2, duration: ANIMATION.DURATION.FAST }}
                  className="hover:text-accent-blue transition-colors"
                >
                  {item}
                </motion.a>
              ))}
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </>
  );
};
