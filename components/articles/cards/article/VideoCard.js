import './video.scss';

import React from 'react';

import Icon from 'components/common/ui/Icon';

const VideoCard = ({ title, author, images }) => (
  <>
    <div className="video__cover-wrapper">
      <img className="video__cover" src={images.horizontal} alt={title} />
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
