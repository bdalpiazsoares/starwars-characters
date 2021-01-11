import React from 'react';

import logo from '../../assets/starwars-logo.png';

import styles from './header.module.scss';

function Header() {
  return (
    <img
      className={styles.logoSize}
      src={logo}
      alt='logo'
    />
  );
}

export default Header;