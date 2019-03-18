import React, { useRef } from 'react';
import PropTypes from 'prop-types';
import cn from 'classnames';

import Clickable from 'components/common/Clickable';

import useBoolean from 'hooks/useBoolean';
import useComponentSize from 'hooks/useComponentSize';

import Header from './Header';
import Footer from './Footer';
import Sidebar from './Sidebar';

import 'styles.scss';
import 'styles/src/layout/layout.scss';

const SIDEBAR_HEIGHT = 3300;

const CoreLayout = ({ children, hideFooter }) => {
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
      />

      <div className="wir-up">{/* <Icon /> */}</div>
    </div>
  );
};

CoreLayout.propTypes = {
  children: PropTypes.node.isRequired,
  hideFooter: PropTypes.bool,
};

CoreLayout.defaultProps = {
  hideFooter: false,
};

export default CoreLayout;
