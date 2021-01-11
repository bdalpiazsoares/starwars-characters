import React from 'react';
import { FiX, FiSearch } from 'react-icons/fi';

import styles from './search-bar.module.scss';

function SearchBar({ onChange = () => {}, clearText = () => {}, textSearchBar }) {
  return (
    <div className={styles.container}>
      <div className={styles.searchBarContainer}>
        <div className={styles.inputContainer}>
          <FiSearch className={styles.searchIcon} />
          <input
            className={styles.searchBar}
            type='text'
            placeholder='Ex: "luke skywalker, darth vader"'
            value={textSearchBar}
            onChange={(e) => onChange(e.target.value)}
          />
        </div>
        <FiX
          className={styles.clearIcon}
          onClick={() => clearText()}
        />
      </div>
    </div>
  )
}

export default SearchBar;