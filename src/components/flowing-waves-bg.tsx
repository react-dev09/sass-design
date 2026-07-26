'use client';

import { useEffect, useRef } from 'react';

export function FlowingWavesBg() {
  const svgRef = useRef<SVGSVGElement>(null);
  const timeRef = useRef<number>(0);
  const animationRef = useRef<number>();

  useEffect(() => {
    const svg = svgRef.current;
    if (!svg) return;

    // Check for prefers-reduced-motion
    const prefersReducedMotion = window.matchMedia('(prefers-reduced-motion: reduce)').matches;

    // Set SVG dimensions
    const updateDimensions = () => {
      svg.setAttribute('viewBox', `0 0 ${window.innerWidth} ${window.innerHeight}`);
      svg.setAttribute('width', String(window.innerWidth));
      svg.setAttribute('height', String(window.innerHeight));
    };
    updateDimensions();

    // Create wave path generator using sine waves with varying frequencies
    const generateWavePath = (
      amplitude: number,
      frequency: number,
      phase: number,
      yOffset: number,
      timeOffset: number = 0
    ): string => {
      const points: string[] = [];
      const width = window.innerWidth;
      const height = window.innerHeight;
      const step = width / 200; // Resolution

      for (let x = 0; x <= width; x += step) {
        // Multiple sine waves for complex organic motion
        const wave1 = Math.sin((x / width) * frequency * Math.PI + phase) * amplitude;
        const wave2 = Math.sin((x / width) * (frequency * 0.7) * Math.PI + phase * 0.8) * (amplitude * 0.6);
        const wave3 = Math.sin((x / width) * (frequency * 1.3) * Math.PI + phase * 1.2) * (amplitude * 0.4);

        const y = yOffset + wave1 + wave2 + wave3;
        points.push(`${x},${y}`);
      }

      // Complete the path to create a filled area
      points.push(`${width},${height}`);
      points.push(`0,${height}`);

      return `M ${points.join(' L ')}`;
    };

    const animate = () => {
      if (!svg) return;

      // Time progression
      const time = prefersReducedMotion ? 0 : timeRef.current * 0.001; // Convert to seconds

      // Define 4 waves with different speeds and characteristics
      const waves = [
        {
          amplitude: 60,
          frequency: 2,
          speed: 0.8,
          color: 'rgba(146, 80, 230, 0.15)', // #9250e6 with 15% opacity
          yOffset: window.innerHeight * 0.4,
        },
        {
          amplitude: 50,
          frequency: 2.5,
          speed: 1.2,
          color: 'rgba(146, 80, 230, 0.12)',
          yOffset: window.innerHeight * 0.45,
        },
        {
          amplitude: 70,
          frequency: 1.8,
          speed: 0.6,
          color: 'rgba(146, 80, 230, 0.1)',
          yOffset: window.innerHeight * 0.5,
        },
        {
          amplitude: 55,
          frequency: 2.2,
          speed: 1.0,
          color: 'rgba(146, 80, 230, 0.08)',
          yOffset: window.innerHeight * 0.55,
        },
      ];

      // Update or create wave paths
      waves.forEach((wave, index) => {
        let path = svg.getElementById(`wave-${index}`) as SVGPathElement;

        if (!path) {
          path = document.createElementNS('http://www.w3.org/2000/svg', 'path');
          path.setAttribute('id', `wave-${index}`);
          path.setAttribute('fill', wave.color);
          path.setAttribute('opacity', '1');
          svg.appendChild(path);
        }

        // Calculate phase based on time and wave speed
        const phase = time * wave.speed * Math.PI * 2;

        // Generate and update path
        const pathData = generateWavePath(
          wave.amplitude,
          wave.frequency,
          phase,
          wave.yOffset
        );
        path.setAttribute('d', pathData);
      });

      if (!prefersReducedMotion) {
        timeRef.current += 16.67; // ~60fps
      }
      animationRef.current = requestAnimationFrame(animate);
    };

    animate();

    // Handle window resize
    const handleResize = () => {
      updateDimensions();
    };

    window.addEventListener('resize', handleResize);

    return () => {
      window.removeEventListener('resize', handleResize);
      if (animationRef.current) {
        cancelAnimationFrame(animationRef.current);
      }
    };
  }, []);

  return (
    <svg
      ref={svgRef}
      className="fixed inset-0 pointer-events-none"
      style={{
        filter: 'blur(40px)',
        zIndex: 0,
      }}
      aria-label="Flowing wave background animation"
      role="presentation"
    />
  );
}
