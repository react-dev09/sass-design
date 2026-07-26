'use client';

import { useEffect, useRef } from 'react';

// Improved Simplex noise for more organic deformation
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

export function LuxuryWaveBg() {
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const noiseRef = useRef<SimplexNoise>(new SimplexNoise());
  const timeRef = useRef<number>(0);
  const animationRef = useRef<number | null>(null);

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;

    const ctx = canvas.getContext('2d', { alpha: true });
    if (!ctx) return;

    const prefersReducedMotion = window.matchMedia('(prefers-reduced-motion: reduce)').matches;

    const dpr = window.devicePixelRatio || 1;
    canvas.width = window.innerWidth * dpr;
    canvas.height = window.innerHeight * dpr;
    canvas.style.width = window.innerWidth + 'px';
    canvas.style.height = window.innerHeight + 'px';
    ctx.scale(dpr, dpr);

    const width = window.innerWidth;
    const height = window.innerHeight;
    const noise = noiseRef.current;

    // Define 14 refined wave lines with ultra-low opacity
    const waves = [
      { amp: 35, freq: 0.7, speed: 0.25, yOffset: height * 0.26, thickness: 0.8, opacity: 0.03, color1: '#7C3AED', color2: '#8B5CF6' },
      { amp: 48, freq: 1.0, speed: 0.4, yOffset: height * 0.30, thickness: 1.0, opacity: 0.05, color1: '#8B5CF6', color2: '#A855F7' },
      { amp: 40, freq: 0.8, speed: 0.32, yOffset: height * 0.34, thickness: 0.7, opacity: 0.02, color1: '#6D28D9', color2: '#7C3AED' },
      { amp: 52, freq: 1.2, speed: 0.5, yOffset: height * 0.38, thickness: 1.1, opacity: 0.06, color1: '#7C3AED', color2: '#9333EA' },
      { amp: 38, freq: 0.9, speed: 0.35, yOffset: height * 0.42, thickness: 0.9, opacity: 0.04, color1: '#8B5CF6', color2: '#A855F7' },
      { amp: 55, freq: 1.1, speed: 0.45, yOffset: height * 0.46, thickness: 1.0, opacity: 0.07, color1: '#A855F7', color2: '#C084FC' },
      { amp: 42, freq: 0.75, speed: 0.3, yOffset: height * 0.50, thickness: 0.8, opacity: 0.03, color1: '#7C3AED', color2: '#8B5CF6' },
      { amp: 50, freq: 1.15, speed: 0.55, yOffset: height * 0.54, thickness: 1.2, opacity: 0.08, color1: '#6D28D9', color2: '#7C3AED' },
      { amp: 45, freq: 0.95, speed: 0.38, yOffset: height * 0.58, thickness: 0.85, opacity: 0.04, color1: '#8B5CF6', color2: '#A855F7' },
      { amp: 58, freq: 1.25, speed: 0.62, yOffset: height * 0.62, thickness: 1.15, opacity: 0.09, color1: '#A855F7', color2: '#C084FC' },
      { amp: 38, freq: 0.85, speed: 0.33, yOffset: height * 0.66, thickness: 0.75, opacity: 0.03, color1: '#7C3AED', color2: '#9333EA' },
      { amp: 52, freq: 1.05, speed: 0.48, yOffset: height * 0.70, thickness: 0.95, opacity: 0.06, color1: '#8B5CF6', color2: '#A855F7' },
      { amp: 44, freq: 1.0, speed: 0.42, yOffset: height * 0.74, thickness: 1.05, opacity: 0.05, color1: '#6D28D9', color2: '#7C3AED' },
      { amp: 48, freq: 0.9, speed: 0.36, yOffset: height * 0.78, thickness: 0.9, opacity: 0.04, color1: '#A855F7', color2: '#C084FC' },
    ];

    const drawWave = (wave: any, time: number, glowLayer: number) => {
      const phase = time * wave.speed * Math.PI * 2;

      ctx.beginPath();
      let isFirstPoint = true;
      const points: [number, number][] = [];

      for (let x = 0; x <= width; x += 3) {
        const noiseX = (x / width) * 0.004;
        const deformation = noise.noise(
          noiseX + time * 0.5,
          time * 0.3
        );

        const wave1 = Math.sin((x / width) * wave.freq * Math.PI * 2 + phase);
        const wave2 = Math.sin((x / width) * (wave.freq * 0.6) * Math.PI * 2 + phase * 0.8) * 0.4;
        const y = wave.yOffset + (wave1 + wave2) * wave.amp + deformation * 15;

        points.push([x, y]);

        if (isFirstPoint) {
          ctx.moveTo(x, y);
          isFirstPoint = false;
        } else {
          ctx.lineTo(x, y);
        }
      }

      if (glowLayer === 0) {
        // Outermost glow - very subtle
        ctx.strokeStyle = wave.color1;
        ctx.lineWidth = wave.thickness + 5;
        ctx.globalAlpha = wave.opacity * 0.15;
        ctx.lineCap = 'round';
        ctx.lineJoin = 'round';
        ctx.filter = 'blur(4px)';
        ctx.stroke();
        ctx.filter = 'none';
      } else if (glowLayer === 1) {
        // Middle glow
        ctx.strokeStyle = wave.color2;
        ctx.lineWidth = wave.thickness + 2;
        ctx.globalAlpha = wave.opacity * 0.35;
        ctx.lineCap = 'round';
        ctx.lineJoin = 'round';
        ctx.filter = 'blur(1px)';
        ctx.stroke();
        ctx.filter = 'none';
      } else {
        // Main line with gradient
        const gradient = ctx.createLinearGradient(0, wave.yOffset - wave.amp, 0, wave.yOffset + wave.amp);
        gradient.addColorStop(0, wave.color1);
        gradient.addColorStop(0.5, wave.color2);
        gradient.addColorStop(1, wave.color1);

        ctx.strokeStyle = gradient;
        ctx.lineWidth = wave.thickness;
        ctx.globalAlpha = wave.opacity;
        ctx.lineCap = 'round';
        ctx.lineJoin = 'round';
        ctx.stroke();
      }
    };

    const animate = () => {
      // Clear with deep black background
      ctx.fillStyle = '#0B0B0F';
      ctx.fillRect(0, 0, width, height);

      const time = prefersReducedMotion ? 0 : (timeRef.current * 0.001) / 1.2;

      // Draw waves with multiple glow layers for depth
      waves.forEach((wave) => {
        // Draw glow layers first (back to front)
        drawWave(wave, time, 0);
        drawWave(wave, time, 1);
        drawWave(wave, time, 2); // Main line
      });

      ctx.globalAlpha = 1;

      if (!prefersReducedMotion) {
        timeRef.current += 16.67;
      }
      animationRef.current = requestAnimationFrame(animate);
    };

    animate();

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
      aria-label="Luxury flowing wave lines background"
      role="presentation"
    />
  );
}
