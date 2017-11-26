import React from 'react';
import PropTypes from 'prop-types';
import withRedux from 'next-redux-wrapper';

import initStore from 'redux/store';
import { actions } from 'redux/ducks/articles';

const mapStateToProps = state => ({
  articles: state.articles.data,
  pending: state.articles.pending,
  error: state.articles.error,
});

const mapDispatchToProps = { fetchAll: actions.fetchAll };

const Test = ({ articles, pending, error, fetchAll }) => (
  <div>
    <p>Articles:</p>
    <ol>
      {articles &&
        articles.map(({ title, subtitle }, index) => (
          // eslint-disable-next-line react/no-array-index-key
          <li key={index}>
            {title} : {subtitle}
          </li>
        ))}
    </ol>
    <button onClick={fetchAll}>{pending ? 'Load...' : 'Fetch!'}</button>
    {error && <p>{error}</p>}
  </div>
);

Test.propTypes = {
  fetchAll: PropTypes.func.isRequired,
  articles: PropTypes.arrayOf(
    PropTypes.shape({
      title: PropTypes.string.isRequired,
      subtitle: PropTypes.string.isRequired,
    })
  ).isRequired,
  pending: PropTypes.bool.isRequired,
  error: PropTypes.oneOf(PropTypes.bool, PropTypes.shape({})).isRequired,
};

export default withRedux(initStore, mapStateToProps, mapDispatchToProps)(Test);
