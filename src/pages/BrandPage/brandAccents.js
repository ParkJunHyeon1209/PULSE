const dark = {
  violet: {
    containerBorder: 'rgba(124, 58, 237, 0.2)',
    containerShadow: 'inset 0 1px 0 rgba(167, 139, 250, 0.08), 0 0 20px rgba(124, 58, 237, 0.08)',
    activeBorder: 'rgba(124, 58, 237, 0.35)',
    hoverShadow: '0 14px 40px rgba(124, 58, 237, 0.22), 0 4px 12px rgba(124, 58, 237, 0.13)',
    itemHoverShadow: '0 2px 14px rgba(124, 58, 237, 0.12)',
    containerBg:
      'linear-gradient(135deg, rgba(124, 58, 237, 0.12) 0%, rgba(99, 102, 241, 0.08) 100%)',
    activeColor: '#a78bfa',
    subtleColor: 'rgba(167, 139, 250, 0.5)',
    activeLine: 'linear-gradient(90deg, #6d28d9, #7c3aed)',
    glow: 'radial-gradient(ellipse at 50% 100%, rgba(76, 0, 255, 0.3) 0%, transparent 60%)',
  },
  blue: {
    containerBorder: 'rgba(96, 165, 250, 0.2)',
    containerShadow: 'inset 0 1px 0 rgba(147, 197, 253, 0.07), 0 0 20px rgba(56, 189, 248, 0.07)',
    activeBorder: 'rgba(96, 165, 250, 0.3)',
    hoverShadow: '0 14px 40px rgba(56, 189, 248, 0.24), 0 4px 12px rgba(56, 189, 248, 0.15)',
    itemHoverShadow: '0 2px 14px rgba(56, 189, 248, 0.14)',
    containerBg:
      'linear-gradient(135deg, rgba(56, 130, 255, 0.1) 0%, rgba(99, 102, 241, 0.08) 100%)',
    activeColor: '#93c5fd',
    subtleColor: 'rgba(96, 165, 250, 0.55)',
    activeLine: 'linear-gradient(90deg, #38bdf8, #818cf8)',
    glow: 'radial-gradient(ellipse at 50% 100%, rgba(99, 102, 241, 0.3) 0%, transparent 60%)',
  },
  pink: {
    containerBorder: 'rgba(236, 72, 153, 0.2)',
    containerShadow: 'inset 0 1px 0 rgba(249, 168, 212, 0.08), 0 0 20px rgba(236, 72, 153, 0.08)',
    activeBorder: 'rgba(236, 72, 153, 0.35)',
    hoverShadow: '0 14px 40px rgba(236, 72, 153, 0.24), 0 4px 12px rgba(236, 72, 153, 0.15)',
    itemHoverShadow: '0 2px 14px rgba(236, 72, 153, 0.14)',
    containerBg:
      'linear-gradient(135deg, rgba(236, 72, 153, 0.12) 0%, rgba(244, 114, 182, 0.08) 100%)',
    activeColor: '#f9a8d4',
    subtleColor: 'rgba(244, 114, 182, 0.5)',
    activeLine: 'linear-gradient(90deg, #ec4899, #f472b6)',
    glow: 'radial-gradient(ellipse at 50% 100%, rgba(219, 39, 119, 0.3) 0%, transparent 60%)',
  },
};

const light = {
  violet: {
    containerBorder: 'rgba(124, 58, 237, 0.22)',
    containerShadow: '0 4px 24px rgba(124, 58, 237, 0.1), 0 1px 6px rgba(124, 58, 237, 0.07)',
    activeBorder: 'rgba(124, 58, 237, 0.38)',
    hoverShadow: '0 8px 32px rgba(124, 58, 237, 0.14), 0 2px 8px rgba(124, 58, 237, 0.08)',
    itemHoverShadow: '0 2px 14px rgba(124, 58, 237, 0.08)',
    containerBg:
      'linear-gradient(135deg, rgba(124, 58, 237, 0.05) 0%, rgba(99, 102, 241, 0.03) 100%)',
    activeColor: '#6d28d9',
    subtleColor: 'rgba(109, 40, 217, 0.55)',
    activeLine: 'linear-gradient(90deg, #6d28d9, #7c3aed)',
    glow: 'radial-gradient(ellipse at 50% 100%, rgba(124, 58, 237, 0.18) 0%, transparent 62%)',
  },
  blue: {
    containerBorder: 'rgba(56, 189, 248, 0.28)',
    containerShadow: '0 4px 24px rgba(56, 189, 248, 0.12), 0 1px 6px rgba(56, 189, 248, 0.08)',
    activeBorder: 'rgba(56, 189, 248, 0.44)',
    hoverShadow: '0 8px 32px rgba(56, 189, 248, 0.16), 0 2px 8px rgba(56, 189, 248, 0.09)',
    itemHoverShadow: '0 2px 14px rgba(56, 189, 248, 0.08)',
    containerBg:
      'linear-gradient(135deg, rgba(56, 130, 255, 0.05) 0%, rgba(99, 102, 241, 0.03) 100%)',
    activeColor: '#3b82f6',
    subtleColor: 'rgba(59, 130, 246, 0.5)',
    activeLine: 'linear-gradient(90deg, #3b82f6, #818cf8)',
    glow: 'radial-gradient(ellipse at 50% 100%, rgba(99, 102, 241, 0.18) 0%, transparent 62%)',
  },
  pink: {
    containerBorder: 'rgba(236, 72, 153, 0.22)',
    containerShadow: '0 4px 24px rgba(236, 72, 153, 0.1), 0 1px 6px rgba(236, 72, 153, 0.07)',
    activeBorder: 'rgba(236, 72, 153, 0.38)',
    hoverShadow: '0 8px 32px rgba(236, 72, 153, 0.14), 0 2px 8px rgba(236, 72, 153, 0.08)',
    itemHoverShadow: '0 2px 14px rgba(236, 72, 153, 0.08)',
    containerBg:
      'linear-gradient(135deg, rgba(236, 72, 153, 0.05) 0%, rgba(219, 39, 119, 0.03) 100%)',
    activeColor: '#db2777',
    subtleColor: 'rgba(219, 39, 119, 0.55)',
    activeLine: 'linear-gradient(90deg, #db2777, #ec4899)',
    glow: 'radial-gradient(ellipse at 50% 100%, rgba(219, 39, 119, 0.18) 0%, transparent 60%)',
  },
};

export const getAccent = (theme, accent) =>
  (theme.mode === 'dark' ? dark : light)[accent] ?? (theme.mode === 'dark' ? dark : light).violet;
