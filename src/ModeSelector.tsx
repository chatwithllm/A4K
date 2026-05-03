import { motion } from 'framer-motion'

interface ModeSelectorProps {
  onSelect: (mode: 'baby' | 'explorer') => void
}

export function ModeSelector({ onSelect }: ModeSelectorProps) {
  return (
    <div className="min-h-screen bg-gradient-to-b from-amber-100 to-purple-100 flex flex-col items-center justify-center gap-8 p-6">
      <h1 className="text-3xl font-extrabold text-gray-800">Who's learning today?</h1>
      <div className="flex gap-6">
        <motion.button
          whileTap={{ scale: 0.94 }}
          onClick={() => onSelect('baby')}
          className="bg-amber-400 hover:bg-amber-500 text-white font-bold py-6 px-10 rounded-3xl text-xl shadow-lg flex flex-col items-center gap-2"
        >
          <span className="text-5xl">🦊</span>
          Baby Mode
        </motion.button>
        <motion.button
          whileTap={{ scale: 0.94 }}
          onClick={() => onSelect('explorer')}
          className="bg-indigo-500 hover:bg-indigo-600 text-white font-bold py-6 px-10 rounded-3xl text-xl shadow-lg flex flex-col items-center gap-2"
        >
          <span className="text-5xl">🤖</span>
          Explorer Mode
        </motion.button>
      </div>
    </div>
  )
}
