import React, { useEffect, useRef } from 'react';

// Living Orb Background Component - Fixed Fragment Issue
export const LivingOrbBackground: React.FC<React.HTMLAttributes<HTMLDivElement>> = (props) => {
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const sceneRef = useRef<{
    animationId?: number;
    running?: boolean;
    cleanup?: () => void;
  }>({});

  useEffect(() => {
    // Performance check for low-end devices
    const checkDeviceCapability = () => {
      const nav = navigator as any;
      const isLowMemory = nav.deviceMemory && nav.deviceMemory <= 2;
      const isLowEnd = /Android.*Chrome/.test(navigator.userAgent) && window.innerWidth < 768;
      
      return !isLowMemory && !isLowEnd;
    };

    if (!checkDeviceCapability()) {
      // Hide canvas for low-end devices
      if (canvasRef.current) {
        canvasRef.current.style.display = 'none';
      }
      return () => {}; // Return empty cleanup function
    }

    if (!canvasRef.current) return () => {}; // Return empty cleanup function

    const canvas = canvasRef.current;
    const ctx = canvas.getContext('2d');
    
    if (!ctx) {
      console.warn('Canvas 2D context not available');
      return () => {}; // Return empty cleanup function
    }

    // Set canvas size
    const updateCanvasSize = () => {
      canvas.width = window.innerWidth;
      canvas.height = window.innerHeight;
    };
    updateCanvasSize();

    const prefersReduced = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
    
    // Animation state
    let time = 0;
    let lastTime = performance.now();
    let running = true;

    // Orb properties - Increased total radius
    const centerX = canvas.width / 2;
    const centerY = canvas.height / 2;
    const baseRadius = Math.min(canvas.width, canvas.height) * 0.28; // Increased from 0.18 to 0.28

    // Enhanced cosmic particle system with multiple types
    const particles: Array<{ 
      x: number; 
      y: number; 
      originalX: number;
      originalY: number;
      opacity: number; 
      twinkle: number;
      size: number;
      velocity: { x: number; y: number };
      life: number;
      maxLife: number;
      type: 'star' | 'energy' | 'ember' | 'cosmic' | 'nebula' | 'dust' | 'distant';
      depth: number;
      scrollOffset: { x: number; y: number };
    }> = [];
    
    const starCount = Math.min(150, Math.floor((canvas.width * canvas.height) / 10000));
    const energyCount = Math.min(60, Math.floor((canvas.width * canvas.height) / 18000));
    const cosmicCount = Math.min(300, Math.floor((canvas.width * canvas.height) / 6000)); // Cosmic dust
    const nebulaCount = Math.min(100, Math.floor((canvas.width * canvas.height) / 12000)); // Nebula particles
    const dustCount = Math.min(500, Math.floor((canvas.width * canvas.height) / 4000)); // Fine dust
    const distantCount = Math.min(80, Math.floor((canvas.width * canvas.height) / 20000)); // Distant stars
    
    // Create star particles - Bright twinkling stars
    for (let i = 0; i < starCount; i++) {
      const x = Math.random() * canvas.width;
      const y = Math.random() * canvas.height;
      particles.push({
        x,
        y,
        originalX: x,
        originalY: y,
        opacity: Math.random() * 0.6 + 0.3,
        twinkle: Math.random() * Math.PI * 2,
        size: Math.random() * 0.4 + 0.1,
        velocity: { x: 0, y: 0 },
        life: 1,
        maxLife: 1,
        type: 'star',
        depth: Math.random() * 0.5 + 0.5, // 0.5 to 1.0 depth
        scrollOffset: { x: Math.random() * 30 - 15, y: Math.random() * 50 - 25 }
      });
    }
    
    // Create energy particles around orb
    for (let i = 0; i < energyCount; i++) {
      const angle = Math.random() * Math.PI * 2;
      const distance = baseRadius * (0.8 + Math.random() * 1.2);
      const x = centerX + Math.cos(angle) * distance;
      const y = centerY + Math.sin(angle) * distance;
      particles.push({
        x,
        y,
        originalX: x,
        originalY: y,
        opacity: Math.random() * 0.8 + 0.2,
        twinkle: Math.random() * Math.PI * 2,
        size: Math.random() * 0.6 + 0.2,
        velocity: { 
          x: (Math.random() - 0.5) * 0.3, 
          y: (Math.random() - 0.5) * 0.3 
        },
        life: Math.random(),
        maxLife: 3 + Math.random() * 2,
        type: Math.random() > 0.5 ? 'energy' : 'ember',
        depth: 1.0,
        scrollOffset: { x: 0, y: 0 }
      });
    }
    
    // Create cosmic dust particles - Small, numerous
    for (let i = 0; i < cosmicCount; i++) {
      const x = Math.random() * canvas.width;
      const y = Math.random() * canvas.height;
      particles.push({
        x,
        y,
        originalX: x,
        originalY: y,
        opacity: Math.random() * 0.3 + 0.1,
        twinkle: Math.random() * Math.PI * 2,
        size: Math.random() * 0.2 + 0.05,
        velocity: { 
          x: (Math.random() - 0.5) * 0.1, 
          y: (Math.random() - 0.5) * 0.1 
        },
        life: Math.random(),
        maxLife: 5 + Math.random() * 3,
        type: 'cosmic',
        depth: Math.random() * 0.3 + 0.1, // 0.1 to 0.4 depth (background)
        scrollOffset: { x: Math.random() * 80 - 40, y: Math.random() * 120 - 60 }
      });
    }
    
    // Create nebula particles - Medium-sized, colorful
    for (let i = 0; i < nebulaCount; i++) {
      const x = Math.random() * canvas.width;
      const y = Math.random() * canvas.height;
      particles.push({
        x,
        y,
        originalX: x,
        originalY: y,
        opacity: Math.random() * 0.4 + 0.2,
        twinkle: Math.random() * Math.PI * 2,
        size: Math.random() * 1.0 + 0.3,
        velocity: { 
          x: (Math.random() - 0.5) * 0.2, 
          y: (Math.random() - 0.5) * 0.2 
        },
        life: Math.random(),
        maxLife: 4 + Math.random() * 2,
        type: 'nebula',
        depth: Math.random() * 0.4 + 0.2, // 0.2 to 0.6 depth (mid-ground)
        scrollOffset: { x: Math.random() * 50 - 25, y: Math.random() * 80 - 40 }
      });
    }
    
    // Create fine dust particles - Tiny, atmospheric
    for (let i = 0; i < dustCount; i++) {
      const x = Math.random() * canvas.width;
      const y = Math.random() * canvas.height;
      particles.push({
        x,
        y,
        originalX: x,
        originalY: y,
        opacity: Math.random() * 0.2 + 0.05,
        twinkle: Math.random() * Math.PI * 2,
        size: Math.random() * 0.1 + 0.02,
        velocity: { 
          x: (Math.random() - 0.5) * 0.05, 
          y: (Math.random() - 0.5) * 0.05 
        },
        life: Math.random(),
        maxLife: 8 + Math.random() * 4,
        type: 'dust',
        depth: Math.random() * 0.2 + 0.05, // 0.05 to 0.25 depth (far background)
        scrollOffset: { x: Math.random() * 100 - 50, y: Math.random() * 150 - 75 }
      });
    }
    
    // Create distant stars - Very faint, large parallax
    for (let i = 0; i < distantCount; i++) {
      const x = Math.random() * canvas.width;
      const y = Math.random() * canvas.height;
      particles.push({
        x,
        y,
        originalX: x,
        originalY: y,
        opacity: Math.random() * 0.3 + 0.1,
        twinkle: Math.random() * Math.PI * 2,
        size: Math.random() * 0.6 + 0.2,
        velocity: { x: 0, y: 0 },
        life: 1,
        maxLife: 1,
        type: 'distant',
        depth: Math.random() * 0.15 + 0.02, // 0.02 to 0.17 depth (very far background)
        scrollOffset: { x: Math.random() * 120 - 60, y: Math.random() * 200 - 100 }
      });
    }

    // Main animation loop
    const animate = () => {
      if (!running) return;
      
      const currentTime = performance.now();
      const deltaTime = prefersReduced ? 0.016 : Math.min(0.033, (currentTime - lastTime) * 0.001);
      lastTime = currentTime;
      
      if (!prefersReduced) {
        time += deltaTime;
      }

      // Get scroll progress
      const doc = document.documentElement;
      const maxScroll = (doc.scrollHeight - window.innerHeight) || 1;
      const scrollY = window.scrollY || window.pageYOffset || 0;
      const scrollProgress = Math.max(0, Math.min(1, scrollY / maxScroll));

      // Clear canvas with subtle gradient
      const bgGradient = ctx.createRadialGradient(centerX, centerY, 0, centerX, centerY, Math.max(canvas.width, canvas.height));
      bgGradient.addColorStop(0, 'rgba(15, 8, 5, 1)');
      bgGradient.addColorStop(0.7, 'rgba(10, 10, 10, 1)');
      bgGradient.addColorStop(1, 'rgba(8, 8, 8, 1)');
      ctx.fillStyle = bgGradient;
      ctx.fillRect(0, 0, canvas.width, canvas.height);

      // Update and render particles with cosmic movement
      particles.forEach((particle, index) => {
        // Update particle properties
        particle.twinkle += deltaTime * (1.5 + Math.sin(time + index) * 0.3);
        
        // Apply scroll-based parallax movement for cosmic effect
        const parallaxX = scrollProgress * particle.scrollOffset.x * particle.depth;
        const parallaxY = scrollProgress * particle.scrollOffset.y * particle.depth;
        
        if (particle.type === 'energy' || particle.type === 'ember') {
          // Update energy and ember particles (orb particles)
          particle.life += deltaTime;
          
          // Move particles
          particle.x += particle.velocity.x * deltaTime * 60;
          particle.y += particle.velocity.y * deltaTime * 60;
          
          // Apply orbital motion around center
          if (!prefersReduced) {
            const dx = particle.x - centerX;
            const dy = particle.y - centerY;
            const distance = Math.sqrt(dx * dx + dy * dy);
            const orbitalSpeed = 0.2 / Math.max(distance / baseRadius, 0.5);
            
            const angle = Math.atan2(dy, dx) + orbitalSpeed * deltaTime;
            const newDistance = distance + Math.sin(time * 2 + index) * 0.5;
            
            particle.x = centerX + Math.cos(angle) * newDistance;
            particle.y = centerY + Math.sin(angle) * newDistance;
          }
          
          // Reset particle if it's too old or too far
          if (particle.life > particle.maxLife || 
              Math.sqrt((particle.x - centerX) ** 2 + (particle.y - centerY) ** 2) > baseRadius * 2.5) {
            const angle = Math.random() * Math.PI * 2;
            const distance = baseRadius * (0.6 + Math.random() * 0.8);
            particle.x = centerX + Math.cos(angle) * distance;
            particle.y = centerY + Math.sin(angle) * distance;
            particle.originalX = particle.x;
            particle.originalY = particle.y;
            particle.life = 0;
            particle.velocity.x = (Math.random() - 0.5) * 0.4;
            particle.velocity.y = (Math.random() - 0.5) * 0.4;
          }
        } else if (particle.type === 'star' || particle.type === 'distant') {
          // Stars and distant stars with scroll parallax and slow rotation
          if (!prefersReduced) {
            const rotationSpeed = particle.type === 'star' ? 0.003 : 0.001;
            const angle = time * rotationSpeed;
            const cos = Math.cos(angle);
            const sin = Math.sin(angle);
            const x = particle.originalX - centerX;
            const y = particle.originalY - centerY;
            
            // Apply rotation around center
            const rotatedX = centerX + (x * cos - y * sin);
            const rotatedY = centerY + (x * sin + y * cos);
            
            // Apply parallax offset
            particle.x = rotatedX + parallaxX;
            particle.y = rotatedY + parallaxY;
            
            // Wrap around screen edges
            if (particle.x < -50) particle.x = canvas.width + 50;
            if (particle.x > canvas.width + 50) particle.x = -50;
            if (particle.y < -50) particle.y = canvas.height + 50;
            if (particle.y > canvas.height + 50) particle.y = -50;
          } else {
            // Just apply parallax without rotation for reduced motion
            particle.x = particle.originalX + parallaxX;
            particle.y = particle.originalY + parallaxY;
          }
        } else {
          // Cosmic, nebula, and dust particles with drift and parallax
          particle.life += deltaTime;
          
          // Apply velocity-based movement
          particle.x += particle.velocity.x * deltaTime * 60;
          particle.y += particle.velocity.y * deltaTime * 60;
          
          // Apply parallax offset based on scroll
          const baseX = particle.x + parallaxX;
          const baseY = particle.y + parallaxY;
          
          // Add subtle drift based on particle type
          if (!prefersReduced) {
            if (particle.type === 'cosmic') {
              // Cosmic dust drifts slowly
              particle.x = baseX + Math.sin(time * 0.5 + index) * 2;
              particle.y = baseY + Math.cos(time * 0.3 + index) * 1;
            } else if (particle.type === 'nebula') {
              // Nebula particles have flowing motion
              particle.x = baseX + Math.sin(time * 0.8 + index) * 3;
              particle.y = baseY + Math.cos(time * 0.6 + index) * 2;
            } else if (particle.type === 'dust') {
              // Fine dust has minimal movement
              particle.x = baseX + Math.sin(time * 0.2 + index) * 0.5;
              particle.y = baseY + Math.cos(time * 0.15 + index) * 0.3;
            }
          } else {
            particle.x = baseX;
            particle.y = baseY;
          }
          
          // Reset particle if it goes too far off screen or lives too long
          if (particle.life > particle.maxLife || 
              particle.x < -100 || particle.x > canvas.width + 100 ||
              particle.y < -100 || particle.y > canvas.height + 100) {
            // Respawn particle at a new random location
            particle.originalX = Math.random() * canvas.width;
            particle.originalY = Math.random() * canvas.height;
            particle.x = particle.originalX;
            particle.y = particle.originalY;
            particle.life = 0;
            particle.velocity.x = (Math.random() - 0.5) * (particle.type === 'cosmic' ? 0.1 : particle.type === 'nebula' ? 0.2 : 0.05);
            particle.velocity.y = (Math.random() - 0.5) * (particle.type === 'cosmic' ? 0.1 : particle.type === 'nebula' ? 0.2 : 0.05);
          }
        }
        
        // Render particle based on type with enhanced cosmic effects
        const twinkleOpacity = particle.opacity * (0.6 + 0.4 * Math.sin(particle.twinkle));
        const lifeOpacity = (particle.type === 'star' || particle.type === 'distant') ? 1 : Math.max(0, 1 - particle.life / particle.maxLife);
        const depthOpacity = particle.depth * (0.3 + scrollProgress * 0.7); // Particles become more visible when scrolling
        const finalOpacity = twinkleOpacity * lifeOpacity * depthOpacity;
        
        // Skip rendering if too faint
        if (finalOpacity < 0.01) return;
        
        ctx.save();
        ctx.globalAlpha = finalOpacity;
        
        if (particle.type === 'star') {
          // Render bright twinkling stars
          const starGradient = ctx.createRadialGradient(
            particle.x, particle.y, 0,
            particle.x, particle.y, particle.size * 2
          );
          starGradient.addColorStop(0, `rgba(255, 255, 255, ${finalOpacity})`);
          starGradient.addColorStop(0.6, `rgba(255, 245, 220, ${finalOpacity * 0.7})`);
          starGradient.addColorStop(1, `rgba(200, 180, 140, 0)`);
          
          ctx.fillStyle = starGradient;
          ctx.beginPath();
          ctx.arc(particle.x, particle.y, particle.size * 2, 0, Math.PI * 2);
          ctx.fill();
          
          // Add star cross effect for brighter stars
          if (particle.size > 0.3 && finalOpacity > 0.5) {
            ctx.strokeStyle = `rgba(255, 255, 255, ${finalOpacity * 0.5})`;
            ctx.lineWidth = 0.5;
            ctx.beginPath();
            ctx.moveTo(particle.x - particle.size * 3, particle.y);
            ctx.lineTo(particle.x + particle.size * 3, particle.y);
            ctx.moveTo(particle.x, particle.y - particle.size * 3);
            ctx.lineTo(particle.x, particle.y + particle.size * 3);
            ctx.stroke();
          }
        } else if (particle.type === 'distant') {
          // Render distant stars - very faint
          ctx.fillStyle = `rgba(200, 200, 255, ${finalOpacity * 0.4})`;
          ctx.beginPath();
          ctx.arc(particle.x, particle.y, particle.size * 1.5, 0, Math.PI * 2);
          ctx.fill();
        } else if (particle.type === 'energy') {
          // Render energy particles - intense orange
          const energyGradient = ctx.createRadialGradient(
            particle.x, particle.y, 0,
            particle.x, particle.y, particle.size * 2
          );
          energyGradient.addColorStop(0, `rgba(255, 140, 0, ${finalOpacity})`);
          energyGradient.addColorStop(0.5, `rgba(255, 100, 0, ${finalOpacity * 0.6})`);
          energyGradient.addColorStop(1, `rgba(200, 60, 0, 0)`);
          
          ctx.fillStyle = energyGradient;
          ctx.beginPath();
          ctx.arc(particle.x, particle.y, particle.size * 2, 0, Math.PI * 2);
          ctx.fill();
        } else if (particle.type === 'ember') {
          // Render ember particles - bright orange-red
          const emberGradient = ctx.createRadialGradient(
            particle.x, particle.y, 0,
            particle.x, particle.y, particle.size * 1.5
          );
          emberGradient.addColorStop(0, `rgba(255, 69, 0, ${finalOpacity})`);
          emberGradient.addColorStop(0.7, `rgba(255, 140, 0, ${finalOpacity * 0.4})`);
          emberGradient.addColorStop(1, `rgba(255, 165, 0, 0)`);
          
          ctx.fillStyle = emberGradient;
          ctx.beginPath();
          ctx.arc(particle.x, particle.y, particle.size * 1.5, 0, Math.PI * 2);
          ctx.fill();
        } else if (particle.type === 'cosmic') {
          // Render cosmic dust - small orange-gold particles
          const cosmicGradient = ctx.createRadialGradient(
            particle.x, particle.y, 0,
            particle.x, particle.y, particle.size * 3
          );
          cosmicGradient.addColorStop(0, `rgba(255, 200, 100, ${finalOpacity})`);
          cosmicGradient.addColorStop(0.5, `rgba(200, 150, 80, ${finalOpacity * 0.6})`);
          cosmicGradient.addColorStop(1, `rgba(150, 100, 50, 0)`);
          
          ctx.fillStyle = cosmicGradient;
          ctx.beginPath();
          ctx.arc(particle.x, particle.y, particle.size * 3, 0, Math.PI * 2);
          ctx.fill();
        } else if (particle.type === 'nebula') {
          // Render nebula particles - colorful, flowing
          const nebularHue = (time * 0.1 + index * 0.3) % 1;
          const color1 = nebularHue < 0.5 ? [255, 140, 60] : [100, 150, 255];
          const color2 = nebularHue < 0.5 ? [200, 100, 40] : [60, 100, 200];
          
          const nebulaGradient = ctx.createRadialGradient(
            particle.x, particle.y, 0,
            particle.x, particle.y, particle.size * 2
          );
          nebulaGradient.addColorStop(0, `rgba(${color1[0]}, ${color1[1]}, ${color1[2]}, ${finalOpacity})`);
          nebulaGradient.addColorStop(0.6, `rgba(${color2[0]}, ${color2[1]}, ${color2[2]}, ${finalOpacity * 0.5})`);
          nebulaGradient.addColorStop(1, `rgba(${color2[0]}, ${color2[1]}, ${color2[2]}, 0)`);
          
          ctx.fillStyle = nebulaGradient;
          ctx.beginPath();
          ctx.arc(particle.x, particle.y, particle.size * 2, 0, Math.PI * 2);
          ctx.fill();
        } else if (particle.type === 'dust') {
          // Render fine dust - tiny, barely visible
          ctx.fillStyle = `rgba(150, 130, 100, ${finalOpacity * 0.6})`;
          ctx.beginPath();
          ctx.arc(particle.x, particle.y, particle.size * 2, 0, Math.PI * 2);
          ctx.fill();
        }
        
        ctx.restore();
      });

      // Calculate enhanced orb properties with dynamic movement
      const breath = prefersReduced ? 1.0 : (0.85 + Math.sin(time * 1.8) * 0.15);
      const energyPulse = prefersReduced ? 1.0 : (0.9 + Math.sin(time * 3.2) * 0.1);
      const scale = 1.0 + scrollProgress * 0.8; // Increased scale range
      const radius = baseRadius * scale * breath;
      const intensity = 0.7 + scrollProgress * 0.5; // Increased intensity
      const pulse = prefersReduced ? 1.0 : (0.8 + Math.sin(time * 2.4) * 0.2);

      // Enhanced parallax with dynamic movement
      const offsetX = (scrollProgress - 0.5) * 60 + Math.sin(time * 0.5) * 15;
      const offsetY = (scrollProgress - 0.5) * 40 + Math.cos(time * 0.7) * 10;
      const orbX = centerX + offsetX;
      const orbY = centerY + offsetY;

      // Core energy orb - intense orange core
      const coreGradient = ctx.createRadialGradient(
        orbX, orbY, 0,
        orbX, orbY, radius * 0.3
      );
      
      const coreAlpha = 0.9 * intensity * pulse * energyPulse;
      coreGradient.addColorStop(0, `rgba(255, 200, 0, ${coreAlpha})`); // Bright golden core
      coreGradient.addColorStop(0.4, `rgba(255, 140, 0, ${coreAlpha * 0.8})`); // Orange
      coreGradient.addColorStop(1, `rgba(255, 69, 0, ${coreAlpha * 0.4})`); // Red-orange edge

      ctx.fillStyle = coreGradient;
      ctx.beginPath();
      ctx.arc(orbX, orbY, radius * 0.3, 0, Math.PI * 2);
      ctx.fill();

      // Main orb body - intense orange to deep red
      const mainGradient = ctx.createRadialGradient(
        orbX, orbY, radius * 0.3,
        orbX, orbY, radius
      );
      
      const mainAlpha = 0.6 * intensity * pulse;
      mainGradient.addColorStop(0, `rgba(255, 140, 0, ${mainAlpha * 0.8})`); // Bright orange
      mainGradient.addColorStop(0.3, `rgba(255, 100, 0, ${mainAlpha * 0.7})`); // Deep orange
      mainGradient.addColorStop(0.6, `rgba(255, 69, 0, ${mainAlpha * 0.5})`); // Red-orange
      mainGradient.addColorStop(0.8, `rgba(200, 50, 0, ${mainAlpha * 0.3})`); // Deep red
      mainGradient.addColorStop(1, 'rgba(150, 30, 0, 0)'); // Fade to dark red

      ctx.fillStyle = mainGradient;
      ctx.beginPath();
      ctx.arc(orbX, orbY, radius, 0, Math.PI * 2);
      ctx.fill();

      // Energy aura - outer glow with dynamic scaling
      const auraRadius = radius * (1.6 + Math.sin(time * 2.1) * 0.2);
      const auraGradient = ctx.createRadialGradient(
        orbX, orbY, radius * 0.9,
        orbX, orbY, auraRadius
      );
      
      const auraAlpha = 0.25 * intensity * pulse;
      auraGradient.addColorStop(0, `rgba(255, 140, 0, ${auraAlpha})`);
      auraGradient.addColorStop(0.3, `rgba(255, 100, 0, ${auraAlpha * 0.7})`);
      auraGradient.addColorStop(0.6, `rgba(255, 69, 0, ${auraAlpha * 0.4})`);
      auraGradient.addColorStop(1, 'rgba(200, 30, 0, 0)');

      ctx.fillStyle = auraGradient;
      ctx.beginPath();
      ctx.arc(orbX, orbY, auraRadius, 0, Math.PI * 2);
      ctx.fill();

      // Outer atmospheric glow - very subtle blue edge for depth
      const atmosphereGradient = ctx.createRadialGradient(
        orbX, orbY, auraRadius * 0.8,
        orbX, orbY, auraRadius * 1.4
      );
      
      const atmosphereAlpha = 0.1 * intensity * pulse;
      atmosphereGradient.addColorStop(0, `rgba(255, 69, 0, ${atmosphereAlpha * 0.3})`);
      atmosphereGradient.addColorStop(0.5, `rgba(100, 50, 200, ${atmosphereAlpha * 0.4})`); // Subtle blue
      atmosphereGradient.addColorStop(1, 'rgba(50, 100, 255, 0)');

      ctx.fillStyle = atmosphereGradient;
      ctx.beginPath();
      ctx.arc(orbX, orbY, auraRadius * 1.4, 0, Math.PI * 2);
      ctx.fill();

      // Add dynamic energy satellites for enhanced complexity
      if (!prefersReduced) {
        // Primary energy satellite - fast orbit with smaller glow
        const satellite1Angle = time * 1.2;
        const satellite1Distance = radius * (1.3 + Math.sin(time * 2.5) * 0.3);
        const satellite1X = orbX + Math.cos(satellite1Angle) * satellite1Distance;
        const satellite1Y = orbY + Math.sin(satellite1Angle) * satellite1Distance;
        const satellite1Radius = radius * (0.08 + Math.sin(time * 4) * 0.03); // Reduced from 0.12 to 0.08
        
        const satellite1Gradient = ctx.createRadialGradient(
          satellite1X, satellite1Y, 0,
          satellite1X, satellite1Y, satellite1Radius * 3 // Reduced from 4 to 3
        );
        
        const satellite1Alpha = 0.4 * intensity * energyPulse;
        satellite1Gradient.addColorStop(0, `rgba(255, 200, 0, ${satellite1Alpha})`);
        satellite1Gradient.addColorStop(0.5, `rgba(255, 140, 0, ${satellite1Alpha * 0.6})`);
        satellite1Gradient.addColorStop(1, 'rgba(255, 69, 0, 0)');
        
        ctx.fillStyle = satellite1Gradient;
        ctx.beginPath();
        ctx.arc(satellite1X, satellite1Y, satellite1Radius * 3, 0, Math.PI * 2);
        ctx.fill();

        // Secondary energy satellite - slow counter-orbit with smaller glow
        const satellite2Angle = time * -0.8;
        const satellite2Distance = radius * (1.6 + Math.cos(time * 1.8) * 0.4);
        const satellite2X = orbX + Math.cos(satellite2Angle) * satellite2Distance;
        const satellite2Y = orbY + Math.sin(satellite2Angle) * satellite2Distance;
        const satellite2Radius = radius * (0.05 + Math.cos(time * 3.5) * 0.02); // Reduced from 0.08 to 0.05
        
        const satellite2Gradient = ctx.createRadialGradient(
          satellite2X, satellite2Y, 0,
          satellite2X, satellite2Y, satellite2Radius * 4 // Reduced from 5 to 4
        );
        
        const satellite2Alpha = 0.3 * intensity * pulse;
        satellite2Gradient.addColorStop(0, `rgba(255, 100, 0, ${satellite2Alpha})`);
        satellite2Gradient.addColorStop(0.6, `rgba(200, 50, 0, ${satellite2Alpha * 0.5})`);
        satellite2Gradient.addColorStop(1, 'rgba(100, 25, 0, 0)');
        
        ctx.fillStyle = satellite2Gradient;
        ctx.beginPath();
        ctx.arc(satellite2X, satellite2Y, satellite2Radius * 4, 0, Math.PI * 2);
        ctx.fill();

        // Tertiary micro-satellite - erratic movement with smaller glow
        const satellite3Angle = time * 2.3 + Math.sin(time * 5) * 0.5;
        const satellite3Distance = radius * (0.9 + Math.sin(time * 6) * 0.2);
        const satellite3X = orbX + Math.cos(satellite3Angle) * satellite3Distance;
        const satellite3Y = orbY + Math.sin(satellite3Angle) * satellite3Distance;
        const satellite3Radius = radius * (0.03 + Math.sin(time * 7) * 0.015); // Reduced from 0.05 to 0.03
        
        const satellite3Gradient = ctx.createRadialGradient(
          satellite3X, satellite3Y, 0,
          satellite3X, satellite3Y, satellite3Radius * 2.5 // Reduced from 3 to 2.5
        );
        
        const satellite3Alpha = 0.5 * intensity * (0.8 + Math.sin(time * 8) * 0.2);
        satellite3Gradient.addColorStop(0, `rgba(255, 150, 0, ${satellite3Alpha})`);
        satellite3Gradient.addColorStop(0.7, `rgba(255, 69, 0, ${satellite3Alpha * 0.4})`);
        satellite3Gradient.addColorStop(1, 'rgba(150, 30, 0, 0)');
        
        ctx.fillStyle = satellite3Gradient;
        ctx.beginPath();
        ctx.arc(satellite3X, satellite3Y, satellite3Radius * 2.5, 0, Math.PI * 2);
        ctx.fill();

        // Add energy trails for satellites
        ctx.save();
        ctx.globalAlpha = 0.1 * intensity;
        ctx.strokeStyle = `rgba(255, 140, 0, ${0.3 * intensity})`;
        ctx.lineWidth = 1;
        ctx.setLineDash([2, 4]);
        
        // Trail for satellite 1
        ctx.beginPath();
        ctx.arc(orbX, orbY, satellite1Distance, 0, Math.PI * 2);
        ctx.stroke();
        
        // Trail for satellite 2
        ctx.beginPath();
        ctx.arc(orbX, orbY, satellite2Distance, 0, Math.PI * 2);
        ctx.stroke();
        
        ctx.restore();
      }

      sceneRef.current.animationId = requestAnimationFrame(animate);
    };

    // Store animation control
    sceneRef.current = {
      running: true,
      cleanup: () => {
        running = false;
        if (sceneRef.current.animationId) {
          cancelAnimationFrame(sceneRef.current.animationId);
        }
      }
    };

    // Handle resize
    const handleResize = () => {
      updateCanvasSize();
      // Regenerate particles for new canvas size
      particles.length = 0;
      
      const newStarCount = Math.min(200, Math.floor((canvas.width * canvas.height) / 8000));
      const newEnergyCount = Math.min(80, Math.floor((canvas.width * canvas.height) / 15000));
      
      // Recreate all particle types with new canvas size
      const newCenterX = canvas.width / 2;
      const newCenterY = canvas.height / 2;
      const newBaseRadius = Math.min(canvas.width, canvas.height) * 0.28;
      
      const newCosmicCount = Math.min(300, Math.floor((canvas.width * canvas.height) / 6000));
      const newNebulaCount = Math.min(100, Math.floor((canvas.width * canvas.height) / 12000));
      const newDustCount = Math.min(500, Math.floor((canvas.width * canvas.height) / 4000));
      const newDistantCount = Math.min(80, Math.floor((canvas.width * canvas.height) / 20000));
      
      // Recreate star particles
      for (let i = 0; i < newStarCount; i++) {
        const x = Math.random() * canvas.width;
        const y = Math.random() * canvas.height;
        particles.push({
          x,
          y,
          originalX: x,
          originalY: y,
          opacity: Math.random() * 0.6 + 0.3,
          twinkle: Math.random() * Math.PI * 2,
          size: Math.random() * 0.4 + 0.1,
          velocity: { x: 0, y: 0 },
          life: 1,
          maxLife: 1,
          type: 'star',
          depth: Math.random() * 0.5 + 0.5,
          scrollOffset: { x: Math.random() * 30 - 15, y: Math.random() * 50 - 25 }
        });
      }
      
      // Recreate energy particles
      for (let i = 0; i < newEnergyCount; i++) {
        const angle = Math.random() * Math.PI * 2;
        const distance = newBaseRadius * (0.8 + Math.random() * 1.2);
        const x = newCenterX + Math.cos(angle) * distance;
        const y = newCenterY + Math.sin(angle) * distance;
        particles.push({
          x,
          y,
          originalX: x,
          originalY: y,
          opacity: Math.random() * 0.8 + 0.2,
          twinkle: Math.random() * Math.PI * 2,
          size: Math.random() * 0.6 + 0.2,
          velocity: { 
            x: (Math.random() - 0.5) * 0.3, 
            y: (Math.random() - 0.5) * 0.3 
          },
          life: Math.random(),
          maxLife: 3 + Math.random() * 2,
          type: Math.random() > 0.5 ? 'energy' : 'ember',
          depth: 1.0,
          scrollOffset: { x: 0, y: 0 }
        });
      }
      
      // Recreate cosmic dust
      for (let i = 0; i < newCosmicCount; i++) {
        const x = Math.random() * canvas.width;
        const y = Math.random() * canvas.height;
        particles.push({
          x,
          y,
          originalX: x,
          originalY: y,
          opacity: Math.random() * 0.3 + 0.1,
          twinkle: Math.random() * Math.PI * 2,
          size: Math.random() * 0.2 + 0.05,
          velocity: { 
            x: (Math.random() - 0.5) * 0.1, 
            y: (Math.random() - 0.5) * 0.1 
          },
          life: Math.random(),
          maxLife: 5 + Math.random() * 3,
          type: 'cosmic',
          depth: Math.random() * 0.3 + 0.1,
          scrollOffset: { x: Math.random() * 80 - 40, y: Math.random() * 120 - 60 }
        });
      }
      
      // Recreate nebula particles
      for (let i = 0; i < newNebulaCount; i++) {
        const x = Math.random() * canvas.width;
        const y = Math.random() * canvas.height;
        particles.push({
          x,
          y,
          originalX: x,
          originalY: y,
          opacity: Math.random() * 0.4 + 0.2,
          twinkle: Math.random() * Math.PI * 2,
          size: Math.random() * 1.0 + 0.3,
          velocity: { 
            x: (Math.random() - 0.5) * 0.2, 
            y: (Math.random() - 0.5) * 0.2 
          },
          life: Math.random(),
          maxLife: 4 + Math.random() * 2,
          type: 'nebula',
          depth: Math.random() * 0.4 + 0.2,
          scrollOffset: { x: Math.random() * 50 - 25, y: Math.random() * 80 - 40 }
        });
      }
      
      // Recreate fine dust
      for (let i = 0; i < newDustCount; i++) {
        const x = Math.random() * canvas.width;
        const y = Math.random() * canvas.height;
        particles.push({
          x,
          y,
          originalX: x,
          originalY: y,
          opacity: Math.random() * 0.2 + 0.05,
          twinkle: Math.random() * Math.PI * 2,
          size: Math.random() * 0.1 + 0.02,
          velocity: { 
            x: (Math.random() - 0.5) * 0.05, 
            y: (Math.random() - 0.5) * 0.05 
          },
          life: Math.random(),
          maxLife: 8 + Math.random() * 4,
          type: 'dust',
          depth: Math.random() * 0.2 + 0.05,
          scrollOffset: { x: Math.random() * 100 - 50, y: Math.random() * 150 - 75 }
        });
      }
      
      // Recreate distant stars
      for (let i = 0; i < newDistantCount; i++) {
        const x = Math.random() * canvas.width;
        const y = Math.random() * canvas.height;
        particles.push({
          x,
          y,
          originalX: x,
          originalY: y,
          opacity: Math.random() * 0.3 + 0.1,
          twinkle: Math.random() * Math.PI * 2,
          size: Math.random() * 0.6 + 0.2,
          velocity: { x: 0, y: 0 },
          life: 1,
          maxLife: 1,
          type: 'distant',
          depth: Math.random() * 0.15 + 0.02,
          scrollOffset: { x: Math.random() * 120 - 60, y: Math.random() * 200 - 100 }
        });
      }
    };

    window.addEventListener('resize', handleResize);
    
    // Start animation
    animate();

    // Return cleanup function
    return () => {
      running = false;
      if (sceneRef.current.animationId) {
        cancelAnimationFrame(sceneRef.current.animationId);
      }
      window.removeEventListener('resize', handleResize);
    };
  }, []);

  return (
    <div {...props} style={{ position: 'relative', ...props.style }}>
      <canvas
        ref={canvasRef}
        className="orb-canvas"
        style={{
          position: 'fixed',
          top: 0,
          left: 0,
          width: '100%',
          height: '100%',
          zIndex: -1,
          background: 'linear-gradient(135deg, #0A0A0A 0%, #111111 40%, #0F0F0F 100%)',
          pointerEvents: 'none'
        }}
      />
      <div 
        className="vignette" 
        aria-hidden="true"
        style={{
          position: 'fixed',
          top: 0,
          left: 0,
          right: 0,
          bottom: 0,
          pointerEvents: 'none',
          zIndex: 0,
          background: 'radial-gradient(ellipse at 50% 60%, rgba(0,0,0,0) 0%, rgba(0,0,0,.15) 60%, rgba(0,0,0,.35) 100%)'
        }}
      />
    </div>
  );
};

// Default export for lazy loading compatibility
export default LivingOrbBackground;