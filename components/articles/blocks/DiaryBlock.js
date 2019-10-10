import './diary.scss';

import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';

import Text from 'components/common/Text';
import Clickable from 'components/common/Clickable';
import Image from 'components/common/Image';
import Icon from 'components/common/ui/Icon';

import { diaryActions, diarySelectors } from 'redux/ducks/diary';
import { isSameDay } from 'utils/validators';
import { formatDate, getYear } from 'utils/formatters';
import fiberyToString from 'utils/fibery/toString';

import { SHORT_DATE_FORMAT } from 'constants';

import BlockWrapper from './BlockWrapper';

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

const DIARY_PICTURE_WIDTH = 180;

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
      <BlockWrapper className="diary">
        <div className="diary__content">
          {diaryImage && (
            <div className="diary__picture">
              <Image alt={name} sourceSizes={[DIARY_PICTURE_WIDTH]} baseUrl={diaryImage} mode="x" />
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
              <div className="diary__text-wrap">
                <div className="diary__text">{fiberyToString(text.content)}</div>
                <Clickable linkStyle>
                  <Text id="diary.more" />
                </Clickable>
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
      </BlockWrapper>
    );
  }
}

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(DiaryBlock);
