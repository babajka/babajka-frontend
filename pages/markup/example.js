import './example.scss';

import React from 'react';

const BIG = 'big';

export default () => (
  <div className="example">
    <p>I am normal</p>
    <p className="red">I am red</p>
    <p className="blue">I am blue</p>
    <p className="big">I am {BIG}</p>
  </div>
);
