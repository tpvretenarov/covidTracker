import React, { useState, Dispatch, SetStateAction } from 'react';
import { CountryData } from '../../../types';
import fetchCountry from '../../../functions/fetchCountry';
import styles from './SearchBar.module.css';

type SearchBarType = {
  setCountryData: Dispatch<SetStateAction<CountryData | undefined>>;
  setCountryLoading: Dispatch<SetStateAction<boolean>>;
  setCountryError: Dispatch<SetStateAction<boolean>>;
  countryData: CountryData | undefined;
  countryLoading: boolean;
  countryError: boolean;
};

const SearchBar = ({
  setCountryData,
  setCountryLoading,
  setCountryError,
  countryData,
  countryLoading,
  countryError,
}: SearchBarType) => {
  const [input, setInput] = useState('');

  const handleSearch = () => {
    if (input.length > 0) {
      setCountryLoading(true);
      fetchCountry(input)
        .then((res) => {
          if (!res) {
            setCountryLoading(false);
            setCountryError(true);
            setCountryData(undefined);
            setInput('');
          } else if (res === 'Invalid Country') {
            setCountryLoading(false);
            setCountryError(true);
            setCountryData(undefined);
            setInput('');
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

  const handleEnter = (key: React.KeyboardEvent<HTMLInputElement>) => {
    if (key.code === 'Enter' && input.length > 0) {
      handleSearch();
    }
  };

  return (
    <div className={`${styles.searchBarContainer} text-center col-xs-12 col-md-4 px-1`}>
      <h1 style={{ marginTop: '1rem', marginBottom: '0.5rem', fontSize: '1.5em' }}>Worldwide Covid-19 Tracker</h1>
      <div className={styles.styledInputContainer}>
        {!countryError && countryData?.country.length && (
          <button
            className={styles.inputBackButton}
            onClick={() => {
              setInput('');
              setCountryData(undefined);
            }}
          >
            <i className="fa-solid fa-angle-left"></i>
          </button>
        )}
        <input
          style={{
            backgroundColor: countryError ? 'rgba(247,15,0, 0.2)' : undefined,
          }}
          className={styles.styledInput}
          onChange={(e) => setInput(e.target.value)}
          onKeyDown={handleEnter}
          value={input}
          type="text"
          placeholder={!countryError ? 'Search a country' : 'Invalid country'}
        />
        <div tabIndex={0} className={styles.inputSearchButton} onKeyDown={handleEnter} onClick={handleSearch}>
          {!countryLoading ? (
            <i className="fas fa-search" />
          ) : (
            <span style={{ width: '25px', height: '25px', borderColor: '#0b5394 transparent' }} className="loader" />
          )}
        </div>
        {countryError && (
          <i
            style={{ color: 'rgba(247,15,0, 0.6)' }}
            className="fa-solid fa-circle-exclamation align-self-center ml-1"
          />
        )}
      </div>
    </div>
  );
};

export default SearchBar;
