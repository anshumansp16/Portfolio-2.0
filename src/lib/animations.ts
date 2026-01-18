import { Variants } from 'framer-motion'

/**
 * Custom easing functions
 */
export const easing = {
  luxury: [0.4, 0.0, 0.2, 1] as const,
  smooth: [0.22, 1, 0.36, 1] as const,
  spring: [0.6, 0.05, 0.01, 0.99] as const,
}

/**
 * Fade in from bottom with blur
 */
export const fadeInUp: Variants = {
  initial: {
    opacity: 0,
    y: 40,
    filter: 'blur(4px)',
  },
  animate: {
    opacity: 1,
    y: 0,
    filter: 'blur(0px)',
    transition: {
      duration: 0.8,
      ease: easing.smooth,
    },
  },
}

/**
 * Fade in from top
 */
export const fadeInDown: Variants = {
  initial: {
    opacity: 0,
    y: -40,
  },
  animate: {
    opacity: 1,
    y: 0,
    transition: {
      duration: 0.6,
      ease: easing.luxury,
    },
  },
}

/**
 * Simple fade in
 */
export const fadeIn: Variants = {
  initial: {
    opacity: 0,
  },
  animate: {
    opacity: 1,
    transition: {
      duration: 0.6,
      ease: easing.luxury,
    },
  },
}

/**
 * Scale up fade in
 */
export const scaleIn: Variants = {
  initial: {
    opacity: 0,
    scale: 0.9,
  },
  animate: {
    opacity: 1,
    scale: 1,
    transition: {
      duration: 0.5,
      ease: easing.spring,
    },
  },
}

/**
 * Stagger container for children
 */
export const staggerContainer: Variants = {
  initial: {},
  animate: {
    transition: {
      staggerChildren: 0.1,
      delayChildren: 0.2,
    },
  },
}

/**
 * Stagger item (to be used with staggerContainer)
 */
export const staggerItem: Variants = {
  initial: {
    opacity: 0,
    y: 20,
  },
  animate: {
    opacity: 1,
    y: 0,
    transition: {
      duration: 0.5,
      ease: easing.luxury,
    },
  },
}

/**
 * Text reveal - for characters/words
 */
export const textReveal: Variants = {
  initial: {
    y: '100%',
  },
  animate: {
    y: 0,
    transition: {
      duration: 0.8,
      ease: easing.smooth,
    },
  },
}

/**
 * Slide in from left
 */
export const slideInLeft: Variants = {
  initial: {
    x: -60,
    opacity: 0,
  },
  animate: {
    x: 0,
    opacity: 1,
    transition: {
      duration: 0.8,
      ease: easing.smooth,
    },
  },
}

/**
 * Slide in from right
 */
export const slideInRight: Variants = {
  initial: {
    x: 60,
    opacity: 0,
  },
  animate: {
    x: 0,
    opacity: 1,
    transition: {
      duration: 0.8,
      ease: easing.smooth,
    },
  },
}

/**
 * Glow pulse animation
 */
export const glowPulse: Variants = {
  animate: {
    opacity: [0.4, 0.8, 0.4],
    scale: [1, 1.05, 1],
    transition: {
      duration: 4,
      repeat: Infinity,
      ease: 'easeInOut',
    },
  },
}

/**
 * Magnetic hover effect
 */
export const magneticHover = {
  rest: {
    scale: 1,
  },
  hover: {
    scale: 1.05,
    transition: {
      type: 'spring',
      stiffness: 400,
      damping: 10,
    },
  },
}

/**
 * Page transition variants
 */
export const pageTransition: Variants = {
  initial: {
    opacity: 0,
    y: 20,
  },
  animate: {
    opacity: 1,
    y: 0,
    transition: {
      duration: 0.6,
      ease: easing.smooth,
    },
  },
  exit: {
    opacity: 0,
    y: -20,
    transition: {
      duration: 0.4,
      ease: easing.luxury,
    },
  },
}

/**
 * Hover lift effect
 */
export const hoverLift: Variants = {
  rest: {
    y: 0,
  },
  hover: {
    y: -4,
    transition: {
      duration: 0.3,
      ease: easing.luxury,
    },
  },
}

/**
 * Navigation menu variants
 */
export const menuVariants: Variants = {
  closed: {
    opacity: 0,
    y: -20,
    transition: {
      duration: 0.3,
      ease: easing.luxury,
    },
  },
  open: {
    opacity: 1,
    y: 0,
    transition: {
      duration: 0.4,
      ease: easing.smooth,
    },
  },
}
