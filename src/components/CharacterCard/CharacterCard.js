import React, { useState } from 'react';
import { FaInfoCircle } from 'react-icons/fa';

import Divider from '../Divider/Divider';
import Modal from '../Modal/Modal';
import ShowInfo from '../ShowInfo/ShowInfo';

import './character-card.scss';
import '../../styles/base-styles.scss';

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
      <div className='character-card-container'>
        <div className='header-card'>
          <span className='character-name'>{item.name}</span>
          <FaInfoCircle
            className='info-icon'
            onClick={() => setOpenModal(true)}
          />
        </div>
        <Divider />
        <div className='container-character-info'>
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