import { GlobalData } from '../types';

const getGlobalCasesDeaths = (data: GlobalData | 'API Error' | undefined, days: number | 'all') => {
  if (data && data !== null && data !== 'API Error') {
    const combinedData: { date: string; cases: number; deaths: number }[] = [];
    const casesData = Object.entries(data.cases)
      .map(([key, value]) => {
        return { date: key, amount: value };
      })
      .filter(({ date, amount }) => date !== 'undefined' && amount !== 0)
      .slice(days === 'all' ? undefined : -days);

    const deathsData = Object.entries(data.deaths)
      .map(([key, value]) => {
        return { date: key, amount: value };
      })
      .filter(({ date, amount }) => date !== 'undefined' && amount !== 0)
      .slice(days === 'all' ? undefined : -days);

    casesData.forEach((cases) => {
      deathsData.forEach((deaths) => {
        if (cases.date === deaths.date) {
          combinedData.push({ date: cases.date, cases: cases.amount, deaths: deaths.amount });
        }
      });
    });
    return combinedData;
  }
};

export default getGlobalCasesDeaths;
