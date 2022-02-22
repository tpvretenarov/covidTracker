import React from 'react';
import styles from '../../../styles/Home.module.css';

type StatisticCardType = {
  title: string;
  data: number | string;
  dataColor: string;
  loading: boolean;
};

const StatisticCard = ({ title, data, dataColor, loading }: StatisticCardType) => {
  return (
    <div className="col-6 justify-content-center align-items-center text-center px-1">
      <div className={`${styles.card} my-1 p-3`}>
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
    </div>
  );
};

export default StatisticCard;
