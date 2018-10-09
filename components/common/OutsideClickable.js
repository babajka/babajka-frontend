import React, { Component } from 'react';
import PropTypes from 'prop-types';

export default class OutsideClickable extends Component {
  static propTypes = {
    onClick: PropTypes.func.isRequired,
    children: PropTypes.node.isRequired,
    tag: PropTypes.string,
  };

  static defaultProps = {
    tag: 'div',
  };

  static handleInsideClick(event) {
    event.stopPropagation();
  }

  /* eslint-disable react/destructuring-assignment */
  componentDidMount() {
    window.addEventListener('click', this.props.onClick);
  }

  componentWillReceiveProps(nextProps) {
    window.removeEventListener('click', this.props.onClick);
    window.addEventListener('click', nextProps.onClick);
  }

  componentWillUnmount() {
    window.removeEventListener('click', this.props.onClick);
  }
  /* eslint-enable react/destructuring-assignment */

  render() {
    const { tag, children } = this.props;
    return React.createElement(tag, { onClick: OutsideClickable.handleInsideClick }, children);
  }
}
