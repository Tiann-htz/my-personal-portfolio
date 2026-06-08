import { motion, useInView } from 'framer-motion';
import { MapPin, Tag } from 'lucide-react';
import Image from 'next/image';
import { useRef, useEffect } from 'react';

function Card({ item, align, isActive }) {
  return (
    <div
      className="rounded-2xl border p-8 relative overflow-hidden transition-all duration-700"
      style={{
        backdropFilter: 'blur(16px)',
        background: isActive
          ? item.isLatest
            ? 'rgba(23,37,84,0.45)'
            : `linear-gradient(135deg, ${item.iconColor}08 0%, rgba(255,255,255,0.06) 100%)`
          : item.isLatest
          ? 'rgba(23,37,84,0.18)'
          : 'rgba(255,255,255,0.03)',
        borderColor: isActive
          ? item.isLatest
            ? 'rgba(59,130,246,0.55)'
            : `${item.iconColor}50`
          : 'rgba(255,255,255,0.08)',
        boxShadow: isActive
          ? `0 20px 60px ${item.iconColor}18, 0 0 0 1px ${item.iconColor}20`
          : 'none',
      }}
    >
      {/* Top accent line */}
      <motion.div
        className="absolute top-0 left-6 right-6 h-px rounded-full"
        animate={{
          opacity: isActive ? 1 : 0,
          scaleX: isActive ? 1 : 0,
        }}
        transition={{ duration: 0.5, ease: 'easeOut' }}
        style={{
          background: `linear-gradient(90deg, transparent, ${item.iconColor}, transparent)`,
          transformOrigin: align === 'right' ? 'right' : 'left',
        }}
      />

      {/* Period + Latest badge */}
      <div
        className={`flex items-center gap-2 mb-4 flex-wrap ${
          align === 'right' ? 'justify-end' : 'justify-start'
        }`}
      >
        <motion.span
          animate={{
            color: isActive ? item.iconColor : 'rgba(107,114,128,1)',
            borderColor: isActive ? `${item.iconColor}45` : 'rgba(255,255,255,0.1)',
            background: isActive ? `${item.iconColor}12` : 'rgba(255,255,255,0.04)',
          }}
          transition={{ duration: 0.4 }}
          className="text-xs font-['Fira_Code'] font-semibold px-3 py-1.5 rounded-full border"
        >
          {item.period}
        </motion.span>
        {item.isLatest && (
          <span className="px-2.5 py-1 bg-blue-600/25 border border-blue-400/40 text-blue-300 text-xs font-semibold rounded-full font-['Fira_Code']">
            Latest
          </span>
        )}
      </div>

      {/* Title */}
      <motion.h3
        animate={{ color: isActive ? '#ffffff' : 'rgba(156,163,175,1)' }}
        transition={{ duration: 0.4 }}
        className={`text-2xl font-bold font-['Space_Grotesk'] mb-2 ${
          align === 'right' ? 'text-right' : 'text-left'
        }`}
      >
        {item.title}
      </motion.h3>

      {/* Subtitle */}
      <motion.p
        animate={{ color: isActive ? 'rgba(156,163,175,1)' : 'rgba(75,85,99,1)' }}
        transition={{ duration: 0.4 }}
        className={`text-sm font-['Fira_Code'] mb-5 flex items-center gap-1.5 ${
          align === 'right' ? 'justify-end' : 'justify-start'
        }`}
      >
        {item.isLatest && (
          <MapPin
            className="w-3.5 h-3.5 flex-shrink-0"
            style={{ color: isActive ? '#60a5fa' : 'rgba(75,85,99,1)' }}
          />
        )}
        {item.subtitle}
      </motion.p>

      {/* Divider */}
      <div
        className="mb-5 h-px transition-all duration-500"
        style={{
          background: isActive
            ? `linear-gradient(${align === 'right' ? '270deg' : '90deg'}, ${item.iconColor}30, transparent)`
            : 'rgba(255,255,255,0.05)',
        }}
      />

      {/* Description */}
      <motion.p
        animate={{ color: isActive ? 'rgba(209,213,219,1)' : 'rgba(75,85,99,1)' }}
        transition={{ duration: 0.4 }}
        className={`font-['Inter'] text-sm leading-7 mb-6 ${
          align === 'right' ? 'text-right' : 'text-left'
        }`}
      >
        {item.description}
      </motion.p>

      {/* Tags */}
      <div
        className={`flex flex-wrap gap-2 ${
          align === 'right' ? 'justify-end' : 'justify-start'
        }`}
      >
        {item.tags.map((tag, i) => (
          <motion.span
            key={i}
            animate={{
              background: isActive ? `${item.iconColor}10` : 'rgba(255,255,255,0.03)',
              borderColor: isActive ? `${item.iconColor}35` : 'rgba(255,255,255,0.07)',
              color: isActive ? 'rgba(209,213,219,1)' : 'rgba(75,85,99,1)',
            }}
            transition={{ duration: 0.4, delay: i * 0.03 }}
            className="px-3 py-1.5 text-xs font-['Fira_Code'] rounded-lg border"
          >
            {tag}
          </motion.span>
        ))}
      </div>

      {/* Images */}
      {item.images && item.images.length > 0 && (
        <div className="mt-5 pt-5 border-t border-white/8">
          <p
            className={`text-gray-500 text-xs font-['Fira_Code'] mb-3 flex items-center gap-1.5 ${
              align === 'right' ? 'justify-end' : 'justify-start'
            }`}
          >
            <Tag className="w-3 h-3" />
            References
          </p>
          <div className="grid grid-cols-3 gap-2">
            {item.images.map((img, i) => (
              <div
                key={i}
                className="relative h-20 rounded-lg overflow-hidden border border-white/10 bg-gray-900/50"
              >
                <Image
                  src={img}
                  alt={`${item.title} ref ${i + 1}`}
                  fill
                  className="object-cover hover:scale-105 transition-transform duration-300"
                />
              </div>
            ))}
          </div>
        </div>
      )}
    </div>
  );
}

export default function TimelineCard({ item, index, isActive, onEnter, onLeave }) {
  const ref = useRef(null);
  const isLeft = index % 2 === 0;

  const isInView = useInView(ref, {
    margin: '-30% 0px -30% 0px',
    once: false,
  });

  useEffect(() => {
    if (isInView) onEnter(index);
    else onLeave(index);
  }, [isInView, index, onEnter, onLeave]);

  return (
    <div ref={ref} className="relative flex items-center justify-center mb-24 last:mb-0">
      {/* Left card */}
      <div className="w-5/12 flex justify-end pr-12">
        {isLeft && (
          <motion.div
            initial={{ opacity: 0, x: -60 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: false, amount: 0.25 }}
            transition={{ duration: 0.7, ease: [0.25, 0.1, 0.25, 1] }}
            className="w-full max-w-lg"
          >
            <Card item={item} align="right" isActive={isActive} />
          </motion.div>
        )}
      </div>

      {/* Centre node */}
      <div className="relative z-20 flex-shrink-0">
        {/* Outer glow ring — only when active */}
        <motion.div
          className="absolute rounded-2xl"
          animate={{
            opacity: isActive ? 1 : 0,
            scale: isActive ? 1 : 0.8,
          }}
          transition={{ duration: 0.4 }}
          style={{
            inset: -8,
            borderRadius: 20,
            border: `1.5px solid ${item.iconColor}40`,
            boxShadow: `0 0 24px ${item.iconColor}30`,
          }}
        />
        {/* Pulse ring */}
        {isActive && (
          <motion.div
            className="absolute rounded-2xl border"
            style={{
              inset: -4,
              borderRadius: 18,
              borderColor: `${item.iconColor}35`,
            }}
            animate={{ scale: [1, 1.5, 1], opacity: [0.6, 0, 0.6] }}
            transition={{ duration: 2.5, repeat: Infinity, ease: 'easeInOut' }}
          />
        )}

        {/* Main icon box */}
        <motion.div
          animate={{
            background: isActive ? item.iconBg : 'rgba(255,255,255,0.04)',
            borderColor: isActive ? item.iconBorder : 'rgba(255,255,255,0.1)',
            scale: isActive ? 1.12 : 1,
            boxShadow: isActive ? `0 0 32px ${item.iconColor}45` : 'none',
          }}
          transition={{ duration: 0.4, ease: 'easeOut' }}
          className="relative w-16 h-16 rounded-2xl flex items-center justify-center border"
        >
          <item.icon
            className="w-7 h-7"
            style={{ color: isActive ? item.iconColor : 'rgba(107,114,128,1)' }}
            strokeWidth={1.7}
          />
        </motion.div>
      </div>

      {/* Right card */}
      <div className="w-5/12 flex justify-start pl-12">
        {!isLeft && (
          <motion.div
            initial={{ opacity: 0, x: 60 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: false, amount: 0.25 }}
            transition={{ duration: 0.7, ease: [0.25, 0.1, 0.25, 1] }}
            className="w-full max-w-lg"
          >
            <Card item={item} align="left" isActive={isActive} />
          </motion.div>
        )}
      </div>
    </div>
  );
}