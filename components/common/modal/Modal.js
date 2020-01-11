import './modal.scss';

import React, { useLayoutEffect, useState } from 'react';
import PropTypes from 'prop-types';

import Icon from 'components/common/ui/Icon';
import Portal from 'components/common/Portal';
import Clickable from 'components/common/Clickable';

export const MODAL_ROOT_ID = 'wir-modal-root';

const DEFAULT_TOP_MARGIN = 0;

const Modal = ({ children, onClose }) => {
  const [margin, setState] = useState(DEFAULT_TOP_MARGIN);
  useLayoutEffect(() => {
    setState(DEFAULT_TOP_MARGIN + window.pageYOffset);
  }, []);
  return (
    <Portal id={MODAL_ROOT_ID}>
      <div className="wir-modal">
        <Clickable tag="div" className="wir-modal__background" onClick={onClose} />
        <div className="wir-modal__content" style={{ marginTop: margin }}>
          <Clickable className="wir-modal__close" onClick={onClose}>
            <Icon name="times" />
          </Clickable>
          {children}
        </div>
      </div>
    </Portal>
  );
};

Modal.propTypes = {
  children: PropTypes.node.isRequired,
  onClose: PropTypes.func.isRequired,
};

export default Modal;