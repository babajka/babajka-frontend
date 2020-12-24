import styles from 'styles/pages/game.module.scss';
import typography from 'styles/typography.module.scss';

import React, { useState, useCallback } from 'react';
import bem from 'bem-css-modules';
import cn from 'classnames';

import Header from 'components/common/layout/header/Header';
import Button from 'components/common/Button';
import ShareButtons from 'components/social/ShareButtons';
import TextWithSeparator from 'lib/components/TextWithSeparator';
import CardsLayout from 'components/articles/layout/CardsLayout';

import useToggleSidebar from 'hooks/useToggleSidebar';

import fiberyToString from 'utils/fibery/toString';
import { makeRequest, catchServerErrors } from 'utils/request';
import api from 'constants/api';
import { NY2021 } from 'constants';
import { getTagLink } from 'utils/features/tags';
import { getLocalizedTag } from 'utils/getters';
import { TEN_MINUTES } from 'constants/misc';

const b = bem(styles);

const initialCookie = {
  initial: true,
};

const Game2021page = ({ title, description, suggestedArticles }) => {
  const [pending, setPending] = useState(false);
  const [error, setError] = useState(false);
  const [{ author, authorTag, text, initial }, setCookie] = useState(initialCookie);

  // TODO: use swr
  const fetchCookie = useCallback(async () => {
    try {
      setPending(true);
      setError(false);
      const data = await makeRequest(api.games.fortune.getCookie(NY2021));
      if (data.authorTag) {
        data.authorTag = getLocalizedTag(data.authorTag, 'be');
      }
      setCookie(data);
    } catch (err) {
      setCookie(initialCookie);
      setError(true);
    } finally {
      setPending(false);
    }
  }, []);
  return (
    <>
      <div className={b()}>
        <Header toggleSidebar={useToggleSidebar()} />

        <div className={cn('wir-content-padding', typography['common-text'], b('wrapper'))}>
          <div className={b('content')}>
            <span>Прадказанне</span>
            <h1 className={typography['common-title']}>{title}</h1>
            {initial ? (
              <span className={b('text')}>{description}</span>
            ) : (
              <>
                <span className={b('result-text')}>
                  <TextWithSeparator
                    text={fiberyToString(text.content, { useBreak: true })}
                    symbol={'\n'}
                  />
                </span>
                <div className={b('author-wrapper')}>
                  {!authorTag && <span className={b('author')}>{author}</span>}
                  {!!authorTag && getTagLink({ tag: authorTag, dark: true, target: '_blank' })}
                </div>
              </>
            )}
            <Button className={b('btn')} onClick={fetchCookie} pending={pending}>
              {!error && `Атрымаць${initial ? '' : ' яшчэ адно'}`}
              {error && 'Памылка, паспрабуйце яшчэ'}
            </Button>
            <ShareButtons className={b('share')} basicText={title} />
          </div>
        </div>
      </div>
      {suggestedArticles && (
        <CardsLayout blocks={suggestedArticles.blocks} data={suggestedArticles.data} />
      )}
    </>
  );
};

Game2021page.getLayoutProps = ({ title }) => ({
  noLocTitle: title,
  hideHeader: true,
});

const url = api.games.fortune.get(NY2021);

export const getStaticProps = catchServerErrors(async () => {
  const { title, description, suggestedArticles = null } = await makeRequest(url);
  return {
    props: {
      title,
      description: fiberyToString(description),
      suggestedArticles,
    },
    revalidate: TEN_MINUTES,
  };
});

export default Game2021page;
