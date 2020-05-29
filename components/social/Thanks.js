import React from 'react';

import Text from 'components/common/Text';

export const Thanks1 = () => (
  <Text id="about.section-team-subtext">
    {(
      thanks,
      name1,
      descr1,
      name2,
      descr2,
      name3,
      descr3,
      name4,
      descr4,
      name5,
      descr5,
      name6,
      descr6,
      name7,
      descr7,
      name8,
      descr8,
      name9,
      descr9
    ) => (
      <>
        {thanks}
        <b>{name1}</b>
        {descr1}
        <b>{name2}</b>
        {descr2}
        <b>{name3}</b>
        {descr3}
        <b>{name4}</b>
        {descr4}
        <b>{name5}</b>
        {descr5}
        <b>{name6}</b>
        {descr6}
        <b>{name7}</b>
        {descr7}
        <b>{name8}</b>
        {descr8}
        <b>{name9}</b>
        {descr9}
      </>
    )}
  </Text>
);

export const Thanks2 = () => (
  <Text id="about.section-team-subtext2">
    {(thanks, name, descr) => (
      <>
        {thanks}
        <b>{name}</b>
        {descr}
      </>
    )}
  </Text>
);
