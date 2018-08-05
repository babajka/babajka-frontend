import React from 'react';

import MailLink from 'components/common/MailLink';
import SocialList from 'components/common/SocialList';

export default () => (
  <>
    <div className="title">На нашых серверах нешта пайшло не так.</div>
    <div className="title-alt">Sorry, something went wrong on our servers.</div>
    <br />
    <div className="subtitle">
      Звязацца з распрацоўшчыкамі, якія гэта дапусцілі: <MailLink />
    </div>
    <br />
    <br />
    <div className="subtitle">
      <b>Wir.by</b> у сацыяльных сетках:
    </div>
    <SocialList className="social" />
  </>
);
