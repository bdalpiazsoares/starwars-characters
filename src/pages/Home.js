import React, { useEffect, useState } from 'react';

import apiService from '../services/apiService';

import CharacterList from '../components/CharacterList/CharacterList';
import Header from '../components/Header/Header';
import Loading from '../components/Loading/Loading';
import Pagination from '../components/Pagination/Pagination';
import SearchBar from '../components/SearchBar/SearchBar';

function Home() {
  let textSearchTimeOut = 0;
  const [characterList, setCharacterList] = useState([]);
  const [textSearchBar, setTextSearchBar] = useState('');
  const [page, setPage] = useState(1);
  const [nextPage, setNextPage] = useState();
  const [count, setCount] = useState();
  const [nothingFound, setNothingFound] = useState(false);
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    textSearchTimeOut = setTimeout(() => getCharacters(), 500);
  }, [page, textSearchBar]);
  
  async function getCharacters() {
    try {
      setLoading(true);
      const response = await apiService.get(`/people/?search=${textSearchBar}&page=${page}`);
      setNextPage(response.data.next);
      if (response.data) {
        setCharacterList(response.data.results);
        setCount(response.data.count)
      }
      setLoading(false);
    } catch(err) {
      setLoading(false);
      setNothingFound(true);
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
      {loading ? (<Loading />) : (
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