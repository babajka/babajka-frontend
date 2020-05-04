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
    nextEl: '.swiper-button-next',
    prevEl: '.swiper-button-prev',
  },
};

const ImageSlider = ({ images, description }) => (
  <div className={b()}>
    <Swiper {...DEFAULT_PARAMS}>
      {images.map(({ src, alt, title }) => (
        <div key={src} className={b('slide')}>
          <img className={b('slide-image')} src={src} alt={alt} />
          <span className={b('slide-description')}>{title}</span>
        </div>
      ))}
    </Swiper>
    {description && <span className={b('subtitle')}>{description}</span>}
  </div>
);

ImageSlider.propTypes = {
  images: PropTypes.arrayOf(
    PropTypes.shape({
      alt: PropTypes.string.isRequired,
      src: PropTypes.string.isRequired,
      title: PropTypes.string.isRequired,
    })
  ).isRequired,
  description: PropTypes.string,
};

export default ImageSlider;
