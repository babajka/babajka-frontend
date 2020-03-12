import React from 'react';
import bem from 'bem-css-modules';
import styles from './example.module.scss';

const BIG = 'big';
const b = bem(styles);

export default () => (
  <div className={b()}>
    <p>I am normal</p>
    <p className={b('red')}>I am red</p>
    <p className={b('blue')}>I am blue</p>
    <p className={b('big')}>I am {BIG}</p>
  </div>
);
