import React from 'react';

import Link from 'components/common/Link';
import SocialList from 'components/common/SocialList';
import { ROUTES_NAMES } from 'routes';

export default () => (
  <>
    <div className="title">404 Старонка адсутнічае</div>
    <div className="subtitle">Рэсурс змяніў месцазнаходжанне альбо яго ніколі не існавала</div>
    <br />
    <Link route={ROUTES_NAMES.main}>
      <a className="button">Перайсці на галоўную</a>
    </Link>
    <br />
    <br />
    <br />
    <div className="subtitle">
      <b>Wir.by</b> у сацыяльных сетках:
    </div>
    <SocialList className="social" />
  </>
);
