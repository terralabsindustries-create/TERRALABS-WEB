import { useEffect, useRef, useState } from 'react';
import { useScrollAnimation } from './ScrollAnimations';

interface NeuralOrbNetworkProps {
  className?: string;
}

export default function NeuralOrbNetwork({ className = '' }: NeuralOrbNetworkProps) {
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const mainOrbRef = useRef<HTMLDivElement>(null);
  const { scrollY, scrollProgress } = useScrollAnimation();
  const [mousePosition, setMousePosition] = useState({ x: 0, y: 0 });

  // Mouse tracking for interactive effects
  useEffect(() => {
    const handleMouseMove = (e: MouseEvent) => {
      setMousePosition({
        x: (e.clientX / window.innerWidth - 0.5) * 2,
        y: (e.clientY / window.innerHeight - 0.5) * 2
      });
    };

    const throttledMouseMove = throttle(handleMouseMove, 16);
    window.addEventListener('mousemove', throttledMouseMove, { passive: true });
    
    return () => window.removeEventListener('mousemove', throttledMouseMove);
  }, []);

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;

    const ctx = canvas.getContext('2d');
    if (!ctx) return;

    let animationId: number;
    const connections: Array<{
      x1: number;
      y1: number;
      x2: number;
      y2: number;
      progress: number;
      speed: number;
      intensity: number;
      type: 'primary' | 'secondary' | 'micro';
    }> = [];

    const particles: Array<{
      x: number;
      y: number;
      vx: number;
      vy: number;
      life: number;
      maxLife: number;
      size: number;
      color: string;
    }> = [];

    // Resize canvas with high DPI support
    const resizeCanvas = () => {
      const rect = canvas.getBoundingClientRect();
      const dpr = window.devicePixelRatio || 1;
      canvas.width = rect.width * dpr;
      canvas.height = rect.height * dpr;
      ctx.scale(dpr, dpr);
      canvas.style.width = rect.width + 'px';
      canvas.style.height = rect.height + 'px';
    };

    // Enhanced connection system
    const initConnections = () => {
      connections.length = 0;
      
      const centerX = canvas.clientWidth / 2;
      const centerY = canvas.clientHeight / 2;
      
      // Primary neural pathways - main connections
      const primaryPaths = [
        { x1: centerX * 0.2, y1: centerY * 0.3, x2: centerX, y2: centerY },
        { x1: centerX, y1: centerY, x2: centerX * 1.8, y2: centerY * 1.4 },
        { x1: centerX * 0.3, y1: centerY * 1.7, x2: centerX, y2: centerY },
        { x1: centerX, y1: centerY, x2: centerX * 1.7, y2: centerY * 0.2 }
      ];

      primaryPaths.forEach(path => {
        connections.push({
          ...path,
          progress: Math.random(),
          speed: 0.008 + Math.random() * 0.012,
          intensity: 0.8 + Math.random() * 0.4,
          type: 'primary'
        });
      });

      // Secondary neural network - branching connections
      for (let i = 0; i < 8; i++) {
        const angle1 = (Math.PI * 2 * i) / 8;
        const angle2 = (Math.PI * 2 * (i + 2)) / 8;
        const radius1 = 150 + Math.random() * 100;
        const radius2 = 150 + Math.random() * 100;
        
        connections.push({
          x1: centerX + Math.cos(angle1) * radius1,
          y1: centerY + Math.sin(angle1) * radius1,
          x2: centerX + Math.cos(angle2) * radius2,
          y2: centerY + Math.sin(angle2) * radius2,
          progress: Math.random(),
          speed: 0.005 + Math.random() * 0.01,
          intensity: 0.3 + Math.random() * 0.3,
          type: 'secondary'
        });
      }

      // Micro connections - ambient neural activity
      for (let i = 0; i < 15; i++) {
        connections.push({
          x1: Math.random() * canvas.clientWidth,
          y1: Math.random() * canvas.clientHeight,
          x2: Math.random() * canvas.clientWidth,
          y2: Math.random() * canvas.clientHeight,
          progress: Math.random(),
          speed: 0.002 + Math.random() * 0.008,
          intensity: 0.1 + Math.random() * 0.2,
          type: 'micro'
        });
      }
    };

    // Create energy particles
    const createParticle = (x: number, y: number, type: 'gold' | 'blue' | 'white') => {
      const colors = {
        gold: 'rgba(200, 164, 75, 0.8)',
        blue: 'rgba(10, 132, 255, 0.8)',
        white: 'rgba(255, 255, 255, 0.9)'
      };

      particles.push({
        x,
        y,
        vx: (Math.random() - 0.5) * 2,
        vy: (Math.random() - 0.5) * 2,
        life: 60,
        maxLife: 60,
        size: 1 + Math.random() * 3,
        color: colors[type]
      });
    };

    // Enhanced animation with scroll effects
    const animate = () => {
      ctx.clearRect(0, 0, canvas.clientWidth, canvas.clientHeight);
      
      // Scroll-based transforms
      const scrollOffset = scrollY * 0.3;
      const scrollRotation = scrollProgress * Math.PI * 0.5;
      const mouseInfluence = {
        x: mousePosition.x * 30,
        y: mousePosition.y * 20
      };

      ctx.save();
      
      // Apply global transformations based on scroll and mouse
      ctx.translate(
        canvas.clientWidth / 2 + mouseInfluence.x,
        canvas.clientHeight / 2 + mouseInfluence.y
      );
      ctx.rotate(scrollRotation * 0.1);
      ctx.translate(
        -canvas.clientWidth / 2 - mouseInfluence.x,
        -canvas.clientHeight / 2 - mouseInfluence.y
      );

      // Animate connections with enhanced effects
      connections.forEach((connection, index) => {
        const scrollInfluence = Math.sin(scrollProgress * Math.PI * 2 + index * 0.5) * 0.3;
        const adjustedX1 = connection.x1 + scrollInfluence * 20;
        const adjustedY1 = connection.y1 + scrollOffset * 0.1;
        const adjustedX2 = connection.x2 + scrollInfluence * -15;
        const adjustedY2 = connection.y2 + scrollOffset * 0.15;

        // Draw connection line with varying opacity
        const baseOpacity = connection.type === 'primary' ? 0.4 : 
                           connection.type === 'secondary' ? 0.25 : 0.1;
        const opacity = baseOpacity * connection.intensity * (0.8 + scrollInfluence * 0.2);
        
        ctx.strokeStyle = connection.type === 'primary' 
          ? `rgba(10, 132, 255, ${opacity})`
          : `rgba(200, 164, 75, ${opacity * 0.7})`;
        ctx.lineWidth = connection.type === 'primary' ? 2 : 1;
        ctx.lineCap = 'round';
        
        // Add glow effect
        ctx.shadowBlur = connection.type === 'primary' ? 8 : 4;
        ctx.shadowColor = connection.type === 'primary' 
          ? 'rgba(10, 132, 255, 0.5)'
          : 'rgba(200, 164, 75, 0.3)';
        
        ctx.beginPath();
        ctx.moveTo(adjustedX1, adjustedY1);
        ctx.lineTo(adjustedX2, adjustedY2);
        ctx.stroke();
        
        ctx.shadowBlur = 0;

        // Enhanced energy pulses
        const pulseX = adjustedX1 + (adjustedX2 - adjustedX1) * connection.progress;
        const pulseY = adjustedY1 + (adjustedY2 - adjustedY1) * connection.progress;
        
        // Primary pulse
        const pulseSize = connection.type === 'primary' ? 20 : 12;
        const gradient = ctx.createRadialGradient(pulseX, pulseY, 0, pulseX, pulseY, pulseSize);
        
        if (connection.type === 'primary') {
          gradient.addColorStop(0, 'rgba(200, 164, 75, 0.9)');
          gradient.addColorStop(0.3, 'rgba(200, 164, 75, 0.6)');
          gradient.addColorStop(0.7, 'rgba(10, 132, 255, 0.3)');
          gradient.addColorStop(1, 'transparent');
        } else {
          gradient.addColorStop(0, 'rgba(10, 132, 255, 0.6)');
          gradient.addColorStop(0.5, 'rgba(200, 164, 75, 0.3)');
          gradient.addColorStop(1, 'transparent');
        }
        
        ctx.fillStyle = gradient;
        ctx.beginPath();
        ctx.arc(pulseX, pulseY, pulseSize, 0, Math.PI * 2);
        ctx.fill();

        // Create particles occasionally
        if (Math.random() < 0.02 && connection.type === 'primary') {
          createParticle(pulseX, pulseY, Math.random() < 0.7 ? 'gold' : 'blue');
        }
        
        // Update pulse progress with scroll influence
        const scrollSpeed = 1 + scrollProgress * 2;
        connection.progress += connection.speed * scrollSpeed;
        if (connection.progress > 1) {
          connection.progress = 0;
        }
      });

      // Animate particles
      particles.forEach((particle, index) => {
        particle.x += particle.vx;
        particle.y += particle.vy;
        particle.life--;
        
        const alpha = particle.life / particle.maxLife;
        const size = particle.size * alpha;
        
        ctx.globalAlpha = alpha;
        ctx.fillStyle = particle.color;
        ctx.shadowBlur = 6;
        ctx.shadowColor = particle.color;
        
        ctx.beginPath();
        ctx.arc(particle.x, particle.y, size, 0, Math.PI * 2);
        ctx.fill();
        
        ctx.shadowBlur = 0;
        ctx.globalAlpha = 1;
        
        if (particle.life <= 0) {
          particles.splice(index, 1);
        }
      });

      ctx.restore();
      
      animationId = requestAnimationFrame(animate);
    };

    // Initialize and start animation
    resizeCanvas();
    initConnections();
    animate();

    // Handle resize
    const handleResize = () => {
      resizeCanvas();
      initConnections();
    };

    window.addEventListener('resize', handleResize);

    return () => {
      cancelAnimationFrame(animationId);
      window.removeEventListener('resize', handleResize);
    };
  }, [scrollY, scrollProgress, mousePosition]);

  // Calculate scroll-based orb positions
  const getOrbTransforms = () => {
    const baseTransform = 'translate(-50%, -50%)';
    const scrollRotation = scrollProgress * 360 * 0.5;
    const scrollFloat = Math.sin(scrollProgress * Math.PI * 2) * 20;
    const mouseInfluence = {
      x: mousePosition.x * 15,
      y: mousePosition.y * 10
    };

    return {
      main: `${baseTransform} translate(${mouseInfluence.x}px, ${scrollFloat + mouseInfluence.y}px) rotate(${scrollRotation}deg)`,
      left: `translate(${15 + mouseInfluence.x * 0.5}%, ${25 + scrollFloat * 0.3}%) scale(${1 + scrollProgress * 0.2})`,
      right: `translate(${12 - mouseInfluence.x * 0.3}%, ${20 - scrollFloat * 0.2}%) scale(${1 + scrollProgress * 0.15})`,
      micro1: `translate(${25 + mouseInfluence.x * 0.8}%, ${15 + scrollFloat * 0.6}%)`,
      micro2: `translate(${20 - mouseInfluence.x * 0.6}%, ${30 - scrollFloat * 0.4}%)`,
      micro3: `translate(${70 + mouseInfluence.x * 0.4}%, ${70 + scrollFloat * 0.8}%)`
    };
  };

  const transforms = getOrbTransforms();

  return (
    <div 
      style={{
        position: 'fixed',
        top: 0,
        left: 0,
        width: '100%',
        height: '100%',
        zIndex: -1,
        pointerEvents: 'none',
        overflow: 'hidden'
      }}
      className={className}
    >
      {/* Enhanced Neural Network Canvas */}
      <canvas 
        ref={canvasRef}
        style={{
          position: 'absolute',
          top: 0,
          left: 0,
          width: '100%',
          height: '100%',
          opacity: 0.7 + scrollProgress * 0.3,
          filter: `blur(${Math.max(0, 1 - scrollProgress * 2)}px)`
        }}
      />
      
      {/* Main Central Orb with Scroll Effects */}
      <div 
        ref={mainOrbRef}
        style={{
          position: 'absolute',
          top: '50%',
          left: '50%',
          width: 'clamp(300px, 25vw, 400px)',
          height: 'clamp(300px, 25vw, 400px)',
          transform: transforms.main,
          borderRadius: '50%',
          background: 'radial-gradient(120% 120% at 30% 30%, rgba(200, 164, 75, 0.8) 0%, rgba(200, 164, 75, 0.6) 20%, rgba(10, 132, 255, 0.4) 50%, rgba(10, 132, 255, 0.2) 80%, transparent 100%)',
          boxShadow: '0 0 60px rgba(200, 164, 75, 0.6), 0 0 120px rgba(10, 132, 255, 0.3), inset 0 0 60px rgba(255, 255, 255, 0.1)',
          backdropFilter: 'blur(3px)',
          border: '2px solid rgba(255, 255, 255, 0.1)',
          filter: `brightness(${1 + scrollProgress * 0.5}) saturate(${1 + scrollProgress * 0.3})`,
          animation: 'orbPulse 4s ease-in-out infinite'
        }}
      >
        {/* Core reflection */}
        <div 
          style={{
            position: 'absolute',
            top: '20%',
            left: '25%',
            width: '30%',
            height: '30%',
            background: 'radial-gradient(circle, rgba(255, 255, 255, 0.6) 0%, transparent 70%)',
            borderRadius: '50%',
            filter: 'blur(10px)',
            animation: 'glassReflection 6s ease-in-out infinite'
          }}
        />
        
        {/* Neon spark */}
        <div 
          style={{
            position: 'absolute',
            bottom: '15%',
            right: '20%',
            width: '25%',
            height: '25%',
            background: 'radial-gradient(circle, rgba(10, 132, 255, 0.8) 0%, transparent 70%)',
            borderRadius: '50%',
            filter: 'blur(8px)',
            animation: 'neonSpark 4s ease-in-out infinite alternate'
          }}
        />
      </div>

      {/* Support Orbs with Enhanced Movement */}
      <div 
        style={{
          position: 'absolute',
          top: '25%',
          left: '15%',
          width: 'clamp(150px, 15vw, 200px)',
          height: 'clamp(150px, 15vw, 200px)',
          borderRadius: '50%',
          background: 'radial-gradient(circle at 30% 30%, rgba(200, 164, 75, 0.5) 0%, rgba(10, 132, 255, 0.3) 40%, rgba(10, 132, 255, 0.1) 70%, transparent 100%)',
          transform: transforms.left,
          opacity: 0.6 + scrollProgress * 0.4,
          filter: 'blur(2px)',
          animation: 'orbFloat1 8s ease-in-out infinite'
        }}
      />
      
      <div 
        style={{
          position: 'absolute',
          bottom: '20%',
          right: '12%',
          width: 'clamp(180px, 18vw, 250px)',
          height: 'clamp(180px, 18vw, 250px)',
          borderRadius: '50%',
          background: 'radial-gradient(circle at 30% 30%, rgba(200, 164, 75, 0.4) 0%, rgba(10, 132, 255, 0.3) 40%, rgba(10, 132, 255, 0.1) 70%, transparent 100%)',
          transform: transforms.right,
          opacity: 0.6 + scrollProgress * 0.4,
          filter: 'blur(2px)',
          animation: 'orbFloat2 10s ease-in-out infinite'
        }}
      />
      
      {/* Micro Ambient Orbs with Scroll Physics */}
      <div 
        style={{
          position: 'absolute',
          top: '15%',
          right: '25%',
          width: '80px',
          height: '80px',
          borderRadius: '50%',
          background: 'radial-gradient(circle, rgba(200, 164, 75, 0.3) 0%, rgba(10, 132, 255, 0.1) 50%, transparent 100%)',
          transform: transforms.micro1,
          opacity: 0.4 + scrollProgress * 0.6,
          filter: 'blur(1px)',
          animation: 'microFloat1 12s ease-in-out infinite'
        }}
      />
      
      <div 
        style={{
          position: 'absolute',
          bottom: '30%',
          left: '20%',
          width: '60px',
          height: '60px',
          borderRadius: '50%',
          background: 'radial-gradient(circle, rgba(200, 164, 75, 0.2) 0%, rgba(10, 132, 255, 0.1) 50%, transparent 100%)',
          transform: transforms.micro2,
          opacity: 0.4 + scrollProgress * 0.6,
          filter: 'blur(1px)',
          animation: 'microFloat2 15s ease-in-out infinite'
        }}
      />
      
      <div 
        style={{
          position: 'absolute',
          top: '70%',
          left: '70%',
          width: '100px',
          height: '100px',
          borderRadius: '50%',
          background: 'radial-gradient(circle, rgba(200, 164, 75, 0.25) 0%, rgba(10, 132, 255, 0.15) 50%, transparent 100%)',
          transform: transforms.micro3,
          opacity: 0.4 + scrollProgress * 0.6,
          filter: 'blur(1px)',
          animation: 'microFloat3 18s ease-in-out infinite'
        }}
      />
    </div>
  );
}

// Utility function
function throttle<T extends (...args: any[]) => any>(
  func: T,
  limit: number
): (...args: Parameters<T>) => void {
  let inThrottle: boolean;
  return function (this: any, ...args: Parameters<T>) {
    if (!inThrottle) {
      func.apply(this, args);
      inThrottle = true;
      setTimeout(() => (inThrottle = false), limit);
    }
  };
}