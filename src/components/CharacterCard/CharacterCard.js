import React, { useState } from 'react';
import { FaInfoCircle } from 'react-icons/fa';

import Modal from '../Modal/Modal';
import ShowInfo from '../ShowInfo/ShowInfo';

import styles from './character-card.module.scss';

function CharacterCard({ item }) {
  const [openModal, setOpenModal] = useState(false);

  function renderInfo(title, data) {
    return (
      <ShowInfo 
        title={title}
        data={data}
      />
    );
  }

  return (
    <>
      {openModal && 
        (<Modal
          item={item}
          closeModal={() => setOpenModal(false)}
        />)
      }
      <div className={styles.characterCardContainer}>
        <div className={styles.headerCard}>
          <span className='default-title'>{item.name}</span>
          <FaInfoCircle
            className={styles.infoIcon}
            onClick={() => setOpenModal(true)}
          />
        </div>
        <div className='divider' />
        <div className={styles.containerCharacterInfo}>
          {renderInfo('Birth Year', item.birth_year)}
          {renderInfo('Height', item.height)}
          {renderInfo('Mass', item.mass)}
          {renderInfo('Skin Color', item.skin_color)}
        </div>
      </div>
    </>
  );
}

export default CharacterCard;