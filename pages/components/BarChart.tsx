import React from 'react';
import { BarChart as ChartBar, XAxis, Tooltip, Bar } from 'recharts';
import styles from './BarChart.module.css';

type BarChartType = {
  data: {
    date: string;
    amount: number;
  }[];
  type: string;
};

const BarChart = ({ data, type }: BarChartType) => {
  const isError = data && data[0].date === 'API Error';
  const weeklyData = data
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
        <ChartBar width={225} height={170} data={weeklyData}>
          <Tooltip content={<CustomTooltip />} />
          <XAxis hide dataKey="date" />
          <Bar barSize={3} dataKey="Amount" fill="#c84b31" />
        </ChartBar>
      )}
    </div>
  );
};

export default BarChart;
