import React, { Component } from 'react';
import PropTypes from 'prop-types';
import NoSSR from 'react-no-ssr';
import renderHTML from 'react-render-html';

import reactQuillStyles from 'react-quill/dist/quill.snow.css';

const modules = {
  toolbar: [
    [{ header: [1, 2, false] }],
    ['bold', 'italic', 'underline', 'strike', 'blockquote'],
    [{ list: 'ordered' }, { list: 'bullet' }, { indent: '-1' }, { indent: '+1' }],
    ['link'], // 'image'
    ['clean'],
  ],
};

const formats = [
  'header',
  'bold',
  'italic',
  'underline',
  'strike',
  'blockquote',
  'list',
  'bullet',
  'indent',
  'link',
  'image',
];

export default class Editor extends Component {
  static propTypes = {
    onChange: PropTypes.func.isRequired,
    content: PropTypes.string.isRequired,
  };

  constructor(props) {
    super(props);
    const { content } = this.props;
    this.state = { content };
    if (typeof window !== 'undefined') {
      // eslint-disable-next-line global-require
      this.ReactQuill = require('react-quill');
    }
  }

  componentWillReceiveProps({ content }) {
    if (content !== this.state.content) {
      this.setState({ content });
    }
  }

  handleChange = content => {
    const { onChange } = this.props;
    this.setState({ content });
    onChange(content);
  };

  render() {
    const { ReactQuill } = this;
    const { content } = this.state;

    return (
      <div>
        <style jsx global>
          {reactQuillStyles}
        </style>
        <style jsx global>
          {`
            .editor-container {
              display: flex;
              flex-direction: row;
            }
            .preview-container {
              margin-left: 20px;
            }
          `}
        </style>
        <div className="editor-container">
          <NoSSR>
            {ReactQuill && (
              <ReactQuill
                theme="snow"
                modules={modules}
                formats={formats}
                value={content}
                onChange={this.handleChange}
              />
            )}
          </NoSSR>
          <div className="preview-container">
            <h1>Preview</h1>
            {renderHTML(content)}
          </div>
        </div>
      </div>
    );
  }
}
