import React from 'react';
import PropTypes from 'prop-types';

import Portal from 'components/common/Portal';
import Clickable from 'components/common/Clickable';

export const MODAL_ROOT_ID = 'modal-root';

const Modal = ({ children, onClose }) => (
  <Portal id={MODAL_ROOT_ID}>
    <div className="modal is-active is-clipped">
      <Clickable tag="div" className="modal-background" onClick={onClose} />
      <div className="modal-content">{children}</div>
      <Clickable className="modal-close is-large" aria-label="close" onClick={onClose} />
    </div>
  </Portal>
);

Modal.propTypes = {
  children: PropTypes.node.isRequired,
  onClose: PropTypes.func.isRequired,
};

export default Modal;
