import React, { Component } from 'react';
import PropTypes from 'prop-types';
import withRedux from 'next-redux-wrapper';
import Link from 'next/link';

import CoreLayout from 'components/common/CoreLayout';

import initStore from 'redux/store';
import { actions as articlesActions, selectors } from 'redux/ducks/articles';
import { actions as auth } from 'redux/ducks/auth';
import request from 'utils/request';

const mapStateToProps = state => ({
  articles: selectors.getAll(state),
  error: selectors.isError(state),
});

class HomePage extends Component {
  static propTypes = {
    // TODO: add article model
    articles: PropTypes.arrayOf(
      PropTypes.shape({
        locales: PropTypes.shape({}),
      })
    ).isRequired,
    error: PropTypes.oneOfType([PropTypes.bool, PropTypes.string]).isRequired,
  };

  static getInitialProps(ctx) {
    // TODO: somehow extract getCurrentUser to populate method
    return request.populate(ctx, [auth.getCurrentUser, articlesActions.fetchAll]);
  }

  render() {
    const { articles, error } = this.props;
    return (
      <CoreLayout>
        <p>Articles:</p>
        <ol>
          {articles &&
            articles.map(({ brand, type, locales }) => (
              <li key={(locales.en && locales.en.slug) || (locales.be && locales.be.slug)}>
                {type}
                <br />
                {locales &&
                  Object.values(locales).map(({ title, subtitle, text, slug, locale }) => (
                    <div key={slug}>
                      <Link href={`/article?slug=${slug}`} as={`/article/${slug}`}>
                        {locale}
                      </Link>{' '}
                      : <b>{title}</b> : <i>{slug}</i> : {subtitle} : {text} : {brand.names[locale]}
                      <br />
                    </div>
                  ))}
                <br />
              </li>
            ))}
        </ol>
        {error && <p>{error}</p>}
      </CoreLayout>
    );
  }
}

export default withRedux(initStore, mapStateToProps)(HomePage);
