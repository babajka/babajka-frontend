import React from 'react';
import PropTypes from 'prop-types';
import bem from 'bem-css-modules';
import Swiper from 'react-id-swiper';

import styles from './imageSlider.module.scss';

const b = bem(styles);

const DEFAULT_PARAMS = {
  loop: true,
  pagination: {
    el: '.swiper-pagination',
    clickable: true,
  },
  navigation: {
    nextEl: `.swiper-button-next.${b('button-navigation')}`,
    prevEl: `.swiper-button-prev.${b('button-navigation')}`,
  },
};

const ImageSlider = ({ images, subtitle }) => (
  <div className={b()}>
    <Swiper {...DEFAULT_PARAMS}>
      {images.map(({ image, description }) => (
        <div className={b('slide')}>
          <img className={b('slide-image')} src={image} alt={description} />
          <span className={b('slide-description')}>{description}</span>
        </div>
      ))}
    </Swiper>
    <span className={b('subtitle')}>{subtitle}</span>
  </div>
);

ImageSlider.propTypes = {
  images: PropTypes.arrayOf(PropTypes.object).isRequired,
  description: PropTypes.string.isRequired,
};

export default ImageSlider;
