import React from 'react';
import { AureliusPromoBanner } from './components/AureliusPromoBanner';
import { motion } from 'motion/react';

export default function PromoPage() {
  return (
    <div className="min-h-screen bg-gradient-to-b from-[#0a0612] via-[#1a1625] to-[#0a0612]">
      {/* Hero Promo Banner */}
      <AureliusPromoBanner variant="full" showLogo={true} />

      {/* Additional sections can be added here */}
      <div className="container mx-auto px-4 py-20">
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="max-w-4xl mx-auto text-center space-y-8"
        >
          <h2 className="text-4xl md:text-5xl text-white" style={{ fontWeight: 700 }}>
            Revolutionary Trading Technology
          </h2>
          
          <p className="text-white/70 text-lg md:text-xl leading-relaxed">
            Aurelius-1 represents the pinnacle of algorithmic trading innovation, 
            combining cutting-edge synthetic intelligence with adaptive neural networks 
            to deliver consistent, automated trading performance in the XAU/USD market.
          </p>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-6 pt-8">
            {[
              {
                title: 'Fully Automated',
                description: 'Set it and forget it - trades 24/7 while you sleep',
                icon: '🤖'
              },
              {
                title: 'Adaptive Learning',
                description: 'Continuously evolves with market conditions',
                icon: '🧠'
              },
              {
                title: 'MT5 Integration',
                description: 'Seamless integration with MetaTrader 5 platform',
                icon: '⚡'
              }
            ].map((feature, index) => (
              <motion.div
                key={index}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: index * 0.1 }}
                className="p-6 rounded-2xl border border-white/10 bg-white/5 backdrop-blur-sm hover:border-[#FF5C39]/50 transition-all duration-300"
              >
                <div className="text-4xl mb-4">{feature.icon}</div>
                <h3 className="text-white text-xl mb-2" style={{ fontWeight: 600 }}>
                  {feature.title}
                </h3>
                <p className="text-white/60">
                  {feature.description}
                </p>
              </motion.div>
            ))}
          </div>

          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="pt-12"
          >
            <button className="px-8 py-4 bg-gradient-to-r from-[#FF5C39] to-[#FF3D1A] rounded-full text-white hover:shadow-lg hover:shadow-[#FF5C39]/50 transition-all duration-300 transform hover:scale-105" style={{ fontWeight: 600 }}>
              Get Started Today
            </button>
          </motion.div>
        </motion.div>
      </div>

      {/* Performance metrics section */}
      <div className="container mx-auto px-4 py-20 border-t border-white/10">
        <motion.div
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          viewport={{ once: true }}
          className="max-w-6xl mx-auto"
        >
          <h2 className="text-3xl md:text-4xl text-white text-center mb-12" style={{ fontWeight: 700 }}>
            Proven Performance
          </h2>

          <div className="grid grid-cols-2 md:grid-cols-4 gap-6">
            {[
              { value: '40-50%', label: 'Annual Return' },
              { value: '1.42x', label: 'Profit Factor' },
              { value: '2.59', label: 'Recovery Factor' },
              { value: '1.85', label: 'Sharpe Ratio' }
            ].map((metric, index) => (
              <motion.div
                key={index}
                initial={{ opacity: 0, scale: 0.9 }}
                whileInView={{ opacity: 1, scale: 1 }}
                viewport={{ once: true }}
                transition={{ delay: index * 0.1 }}
                className="text-center p-6 rounded-2xl border border-white/10 bg-gradient-to-b from-white/5 to-transparent backdrop-blur-sm hover:border-[#FF5C39]/50 transition-all duration-300"
              >
                <div className="text-3xl md:text-4xl bg-gradient-to-r from-[#FF5C39] to-[#FF3D1A] bg-clip-text text-transparent mb-2" style={{ fontWeight: 700 }}>
                  {metric.value}
                </div>
                <div className="text-white/60 text-sm">
                  {metric.label}
                </div>
              </motion.div>
            ))}
          </div>
        </motion.div>
      </div>
    </div>
  );
}
