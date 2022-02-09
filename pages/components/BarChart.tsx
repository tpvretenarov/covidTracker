import React from 'react';
import { BarChart as ChartBar, CartesianGrid, XAxis, YAxis, Tooltip, Legend, Bar } from 'recharts';

type BarChartType = {
  data: {
    date: string;
    amount: number;
  }[];
};

const BarChart = ({ data }: BarChartType) => {
  const isError = data && data[0].date === 'API Error';
  return (
    <>
      {data && data.length && !isError && (
        <ChartBar width={500} height={250} data={data}>
          <Tooltip />
          <XAxis hide dataKey="date" />
          <Bar barSize={5} dataKey="amount" fill="#c84b31" />
        </ChartBar>
      )}
    </>
  );
};

export default BarChart;
