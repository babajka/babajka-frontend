import React, { Component } from 'react';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';
import moment from 'moment';
import classNames from 'classnames';

import Modal from 'components/common/Modal';
import Text, { localize } from 'components/common/Text';
import Clickable from 'components/common/Clickable';

import { actions as diaryActions, selectors as diarySelectors } from 'redux/ducks/diary';
import { isToday } from 'utils/validators';
import { DEFAULT_LOCALE } from 'constants';

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
    iconClassName: 'fa-chevron-right',
    title: 'diary.next',
  },
  prev: {
    className: 'arrow-left',
    iconClassName: 'fa-chevron-left',
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
    const { lang, diary: { date } } = this.props;
    return (
      <div className="date">
        <div className="is-pulled-right">
          {moment(date)
            .locale(lang)
            .format('LL')}
        </div>
      </div>
    );
  };

  renderNavigationButton = (handleClick, { className, iconClassName, title }) => {
    const { lang } = this.props;
    return (
      <Clickable
        className={classNames('icon is-small arrow', className)}
        onClick={handleClick}
        title={localize(title, lang)}
        onKeyPress={() => {}}
      >
        <i className={classNames('fa', iconClassName)} />
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
            <div className="diary-content">{text}</div>
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
          <article className="diary-article">
            <h1 className="title has-text-primary">
              <Text id="diary.title" />
            </h1>

            {this.renderDateElement()}

            {text ? (
              <div className="diary-content">
                <div className="text">{text}</div>
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

            <div className="control">
              <span className="subtitle author">{author}</span>
              {text && (
                <button className="button is-light read-btn" onClick={this.toggleModal}>
                  <Text id="diary.read" />
                </button>
              )}
            </div>
          </article>

          {this.renderNavigationButton(getPrev, NAV_BUTTONS.prev)}
          {!isToday(date) && this.renderNavigationButton(getNext, NAV_BUTTONS.next)}

          {this.renderModalElement()}
        </div>
      </div>
    );
  }
}

export const DiaryModel = {
  text: PropTypes.string.isRequired,
  date: PropTypes.instanceOf(Date).isRequired,
  author: PropTypes.string.isRequired,
};

Diary.propTypes = {
  diary: PropTypes.shape(DiaryModel).isRequired,
  lang: PropTypes.string,
  getNext: PropTypes.func.isRequired,
  getPrev: PropTypes.func.isRequired,
  getByDay: PropTypes.func.isRequired,
};

Diary.defaultProps = {
  lang: DEFAULT_LOCALE,
};

export default connect(mapStateToProps, mapDispatchToProps)(Diary);
