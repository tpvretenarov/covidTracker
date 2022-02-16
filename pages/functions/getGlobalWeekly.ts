export const getGlobalWeekly = (data: { date: string; amount: number }[]) => {
  return data
    .map((key, index) => {
      if (index % 7 === 0) {
        return { date: key.date, Amount: key.amount };
      }
    })
    .filter(Boolean);
};
// extracts data every 7 days and the last element to showcase weekly data
