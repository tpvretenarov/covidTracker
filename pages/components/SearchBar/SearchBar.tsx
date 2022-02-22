import React, { useState, Dispatch, SetStateAction } from 'react';
import styled from 'styled-components';
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
  countryList: { country: string; updated: string }[] | undefined;
};

const SearchBar = ({
  setCountryData,
  setCountryLoading,
  setCountryError,
  countryData,
  countryLoading,
  countryError,
  countryList,
}: SearchBarType) => {
  const [input, setInput] = useState('');
  const [suggestions, setSuggestions] = useState(false);
  const [activeSuggestion, setActiveSuggestion] = useState<string | undefined>();

  const handleSearch = (term?: string) => {
    if ((term && term.length > 0) || input.length > 0) {
      setCountryLoading(true);
      fetchCountry(term || input)
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

  const handleClickSuggestion = (e: React.MouseEvent<HTMLDivElement>) => {
    if (e.currentTarget.innerText) {
      setInput(e.currentTarget.innerText);
      handleSearch(e.currentTarget.innerText);
      setSuggestions(false);
    }
  };

  const handleEnterSuggestion = (e: React.KeyboardEvent<HTMLDivElement>) => {
    if (e.currentTarget.innerText && e.code) {
      if (e.code === 'Enter' && input.length > 0) {
        setInput(e.currentTarget.innerText);
        handleSearch(e.currentTarget.innerText);
        setSuggestions(false);
      }
    }
  };

  const handleSuggestionOpen = () => {
    setSuggestions(true);
  };

  const handleSuggestionClose = () => {
    setSuggestions(false);
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
          onFocus={handleSuggestionOpen}
          onBlur={handleSuggestionClose}
        />
        {suggestions && (
          <StyledSuggestions>
            {countryList?.length &&
              countryList
                .filter(({ country }) => country.toLowerCase().indexOf(input.toLowerCase()) > -1)
                .map(({ country, updated }) => (
                  <Suggestion
                    key={country}
                    onMouseDown={(e) => e.preventDefault()}
                    onClick={handleClickSuggestion}
                    onKeyDown={handleEnterSuggestion}
                  >
                    {country}
                  </Suggestion>
                ))}
          </StyledSuggestions>
        )}
        <div tabIndex={0} className={styles.inputSearchButton} onKeyDown={handleEnter} onClick={() => handleSearch()}>
          {!countryLoading ? (
            <i className="fas fa-search" />
          ) : (
            <span style={{ width: '25px', height: '25px', borderColor: '#0b5394 transparent' }} className="loader" />
          )}
        </div>
        {countryError && (
          <i
            style={{ color: 'rgba(247,15,0, 0.6)', fontSize: '16px', position: 'absolute', right: '65px' }}
            className="fa-solid fa-circle-exclamation align-self-center"
          />
        )}
      </div>
    </div>
  );
};

const StyledSuggestions = styled.div`
  position: absolute;
  top: 39px;
  width: 100%;
  max-height: 300px;
  overflow-y: scroll;
  z-index: 1;
  background-color: #d1cfcf;
  border: 1px #0b5394 solid;
`;

const Suggestion = styled.div`
  display: flex;
  align-items: center;
  color: #0b5394;
  background-color: #d1cfcf;
  height: 30px;
  text-align: left;
  padding: 20px 10px;
  cursor: pointer;

  :hover {
    color: #d1cfcf;
    background-color: #0b5394;
  }
`;

export default SearchBar;
