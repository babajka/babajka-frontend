import React, { Component } from 'react';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';
import cn from 'classnames';

import Modal from 'components/common/Modal';
import Text, { localize } from 'components/common/Text';
import TextWithBr from 'components/common/TextWithBr';
import Clickable from 'components/common/Clickable';
import Icon from 'components/common/Icon';

import { actions as diaryActions, selectors as diarySelectors } from 'redux/ducks/diary';
import { isSameDay } from 'utils/validators';
import { formatDate } from 'utils/formatters';

const mapStateToProps = state => ({
  diary: diarySelectors.getCurrent(state),
});

const mapDispatchToProps = {
  getByDay: diaryActions.getByDay,
  getNext: () => diaryActions.getClosest('next'),
  getPrev: () => diaryActions.getClosest('prev'),
};

const NAV_BUTTONS = {
  next: {
    className: 'arrow-right',
    iconClassName: 'chevron-right',
    title: 'diary.next',
  },
  prev: {
    className: 'arrow-left',
    iconClassName: 'chevron-left',
    title: 'diary.previous',
  },
};

class Diary extends Component {
  constructor() {
    super();
    this.state = { isModalActive: false };
  }

  componentDidMount() {
    this.props.getByDay();
  }

  toggleModal = () => this.setState(prevState => ({ isModalActive: !prevState.isModalActive }));

  renderDateElement = () => {
    const { diary: { date } } = this.props;
    return (
      <div className="date">
        <div className="is-pulled-right">{formatDate(date)}</div>
      </div>
    );
  };

  renderNavigationButton = (handleClick, { className, iconClassName, title }) => {
    const { lang } = this.props;
    return (
      <Clickable
        className={cn('icon is-small arrow', className)}
        onClick={handleClick}
        title={localize(title, lang)}
      >
        <Icon name={iconClassName} />
      </Clickable>
    );
  };

  renderModalElement = () => {
    const { diary: { text, author }, lang } = this.props;
    const { isModalActive } = this.state;
    return (
      <Modal
        isActive={isModalActive}
        title={localize('diary.title', lang)}
        toggle={this.toggleModal}
        renderBody={() => (
          <div>
            <div className="diary-content">
              <TextWithBr text={text} />
            </div>
            {this.renderDateElement()}
          </div>
        )}
        renderFooter={() => <span className="subtitle">{author}</span>}
      />
    );
  };

  render() {
    const { diary: { author, text, date }, getNext, getPrev } = this.props;

    return (
      <div className="tile is-parent">
        <div className="card tile is-child diary-wrapper">
          <Clickable tag="article" className="diary-article" onClick={this.toggleModal}>
            <h1 className="title">
              <Text id="diary.title" />
            </h1>

            {text && this.renderDateElement()}

            {text ? (
              <div className="diary-content">
                <div className="text">
                  <TextWithBr text={text} />
                </div>
                <div className="ellipsis">...</div>
              </div>
            ) : (
              <div className="no-content">
                <img
                  className="logo-image"
                  src="/static/images/logo/turq-transparent.png"
                  alt="Wir.by logo"
                />
              </div>
            )}

            <span className="author">{author}</span>

            <div className="hover-read-more">
              <Text id="diary.read" />
            </div>
          </Clickable>

          {this.renderNavigationButton(getPrev, NAV_BUTTONS.prev)}
          {!isSameDay(date) && this.renderNavigationButton(getNext, NAV_BUTTONS.next)}

          {this.renderModalElement()}
        </div>
      </div>
    );
  }
}

export const DiaryModel = {
  text: PropTypes.string.isRequired,
  date: PropTypes.number.isRequired,
  author: PropTypes.string.isRequired,
};

Diary.propTypes = {
  diary: PropTypes.shape(DiaryModel).isRequired,
  lang: PropTypes.string.isRequired,
  getNext: PropTypes.func.isRequired,
  getPrev: PropTypes.func.isRequired,
  getByDay: PropTypes.func.isRequired,
};

export default connect(mapStateToProps, mapDispatchToProps)(Diary);
