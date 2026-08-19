import React from 'react';
import { motion } from 'motion/react';

/**
 * Social Media Card Component
 * Optimized for social media sharing - matches original design proportions
 * Aspect ratio: 1:1 (square for Instagram/Facebook) or 16:9 (Twitter/LinkedIn)
 */

interface AureliusSocialCardProps {
  aspectRatio?: '1:1' | '16:9';
  size?: 'small' | 'medium' | 'large';
}

export function AureliusSocialCard({ 
  aspectRatio = '1:1', 
  size = 'medium' 
}: AureliusSocialCardProps) {
  
  const sizeClasses = {
    small: 'max-w-md',
    medium: 'max-w-2xl',
    large: 'max-w-4xl'
  };

  const aspectClasses = {
    '1:1': 'aspect-square',
    '16:9': 'aspect-video'
  };

  return (
    <motion.div
      initial={{ opacity: 0, scale: 0.95 }}
      animate={{ opacity: 1, scale: 1 }}
      transition={{ duration: 0.5 }}
      className={`${sizeClasses[size]} ${aspectClasses[aspectRatio]} w-full mx-auto relative overflow-hidden rounded-3xl`}
    >
      {/* Background */}
      <div className="absolute inset-0 bg-gradient-to-b from-[#FF5C39]/20 via-[#1a1625] to-[#1a1625]">
        {/* Top orange bar */}
        <div className="absolute top-0 left-0 right-0 h-16 bg-[#FF5C39]" />
      </div>

      {/* Content Grid */}
      <div className="absolute inset-0 grid grid-cols-5 gap-0">
        {/* Left Card - 3 columns */}
        <div className="col-span-3 p-6 md:p-8 lg:p-12 flex items-center justify-center">
          <div className="relative w-full h-full border border-white/10 rounded-3xl overflow-hidden backdrop-blur-sm bg-gradient-to-br from-black/40 to-black/20">
            {/* Animated gradient background */}
            <div className="absolute inset-0 opacity-90">
              <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[400px] h-[400px] bg-gradient-radial from-[#FF5C39]/40 via-[#FF3D1A]/20 to-transparent rounded-full blur-3xl animate-pulse-slow" />
              <div className="absolute bottom-0 left-0 w-[300px] h-[300px] bg-gradient-radial from-[#FF8C39]/30 via-transparent to-transparent rounded-full blur-2xl" />
            </div>

            {/* Text Content */}
            <div className="relative z-10 h-full flex flex-col justify-center items-center text-center px-4 md:px-6 lg:px-8">
              <motion.p
                initial={{ opacity: 0, y: 10 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.2 }}
                className="text-white/80 text-sm md:text-base mb-3"
              >
                Introducing
              </motion.p>

              <motion.h1
                initial={{ opacity: 0, y: 10 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.3 }}
                className="text-3xl md:text-5xl lg:text-6xl mb-3 bg-gradient-to-r from-[#FF5C39] via-[#FF3D1A] to-[#FF5C39] bg-clip-text text-transparent"
                style={{ fontWeight: 700, letterSpacing: '-0.02em' }}
              >
                AURELIUS-1
              </motion.h1>

              <motion.p
                initial={{ opacity: 0, y: 10 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.4 }}
                className="text-white/70 text-xs md:text-sm mb-8"
              >
                For FOREX XAU/USD only
              </motion.p>

              <motion.div
                initial={{ opacity: 0, scale: 0.9 }}
                animate={{ opacity: 1, scale: 1 }}
                transition={{ delay: 0.5 }}
                className="mb-8"
              >
                <h2 className="text-xl md:text-3xl lg:text-4xl leading-tight" style={{ fontWeight: 700, lineHeight: 1.2 }}>
                  <span className="text-white block mb-1">Synthetic</span>
                  <span className="text-white block mb-1">Intelligence</span>
                  <span className="text-white block mb-1">meets</span>
                  <span className="bg-gradient-to-r from-[#FF5C39] via-[#FF8C39] to-[#FFB039] bg-clip-text text-transparent block mb-1">
                    Adaptive
                  </span>
                  <span className="bg-gradient-to-r from-[#FF5C39] via-[#FF8C39] to-[#FFB039] bg-clip-text text-transparent block mb-1">
                    Neural
                  </span>
                  <span className="bg-gradient-to-r from-[#FF5C39] via-[#FF8C39] to-[#FFB039] bg-clip-text text-transparent block">
                    Trading.
                  </span>
                </h2>
              </motion.div>

              <motion.div
                initial={{ opacity: 0, y: 10 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.6 }}
                className="space-y-1"
              >
                <p className="text-white/80 text-xs md:text-sm">FOR</p>
                <p className="text-white text-lg md:text-2xl" style={{ fontWeight: 600 }}>
                  MetaTrader 5
                </p>
                <p className="text-white text-sm md:text-base mt-2" style={{ fontWeight: 700 }}>
                  TRADE WHILE YOU SLEEP
                </p>
              </motion.div>
            </div>
          </div>
        </div>

        {/* Right Section - 2 columns */}
        <div className="col-span-2 p-6 md:p-8 lg:p-12 flex flex-col justify-between items-center text-center">
          {/* Top: Call to action */}
          <motion.div
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.7 }}
            className="space-y-3 mt-16 md:mt-24"
          >
            <p className="text-white/60 uppercase tracking-wider text-xs md:text-sm">
              For more details
            </p>
            
            <div className="space-y-1">
              <p className="text-white/80 text-base md:text-xl uppercase tracking-wider">
                Visit
              </p>
              <p className="text-white text-lg md:text-2xl uppercase tracking-wider" style={{ fontWeight: 300 }}>
                Web
              </p>
            </div>

            <a
              href="https://www.terralabsindustries.com"
              target="_blank"
              rel="noopener noreferrer"
              className="inline-block text-white hover:text-[#FF5C39] transition-colors text-xs md:text-sm underline decoration-white/30 hover:decoration-[#FF5C39] underline-offset-4 break-all"
            >
              www.terralabsindustries.com
            </a>
          </motion.div>

          {/* Bottom: Logo */}
          <motion.div
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.8 }}
            className="mt-auto mb-4"
          >
            <div className="flex flex-col items-center space-y-2">
              {/* Logo Icon */}
              <div className="relative w-12 h-12 md:w-16 md:h-16">
                <div className="absolute inset-0 bg-gradient-to-br from-[#FF5C39] to-[#FF3D1A] rounded-2xl" />
                <div className="absolute inset-1 bg-[#1a1625] rounded-xl" />
                <div className="absolute inset-0 flex items-center justify-center">
                  <div className="space-y-0.5">
                    {[0, 1, 2].map((i) => (
                      <div 
                        key={i} 
                        className="h-0.5 md:h-1 bg-gradient-to-r from-[#FF5C39] to-[#FF3D1A] rounded-full" 
                        style={{ width: `${48 - i * 8}px` }} 
                      />
                    ))}
                  </div>
                </div>
              </div>
              
              {/* Logo Text */}
              <div className="text-center">
                <p className="text-white text-base md:text-xl lg:text-2xl" style={{ fontWeight: 700, letterSpacing: '0.05em' }}>
                  TERRALABS
                </p>
                <p className="text-white/60 text-[10px] md:text-xs tracking-widest">
                  INDUSTRIES
                </p>
                <p className="text-white/40 text-[8px] md:text-xs">™</p>
              </div>
            </div>
          </motion.div>
        </div>
      </div>
    </motion.div>
  );
}

export default AureliusSocialCard;
