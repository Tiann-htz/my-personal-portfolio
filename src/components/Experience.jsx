import { motion, useScroll, useTransform, useSpring } from 'framer-motion';
import { Sparkles } from 'lucide-react';
import { useRef, useState, useCallback } from 'react';
import { experienceData } from '@/data/Experience';
import TimelineCard from './TimelineCard';

function TimelineLine({ containerRef, activeIndex }) {
  const { scrollYProgress } = useScroll({
    target: containerRef,
    offset: ['start 90%', 'end 10%'],
  });

  const scaleY = useSpring(scrollYProgress, {
    stiffness: 55,
    damping: 22,
    restDelta: 0.001,
  });

  const glowTop = useTransform(scrollYProgress, [0, 1], ['0%', '100%']);

  const activeColor =
    activeIndex >= 0 ? experienceData[activeIndex].iconColor : '#6366f1';

  return (
    <>
      {/* Faded static track */}
      <div className="absolute left-1/2 top-0 bottom-0 w-px -translate-x-1/2 bg-white/[0.07]" />

      {/* Animated fill */}
      <motion.div
        className="absolute left-1/2 top-0 w-px origin-top -translate-x-1/2 transition-colors duration-700"
        style={{
          scaleY,
          height: '100%',
          background: `linear-gradient(to bottom, #3b82f6, #6366f1, ${activeColor})`,
          boxShadow: `0 0 12px rgba(99,102,241,0.5)`,
        }}
      />

      {/* Single traveling glow orb */}
      <motion.div
        className="absolute left-1/2 -translate-x-1/2 pointer-events-none z-30"
        style={{
          top: glowTop,
          width: 14,
          height: 14,
          marginTop: -7,
          borderRadius: '50%',
          background: `radial-gradient(circle, #c7d2fe 0%, ${activeColor} 50%, transparent 100%)`,
          boxShadow: `0 0 20px 8px ${activeColor}55`,
          transition: 'background 0.7s, box-shadow 0.7s',
        }}
      />
    </>
  );
}

export default function Experience() {
  const [activeIndex, setActiveIndex] = useState(-1);
  const timelineRef = useRef(null);

  const handleEnter = useCallback((index) => {
    setActiveIndex(index);
  }, []);

  const handleLeave = useCallback((index) => {
    setActiveIndex((prev) => (prev === index ? -1 : prev));
  }, []);

  return (
    <section id="experience" className="min-h-screen flex items-center justify-center px-6 py-32">
      <div className="container mx-auto relative z-10 max-w-6xl">

        {/* ── Header ── */}
        <motion.div
          initial={{ opacity: 0, y: -40 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: false, amount: 0.3 }}
          transition={{ duration: 0.8, ease: 'easeOut' }}
          className="text-center mb-28"
        >
          <motion.h2
            initial={{ opacity: 0, scale: 0.85 }}
            whileInView={{ opacity: 1, scale: 1 }}
            viewport={{ once: false, amount: 0.3 }}
            transition={{ duration: 0.6, delay: 0.15 }}
            className="text-5xl md:text-6xl font-bold font-['Space_Grotesk'] mb-4"
            style={{
              background: 'linear-gradient(135deg, #c2c7cf 0%, #b5adad 30%, #a9a9a9 60%, #818182 100%)',
              backgroundClip: 'text',
              WebkitBackgroundClip: 'text',
              WebkitTextFillColor: 'transparent',
            }}
          >
            Experience
          </motion.h2>
          <motion.div
            initial={{ opacity: 0, x: -20 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: false, amount: 0.3 }}
            transition={{ duration: 0.6, delay: 0.3 }}
            className="flex items-center justify-center gap-2"
          >
            <Sparkles className="w-4 h-4 text-gray-400" />
            <p
              className="text-lg font-['Fira_Code']"
              style={{
                background: 'linear-gradient(135deg, #c2c7cf 0%, #e0e0e0 30%, #fdfeff 60%, #818182 100%)',
                backgroundClip: 'text',
                WebkitBackgroundClip: 'text',
                WebkitTextFillColor: 'transparent',
              }}
            >
              A journey of continuous learning and growth
            </p>
          </motion.div>
        </motion.div>

        {/* ── Timeline ── */}
        <div ref={timelineRef} className="relative">
          <TimelineLine containerRef={timelineRef} activeIndex={activeIndex} />

          {/* Cards */}
          <div className="relative z-10">
            {experienceData.map((item, index) => (
              <TimelineCard
                key={item.id}
                item={item}
                index={index}
                isActive={activeIndex === index}
                onEnter={handleEnter}
                onLeave={handleLeave}
              />
            ))}
          </div>

          {/* End cap dot */}
          <div className="flex justify-center pt-2 relative z-10">
            <motion.div
              initial={{ scale: 0 }}
              whileInView={{ scale: 1 }}
              viewport={{ once: false, amount: 0.5 }}
              transition={{ duration: 0.4, type: 'spring', bounce: 0.5 }}
              className="w-2.5 h-2.5 rounded-full"
              style={{
                background: 'linear-gradient(135deg, #60a5fa, #818cf8)',
                boxShadow: '0 0 10px rgba(99,102,241,0.5)',
              }}
            />
          </div>
        </div>

      </div>
    </section>
  );
}