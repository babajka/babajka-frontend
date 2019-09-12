import './layout.scss';

import React, { useRef } from 'react';
import PropTypes from 'prop-types';
import cn from 'classnames';
import ScrollToTop from 'react-scroll-up';

import Icon from 'components/common/ui/Icon';
import Clickable from 'components/common/Clickable';

import useBoolean from 'hooks/useBoolean';

import { VALID_LOCALES } from 'constants';

import Header from './Header';
import Footer from './Footer';
import Sidebar from './Sidebar';

// const SIDEBAR_HEIGHT = 3300;

const CoreLayout = ({ children, hideFooter, hideSidebar, lang }) => {
  const [sidebarActive, toggleSidebar] = useBoolean(false);
  const rootEl = useRef(null);

  return (
    <>
      <div id="wir-root" className="wir-root" ref={rootEl}>
        <div className="wir-space">
          <Header toggleSidebar={toggleSidebar} />

          <main className="wir-content">{children}</main>

          {!hideFooter && <Footer />}

          <Clickable
            tag="div"
            className={cn('wir-overlay', { 'wir-overlay--active': sidebarActive })}
            onClick={toggleSidebar}
          />
        </div>

        {(!hideSidebar || sidebarActive) && (
          <Sidebar
            active={sidebarActive}
            toggleSidebar={toggleSidebar}
            // FIXME
            // long={!height || height > SIDEBAR_HEIGHT}
            long
            lang={lang}
          />
        )}

        <div className="wir-up">
          <ScrollToTop showUnder={160} easing="easeInExpo" duration={500}>
            <Icon pack="r" name="arrow-alt-circle-up" className="wir-link" />
          </ScrollToTop>
        </div>
      </div>
      <div id="modal-root" />
    </>
  );
};

CoreLayout.propTypes = {
  children: PropTypes.node.isRequired,
  hideFooter: PropTypes.bool,
  hideSidebar: PropTypes.bool,
  lang: PropTypes.oneOf(VALID_LOCALES).isRequired,
};

CoreLayout.defaultProps = {
  hideFooter: false,
  hideSidebar: false,
};

export default CoreLayout;
