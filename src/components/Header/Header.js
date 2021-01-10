import React from 'react';

import logo from '../../assets/starwars-logo.png';

import './header.scss';

function Header() {
  return (
    <img
      className='logo-size'
      src={logo}
      alt='logo'
    />
  );
}

export default Header;