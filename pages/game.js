import styles from 'styles/pages/game.module.scss';

import React from 'react';
import { useRouter } from 'next/router';
import bem from 'bem-css-modules';
import cn from 'classnames';

import Header from 'components/common/layout/header/Header';
import Button from 'components/common/Button';
import ShareButtons from 'components/social/ShareButtons';
import typography from 'components/common/ui/typography';

import useBoolean from 'hooks/useBoolean';
import useToggleSidebar from 'hooks/useToggleSidebar';

const b = bem(styles);

const GamePage = () => {
  const [isView, toggleView] = useBoolean(false);
  const title = 'Што чакае ў 2021';
  const router = useRouter();
  return (
    <div className={b()}>
      <Header toggleSidebar={useToggleSidebar()} />

      <div className={cn('wir-content-padding', typography['common-text'], b('wrapper'))}>
        <div className={b('content')}>
          <span>Прадказанне</span>
          <h1 className={typography['common-title']}>{title}</h1>
          {isView ? (
            <>
              <span className={b('text')}>
                Што нас чакае 1 верасня? Агляд адукацыйных навінаў. Напярэданні новага навучальнага
                году Лукашэнка паставіў перад настаўнікамі недасягальную задачу: «выпускник должен
                свободно владеть разговорным европейским или китайским языками». Рэформа беларускай
                мовы за 2 тыдні. Шляхі і дарогі адукацыі. Метадычныя рэкамендацыі ідэолагаў: не
                забудзьцеся шасцігодкам расказаць пра цукар-пясок. У планах новага навучальнага году
                – пераклад на рускую мову навучання гісторыі Беларусі. І яшчэ пра ідэалагічную і
                выхаваўчую працу. Конкурс у зачынены Коласаўскі ліцэй чатыры чалавекі на месца
              </span>
              <Button className={b('btn')} onClick={toggleView}>
                Атрымаць
              </Button>
            </>
          ) : (
            <>
              <span className={b('result-text')}>
                Хай жа вам так не здаецца, што бяда ўжо і зацісне. Знайце, ліха ператрэцца і
                маланкай доля блісне.
              </span>
              <span className={b('author')}>Янка Купала</span>
              <Button className={b('btn')} onClick={toggleView}>
                Атрымаць яшчэ адно
              </Button>
            </>
          )}
          <ShareButtons className={b('share')} urlPath={router.asPath} basicText={title} />
        </div>
      </div>
    </div>
  );
};

GamePage.getLayoutProps = () => ({
  title: 'Што чакае ў 2021',
  hideHeader: true,
});

export default GamePage;
