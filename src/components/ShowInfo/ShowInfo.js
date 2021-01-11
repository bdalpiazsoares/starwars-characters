import React from 'react';

import styles from './show-info.module.scss'

function ShowInfo({ title, data }) {
  return (
    <div className={styles.containerShowInfo}>
      <small className={styles.infoTitle}>{title}</small>
      <small className={styles.infoData}>{data}</small>
    </div>
  );
}

export default ShowInfo;