import React from 'react';
import { FiX, FiSearch } from 'react-icons/fi';

import './search-bar.scss';

function SearchBar({ onChange = () => {}, clearText = () => {}, textSearchBar }) {
  return (
    <div className='container'>
      <div className='search-bar-container'>
        <div className='input-container'>
          <FiSearch
            className='search-icon'
          />
          <input
            className='search-bar'
            type='text'
            placeholder='Ex: "luke skywalker, darth vader"'
            value={textSearchBar}
            onChange={(e) => onChange(e.target.value)}
          />
        </div>
        <FiX
          className='clear-icon'
          onClick={() => clearText()}
        />
      </div>
    </div>
  )
}

export default SearchBar;