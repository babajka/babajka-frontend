import React from 'react';
import PropTypes from 'prop-types';

// TODO: to consider moving into babajka/assets repo.

const ArrowIcon = ({ size, direction }) => (
  <svg
    width={size}
    height={size}
    viewBox="0 0 35 16"
    fill="none"
    style={{ transform: direction === 'right' ? 'rotate(180deg)' : '' }}
  >
    <path
      d="M35 6.214v3.857c0 .188-.06.342-.18.463a.626.626 0 01-.463.18H9.286v4.5c0 .281-.128.476-.382.583a.645.645 0 01-.703-.1L.487 8.664a.658.658 0 010-.944L8.2.609c.214-.187.449-.227.703-.12.254.12.382.315.382.582v4.5h25.071c.188 0 .342.06.462.181.12.12.181.275.181.462z"
      fill="#1A9582"
    />
  </svg>
);

ArrowIcon.propTypes = {
  direction: PropTypes.oneOf(['left', 'right']).isRequired,
  size: PropTypes.number.isRequired,
};

export default ArrowIcon;
