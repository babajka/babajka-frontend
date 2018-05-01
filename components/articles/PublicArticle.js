import React, { PureComponent, Fragment } from 'react';
import renderHTML from 'react-render-html';
import { connect } from 'react-redux';
import classNames from 'classnames';
import moment from 'moment';

import Link from 'components/common/Link';
import Text from 'components/common/Text';
import Clickable from 'components/common/Clickable';

import { selectors } from 'redux/ducks/articles';
import { selectors as authSelectors } from 'redux/ducks/auth';
import { ROUTES_NAMES } from 'routes';
import { LOCALES, DATE_FORMAT } from 'constants';
import { ArticleModel } from 'utils/customPropTypes';

const mapStateToProps = (state, { articleLocale }) => ({
  otherLocales: selectors.getOtherLocales(state, articleLocale),
  // TODO(andemerie): check if the following permission works as required
  canEditArticle: authSelectors.getPermissions(state).canManageArticles,
});

class PublicArticle extends PureComponent {
  static propTypes = ArticleModel;

  state = {
    whatAnotherToShow: '',
    isAuthorBlockOpened: false,
  };

  onShowAnother = whatAnotherToShow => this.setState({ whatAnotherToShow });

  onToggleAuthorBlock = () =>
    this.setState(({ isAuthorBlockOpened }) => ({ isAuthorBlockOpened: !isAuthorBlockOpened }));

  renderPublicationInfo = () => {
    const { publishAt } = this.props;

    if (!publishAt) {
      return (
        <span className="article__info-item tag is-warning is-uppercase">
          <Text id="article.publication-not-scheduled" />
        </span>
      );
    }

    const publishAtMoment = moment(publishAt);
    const formattedPublishAt = publishAtMoment.format(DATE_FORMAT);

    if (publishAtMoment.isBefore(moment())) {
      return (
        <span className="article__info-item">
          <span className="article__info-icon icon">
            <i className="fa fa-clock-o" aria-hidden="true" />
          </span>
          {formattedPublishAt}
        </span>
      );
    }

    return (
      <span className="article__info-item article__info-planned tag is-uppercase">
        <Text id="article.will-be-published" />
        {formattedPublishAt}
      </span>
    );
  };

  render() {
    const {
      collection,
      canEditArticle,
      title,
      articleId,
      articleLocale,
      author,
      // brand,
      otherLocales,
      imageUrl,
      text,
      // TODO(andemerie): decide how to implement video page and where to check the following type
      // type,
    } = this.props;
    const { whatAnotherToShow, isAuthorBlockOpened } = this.state;

    const ArrowHint = ({ name, hint }) => (
      <span
        className={
          whatAnotherToShow === name
            ? 'article__visible-another-name'
            : 'article__invisible-another-name'
        }
      >
        {hint}
      </span>
    );

    const Arrow = ({ name, arrow }) => (
      <a
        className="article__another"
        onMouseOver={() => this.onShowAnother(name)}
        onMouseLeave={() => this.onShowAnother('')}
        onFocus={() => this.onShowAnother(name)}
      >
        <span className="article__arrow-wrap icon">
          <i className={`article__arrow fa fa-long-arrow-${arrow}`} />
        </span>
      </a>
    );

    const AuthorClickable = ({ isOpen }) => (
      <Clickable
        className={classNames('article__info-item article__info-item--clickable', {
          'is-hidden-desktop': isOpen,
        })}
        onClick={this.onToggleAuthorBlock}
      >
        <span className="article__info-icon icon">
          <i className="fa fa-user" aria-hidden="true" />
        </span>
        <span className="article__info-link">{author.displayName}</span>
        <span className="icon">
          <i className={`fa fa-angle-${isOpen ? 'down' : 'up'}`} aria-hidden="true" />
        </span>
      </Clickable>
    );

    // TODO(andemerie): move styles from markup repo to this repo and finish styles for this page
    return (
      <div className="article-container container">
        <div className="columns">
          <div className="article-side column is-hidden-touch" />

          <div className="article column">
            <div className="article__top">
              {collection && (
                <Fragment>
                  <div className="article__collection-block article__another-names is-hidden-touch">
                    {/* TODO(andemerie): add ids of previous and next articles in collection to
                      'article.collection' objects on server; change the following stubs, when it is
                      implemented */}
                    <ArrowHint name="previous" hint="Назва папярэдняга артыкула ў калекцыі" />
                    <ArrowHint name="next" hint="Назва наступнага артыкула ў калекцыі" />
                  </div>
                  <div className="article__collection-block">
                    <Arrow name="previous" arrow="left" />
                    <div className="has-text-centered">
                      <Text
                        id="article.open-collection-articles"
                        render={t => (
                          <a className="article__collection is-uppercase" title={t}>
                            {collection.name}
                          </a>
                        )}
                      />
                    </div>
                    <Arrow name="next" arrow="right" />
                  </div>
                </Fragment>
              )}

              <div className="article__title-block">
                <h3 className="article__title title">{title}</h3>
                {canEditArticle && (
                  <li>
                    <Text
                      id="article.edit-article"
                      render={t => (
                        <Link
                          route={ROUTES_NAMES.article}
                          params={{ slug: articleId, mode: 'edit', articleLocale }}
                        >
                          <a className="icon-button button is-hidden-desktop" title={t}>
                            <span className="article__usual-icon icon-button__usual-icon icon">
                              <i className="fa fa-pencil fa-lg" />
                            </span>
                          </a>
                        </Link>
                      )}
                    />
                  </li>
                )}
              </div>

              <div className="article__info">
                {author && (
                  <Fragment>
                    {isAuthorBlockOpened && (
                      <div className="article__author-block is-hidden-desktop">
                        <AuthorClickable />
                        <div className="article__author-info">
                          <figure className="article__author-image-wrap image is-48x48">
                            <Text
                              id="article.author-photo"
                              render={t => (
                                <img
                                  className="article__author-image"
                                  src={author.imageUrl}
                                  alt={t}
                                />
                              )}
                            />
                          </figure>
                          {author.bio}
                        </div>
                      </div>
                    )}
                    {!isAuthorBlockOpened && <AuthorClickable isOpen />}
                  </Fragment>
                )}
                {/* TODO(andemerie): add 'author' field to all 'article' objects on server, even
                  if this article doesn't have author */}
                {author && (
                  <div className="dropdown is-hoverable is-hidden-touch">
                    <div className="dropdown-trigger">
                      <a
                        className="article__info-item article__info-item--clickable"
                        aria-haspopup="true"
                        aria-controls="author-dropdown"
                      >
                        <span className="article__info-icon icon">
                          <i className="fa fa-user" aria-hidden="true" />
                        </span>
                        {author.displayName}
                      </a>
                    </div>
                    <div
                      className="article__author-menu dropdown-menu"
                      id="author-dropdown"
                      role="menu"
                    >
                      <div className="dropdown-content">
                        <div className="dropdown-item">
                          <div className="article__author-top media">
                            <div className="media-left">
                              <figure className="image is-48x48">
                                <Text
                                  id="article.author-photo"
                                  render={t => (
                                    <img
                                      className="article__author-image"
                                      src={author.imageUrl}
                                      alt={t}
                                    />
                                  )}
                                />
                              </figure>
                            </div>
                            <div className="media-content">
                              <p className="article__author-name is-size-6">{author.displayName}</p>
                              {/* TODO(andemerie): think about what info it might be */}
                              <p>Якая-небудзь інфа пра аўтара</p>
                            </div>
                          </div>

                          <div className="content">{author.bio}</div>
                        </div>
                      </div>
                    </div>
                  </div>
                )}
                {/* TODO(andemerie): uncomment the following lines, when partners functionality is
                  implemented */}
                {/* {brand && (
                  <Text
                    id="article.open-partner-details"
                    render={t => (
                        <a className="article__info-item article__info-item--clickable" title={t}>
                            <span className="article__info-icon icon">
                            <i className="fa fa-handshake-o" aria-hidden="true" />
                            </span>
                            <span className="article__info-link">{brand.name}</span>
                        </a>
                    )}
                  />
                )} */}
                {this.renderPublicationInfo()}
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

            <figure className="article__imagewrapper image">
              <Text id="article.article-image" render={t => <img src={imageUrl} alt={t} />} />
            </figure>

            <div className="is-size-5 article__text">{renderHTML(text)}</div>

            <div className="article__bottom">
              <div className="is-hidden-mobile">
                {[
                  { name: 'collection', value: collection.name },
                  { name: 'author', value: author.displayName },
                  // { name: 'brand', value: brand.name },
                ].map(
                  ({ name, value }) =>
                    this.props[name] && (
                      <span key={name} className="article__bottom-item">
                        <Text id={`article.${name}`} />:{' '}
                        <span className="article__bottom-text">{value}</span>
                      </span>
                    )
                )}
              </div>
              {/* TODO(andemerie): implement ability to share article on social networks */}
              <div className="article__actions">
                {['facebook', 'vk', 'twitter'].map(name => (
                  <Text
                    key={`actions${name}`}
                    id={`article.share-${name}`}
                    render={t => (
                      <a className="icon-button button" title={t}>
                        <span className={`article__${name}-icon icon-button__${name}-icon icon`}>
                          <i className={`fa fa-${name} fa-lg`} />
                        </span>
                      </a>
                    )}
                  />
                ))}
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
                    <Text
                      id="article.edit-article"
                      render={t => (
                        <Link
                          route={ROUTES_NAMES.article}
                          params={{ slug: articleId, mode: 'edit', articleLocale }}
                        >
                          <a
                            className="article-side__button article-side__button--edit icon-button button"
                            title={t}
                          >
                            <span className="icon-button__usual-icon icon">
                              <i className="fa fa-pencil fa-lg" />
                            </span>
                          </a>
                        </Link>
                      )}
                    />
                  </li>
                )}
                {['facebook', 'vk', 'twitter'].map(name => (
                  <li key={`side${name}`}>
                    <Text
                      id={`article.share-${name}`}
                      render={t => (
                        <a className="icon-button article-side__button button" title={t}>
                          <span className={`icon-button__${name}-icon icon`}>
                            <i className={`fa fa-${name} fa-lg`} />
                          </span>
                        </a>
                      )}
                    />
                  </li>
                ))}
              </ul>
              <div className="article-side__bottom">
                <Text
                  id="article.go-to-top"
                  render={t => (
                    <a className="article-side__button icon-button button" href="#top" title={t}>
                      <span className="icon-button__usual-icon icon">
                        <i className="fa fa-chevron-up fa-lg" />
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
  }
}

export default connect(mapStateToProps)(PublicArticle);
