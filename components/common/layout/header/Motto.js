import React, { useState, useEffect } from 'react';
import sample from 'lodash/sample';

import Text from 'components/common/Text';
import Link from 'components/common/Link';

import { TagLink } from 'utils/tags';
import { ROUTES_NAMES } from 'routes';
import { TOPIC } from 'constants/misc';

import styles from './header.module.scss';

const CULTURE = ['art', 'cinema', 'literature']; // + 'music'

const Motto = () => {
  const [cultureLink, setLink] = useState(CULTURE[0]);
  useEffect(() => {
    setLink(sample(CULTURE));
  }, []);

  return (
    <>
      <span className={styles['navbar__title--screen--wide']}>
        <Text id="common.motto">
          {(bel, asWell, world, culture, and, history) => (
            <>
              <TagLink topic={TOPIC.locations} tag="belarus">
                {bel}
              </TagLink>
              {asWell}
              <TagLink topic={TOPIC.locations} tag="europe">
                {world}
              </TagLink>
              <TagLink topic={TOPIC.themes} tag={cultureLink}>
                {culture}
              </TagLink>
              {and}
              <TagLink topic={TOPIC.themes} tag="history">
                {history}
              </TagLink>
            </>
          )}
        </Text>
      </span>
      <span className={styles['navbar__title--screen--narrow']}>
        <Text id="common.motto-short">
          {(edu, wir) => (
            <>
              {edu}
              <Link route={ROUTES_NAMES.about}>{wir}</Link>
            </>
          )}
        </Text>
      </span>
    </>
  );
};

export default Motto;
