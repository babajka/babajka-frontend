import React, { Component } from 'react';
import PropTypes from 'prop-types';
import Dropzone from 'react-dropzone';
import noop from 'lodash/noop';

import Button from 'components/common/Button';
import { uploadFile } from 'utils/request';

const SUPPORTED_FORMATS = ['jpeg', 'png', 'gif', 'apng', 'svg+xml'];

class ImageUploader extends Component {
  static propTypes = {
    onFinish: PropTypes.func,
  };

  static defaultProps = {
    onFinish: noop,
  };

  state = {
    file: null,
    pending: false,
  };

  handleDrop = files => {
    const [file] = files;
    this.setState({ file });
  };

  handleSubmit = () => {
    const { onFinish } = this.props;
    const { file } = this.state;
    this.setState({ pending: true });
    uploadFile(file).then(res => {
      onFinish(res);
      this.setState({ pending: false, file: null });
    });
  };

  render() {
    const { file, pending } = this.state;
    const { preview } = file || {};

    return (
      <section>
        <div className="dropzone">
          <Dropzone
            onDrop={this.handleDrop}
            // style={{ backgroundImage: preview ? `url(${preview})` : null }}
            accept={SUPPORTED_FORMATS.map(type => `image/${type}`)}
            multiple={false}
          >
            {!preview && <p>Try dropping file here, or click to select file to upload.</p>}
            {preview && <img alt={file.name} src={preview} />}
          </Dropzone>
        </div>
        <Button onClick={this.handleSubmit} pending={pending} disabled={!file}>
          Submit
        </Button>
      </section>
    );
  }
}

export default ImageUploader;
