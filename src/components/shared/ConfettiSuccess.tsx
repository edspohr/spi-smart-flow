'use client';

import { useCallback, useEffect, useRef } from 'react';

interface ConfettiSuccessProps {
  trigger: boolean;
}

export function ConfettiSuccess({ trigger }: ConfettiSuccessProps) {
  const canvasRef = useRef<HTMLCanvasElement>(null);

  const launchConfetti = useCallback(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;

    const ctx = canvas.getContext('2d');
    if (!ctx) return;

    canvas.width = window.innerWidth;
    canvas.height = window.innerHeight;

    const confettiCount = 100;
    const confetti: Array<{
      x: number;
      y: number;
      r: number;
      color: string;
      tilt: number;
      tiltAngle: number;
      tiltAngleIncrement: number;
      velocity: { x: number; y: number };
    }> = [];

    const colors = ['#16a34a', '#22c55e', '#1e3a5f', '#3b82f6'];

    for (let i = 0; i < confettiCount; i++) {
      confetti.push({
        x: Math.random() * canvas.width,
        y: -10 - Math.random() * 100,
        r: Math.random() * 4 + 2,
        color: colors[Math.floor(Math.random() * colors.length)],
        tilt: Math.random() * 10 - 10,
        tiltAngle: 0,
        tiltAngleIncrement: Math.random() * 0.07 + 0.05,
        velocity: {
          x: Math.random() * 4 - 2,
          y: Math.random() * 2 + 2
        }
      });
    }

    let animationFrame: number;

    const draw = () => {
      ctx.clearRect(0, 0, canvas.width, canvas.height);

      let stillVisible = false;

      confetti.forEach(c => {
        c.tiltAngle += c.tiltAngleIncrement;
        c.x += c.velocity.x;
        c.y += c.velocity.y;
        c.tilt = Math.sin(c.tiltAngle) * 15;

        if (c.y < canvas.height + 20) {
          stillVisible = true;
        }

        ctx.beginPath();
        ctx.lineWidth = c.r / 2;
        ctx.strokeStyle = c.color;
        ctx.moveTo(c.x + c.tilt + c.r / 2, c.y);
        ctx.lineTo(c.x + c.tilt, c.y + c.tilt + c.r / 2);
        ctx.stroke();
      });

      if (stillVisible) {
        animationFrame = requestAnimationFrame(draw);
      }
    };

    draw();

    return () => {
      if (animationFrame) {
        cancelAnimationFrame(animationFrame);
      }
    };
  }, []);

  useEffect(() => {
    if (trigger) {
      launchConfetti();
    }
  }, [trigger, launchConfetti]);

  if (!trigger) return null;

  return (
    <canvas
      ref={canvasRef}
      className="fixed inset-0 pointer-events-none z-50"
      style={{ width: '100vw', height: '100vh' }}
    />
  );
}
