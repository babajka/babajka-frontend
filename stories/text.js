import React from 'react';
import { storiesOf } from '@storybook/react';

// import Text from 'components/common/Text';
// import LocaleContext from 'components/common/LocaleContext';

const PREFIX = 'common';

storiesOf(PREFIX).add('stub', () => <>hello world</>);

// storiesOf(`${PREFIX}/Select`)
//   .add(
//     'default',
//     () => (
//       <Select
//         valueWholeObject={boolean('valueWholeObject', false)}
//         options={object('options', [
//           { id: 'apple', label: 'Apple' },
//           { id: 'orange', label: 'Orange' },
//           { id: 'carrot', label: 'Carrot' },
//         ])}
//         searchable={boolean('searchable', false)}
//         clerable={boolean('clerable', false)}
//         dropdown={boolean('dropdown', false)}
//         placeholder={text('placeholder', 'Select fruit...')}
//         size={select('size', ['xs', 's', 'm', 'l'], 's')}
//         onChange={action('Select')}
//       />
//     ),
//     {
//       info: `
//         Our custom select component
//         built with awesome [Downshift](https://github.com/paypal/downshift)!
//       `,
//     }
//   )
//   .addParameters(infoSource)
//   .add('dropdown', () => (
//     <Select
//       placeholder="Locale"
//       options={[{ id: 'be', label: 'Be' }, { id: 'en', label: 'En' }, { id: 'ru', label: 'Ru' }]}
//       onChange={action('Locale')}
//       dropdown
//       size="xs"
//     />
//   ))
//   .add('custom render', () => (
//     <Select
//       placeholder="Assign task to..."
//       options={[
//         { id: 'drapegnik', name: 'Ivan' },
//         { id: 'bohdan', name: 'Ulad' },
//         { id: 'drozd', name: 'Vika' },
//         { id: 'viarcinskaja', name: 'Tonya' },
//       ]}
//       renderOption={({ id, name }) => (
//         <Author
//           imageUrl={`https://res.cloudinary.com/wir-by/image/upload/v1528990359/production/team/${id}`}
//           name={name}
//         />
//       )}
//       onChange={action('Assigned to')}
//     />
//   ));

// Our internationalization helper,
// that use translations from [Google Sheet](https://docs.google.com/spreadsheets/d/1b3Or9-t_pDZq6GOL4MRUbFhoXuteVxCrRHTM17DLALg/edit?usp=sharing)
// https://github.com/storybooks/storybook/issues/3346
// `"export 'DEFAULT_LOCALE' was not found in '../../constants'`
// storiesOf(`${PREFIX}/Text`, module)
//   .addDecorator(story => {
//     const lang = select('locale', ['be', 'ru', 'en'], 'be');
//     return <LocaleContext.Provider value={lang}>{story()}</LocaleContext.Provider>;
//   })
//   .add('default', () => <Text id={text('dict key', 'about.goal')} />)
//   .add('custom render', () => <Text id="about.join-us" render={t => t.toUpperCase()} />)
//   .add('with separator', () => (
//     <ol>
//       <h3 className="title is-5">
//         You can cut translation with `||` symbols, and receive it by parts:
//       </h3>
//       <Text
//         id="about.contact"
//         render={(...parts) =>
//           parts.map(t => (
//             <li key={t}>
//               {t}
//               <br />
//             </li>
//           ))
//         }
//       />
//     </ol>
//   ));
