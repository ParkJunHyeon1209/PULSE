import { useEffect, useState } from 'react';

const CHARS = 'ABCDEFGHIJKLMNOPQRSTUVWXYZ0123456789';
const TICK = 40;
const STEPS = 12;

const scramble = (str) =>
  [...str]
    .map((c) => (/[^a-zA-Z0-9]/.test(c) ? c : CHARS[Math.floor(Math.random() * CHARS.length)]))
    .join('');



export default function SlotText({ value, className, delay = 0 }) {
  const [display, setDisplay] = useState(() => scramble(value));

  useEffect(() => {
    const chars = [...value];
    const totalFrames = STEPS + chars.length * 12;
    let frame = 0;

    let intervalId;

    const timerId = setTimeout(() => {
      intervalId = setInterval(() => {
        frame++;
        setDisplay(
          chars
            .map((char, i) => {
              
              if (/[^a-zA-Z0-9]/.test(char)) return char;
              if (frame >= STEPS + i * 12) return char;
              return CHARS[Math.floor(Math.random() * CHARS.length)];
            })
            .join('')
        );
        if (frame >= totalFrames) {
          clearInterval(intervalId);
          setDisplay(value);
        }
      }, TICK);
    }, delay);

    return () => {
      clearTimeout(timerId);
      clearInterval(intervalId);
    };
  }, [value, delay]);

  
  
  return <span className={className}>{display}</span>;
}
