'use client';

import { useEffect, useRef } from 'react';

// Simplex noise for organic deformation
class SimplexNoise {
  private p: number[] = [];

  constructor() {
    const permutation = [];
    for (let i = 0; i < 256; i++) {
      permutation[i] = Math.floor(Math.random() * 256);
    }
    this.p = permutation.concat(permutation);
  }

  fade(t: number): number {
    return t * t * t * (t * (t * 6 - 15) + 10);
  }

  lerp(t: number, a: number, b: number): number {
    return a + t * (b - a);
  }

  grad(hash: number, x: number, y: number): number {
    const h = hash & 15;
    const u = h < 8 ? x : y;
    const v = h < 8 ? y : x;
    return ((h & 1) === 0 ? u : -u) + ((h & 2) === 0 ? v : -v);
  }

  noise(xin: number, yin: number): number {
    let n0, n1, n2;
    const F2 = 0.5 * (Math.sqrt(3.0) - 1.0);
    const s = (xin + yin) * F2;
    const i = Math.floor(xin + s);
    const j = Math.floor(yin + s);
    const G2 = (3.0 - Math.sqrt(3.0)) / 6.0;
    const t = (i + j) * G2;
    const X0 = i - t;
    const Y0 = j - t;
    const x0 = xin - X0;
    const y0 = yin - Y0;
    let i1, j1;
    if (x0 > y0) {
      i1 = 1;
      j1 = 0;
    } else {
      i1 = 0;
      j1 = 1;
    }
    const x1 = x0 - i1 + G2;
    const y1 = y0 - j1 + G2;
    const x2 = x0 - 1.0 + 2.0 * G2;
    const y2 = y0 - 1.0 + 2.0 * G2;
    const ii = i & 255;
    const jj = j & 255;
    const gi0 = this.p[ii + this.p[jj]] % 16;
    const gi1 = this.p[ii + i1 + this.p[jj + j1]] % 16;
    const gi2 = this.p[ii + 1 + this.p[jj + 1]] % 16;
    let t0 = 0.5 - x0 * x0 - y0 * y0;
    if (t0 < 0) n0 = 0.0;
    else {
      t0 *= t0;
      n0 = t0 * t0 * this.grad(gi0, x0, y0);
    }
    let t1 = 0.5 - x1 * x1 - y1 * y1;
    if (t1 < 0) n1 = 0.0;
    else {
      t1 *= t1;
      n1 = t1 * t1 * this.grad(gi1, x1, y1);
    }
    let t2 = 0.5 - x2 * x2 - y2 * y2;
    if (t2 < 0) n2 = 0.0;
    else {
      t2 *= t2;
      n2 = t2 * t2 * this.grad(gi2, x2, y2);
    }
    return 70.0 * (n0 + n1 + n2);
  }
}

export function PremiumWaveBg() {
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const noiseRef = useRef<SimplexNoise>(new SimplexNoise());
  const timeRef = useRef<number>(0);
  const animationRef = useRef<number>();

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;

    const ctx = canvas.getContext('2d');
    if (!ctx) return;

    // Check for prefers-reduced-motion
    const prefersReducedMotion = window.matchMedia('(prefers-reduced-motion: reduce)').matches;

    // Set canvas size
    const dpr = window.devicePixelRatio || 1;
    canvas.width = window.innerWidth * dpr;
    canvas.height = window.innerHeight * dpr;
    canvas.style.width = window.innerWidth + 'px';
    canvas.style.height = window.innerHeight + 'px';
    ctx.scale(dpr, dpr);

    const width = window.innerWidth;
    const height = window.innerHeight;
    const noise = noiseRef.current;

    const animate = () => {
      // Clear with dark background
      ctx.fillStyle = '#0B0B0F';
      ctx.fillRect(0, 0, width, height);

      // Time progression (25 seconds per cycle)
      const time = prefersReducedMotion ? 0 : (timeRef.current * 0.001) / 1.25;

      // Define 11 ultra-thin wave lines
      const waves = [
        { amp: 45, freq: 0.8, speed: 0.3, yOffset: height * 0.28, thickness: 1.2, opacity: 0.08, color: '#7C3AED' },
        { amp: 55, freq: 1.1, speed: 0.5, yOffset: height * 0.32, thickness: 1.5, opacity: 0.12, color: '#8B5CF6' },
        { amp: 40, freq: 0.9, speed: 0.35, yOffset: height * 0.36, thickness: 1.0, opacity: 0.06, color: '#5B21B6' },
        { amp: 50, freq: 1.3, speed: 0.65, yOffset: height * 0.40, thickness: 1.3, opacity: 0.14, color: '#7C3AED' },
        { amp: 48, freq: 1.0, speed: 0.4, yOffset: height * 0.44, thickness: 1.1, opacity: 0.1, color: '#A855F7' },
        { amp: 58, freq: 1.5, speed: 0.75, yOffset: height * 0.48, thickness: 1.4, opacity: 0.16, color: '#8B5CF6' },
        { amp: 42, freq: 0.85, speed: 0.32, yOffset: height * 0.52, thickness: 1.2, opacity: 0.07, color: '#7C3AED' },
        { amp: 52, freq: 1.2, speed: 0.55, yOffset: height * 0.56, thickness: 1.3, opacity: 0.13, color: '#5B21B6' },
        { amp: 46, freq: 1.05, speed: 0.45, yOffset: height * 0.60, thickness: 1.0, opacity: 0.09, color: '#A855F7' },
        { amp: 54, freq: 1.4, speed: 0.7, yOffset: height * 0.64, thickness: 1.5, opacity: 0.15, color: '#8B5CF6' },
        { amp: 44, freq: 0.95, speed: 0.38, yOffset: height * 0.68, thickness: 1.1, opacity: 0.08, color: '#7C3AED' },
      ];

      waves.forEach((wave) => {
        // Calculate phase
        const phase = time * wave.speed * Math.PI * 2;

        // Draw wave line with Bézier curves
        ctx.beginPath();
        let isFirstPoint = true;

        for (let x = 0; x <= width; x += 4) {
          // Perlin noise for organic deformation
          const noiseX = (x / width) * 0.005;
          const noiseY = 0.001;
          const deformation = noise.noise(
            noiseX + time * 0.8,
            noiseY + time * 0.5
          );

          // Combined sine waves for smooth morphing
          const baseWave = Math.sin((x / width) * wave.freq * Math.PI * 2 + phase);
          const modulation = Math.sin((x / width) * (wave.freq * 0.5) * Math.PI * 2 + phase * 0.7) * 0.5;
          const y = wave.yOffset + (baseWave + modulation) * wave.amp + deformation * 20;

          if (isFirstPoint) {
            ctx.moveTo(x, y);
            isFirstPoint = false;
          } else {
            ctx.lineTo(x, y);
          }
        }

        // Draw glow layer (thick, low opacity)
        ctx.strokeStyle = wave.color;
        ctx.lineWidth = wave.thickness + 3;
        ctx.globalAlpha = wave.opacity * 0.3;
        ctx.lineCap = 'round';
        ctx.lineJoin = 'round';
        ctx.stroke();

        // Draw main line
        ctx.beginPath();
        isFirstPoint = true;
        for (let x = 0; x <= width; x += 4) {
          const noiseX = (x / width) * 0.005;
          const noiseY = 0.001;
          const deformation = noise.noise(
            noiseX + time * 0.8,
            noiseY + time * 0.5
          );

          const baseWave = Math.sin((x / width) * wave.freq * Math.PI * 2 + phase);
          const modulation = Math.sin((x / width) * (wave.freq * 0.5) * Math.PI * 2 + phase * 0.7) * 0.5;
          const y = wave.yOffset + (baseWave + modulation) * wave.amp + deformation * 20;

          if (isFirstPoint) {
            ctx.moveTo(x, y);
            isFirstPoint = false;
          } else {
            ctx.lineTo(x, y);
          }
        }

        ctx.strokeStyle = wave.color;
        ctx.lineWidth = wave.thickness;
        ctx.globalAlpha = wave.opacity;
        ctx.lineCap = 'round';
        ctx.lineJoin = 'round';
        ctx.stroke();
      });

      ctx.globalAlpha = 1;

      if (!prefersReducedMotion) {
        timeRef.current += 16.67; // ~60fps
      }
      animationRef.current = requestAnimationFrame(animate);
    };

    animate();

    // Handle resize
    const handleResize = () => {
      const newDpr = window.devicePixelRatio || 1;
      canvas.width = window.innerWidth * newDpr;
      canvas.height = window.innerHeight * newDpr;
      canvas.style.width = window.innerWidth + 'px';
      canvas.style.height = window.innerHeight + 'px';
      ctx.scale(newDpr, newDpr);
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
    <canvas
      ref={canvasRef}
      className="fixed inset-0 pointer-events-none"
      style={{
        zIndex: 0,
      }}
      aria-label="Premium flowing wave lines background"
      role="presentation"
    />
  );
}
