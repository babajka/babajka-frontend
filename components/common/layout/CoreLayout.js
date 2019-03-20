import React, { useRef } from 'react';
import PropTypes from 'prop-types';
import cn from 'classnames';
import ScrollToTop from 'react-scroll-up';

import Icon from 'components/common/ui/Icon';
import Clickable from 'components/common/Clickable';

import useBoolean from 'hooks/useBoolean';
import useComponentSize from 'hooks/useComponentSize';

import { VALID_LOCALES } from 'constants';

import Header from './Header';
import Footer from './Footer';
import Sidebar from './Sidebar';

import 'styles.scss';
import 'styles/src/layout/layout.scss';

const SIDEBAR_HEIGHT = 3300;

const CoreLayout = ({ children, hideFooter, lang }) => {
  const [sidebarActive, toggleSidebar] = useBoolean(false);
  const rootEl = useRef(null);
  const { height } = useComponentSize(rootEl, children);

  return (
    <div id="wir-root" className="wir-root" ref={rootEl}>
      <div className="wir-space">
        <Header toggleSidebar={toggleSidebar} />

        <div className="wir-content">{children}</div>

        {/* consider to omit this logic */}
        {!hideFooter && <Footer />}

        <Clickable
          tag="div"
          className={cn('wir-overlay', { 'wir-overlay--active': sidebarActive })}
          onClick={toggleSidebar}
        />
      </div>

      <Sidebar
        active={sidebarActive}
        toggleSidebar={toggleSidebar}
        long={!height || height > SIDEBAR_HEIGHT}
        lang={lang}
      />

      <div className="wir-up">
        <ScrollToTop showUnder={160} easing="easeInExpo" duration={500}>
          <Icon pack="r" name="arrow-alt-circle-up" className="wir-link" />
        </ScrollToTop>
      </div>
    </div>
  );
};

CoreLayout.propTypes = {
  children: PropTypes.node.isRequired,
  hideFooter: PropTypes.bool,
  lang: PropTypes.oneOf(VALID_LOCALES).isRequired,
};

CoreLayout.defaultProps = {
  hideFooter: false,
};

export default CoreLayout;
