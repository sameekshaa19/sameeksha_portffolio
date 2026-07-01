import { motion } from 'motion/react';
import type { Variants } from 'motion/react';
import { FaultyTerminal } from '../../components/transitions/FaultyTerminal';
import { aboutData } from '../../data/aboutData';
import { ANIMATION } from '../../lib/designTokens';

export const About = () => {
  // Variants for scroll-triggered animations
  const containerVariants: Variants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: 0.1,
        delayChildren: 0.2
      }
    }
  };

  const itemVariants: Variants = {
    hidden: { opacity: 0, y: 30 },
    visible: {
      opacity: 1,
      y: 0,
      transition: {
        duration: ANIMATION.DURATION.NORMAL,
        ease: ANIMATION.EASE.DEFAULT
      }
    }
  };

  const dividerVariants: Variants = {
    hidden: { scaleX: 0 },
    visible: {
      scaleX: 1,
      transition: {
        duration: ANIMATION.DURATION.SLOW,
        ease: [0.22, 1, 0.36, 1] as [number, number, number, number] // sleek easeOutExpo
      }
    }
  };

  // Word stagger for bio
  const bioWords = aboutData.bio.split(' ');
  const bioContainerVariants: Variants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: 0.03,
        delayChildren: 0.4
      }
    }
  };

  const wordVariants: Variants = {
    hidden: { opacity: 0, y: 10 },
    visible: {
      opacity: 1,
      y: 0,
      transition: {
        duration: 0.3,
        ease: "easeOut"
      }
    }
  };

  // Card stagger variants (80ms stagger)
  const cardsContainerVariants: Variants = {
    hidden: {},
    visible: {
      transition: {
        staggerChildren: 0.08
      }
    }
  };

  return (
    <section id="about" className="relative w-full min-h-screen flex flex-col justify-center overflow-hidden py-24 bg-primary border-t border-border">
      {/* Background layer: FaultyTerminal */}
      <div className="absolute inset-0 pointer-events-none z-0">
        <FaultyTerminal
          scale={1.2}
          gridMul={[2, 1]}
          digitSize={1.1}
          timeScale={0.25}
          scanlineIntensity={0.15}
          glitchAmount={0.05}
          flickerAmount={0.08}
          noiseAmp={0.1}
          chromaticAberration={0}
          dither={0}
          curvature={0.05}
          tint="#3F6B4D"
          brightness={0.12}
          mouseReact={false}
          className="w-full h-full"
        />
      </div>

      <div className="container mx-auto px-6 md:px-12 lg:px-24 relative z-10 flex flex-col gap-16">
        {/* Header Section */}
        <motion.div 
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, amount: 0.5 }}
          className="w-full"
        >
          {/* Horizontal Divider */}
          <motion.div 
            variants={dividerVariants}
            className="w-full h-[1px] bg-border origin-left mb-8"
          />
          
          {/* Section Heading */}
          <motion.h2 
            variants={itemVariants}
            className="text-4xl sm:text-6xl font-bold tracking-tighter text-text-primary uppercase"
          >
            About Me
          </motion.h2>
        </motion.div>

        {/* Content Layout */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 lg:gap-16 items-start">
          {/* Left Column: Short Introduction */}
          <div className="lg:col-span-5 flex flex-col gap-6">
            <motion.div
              variants={bioContainerVariants}
              initial="hidden"
              whileInView="visible"
              viewport={{ once: true, amount: 0.4 }}
              className="text-xl sm:text-2xl font-light text-text-secondary leading-relaxed flex flex-wrap gap-x-2 gap-y-1"
            >
              {bioWords.map((word, i) => (
                <motion.span
                  key={i}
                  variants={wordVariants}
                  className="inline-block"
                >
                  {word}
                </motion.span>
              ))}
            </motion.div>
          </div>

          {/* Right Column: Info Cards Grid */}
          <motion.div 
            variants={cardsContainerVariants}
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true, amount: 0.2 }}
            className="lg:col-span-7 grid grid-cols-1 sm:grid-cols-2 gap-6"
          >
            {aboutData.cards.map((card, index) => (
              <motion.div
                key={card.title}
                variants={itemVariants}
                className="bg-surface border border-border rounded-2xl p-6 shadow-sm hover:shadow-md hover:border-accent/40 transition-all duration-300 group flex flex-col justify-between min-h-[160px]"
              >
                <div>
                  <span className="font-mono text-xs text-accent uppercase tracking-wider block mb-3">
                    0{index + 1} // {card.title}
                  </span>
                  <h3 className="text-xl font-bold tracking-tight text-text-primary mb-2">
                    {card.description}
                  </h3>
                </div>
                <p className="text-text-muted text-sm leading-relaxed">
                  {card.details}
                </p>
              </motion.div>
            ))}
          </motion.div>
        </div>

        {/* Bottom Statistics Cards */}
        <motion.div 
          variants={containerVariants}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, amount: 0.6 }}
          className="grid grid-cols-3 gap-4 md:gap-8 border-t border-border pt-12 mt-4"
        >
          {aboutData.stats.map((stat) => (
            <motion.div
              key={stat.label}
              variants={itemVariants}
              className="flex flex-col items-start gap-1"
            >
              <span className="text-4xl sm:text-6xl font-bold font-heading text-text-primary tracking-tight">
                {stat.value}
              </span>
              <span className="font-mono text-xs text-text-muted uppercase tracking-wider">
                {stat.label}
              </span>
            </motion.div>
          ))}
        </motion.div>
      </div>
    </section>
  );
};
