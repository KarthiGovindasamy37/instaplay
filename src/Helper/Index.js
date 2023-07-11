export const getYear = (date) => {
  const originalDate = new Date(date);
  return originalDate.getFullYear();
};