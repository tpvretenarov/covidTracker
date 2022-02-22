const getGlobalAmountDiff = (
  data: {
    date: string;
    amount: number;
  }[]
) => {
  if (data.length) {
    return { date: data[data.length - 1].date, amount: data[data.length - 1].amount - data[0].amount };
  }
  return { date: 'none', amount: 0 };
};

export default getGlobalAmountDiff;
