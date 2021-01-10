import React, { useEffect, useState } from 'react';

import apiService from '../services/apiService';

import CharacterList from '../components/CharacterList/CharacterList';
import Header from '../components/Header/Header';
import SearchBar from '../components/SearchBar/SearchBar';
import Pagination from '../components/Pagination/Pagination';

function Home() {
  let textSearchTimeOut = 0;
  const [characterList, setCharacterList] = useState([]);
  const [textSearchBar, setTextSearchBar] = useState('');
  const [page, setPage] = useState(1);
  const [nextPage, setNextPage] = useState();
  const [count, setCount] = useState();

  useEffect(() => {
    textSearchTimeOut = setTimeout(() => getCharacters(), 500);
  }, [page, textSearchBar]);
  
  async function getCharacters() {
    const response = await apiService.get(`/people/?search=${textSearchBar}&page=${page}`);
    setNextPage(response.data.next);
    if (response.data) {
      setCharacterList(response.data.results);
      setCount(response.data.count)
    }
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
    clearTimeout(textSearchTimeOut);
  }

  return (
    <>
      <Header />
      <SearchBar
        onChange={handleOnChangeTextSearch}
        clearText={() => setTextSearchBar('')}
        textSearchBar={textSearchBar}
      />
      <CharacterList characterList={characterList} />
      <Pagination
        page={page}
        nextPage={nextPage}
        onClickArrowLeft={onClickArrowLeft}
        onClickArrowRight={onClickArrowRight}
      />
    </>
  );
}

export default Home;