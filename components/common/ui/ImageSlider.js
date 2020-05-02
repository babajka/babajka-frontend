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

const ImageSlider = ({ images }) => (
  <div className={b()}>
    <Swiper {...DEFAULT_PARAMS}>
      {/* TODO: reformat to better structure */}
      {images.map(({ attrs: { src, alt, title } }) => (
        <div className={b('slide')}>
          <img className={b('slide-image')} src={src} alt={alt} />
          <span className={b('slide-description')}>{title}</span>
        </div>
      ))}
    </Swiper>
    {/* <span className={b('subtitle')}>{subtitle}</span> */}
  </div>
);

ImageSlider.propTypes = {
  images: PropTypes.arrayOf(PropTypes.object).isRequired,
};

export default ImageSlider;
