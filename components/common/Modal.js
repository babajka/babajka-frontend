import React, { Component } from 'react';
import ReactDOM from 'react-dom';
import PropTypes from 'prop-types';
import cn from 'classnames';

import Clickable from 'components/common/Clickable';
import Button from 'components/common/Button';
import Icon from 'components/common/Icon';

const Modal = ({ renderBody, renderFooter, footerClassName, toggle, title, isActive, small }) => (
  <div className={cn('modal', { 'is-active': isActive })}>
    <Clickable tag="div" className="modal-background" onClick={toggle} />
    <div className={cn('modal-card', { 'size-small': small })}>
      <header className="modal-card-head">
        <p className="modal-card-title has-text-primary">{title}</p>
        <Icon
          name="close"
          size="lg"
          className="has-text-primary is-hidden-desktop"
          aria-label="close"
          onClick={toggle}
        />
      </header>
      {renderBody && <div className="modal-card-body">{renderBody()}</div>}
      {renderFooter && (
        <footer className={cn('modal-card-foot', footerClassName)}>{renderFooter()}</footer>
      )}
    </div>
    <Button className="modal-close is-large is-hidden-mobile" aria-label="close" onClick={toggle} />
  </div>
);

Modal.propTypes = {
  isActive: PropTypes.bool.isRequired,
  toggle: PropTypes.func.isRequired,
  title: PropTypes.node.isRequired,
  renderBody: PropTypes.func,
  renderFooter: PropTypes.func,
  footerClassName: PropTypes.string,
  small: PropTypes.bool,
};

Modal.defaultProps = {
  small: false,
  renderBody: null,
  renderFooter: null,
  footerClassName: '',
};

export default class ModalPortal extends Component {
  constructor(props) {
    super(props);
    if (typeof window !== 'undefined') {
      this.el = document.createElement('div');
    }
  }

  componentDidMount() {
    this.modalRoot = document.getElementById('modal-root');
    this.modalRoot.appendChild(this.el);
  }

  componentWillUnmount() {
    this.modalRoot.removeChild(this.el);
  }

  render() {
    const modal = <Modal {...this.props} />;

    // there is no this.el on server
    if (typeof window === 'undefined') {
      return modal;
    }

    return ReactDOM.createPortal(modal, this.el);
  }
}
