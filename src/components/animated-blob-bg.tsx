'use client';

import { useEffect, useRef } from 'react';

// Simplex noise implementation
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

export function AnimatedBlobBg() {
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

    const noise = noiseRef.current;
    const animate = () => {
      ctx.clearRect(0, 0, canvas.width / dpr, canvas.height / dpr);

      // Create gradient
      const gradient = ctx.createLinearGradient(0, 0, canvas.width / dpr, canvas.height / dpr);
      gradient.addColorStop(0, '#9250e6');
      gradient.addColorStop(0.5, '#a78bfa');
      gradient.addColorStop(1, '#c084fc');

      ctx.fillStyle = gradient;

      // Blob parameters
      const centerX = (canvas.width / dpr) / 2;
      const centerY = (canvas.height / dpr) / 3;
      const baseRadius = Math.max(canvas.width, canvas.height) / 4;
      const segments = 100;

      // Time progression (18-25 seconds, use 20 seconds = 20000ms)
      const duration = 20000;
      const normalizedTime = prefersReducedMotion ? 0 : (timeRef.current % duration) / duration;

      // Calculate transformations (smooth drifting without pulse)
      const driftX = prefersReducedMotion ? 0 : Math.sin(normalizedTime * Math.PI * 2) * 20;
      const driftY = prefersReducedMotion ? 0 : Math.cos(normalizedTime * Math.PI * 2) * 10;

      // Draw blob with wave deformation
      ctx.beginPath();
      for (let i = 0; i < segments; i++) {
        const angle = (i / segments) * Math.PI * 2;

        // Perlin noise for organic wave deformation
        const noiseScale = 0.008;
        const noiseX = Math.cos(angle) * noiseScale;
        const noiseY = Math.sin(angle) * noiseScale;

        // Create flowing wave effect by advancing noise in circular direction
        const wavePhase = angle * 3; // Multiple waves around the blob
        const deformation = noise.noise(
          noiseX + normalizedTime * 1.5 + wavePhase * 0.1,
          noiseY + normalizedTime * 1.2 + Math.sin(wavePhase) * 0.1
        );

        // Stronger deformation for more visible wave effect
        const radiusModifier = 1 + deformation * 0.5;
        const r = baseRadius * radiusModifier;

        const x = centerX + driftX + Math.cos(angle) * r;
        const y = centerY + driftY + Math.sin(angle) * r;

        if (i === 0) {
          ctx.moveTo(x, y);
        } else {
          ctx.lineTo(x, y);
        }
      }
      ctx.closePath();
      ctx.fill();

      // Apply blur effect using shadow
      ctx.shadowColor = 'rgba(146, 80, 230, 0.3)';
      ctx.shadowBlur = 100;
      ctx.fillStyle = gradient;
      ctx.fill();

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
        filter: 'blur(60px)',
        opacity: 0.4,
      }}
      aria-label="Animated purple gradient blob background"
      role="presentation"
    />
  );
}
