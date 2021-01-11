import React from 'react';
import { FaFrown } from 'react-icons/fa';

import styles from './nothing-found.module.scss';

function NothingFound({ text = 'Nothing was found'}) {
  return (
    <div className={styles.containerNothingFound}>
      <span className={styles.textNothingFound}>{text}</span>
      <FaFrown />
    </div>
  );
}

export default NothingFound;