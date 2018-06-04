import React from 'react';
import chunk from 'lodash/chunk';

import { USER_PIC } from 'constants/social';

export const ROW_SIZE = 6;
const COL_SIZE = 3;

const Teammate = ({ image, name, role }) => (
  <div className="column teammate is-4">
    <img src={image || USER_PIC} alt={name} />
    <div className="name">{name}</div>
    <div className="role">{role}</div>
  </div>
);

const TeamCol = ({ data }) => (
  <div className="column">
    <div className="columns">
      {data.map(user => <Teammate key={user.id} {...user} />)}
      {Array(Math.max(0, 3 - data.length)).fill(<div className="column is-4" />)}
    </div>
  </div>
);

const TeamRow = ({ data }) => (
  <div className="columns is-centered is-desktop">
    {/* eslint-disable-next-line react/no-array-index-key */}
    {chunk(data, COL_SIZE).map((colData, index) => <TeamCol key={index} data={colData} />)}
  </div>
);

export default TeamRow;
