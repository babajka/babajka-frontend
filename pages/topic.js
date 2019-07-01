import React, { Component } from 'react';
import { connect } from 'react-redux';

import { populateRequest } from 'utils/request';
import { topicActions } from 'redux/ducks/topic';

import './topic.scss';

const mapStateToProps = state => ({
  topic: state.topic,
});

class TopicPage extends Component {
  static getInitialProps(ctx) {
    return populateRequest(ctx, topicActions.fetchArticlesByTopicTags.bind(null, 'times'));
  }

  render() {
    // console.log(this.props);
    return (
      <div className="screen-<%= locals.screen %>">
        <div className="topics">Topics</div>
      </div>
    );
  }
}

export default connect(mapStateToProps)(TopicPage);
