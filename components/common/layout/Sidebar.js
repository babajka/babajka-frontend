import './sidebar.scss';

import React from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import { withRouter } from 'next/router';
import Cookies from 'js-cookie';

import Icon from 'components/common/ui/Icon';
import Link from 'components/common/Link';
import Text from 'components/common/Text';
import Clickable from 'components/common/Clickable';
import LocaleContext from 'components/common/LocaleContext';

import { authActions, authSelectors } from 'redux/ducks/auth';
import { sidebarSelectors } from 'redux/ducks/sidebar';
import { TagsById, UserShape, IdsArray } from 'utils/customPropTypes';
import { getTagLink, getTopicLink } from 'utils/tags';

import { TOPICS, LANGS } from 'constants';
import { TOPIC } from 'constants/misc';
import { LOCALE_COOKIE_NAME } from 'constants/server';
import { ROUTES_NAMES } from 'routes';

const getLocaleSwitchUrl = (path, lang) => {
  const parts = path.split('/');
  parts[1] = lang;
  return parts.join('/');
};

const SidebarSection = ({ title, data, idKey, renderItem, footer }) => (
  <section className="sidebar__section">
    <ul className="sidebar__section-list">
      <li className="sidebar__section-list-item sidebar__section-title">{title}</li>
      {data.map(item => (
        <li key={item[idKey]} className="sidebar__section-list-item">
          {renderItem(item)}
        </li>
      ))}
    </ul>
    {footer && <span className="sidebar__section-link-to-all">{footer}</span>}
  </section>
);

SidebarSection.propTypes = {
  title: PropTypes.node.isRequired,
  data: PropTypes.arrayOf(PropTypes.shape({})).isRequired,
  idKey: PropTypes.string,
  renderItem: PropTypes.func.isRequired,
  footer: PropTypes.node,
};

SidebarSection.defaultProps = {
  idKey: 'id',
  footer: null,
};

const getFooter = (topic, linkProps) => {
  if (topic === TOPIC.authors) {
    return (
      <Link route={ROUTES_NAMES.about} {...linkProps}>
        <Text id="sidebar.all-team" />
      </Link>
    );
  }
  return getTopicLink({ topic, ...linkProps });
};

const handleLangClick = Cookies.set.bind(null, LOCALE_COOKIE_NAME);

const mapStateToProps = (state, { lang }) => ({
  user: authSelectors.getUser(state),
  blocks: sidebarSelectors.getBlocks(state),
  data: sidebarSelectors.getData(state, lang),
});

const mapDispatchToProps = {
  logout: authActions.signOut,
};

const Sidebar = ({ blocks, data, router: { asPath }, toggleSidebar, close, user, logout }) => (
  <aside className="sidebar">
    <Clickable className="sidebar__icon-close" titleId="sidebar.close" onClick={toggleSidebar}>
      <Icon name="times" />
    </Clickable>

    <LocaleContext.Consumer>
      {lang => (
        <ul className="sidebar__langs">
          {LANGS.filter(({ id }) => id !== lang).map(({ id, label }) => (
            <li key={id} className="langs__item">
              <Link route={getLocaleSwitchUrl(asPath, id)} params={{ lang: id }}>
                <Clickable onClick={handleLangClick.bind(null, id)}>
                  <span>{label}</span>
                </Clickable>
              </Link>
            </li>
          ))}
        </ul>
      )}
    </LocaleContext.Consumer>

    <div className="sidebar__about-label">
      <Link route={ROUTES_NAMES.about} onMouseUp={close}>
        <Text id="sidebar.about" />
      </Link>
    </div>

    {user && (
      // FIXME
      <div className="sidebar__about-label">
        <Clickable className="wir-link" onClick={logout}>
          <Text id="auth.signOut" />
        </Clickable>
      </div>
    )}

    {blocks.map(({ topic, tags }) => (
      <SidebarSection
        key={topic}
        title={<Text id={`topic.${topic}_essentials`} />}
        data={tags.map(tagId => data.tags[tagId])}
        renderItem={tag => getTagLink({ tag, onMouseUp: close })}
        footer={getFooter(topic, { onMouseUp: close })}
      />
    ))}
  </aside>
);

Sidebar.propTypes = {
  router: PropTypes.shape({
    asPath: PropTypes.string.isRequired,
  }).isRequired,
  toggleSidebar: PropTypes.func.isRequired,
  close: PropTypes.func.isRequired,
  blocks: PropTypes.arrayOf(
    PropTypes.shape({
      topic: PropTypes.oneOf(TOPICS).isRequired,
      tags: IdsArray.isRequired,
    })
  ).isRequired,
  data: PropTypes.shape({
    tags: TagsById.isRequired,
  }).isRequired,
  user: UserShape,
  logout: PropTypes.func.isRequired,
};

Sidebar.defaultProps = {
  user: null,
};

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(withRouter(Sidebar));
