import React from 'react';
import PropTypes from 'prop-types';
import bem from 'bem-css-modules';
import styles from './teammate.module.scss';

const b = bem(styles);

const Teammate = ({ image, name, role }) => (
  <div className={b()}>
    <img className={b('pic')} src={image} alt={name} />
    <div className={b('name')}>{name}</div>
    <div className={b('role')}>{role}</div>
  </div>
);

Teammate.propTypes = {
  image: PropTypes.string.isRequired,
  name: PropTypes.string.isRequired,
  role: PropTypes.string.isRequired,
};

export default Teammate;
