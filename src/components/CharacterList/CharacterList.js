import React from 'react';
import CharacterCard from '../CharacterCard/CharacterCard';

import './character-list.scss';

function CharacterList({ characterList = [], nothingFound = false, openModal }) {

  function renderContent() {
    if (!nothingFound) {
      return (
        <ul className='container-list'>
          {characterList?.map((item) => (
            <CharacterCard
              key={item.name}
              item={item}
            />
          ))}
        </ul>
      );
    } else {
      return (
        <span>nothing was found :(</span>
      );
    }
  }
  
  return (
    <div className='container-character-list'>
      {renderContent()}
    </div>
  );
}

export default CharacterList;