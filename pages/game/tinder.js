import styles from 'styles/pages/tinder.module.scss';

import React from 'react';
import bem from 'bem-css-modules';
import cn from 'classnames';

import Header from 'components/layout/header/Header';
import Button from 'components/common/Button';
import Icon from 'components/common/ui/Icon';
import ShareButtons from 'components/social/ShareButtons';
import Image from 'next/image';

import useToggleSidebar from 'hooks/useToggleSidebar';
import useBoolean from 'hooks/useBoolean';

import fiberyToString from 'utils/fibery/toString';
import { getLocalizedSuggested } from 'utils/getters';

import { REVALIDATE_TIMEOUT } from 'constants/misc';

const b = bem(styles);
const LANG = 'be';

const TinderPage = ({ title, description }) => {
  const [isPopupShown, togglePopup] = useBoolean(false);
  const profilesLeftNumber = 5;

  return (
    <>
      <div className={b()}>
        <Header toggleSidebar={useToggleSidebar()} />

        <div className={b('wrapper')}>
          <div className={b('card')}>
            <div className={b('photo-container')}>
              <Image className={b('photo')} alt="Фота" src="/dudar.jpeg" layout="fill" />
              <div className={cn(b('buttons'))}>
                <Button className={cn(b('button'), b('dislike'))} onClick={() => {}}>
                  <Icon name="times" />
                </Button>
                <Button className={cn(b('button'), b('like'))} onClick={togglePopup}>
                  <Icon name="heart" />
                </Button>
              </div>
            </div>
            <div className={b('text')}>
              <div className={b('name')}>Канстанцыя Буйло</div>
              <div className={b('about')}>
                Не хачу я жонкі
                <br />
                Не з сваёй старонкі,
                <br />
                Як я – багацейшай,
                <br />
                І як я – мудрэйшай.
                <br />
                <br />
                Я вазьму такую,
                <br />
                К якой любасць чую,
                <br />
                Што мяне палюбіць,
                <br />
                Як сябе самую.
              </div>
            </div>
          </div>
          <ShareButtons className={b('share')} basicText={`${title}\n\n${description}`} />
        </div>
        {isPopupShown && (
          <>
            <div className={cn('wir-overlay', 'wir-overlay--active', b('overlay'))} />
            <div className={b('match-wrapper')}>
              <div className={b('match')}>
                <img
                  className={b('match-image')}
                  alt="It's a match!"
                  src="https://res.cloudinary.com/wir-by/image/upload/c_scale,w_1300,f_auto,q_auto/v1612824869/production/games/game-tinder-match.png"
                />
                <Image
                  className={b('match-photo')}
                  alt="Фота"
                  src="/dudar.jpeg"
                  width="90px"
                  height="90px"
                />
                <div className={b('match-content')}>
                  <div className={b('match-text')}>
                    Як я жыў без цябе?
                    <br />
                    А маглі ж не сустрэцца ніколі,
                    <br />
                    За паўкроку
                    <br />
                    Адно аднаго абмінуць,
                    <br />
                    Разысціся,
                    <br />
                    Як сцежкі расходзяцца ў полі,
                    <br />
                    I не знаў бы,
                    <br />
                    За страту каго папракнуць
                  </div>
                  <ShareButtons
                    className={b('match-share')}
                    basicText={`${title}\n\n${description}`}
                  />
                </div>
                <Button className={b('match-button')} onClick={togglePopup}>
                  Добра, хачу іншых паглядзець
                  {/* Дзякуй! */}
                </Button>
                <span className={b('match-info')}>
                  Можна палайкаць яшчэ {profilesLeftNumber}
                  {/* Лайкі скончыліся */}
                </span>
              </div>
            </div>
          </>
        )}
      </div>
    </>
  );
};

TinderPage.getLayoutProps = () => ({
  hideHeader: true,
});

export const getStaticProps = async () => {
  const title = 'Title';
  const description = 'Description';
  const suggestedArticles = null;
  return {
    props: {
      title,
      description: fiberyToString(description),
      suggestedArticles: getLocalizedSuggested(suggestedArticles, LANG),
    },
    revalidate: REVALIDATE_TIMEOUT,
  };
};

export default TinderPage;
