export const formatNumber = (value: number | string | undefined): string => {
  const num = Number(value) || 0;
  return num.toLocaleString();
};
