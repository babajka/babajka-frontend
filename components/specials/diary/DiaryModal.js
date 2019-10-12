import './diaryModal.scss';

import React, { useEffect } from 'react';
import PropTypes from 'prop-types';
import cn from 'classnames';

import Clickable from 'components/common/Clickable';
import Image from 'components/common/Image';
import Modal from 'components/common/modal/Modal';
import Icon from 'components/common/ui/Icon';

import { DiaryModel } from 'utils/customPropTypes';
import { formatDate } from 'utils/formatters';
import fiberyRenderer from 'utils/fibery/renderer';

import { DATE_FORMAT } from 'constants';
import { DIARY_PICTURE_WIDTH } from 'constants/misc';

const DiaryModal = ({ diary, getNext, getPrev, fetchData, isNextAvailable, onClose }) => {
  // TO FIX: should not be called on first modal open.
  // Diary should be preserved (in case there're multiple.)
  useEffect(() => {
    fetchData();
  }, [fetchData]);
  const { author: { name, diaryImage } = {}, date, text } = diary;

  return (
    <Modal onClose={onClose}>
      <div className="diary-modal">
        {/* TODO: to make code below reusable. */}
        <div className="diary-modal__arrows diary-modal__arrows--top">
          <Clickable onClick={getPrev} linkStyle titleId="diary.previous">
            <Icon className="diary-modal__arrows--left" name="long-arrow-alt-left" />
          </Clickable>
          <Clickable disabled={!isNextAvailable} onClick={getNext} linkStyle titleId="diary.next">
            <Icon name="long-arrow-alt-right" />
          </Clickable>
        </div>

        <div className={cn('diary-modal__title', { 'diary-modal__title--with-image': diaryImage })}>
          <div className="diary-modal__date">{formatDate(date, DATE_FORMAT)}</div>
          <div className="diary-modal__name">{name}</div>
        </div>
        <div
          className={cn('diary-modal__image-container', {
            'diary-modal__image-container--no-image': !diaryImage,
          })}
        >
          {diaryImage && (
            <Image
              className="diary-modal__image"
              alt={name}
              sourceSizes={[DIARY_PICTURE_WIDTH]}
              baseUrl={diaryImage}
              mode="x"
            />
          )}
        </div>
        <div className="diary-modal__text">{fiberyRenderer(text.content)}</div>

        {/* TODO: to make code below reusable. */}
        <div className="diary-modal__arrows diary-modal__arrows--bottom">
          <Clickable onClick={getPrev} linkStyle titleId="diary.previous">
            <Icon className="diary-modal__arrows--left" name="long-arrow-alt-left" />
          </Clickable>
          <Clickable disabled={!isNextAvailable} onClick={getNext} linkStyle titleId="diary.next">
            <Icon name="long-arrow-alt-right" />
          </Clickable>
        </div>
      </div>
    </Modal>
  );
};

DiaryModal.propTypes = {
  diary: PropTypes.shape(DiaryModel).isRequired,
  getNext: PropTypes.func.isRequired,
  getPrev: PropTypes.func.isRequired,
  fetchData: PropTypes.func.isRequired,
  isNextAvailable: PropTypes.bool.isRequired,
  onClose: PropTypes.func.isRequired,
};

export default DiaryModal;
