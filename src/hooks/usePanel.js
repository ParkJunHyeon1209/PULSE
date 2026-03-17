import { useEffect, useRef } from 'react';

export default function usePanel({ open, onClose, focusRef, outsideClick = true }) {
  const wrapRef = useRef(null);

  useEffect(() => {
    if (!open) return undefined;

    const handleEscape = (e) => {
      if (e.key === 'Escape') onClose();
    };
    const handleMouseDown = (e) => {
      if (outsideClick && wrapRef.current && !wrapRef.current.contains(e.target)) onClose();
    };

    window.addEventListener('keydown', handleEscape);
    if (outsideClick) window.addEventListener('mousedown', handleMouseDown);

    return () => {
      window.removeEventListener('keydown', handleEscape);
      if (outsideClick) window.removeEventListener('mousedown', handleMouseDown);
    };
  }, [open, onClose, outsideClick]);

  useEffect(() => {
    if (!open || !focusRef) return;
    focusRef.current?.focus();
  }, [open, focusRef]);

  return wrapRef;
}
