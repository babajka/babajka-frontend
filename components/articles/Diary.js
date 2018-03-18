import React from 'react';
import PropTypes from 'prop-types';

const LEFT_ARROW_KEY = 37;
const RIGHT_ARROW_KEY = 38;

const Diary = ({ text, author, date, getNextDiary, getPrevDiary }) => (
  <div className="diary-article tile is-parent">
    <article className="card tile is-child notification">
      <h1 className="title">Дзённік дня</h1>
      <div className="date">
        <span>{date}</span>
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
      <div className="content diary">{text}</div>
      <p className="subtitle">{author}</p>
    </article>
  </div>
);

Diary.propTypes = {
  text: PropTypes.string.isRequired,
  date: PropTypes.string.isRequired,
  author: PropTypes.string.isRequired,
  getNextDiary: PropTypes.func.isRequired,
  getPrevDiary: PropTypes.func.isRequired,
};

export default Diary;
