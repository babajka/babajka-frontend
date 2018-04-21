import React, { Component } from 'react';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';
import classNames from 'classnames';

import Modal from 'components/common/Modal';
import Text from 'components/common/Text';
import Clickable from 'components/common/Clickable';

import { actions as diaryActions, selectors as diarySelectors } from 'redux/ducks/diary';

import getTruncatedText from 'utils/text';
import { isToday } from 'utils/validators';

const mapStateToProps = state => ({
  diary: diarySelectors.getCurrent(state),
});

const mapDispatchToProps = {
  getByDay: diaryActions.getByDay,
  getNext: () => diaryActions.getClosest('next'),
  getPrev: () => diaryActions.getClosest('prev'),
};

const MAX_WORDS_NUMBER = 70;

const NAV_BUTTONS = {
  next: {
    className: 'arrow-right',
    iconClassName: 'fa-chevron-right',
  },
  prev: {
    className: 'arrow-left',
    iconClassName: 'fa-chevron-left',
  },
};

class Diary extends Component {
  constructor() {
    super();
    this.state = { isModalActive: false };
  }

  componentDidMount() {
    const { getByDay } = this.props;
    getByDay();
  }

  toggleModal = () => this.setState(prevState => ({ isModalActive: !prevState.isModalActive }));

  renderDateElement = () => (
    <div className="date">
      {/* TODO: discuss how to represent date depending on locale */}
      <div className="is-pulled-right">{new Date(this.props.diary.date).toDateString()}</div>
    </div>
  );

  renderNavigationButton = (handleClick, { className, iconClassName }) => (
    <Clickable
      className={classNames('icon is-small arrow', className)}
      onClick={handleClick}
      onKeyPress={() => {}}
    >
      <i className={classNames('fa', iconClassName)} />
    </Clickable>
  );

  renderModalElement = () => {
    const { diary: { text, author } } = this.props;
    const { isModalActive } = this.state;
    return (
      <Modal
        isActive={isModalActive}
        title={<Text id="diary.title" />}
        toggle={this.toggleModal}
        renderBody={() => (
          <div>
            {this.renderDateElement()}
            <div className="content diary">{text}</div>
          </div>
        )}
        renderFooter={() => <span className="subtitle">{author}</span>}
      />
    );
  };

  render() {
    const { diary: { author, text, date }, getNext, getPrev } = this.props;

    return (
      <div className="diary-article tile is-parent">
        <article className="card tile is-child notification is-flex">
          <h1 className="title has-text-primary">
            <Text id="diary.title" />
          </h1>

          {this.renderDateElement()}

          {this.renderNavigationButton(getPrev, NAV_BUTTONS.prev)}
          {!isToday(date) && this.renderNavigationButton(getNext, NAV_BUTTONS.next)}

          {text ? (
            <div className="content diary">{getTruncatedText(text, MAX_WORDS_NUMBER)}</div>
          ) : (
            <div className="no-text">
              <Text id="diary.noText" />
            </div>
          )}

          <div className="control">
            <span className="subtitle">{author}</span>
            {text && (
              <button className="button is-light read-btn" onClick={this.toggleModal}>
                <Text id="diary.read" />
              </button>
            )}
          </div>

          {this.renderModalElement()}
        </article>
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
  getNext: PropTypes.func.isRequired,
  getPrev: PropTypes.func.isRequired,
  getByDay: PropTypes.func.isRequired,
};

export default connect(mapStateToProps, mapDispatchToProps)(Diary);
