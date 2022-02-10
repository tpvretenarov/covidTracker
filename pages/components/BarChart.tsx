import React from 'react';
import { BarChart as ChartBar, Label, XAxis, Tooltip, Bar } from 'recharts';

type BarChartType = {
  data: {
    date: string;
    amount: number;
  }[];
};

const BarChart = ({ data }: BarChartType) => {
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
        <div
          style={{
            backgroundColor: '#2d4263',
            color: '#ecdbba',
            paddingLeft: '1rem',
            paddingRight: '1rem',
            paddingTop: '1px',
            paddingBottom: '1px',
            borderRadius: '5px',
          }}
        >
          <p>{`Date: ${label}`}</p>
          <p>{`Amount: ${payload[0].value.toLocaleString()}`}</p>
        </div>
      );
    }

    return null;
  };
  return (
    <>
      {weeklyData && weeklyData.length && !isError && (
        <ChartBar width={400} height={150} data={weeklyData}>
          <Tooltip content={<CustomTooltip />} />
          <XAxis dataKey="date" />
          <Bar barSize={3} dataKey="Amount" fill="#c84b31" />
        </ChartBar>
      )}
    </>
  );
};

export default BarChart;
