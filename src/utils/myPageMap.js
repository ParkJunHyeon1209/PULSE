export const rewardsRate = {
  MEMBER: 0.01,
  SILVER: 0.015,
  GOLD: 0.03,
  VIP: 0.05,
};

export const grade = ['MEMBER', 'SILVER', 'GOLD', 'VIP'];

export const toNextGrade = [100000, 300000, 500000];

export const gradeToneMap = {
  MEMBER: {
    color: '#5eead4',
    lightColor: '#0d9488',
    glow: 'rgba(94,234,212,0.28)',
    border: 'rgba(94,234,212,.55)',
    bg: 'rgba(94,234,212,.08)',
  },
  SILVER: {
    color: '#d8e0ec',
    lightColor: '#7c8da6',
    glow: 'rgba(226,232,240,0.28)',
    border: 'rgba(216,224,236,.58)',
    bg: 'rgba(216,224,236,.08)',
  },
  GOLD: {
    color: '#ffd86b',
    lightColor: '#f5ae13',
    glow: 'rgba(251,191,36,0.28)',
    border: 'rgba(255,216,107,.55)',
    bg: 'rgba(255,216,107,.1)',
  },
  VIP: {
    color: '#d39bff',
    lightColor: '#9333ea',
    glow: 'rgba(192,132,252,0.3)',
    border: 'rgba(211,155,255,.55)',
    bg: 'rgba(211,155,255,.1)',
  },
};

export const getGradeByTotalOrderPrice = (totalOrderPrice = 0) => {
  const amount = Number(totalOrderPrice) || 0;

  if (amount >= 500000) return 'VIP';
  if (amount >= 300000) return 'GOLD';
  if (amount >= 100000) return 'SILVER';
  return 'MEMBER';
};
