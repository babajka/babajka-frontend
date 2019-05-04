import 'styles/node_modules/normalize.css';
import 'styles.scss';
import 'styles/src/layout/layout.scss';

import React, { useRef } from 'react';
import PropTypes from 'prop-types';
import cn from 'classnames';
import ScrollToTop from 'react-scroll-up';

import Icon from 'components/common/ui/Icon';
import Clickable from 'lib/components/Clickable';

import useBoolean from 'hooks/useBoolean';
import useComponentSize from 'hooks/useComponentSize';

import { VALID_LOCALES } from 'constants';

import ScreenContext, { getScreen, getInitialContext } from './ScreenContext';
import Header from './Header';
import Footer from './Footer';
import Sidebar from './Sidebar';

const SIDEBAR_HEIGHT = 3300;

const CoreLayout = ({ children, hideFooter, lang, isMobile }) => {
  const [sidebarActive, toggleSidebar] = useBoolean(false);
  const rootEl = useRef(null);
  const { width, height } = useComponentSize(rootEl, children);
  const screen = getScreen(width, isMobile);

  return (
    <ScreenContext.Provider value={getInitialContext(screen)}>
      <div id="wir-root" className="wir-root" ref={rootEl}>
        <div className="wir-space">
          <Header toggleSidebar={toggleSidebar} />

          <div className="wir-content">
            <div className={`screen-${screen}`}>{children}</div>
          </div>

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
      <div id="modal-root" />
    </ScreenContext.Provider>
  );
};

CoreLayout.propTypes = {
  children: PropTypes.node.isRequired,
  hideFooter: PropTypes.bool,
  lang: PropTypes.oneOf(VALID_LOCALES).isRequired,
  isMobile: PropTypes.bool, // temp
};

CoreLayout.defaultProps = {
  hideFooter: false,
  isMobile: false,
};

export default CoreLayout;
