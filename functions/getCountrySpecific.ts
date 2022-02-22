import { CountryData } from '../types';

const getCountrySpecific = (
  data: CountryData | 'API Error' | undefined,
  type: 'cases' | 'deaths' | 'recovered',
  days: number | 'all'
) => {
  if (data && data !== null && data !== 'API Error') {
    return Object.entries(data.timeline[type])
      .map(([key, value]) => {
        return { date: key, amount: value };
      })
      .filter(({ date, amount }) => date !== 'undefined' && amount !== 0)
      .slice(days === 'all' ? undefined : -days);
  }
  return null;
};

export default getCountrySpecific;
