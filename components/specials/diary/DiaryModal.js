import './diaryModal.scss';

import React from 'react';
import PropTypes from 'prop-types';
import cn from 'classnames';

import Image from 'components/common/Image';
import Modal from 'components/common/modal/Modal';

import fiberyRenderer from 'utils/fibery/renderer';
import { DIARY_PICTURE_WIDTH } from 'constants/misc';

import DiaryArrows from './DiaryArrows';

const DiaryModal = ({ name, date, image, text, onClose }) => (
  <Modal onClose={onClose}>
    <div className="diary-modal">
      <DiaryArrows inModal="top" />
      <div className={cn('diary-modal__title', { 'diary-modal__title--with-image': image })}>
        <div className="diary-modal__date">{date}</div>
        <div className="diary-modal__name">{name}</div>
      </div>
      <div
        className={cn('diary-modal__image-container', {
          'diary-modal__image-container--no-image': !image,
        })}
      >
        {image && (
          <Image
            className="diary-modal__image"
            alt={name}
            sourceSizes={[DIARY_PICTURE_WIDTH]}
            baseUrl={image}
            mode="x"
          />
        )}
      </div>
      <div className="diary-modal__text">{fiberyRenderer(text.content)}</div>
      <DiaryArrows inModal="bottom" />
    </div>
  </Modal>
);

DiaryModal.propTypes = {
  name: PropTypes.string.isRequired,
  image: PropTypes.string,
  text: PropTypes.shape({
    content: PropTypes.object,
  }),
  date: PropTypes.string.isRequired,
  onClose: PropTypes.func.isRequired,
};

DiaryModal.defaultProps = {
  image: null,
  text: {},
};

export default DiaryModal;
