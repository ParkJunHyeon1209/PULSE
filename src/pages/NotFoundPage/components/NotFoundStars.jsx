import { memo, useEffect, useRef } from 'react';
import styled from '@emotion/styled';

const Canvas = styled.canvas`
  position: fixed;
  inset: 0;
  pointer-events: none;
  z-index: 3;
`;

const STARS = Array.from({ length: 180 }, () => ({
  x: Math.random(),
  y: Math.random(),
  r: Math.random() * 1.2 + 0.2,
  a: Math.random(),
  speed: Math.random() * 0.004 + 0.001,
  phase: Math.random() * Math.PI * 2,
}));

function NotFoundStars({ isDark }) {
  const canvasRef = useRef(null);
  const frameRef = useRef(0);

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;

    const ctx = canvas.getContext('2d');
    if (!ctx) return;

    const color = isDark ? '180,140,255' : '139,92,246';
    let width = 0;
    let height = 0;

    const resize = () => {
      const dpr = window.devicePixelRatio || 1;
      width = window.innerWidth;
      height = window.innerHeight;
      canvas.width = Math.floor(width * dpr);
      canvas.height = Math.floor(height * dpr);
      canvas.style.width = `${width}px`;
      canvas.style.height = `${height}px`;
      ctx.setTransform(dpr, 0, 0, dpr, 0, 0);
    };

    resize();
    window.addEventListener('resize', resize);

    const draw = (time) => {
      ctx.clearRect(0, 0, width, height);
      const t = time * 0.001;

      STARS.forEach((s) => {
        const alpha = s.a * (0.5 + 0.5 * Math.sin(t * s.speed * 60 + s.phase));
        const scale = isDark ? 1 : 1.45;
        const glowAlpha = isDark ? alpha : Math.min(alpha * 1.35, 0.95);
        const fillAlpha = isDark ? alpha * 0.95 : Math.min(alpha * 1.15, 0.82);
        ctx.save();
        ctx.translate(s.x * width, s.y * height);
        ctx.rotate(Math.PI / 4);
        ctx.shadowColor = `rgba(${color},${glowAlpha})`;
        ctx.shadowBlur = s.r * (isDark ? 8 : 16);
        ctx.beginPath();
        ctx.moveTo(0, -s.r * 1.6 * scale);
        ctx.lineTo(s.r * scale, 0);
        ctx.lineTo(0, s.r * 1.6 * scale);
        ctx.lineTo(-s.r * scale, 0);
        ctx.closePath();
        ctx.fillStyle = `rgba(255,255,255,${fillAlpha})`;
        ctx.fill();
        ctx.restore();
      });
      frameRef.current = requestAnimationFrame(draw);
    };

    frameRef.current = requestAnimationFrame(draw);

    return () => {
      window.removeEventListener('resize', resize);
      cancelAnimationFrame(frameRef.current);
    };
  }, [isDark]);

  return <Canvas ref={canvasRef} />;
}

export default memo(NotFoundStars);
