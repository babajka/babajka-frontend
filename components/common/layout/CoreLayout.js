import './layout.scss';

import React, { useRef } from 'react';
import PropTypes from 'prop-types';
import cn from 'classnames';
import ScrollToTop from 'react-scroll-up';

import Icon from 'components/common/ui/Icon';
import Clickable from 'components/common/Clickable';

import useBoolean from 'hooks/useBoolean';
import { LangType } from 'utils/customPropTypes';

import Header from './Header';
import Footer from './Footer';
import Sidebar from './Sidebar';

const CoreLayout = ({ children, hideFooter, hideSidebar, lang }) => {
  const [sidebarActive, toggleSidebar, setState] = useBoolean(false);
  const rootEl = useRef(null);

  return (
    <>
      <div
        id="wir-root"
        className={cn('wir-root', { 'wir-root--sidebar-expanded': sidebarActive })}
        ref={rootEl}
      >
        <div className="wir-space">
          <Header toggleSidebar={toggleSidebar} />

          <main className="wir-content">{children}</main>

          {!hideFooter && <Footer />}
        </div>

        {(!hideSidebar || sidebarActive) && (
          <nav className={cn('wir-sidebar', { 'wir-sidebar--expanded': sidebarActive })}>
            <div className="wir-sidebar__container">
              <Sidebar toggleSidebar={toggleSidebar} close={() => setState(false)} lang={lang} />
              <Clickable tag="div" className="wir-sidebar__shadowed-area" onClick={toggleSidebar} />
            </div>
          </nav>
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
  lang: LangType.isRequired,
};

CoreLayout.defaultProps = {
  hideFooter: false,
  hideSidebar: false,
};

export default CoreLayout;
