import React, { Component } from 'react';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';

import Modal from 'components/common/Modal';
import Clickable from 'components/common/Clickable';

import { actions as diaryActions, selectors as diarySelectors } from 'redux/ducks/diary';

import getTruncatedText from 'utils/text';
import { isToday } from 'utils/validators';
import { DiaryShape } from 'utils/customPropTypes';

//  TODO: { url: { query } }
const mapStateToProps = state => ({
  diary: diarySelectors.getCurrent(state),
});

const mapDispatchToProps = {
  getByDay: diaryActions.getByDay,
  getClosest: diaryActions.getClosest,
};

const MAX_WORDS_NUMBER = 70;

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

  renderNavigationButton = (handleClick, direction) => (
    <Clickable
      className={`icon is-small arrow arrow-${direction}`}
      onClick={handleClick}
      onKeyPress={() => {}}
    >
      <i className={`fa fa-chevron-${direction}`} />
    </Clickable>
  );

  renderModalElement = () => {
    const { diary: { text, author } } = this.props;
    const { isModalActive } = this.state;
    return (
      <Modal
        isActive={isModalActive}
        title="Дзённік дня"
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
    const { diary: { author, text, date }, getClosest } = this.props;

    return (
      <div className="diary-article tile is-parent">
        <article className="card tile is-child notification is-flex">
          <h1 className="title has-text-primary">Дзённік дня</h1>

          {this.renderDateElement()}

          {this.renderNavigationButton(getClosest, 'left')}
          {!isToday(date) && this.renderNavigationButton(getClosest, 'right')}

          {text ? (
            <div className="content diary">{getTruncatedText(text, MAX_WORDS_NUMBER)}</div>
          ) : (
            <div className="no-text">Сёння зусім не думаецца...</div>
          )}

          <div className="control">
            <span className="subtitle">{author}</span>
            {/* TODO: add to i18n dictionary */}
            <button className="button is-light read-btn" onClick={this.toggleModal}>
              Чытаць
            </button>
          </div>

          {this.renderModalElement()}
        </article>
      </div>
    );
  }
}

Diary.propTypes = {
  diary: DiaryShape,
  getClosest: PropTypes.func.isRequired,
  getByDay: PropTypes.func.isRequired,
};

Diary.defaultProps = {
  diary: {},
};

export default connect(mapStateToProps, mapDispatchToProps)(Diary);
