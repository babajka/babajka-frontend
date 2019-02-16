import React, { Component } from 'react';

import ImageUploader from 'components/common/ImageUploader';

import api from 'constants/api';

import { actions as auth } from 'redux/ducks/auth';
import request from 'utils/request';

class TestUploadPage extends Component {
  static getInitialProps(ctx) {
    return request.populate(ctx, [auth.getCurrentUser]);
  }

  static layoutProps = {
    hideFooter: true,
  };

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
    const { images } = this.state;
    return (
      <div className="page-content">
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
      </div>
    );
  }
}

export default TestUploadPage;
