import './sidebar.scss';

import React from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import { withRouter } from 'next/router';
import Cookies from 'js-cookie';
import cn from 'classnames';

import Icon from 'components/common/ui/Icon';
import Link from 'components/common/Link';
import Text from 'components/common/Text';
import Clickable from 'lib/components/Clickable';
import LocaleContext from 'components/common/LocaleContext';
import LinkWrapper from 'components/common/ui/LinkWrapper';

import { sidebarSelectors } from 'redux/ducks/sidebar';
import { TagShape } from 'utils/customPropTypes';
import { renderTag } from 'utils/tags';

import { TOPICS } from 'constants/home';
import { LOCALE_COOKIE_NAME } from 'constants/server';
import { ROUTES_NAMES } from 'routes';
import { LANGS } from 'constants';

const getLocaleSwitchUrl = (path, lang) => {
  const parts = path.split('/');
  parts[1] = lang;
  return parts.join('/');
};

const SidebarSection = ({ title, data, idKey, renderItem, renderFooter }) => (
  <section className="sidebar__section">
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
  idKey: 'id',
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

const mapStateToProps = (state, { lang }) => ({
  blocks: sidebarSelectors.getBlocks(state),
  data: sidebarSelectors.getData(state, lang),
});

const Sidebar = ({ blocks, data, router: { asPath }, active, toggleSidebar, long }) => (
  <div className={cn('wir-sidebar', { 'wir-sidebar--expanded': active })}>
    <aside className="sidebar">
      <Clickable className="sidebar__icon-close" onClick={toggleSidebar}>
        <Icon name="times" />
      </Clickable>

      <LocaleContext.Consumer>
        {lang => (
          <ul className="sidebar__langs">
            {LANGS.filter(({ id }) => id !== lang).map(({ id, label }) => (
              <li key={id} className="langs__item">
                <Link
                  route={getLocaleSwitchUrl(asPath, id)}
                  params={{ lang: id }}
                  render={() => (
                    <LinkWrapper onClick={handleLangClick.bind(null, id)}>
                      <span>{label}</span>
                    </LinkWrapper>
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

      {!long && (
        <>
          <SidebarSection title="Short Sidebar" data={[]} />
        </>
      )}

      {long && (
        <>
          {blocks.map(({ topic, tags }) => (
            <SidebarSection
              key={topic}
              title={<Text id={`topic.${topic}_essentials`} />}
              data={tags.map(tagId => data.tags[tagId])}
              renderItem={tag => <Link>{renderTag(tag)}</Link>}
              renderFooter={FOOTER_BY_TOPIC[topic]}
            />
          ))}
        </>
      )}
    </aside>
  </div>
);

Sidebar.propTypes = {
  router: PropTypes.shape({
    asPath: PropTypes.string.isRequired,
  }).isRequired,
  active: PropTypes.bool.isRequired,
  toggleSidebar: PropTypes.func.isRequired,
  long: PropTypes.bool.isRequired,
  blocks: PropTypes.arrayOf(
    PropTypes.shape({
      topic: PropTypes.oneOf(TOPICS).isRequired,
      tags: PropTypes.arrayOf(PropTypes.string).isRequired,
    })
  ).isRequired,
  data: PropTypes.shape({
    tags: PropTypes.objectOf(TagShape).isRequired,
  }).isRequired,
};

export default connect(mapStateToProps)(withRouter(Sidebar));
