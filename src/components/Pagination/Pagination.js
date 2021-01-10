import React from 'react';
import { FaChevronCircleLeft, FaChevronCircleRight } from 'react-icons/fa';

import './pagination.scss';

function Pagination({ page, nextPage, onClickArrowLeft = () => {}, onClickArrowRight = () => {} }) {
  return (
    <div className='container-pagination'>
      <FaChevronCircleLeft
        className={page === 1 ? 'arrow-disabled' : 'arrow'}
        onClick={onClickArrowLeft}
      />
      <span className='number-page'>{page}</span>
      <FaChevronCircleRight
        className={nextPage ? 'arrow' : 'arrow-disabled'}
        onClick={onClickArrowRight}
      />
    </div>
  );
}

export default Pagination;