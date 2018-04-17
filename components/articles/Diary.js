import React, { Component } from 'react';

import Modal from 'components/common/Modal';
import Clickable from 'components/common/Clickable';

import { DiaryModel } from 'utils/customPropTypes';
import getTruncatedText from 'utils/text';

const MAX_WORDS_NUMBER = 70;

class Diary extends Component {
  constructor() {
    super();
    this.state = { isModalActive: false };
  }

  toggleModal = () => {
    this.setState(prevState => ({ isModalActive: !prevState.isModalActive }));
  };

  render() {
    const { author, text, month, day, year, getNextDiary, getPrevDiary } = this.props;
    const { isModalActive } = this.state;

    const dateElement = (
      <div className="date">
        {/* TODO: discuss how to represent date depending on locale */}
        <div className="is-pulled-right">{new Date(year, month, day).toDateString()}</div>
      </div>
    );

    return (
      <div className="diary-article tile is-parent">
        <article className="card tile is-child notification">
          <h1 className="title has-text-primary">Дзённік дня</h1>
          {dateElement}
          <Clickable
            className="icon is-small arrow arrow-left"
            onClick={getPrevDiary}
            onKeyPress={() => {}}
          >
            <i className="fa fa-chevron-left" />
          </Clickable>
          <Clickable
            className="icon is-small arrow arrow-right"
            onClick={getNextDiary}
            onKeyPress={() => {}}
          >
            <i className="fa fa-chevron-right" />
          </Clickable>
          <div className="content diary">{getTruncatedText(text, MAX_WORDS_NUMBER)}</div>
          <div className="control">
            <span className="subtitle">{author}</span>
            {/* TODO: add to i18n dictionary */}
            <button className="button is-light read-btn" onClick={this.toggleModal}>
              Чытаць
            </button>
          </div>

          <Modal
            isActive={isModalActive}
            title="Дзённік дня"
            toggle={this.toggleModal}
            renderBody={() => (
              <div>
                {dateElement}
                <div className="content diary">{text}</div>
              </div>
            )}
            renderFooter={() => <span className="subtitle">{author}</span>}
          />
        </article>
      </div>
    );
  }
}

Diary.propTypes = DiaryModel;

export default Diary;
