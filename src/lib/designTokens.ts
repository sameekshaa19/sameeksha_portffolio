export const ANIMATION = {
  DURATION: {
    FAST: 0.2,
    NORMAL: 0.45,
    SLOW: 0.8,
  },
  EASE: {
    DEFAULT: [0.25, 1, 0.5, 1] as [number, number, number, number], // Custom cubic bezier
  },
  SPRING: {
    FAST: { type: 'spring', stiffness: 400, damping: 30 },
    NORMAL: { type: 'spring', stiffness: 200, damping: 20 },
    SLOW: { type: 'spring', stiffness: 100, damping: 15 },
    BOUNCY: { type: 'spring', stiffness: 200, damping: 10 },
  }
};

export const Z_INDEX = {
  BACKGROUND: 0,
  GRID: 5,
  CONTENT: 20,
  NAVBAR: 100,
  MENU: 200,
};
