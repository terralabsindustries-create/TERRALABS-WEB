import React from 'react';
import { TrendingUp, Shield, Cpu, Users, Zap, Target, Brain, Car, Network, Rocket, Award, Globe } from 'lucide-react';

interface ProjectCard {
  id: string;
  name: string;
  status: 'live' | 'in-development' | 'research' | 'planned';
  description: string;
  icon: React.ComponentType<{ size?: number; className?: string }>;
  highlights: string[];
  progress: number; // Percentage 0-100
}

interface Division {
  id: string;
  title: string;
  subtitle: string;
  color: string;
  gradientFrom: string;
  gradientTo: string;
  icon: React.ComponentType<{ size?: number; className?: string }>;
  projects: ProjectCard[];
}

const roadmapData: Division[] = [
  {
    id: 'fintech',
    title: 'Fintech Engineering',
    subtitle: 'Synthetic Neural Adaptive Intelligence Technology Systems',
    color: '#FF5C39',
    gradientFrom: '#FF5C39',
    gradientTo: '#FF3D1A',
    icon: TrendingUp,
    projects: [
      {
        id: 'aurelius-1',
        name: 'Aurelius-1™',
        status: 'live',
        description: 'Aurelius-1™ is our <strong>Synthetic Neural Adaptive Intelligence Technology (SNAIT)</strong> for XAU/USD (Gold) trading on MetaTrader 5. An Intelligent system that learns from decades of market data, adapts in real time, and runs on Auto-Pilot and the precision of a Random Forest–based Decision Framework (RFDF) built for discipline and complete control, with your funds always secured in your own Broker account.',
        icon: Award,
        highlights: [
          'Synthetic Neural Adaptive Intelligence Technology (SNAIT)',
          'Synthetic Intelligence Auto-Pilot Trading',
          'Random Forest Decision Framework (RFDF)',
          'Client Funds Stay in Broker Account'
        ],
        progress: 100
      },
      {
        id: 'pythagoras-stardust',
        name: 'Pythagoras Stardust™',
        status: 'live',
        description: 'Pythagoras Stardust™ is an advanced XAU/USD machine-learning trading engine built on a non-linear quantitative signal pipeline that evaluates market structure bar-by-bar. The system uses PyTorch-trained predictive models exported through ONNX for MT5 execution, combining model-confidence scoring, normalized multi-factor market features, volatility-aware regime filtering, out-of-distribution protection, ATR-based dynamic exits, and strict risk-governance logic.',
        icon: Rocket,
        highlights: [
          'PyTorch / ONNX ML Architecture',
          'Non-Linear Quantitative Signal Pipeline',
          'Volatility-Aware Regime Filtering',
          'ATR-Based Dynamic Exits'
        ],
        progress: 100
      },
      {
        id: 'rnd-lab',
        name: 'TERRALABS R&D Laboratory',
        status: 'research',
        description: 'Dedicated research facility focused on Deep Reinforcement Learning (DRL) and technological advancements in algorithmic trading, quantitative finance, and AI-driven market analysis. Powered by high-performance GPU clusters and supercomputing infrastructure, our R&D lab processes massive datasets, trains complex neural networks, and runs millions of market simulations to pioneer the next generation of quantitative intelligence systems.',
        icon: Brain,
        highlights: [
          'Deep Reinforcement Learning Research',
          'High-Performance GPU Computing Clusters',
          'Supercomputer Processing Infrastructure',
          'Proprietary LLM for Market Analysis',
          'Quantum-Inspired Optimization Algorithms',
          'Massive Parallel Market Simulations',
          'Academic Partnership Programs'
        ],
        progress: 50
      },
      {
        id: 'aurelius-2',
        name: 'Aurelius-2™',
        status: 'planned',
        description: '<strong>Quantitative Neurogenic Organism (QNO)</strong> is a self-developing quantitative lifeform that learns through interaction with financial environments using deep reinforcement learning. It grows and restructures its internal neural architecture over time, adapting to market regimes, risk constraints, and capital dynamics, operating as an autonomous organism rather than a fixed or pre-programmed trading model.',
        icon: Globe,
        highlights: [
          'Self-Developing Quantitative Lifeform',
          'Adaptive Neural Architecture Restructuring',
          'Deep Reinforcement Learning Evolution',
          'Autonomous Market Regime Adaptation'
        ],
        progress: 25
      }
    ]
  },
  {
    id: 'embedded-ai',
    title: 'Embedded Systems & AI',
    subtitle: 'Intelligent Automotive Safety Technologies',
    color: '#00E5FF',
    gradientFrom: '#00F0FF',
    gradientTo: '#00D4FF',
    icon: Cpu,
    projects: [
      {
        id: 'bluebox',
        name: 'BlueBox™',
        status: 'in-development',
        description: 'AI-driven, cryptographically secure OBD (On-Board Diagnostics) device fitted inside vehicles as an automotive accident evidence system. Advanced edge computing solution that captures, analyzes, and securely stores accident data with blockchain-verified integrity. Instantly sends incident reports to police, ambulance, insurance company, jurisdiction, and emergency contact upon detection.',
        icon: Car,
        highlights: [
          'Real-Time Accident Detection & Recording',
          'Instant Emergency Notification System',
          'Automated Reports to Police, Ambulance & Insurance',
          'Cryptographic Evidence Chain of Custody',
          'Edge AI Processing & Computer Vision',
          'Blockchain-Verified Data Integrity',
          'Multi-Camera 360° Coverage'
        ],
        progress: 75
      }
    ]
  },
  {
    id: 'human-systems',
    title: 'Human-Centered Systems Engineering',
    subtitle: 'AI-Driven Coordination & Social Impact',
    color: '#D4FF00',
    gradientFrom: '#E6FF00',
    gradientTo: '#BFFF00',
    icon: Users,
    projects: [
      {
        id: 'weloop',
        name: 'WELOOP™',
        status: 'research',
        description: 'AI-driven human coordination system that listens to real-world needs, understands intent, and connects people instantly to solve life\'s problems with trust, proximity, and democratic earning—every single second.',
        icon: Network,
        highlights: [
          'Real-Time Intent Understanding & Matching',
          'Proximity-Based Service Connection',
          'Democratic Earning Model',
          'Trust & Reputation Verification',
          'Natural Language Processing',
          'Community-Driven Problem Solving'
        ],
        progress: 50
      }
    ]
  }
];

const roadmapKeyframes = `
  @keyframes fadeInUp {
    from {
      opacity: 0;
      transform: translateY(30px);
    }
    to {
      opacity: 1;
      transform: translateY(0);
    }
  }
  
  @keyframes float {
    0%, 100% {
      transform: translateY(0px);
    }
    50% {
      transform: translateY(-10px);
    }
  }

  @keyframes pulse {
    0%, 100% {
      opacity: 1;
    }
    50% {
      opacity: 0.5;
    }
  }

  @keyframes progressPulse {
    0%, 100% {
      box-shadow: 0 0 20px rgba(255, 92, 57, 0.4);
    }
    50% {
      box-shadow: 0 0 40px rgba(255, 92, 57, 0.8);
    }
  }

  @keyframes shimmer {
    0% {
      background-position: -1000px 0;
    }
    100% {
      background-position: 1000px 0;
    }
  }

  @keyframes radarPulse {
    0% {
      transform: scale(1);
      opacity: 1;
    }
    50% {
      transform: scale(1.8);
      opacity: 0.3;
    }
    100% {
      transform: scale(2.5);
      opacity: 0;
    }
  }

  @keyframes radarBlink {
    0%, 100% {
      opacity: 1;
      transform: scale(1);
    }
    50% {
      opacity: 0.5;
      transform: scale(0.9);
    }
  }
`;

export function RoadMap() {
  const getStatusBadge = (status: ProjectCard['status'], projectId?: string) => {
    switch (status) {
      case 'live':
        return { label: 'LIVE', color: '#bef264', bg: 'rgba(190, 242, 100, 0.2)' };
      case 'in-development':
        // Special label for BlueBox project
        if (projectId === 'bluebox') {
          return { label: 'PROTOTYPE DEVELOPMENT STAGE', color: '#FF5C39', bg: 'rgba(255, 92, 57, 0.2)' };
        }
        return { label: 'IN DEVELOPMENT', color: '#FF5C39', bg: 'rgba(255, 92, 57, 0.2)' };
      case 'research':
        // Special label for R&D Lab project
        if (projectId === 'rnd-lab') {
          return { label: 'INFRASTRUCTURE ESTIMATION DONE', color: '#60A5FA', bg: 'rgba(96, 165, 250, 0.2)' };
        }
        return { label: 'APP IS READY', color: '#60A5FA', bg: 'rgba(96, 165, 250, 0.2)' };
      case 'planned':
        return { label: 'PLANNED', color: '#9CA3AF', bg: 'rgba(156, 163, 175, 0.2)' };
    }
  };

  return (
    <div>
      <style dangerouslySetInnerHTML={{ __html: roadmapKeyframes }} />
      <div className="relative" style={{ padding: '2rem 0 4rem 0', minHeight: 'auto' }}>
        {/* Transparent Orbs Background */}
        <div className="absolute inset-0 overflow-hidden pointer-events-none" style={{ zIndex: 0 }}>
          <div 
            className="absolute" 
            style={{
              top: '5%',
              left: '5%',
              width: '400px',
              height: '400px',
              background: 'radial-gradient(circle, rgba(255, 92, 57, 0.15) 0%, rgba(255, 92, 57, 0.05) 40%, transparent 70%)',
              filter: 'blur(80px)',
              borderRadius: '50%',
              animation: 'float 22s ease-in-out infinite'
            }}
          />
          <div 
            className="absolute" 
            style={{
              bottom: '10%',
              right: '10%',
              width: '500px',
              height: '500px',
              background: 'radial-gradient(circle, rgba(139, 92, 246, 0.12) 0%, rgba(139, 92, 246, 0.04) 40%, transparent 70%)',
              filter: 'blur(100px)',
              borderRadius: '50%',
              animation: 'float 28s ease-in-out infinite reverse'
            }}
          />
          <div 
            className="absolute" 
            style={{
              top: '40%',
              right: '20%',
              width: '350px',
              height: '350px',
              background: 'radial-gradient(circle, rgba(59, 130, 246, 0.08) 0%, rgba(59, 130, 246, 0.02) 40%, transparent 70%)',
              filter: 'blur(70px)',
              borderRadius: '50%',
              animation: 'float 20s ease-in-out infinite'
            }}
          />
        </div>

        {/* Header Section */}
        <div className="max-w-7xl mx-auto mb-12 md:mb-20 text-center px-4 sm:px-6 lg:px-8" style={{ position: 'relative', zIndex: 1 }}>
          {/* Decorative Orange Line */}
          <div style={{
            width: 'clamp(50px, 10vw, 80px)',
            height: 'clamp(3px, 0.5vw, 4px)',
            background: 'linear-gradient(to right, #FF5C39, #FF3D1A)',
            margin: '0 auto clamp(1rem, 3vw, 2rem) auto',
            borderRadius: '2px',
            boxShadow: '0 0 20px rgba(255, 92, 57, 0.5)'
          }} />
          
          <h2 style={{ 
            fontSize: 'clamp(2.5rem, 10vw, 8rem)', 
            fontWeight: 900, 
            lineHeight: 1.1, 
            letterSpacing: '-0.04em',
            textAlign: 'center',
            margin: '0 auto 1.5rem auto',
            padding: '0 1rem',
            color: '#FFFFFF'
          }}>
            <span style={{ color: '#FFFFFF' }}>Parallel Projects Roadmap</span>
            <span style={{ color: '#FFFFFF' }}> of </span>
            <span style={{
              background: 'linear-gradient(to right, #FF5C39, #FF3D1A)',
              WebkitBackgroundClip: 'text',
              WebkitTextFillColor: 'transparent',
              backgroundClip: 'text'
            }}>Terralabs</span>
            <span style={{
              background: 'linear-gradient(to right, #FF5C39, #FF3D1A)',
              WebkitBackgroundClip: 'text',
              WebkitTextFillColor: 'transparent',
              backgroundClip: 'text'
            }}>.</span>
          </h2>
          
          <p style={{ 
            color: 'rgba(255, 255, 255, 0.7)', 
            fontSize: 'clamp(1rem, 2.5vw, 1.5rem)', 
            maxWidth: '48rem', 
            margin: '0 auto',
            padding: '0 1rem',
            lineHeight: '1.7'
          }}>
            TERRALABS INDUSTRIES—Building the future across Fintech, Embedded Systems, and Human-Centered AI.
          </p>
        </div>

        {/* Divisions Content */}
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8" style={{ position: 'relative', zIndex: 1 }}>
          <div className="space-y-16 md:space-y-24">
            {roadmapData.map((division, divIndex) => {
              const DivisionIcon = division.icon;
              
              // Calculate the starting project number for this division
              const projectStartNumber = roadmapData
                .slice(0, divIndex)
                .reduce((sum, div) => sum + div.projects.length, 0);
              
              return (
                <div
                  key={division.id}
                  className="relative"
                  style={{
                    animation: `fadeInUp 0.6s ease-out ${divIndex * 0.2}s both`
                  }}
                >
                  {/* Division Header */}
                  <div className="mb-8 md:mb-12">
                    <div className="flex items-center gap-4 mb-3">
                      <div className="p-3 md:p-4 rounded-xl" style={{
                        background: `linear-gradient(135deg, ${division.gradientFrom}20, ${division.gradientTo}10)`,
                        border: `2px solid ${division.color}60`,
                        boxShadow: `0 0 30px ${division.color}30, inset 0 0 20px ${division.color}10`
                      }}>
                        <DivisionIcon style={{ 
                          color: division.color,
                          width: 'clamp(2.5rem, 5vw, 4rem)',
                          height: 'clamp(2.5rem, 5vw, 4rem)',
                          strokeWidth: 2.5,
                          filter: `drop-shadow(0 0 10px ${division.color}60)`
                        }} />
                      </div>
                      <div>
                        <h2 style={{
                          fontSize: 'clamp(1.75rem, 4.5vw, 3.5rem)',
                          fontWeight: 900,
                          letterSpacing: '-0.02em',
                          lineHeight: 1.1,
                          background: `linear-gradient(to right, ${division.gradientFrom}, ${division.gradientTo})`,
                          WebkitBackgroundClip: 'text',
                          WebkitTextFillColor: 'transparent',
                          backgroundClip: 'text',
                          textShadow: `0 0 40px ${division.color}40`
                        }}>
                          {division.title}
                        </h2>
                        <p style={{
                          fontSize: 'clamp(0.875rem, 2vw, 1.25rem)',
                          fontWeight: 600,
                          color: 'rgba(255, 255, 255, 0.8)',
                          marginTop: '0.5rem',
                          letterSpacing: '0.02em'
                        }}>{division.subtitle}</p>
                      </div>
                    </div>
                    
                    {/* Division Separator Line */}
                    <div className="w-full h-px mt-4" style={{
                      background: `linear-gradient(to right, transparent, ${division.color}60, transparent)`
                    }} />
                  </div>

                  {/* Projects Grid with Branching Design */}
                  <div className="relative">
                    {/* Vertical Branch Line - Desktop Only */}
                    {/* Removed vertical branch line */}

                    {/* Projects */}
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-6 md:gap-8">
                      {division.projects.map((project, projIndex) => {
                        const ProjectIcon = project.icon;
                        const badge = getStatusBadge(project.status, project.id);
                        
                        // Define specific orange variants for Fintech projects
                        const getProjectColor = () => {
                          if (division.id === 'fintech') {
                            const fintechColors = [
                              '#FF5C39', // Aurelius-1: Original bright orange-red (discontinued)
                              '#FF3D1A', // Pythagoras Stardust: Deep orange-red
                              '#FFFFFF', // R&D Lab: Pure White (clean laboratory precision)
                              '#03D26F'  // Aurelius-2: Green (global expansion)
                            ];
                            return fintechColors[projIndex] || division.color;
                          }
                          return division.color;
                        };
                        
                        const projectColor = getProjectColor();

                        return (
                          <div
                            key={project.id}
                            className="relative group h-full"
                            style={{
                              animation: `fadeInUp 0.6s ease-out ${(divIndex * 0.2) + (projIndex * 0.1)}s both`
                            }}
                          >
                            {/* Project Card */}
                            <div className="relative rounded-xl md:rounded-2xl overflow-hidden border transition-all duration-500 backdrop-blur-2xl hover:scale-[1.02] h-full flex flex-col" style={{
                              background: division.id === 'embedded-ai' 
                                ? 'rgba(0, 229, 255, 0.20)' 
                                : division.id === 'human-systems'
                                ? 'rgba(212, 255, 0, 0.20)'
                                : division.id === 'fintech'
                                ? `${projectColor}33`
                                : 'rgba(10, 10, 10, 0.6)',
                              borderColor: division.id === 'embedded-ai'
                                ? `${division.color}50`
                                : division.id === 'human-systems'
                                ? `${division.color}50`
                                : division.id === 'fintech'
                                ? `${projectColor}50`
                                : `${division.color}30`,
                              marginLeft: division.projects.length > 1 ? '0' : '0',
                              boxShadow: division.id === 'embedded-ai'
                                ? `0 8px 32px ${division.color}25, 0 0 60px ${division.color}15`
                                : division.id === 'human-systems'
                                ? `0 8px 32px ${division.color}25, 0 0 60px ${division.color}15`
                                : division.id === 'fintech'
                                ? `0 8px 32px ${projectColor}25, 0 0 60px ${projectColor}15`
                                : `0 8px 32px ${division.color}15`
                            }}>
                              {/* Shimmer Effect on Hover */}
                              <div 
                                className="absolute inset-0 pointer-events-none opacity-0 group-hover:opacity-100 transition-opacity duration-500"
                                style={{
                                  background: `linear-gradient(90deg, transparent, ${projectColor}15, transparent)`,
                                  backgroundSize: '200% 100%',
                                  animation: 'shimmer 3s infinite'
                                }}
                              />

                              {/* Project Number - Upper Right Corner */}
                              <div className="absolute top-4 right-4 md:top-6 md:right-6 text-right leading-none" style={{ zIndex: 20 }}>
                                <div className="text-xs uppercase tracking-widest mb-1" style={{ 
                                  color: projectColor,
                                  opacity: 1
                                }}>
                                  PROJECT
                                </div>
                                <div style={{
                                  fontSize: 'clamp(3rem, 8vw, 5rem)',
                                  fontWeight: 900,
                                  lineHeight: 0.8,
                                  letterSpacing: '-0.02em',
                                  color: projectColor,
                                  opacity: 0.5
                                }}>
                                  {String(projectStartNumber + projIndex + 1).padStart(2, '0')}
                                </div>
                              </div>

                              <div className="p-6 md:p-8 relative z-10">
                                {/* Project Header */}
                                <div className="flex items-start justify-between mb-4">
                                  <div className="flex items-center gap-3">
                                    <div className="p-2.5 md:p-3 rounded-lg" style={{
                                      background: `${projectColor}15`,
                                      border: `1px solid ${projectColor}30`
                                    }}>
                                      <ProjectIcon className="w-5 h-5 md:w-6 md:h-6" style={{ color: projectColor }} />
                                    </div>
                                    <h3 className="text-xl md:text-2xl text-white">{project.name}</h3>
                                  </div>
                                </div>

                                {/* Status Badge */}
                                <div className="inline-flex items-center gap-2 px-3 py-1.5 rounded-full mb-4 text-xs uppercase tracking-wider" style={{
                                  background: `${projectColor}20`,
                                  border: `1px solid ${projectColor}40`,
                                  color: projectColor
                                }}>
                                  <div className="w-2 h-2 rounded-full" style={{
                                    background: projectColor,
                                    animation: project.status === 'in-development' || project.status === 'live' ? 'pulse 2s ease-in-out infinite' : 'none'
                                  }} />
                                  {badge.label}
                                </div>

                                {/* Progress Meter */}
                                <div className="mb-6">
                                  <div className="flex items-center justify-between mb-2">
                                    <span className="text-xs uppercase tracking-wider text-gray-400">Completion</span>
                                    <span className="text-sm font-semibold" style={{ color: projectColor }}>
                                      {project.progress}%
                                    </span>
                                  </div>
                                  <div className="relative w-full h-2.5 rounded-full overflow-hidden" style={{
                                    background: 'rgba(255, 255, 255, 0.05)',
                                    border: `1px solid ${projectColor}20`
                                  }}>
                                    {/* Background Track */}
                                    <div className="absolute inset-0" style={{
                                      background: 'linear-gradient(to right, rgba(255, 255, 255, 0.02), rgba(255, 255, 255, 0.05))'
                                    }} />
                                    
                                    {/* Progress Fill */}
                                    <div 
                                      className="absolute left-0 top-0 bottom-0 rounded-full transition-all duration-1000 ease-out"
                                      style={{
                                        width: `${project.progress}%`,
                                        background: division.id === 'fintech' 
                                          ? `linear-gradient(to right, ${projectColor}, ${projectColor}CC)`
                                          : `linear-gradient(to right, ${division.gradientFrom}, ${division.gradientTo})`,
                                        boxShadow: division.id === 'fintech'
                                          ? `0 0 10px ${projectColor}60, 0 0 20px ${projectColor}30`
                                          : `0 0 10px ${division.color}60, 0 0 20px ${division.color}30`,
                                      }}
                                    >
                                      {/* Shine Effect */}
                                      <div className="absolute inset-0 rounded-full" style={{
                                        background: 'linear-gradient(to bottom, rgba(255, 255, 255, 0.3) 0%, transparent 50%, rgba(0, 0, 0, 0.2) 100%)'
                                      }} />
                                      
                                      {/* Animated Shimmer */}
                                      <div 
                                        className="absolute inset-0 rounded-full opacity-60"
                                        style={{
                                          background: 'linear-gradient(90deg, transparent, rgba(255, 255, 255, 0.3), transparent)',
                                          backgroundSize: '200% 100%',
                                          animation: 'shimmer 2s infinite'
                                        }}
                                      />
                                    </div>
                                    
                                    {/* Glass Highlight */}
                                    <div className="absolute inset-0 rounded-full pointer-events-none" style={{
                                      background: 'linear-gradient(to bottom, rgba(255, 255, 255, 0.1) 0%, transparent 50%)'
                                    }} />
                                  </div>
                                </div>

                                {/* Description */}
                                <p 
                                  className="text-sm md:text-base text-gray-300 mb-6 leading-relaxed"
                                  dangerouslySetInnerHTML={{ __html: project.description }}
                                />

                                {/* Highlights */}
                                <div className="space-y-2.5">
                                  <div className="text-xs uppercase tracking-wider mb-3" style={{ color: projectColor }}>
                                    Key Highlights
                                  </div>
                                  <div className="space-y-2">
                                    {project.highlights.map((highlight, hIndex) => (
                                      <div key={hIndex} className="flex items-start gap-2.5">
                                        <div className="mt-1.5 w-1.5 h-1.5 rounded-full flex-shrink-0" style={{ 
                                          background: projectColor 
                                        }} />
                                        <span className="text-xs md:text-sm text-gray-300 leading-relaxed">{highlight}</span>
                                      </div>
                                    ))}
                                  </div>
                                </div>
                              </div>

                              {/* Bottom Glow */}
                              <div className="absolute bottom-0 left-0 right-0 h-px opacity-50" style={{
                                background: `linear-gradient(to right, transparent, ${projectColor}60, transparent)`
                              }} />

                              {/* Radar Blinking Icon - Bottom Right Corner */}
                              <div className="absolute bottom-4 right-4 md:bottom-6 md:right-6" style={{ zIndex: 25 }}>
                                <div className="relative w-6 h-6 md:w-7 md:h-7">
                                  {/* Core Blinking Dot */}
                                  <div 
                                    className="absolute inset-0 rounded-full"
                                    style={{
                                      background: projectColor,
                                      boxShadow: `0 0 10px ${projectColor}, 0 0 20px ${projectColor}, 0 0 30px ${projectColor}`,
                                      animation: 'radarBlink 1.5s ease-in-out infinite'
                                    }}
                                  />
                                  
                                  {/* First Pulse Ring */}
                                  <div 
                                    className="absolute inset-0 rounded-full border-2"
                                    style={{
                                      borderColor: projectColor,
                                      animation: 'radarPulse 2s ease-out infinite'
                                    }}
                                  />
                                  
                                  {/* Second Pulse Ring (delayed) */}
                                  <div 
                                    className="absolute inset-0 rounded-full border-2"
                                    style={{
                                      borderColor: projectColor,
                                      animation: 'radarPulse 2s ease-out infinite 1s'
                                    }}
                                  />
                                </div>
                              </div>
                            </div>
                          </div>
                        );
                      })}
                    </div>
                  </div>
                </div>
              );
            })}
          </div>
        </div>
      </div>
    </div>
  );
}