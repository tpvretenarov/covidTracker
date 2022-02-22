import { useMemo } from 'react';
import { getGlobalSpecific } from '../../functions/getGlobalSpecific';
import { getGlobalAmountDiff } from '../../functions/getGlobalAmountDiff';
import { getCountrySpecific } from '../../functions/getCountrySpecific';
import StatisticCard from './StatisticCard/StatisticCard';
import { GlobalData, CountryData } from '../../types';

type StatisticsType = {
  globalData: GlobalData | undefined;
  globalLoading: boolean;
  countryData: CountryData | undefined;
  countryLoading: boolean;
  countryError: boolean;
};

const Statistics = ({ globalData, globalLoading, countryData, countryLoading, countryError }: StatisticsType) => {
  const globalCases = useMemo(() => getGlobalSpecific(globalData, 'cases', 1), [globalData]);
  const globalDeaths = useMemo(() => getGlobalSpecific(globalData, 'deaths', 1), [globalData]);

  const globalCases30 = useMemo(() => getGlobalAmountDiff(getGlobalSpecific(globalData, 'cases', 31)), [globalData]);
  const globalDeaths30 = useMemo(() => getGlobalAmountDiff(getGlobalSpecific(globalData, 'deaths', 31)), [globalData]);

  const countryCases = useMemo(
    () => !countryError && getCountrySpecific(countryData, 'cases', 1),
    [countryData, countryError]
  );
  const countryDeaths = useMemo(
    () => !countryError && getCountrySpecific(countryData, 'deaths', 1),
    [countryData, countryError]
  );

  const countryCases30 = useMemo(
    () => !countryError && getGlobalAmountDiff(getCountrySpecific(countryData, 'cases', 31)),
    [countryData, countryError]
  );
  const countryDeaths30 = useMemo(
    () => !countryError && getGlobalAmountDiff(getCountrySpecific(countryData, 'deaths', 31)),
    [countryData, countryError]
  );

  return (
    <div className="d-flex justify-content-center flex-wrap mb-2 w-100">
      <StatisticCard
        loading={countryLoading || globalLoading}
        title={`${countryData ? countryData.country : 'Global'} Cases`}
        data={(countryCases && countryCases[0].amount) || globalCases[0].amount}
        dataColor="#1966ca"
      />
      <StatisticCard
        loading={countryLoading || globalLoading}
        title={`${countryData ? countryData.country : 'Global'} Deaths`}
        data={(countryDeaths && countryDeaths[0].amount) || globalDeaths[0].amount}
        dataColor="#C81E1E"
      />
      <StatisticCard
        loading={countryLoading || globalLoading}
        title={`${countryData ? countryData.country : 'Global'} 30-Day Cases`}
        data={(countryCases30 && countryCases30.amount) || globalCases30.amount}
        dataColor="#1966ca"
      />
      <StatisticCard
        loading={countryLoading || globalLoading}
        title={`${countryData ? countryData.country : 'Global'} 30-Day Deaths`}
        data={(countryDeaths30 && countryDeaths30.amount) || globalDeaths30.amount}
        dataColor="#C81E1E"
      />
    </div>
  );
};

export default Statistics;
