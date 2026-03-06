import { useState, useRef } from 'react';
import confetti from 'canvas-confetti';
import Gallery from './components/Gallery';
import { LOCK_SCREEN } from './constants/content';
import { motion, AnimatePresence } from 'framer-motion';
import { Lock, Unlock, ArrowRight } from 'lucide-react';

export default function App() {
  const [unlocked, setUnlocked] = useState(false);
  const [password, setPassword] = useState('');
  const [error, setError] = useState(false);
  const [isUnlocking, setIsUnlocking] = useState(false);
  const audioRef = useRef(null);

  const handleUnlock = (e) => {
    e.preventDefault();
    if (password === LOCK_SCREEN.password) {
      setError(false);
      setIsUnlocking(true);

      const duration = 3 * 1000;
      const animationEnd = Date.now() + duration;
      const defaults = { startVelocity: 30, spread: 360, ticks: 60, zIndex: 100 };

      const randomInRange = (min, max) => Math.random() * (max - min) + min;

      const interval = setInterval(function () {
        const timeLeft = animationEnd - Date.now();
        if (timeLeft <= 0) {
          return clearInterval(interval);
        }
        const particleCount = 50 * (timeLeft / duration);
        confetti(Object.assign({}, defaults, { particleCount, origin: { x: randomInRange(0.1, 0.3), y: Math.random() - 0.2 } }));
        confetti(Object.assign({}, defaults, { particleCount, origin: { x: randomInRange(0.7, 0.9), y: Math.random() - 0.2 } }));
      }, 250);

      if (audioRef.current) {
        audioRef.current.volume = 0.5;
        audioRef.current.play().catch(err => console.log("Audio play failed", err));
      }

      setTimeout(() => {
        setUnlocked(true);
      }, 1000);

    } else {
      setError(true);
      setTimeout(() => setError(false), 2000);
    }
  };

  return (
    <>
      <audio ref={audioRef} src="/music/style.mp3" preload="auto" loop />

      <AnimatePresence mode="wait">
        {!unlocked ? (
          <motion.div
            key="lock-screen"
            exit={{ opacity: 0, scale: 1.1, filter: 'blur(10px)' }}
            transition={{ duration: 0.8, ease: "easeInOut" }}
            className="min-h-screen bg-zinc-950 flex flex-col items-center justify-center relative overflow-hidden px-4"
          >
            <div className="absolute inset-0 bg-gradient-to-br from-zinc-900 via-zinc-950 to-black opacity-80" />
            <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-96 h-96 bg-pink-500/10 rounded-full blur-[100px] pointer-events-none" />

            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 1 }}
              className="z-10 w-full max-w-sm px-4"
            >
              <div className="flex flex-col items-center mb-8">
                <div className="w-16 h-16 bg-zinc-900 border border-zinc-800 rounded-2xl flex items-center justify-center mb-6 shadow-2xl">
                  {isUnlocking ? (
                    <Unlock className="w-8 h-8 text-pink-400" />
                  ) : (
                    <Lock className="w-8 h-8 text-zinc-400" />
                  )}
                </div>
                <h1 className="font-sans text-2xl tracking-wide text-yellow-400 mb-2 text-center font-medium">
                  {LOCK_SCREEN.title}
                </h1>
                <p className="text-sm font-sans leading-relaxed text-rose-300 text-center max-w-xs mx-auto pb-2">Enter your birthday date in DDMM format eg. 1 march-0103, 14 feb-1402 to unlock the main page hehehe 😝</p>
              </div>
              <form onSubmit={handleUnlock} className="relative flex flex-col items-center gap-4">
                <div className="relative w-full">
                  <input
                    type="password"
                    value={password}
                    onChange={(e) => setPassword(e.target.value)}
                    placeholder="Enter password"
                    className={`w-full bg-zinc-900/50 border ${error ? 'border-red-500/50 text-red-200 focus:border-red-500 focus:ring-red-500/20' : 'border-zinc-800 text-zinc-200 focus:border-pink-500/50 focus:ring-pink-500/20'} rounded-xl px-4 py-3.5 outline-none transition-all duration-300 text-center tracking-[0.2em] font-mono text-lg placeholder:text-zinc-600 placeholder:tracking-normal focus:bg-zinc-900/80 focus:ring-4`}
                    disabled={isUnlocking}
                  />
                  {error && (
                    <motion.p
                      initial={{ opacity: 0, y: -10 }}
                      animate={{ opacity: 1, y: 0 }}
                      className="absolute -bottom-6 left-0 right-0 text-center text-red-400 text-xs tracking-wider"
                    >
                      {LOCK_SCREEN.errorMsg}
                    </motion.p>
                  )}
                </div>

                <motion.button
                  whileHover={{ scale: 1.02 }}
                  whileTap={{ scale: 0.98 }}
                  type="submit"
                  disabled={isUnlocking}
                  className={`mt-4 w-full flex items-center justify-center gap-2 py-3.5 rounded-xl font-medium transition-all duration-300 ${isUnlocking
                    ? 'bg-pink-500/20 text-pink-300 border border-pink-500/30'
                    : 'bg-zinc-100 text-zinc-900 hover:bg-white border border-transparent'
                    }`}
                >
                  {isUnlocking ? LOCK_SCREEN.successMsg : 'Unlock Memories'}
                  {!isUnlocking && <ArrowRight className="w-4 h-4" />}
                </motion.button>
              </form>
            </motion.div>
          </motion.div>
        ) : (
          <motion.div
            key="main-content"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ duration: 1.5 }}
            className="min-h-screen flex flex-col items-center justify-center bg-gradient-to-br from-[#f8f5f2] via-[#e8e2dc] to-[#f8f5f2] w-full"
          >
            <Gallery />
          </motion.div>
        )}
      </AnimatePresence>
    </>
  );
}
