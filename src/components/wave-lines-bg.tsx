'use client';

import { useEffect, useRef } from 'react';

export function WaveLinesBg() {
  const svgRef = useRef<SVGSVGElement>(null);
  const timeRef = useRef<number>(0);
  const animationRef = useRef<number | null>(null);

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

    // Create thin wave line path using sine wave
    const generateWaveLine = (
      amplitude: number,
      frequency: number,
      phase: number,
      yOffset: number
    ): string => {
      const points: [number, number][] = [];
      const width = window.innerWidth;
      const step = Math.max(1, width / 300); // Higher resolution for smooth lines

      for (let x = 0; x <= width; x += step) {
        // Single smooth sine wave for clean contour lines
        const y = yOffset + Math.sin((x / width) * frequency * Math.PI * 2 + phase) * amplitude;
        points.push([x, y]);
      }

      // Create path string
      return `M ${points.map(p => `${p[0]},${p[1]}`).join(' L ')}`;
    };

    const animate = () => {
      if (!svg) return;

      // Time progression - very slow (30 seconds per cycle)
      const time = prefersReducedMotion ? 0 : (timeRef.current * 0.001) / 1.5;

      // Define 7 thin wave lines with varying characteristics
      const waves = [
        {
          amplitude: 35,
          frequency: 1.2,
          speed: 0.4,
          yOffset: window.innerHeight * 0.35,
          opacity: 0.08,
          strokeWidth: 1.5,
        },
        {
          amplitude: 45,
          frequency: 1.5,
          speed: 0.6,
          yOffset: window.innerHeight * 0.38,
          opacity: 0.1,
          strokeWidth: 1.2,
        },
        {
          amplitude: 40,
          frequency: 1.1,
          speed: 0.35,
          yOffset: window.innerHeight * 0.41,
          opacity: 0.07,
          strokeWidth: 1,
        },
        {
          amplitude: 50,
          frequency: 1.8,
          speed: 0.8,
          yOffset: window.innerHeight * 0.44,
          opacity: 0.12,
          strokeWidth: 1.3,
        },
        {
          amplitude: 38,
          frequency: 1.3,
          speed: 0.45,
          yOffset: window.innerHeight * 0.47,
          opacity: 0.09,
          strokeWidth: 1.1,
        },
        {
          amplitude: 42,
          frequency: 1.6,
          speed: 0.7,
          yOffset: window.innerHeight * 0.5,
          opacity: 0.11,
          strokeWidth: 1.4,
        },
        {
          amplitude: 36,
          frequency: 1.4,
          speed: 0.5,
          yOffset: window.innerHeight * 0.53,
          opacity: 0.06,
          strokeWidth: 1,
        },
      ];

      // Update or create wave lines
      waves.forEach((wave, index) => {
        let path = svg.getElementById(`wave-line-${index}`) as SVGPathElement;

        if (!path) {
          path = document.createElementNS('http://www.w3.org/2000/svg', 'path');
          path.setAttribute('id', `wave-line-${index}`);
          path.setAttribute('fill', 'none');
          path.setAttribute('stroke', '#9250e6'); // Purple color
          path.setAttribute('stroke-linecap', 'round');
          path.setAttribute('stroke-linejoin', 'round');
          svg.appendChild(path);
        }

        // Calculate phase based on time and wave speed
        const phase = time * wave.speed * Math.PI * 2;

        // Generate and update path
        const pathData = generateWaveLine(
          wave.amplitude,
          wave.frequency,
          phase,
          wave.yOffset
        );

        path.setAttribute('d', pathData);
        path.setAttribute('stroke-width', String(wave.strokeWidth));
        path.setAttribute('opacity', String(wave.opacity));
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
        filter: 'drop-shadow(0 0 4px rgba(146, 80, 230, 0.1))',
        zIndex: 0,
        background: 'transparent',
      }}
      aria-label="Flowing wave lines background animation"
      role="presentation"
    />
  );
}
