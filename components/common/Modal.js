import React from 'react';
import PropTypes from 'prop-types';
import classNames from 'classnames';

import Clickable from 'components/common/Clickable';

const Modal = ({ renderBody, renderFooter, toggle, title, isActive }) => (
  <div className={classNames('modal', { 'is-active': isActive })}>
    <Clickable tag="div" className="modal-background" onClick={toggle} />
    <div className="modal-card">
      <header className="modal-card-head">
        <p className="modal-card-title has-text-primary">{title}</p>
      </header>
      <div className="modal-card-body">{renderBody()}</div>
      {renderFooter && <footer className="modal-card-foot">{renderFooter()}</footer>}
    </div>
    <button className="modal-close is-large" aria-label="close" onClick={toggle} />
  </div>
);

Modal.propTypes = {
  renderBody: PropTypes.func.isRequired,
  renderFooter: PropTypes.func,
  isActive: PropTypes.bool.isRequired,
  toggle: PropTypes.func.isRequired,
  title: PropTypes.string.isRequired,
};

Modal.defaultProps = {
  renderFooter: null,
};

export default Modal;
