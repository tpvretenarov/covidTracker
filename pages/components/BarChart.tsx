import React from 'react';
import { BarChart as ChartBar, XAxis, Tooltip, Bar, ResponsiveContainer, YAxis } from 'recharts';
import styles from './BarChart.module.css';
import { getGlobalWeekly } from '../functions/getGlobalWeekly';
import { numFormatter } from '../functions/numFormatter';

type BarChartType = {
  data: {
    date: string;
    amount: number;
  }[];
  type: string;
};

const colorMap: { [key: string]: string } = {
  Cases: '#f3f6f4',
  Recovered: '#458B00',
  Deaths: '#C81E1E',
};

const BarChart = ({ data, type }: BarChartType) => {
  const isError = data && data[0].date === 'API Error';
  const weeklyData = getGlobalWeekly(data);

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
      {weeklyData && weeklyData.length && !isError && (
        <ResponsiveContainer width="100%" height={200}>
          <ChartBar data={weeklyData}>
            <Tooltip cursor={{ fill: 'rgba(11, 83, 148, 0.3)' }} content={<CustomTooltip />} />
            <XAxis dataKey="date" />
            <YAxis tickFormatter={(value) => numFormatter(value)} />
            <Bar barSize={10} dataKey="Amount" fill={colorMap[type]} />
          </ChartBar>
        </ResponsiveContainer>
      )}
    </div>
  );
};

export default BarChart;
