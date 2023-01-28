import React from 'react';
import chunk from 'lodash/chunk';

import Text from 'components/common/Text';

export const Thanks = ({ idx }) => (
  <Text id={`about.section-team-subtext${idx}`}>
    {(thanks, ...names) => (
      <>
        {thanks}
        {chunk(names, 2).map(([name, descr]) => (
          <>
            <b>{name}</b>
            {descr}
          </>
        ))}
      </>
    )}
  </Text>
);
