import 'styles/pages/preview.scss';

import React from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';

import Article from 'components/articles/Article';
import ArticleCard from 'components/articles/cards/ArticleCard';
import { DEFAULT_SIZES, SQUARE_SIZES } from 'components/articles/cards/CardWrapper';

import { adminArticlesActions, adminArticlesSelectors } from 'redux/ducks/admin/articles';
import { populateRequest } from 'utils/request';
import { ArticleShape } from 'utils/customPropTypes';

import useBoolean from 'hooks/useBoolean';

const mapStateToProps = (state, { lang }) => ({
  article: adminArticlesSelectors.getPreview(state, lang),
  error: adminArticlesSelectors.getError(state),
});

const ArticlePreview = ({ article, error }) => {
  const [cardsPreview, togglePreview] = useBoolean(true);
  if (!article || error) {
    return (
      <div>
        <h1>Error</h1>
        <p>{error}</p>
      </div>
    );
  }
  return (
    <>
      <div className="preview-page__switch">
        <input type="checkbox" checked={cardsPreview} onChange={togglePreview} />
        {'  '}
        <span>Preview Cards instead of the Article</span>
      </div>
      {cardsPreview && (
        <div className="preview-page__cards" style={{ margin: '50px' }}>
          {DEFAULT_SIZES.concat(SQUARE_SIZES).map(size => (
            <div key={size} className="preview-page__card">
              <ArticleCard {...article} size={size} />
            </div>
          ))}
        </div>
      )}
      {!cardsPreview && <Article data={article} />}
    </>
  );
};

ArticlePreview.getInitialProps = ctx =>
  populateRequest(ctx, ({ query: { url } }) =>
    adminArticlesActions.fiberyPreview(decodeURIComponent(url))
  );

ArticlePreview.propTypes = {
  article: ArticleShape,
  error: PropTypes.oneOfType([PropTypes.string, PropTypes.bool]).isRequired,
};

ArticlePreview.defaultProps = {
  article: null,
};

ArticlePreview.layoutProps = () => ({
  title: 'header.articles',
});

ArticlePreview.permissions = ['adminAccess'];

export default connect(mapStateToProps)(ArticlePreview);
