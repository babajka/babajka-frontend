import './diary.scss';

import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';

import Text from 'components/common/Text';
import Clickable from 'components/common/Clickable';
import Icon from 'components/common/ui/Icon';

import { diaryActions, diarySelectors } from 'redux/ducks/diary';
import { isSameDay } from 'utils/validators';
import { formatDate, getYear } from 'utils/formatters';
import fiberyRenderer from 'utils/fibery/renderer';

import { SHORT_DATE_FORMAT } from 'constants';

const mapStateToProps = (state, { lang }) => ({
  diary: diarySelectors.getCurrent(state, lang),
});

const mapDispatchToProps = {
  fetchData: diaryActions.getByDay,
  getNext: () => diaryActions.getClosest('next'),
  getPrev: () => diaryActions.getClosest('prev'),
};

export const DiaryModel = {
  text: PropTypes.object.isRequired,
  date: PropTypes.number.isRequired,
  author: PropTypes.shape({
    name: PropTypes.string.isRequired,
    diaryImage: PropTypes.string.isRequired,
  }),
};

// TODO: refactor with hooks
class DiaryBlock extends Component {
  static propTypes = {
    diary: PropTypes.shape(DiaryModel).isRequired,
    getNext: PropTypes.func.isRequired,
    getPrev: PropTypes.func.isRequired,
    fetchData: PropTypes.func.isRequired,
  };

  // state = { opened: false };

  componentDidMount() {
    const { fetchData } = this.props;
    fetchData();
  }

  render() {
    const { diary, getNext, getPrev } = this.props;

    const { author: { name, diaryImage } = {}, date, text } = diary;

    return (
      <div className="block block__no-background diary">
        <div className="diary__content">
          {diaryImage && (
            <div className="diary__picture">
              <img src={diaryImage} alt={name} />
            </div>
          )}

          <div className="diary__text-content">
            <div className="diary__title">
              <span className="diary__date">{formatDate(date, SHORT_DATE_FORMAT)}</span>
              <span className="diary__year">{getYear(date)}</span>
              <span className="diary__name">{name}</span>
              <Text id="diary.wrote" />
            </div>
            {text && (
              <div className="diary__text">
                {fiberyRenderer(text.content)}
                {/* <Clickable linkStyle>Цалкам</Clickable> */}
              </div>
            )}
          </div>
          <div className="diary__arrows">
            <Clickable onClick={getPrev} linkStyle titleId="diary.previous">
              <Icon name="long-arrow-alt-left" />
            </Clickable>
            <Clickable disabled={isSameDay(date)} onClick={getNext} linkStyle titleId="diary.next">
              <Icon name="long-arrow-alt-right" />
            </Clickable>
          </div>
        </div>
      </div>
    );
  }
}

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(DiaryBlock);
