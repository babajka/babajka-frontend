import React from 'react';
import { storiesOf } from '@storybook/react';
import { select, text } from '@storybook/addon-knobs';

import Text from 'components/common/Text';
import LocaleContext, { VALID_LOCALES } from 'components/common/LocaleContext';

const PREFIX = 'common';

// Our internationalization helper,
// that use translations from [Google Sheet](https://docs.google.com/spreadsheets/d/1b3Or9-t_pDZq6GOL4MRUbFhoXuteVxCrRHTM17DLALg/edit?usp=sharing)
storiesOf(`${PREFIX}/Text`, module)
  .addDecorator(story => {
    const lang = select('locale', VALID_LOCALES, 'be');
    return <LocaleContext.Provider value={lang}>{story()}</LocaleContext.Provider>;
  })
  .add('default', () => <Text id={text('dict key', 'about.goal')} />)
  .add('custom render', () => <Text id="about.join-us" render={t => t.toUpperCase()} />)
  .add('with separator', () => (
    <ol>
      <h3 className="title is-5">
        You can cut translation with `||` symbols, and receive it by parts:
      </h3>
      <Text
        id="about.contact"
        render={(...parts) =>
          parts.map(t => (
            <li key={t}>
              {t}
              <br />
            </li>
          ))
        }
      />
    </ol>
  ));
