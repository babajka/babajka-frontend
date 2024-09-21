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

import fiberyRenderer from 'utils/fibery/renderer';
import fiberyToString from 'utils/fibery/toString';
import { makeRequest, catchServerSideErrors } from 'utils/request';
import { getLocalizedSuggested } from 'utils/getters';

import api from 'constants/api';
import { SUGGESTED_ARTICLES_ENABLED } from 'constants/misc';

const b = bem(styles);

// XY Games are currently implemented to only support Belarusian language.
const LANG = 'be';
const initialOutcome = {
  data: {
    text: {
      be: {
        content: [],
      },
    },
  },
  inputValue: '',
};

const XYGamePage = ({
  slug,
  title,
  subtitle,
  //   inputType,
  question,
  response,
  images: { left, right, bottom },
  colors: { colorBackgroundOuter, colorBackgroundInner, colorText },
  suggestedArticles,
}) => {
  const textStr = subtitle ? fiberyToString(subtitle, { useBreak: true }) : '';

  const inputRef = useRef();
  const [formValue, setValue] = useState('');

  const onChange = useCallback(({ target: { value } }) => {
    setValue(value);
  }, []);

  // const onSubmit = useCallback();

  const [
    {
      data: {
        text: {
          be: { content },
        },
      },
      inputValue,
    },
    setOutcome,
  ] = useState(initialOutcome);

  // TODO: use swr
  const fetchOutcome = useCallback(async () => {
    try {
      const data = await makeRequest(
        `https://api.wir.by/api/games/xy/getOutcome/${slug}?input=${inputRef.current.value}`
      ); // api.games.xy.getOutcome(slug, inputRef.current.value));
      setOutcome({ data, inputValue: inputRef.current.value });
    } catch (err) {
      // setCookie(initialCookie);
      // setError(true);
    } finally {
      // setPending(false);
    }
  }, []);

  return (
    <>
      <MetaImage url={bottom} />
      <MetaDescription description={subtitle} />
      <div className={b()} style={{ 'background-color': colorBackgroundOuter }}>
        <Header toggleSidebar={useToggleSidebar()} color={colorText} />

        <div
          className={cn(typography['common-text'], b('wrapper'))}
          style={{ 'background-color': colorBackgroundOuter, color: colorText }}
        >
          <div className={b('header')}>
            <h1 className={cn(typography['common-title'], b('header-title'))}>{title}</h1>
            <h2 className={b('header-subtitle')}>{subtitle}</h2>
          </div>
          <div className={b('interactive')} style={{ 'background-color': colorBackgroundInner }}>
            <div className={b('layout-vertical')}>
              <div className={b('layout-horizontal')}>
                <div className={b('image-left')}>
                  <img src={left} alt="img" />
                </div>
                <div className={b('game')}>
                  {content.length === 0 && (
                    <>
                      <div className={b('question')}>{question}</div>

                      <div className={b('input-wrapper')}>
                        <Input
                          ref={inputRef}
                          value={formValue}
                          onChange={onChange}
                          className={b('input')}
                          // aria-labelledby="footer-subscribe"
                          name="ageInput"
                          barColor={colorText}
                        />
                      </div>

                      <Button
                        className={b('button', { inactive: !formValue })}
                        onClick={fetchOutcome}
                      >
                        Адказаць
                      </Button>
                    </>
                  )}

                  {content.length !== 0 && (
                    <>
                      <div className={b('response')}>{response.replace('{INPUT}', inputValue)}</div>
                      <div className={b('outcome')}>{fiberyRenderer(content)}</div>
                    </>
                  )}
                </div>
                <div className={b('image-right')}>
                  <img src={right} alt="img" />
                </div>
              </div>
              <img className={b('image-bottom')} src={bottom} alt="img" />
            </div>
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
      slug,
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
