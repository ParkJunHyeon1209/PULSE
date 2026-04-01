export const rewardsRate = {
  MEMBER: 0.01,
  SILVER: 0.015,
  GOLD: 0.03,
  VIP: 0.05,
};

export const getGradeByTotalOrderPrice = (totalOrderPrice = 0) => {
  const amount = Number(totalOrderPrice) || 0;

  if (amount >= 500000) return 'VIP';
  if (amount >= 300000) return 'GOLD';
  if (amount >= 100000) return 'SILVER';
  return 'MEMBER';
};
