import styles from 'styles/pages/xygame.module.scss';
import typography from 'styles/typography.module.scss';

import React, { useRef, useCallback, useState } from 'react';
import bem from 'bem-css-modules';
import cn from 'classnames';

import Header from 'components/layout/header/Header';
import Button from 'components/common/Button';
import Input from 'components/common/ui/Input';
import ShareButtons from 'components/social/ShareButtons';
import CardBlocksLayout from 'features/layout/card-blocks-layout';
import { MetaImage, MetaDescription, MetaKeywords, MetaTitle } from 'components/social/Metatags';

import useToggleSidebar from 'hooks/useToggleSidebar';

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
  inputType,
  question,
  response,
  keywords,
  images: { left, right, bottom, background, preview },
  colors: { background: colorBackground, text: colorText },
  suggestedArticles,
}) => {
  const inputRef = useRef();
  const [formValue, setValue] = useState('');
  const [error, setError] = useState(false);
  const [pending, setPending] = useState(false);

  const onChange = useCallback(({ target: { value } }) => {
    setValue(value);
    setError(false);
  }, []);

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

  const isInputValid = value => {
    if (inputType === 'AGE') {
      return Number(value) >= 1 && Number(value) <= 120; // TODO: Clarify max age.
    }
    return true;
  };

  const fetchOutcome = useCallback(async () => {
    try {
      setPending(true);
      setError(false);

      const { value } = inputRef.current;
      if (!isInputValid(value)) {
        throw new Error('Invalid input');
      }

      const data = await makeRequest(api.games.xy.getOutcome(slug), 'POST', {
        input: value,
      });
      setOutcome({ data, inputValue: value });
    } catch (err) {
      setOutcome(initialOutcome);
      setError(true);
    } finally {
      setPending(false);
    }
  }, []);

  const cleanupState = useCallback(() => {
    setOutcome(initialOutcome);
  }, []);

  return (
    <>
      <MetaTitle title={title} />
      <MetaDescription description={subtitle} />
      <MetaKeywords keywords={keywords} />
      <MetaImage url={preview} />

      <div
        className={b()}
        style={{
          'background-color': colorBackground,
          'background-image': `url(${background})`,
          color: colorText,
        }}
      >
        <Header toggleSidebar={useToggleSidebar()} color={colorText} />

        <div className={cn(typography['common-text'], b('wrapper'))}>
          <div className={b('header')}>
            <h1 className={cn(typography['common-title'], b('header-title'))}>{title}</h1>
            <h2 className={b('header-subtitle')}>{subtitle}</h2>
          </div>
          <div className={b('interactive')}>
            <div className={b('layout-vertical')}>
              <div className={b('layout-horizontal')}>
                <img className={b('image-left')} src={left} alt="img" />
                <div className={b('game')}>
                  {content.length === 0 && (
                    <>
                      <div className={b('question')}>{question}</div>

                      <div className={b('input-wrapper')} style={{ color: colorText }}>
                        <Input
                          ref={inputRef}
                          value={formValue}
                          onChange={onChange}
                          className={b('input')}
                          name="ageInput"
                          barColor={colorText}
                          type={inputType === 'AGE' && 'number'}
                          style={{ color: colorText }}
                        />
                      </div>

                      <Button
                        className={b('button', { inactive: !formValue || error })}
                        onClick={fetchOutcome}
                        pending={pending}
                        disabled={!formValue || error}
                      >
                        {!error && 'Адказаць'}
                        {error && 'Памылка :('}
                      </Button>
                    </>
                  )}

                  {content.length !== 0 && (
                    <>
                      <div className={b('response')}>{response.replace('{INPUT}', inputValue)}</div>
                      <div className={b('outcome')}>
                        <div>{fiberyToString(content)}</div>
                      </div>
                      <Button className={b('button')} onClick={cleanupState}>
                        Яшчэ раз
                      </Button>
                    </>
                  )}
                </div>
                <img className={b('image-right')} src={right} alt="img" />
              </div>
              <img className={b('image-bottom')} src={bottom} alt="img" />
            </div>
          </div>
          <div className={b('social')}>
            <ShareButtons basicText={`${title}\n\n${subtitle}`} />
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
    colors,
    keywords,
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
      colors,
      keywords,
      suggestedArticles: getLocalizedSuggested(suggestedArticles, LANG),
    },
  };
});

export default XYGamePage;
