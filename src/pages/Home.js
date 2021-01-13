import React, { useEffect, useState } from 'react';

import useDebounce from '../hooks/useDebounce';
import { getCharactersService } from '../services/starwars';

import CharacterList from '../components/CharacterList/CharacterList';
import Pagination from '../components/Pagination/Pagination';
import SearchBar from '../components/SearchBar/SearchBar';

import styles from './home.module.scss';
import logo from '../assets/starwars-logo.png';

function Home() {
  const [characterList, setCharacterList] = useState([]);
  const [textSearchBar, setTextSearchBar] = useState('');
  const [page, setPage] = useState(1);
  const [nextPage, setNextPage] = useState();
  const [count, setCount] = useState();
  const [nothingFound, setNothingFound] = useState(false);
  const [loading, setLoading] = useState(false);

  const debouncedSearch = useDebounce(textSearchBar, 500);

  useEffect(() => {
      getCharacters();
  }, [page, debouncedSearch]);
  
  async function getCharacters() {
    setLoading(true);
    const response = await getCharactersService(debouncedSearch, page);
    if (response && response.data) {
      setNextPage(response.data.next);
      setCharacterList(response.data.results);
      setCount(response.data.count)
      if (!response.data.count) {
        setNothingFound(true);
      } else {
        setNothingFound(false);
      }
    }
    setLoading(false);
  }

  function onClickArrowLeft() {
    if (page > 1) setPage(page - 1);
  }

  function onClickArrowRight() {
    const auxCount = Math.ceil(count / 10);
    if (page < auxCount) setPage(page + 1);
  }

  function handleOnChangeTextSearch(text) {
    if (page !== 1) setPage(1);
    setTextSearchBar(text);
  }

  return (
    <>
      <img
        className={styles.logoSize}
        alt='logo'
        src={logo}
      />
      <SearchBar
        onChange={handleOnChangeTextSearch}
        clearText={() => setTextSearchBar('')}
        textSearchBar={textSearchBar}
      />
      {loading ? (<div className='spinner' />) : (
        <CharacterList
          characterList={characterList}
          nothingFound={nothingFound}
        />
      )}
      {!!characterList.length && (
        <Pagination
          page={page}
          nextPage={nextPage}
          onClickArrowLeft={onClickArrowLeft}
          onClickArrowRight={onClickArrowRight}
        />
      )}
    </>
  );
}

export default Home;