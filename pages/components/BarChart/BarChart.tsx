import React from 'react';
import { BarChart as ChartBar, XAxis, Tooltip, Bar, ResponsiveContainer, YAxis } from 'recharts';
import styled from 'styled-components';
import styles from './BarChart.module.css';
import getGlobalWeekly from '../../../functions/getGlobalWeekly';
import numFormatter from '../../../functions/numFormatter';

type BarChartType = {
  data:
    | {
        date: string;
        amount: number;
      }[]
    | undefined;
  type: string;
  loading: boolean;
};

const colorMap: { [key: string]: string } = {
  Cases: '#1966ca',
  Recovered: '#458B00',
  Deaths: '#C81E1E',
};

const BarChart = ({ data, type, loading }: BarChartType) => {
  const isError = data && data[0]?.date === 'API Error';
  const weeklyData = data && getGlobalWeekly(data);

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
    <>
      {loading && (
        <div className="d-flex justify-content-center align-items-center w-100" style={{ height: '242px' }}>
          <div className="loader" />
        </div>
      )}
      {weeklyData && weeklyData.length && !loading && !isError ? (
        <div className={styles.barChartContainer}>
          <div className={styles.barChartTitle}>Weekly {type}</div>
          <StyledResponsiveContainer width="99%" height={200}>
            <ChartBar data={weeklyData}>
              <Tooltip cursor={{ fill: 'rgba(11, 83, 148, 0.3)' }} content={<CustomTooltip />} />
              <XAxis dataKey="date" />
              <YAxis tickFormatter={(value) => numFormatter(value)} />
              <Bar barSize={10} dataKey="Amount" fill={colorMap[type]} />
            </ChartBar>
          </StyledResponsiveContainer>
        </div>
      ) : (
        <></>
      )}
    </>
  );
};

const StyledResponsiveContainer = styled(ResponsiveContainer)`
  .recharts-wrapper {
    position: absolute;
  }
`;

export default BarChart;
