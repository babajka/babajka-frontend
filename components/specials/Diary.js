import React, { Component } from 'react';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';
import cn from 'classnames';

import Modal from 'components/common/Modal';
import Text from 'components/common/Text';
import TextWithBr from 'components/common/TextWithBr';
import Clickable from 'components/common/Clickable';
import Icon from 'components/common/Icon';

import { diaryActions, diarySelectors } from 'redux/ducks/diary';
import { isSameDay } from 'utils/validators';
import { formatDate } from 'utils/formatters';

import 'styles/legacy/specials/diary/diary.scss';

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

export const DiaryModel = {
  text: PropTypes.string.isRequired,
  date: PropTypes.number.isRequired,
  author: PropTypes.string.isRequired,
};

class Diary extends Component {
  static propTypes = {
    diary: PropTypes.shape(DiaryModel).isRequired,
    getNext: PropTypes.func.isRequired,
    getPrev: PropTypes.func.isRequired,
    getByDay: PropTypes.func.isRequired,
  };

  state = { isModalActive: false };

  componentDidMount() {
    const { getByDay } = this.props;
    getByDay();
  }

  toggleModal = () => this.setState(prevState => ({ isModalActive: !prevState.isModalActive }));

  renderDateElement = () => {
    const {
      diary: { date },
    } = this.props;
    return (
      <div className="date">
        <div className="is-pulled-right">{formatDate(date)}</div>
      </div>
    );
  };

  renderNavigationButton = (handleClick, { className, iconClassName, title }) => (
    <Text id={title}>
      {localizedTitle => (
        <Clickable
          className={cn('icon is-small arrow', className)}
          onClick={handleClick}
          title={localizedTitle}
        >
          <Icon name={iconClassName} />
        </Clickable>
      )}
    </Text>
  );

  renderModalElement = () => {
    const {
      diary: { text, author },
    } = this.props;
    const { isModalActive } = this.state;
    return (
      <Text id="diary.title">
        {title => (
          <Modal
            isActive={isModalActive}
            title={title}
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
        )}
      </Text>
    );
  };

  render() {
    const {
      diary: { author, text, date },
      getNext,
      getPrev,
    } = this.props;

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
          </Clickable>

          {this.renderNavigationButton(getPrev, NAV_BUTTONS.prev)}
          {!isSameDay(date) && this.renderNavigationButton(getNext, NAV_BUTTONS.next)}

          {this.renderModalElement()}
        </div>
      </div>
    );
  }
}

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(Diary);
