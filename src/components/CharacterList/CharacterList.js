import React from 'react';
import CharacterCard from '../CharacterCard/CharacterCard';
import NothingFound from '../NothinFound/NothingFound';

import styles from './character-list.module.scss';

function CharacterList({ characterList = [], nothingFound = false }) {

  function renderContent() {
    if (!nothingFound) {
      return (
        <ul className={styles.containerList}>
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
        <NothingFound />
      );
    }
  }
  
  return (
    <div className={styles.containerCharacterList}>
      {renderContent()}
    </div>
  );
}

export default CharacterList;