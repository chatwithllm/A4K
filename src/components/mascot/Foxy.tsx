import { motion, type TargetAndTransition } from 'framer-motion'

export type FoxyMood = 'idle' | 'cheer' | 'encourage' | 'talk'

interface FoxyProps {
  mood?: FoxyMood
  size?: number
}

const moodAnimations: Record<FoxyMood, TargetAndTransition> = {
  idle: {
    y: [0, -6, 0],
    transition: { duration: 2, repeat: Infinity, ease: 'easeInOut' },
  },
  cheer: {
    rotate: [-10, 10, -10, 10, 0],
    scale: [1, 1.15, 1],
    transition: { duration: 0.6 },
  },
  encourage: {
    x: [-4, 4, -4, 0],
    transition: { duration: 0.4 },
  },
  talk: {
    y: [0, -3, 0],
    transition: { duration: 0.5, repeat: Infinity },
  },
}

export function Foxy({ mood = 'idle', size = 120 }: FoxyProps) {
  return (
    <motion.div
      animate={moodAnimations[mood]}
      style={{ width: size, height: size, display: 'inline-block' }}
      role="img"
      aria-label="Foxy the fox"
    >
      {/* SVG fox emoji substitute — replace with custom SVG asset in Phase 7 */}
      <div
        style={{
          fontSize: size * 0.8,
          lineHeight: 1,
          textAlign: 'center',
          userSelect: 'none',
        }}
      >
        🦊
      </div>
    </motion.div>
  )
}
