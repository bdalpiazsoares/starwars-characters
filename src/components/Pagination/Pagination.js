import React from 'react';
import { FaChevronCircleLeft, FaChevronCircleRight } from 'react-icons/fa';

import styles from './pagination.module.scss';

function Pagination({ page, nextPage, onClickArrowLeft = () => {}, onClickArrowRight = () => {} }) {
  return (
    <div className={styles.containerPagination}>
      <FaChevronCircleLeft
        className={page === 1 ? styles.arrowDisabled : styles.arrow}
        onClick={onClickArrowLeft}
      />
      <span className={styles.numberPage}>{page}</span>
      <FaChevronCircleRight
        className={nextPage ? styles.arrow : styles.arrowDisabled}
        onClick={onClickArrowRight}
      />
    </div>
  );
}

export default Pagination;