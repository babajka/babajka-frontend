import React from 'react';
import PropTypes from 'prop-types';
import Head from 'next/head';

import { LangType } from 'utils/customPropTypes';
import { LOCALE_CODE } from 'constants';
import { DEFAULT_KEYWORDS } from 'constants/social';

import { APPLE_TOUCH_ICON } from 'constants/assets';

export const MetaTitle = ({ title, type }) => (
  <Head>
    <title>{title} | Wir.by</title>
    <meta key="meta-title" name="title" content={title} />
    <meta key="meta-title-fb" property="og:title" content={title} />
    <meta key="meta-type-fb" property="og:type" content={type} />
    <meta key="meta-title-twi" name="twitter:title" content={title} />
  </Head>
);

MetaTitle.propTypes = {
  title: PropTypes.string.isRequired,
  type: PropTypes.oneOf(['website', 'article']),
};

MetaTitle.defaultProps = {
  type: 'website',
};

export const MetaDescription = ({ description }) => (
  <Head>
    <meta key="meta-description" name="description" content={description} />
    <meta key="meta-description-fb" property="og:description" content={description} />
    <meta key="meta-description-twi" name="twitter:description" content={description} />
  </Head>
);

export const DEFAULT_IMAGE =
  'https://res.cloudinary.com/wir-by/image/upload/v1580048273/production/meta/meta-large.png';

export const MetaImage = ({ url, small }) => (
  <Head>
    <meta key="meta-image-fb" property="og:image" content={url} />
    <meta key="meta-twi-card" name="twitter:card" content={small ? '' : 'summary_large_image'} />
    <meta key="meta-image-twi" name="twitter:image" content={url} />
  </Head>
);

MetaImage.propTypes = {
  small: PropTypes.bool,
  url: PropTypes.string,
};

MetaImage.defaultProps = {
  small: false,
  url: DEFAULT_IMAGE,
};

export const MetaLocale = ({ locale, altLocales }) => (
  <Head>
    <meta key="meta-locale-fb" property="og:locale" content={LOCALE_CODE[locale]} />
    {altLocales.map((altLoc, index) => (
      <meta
        // eslint-disable-next-line react/no-array-index-key
        key={`meta-locale-fb-${index}`}
        property="og:locale:alternate"
        content={LOCALE_CODE[altLoc]}
      />
    ))}
  </Head>
);

MetaLocale.propTypes = {
  locale: LangType.isRequired,
  altLocales: PropTypes.arrayOf(LangType),
};

MetaLocale.defaultProps = {
  altLocales: [],
};

export const MetaKeywords = ({ keywords }) => (
  <Head>
    <meta key="keywords" name="keywords" content={keywords} />
  </Head>
);

MetaKeywords.propTypes = {
  keywords: PropTypes.string,
};

MetaKeywords.defaultProps = {
  keywords: DEFAULT_KEYWORDS,
};

export const MetaArticleItems = ({ name, list, value }) => (
  <Head>
    {list.map((author, i) => (
      // eslint-disable-next-line react/no-array-index-key
      <meta key={`meta-${name}-${i}`} property={`article:${name}`} content={author} />
    ))}
    {value && <meta key={`meta-${name}`} property={`article:${name}`} content={value} />}
  </Head>
);

MetaArticleItems.propTypes = {
  name: PropTypes.string.isRequired,
  value: PropTypes.string,
  list: PropTypes.arrayOf(PropTypes.string),
};

MetaArticleItems.defaultProps = {
  list: [],
  value: null,
};

export const MetaAppleTouchDevices = ({ title }) => (
  <Head>
    <link rel="apple-touch-icon" href={APPLE_TOUCH_ICON} />
    <meta name="apple-mobile-web-app-title" content={title} />
  </Head>
);

const Metatags = ({ url }) => (
  <Head>
    {!process.env.isProd && <meta name="robots" content="noindex" />}
    {/* Basic metatags */}
    <meta charSet="utf-8" />
    <meta httpEquiv="X-UA-Compatible" content="IE=edge" />
    <meta name="viewport" content="initial-scale=1.0, width=device-width" />
    <meta name="theme-color" content="#1a9582" />
    {/* Metatags generated by metatags.io */}
    <meta property="og:url" content={url} />
    <meta name="twitter:site" content="@wir_by" />
    <meta name="twitter:creator" content="@wir_by" />
    <meta name="twitter:url" content={url} />
    <meta property="fb:app_id" content="332376853960377" />
  </Head>
);

Metatags.propTypes = {
  url: PropTypes.string.isRequired,
};

export default Metatags;
