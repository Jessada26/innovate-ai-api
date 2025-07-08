export const getDateThai = (dateInput: any = new Date()) => {
  let date = new Date(dateInput);
  date.setTime(date.getTime() + 7 * 60 * 60 * 1000);
  date.toLocaleString('en-EN', { timeZone: 'Asia/Bangkok' });
  return date;
};
