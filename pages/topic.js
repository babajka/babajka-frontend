import React, { Component } from 'react';
import PropTypes from 'prop-types';

import { TOPICS } from 'constants';

class TopicPage extends Component {
  static propTypes = {
    routerQuery: PropTypes.shape({
      topic: PropTypes.oneOf(TOPICS).isRequired,
    }).isRequired,
  };

  static getLayoutProps = ({ routerQuery: { topic } }) => ({
    title: `topic.${topic}`,
  });

  render() {
    const {
      routerQuery: { topic },
    } = this.props;
    return (
      <div>
        TODO Topic Page:
        <br />
        {topic}
      </div>
    );
  }
}

export default TopicPage;
