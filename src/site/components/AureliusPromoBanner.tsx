import React from 'react';
import { motion } from 'motion/react';
const terralabsLogo = "/images/figma-placeholder.svg";

interface AureliusPromoBannerProps {
  variant?: 'full' | 'compact';
  showLogo?: boolean;
}

export function AureliusPromoBanner({ variant = 'full', showLogo = true }: AureliusPromoBannerProps) {
  return (
    <div className="relative w-full overflow-hidden bg-[#1a1625] py-12 md:py-20">
      {/* Orange gradient background blob */}
      <div className="absolute top-0 left-0 w-full h-24 bg-gradient-to-b from-[#FF5C39] to-transparent opacity-60" />
      
      <div className="container mx-auto px-4 md:px-6 relative z-10">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 lg:gap-12 items-center max-w-7xl mx-auto">
          
          {/* Left side - Main promotional card */}
          <motion.div
            initial={{ opacity: 0, x: -50 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.8 }}
            className="relative"
          >
            <div className="relative border border-white/10 rounded-[32px] p-8 md:p-12 overflow-hidden backdrop-blur-sm bg-gradient-to-br from-black/40 to-black/20">
              {/* Animated gradient orb background */}
              <div className="absolute inset-0 opacity-80">
                <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[500px] h-[500px] bg-gradient-radial from-[#FF5C39]/30 via-[#FF3D1A]/20 to-transparent rounded-full blur-3xl animate-pulse-slow" />
                <div className="absolute bottom-0 left-0 w-[400px] h-[400px] bg-gradient-radial from-[#FF8C39]/20 via-transparent to-transparent rounded-full blur-3xl" />
              </div>

              {/* Content */}
              <div className="relative z-10 text-center">
                <motion.p
                  initial={{ opacity: 0, y: 20 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true }}
                  transition={{ delay: 0.2 }}
                  className="text-white/80 mb-4"
                >
                  Introducing
                </motion.p>

                <motion.h2
                  initial={{ opacity: 0, y: 20 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true }}
                  transition={{ delay: 0.3 }}
                  className="text-5xl md:text-7xl mb-4 bg-gradient-to-r from-[#FF5C39] via-[#FF3D1A] to-[#FF5C39] bg-clip-text text-transparent"
                  style={{ fontWeight: 700 }}
                >
                  AURELIUS-1
                </motion.h2>

                <motion.p
                  initial={{ opacity: 0, y: 20 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true }}
                  transition={{ delay: 0.4 }}
                  className="text-white/70 mb-12"
                >
                  For FOREX XAU/USD only
                </motion.p>

                <motion.div
                  initial={{ opacity: 0, scale: 0.9 }}
                  whileInView={{ opacity: 1, scale: 1 }}
                  viewport={{ once: true }}
                  transition={{ delay: 0.5 }}
                  className="mb-12"
                >
                  <h3 className="text-4xl md:text-6xl leading-tight mb-8" style={{ fontWeight: 700 }}>
                    <span className="text-white">Synthetic</span>
                    <br />
                    <span className="text-white">Intelligence</span>
                    <br />
                    <span className="text-white">meets</span>
                    <br />
                    <span className="bg-gradient-to-r from-[#FF5C39] via-[#FF8C39] to-[#FFB039] bg-clip-text text-transparent">
                      Adaptive
                    </span>
                    <br />
                    <span className="bg-gradient-to-r from-[#FF5C39] via-[#FF8C39] to-[#FFB039] bg-clip-text text-transparent">
                      Neural
                    </span>
                    <br />
                    <span className="bg-gradient-to-r from-[#FF5C39] via-[#FF8C39] to-[#FFB039] bg-clip-text text-transparent">
                      Trading.
                    </span>
                  </h3>
                </motion.div>

                <motion.div
                  initial={{ opacity: 0, y: 20 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true }}
                  transition={{ delay: 0.6 }}
                  className="space-y-2"
                >
                  <p className="text-white/80 text-xl">FOR</p>
                  <p className="text-white text-2xl md:text-3xl" style={{ fontWeight: 600 }}>
                    MetaTrader 5
                  </p>
                  <p className="text-white text-lg md:text-xl mt-4" style={{ fontWeight: 700 }}>
                    TRADE WHILE YOU SLEEP
                  </p>
                </motion.div>
              </div>
            </div>
          </motion.div>

          {/* Right side - Call to action */}
          <motion.div
            initial={{ opacity: 0, x: 50 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.8, delay: 0.2 }}
            className="text-center lg:text-left space-y-8"
          >
            <div className="space-y-4">
              <p className="text-white/60 uppercase tracking-wider">
                For more details
              </p>
              
              <div className="space-y-2">
                <p className="text-white/80 text-xl uppercase tracking-wider">
                  Visit
                </p>
                <p className="text-white text-2xl uppercase tracking-wider" style={{ fontWeight: 300 }}>
                  Web
                </p>
              </div>

              <motion.a
                href="https://www.terralabsindustries.com"
                target="_blank"
                rel="noopener noreferrer"
                className="inline-block text-white hover:text-[#FF5C39] transition-colors text-lg underline decoration-white/30 hover:decoration-[#FF5C39] underline-offset-4"
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
              >
                www.terralabsindustries.com
              </motion.a>
            </div>

            {showLogo && (
              <motion.div
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: 0.7 }}
                className="flex justify-center lg:justify-start pt-8"
              >
                <div className="w-64 md:w-80">
                  {/* TerraLabs Logo placeholder - replace with actual logo */}
                  <div className="relative">
                    <div className="flex flex-col items-center space-y-2">
                      <img 
                        src={terralabsLogo} 
                        alt="TerraLabs Industries Logo"
                        className="w-auto h-32 object-contain"
                      />
                    </div>
                  </div>
                </div>
              </motion.div>
            )}
          </motion.div>
        </div>
      </div>

      {/* Bottom gradient */}
      <div className="absolute bottom-0 left-0 w-full h-32 bg-gradient-to-t from-[#FF5C39]/10 to-transparent" />
    </div>
  );
}

export default AureliusPromoBanner;