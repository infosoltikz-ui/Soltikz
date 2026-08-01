export const formatMonthYear = (val: string) => {
  const v = val.replace(/\D/g, '');
  if (v.length > 2) return `${v.slice(0, 2)}/${v.slice(2, 6)}`;
  if (v.length === 2 && val.length === 2 && !val.includes('/')) return `${v}/`;
  return v;
};
