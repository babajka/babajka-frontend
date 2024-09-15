import styles from 'styles/pages/xygame.module.scss';
import typography from 'styles/typography.module.scss';

import React, { useRef, useCallback, useState } from 'react'; // useState, useCallback
import bem from 'bem-css-modules';
import cn from 'classnames';

import Header from 'components/layout/header/Header';
import Button from 'components/common/Button';
import Input from 'components/common/ui/Input';
import ShareButtons from 'components/social/ShareButtons';
// import TextWithSeparator from 'lib/components/TextWithSeparator';
import CardBlocksLayout from 'features/layout/card-blocks-layout';
import { MetaImage, MetaDescription } from 'components/social/Metatags';

import useToggleSidebar from 'hooks/useToggleSidebar';

import fiberyToString from 'utils/fibery/toString';
import { makeRequest, catchServerSideErrors } from 'utils/request';
import { getLocalizedSuggested } from 'utils/getters';

import api from 'constants/api';
import { SUGGESTED_ARTICLES_ENABLED } from 'constants/misc';

const b = bem(styles);

// XY Games are currently implemented to only support Belarusian language.
const LANG = 'be';

const XYGamePage = ({
  title,
  subtitle,
  //   inputType,
  question,
  //   response,
  images: { left, right, bottom },
  colors: { colorBackgroundOuter, colorBackgroundInner, colorText },
  suggestedArticles,
}) => {
  const textStr = subtitle ? fiberyToString(subtitle, { useBreak: true }) : '';

  const inputRef = useRef();
  const [formValue] = useState('');

  const onSubmit = useCallback();

  return (
    <>
      <MetaImage url={bottom} />
      <MetaDescription description={subtitle} />
      <div className={b()}>
        <Header toggleSidebar={useToggleSidebar()} color={colorText} />

        <div
          className={cn(typography['common-text'], b('wrapper'))}
          style={{ 'background-color': colorBackgroundOuter }}
        >
          <div className={b('header')}>
            <h1 className={b('header-title')}>{title}</h1>
            <h2 className={b('header-subtitle')}>{subtitle}</h2>
          </div>
          <div className={b('interactive')} style={{ 'background-color': colorBackgroundInner }}>
            <div className={b('layout-vertical')}>
              <div className={b('layout-horizontal')}>
                <div className={b('image-left')}>
                  <img src={left} alt="img" />
                </div>
                <div className={b('game')}>
                  <div className={b('question')}>{question}</div>
                  <form onSubmit={onSubmit}>
                    <Input
                      ref={inputRef}
                      className={b('input')}
                      // aria-labelledby="footer-subscribe"
                      name="ageInput"
                      value={formValue}
                    />
                    <Button className={b('button', { inactive: true })}>Адказаць</Button>
                  </form>
                </div>
                <div className={b('image-right')}>
                  <img src={right} alt="img" />
                </div>
              </div>
              <div className={b('image-bottom')}>
                <img src={bottom} alt="img" />
              </div>
            </div>
            <p>{left}</p>
            <p>{right}</p>
            {/* <Button className={b('btn')} onClick={fetchCookie} pending={pending}>
              {!error && `Атрымаць${initial ? '' : ' яшчэ адно'}`}
              {error && 'Памылка, паспрабуйце яшчэ'}
            </Button> */}
          </div>
          <div className={b('social')}>
            <ShareButtons className={b('share')} basicText={`${title}\n\n${textStr}`} />
          </div>
        </div>
      </div>
      {SUGGESTED_ARTICLES_ENABLED && suggestedArticles && (
        <CardBlocksLayout blocks={suggestedArticles.blocks} data={suggestedArticles.data} />
      )}
    </>
  );
};

XYGamePage.getLayoutProps = ({ title }) => ({
  noLocTitle: title,
  hideHeader: true,
});

export const getServerSideProps = catchServerSideErrors(async ({ query: { slug } }) => {
  const {
    title,
    subtitle,
    inputType,
    question,
    response,
    images,
    // color,
    suggestedArticles = null,
  } = await makeRequest(api.games.xy.get(slug));

  return {
    props: {
      title: title[LANG],
      subtitle: subtitle[LANG],
      inputType,
      question: question[LANG],
      response: response[LANG],
      images,
      colors: {
        colorBackgroundOuter: '#332828',
        colorBackgroundInner: '#423636',
        colorText: '#ffffff',
      },
      suggestedArticles: getLocalizedSuggested(suggestedArticles, LANG),
    },
  };
});

export default XYGamePage;
