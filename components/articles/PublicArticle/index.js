import React from 'react';
import { connect } from 'react-redux';

import Icon from 'components/common/Icon';
import Link from 'components/common/Link';
import Text from 'components/common/Text';
import Renderer from 'components/common/Renderer';

import { selectors } from 'redux/ducks/articles';
import { selectors as authSelectors } from 'redux/ducks/auth';
import { ROUTES_NAMES } from 'routes';
import { LOCALES } from 'constants';
import { EXPORT_TO_NETWORKS } from 'constants/social';
import { ArticleModel } from 'utils/customPropTypes';

import AuthorBlock from './AuthorBlock';
import CollectionBlock from './CollectionBlock';
import PublishInfo from './PublishInfo';
import ShareToButton from './ShareToButton';
import EditLink from './EditLink';

const mapStateToProps = (state, { articleLocale }) => ({
  otherLocales: selectors.getOtherLocales(state, articleLocale),
  // TODO(andemerie): check if the following permission works as required
  canEditArticle: authSelectors.getPermissions(state).canManageArticles,
});

// TODO(andemerie): move styles from markup repo to this repo and finish styles for this page
const PublicArticle = ({
  collection,
  canEditArticle,
  title,
  articleId,
  articleLocale,
  author,
  // brand,
  otherLocales,
  imageFolderUrl,
  // text, // TODO: deprecate
  content,
  publishAt,
  // TODO(andemerie): decide how to implement video page and where to check the following type
  // type,
  published,
}) => (
  <div className="article-container container">
    <div className="columns">
      <div className="article-side column is-hidden-touch" />
      <div className="article column">
        <div className="article__top">
          {collection && <CollectionBlock data={collection} />}
          <div className="article__title-block">
            <h3 className="article__title title">{title}</h3>
            {canEditArticle && (
              <EditLink
                className="is-hidden-desktop"
                slug={articleId}
                articleLocale={articleLocale}
              >
                <span className="article__usual-icon icon-button__usual-icon icon">
                  <Icon name="pencil" size="lg" />
                </span>
              </EditLink>
            )}
          </div>
          <div className="article__info">
            {author && <AuthorBlock data={author} />}
            {/* TODO(andemerie): uncomment the following lines, when partners functionality is implemented */}
            {/* {brand && (
              <Text
                id="article.open-partner-details"
                render={t => (
                  <a className="article__info-item article__info-item--clickable" title={t}>
                    <InfoIcon name="handshake-o" />
                    <span className="article__info-link">{brand.name}</span>
                  </a>
                )}
              />
            )} */}
            <PublishInfo publishAt={publishAt} published={published} />
          </div>
          {otherLocales &&
            !!otherLocales.length && (
              <div className="article__info-langs">
                <span>
                  <Text id="article.read-in" />:{' '}
                  {otherLocales.map(({ locale, slug, title: linkTitle }) => (
                    <Link key={locale} route={ROUTES_NAMES.article} params={{ slug }}>
                      <a className="article__info-lang tag" title={linkTitle}>
                        {LOCALES[locale].toLowerCase()}
                      </a>
                    </Link>
                  ))}
                </span>
              </div>
            )}
        </div>

        {imageFolderUrl && (
          <figure className="article__imagewrapper image">
            <Text id="article.article-image" render={t => <img src={imageFolderUrl} alt={t} />} />
          </figure>
        )}

        <div className="is-size-5 article__text">
          <Renderer content={content} />
        </div>

        <div className="article__bottom">
          <div className="is-hidden-mobile">
            {[
              collection && { name: 'collection', value: collection.name },
              author && { name: 'author', value: author.displayName },
              // brand && { name: 'brand', value: brand.name },
            ]
              .filter(Boolean)
              .map(({ name, value }) => (
                <span key={name} className="article__bottom-item">
                  <Text id={`article.${name}`} />:{' '}
                  <span className="article__bottom-text">{value}</span>
                </span>
              ))}
          </div>
          {/* TODO(andemerie): implement ability to share article on social networks */}
          <div className="article__actions">
            {EXPORT_TO_NETWORKS.map(name => <ShareToButton key={`actions-${name}`} name={name} />)}
          </div>
        </div>
        <hr className="article__line" />
        <div className="article__more has-text-centered">
          <span className="article__more-text is-uppercase ">
            <Text id="article.read-also" />:
          </span>
          {/* TODO(andemerie): add article cards here */}
        </div>
      </div>

      <div className="article-side column is-hidden-touch">
        <div className="article-side__actions">
          <ul className="article-side__top">
            {canEditArticle && (
              <li>
                <EditLink
                  className="article-side__button article-side__button--edit"
                  slug={articleId}
                  articleLocale={articleLocale}
                >
                  <span className="icon-button__usual-icon icon">
                    <Icon name="pencil" size="lg" />
                  </span>
                </EditLink>
              </li>
            )}
            {EXPORT_TO_NETWORKS.map(name => (
              <li key={`side-${name}`}>
                <ShareToButton name={name} side />
              </li>
            ))}
          </ul>
          <div className="article-side__bottom">
            <Text
              id="article.go-to-top"
              render={t => (
                <a className="article-side__button icon-button button" href="#top" title={t}>
                  <span className="icon-button__usual-icon icon">
                    <Icon name="chevron-up" size="lg" />
                  </span>
                </a>
              )}
            />
          </div>
        </div>
      </div>
    </div>
  </div>
);

PublicArticle.propTypes = ArticleModel;

export default connect(mapStateToProps)(PublicArticle);
