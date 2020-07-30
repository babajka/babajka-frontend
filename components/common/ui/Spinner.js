import React from 'react';
import cn from 'classnames';

import Icon from 'components/common/ui/Icon';

import styles from './spinner.module.scss';

const Spinner = ({ className, ...props }) => (
  <Icon className={cn(styles.spinner, className)} name="circle-notch" {...props} />
);

export default Spinner;
