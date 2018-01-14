import React from 'react';
import PropTypes from 'prop-types';

const Diary = ({ text, author, date }) => (
  <div className="diary-article tile is-parent">
    <article className="card tile is-child notification">
      <h1 className="title">Дзённік дня</h1>
      <div className="date">
        <span>{date}</span>
      </div>
      <span className="icon is-small arrow arrow-left">
        <i className="fa fa-chevron-left" />
      </span>
      <span className="icon is-small arrow arrow-right">
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
};

export default Diary;
