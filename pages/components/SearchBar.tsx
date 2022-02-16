import React, { useState, Dispatch, SetStateAction } from 'react';
import styles from './SearchBar.module.css';

type SearchBarType = {
  setSearchTerm: Dispatch<SetStateAction<string>>;
};

const SearchBar = ({ setSearchTerm }: SearchBarType) => {
  const [input, setInput] = useState('');
  const handleEnter = (key: React.KeyboardEvent<HTMLInputElement>) => {
    key.code === 'Enter' && input.length > 0 && setSearchTerm(input);
  };

  return (
    <div className={styles.searchBarContainer}>
      <h1 style={{ marginTop: '1rem', marginBottom: '0.5rem' }}>Worldwide Covid-19 Tracker</h1>
      <div className={styles.styledInputContainer}>
        <button className={styles.inputIcon} onClick={() => setSearchTerm(input)}>
          <i className="fas fa-search" />
        </button>
        <input
          className={styles.styledInput}
          onChange={(e) => setInput(e.target.value)}
          onKeyDown={handleEnter}
          type="text"
          placeholder="Search a country"
        />
      </div>
    </div>
  );
};

export default SearchBar;
