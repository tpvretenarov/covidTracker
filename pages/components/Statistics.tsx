import { useMemo } from 'react';
import { getGlobalSpecific } from '../functions/getGlobalSpecific';
import { getGlobalAmountDiff } from '../functions/getGlobalAmountDiff';
import StatisticCard from './StatisticCard';
import { GlobalData } from '../types';

type StatisticsType = {
  globalData: GlobalData | undefined;
  globalLoading: boolean;
};

const Statistics = ({ globalData, globalLoading }: StatisticsType) => {
  const globalDeaths = useMemo(() => getGlobalSpecific(globalData, 'deaths', 1), [globalData]);
  const globalCases = useMemo(() => getGlobalSpecific(globalData, 'cases', 1), [globalData]);
  const globalRecovered = useMemo(() => getGlobalSpecific(globalData, 'recovered', 1), [globalData]);

  const globalDeaths30 = useMemo(() => getGlobalAmountDiff(getGlobalSpecific(globalData, 'deaths', 31)), [globalData]);
  const globalCases30 = useMemo(() => getGlobalAmountDiff(getGlobalSpecific(globalData, 'cases', 31)), [globalData]);
  const globalRecovered30 = useMemo(
    () => getGlobalAmountDiff(getGlobalSpecific(globalData, 'recovered', 31)),
    [globalData]
  );

  return (
    <>
      <div className="d-flex justify-content-center flex-wrap">
        <StatisticCard
          loading={globalLoading}
          title="Global Cases"
          data={globalCases ? globalCases[0].amount : 0}
          dataColor="#f3f6f4"
        />
        <StatisticCard
          loading={globalLoading}
          title="Global Recovered"
          data={globalRecovered ? globalRecovered[0].amount : 0}
          dataColor="#458B00"
        />
        <StatisticCard
          loading={globalLoading}
          title="Global Deaths"
          data={globalDeaths ? globalDeaths[0].amount : 0}
          dataColor="#C81E1E"
        />
      </div>
      <div className="d-flex justify-content-center flex-wrap">
        <StatisticCard
          loading={globalLoading}
          title="30-Day Cases"
          data={globalDeaths30 ? globalCases30.amount : 0}
          dataColor="#f3f6f4"
        />
        <StatisticCard
          loading={globalLoading}
          title="30-Day Recovered"
          data={globalDeaths30 ? globalRecovered30.amount : 0}
          dataColor="#458B00"
        />
        <StatisticCard
          loading={globalLoading}
          title="30-Day Deaths"
          data={globalDeaths30 ? globalDeaths30.amount : 0}
          dataColor="#C81E1E"
        />
      </div>
    </>
  );
};

export default Statistics;
