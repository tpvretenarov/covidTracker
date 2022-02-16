import React from 'react';
import styles from '../../styles/Home.module.css';
import statisticStyles from './StatisticCard.module.css';

type StatisticCardType = {
  title: string;
  data: number;
  dataColor: string;
  loading: boolean;
};

const StatisticCard = ({ title, data, dataColor, loading }: StatisticCardType) => {
  return (
    <div style={{ transition: '0.3s' }} className={styles.card}>
      {loading && <span className={statisticStyles.loader} />}
      {!loading && (
        <>
          <div style={{ color: '#0b5394' }}>{title}</div>
          <div style={{ color: `${dataColor}`, fontSize: '30px', fontWeight: 'bold' }}>{data.toLocaleString()}</div>
        </>
      )}
    </div>
  );
};

export default StatisticCard;
