import React from 'react';
import PropTypes from 'prop-types';
import { withRouter } from 'next/router';
import Cookies from 'js-cookie';

import Icon from 'components/common/Icon';
import Link from 'components/common/Link';
import Text from 'components/common/Text';
import LinkWraper from 'components/common/LinkWraper';
import LocaleContext from 'components/common/LocaleContext';

import { TOPICS } from 'constants/home';

import { LOCALE_COOKIE_NAME } from 'constants/server';
import { ROUTES_NAMES } from 'routes';
import { LANGS } from 'constants';

import 'styles/src/sidebar/sidebar.scss';

const getLocaleSwitchUrl = (path, lang) => {
  const parts = path.split('/');
  parts[1] = lang;
  return parts.join('/');
};

const SidebarSection = ({ title, data, idKey, renderItem, renderFooter }) => (
  <section className="sidebar__section sidebar__section--long sidebar__section--visible">
    <ul className="sidebar__section-list">
      <li className="sidebar__section-list-item sidebar__section-title">{title}</li>
      {data.map(item => (
        <li key={item[idKey]} className="sidebar__section-list-item">
          {renderItem(item)}
        </li>
      ))}
    </ul>
    {renderFooter && <span className="sidebar__section-link-to-all">{renderFooter()}</span>}
  </section>
);

SidebarSection.propTypes = {
  title: PropTypes.node.isRequired,
  data: PropTypes.arrayOf(PropTypes.shape({})).isRequired,
  idKey: PropTypes.string,
  renderItem: PropTypes.func.isRequired,
  renderFooter: PropTypes.func,
};

SidebarSection.defaultProps = {
  idKey: 'slug',
  renderFooter: null,
};

const FOOTER_BY_TOPIC = {
  authors: () => (
    <Link>
      <span>
        <Text id="sidebar.all-team" />
      </span>
    </Link>
  ),
};

const handleLangClick = Cookies.set.bind(null, LOCALE_COOKIE_NAME);

const Sidebar = ({ router: { asPath } }) => (
  <div id="wir-sidebar" className="wir-sidebar">
    <aside className="sidebar">
      <span className="sidebar__icon-close">
        <Icon name="times" />
      </span>

      <LocaleContext.Consumer>
        {lang => (
          <ul className="sidebar__langs">
            {LANGS.filter(({ id }) => id !== lang).map(({ id, label }) => (
              <li key={id} className="langs__item">
                <Link
                  route={getLocaleSwitchUrl(asPath, id)}
                  params={{ lang: id }}
                  render={() => (
                    <LinkWraper onClick={handleLangClick.bind(null, id)}>{label}</LinkWraper>
                  )}
                />
              </li>
            ))}
          </ul>
        )}
      </LocaleContext.Consumer>

      <div className="sidebar__about-label">
        <Link route={ROUTES_NAMES.about}>
          <Text id="sidebar.about" />
        </Link>
      </div>

      {TOPICS.map(topic => (
        <SidebarSection
          key={topic}
          title={<Text id={`topic.${topic}_essentials`} />}
          data={[]}
          renderItem={({ slug }) => <Link>{slug}</Link>}
          renderFooter={FOOTER_BY_TOPIC[topic]}
        />
      ))}
    </aside>
  </div>
);

Sidebar.propTypes = {
  router: PropTypes.shape({
    asPath: PropTypes.string.isRequired,
  }).isRequired,
};

export default withRouter(Sidebar);
