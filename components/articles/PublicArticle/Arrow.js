import React from 'react';
import PropTypes from 'prop-types';

import Link from 'components/common/Link';
import Icon from 'components/common/ui/Icon';

import { ROUTES_NAMES } from 'routes';

const ArrowDirectionType = PropTypes.oneOf(['previous', 'next']);

export const ArrowHint = ({ name, data, activeName }) => (
  <span className={`article__${name === activeName ? '' : 'in'}visible-another-name`}>
    {data && data.title}
  </span>
);

ArrowHint.propTypes = {
  data: PropTypes.shape({
    title: PropTypes.string.isRequired,
  }),
  name: ArrowDirectionType.isRequired,
  activeName: PropTypes.string.isRequired,
};

ArrowHint.defaultProps = {
  data: null,
};

const DIR_BY_NAME = {
  next: 'right',
  previous: 'left',
};

const Arrow = ({ name, data, setActive }) => {
  if (!data) {
    return <span className="article__arrow-wrap icon" />;
  }

  return (
    <Link route={ROUTES_NAMES.article} params={{ slug: data.slug }}>
      <a
        className="article__another"
        onMouseOver={() => setActive(name)}
        onMouseLeave={() => setActive('')}
        onFocus={() => setActive(name)}
      >
        <span className="article__arrow-wrap icon">
          <Icon name={`long-arrow-${DIR_BY_NAME[name]}`} className="article__arrow" />
        </span>
      </a>
    </Link>
  );
};

Arrow.propTypes = {
  data: PropTypes.shape({
    slug: PropTypes.string.isRequired,
  }),
  name: ArrowDirectionType.isRequired,
  setActive: PropTypes.func.isRequired,
};

Arrow.defaultProps = {
  data: null,
};

export default Arrow;
