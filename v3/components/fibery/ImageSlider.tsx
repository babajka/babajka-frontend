'use client';

import { Navigation, Pagination } from 'swiper/modules';
import { Swiper, SwiperSlide } from 'swiper/react';

import 'swiper/css';
import 'swiper/css/navigation';
import 'swiper/css/pagination';

export type SliderImage = { src: string; alt?: string; title?: string };

type ImageSliderProps = { images: SliderImage[]; description?: string };

/** Legacy components/common/ui/ImageSlider.js. */
const ImageSlider = ({ images, description }: ImageSliderProps) => (
  <div className="[--swiper-navigation-color:var(--color-grey)] [--swiper-navigation-size:20px] [--swiper-pagination-bottom:10px] [--swiper-theme-color:var(--color-primary)] touch:[--swiper-navigation-size:24px] tablet:[--swiper-navigation-size:30px] tablet-lg:[--swiper-navigation-size:36px] desktop:[--swiper-navigation-size:40px]">
    <Swiper modules={[Navigation, Pagination]} loop navigation pagination={{ clickable: true }}>
      {images.map(({ src, alt, title }) => (
        <SwiperSlide key={src}>
          <div className="mb-10 flex flex-col items-center justify-between">
            {/* eslint-disable-next-line @next/next/no-img-element -- sized by its content */}
            <img
              className="block h-auto max-h-[500px] w-auto max-w-[240px] grow object-contain touch:max-w-[384px] tablet:max-w-[499.2px] tablet-lg:max-w-[654.4px] desktop:max-w-[816px]"
              src={src}
              alt={alt ?? ''}
            />
            <span className="text-center text-sm leading-[18px]">{title}</span>
          </div>
        </SwiperSlide>
      ))}
    </Swiper>
    {description && <span className="text-sm leading-4">{description}</span>}
  </div>
);

export default ImageSlider;
