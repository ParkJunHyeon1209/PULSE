import { useEffect, useRef, useState } from 'react';
import styled from '@emotion/styled';
import { keyframes } from '@emotion/react';
import useThemeStore from '../../store/useThemeStore';

const sparkle = keyframes`
  0% {
    transform: translate(-50%, -50%) scale(0.4) rotate(0deg);
    opacity: 0;
  }
  20% {
    opacity: 1;
  }
  100% {
    transform: translate(-50%, -50%) scale(1.8) rotate(180deg);
    opacity: 0;
  }
`;

const sparkleDot = keyframes`
  0% {
    transform: translate(-50%, -50%) scale(0.4) rotate(0deg);
    opacity: 0;
  }
  20% {
    opacity: 0.4;
  }
  100% {
    transform: translate(-50%, -50%) scale(1.8) rotate(180deg);
    opacity: 0;
  }
`;

const pulse = keyframes`
  0% {
    transform: translate(-50%, -50%) scale(0.95);
  }
  50% {
    transform: translate(-50%, -50%) scale(1.08);
  }
  100% {
    transform: translate(-50%, -50%) scale(0.95);
  }
`;

const TrailRoot = styled.div`
  position: fixed;
  inset: 0;
  pointer-events: none;
  z-index: 9999;
`;

const MainCursor = styled.div`
  position: fixed;
  left: ${({ x }) => x}px;
  top: ${({ y }) => y}px;
  width: 1px;
  height: 1px;
  transform: translate(-50%, -50%);
  border-radius: 50%;
  pointer-events: none;

  background:
    radial-gradient(
      circle at 30% 30%,
      ${({ isDark }) => (isDark ? 'rgba(196,181,253,0.7)' : 'rgba(255, 255, 255, 0.95)')},
      ${({ isDark }) => (isDark ? 'rgba(124,58,237,0.15)' : 'rgba(255, 255, 255, 0.2)')} 25%,
      transparent 40%
    ),
    radial-gradient(
      circle,
      rgba(132, 0, 255, 0.6) 0%,
      rgba(59, 130, 246, 0.4) 45%,
      rgba(34, 211, 238, 0.2) 70%,
      transparent 100%
    );

  box-shadow:
    0 0 12px rgba(132, 0, 255, 0.6),
    0 0 28px rgba(59, 130, 246, 0.4),
    0 0 48px rgba(34, 211, 238, 0.2);

  mix-blend-mode: screen;
  animation: ${pulse} 1.8s ease-in-out infinite;
  transition:
    width 0.18s ease,
    height 0.18s ease,
    transform 0.12s ease;
`;

const Particle = styled.span`
  position: fixed;
  left: ${({ x }) => x}px;
  top: ${({ y }) => y}px;
  width: ${({ size }) => size}px;
  height: ${({ size }) => size}px;
  pointer-events: none;
  transform: translate(-50%, -50%);
  animation: ${({ shape }) => (shape === 'star' ? sparkle : sparkleDot)} 700ms ease-out forwards;

  ${({ shape }) =>
    shape === 'star'
      ? `
        clip-path: polygon(
          50% 0%,
          65% 35%,
          100% 50%,
          65% 65%,
          50% 100%,
          35% 65%,
          0% 50%,
          35% 35%
        );
      `
      : `
        border-radius: 50%;
        opacity: 0.4;
      `}

  background: ${({ color }) => color};

  box-shadow:
    0 0 10px ${({ glow }) => glow},
    0 0 20px ${({ glow }) => glow};
`;


const COLORS = [
  {
    fill: 'linear-gradient(135deg, rgba(236,233,255,0.9) 0%, rgba(196,181,253,0.95) 50%, rgba(124,58,237,0.9) 100%)',
    glow: 'rgba(167,139,250,0.9)',
  },
  {
    fill: 'linear-gradient(135deg, rgba(236,233,255,0.9) 0%, rgba(244,114,182,0.95) 50%, rgba(236,72,153,0.88) 100%)',
    glow: 'rgba(244,114,182,0.9)',
  },
  {
    fill: 'linear-gradient(135deg, rgba(236,233,255,0.9) 0%, rgba(147,197,253,0.95) 50%, rgba(56,130,255,0.88) 100%)',
    glow: 'rgba(96,165,250,0.9)',
  },
];


const DARK_COLORS = [
  {
    fill: 'linear-gradient(135deg, rgba(167,139,250,0.25) 0%, rgba(124,58,237,0.92) 55%, rgba(150,70,255,0.98) 100%)',
    glow: 'rgba(167,139,250,0.85)',
  },
  {
    fill: 'linear-gradient(135deg, rgba(244,114,182,0.25) 0%, rgba(236,72,153,0.88) 55%, rgba(192,72,234,0.95) 100%)',
    glow: 'rgba(244,114,182,0.85)',
  },
  {
    fill: 'linear-gradient(135deg, rgba(96,165,250,0.25) 0%, rgba(56,130,255,0.88) 55%, rgba(99,102,241,0.95) 100%)',
    glow: 'rgba(96,165,250,0.85)',
  },
];

export default function CursorTrail() {
  const isDarkMode = useThemeStore((s) => s.isDarkMode);
  const colorSetRef = useRef(COLORS);

  useEffect(() => {
    colorSetRef.current = isDarkMode ? DARK_COLORS : COLORS;
  }, [isDarkMode]);

  const [mouse, setMouse] = useState({
    x: window.innerWidth / 2,
    y: window.innerHeight / 2,
  });

  const [follower, setFollower] = useState({
    x: window.innerWidth / 2,
    y: window.innerHeight / 2,
  });

  const [particles, setParticles] = useState([]);
  const particleId = useRef(0);
  const rafRef = useRef(null);
  const mouseRef = useRef(mouse);
  const followerRef = useRef(follower);
  const lastSpawnRef = useRef(0);

  useEffect(() => {
    mouseRef.current = mouse;
  }, [mouse]);

  useEffect(() => {
    followerRef.current = follower;
  }, [follower]);

  useEffect(() => {
    const handleMouseMove = (e) => {
      const nextMouse = { x: e.clientX, y: e.clientY };
      setMouse(nextMouse);
      mouseRef.current = nextMouse;

      const now = Date.now();
      if (now - lastSpawnRef.current > 18) {
        lastSpawnRef.current = now;

        const count = Math.random() > 0.65 ? 2 : 1;
        const newParticles = Array.from({ length: count }).map(() => {
          const color = colorSetRef.current[Math.floor(Math.random() * colorSetRef.current.length)];
          return {
            id: particleId.current++,
            x: e.clientX + (Math.random() * 18 - 9),
            y: e.clientY + (Math.random() * 18 - 9),
            size: Math.random() * 8 + 6,
            shape: Math.random() > 0.45 ? 'star' : 'dot',
            color: color.fill,
            glow: color.glow,
          };
        });

        setParticles((prev) => {
          const next = [...prev, ...newParticles];
          return next.slice(-28);
        });

        newParticles.forEach((item) => {
          window.setTimeout(() => {
            setParticles((prev) => prev.filter((particle) => particle.id !== item.id));
          }, 700);
        });
      }
    };

    const animateFollower = () => {
      const target = mouseRef.current;
      const current = followerRef.current;

      const next = {
        x: current.x + (target.x - current.x) * 0.18,
        y: current.y + (target.y - current.y) * 0.18,
      };

      followerRef.current = next;
      setFollower(next);

      rafRef.current = requestAnimationFrame(animateFollower);
    };

    window.addEventListener('mousemove', handleMouseMove);
    rafRef.current = requestAnimationFrame(animateFollower);

    return () => {
      window.removeEventListener('mousemove', handleMouseMove);
      if (rafRef.current) cancelAnimationFrame(rafRef.current);
    };
  }, []);

  
  return (
    <TrailRoot aria-hidden="true">
      <MainCursor x={mouse.x} y={mouse.y} isDark={isDarkMode} />
      {particles.map((particle) => (
        <Particle
          key={particle.id}
          x={particle.x}
          y={particle.y}
          size={particle.size}
          shape={particle.shape}
          color={particle.color}
          glow={particle.glow}
        />
      ))}
    </TrailRoot>
  );
}
