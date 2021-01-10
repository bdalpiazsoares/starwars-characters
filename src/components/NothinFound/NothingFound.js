import React from 'react';
import { FaFrown } from 'react-icons/fa';

import './nothing-found.scss';

function NothingFound({ text = 'Nothing was found'}) {
  return (
    <div className='container-nothing-found'>
      <span className='text-nothing-found'>{text}</span>
      <FaFrown />
    </div>
  );
}

export default NothingFound;