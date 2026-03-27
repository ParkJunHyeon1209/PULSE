import { useEffect, useRef, useState } from 'react';
import styled from '@emotion/styled';
import { keyframes } from '@emotion/react';

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
      rgba(255, 255, 255, 0.95),
      rgba(255, 255, 255, 0.2) 25%,
      transparent 40%
    ),
    radial-gradient(
      circle,
      rgba(147, 51, 234, 0.9) 0%,
      rgba(59, 130, 246, 0.75) 45%,
      rgba(34, 211, 238, 0.35) 70%,
      transparent 100%
    );

  box-shadow:
    0 0 12px rgba(147, 51, 234, 0.9),
    0 0 28px rgba(59, 130, 246, 0.75),
    0 0 48px rgba(34, 211, 238, 0.4);

  mix-blend-mode: screen;
  animation: ${pulse} 1.8s ease-in-out infinite;
  transition:
    width 0.18s ease,
    height 0.18s ease,
    transform 0.12s ease;
`;
/*
const Follower = styled.div`
  position: fixed;
  left: ${({ x }) => x}px;
  top: ${({ y }) => y}px;
  width: 48px;
  height: 48px;
  transform: translate(-50%, -50%);
  border-radius: 50%;
  pointer-events: none;

  background: radial-gradient(circle, rgba(255, 255, 255, 0.08), transparent 65%);
  border: 1px solid rgba(255, 255, 255, 0.2);

  box-shadow:
    0 0 24px rgba(168, 85, 247, 0.28),
    inset 0 0 18px rgba(255, 255, 255, 0.08);

  backdrop-filter: blur(3px);
  mix-blend-mode: screen;
`;
*/
const Particle = styled.span`
  position: fixed;
  left: ${({ x }) => x}px;
  top: ${({ y }) => y}px;
  width: ${({ size }) => size}px;
  height: ${({ size }) => size}px;
  pointer-events: none;
  transform: translate(-50%, -50%);
  animation: ${sparkle} 700ms ease-out forwards;

  ${({ shape }) =>
    shape === 'star'
      ? `
        clip-path: polygon(
          50% 0%,
          61% 35%,
          98% 35%,
          68% 57%,
          79% 91%,
          50% 70%,
          21% 91%,
          32% 57%,
          2% 35%,
          39% 35%
        );
      `
      : `
        border-radius: 50%;
      `}

  background: ${({ color }) => color};

  box-shadow:
    0 0 10px ${({ glow }) => glow},
    0 0 20px ${({ glow }) => glow};
`;

const COLORS = [
  {
    fill: 'linear-gradient(135deg, rgba(255,255,255,1), rgba(196,181,253,0.95), rgba(96,165,250,0.9))',
    glow: 'rgba(167, 139, 250, 0.9)',
  },
  {
    fill: 'linear-gradient(135deg, rgba(255,255,255,1), rgba(125,211,252,0.95), rgba(34,211,238,0.85))',
    glow: 'rgba(34, 211, 238, 0.9)',
  },
  {
    fill: 'linear-gradient(135deg, rgba(255,255,255,1), rgba(244,114,182,0.95), rgba(192,132,252,0.9))',
    glow: 'rgba(244, 114, 182, 0.9)',
  },
];

export default function CursorTrail() {
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
          const color = COLORS[Math.floor(Math.random() * COLORS.length)];
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

  // <Follower x={follower.x} y={follower.y} />
  return (
    <TrailRoot aria-hidden="true">
      <MainCursor x={mouse.x} y={mouse.y} />
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
