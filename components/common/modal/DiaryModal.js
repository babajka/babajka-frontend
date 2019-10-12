import React from 'react';
import PropTypes from 'prop-types';

import Modal from './Modal';

const DiaryModal = ({ children, onClose }) => <Modal onClose={onClose}>{children}</Modal>;

DiaryModal.propTypes = {
  children: PropTypes.node.isRequired,
  onClose: PropTypes.func.isRequired,
};

export default DiaryModal;
