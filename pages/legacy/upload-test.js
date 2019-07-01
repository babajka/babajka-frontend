import React, { Component } from 'react';

import ImageUploader from 'components/common/ImageUploader';

import api from 'constants/api';

import { makeRequest } from 'utils/request';

class TestUploadPage extends Component {
  static getLayoutProps = () => ({
    hideFooter: true,
  });

  state = {
    images: [],
  };

  componentDidMount() {
    makeRequest(api.core.uploads)
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
