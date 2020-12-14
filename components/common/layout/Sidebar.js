import React, { useEffect, useState, useMemo } from 'react';
import PropTypes from 'prop-types';
import { useRouter } from 'next/router';
import Cookies from 'js-cookie';
import bem from 'bem-css-modules';
import cn from 'classnames';

import Icon from 'components/common/ui/Icon';
import Link from 'components/common/Link';
import Text from 'components/common/Text';
import Clickable from 'components/common/Clickable';

import { getTagLink, getTopicLink } from 'utils/features/tags';
import { makeRequest } from 'utils/request';
import { localizeData } from 'utils/getters';

import { LANGS } from 'constants';
import { LOCALE_COOKIE_NAME } from 'constants/server';
import { ROUTES_NAMES } from 'routes';
import api from 'constants/api';
import styles from './sidebar.module.scss';

const getLocaleSwitchUrl = (path, lang) => {
  const parts = path.split('/');
  parts[1] = lang;
  return parts.join('/');
};
const b = bem(styles);

const SidebarSection = ({ title, data, idKey, renderItem, footer }) => (
  <section className={b('section')}>
    <ul className={b('section-list')}>
      <li className={cn(b('section-list-item'), b('section-title'))}>{title}</li>
      {data.map(item => (
        <li key={item[idKey]} className={b('section-list-item')}>
          {renderItem(item)}
        </li>
      ))}
    </ul>
    {footer && <span className={b('section-link-to-all')}>{footer}</span>}
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
  return getTopicLink({ topic, ...linkProps });
};

const handleLangClick = lang => {
  Cookies.set(LOCALE_COOKIE_NAME, lang, { secure: !process.env.isDev });
};

const initialState = {
  blocks: [],
  data: {},
};

const Sidebar = ({ lang, toggleSidebar, close }) => {
  const router = useRouter();
  const [{ blocks, data }, setState] = useState(initialState);
  useEffect(() => {
    makeRequest(api.storage.getSidebar).then(setState);
  }, []);

  const localizedData = useMemo(() => localizeData(data, lang), [data, lang]);

  return (
    <aside className={b()}>
      <Clickable className={b('icon-close')} titleId="sidebar.close" onClick={toggleSidebar}>
        <Icon name="times" />
      </Clickable>

      <ul className={b('langs')}>
        {LANGS.filter(({ id }) => id !== lang).map(({ id, label }) => (
          <li key={id}>
            <Link route={getLocaleSwitchUrl(router.asPath, id)} params={{ lang: id }}>
              <Clickable onClick={handleLangClick.bind(null, id)}>
                <span>{label}</span>
              </Clickable>
            </Link>
          </li>
        ))}
      </ul>

      <div className={b('about-label')}>
        <Link route={ROUTES_NAMES.about} onMouseUp={close}>
          <Text id="sidebar.about" />
        </Link>
      </div>

      {blocks.map(({ topic, tags }) => (
        <SidebarSection
          key={topic}
          title={<Text id={`topic.${topic}_essentials`} />}
          data={tags.map(tagId => localizedData.tags[tagId])}
          renderItem={tag => getTagLink({ tag, onMouseUp: close })}
          footer={getFooter(topic, { onMouseUp: close })}
        />
      ))}
    </aside>
  );
};

export default Sidebar;
