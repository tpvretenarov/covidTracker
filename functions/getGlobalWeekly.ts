export const getGlobalWeekly = (data: { date: string; amount: number }[]) => {
  return data
    .map((key, index, array) => {
      const day = new Date(key.date).getDay(); // every monday
      if (day === 0) {
        return { date: key.date, Amount: Math.abs(key.amount - (array[index - 7] ? array[index - 7].amount : 0)) };
      }
    })
    .filter(Boolean);
};
// extracts data every monday showcase weekly data
