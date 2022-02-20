import React from 'react';
import styles from '../../../styles/Home.module.css';

type StatisticCardType = {
  title: string;
  data: number;
  dataColor: string;
  loading: boolean;
};

const StatisticCard = ({ title, data, dataColor, loading }: StatisticCardType) => {
  return (
    <div style={{ transition: '0.3s' }} className={`${styles.card}`}>
      {loading && <span className="loader" />}
      {!loading && (
        <>
          <div style={{ color: '#0b5394', fontSize: '12px' }} className={styles.title}>
            {title}
          </div>
          <div style={{ color: `${dataColor}`, fontSize: '25px', fontWeight: 'bold' }}>
            {data ? data.toLocaleString() : null}
          </div>
        </>
      )}
    </div>
  );
};

export default StatisticCard;
