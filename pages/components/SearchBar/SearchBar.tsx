import React, { useState, Dispatch, SetStateAction } from 'react';
import { CountryData } from '../../types';
import fetchCountry from '../../hooks/fetchCountry';
import styles from './SearchBar.module.css';

type SearchBarType = {
  setCountryData: Dispatch<SetStateAction<CountryData | undefined>>;
  setCountryLoading: Dispatch<SetStateAction<boolean>>;
  setCountryError: Dispatch<SetStateAction<boolean>>;
  countryData: CountryData | undefined;
  countryError: boolean;
};

const SearchBar = ({
  setCountryData,
  setCountryLoading,
  setCountryError,
  countryData,
  countryError,
}: SearchBarType) => {
  const [input, setInput] = useState('');
  const handleEnter = (key: React.KeyboardEvent<HTMLInputElement>) => {
    if (key.code === 'Enter' && input.length > 0) {
      setCountryLoading(true);
      fetchCountry(input)
        .then((res) => {
          if (!res) {
            setCountryLoading(false);
            setCountryError(true);
          } else if (res === 'Invalid Country') {
            setCountryLoading(false);
            setCountryError(true);
          } else {
            setCountryLoading(false);
            setCountryError(false);
            setCountryData(res);
          }
        })
        .catch(() => {
          setCountryLoading(false);
          throw new Error('Invalid country');
        });
    }
  };

  return (
    <div className={styles.searchBarContainer}>
      <h1 style={{ marginTop: '1rem', marginBottom: '0.5rem' }}>Worldwide Covid-19 Tracker</h1>
      <div className={styles.styledInputContainer}>
        <button
          style={{
            backgroundColor: countryError ? 'transparent' : undefined,
          }}
          className={styles.inputIcon}
          onClick={() => setInput(input)}
        >
          <i className="fas fa-search" />
        </button>
        <input
          style={{
            backgroundColor: countryError ? 'rgba(247,15,0, 0.2)' : undefined,
          }}
          className={styles.styledInput}
          onChange={(e) => setInput(e.target.value)}
          onKeyDown={handleEnter}
          value={input}
          type="text"
          placeholder="Search a country"
        />
        {countryError && <i style={{ color: 'rgba(247,15,0, 0.6)' }} className="fa-solid fa-circle-exclamation ml-1" />}
        {!countryError && countryData?.country.length && (
          <button
            className={styles.inputBackButton}
            onClick={() => {
              setInput('');
              setCountryData(undefined);
            }}
          >
            <i className="fa-solid fa-angle-left"></i>
            &nbsp;Global
          </button>
        )}
      </div>
    </div>
  );
};

export default SearchBar;
