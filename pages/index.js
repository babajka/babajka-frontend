import React, { Component } from 'react';

class MainPage extends Component {
  static propTypes = {};

  static layoutProps = {
    title: 'header.main',
  };

  componentDidMount() {}

  render() {
    return <div className="page-content">Main Page</div>;
  }
}

export default MainPage;
