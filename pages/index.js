import React, { Component } from 'react';
import { withRouter } from 'next/router';
import PropTypes from 'prop-types';
import withRedux from 'next-redux-wrapper';

import PageLayout from 'components/common/layout/PageLayout';

import initStore from 'redux/store';

class MainPage extends Component {
  static propTypes = {
    router: PropTypes.shape({
      query: PropTypes.object.isRequired,
    }).isRequired,
  };

  componentDidMount() {}

  render() {
    const { router } = this.props;

    return (
      <PageLayout
        className="page-content main-page page-container"
        router={router}
        title="header.main"
      >
        Main Page
      </PageLayout>
    );
  }
}

export default withRouter(withRedux(initStore)(MainPage));
