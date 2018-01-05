import React, { Component } from 'react';
import PropTypes from 'prop-types';
import withRedux from 'next-redux-wrapper';

import CoreLayout from 'components/common/CoreLayout';

import initStore from 'redux/store';
import { actions, selectors } from 'redux/ducks/articles';

const mapStateToProps = state => ({
  articles: selectors.getAll(state),
  pending: selectors.isPending(state),
  error: selectors.isError(state),
});

class HomePage extends Component {
  static propTypes = {
    articles: PropTypes.arrayOf(
      PropTypes.shape({
        title: PropTypes.string.isRequired,
        subtitle: PropTypes.string.isRequired,
      })
    ).isRequired,
    pending: PropTypes.bool.isRequired,
    // eslint-disable-next-line react/forbid-prop-types
    error: PropTypes.any.isRequired,
  };

  static getInitialProps({ store: { dispatch }, isServer }) {
    const action = actions.fetchAll(isServer);
    dispatch(action);
    return action.payload;
  }

  render() {
    const { articles, pending, error } = this.props;
    return (
      <CoreLayout>
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
        {pending && <p>Loading...</p>}
        {error && <p>{error}</p>}
      </CoreLayout>
    );
  }
}

export default withRedux(initStore, mapStateToProps)(HomePage);
