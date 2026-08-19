import { useEffect, useState, useRef } from 'react';

// Custom hook for scroll-based animations
export function useScrollAnimation() {
  const [scrollY, setScrollY] = useState(0);
  const [scrollProgress, setScrollProgress] = useState(0);
  const [isVisible, setIsVisible] = useState({});

  useEffect(() => {
    const handleScroll = () => {
      const currentScrollY = window.scrollY;
      const maxScroll = document.documentElement.scrollHeight - window.innerHeight;
      const progress = currentScrollY / maxScroll;
      
      setScrollY(currentScrollY);
      setScrollProgress(progress);
    };

    const throttledScroll = throttle(handleScroll, 16); // 60fps
    window.addEventListener('scroll', throttledScroll, { passive: true });
    
    return () => window.removeEventListener('scroll', throttledScroll);
  }, []);

  return { scrollY, scrollProgress };
}

// Enhanced Intersection Observer Hook
export function useIntersectionObserver(options = {}) {
  const [elements, setElements] = useState(new Map());
  const observer = useRef<IntersectionObserver>();

  useEffect(() => {
    observer.current = new IntersectionObserver((entries) => {
      entries.forEach((entry) => {
        setElements(prev => new Map(prev).set(entry.target, {
          isVisible: entry.isIntersecting,
          intersectionRatio: entry.intersectionRatio,
          boundingClientRect: entry.boundingClientRect
        }));
      });
    }, {
      threshold: [0, 0.25, 0.5, 0.75, 1],
      rootMargin: '-10% 0px -10% 0px',
      ...options
    });

    return () => observer.current?.disconnect();
  }, []);

  const observe = (element: Element) => {
    if (element && observer.current) {
      observer.current.observe(element);
    }
  };

  const unobserve = (element: Element) => {
    if (element && observer.current) {
      observer.current.unobserve(element);
    }
  };

  return { elements, observe, unobserve };
}

// Parallax Container Component
export function ParallaxContainer({ 
  children, 
  speed = 0.5, 
  direction = 'vertical',
  className = '' 
}: {
  children: React.ReactNode;
  speed?: number;
  direction?: 'vertical' | 'horizontal';
  className?: string;
}) {
  const { scrollY } = useScrollAnimation();
  const elementRef = useRef<HTMLDivElement>(null);
  const [elementTop, setElementTop] = useState(0);

  useEffect(() => {
    if (elementRef.current) {
      setElementTop(elementRef.current.offsetTop);
    }
  }, []);

  const yPos = -(scrollY - elementTop) * speed;
  const xPos = direction === 'horizontal' ? -(scrollY - elementTop) * speed : 0;

  return (
    <div
      ref={elementRef}
      className={className}
      style={{
        transform: `translate3d(${xPos}px, ${yPos}px, 0)`,
        willChange: 'transform'
      }}
    >
      {children}
    </div>
  );
}

// Scroll-triggered Card Animation Component
export function AnimatedCard({ 
  children, 
  delay = 0, 
  direction = 'up',
  className = '',
  ...props 
}: {
  children: React.ReactNode;
  delay?: number;
  direction?: 'up' | 'down' | 'left' | 'right' | 'scale' | 'rotate';
  className?: string;
  [key: string]: any;
}) {
  const elementRef = useRef<HTMLDivElement>(null);
  const { elements, observe } = useIntersectionObserver();
  const [hasAnimated, setHasAnimated] = useState(false);

  useEffect(() => {
    if (elementRef.current) {
      observe(elementRef.current);
    }
  }, [observe]);

  const elementData = elements.get(elementRef.current!);
  const isVisible = elementData?.isVisible;

  useEffect(() => {
    if (isVisible && !hasAnimated) {
      setTimeout(() => setHasAnimated(true), delay);
    }
  }, [isVisible, hasAnimated, delay]);

  const getTransform = () => {
    if (hasAnimated) return 'translate3d(0, 0, 0) scale(1) rotate(0deg)';
    
    switch (direction) {
      case 'up': return 'translate3d(0, 60px, 0) scale(0.95)';
      case 'down': return 'translate3d(0, -60px, 0) scale(0.95)';
      case 'left': return 'translate3d(60px, 0, 0) scale(0.95)';
      case 'right': return 'translate3d(-60px, 0, 0) scale(0.95)';
      case 'scale': return 'translate3d(0, 0, 0) scale(0.8)';
      case 'rotate': return 'translate3d(0, 20px, 0) scale(0.9) rotate(5deg)';
      default: return 'translate3d(0, 60px, 0) scale(0.95)';
    }
  };

  return (
    <div
      ref={elementRef}
      className={className}
      style={{
        opacity: hasAnimated ? 1 : 0,
        transform: getTransform(),
        transition: 'all 0.8s cubic-bezier(0.4, 0, 0.2, 1)',
        willChange: 'transform, opacity'
      }}
      {...props}
    >
      {children}
    </div>
  );
}

// Staggered Grid Animation
export function StaggeredGrid({ 
  children, 
  staggerDelay = 100,
  className = '' 
}: {
  children: React.ReactNode[];
  staggerDelay?: number;
  className?: string;
}) {
  return (
    <div className={className}>
      {Array.isArray(children) && children.map((child, index) => (
        <AnimatedCard 
          key={index}
          delay={index * staggerDelay}
          direction="up"
        >
          {child}
        </AnimatedCard>
      ))}
    </div>
  );
}

// Floating Action Animation
export function FloatingElement({ 
  children, 
  intensity = 1,
  duration = 3000,
  className = '' 
}: {
  children: React.ReactNode;
  intensity?: number;
  duration?: number;
  className?: string;
}) {
  const [offset, setOffset] = useState({ x: 0, y: 0 });

  useEffect(() => {
    let animationId: number;
    let startTime: number;

    const animate = (timestamp: number) => {
      if (!startTime) startTime = timestamp;
      const progress = (timestamp - startTime) / duration;

      setOffset({
        x: Math.sin(progress * Math.PI * 2) * intensity * 10,
        y: Math.cos(progress * Math.PI * 2) * intensity * 5
      });

      if (progress < 1) {
        animationId = requestAnimationFrame(animate);
      } else {
        startTime = timestamp;
        animationId = requestAnimationFrame(animate);
      }
    };

    animationId = requestAnimationFrame(animate);
    return () => cancelAnimationFrame(animationId);
  }, [intensity, duration]);

  return (
    <div
      className={className}
      style={{
        transform: `translate3d(${offset.x}px, ${offset.y}px, 0)`,
        willChange: 'transform'
      }}
    >
      {children}
    </div>
  );
}

// Mouse Parallax Effect
export function MouseParallaxContainer({ 
  children, 
  strength = 0.1,
  className = '' 
}: {
  children: React.ReactNode;
  strength?: number;
  className?: string;
}) {
  const [mousePosition, setMousePosition] = useState({ x: 0, y: 0 });
  const containerRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const handleMouseMove = (e: MouseEvent) => {
      if (containerRef.current) {
        const rect = containerRef.current.getBoundingClientRect();
        const centerX = rect.left + rect.width / 2;
        const centerY = rect.top + rect.height / 2;
        
        setMousePosition({
          x: (e.clientX - centerX) * strength,
          y: (e.clientY - centerY) * strength
        });
      }
    };

    const throttledMouseMove = throttle(handleMouseMove, 16);
    window.addEventListener('mousemove', throttledMouseMove);
    
    return () => window.removeEventListener('mousemove', throttledMouseMove);
  }, [strength]);

  return (
    <div
      ref={containerRef}
      className={className}
      style={{
        transform: `translate3d(${mousePosition.x}px, ${mousePosition.y}px, 0)`,
        transition: 'transform 0.1s ease-out',
        willChange: 'transform'
      }}
    >
      {children}
    </div>
  );
}

// Utility Functions
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

// Scroll Progress Indicator
export function ScrollProgressIndicator() {
  const { scrollProgress } = useScrollAnimation();

  return (
    <div 
      className="scroll-progress"
      style={{ 
        transform: `scaleX(${scrollProgress})`,
        transformOrigin: 'left'
      }}
    />
  );
}

// Advanced Scroll Trigger Hook
export function useScrollTrigger(threshold = 0.1) {
  const [isTriggered, setIsTriggered] = useState(false);
  const { scrollProgress } = useScrollAnimation();

  useEffect(() => {
    setIsTriggered(scrollProgress > threshold);
  }, [scrollProgress, threshold]);

  return isTriggered;
}