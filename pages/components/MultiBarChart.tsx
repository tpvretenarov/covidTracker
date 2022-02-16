import React, { useMemo } from 'react';
import { LineChart as ChartBar, XAxis, Tooltip, Bar, Line } from 'recharts';
import styles from './BarChart.module.css';
import { GlobalData } from '../types';
import { getGlobalSpecific } from '../functions/getGlobalSpecific';

type MultiBarChartType = {
  data: GlobalData | undefined;
  type: string;
};

const MultiBarChart = ({ data, type }: MultiBarChartType) => {
  //   const isError = data && data[0].date === 'API Error';
  const weeklyData = (data: any[]) => {
    return data
      .map((key, index, array) => {
        let value;
        value = {
          date: key.date,
          Amount: (array[index - 1] ? array[index - 1].amount : 0) + key.amount,
        };
        if (index % 7 === 0) {
          return value;
        }
      })
      .filter(Boolean);
  };

  const casesData = useMemo(
    () =>
      weeklyData(getGlobalSpecific(data, 'cases', 'all')).map((key) => {
        if (key) {
          return { date: key.date, CasesAmount: key.Amount };
        }
      }),
    [data]
  );

  const recoveredData = useMemo(
    () =>
      weeklyData(getGlobalSpecific(data, 'recovered', 'all')).map((key) => {
        if (key) {
          return { date: key.date, RecoveredAmount: key.Amount };
        }
      }),
    [data]
  );

  const deathsData = useMemo(
    () =>
      weeklyData(getGlobalSpecific(data, 'deaths', 'all')).map((key) => {
        if (key) {
          return { date: key.date, DeathsAmount: key.Amount };
        }
      }),
    [data]
  );

  const combinedData = casesData
    .map((item, i) => Object.assign({}, item, recoveredData[i]))
    .map((item, i) => Object.assign({}, item, deathsData[i]));

  const CustomTooltip = ({ active, payload, label }: any) => {
    if (active && payload && payload.length) {
      return (
        <div className={styles.tooltip}>
          <p>{`Date: ${label}`}</p>
          <p>{`Amount: ${payload[0].value.toLocaleString()}`}</p>
        </div>
      );
    }
    return null;
  };

  return (
    <div className={styles.barChartContainer}>
      <div className={styles.barChartTitle}>Weekly {type}</div>
      {combinedData && combinedData.length && (
        <ChartBar width={800} height={170} data={combinedData}>
          <Tooltip />
          <XAxis hide dataKey="date" />
          <Line dataKey="CasesAmount" fill="#ecdbba" />
          <Line dataKey="RecoveredAmount" fill="#458B00" />
          <Line dataKey="DeathsAmount" fill="#C81E1E" />
        </ChartBar>
      )}
    </div>
  );
};

export default MultiBarChart;
