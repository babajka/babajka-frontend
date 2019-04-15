import React from 'react';

import Icon from 'components/common/ui/Icon';

import 'styles/src/cards/video.scss';

const VideoCard = ({ title, author, covers: { horizontal } }) => (
  <>
    <div className="video__cover-wrapper">
      <img className="video__cover" src={horizontal} alt={title} />
      <div className="video__cover-gradient" />
    </div>
    <Icon className="video__icon" name="play" />
    <div className="video__content">
      <div className="video__title">{title}</div>
      <div className="video__author">{author}</div>
    </div>
  </>
);

export default VideoCard;
