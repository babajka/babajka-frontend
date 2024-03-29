import styles from 'styles/pages/tinder.module.scss';
import typography from 'styles/typography.module.scss';

import React, { useState, useCallback } from 'react';
import bem from 'bem-css-modules';
import cn from 'classnames';
import shuffle from 'lodash/shuffle';

import { MetaImage, MetaDescription } from 'components/social/Metatags';
import Header from 'components/layout/header/Header';
import Button from 'components/common/Button';
import Icon from 'components/common/ui/Icon';
import ShareButtons from 'components/social/ShareButtons';
import CardBlocksLayout from 'features/layout/card-blocks-layout';

import useToggleSidebar from 'hooks/useToggleSidebar';
import useBoolean from 'hooks/useBoolean';

import fiberyRenderer from 'utils/fibery/renderer';
import { makeRequest } from 'utils/request';
import { getLocalizedSuggested } from 'utils/getters';

import api from 'constants/api';
import { SUGGESTED_ARTICLES_ENABLED } from 'constants/misc';

const b = bem(styles);
const TINDER_SLUG = 'belarusian-writers';
const LANG = 'be';
const URL = 'https://tinder.wir.by';
const PREVIEW_URL =
  'https://res.cloudinary.com/wir-by/image/upload/c_scale,w_1200,f_auto,q_auto/v1613152867/production/games/game-tinder-preview.png';
const MATCH_IMAGE_URL =
  'https://res.cloudinary.com/wir-by/image/upload/c_scale,w_457,f_auto,q_auto/v1612824869/production/games/game-tinder-match.png';
const SHARE_TEXT = 'Знайдзі сабе пару на: ';

const postStats = (action, personId) =>
  makeRequest(api.games.tinder.postStats, 'POST', {
    slug: TINDER_SLUG,
    action,
    personId,
  });

const rawMode = url => `${url}?mode=raw`;

const TinderPage = ({ title, subtitle, profiles, suggestedArticles }) => {
  const [profilesIndex, setProfilesIndex] = useState(0);
  const [isPopupShown, togglePopup] = useBoolean(false);

  const profile = profiles[profilesIndex];
  const { personStatsId: personId } = profile || {};

  const profilesLeft = profiles.length - profilesIndex;

  const dislike = useCallback(async () => {
    await postStats('dislike', personId);
    setProfilesIndex(profilesIndex + 1);
  }, [personId, profilesIndex]);

  const like = useCallback(async () => {
    await postStats('like', personId);

    if (Math.random() < 0.7) {
      togglePopup();
      return;
    }

    setProfilesIndex(profilesIndex + 1);
  }, [personId, profilesIndex, togglePopup]);

  const next = useCallback(() => {
    setProfilesIndex(profilesIndex + 1);
    togglePopup();
  }, [profilesIndex, togglePopup]);

  const nextProfile = profiles[profilesIndex + 1];

  return (
    <>
      <MetaImage url={PREVIEW_URL} />
      <MetaDescription description={subtitle} />
      <div className={b()}>
        {!!nextProfile && <link rel="prefetch" href={rawMode(nextProfile.photoUrl)} />}
        <Header toggleSidebar={useToggleSidebar()} color="#ffffff" />
        <div className={b('wrapper')}>
          {!profilesLeft && (
            <div className={b('end')}>
              <h1 className={cn(typography['common-title'])}>{title}</h1>
              <div className={b('end-info')}>Вы праглядзелі ўсе профілі</div>
            </div>
          )}
          {!!profilesLeft && (
            <div className={b('card')}>
              <div className={b('photo-container')}>
                <img
                  className={b('photo')}
                  alt={profile.nickname}
                  src={rawMode(profile.photoUrl)}
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
          <ShareButtons className={b('share')} basicText={SHARE_TEXT} url={URL} />
        </div>
        {isPopupShown && (
          <>
            <div className={cn('wir-overlay', 'wir-overlay--active', b('overlay'))} />
            <div className={b('match-wrapper')}>
              <div className={b('match')}>
                <img className={b('match-image')} alt="It's a match!" src={MATCH_IMAGE_URL} />
                <img
                  className={b('match-photo')}
                  alt={profile.nickname}
                  src={rawMode(profile.photoUrl)}
                />
                <div className={b('match-content')}>
                  <div className={b('match-text')}>
                    {fiberyRenderer(profile.acceptMessage.content)}
                  </div>
                  <ShareButtons className={b('match-share')} basicText={SHARE_TEXT} url={URL} />
                </div>
                <Button className={b('match-button')} onClick={next}>
                  {profilesLeft > 1 ? 'Добра, хачу іншых паглядзець' : 'Дзякуй!'}
                </Button>
                <span className={b('match-info')}>
                  {profilesLeft > 1
                    ? `Можна палайкаць яшчэ ${profilesLeft - 1}`
                    : 'Лайкі скончыліся'}
                </span>
              </div>
            </div>
          </>
        )}
      </div>
      {SUGGESTED_ARTICLES_ENABLED && suggestedArticles && (
        <CardBlocksLayout blocks={suggestedArticles.blocks} data={suggestedArticles.data} />
      )}
    </>
  );
};

TinderPage.getLayoutProps = ({ title }) => ({
  noLocTitle: title,
  hideHeader: true,
});

export const getStaticProps = async () => {
  const { title, subtitle, people, suggestedArticles = null } = await makeRequest(
    api.games.tinder.get(TINDER_SLUG)
  );
  return {
    props: {
      title,
      subtitle,
      profiles: shuffle(people),
      suggestedArticles: getLocalizedSuggested(suggestedArticles, LANG),
    },
    revalidate: 1, // seconds
  };
};

export default TinderPage;
