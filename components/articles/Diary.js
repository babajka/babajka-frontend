import React, { Component } from 'react';
import Modal from 'components/common/Modal';
import { DiaryModel } from 'utils/customPropTypes';
import getTruncatedText from 'utils/text';

const LEFT_ARROW_KEY = 37;
const RIGHT_ARROW_KEY = 38;

const MAX_WORDS_NUMBER = 70;

const text =
  'З калегам на выставе перасоўнікаў. Увогуле добрая, лепшая, чым у Акадэміі. Некаторыя рэчы Левітана [109] дасканалыя (сакавік, папараць), Сярова [110] (восень, партрэт), Шыльдэра [111] (вогнепаклоннікі). У майстэрні адчуваў сябе не вельмі. Калісьці сказалі мне, што я «соrbeau blanc» [112]. I сапраўды, так мала ў мяне агульнага з іншымі калегамі, такім чужым адчуваю сябе ў кожным натоўпе, як быццам бы я іншага гатунку....З калегам на выставе перасоўнікаў. Увогуле добрая, лепшая, чым у Акадэміі. Некаторыя рэчы Левітана [109] дасканалыя (сакавік, папараць), Сярова [110] (восень, партрэт), Шыльдэра [111] (вогнепаклоннікі). У майстэрні адчуваў сябе не вельмі. Калісьці сказалі мне, што я «соrbeau blanc» [112]. I сапраўды, так мала ў мяне агульнага з іншымі калегамі, такім чужым адчуваю сябе ў кожным натоўпе, як быццам бы я іншага гатунку....З калегам на выставе перасоўнікаў. Увогуле добрая, лепшая, чым у Акадэміі. Некаторыя рэчы Левітана [109] дасканалыя (сакавік, папараць), Сярова [110] (восень, партрэт), Шыльдэра [111] (вогнепаклоннікі). У майстэрні адчуваў сябе не вельмі. Калісьці сказалі мне, што я «соrbeau blanc» [112]. I сапраўды, так мала ў мяне агульнага з іншымі калегамі, такім чужым адчуваю сябе ў кожным натоўпе, як быццам бы я іншага гатунку....З калегам на выставе перасоўнікаў. Увогуле добрая, лепшая, чым у Акадэміі. Некаторыя рэчы Левітана [109] дасканалыя (сакавік, папараць), Сярова [110] (восень, партрэт), Шыльдэра [111] (вогнепаклоннікі). У майстэрні адчуваў сябе не вельмі. Калісьці сказалі мне, што я «соrbeau blanc» [112]. I сапраўды, так мала ў мяне агульнага з іншымі калегамі, такім чужым адчуваю сябе ў кожным натоўпе, як быццам бы я іншага гатунку....З калегам на выставе перасоўнікаў. Увогуле добрая, лепшая, чым у Акадэміі. Некаторыя рэчы Левітана [109] дасканалыя (сакавік, папараць), Сярова [110] (восень, партрэт), Шыльдэра [111] (вогнепаклоннікі). У майстэрні адчуваў сябе не вельмі. Калісьці сказалі мне, што я «соrbeau blanc» [112]. I сапраўды, так мала ў мяне агульнага з іншымі калегамі, такім чужым адчуваю сябе ў кожным натоўпе, як быццам бы я іншага гатунку....З калегам на выставе перасоўнікаў. Увогуле добрая, лепшая, чым у Акадэміі. Некаторыя рэчы Левітана [109] дасканалыя (сакавік, папараць), Сярова [110] (восень, партрэт), Шыльдэра [111] (вогнепаклоннікі). У майстэрні адчуваў сябе не вельмі. Калісьці сказалі мне, што я «соrbeau blanc» [112]. I сапраўды, так мала ў мяне агульнага з іншымі калегамі, такім чужым адчуваю сябе ў кожным натоўпе, як быццам бы я іншага гатунку....';

class Diary extends Component {
  constructor() {
    super();
    this.state = { isModalActive: false };
  }

  toggleModal = () => {
    this.setState(prevState => ({ isModalActive: !prevState.isModalActive }));
  };

  render() {
    const { author, month, day, year, getNextDiary, getPrevDiary } = this.props;
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
          <h1 className="title">Дзённік дня</h1>
          {dateElement}
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
