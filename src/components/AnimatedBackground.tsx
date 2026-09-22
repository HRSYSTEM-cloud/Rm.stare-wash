import { useMemo } from 'react';
import { motion } from 'motion/react';

interface Bubble {
  id: number;
  size: number;
  left: number;
  duration: number;
  delay: number;
  sway: number;
  opacity: number;
  blur?: boolean;
}

export function AnimatedBackground() {
  // Generate realistic water bubbles ascending from bottom to top
  const bubbles: Bubble[] = useMemo(() => [
    { id: 1, size: 14, left: 8, duration: 9, delay: 0, sway: 25, opacity: 0.5 },
    { id: 2, size: 28, left: 18, duration: 13, delay: 1.5, sway: -30, opacity: 0.4 },
    { id: 3, size: 8, left: 27, duration: 7, delay: 3, sway: 18, opacity: 0.6 },
    { id: 4, size: 22, left: 38, duration: 11, delay: 0.8, sway: -22, opacity: 0.45 },
    { id: 5, size: 36, left: 48, duration: 15, delay: 2.2, sway: 35, opacity: 0.35, blur: true },
    { id: 6, size: 12, left: 58, duration: 8.5, delay: 4, sway: -20, opacity: 0.55 },
    { id: 7, size: 24, left: 68, duration: 12, delay: 1.1, sway: 28, opacity: 0.45 },
    { id: 8, size: 16, left: 78, duration: 9.5, delay: 2.8, sway: -25, opacity: 0.5 },
    { id: 9, size: 32, left: 88, duration: 14, delay: 0.3, sway: 30, opacity: 0.38 },
    { id: 10, size: 10, left: 93, duration: 8, delay: 3.5, sway: -15, opacity: 0.6 },
    { id: 11, size: 18, left: 14, duration: 10.5, delay: 5.2, sway: 20, opacity: 0.45 },
    { id: 12, size: 42, left: 32, duration: 17, delay: 6.0, sway: -40, opacity: 0.28, blur: true },
    { id: 13, size: 12, left: 62, duration: 8.2, delay: 5.8, sway: 16, opacity: 0.55 },
    { id: 14, size: 20, left: 82, duration: 11.5, delay: 4.8, sway: -22, opacity: 0.42 },
    { id: 15, size: 15, left: 42, duration: 9.8, delay: 7.1, sway: 24, opacity: 0.5 },
    { id: 16, size: 7, left: 72, duration: 7.2, delay: 6.5, sway: -14, opacity: 0.65 },
  ], []);

  return (
    <div className="fixed inset-0 pointer-events-none z-0 overflow-hidden bg-[#05070c]">
      {/* Deep Ocean / Car Wash Water Vignette */}
      <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_top,_var(--tw-gradient-stops))] from-blue-950/40 via-[#05070c] to-[#030509]" />

      {/* Gentle Ambient Water Light Beams (Caustics effect) */}
      <motion.div
        animate={{
          opacity: [0.25, 0.45, 0.3, 0.25],
          scale: [1, 1.1, 0.95, 1],
        }}
        transition={{
          duration: 10,
          repeat: Infinity,
          ease: 'easeInOut',
        }}
        className="absolute -top-32 left-1/2 -translate-x-1/2 w-[520px] h-[450px] bg-gradient-to-b from-cyan-400/20 via-blue-600/15 to-transparent rounded-full blur-[110px]"
      />

      <motion.div
        animate={{
          opacity: [0.15, 0.3, 0.15],
          x: [-20, 20, -20],
        }}
        transition={{
          duration: 12,
          repeat: Infinity,
          ease: 'easeInOut',
        }}
        className="absolute bottom-0 right-0 w-80 h-80 bg-blue-700/20 rounded-full blur-[100px]"
      />

      {/* Rising Realistic Water Bubbles */}
      {bubbles.map((b) => (
        <motion.div
          key={b.id}
          className="absolute"
          style={{
            left: `${b.left}%`,
            bottom: '-60px',
            width: b.size,
            height: b.size,
          }}
          initial={{
            y: 0,
            x: 0,
            opacity: 0,
          }}
          animate={{
            y: ['0vh', '-115vh'],
            x: [0, b.sway, -b.sway / 2, b.sway * 0.8, 0],
            opacity: [0, b.opacity, b.opacity * 1.1, b.opacity * 0.8, 0],
            scale: [0.8, 1, 1.05, 1.15, 1.25],
          }}
          transition={{
            duration: b.duration,
            repeat: Infinity,
            delay: b.delay,
            ease: 'easeInOut',
          }}
        >
          {/* Sphere Water Bubble with specular reflection & refraction */}
          <div
            className="w-full h-full rounded-full relative"
            style={{
              background: 'radial-gradient(circle at 35% 30%, rgba(255, 255, 255, 0.8) 0%, rgba(0, 229, 255, 0.4) 35%, rgba(0, 102, 255, 0.15) 70%, rgba(0, 229, 255, 0.5) 100%)',
              border: '1px solid rgba(0, 229, 255, 0.55)',
              boxShadow: 'inset 0 0 6px rgba(255,255,255,0.6), 0 0 10px rgba(0, 210, 255, 0.4)',
              filter: b.blur ? 'blur(1px)' : 'none',
            }}
          >
            {/* Specular White Light Highlight (Bubble Glint) */}
            <div className="absolute top-[18%] left-[22%] w-[28%] h-[28%] rounded-full bg-white/90 blur-[0.4px]" />
            {/* Secondary Lower Refraction Glow */}
            <div className="absolute bottom-[16%] right-[22%] w-[20%] h-[20%] rounded-full bg-cyan-300/60 blur-[0.6px]" />
          </div>
        </motion.div>
      ))}

      {/* Micro-droplets / Champagne sparkle fizz */}
      {[
        { left: '22%', delay: 0.5, dur: 5.5 },
        { left: '35%', delay: 2.1, dur: 6.2 },
        { left: '52%', delay: 1.3, dur: 5.0 },
        { left: '74%', delay: 3.4, dur: 5.8 },
        { left: '85%', delay: 0.9, dur: 6.5 },
      ].map((fizz, idx) => (
        <motion.div
          key={`fizz-${idx}`}
          className="absolute w-1.5 h-1.5 rounded-full bg-white shadow-[0_0_6px_#00e5ff]"
          style={{ left: fizz.left, bottom: '-20px' }}
          animate={{
            y: ['0vh', '-110vh'],
            opacity: [0, 0.7, 0.8, 0],
            x: [0, 8, -6, 0],
          }}
          transition={{
            duration: fizz.dur,
            repeat: Infinity,
            delay: fizz.delay,
            ease: 'linear',
          }}
        />
      ))}
    </div>
  );
}
