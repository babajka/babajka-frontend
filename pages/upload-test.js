import React, { Component } from 'react';
import { withRouter } from 'next/router';
import withRedux from 'next-redux-wrapper';

import ImageUploader from 'components/common/ImageUploader';
import PageLayout from 'components/common/layout/PageLayout';

import api from 'constants/api';

import initStore from 'redux/store';
import { actions as auth } from 'redux/ducks/auth';
import request from 'utils/request';

class TestUploadPage extends Component {
  static getInitialProps(ctx) {
    return request.populate(ctx, [auth.getCurrentUser]);
  }

  state = {
    images: [],
  };

  componentDidMount() {
    request
      .fetch(api.core.uploads)
      .then(({ resources }) => resources.reverse().map(({ url }) => url))
      .then(images => this.setState({ images }));
  }

  render() {
    const { router } = this.props;
    const { images } = this.state;
    return (
      <PageLayout className="page-content" router={router}>
        <h1>Test Cloudinary Integration</h1>
        <ImageUploader
          onFinish={({ url }) => {
            this.setState({ images: images.concat(url) });
          }}
        />
        <div>
          {images.map((imageUrl, index) => (
            <img key={imageUrl} src={imageUrl} alt={index} width="200px" />
          ))}
        </div>
      </PageLayout>
    );
  }
}

export default withRouter(withRedux(initStore)(TestUploadPage));
