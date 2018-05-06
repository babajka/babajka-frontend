import React, { Component } from 'react';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';
import classNames from 'classnames';

import Modal from 'components/common/Modal';
import Text from 'components/common/Text';
import Clickable from 'components/common/Clickable';

import { actions as diaryActions, selectors as diarySelectors } from 'redux/ducks/diary';

import { isToday } from 'utils/validators';

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
  getNext: PropTypes.func.isRequired,
  getPrev: PropTypes.func.isRequired,
  getByDay: PropTypes.func.isRequired,
};

export default connect(mapStateToProps, mapDispatchToProps)(Diary);
