import React from 'react';
import Link from 'next/link';
import classNames from 'classnames';

import text from 'constants/dictionary';

const socialNets = [
  {
    buttonClass: 'facebook',
    iconClass: 'fa-facebook',
    link: 'https://facebook.com/wir_by',
    id: '1',
  },
  {
    buttonClass: 'vk',
    iconClass: 'fa-vk',
    link: 'https://vk.com/wir_by',
    id: '2',
  },
  {
    buttonClass: 'twitter',
    iconClass: 'fa-twitter',
    link: 'https://twitter.com/wir_by',
    id: '3',
  },
  {
    buttonClass: 'telegram',
    iconClass: 'fa-telegram',
    link: 'https://t.me/wir_by',
    id: '4',
  },
  {
    buttonClass: 'youtube',
    iconClass: 'fa-youtube',
    link: 'https://youtube.com/wir_by',
    id: '5',
  },
  {
    buttonClass: 'instagram',
    iconClass: 'fa-instagram',
    link: 'https://instagram.com/wir_by',
    id: '6',
  },
];

const Footer = () => (
  <footer className="app-footer">
    <div className="columns">
      <div className="column general-info">
        {text.projectGeneralInfo} <i className="fa fa-copyright" /> 2018
        <br />
        {text.projectGoal}
        <br />
        {text.readAboutUs}
        <Link href="/about">
          <a> {text.here} </a>
        </Link>
      </div>
      <div className="column social">
        <div>{text.followSocialLinks}</div>
        <div className="links">
          {socialNets.length &&
            socialNets.map(net => (
              <a
                key={net.id}
                className={classNames('button is-medium is-rounded', net.buttonClass)}
                href={net.link}
              >
                <span className="icon is-medium">
                  <i className={classNames('fa', net.iconClass)} />
                </span>
              </a>
            ))}
        </div>
      </div>
    </div>
  </footer>
);

export default Footer;
