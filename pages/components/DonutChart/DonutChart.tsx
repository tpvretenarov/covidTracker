import React from 'react';
import { PieChart, Pie, Cell, Tooltip } from 'recharts';

type DonutChartType = {
  cases: number;
  deaths: number;
};

const DonutChart = ({ cases, deaths }: DonutChartType) => {
  const data = [
    { name: 'Cases', value: cases },
    { name: 'Deaths', value: deaths },
  ];
  return (
    <>
      {data.length && (
        <PieChart width={120} height={120}>
          <Pie dataKey="value" data={data} cx="50%" outerRadius={60} innerRadius={30} fill="#1966ca" paddingAngle={10}>
            {data.map((entry, index) => (
              <Cell key={`cell-${index}`} fill={entry.name === 'Cases' ? '#1966ca' : '#C81E1E'} />
            ))}
          </Pie>
          <Tooltip formatter={(label: string) => (label ? label.toLocaleString() : '')} />
        </PieChart>
      )}
    </>
  );
};

export default DonutChart;
