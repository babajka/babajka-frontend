import './layout.scss';

import React from 'react';
import PropTypes from 'prop-types';
import cn from 'classnames';
import ScrollToTop from 'react-scroll-up';

import Icon from 'components/common/ui/Icon';
import Clickable from 'components/common/Clickable';
import { MODAL_ROOT_ID } from 'components/common/modal/Modal';

import useBoolean from 'hooks/useBoolean';
import { LangType } from 'utils/customPropTypes';

import Header from './Header';
import Footer from './Footer';
import Sidebar from './Sidebar';

const CoreLayout = ({ children, hideFooter, hideSidebar, lang }) => {
  const [sidebarActive, toggleSidebar, setState] = useBoolean(false);
  return (
    <>
      <div
        id="wir-root"
        className={cn('wir-root', { 'wir-root--sidebar-expanded': sidebarActive })}
      >
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
          <nav className={cn('wir-sidebar', { 'wir-sidebar--expanded': sidebarActive })}>
            <Sidebar toggleSidebar={toggleSidebar} close={() => setState(false)} lang={lang} />
          </nav>
        )}

        <div className="wir-up">
          <ScrollToTop showUnder={160} easing="easeInExpo" duration={500}>
            <Icon pack="r" name="arrow-alt-circle-up" className="wir-link" />
          </ScrollToTop>
        </div>
      </div>
      <div id={MODAL_ROOT_ID} />
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
