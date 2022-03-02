import { useState, useEffect, useMemo } from 'react';
import type { NextPage } from 'next';
import Head from 'next/head';
import { GlobalData, CountryData, AllCountryData } from '../types';
import fetchGlobal from '../functions/fetchGlobal';
import fetchAllCountries from '../functions/fetchAllCountries';
import getGlobalSpecific from '../functions/getGlobalSpecific';
import getCountrySpecific from '../functions/getCountrySpecific';
import styles from '../styles/Home.module.css';
import SearchBar from './components/SearchBar/SearchBar';
import Statistics from './components/Statistics';
import BarChart from './components/BarChart/BarChart';
import Map from './components/Map/Map';

const Home: NextPage = () => {
  const [globalData, setGlobalData] = useState<GlobalData>();
  const [globalLoading, setGlobalLoading] = useState(false);

  const [countryData, setCountryData] = useState<CountryData>();
  const [countryLoading, setCountryLoading] = useState(false);
  const [countryError, setCountryError] = useState(false);

  const [allCountriesData, setAllCountriesData] = useState<AllCountryData>();
  const [allCountriesLoading, setAllCountriesLoading] = useState(false);

  const [countryList, setCountryList] = useState<{ country: string; updated: string }[] | undefined>();

  // fetch global historical data on initial load
  useEffect(() => {
    setGlobalLoading(true);
    fetchGlobal().then((res) => {
      if (res) {
        setGlobalLoading(false);
        setGlobalData(res);
      }
    });
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  // fetch all country data on initial load
  useEffect(() => {
    setAllCountriesLoading(true);
    fetchAllCountries().then((res) => {
      if (res) {
        setAllCountriesLoading(false);
        setAllCountriesData(res);
      }
    });
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  useEffect(() => {
    if (allCountriesData && allCountriesData.length > 0) {
      const countryListData = allCountriesData.map((key) => {
        if (key.country && key.updatedAt) {
          return { country: key.country, updated: key.updatedAt };
        }
        return { country: '', updated: '' };
      });
      setCountryList(
        // remove duplicates
        countryListData.filter((value, index, self) => index === self.findIndex((t) => t.country === value.country))
      );
    }
  }, [allCountriesData]);

  const globalCasesData = useMemo(() => {
    const data = getGlobalSpecific(globalData, 'cases', 'all');
    if (data?.length && data[0].date === 'API Error') {
      return undefined;
    } else {
      return data;
    }
  }, [globalData]);

  const globalDeathData = useMemo(() => {
    const data = getGlobalSpecific(globalData, 'deaths', 'all');
    if (data?.length && data[0].date === 'API Error') {
      return undefined;
    } else {
      return data;
    }
  }, [globalData]);

  const countryCasesData = useMemo(() => {
    const data = getCountrySpecific(countryData, 'cases', 'all');
    if (data?.length && data[0].date === 'API Error') {
      return undefined;
    } else {
      return data;
    }
  }, [countryData]);

  const countryDeathData = useMemo(() => {
    const data = getCountrySpecific(countryData, 'deaths', 'all');
    if (data?.length && data[0].date === 'API Error') {
      return undefined;
    } else {
      return data;
    }
  }, [countryData]);

  return (
    <div className={styles.container}>
      <Head>
        <title>Covid Tracker</title>
        <meta name="Worldwide covid-19 case tracker" content="Generated by create next app" />
        <link rel="icon" href="/favicon.ico" />
        <link
          rel="stylesheet"
          href="https://maxcdn.bootstrapcdn.com/bootstrap/4.0.0/css/bootstrap.min.css"
          integrity="sha384-Gn5384xqQ1aoWXA+058RXPxPg6fy4IWvTNh0E263XmFcJlSAwiGgFAW/dAiS6JXm"
          crossOrigin="anonymous"
        />
      </Head>
      <main>
        <div className="d-flex flex-wrap justify-content-center m-0 p-0">
          <SearchBar
            setCountryData={setCountryData}
            setCountryLoading={setCountryLoading}
            setCountryError={setCountryError}
            countryData={countryData}
            countryLoading={countryLoading}
            countryError={countryError}
            countryList={countryList}
          />
          <Statistics
            countryData={countryData}
            countryLoading={countryLoading}
            countryError={countryError}
            globalData={globalData}
            globalLoading={globalLoading}
          />
          <div className="row flex-wrap mx-1">
            <BarChart
              type="Cases"
              data={countryCasesData || globalCasesData}
              loading={countryLoading || globalLoading}
            />
            <BarChart
              type="Deaths"
              data={countryDeathData || globalDeathData}
              loading={countryLoading || globalLoading}
            />
          </div>
          {allCountriesData && allCountriesData?.length && <Map data={allCountriesData} countryData={countryData} />}
        </div>
        <footer className={styles.footer}>
          <p style={{ color: '#0b5394' }}>Copyright &copy; Todor Vretenarov {new Date().getFullYear()}</p>
        </footer>
      </main>
    </div>
  );
};

export default Home;
