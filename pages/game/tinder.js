import styles from 'styles/pages/tinder.module.scss';
import typography from 'styles/typography.module.scss';

import React, { useState, useCallback } from 'react';
import bem from 'bem-css-modules';
import cn from 'classnames';

import { MetaImage } from 'components/social/Metatags';
import Header from 'components/layout/header/Header';
import Button from 'components/common/Button';
import Icon from 'components/common/ui/Icon';
import ShareButtons from 'components/social/ShareButtons';
import CardBlocksLayout from 'features/layout/card-blocks-layout';
import Image from 'components/common/Image';

import useToggleSidebar from 'hooks/useToggleSidebar';
import useBoolean from 'hooks/useBoolean';

import fiberyRenderer from 'utils/fibery/renderer';
import { makeRequest } from 'utils/request';
import { getLocalizedSuggested } from 'utils/getters';

import api from 'constants/api';

const b = bem(styles);
const TINDER_SLUG = 'tinder-belarusian-writers';
const LANG = 'be';
const PREVIEW_URL =
  'https://res.cloudinary.com/wir-by/image/upload/c_scale,w_1200,f_auto,q_auto/v1613049623/production/games/game-tinder-preview.png';
const MATCH_IMAGE_URL =
  'https://res.cloudinary.com/wir-by/image/upload/c_scale,w_457,f_auto,q_auto/v1612824869/production/games/game-tinder-match.png';

const TinderPage = ({ title, profiles, suggestedArticles }) => {
  const [profilesIndex, setProfilesIndex] = useState(0);
  const [isPopupShown, togglePopup] = useBoolean(false);

  const profile = profiles[profilesIndex];

  const profilesLeftNumber = profiles.length - profilesIndex;

  const incrementProfilesIndex = () => setProfilesIndex(profilesIndex + 1);

  const dislike = useCallback(async () => {
    await makeRequest(api.games.tinder.postStats, 'POST', {
      slug: TINDER_SLUG,
      action: 'dislike',
      personId: profile.personStatsId,
    });
    incrementProfilesIndex();
  }, [profilesIndex]);

  const like = useCallback(async () => {
    await makeRequest(api.games.tinder.postStats, 'POST', {
      slug: TINDER_SLUG,
      action: 'like',
      personId: profile.personStatsId,
    });

    if (Math.random() < 0.7) {
      togglePopup();
      return;
    }

    incrementProfilesIndex();
  }, [profilesIndex]);

  const next = useCallback(() => {
    incrementProfilesIndex();
    togglePopup();
  }, [profilesIndex]);

  return (
    <>
      <MetaImage url={PREVIEW_URL} />
      <div className={b()}>
        <Header toggleSidebar={useToggleSidebar()} color="#ffffff" />
        <div className={b('wrapper')}>
          {!profilesLeftNumber && (
            <div className={b('end')}>
              <h1 className={cn(typography['common-title'])}>{title}</h1>
              <div className={b('end-info')}>Вы прагледзелі ўсе профілі</div>
            </div>
          )}
          {!!profilesLeftNumber && (
            <div className={b('card')}>
              <div className={b('photo-container')}>
                <Image
                  className={b('photo')}
                  alt={profile.nickname}
                  baseUrl={profile.photoUrl}
                  sourceSizes={[180]}
                  inViewport
                />
                <div className={cn(b('buttons'))}>
                  <Button className={cn(b('button', { dislike: true }))} onClick={dislike}>
                    <Icon name="times" />
                  </Button>
                  <Button className={cn(b('button', { like: true }))} onClick={like}>
                    <Icon name="heart" />
                  </Button>
                </div>
              </div>
              <div className={b('text')}>
                <div className={b('name')}>{profile.nickname}</div>
                <div className={b('about')}>{fiberyRenderer(profile.description.content)}</div>
              </div>
            </div>
          )}
          <ShareButtons className={b('share')} basicText={title} />
        </div>
        {isPopupShown && (
          <>
            <div className={cn('wir-overlay', 'wir-overlay--active', b('overlay'))} />
            <div className={b('match-wrapper')}>
              <div className={b('match')}>
                <img className={b('match-image')} alt="It's a match!" src={MATCH_IMAGE_URL} />
                <Image
                  className={b('match-photo')}
                  alt={profile.nickname}
                  baseUrl={profile.photoUrl}
                  sourceSizes={[180]}
                />
                <div className={b('match-content')}>
                  <div className={b('match-text')}>
                    {fiberyRenderer(profile.acceptMessage.content)}
                  </div>
                  <ShareButtons className={b('match-share')} basicText={title} />
                </div>
                <Button className={b('match-button')} onClick={next}>
                  {profilesLeftNumber > 1 ? 'Добра, хачу іншых паглядзець' : 'Дзякуй!'}
                </Button>
                <span className={b('match-info')}>
                  {profilesLeftNumber > 1
                    ? `Можна палайкаць яшчэ ${profilesLeftNumber - 1}`
                    : 'Лайкі скончыліся'}
                </span>
              </div>
            </div>
          </>
        )}
      </div>
      {suggestedArticles && (
        <CardBlocksLayout blocks={suggestedArticles.blocks} data={suggestedArticles.data} />
      )}
    </>
  );
};

TinderPage.getLayoutProps = ({ title }) => ({
  noLocTitle: title,
  hideHeader: true,
});

const url = api.games.tinder.get(TINDER_SLUG);

// Fisher-Yates shuffle algorithm
const getShuffledArray = array => {
  const newArray = [...array];

  for (let i = newArray.length - 1; i > 0; i -= 1) {
    const j = Math.floor(Math.random() * (i + 1));
    const item = newArray[i];
    newArray[i] = newArray[j];
    newArray[j] = item;
  }

  return newArray;
};

export const getStaticProps = async () => {
  const { title, people, suggestedArticles = null } = await makeRequest(url);
  return {
    props: {
      title,
      profiles: getShuffledArray(people),
      suggestedArticles: getLocalizedSuggested(suggestedArticles, LANG),
    },
    revalidate: 1, // seconds
  };
};

export default TinderPage;
