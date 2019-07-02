import React, { Component } from 'react';
import PropTypes from 'prop-types';
// import { connect } from 'react-redux';

import { TOPICS } from 'constants';

// const mapStateToProps = (state, { routerQuery: { slug } }) => ({
//   article: articlesSelectors.getCurrent(state, slug),
// });

class TagPage extends Component {
  static propTypes = {
    routerQuery: PropTypes.shape({
      topic: PropTypes.oneOf(TOPICS).isRequired,
      tag: PropTypes.string.isRequired,
    }).isRequired,
  };

  static getLayoutProps = ({ routerQuery: { topic } }) => ({
    title: `topic.${topic}`,
  });

  // static getInitialProps(ctx) {
  //   const {
  //     query: { slug },
  //   } = ctx;
  //   return populateRequest(ctx, articlesActions.fetchBySlug.bind(null, slug));
  // }

  render() {
    const {
      routerQuery: { topic, tag },
    } = this.props;
    return (
      <div>
        TODO Tag Page:
        <br />
        {topic} {tag}
      </div>
    );
  }
}

// export default connect(mapStateToProps)(TagPage);
export default TagPage;
