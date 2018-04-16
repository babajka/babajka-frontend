import React from 'react';

import { DiaryModel } from 'utils/customPropTypes';

const LEFT_ARROW_KEY = 37;
const RIGHT_ARROW_KEY = 38;

const MAX_WORDS_NUMBER = 70;

/* TODO: move it to utils */
const getTruncatedText = (text, maxLength) => {
  const words = text.split(' ');
  return `${words.slice(0, maxLength).join(' ')}...`;
};

const Diary = ({ author, text, month, day, year, getNextDiary, getPrevDiary }) => (
  <div className="diary-article tile is-parent">
    <article className="card tile is-child notification">
      <h1 className="title">Дзённік дня</h1>
      <div className="date">
        {/* TODO: discuss how to represent date depending on locale */}
        <div className="is-pulled-right">{new Date(year, month, day).toDateString()}</div>
      </div>
      <span
        className="icon is-small arrow arrow-left"
        role="button"
        tabIndex="0"
        onKeyDown={e => e.keyCode === LEFT_ARROW_KEY && getPrevDiary()}
        onClick={getPrevDiary}
      >
        <i className="fa fa-chevron-left" />
      </span>
      <span
        className="icon is-small arrow arrow-right"
        role="button"
        tabIndex="0"
        onKeyDown={e => e.keyCode === RIGHT_ARROW_KEY && getNextDiary()}
        onClick={getNextDiary}
      >
        <i className="fa fa-chevron-right" />
      </span>
      <div className="content diary">{getTruncatedText(text, MAX_WORDS_NUMBER)}</div>
      <div className="control">
        <span className="subtitle">{author}</span>
        {/* TODO: add to i18n dictionary */}
        <button className="button is-light read-btn">Чытаць</button>
      </div>
    </article>
  </div>
);

Diary.propTypes = DiaryModel;

export default Diary;
