import React, { Component, Fragment } from 'react';
import PropTypes from 'prop-types';
import cn from 'classnames';

import Icon from 'components/common/Icon';
import Text from 'components/common/Text';
import Clickable from 'components/common/Clickable';
import { AuthorShape } from 'utils/customPropTypes';

import InfoIcon from './InfoIcon';

const AuthorClickable = ({ displayName, isOpen, onClick }) => (
  <Clickable
    className={cn('article__info-item article__info-item--clickable', {
      'is-hidden-desktop': isOpen,
    })}
    onClick={onClick}
  >
    <InfoIcon name="user" />
    <span className="article__info-link">{displayName}</span>
    <span className="icon">
      <Icon name={`angle-${isOpen ? 'down' : 'up'}`} />
    </span>
  </Clickable>
);

AuthorClickable.propTypes = {
  displayName: PropTypes.string.isRequired,
  onClick: PropTypes.func.isRequired,
  isOpen: PropTypes.bool,
};

AuthorClickable.defaultProps = {
  isOpen: false,
};

// TODO(andemerie): add 'author' field to all 'article' objects on server, even if this article doesn't have author
export default class AuthorBlock extends Component {
  static propTypes = {
    data: AuthorShape.isRequired,
  };

  state = {
    opened: false,
  };

  onToggle = () => this.setState(({ opened }) => ({ opened: !opened }));

  render() {
    const { data: { bio, imageUrl, displayName } } = this.props;
    const { opened } = this.state;

    return (
      <Fragment>
        {opened && (
          <div className="article__author-block is-hidden-desktop">
            <AuthorClickable displayName={displayName} onClick={this.onToggle} />
            <div className="article__author-info">
              <figure className="article__author-image-wrap image is-48x48">
                <Text
                  id="article.author-photo"
                  render={t => <img className="article__author-image" src={imageUrl} alt={t} />}
                />
              </figure>
              {bio}
            </div>
          </div>
        )}
        {!opened && <AuthorClickable displayName={displayName} isOpen onClick={this.onToggle} />}
        <div className="dropdown is-hoverable is-hidden-touch">
          <div className="dropdown-trigger">
            <a
              className="article__info-item article__info-item--clickable"
              aria-haspopup="true"
              aria-controls="author-dropdown"
            >
              <InfoIcon name="user" />
              {displayName}
            </a>
          </div>
          <div className="article__author-menu dropdown-menu" id="author-dropdown" role="menu">
            <div className="dropdown-content">
              <div className="dropdown-item">
                <div className="article__author-top media">
                  <div className="media-left">
                    <figure className="image is-48x48">
                      <Text
                        id="article.author-photo"
                        render={t => (
                          <img className="article__author-image" src={imageUrl} alt={t} />
                        )}
                      />
                    </figure>
                  </div>
                  <div className="media-content">
                    <p className="article__author-name is-size-6">{displayName}</p>
                    {/* TODO(andemerie): think about what info it might be */}
                    <p>Якая-небудзь інфа пра аўтара</p>
                  </div>
                </div>
                <div className="content">{bio}</div>
              </div>
            </div>
          </div>
        </div>
      </Fragment>
    );
  }
}
