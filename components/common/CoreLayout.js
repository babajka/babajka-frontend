import React, { Component } from 'react';
import PropTypes from 'prop-types';
import Head from 'next/head';
import { connect } from 'react-redux';

import Header from 'components/common/Header';

import { actions, selectors } from 'redux/ducks/auth';

const mapStateToProps = state => ({
  user: selectors.getUser(state),
});

const mapDispatchToProps = { getCurrentUser: actions.getCurrentUser };

class CoreLayout extends Component {
  static propTypes = {
    user: PropTypes.shape({}),
    title: PropTypes.string,
    getCurrentUser: PropTypes.func.isRequired,
    children: PropTypes.node.isRequired,
  };

  static defaultProps = { title: '', user: null };

  componentDidMount() {
    const { user, getCurrentUser } = this.props;
    if (!user) {
      getCurrentUser();
    }
  }

  render() {
    const { title, children } = this.props;

    return (
      <div>
        <Head>
          <title>
            Wir {title && '| '}
            {title}
          </title>
          <meta charSet="utf-8" />
          <meta httpEquiv="X-UA-Compatible" content="IE=edge" />
          <meta name="viewport" content="initial-scale=1.0, width=device-width" />
          <link rel="stylesheet" href="/static/styles/assets.min.css" />
          <link rel="stylesheet" href="/static/styles/bundle.min.css" />
        </Head>
        <Header />
        {children}
      </div>
    );
  }
}

export default connect(mapStateToProps, mapDispatchToProps)(CoreLayout);
