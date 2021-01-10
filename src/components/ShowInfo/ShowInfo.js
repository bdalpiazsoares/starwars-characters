import React from 'react';

import './show-info.scss'

function ShowInfo({ title, data }) {
  return (
    <div className='container-show-info'>
      <small className='info-title'>{title}</small>
      <small className='info-data'>{data}</small>
    </div>
  );
}

export default ShowInfo;