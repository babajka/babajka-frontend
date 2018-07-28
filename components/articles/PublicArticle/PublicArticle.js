import React from 'react';
import { connect } from 'react-redux';

import Icon from 'components/common/Icon';
import Link from 'components/common/Link';
import Text, { localize } from 'components/common/Text';
import Clickable from 'components/common/Clickable';
import ActionWithConfirm from 'components/common/ActionWithConfirm';
import Renderer from 'components/common/Renderer';
import VideoPlayer from 'components/common/VideoPlayer';
import LocaleContext from 'components/common/LocaleContext';

import { actions, selectors } from 'redux/ducks/articles';
import { selectors as authSelectors } from 'redux/ducks/auth';
import { Router, ROUTES_NAMES } from 'routes';
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

// TODO(andemerie): finish styles for this page
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
  content,
  publishAt,
  type,
  video,
  published,
  // from LocaleContext:
  lang,
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
              <a
                className="article__info-item article__info-item--clickable"
                title={localize('article.open-partner-details', lang)}
              >
                <InfoIcon name="handshake-o" />
                <span className="article__info-link">{brand.name}</span>
              </a>
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

        {type === 'text' &&
          imageFolderUrl && (
            <figure className="article__imagewrapper image">
              <img src={imageFolderUrl} alt={localize('article.article-image', lang)} />
            </figure>
          )}

        {type === 'video' && <VideoPlayer videoId={video.videoId} />}

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
          <div className="article__actions">
            {EXPORT_TO_NETWORKS.map(name => <ShareToButton key={`actions-${name}`} name={name} />)}
          </div>
        </div>
        {/* <hr className="article__line" /> */}
        <div className="article__more has-text-centered">
          {/* TODO(andemerie): to uncomment once article cards are ready */}
          {/* <span className="article__more-text is-uppercase ">
            <Text id="article.read-also" />:
          </span> */}
        </div>
      </div>

      <div className="article-side column is-hidden-touch">
        <div className="article-side__actions">
          <ul className="article-side__top">
            {canEditArticle && (
              <>
                <li>
                  <EditLink
                    className="article-side__button"
                    slug={articleId}
                    articleLocale={articleLocale}
                  >
                    <span className="icon-button__usual-icon icon">
                      <Icon name="pencil" size="lg" />
                    </span>
                  </EditLink>
                </li>
                <li>
                  <ActionWithConfirm
                    action={actions.remove.bind(null, articleId)}
                    successCallback={() => Router.replaceRoute(ROUTES_NAMES.home, { lang })}
                    render={({ onClick }) => (
                      <Clickable
                        tag="a"
                        onClick={onClick}
                        className="article-side__button article-side__button--remove icon-button button"
                        title={localize('article.remove', lang)}
                      >
                        <span className="icon-button__usual-icon icon">
                          <Icon name="trash" size="lg" />
                        </span>
                      </Clickable>
                    )}
                  />
                </li>
              </>
            )}
            {EXPORT_TO_NETWORKS.map(name => (
              <li key={`side-${name}`}>
                <ShareToButton name={name} title={title} side />
              </li>
            ))}
          </ul>
          <div className="article-side__bottom">
            <a
              className="article-side__button icon-button button"
              href="#top"
              title={localize('article.go-to-top', lang)}
            >
              <span className="icon-button__usual-icon icon">
                <Icon name="chevron-up" size="lg" />
              </span>
            </a>
          </div>
        </div>
      </div>
    </div>
  </div>
);

PublicArticle.propTypes = ArticleModel;

export default connect(mapStateToProps)(props => (
  <LocaleContext.Consumer>
    {lang => <PublicArticle {...props} lang={lang} />}
  </LocaleContext.Consumer>
));
