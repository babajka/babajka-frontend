import React from 'react';

import Link from 'components/common/Link';

import Logo from 'assets/logo/Logo';
import 'styles/src/navbar/navbar.scss';

const Header = () => {
  return (
    <div className="navbar">
      <Logo size={42} />
      <div className="navbar__title">
        <Link>Беларуская</Link>, а таксама <Link>сусветная</Link> культура і <Link>гісторыя</Link>
      </div>
      <div className="navbar__burger">
        <div className="navbar__burger-item" />
        <div className="navbar__burger-item" />
        <div className="navbar__burger-item" />
      </div>
    </div>
  );
};

export default Header;
