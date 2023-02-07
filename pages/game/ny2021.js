import styles from 'styles/pages/game.module.scss';
import typography from 'styles/typography.module.scss';

import React, { useState, useCallback } from 'react';
import bem from 'bem-css-modules';
import cn from 'classnames';

import Header from 'components/layout/header/Header';
import Button from 'components/common/Button';
import ShareButtons from 'components/social/ShareButtons';
import TextWithSeparator from 'lib/components/TextWithSeparator';
import CardBlocksLayout from 'features/layout/card-blocks-layout';
import { MetaImage, MetaDescription } from 'components/social/Metatags';

import useToggleSidebar from 'hooks/useToggleSidebar';

import fiberyToString from 'utils/fibery/toString';
import { makeRequest } from 'utils/request';
import { getTagLink } from 'utils/features/tags';
import { getLocalizedTag, getLocalizedSuggested } from 'utils/getters';

import api from 'constants/api';
import { NY2021 } from 'constants';
import { REVALIDATE_TIMEOUT, SUGGESTED_ARTICLES_ENABLED } from 'constants/misc';

const b = bem(styles);
const LANG = 'be';
const PREVIEW_URL =
  'https://res.cloudinary.com/wir-by/image/upload/c_scale,w_1200,f_auto,q_auto/v1608977422/production/games/game-ny2021-preview.png';
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
        data.authorTag = getLocalizedTag(data.authorTag, LANG);
      }
      setCookie(data);
    } catch (err) {
      setCookie(initialCookie);
      setError(true);
    } finally {
      setPending(false);
    }
  }, []);

  const textStr = text ? fiberyToString(text.content, { useBreak: true }) : '';

  return (
    <>
      <MetaImage url={PREVIEW_URL} />
      <MetaDescription description={description} />
      <div className={b()}>
        <Header toggleSidebar={useToggleSidebar()} />

        <div className={cn(typography['common-text'], b('wrapper'))}>
          <div className={b('content')}>
            <span>Прадказанне</span>
            <h1 className={cn(typography['common-title'], b('title'))}>{title}</h1>
            <div className={b('text-wrapper')}>
              {initial ? (
                <span>{description}</span>
              ) : (
                <>
                  <span className={b('result-text')}>
                    <TextWithSeparator text={textStr} symbol={'\n'} />
                  </span>
                  <div className={b('author-wrapper')}>
                    {!authorTag && <span className={b('author')}>{author}</span>}
                    {!!authorTag && getTagLink({ tag: authorTag, dark: true, target: '_blank' })}
                  </div>
                </>
              )}
            </div>
            <Button className={b('btn')} onClick={fetchCookie} pending={pending}>
              {!error && `Атрымаць${initial ? '' : ' яшчэ адно'}`}
              {error && 'Памылка, паспрабуйце яшчэ'}
            </Button>
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

Game2021page.getLayoutProps = ({ title }) => ({
  noLocTitle: title,
  hideHeader: true,
});

const url = api.games.fortune.get(NY2021);

export const getStaticProps = async () => {
  const { title, description, suggestedArticles = null } = await makeRequest(url);
  return {
    props: {
      title,
      description: fiberyToString(description),
      suggestedArticles: getLocalizedSuggested(suggestedArticles, LANG),
    },
    revalidate: REVALIDATE_TIMEOUT,
  };
};

export default Game2021page;
