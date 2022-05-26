export const nextSunday = () => {
  const date = new Date();
  const dayUntilNextSunday = 7 - date.getUTCDay();
  date.setDate(date.getDate() + dayUntilNextSunday);
  return date;
};

export const formatDate = (date, format) => {
  format = format || "D";
  const timestamp = Math.floor(date.getTime() / 1000);
  return `<t:${timestamp}:${format}>`;
};
