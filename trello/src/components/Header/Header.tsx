import React from 'react';

import './Header.scss';

import Logo from './../../svg/my-trello-logo.svg';
import { SignOut } from './../SignOut';

export function Header() {
  return (
    <header className="header">
      <a href="/">
        <img src={Logo} alt="Logo" className="logo" />
      </a>
      <SignOut />
    </header>
  );
}
