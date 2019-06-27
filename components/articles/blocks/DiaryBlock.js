import './diary.scss';

import React, { Component } from 'react';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';

import TextWithSeparator from 'lib/components/TextWithSeparator';
import Icon from 'components/common/ui/Icon';
import LinkWrapper from 'components/common/ui/LinkWrapper';

import { diaryActions, diarySelectors } from 'redux/ducks/diary';
import { isSameDay } from 'utils/validators';
import { formatDate, getYear } from 'utils/formatters';
import { SHORT_DATE_FORMAT } from 'constants';

const mapStateToProps = state => ({
  diary: diarySelectors.getCurrent(state),
});

const mapDispatchToProps = {
  fetchData: diaryActions.getByDay,
  getNext: () => diaryActions.getClosest('next'),
  getPrev: () => diaryActions.getClosest('prev'),
};

const IMAGE_MOCK =
  'https://babajka.github.io/babajka-markup/static/images/mock/diary/karatkievich.png';

export const DiaryModel = {
  text: PropTypes.string.isRequired,
  date: PropTypes.number.isRequired,
  author: PropTypes.string.isRequired,
};

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
    const {
      diary: { author, text, date /* year - optional */ },
      getNext,
      getPrev,
    } = this.props;

    return (
      <div className="block block__no-background diary">
        <div className="diary__content">
          <div className="diary__picture">
            <img src={IMAGE_MOCK} alt={author} />
          </div>

          <div className="diary__text-content">
            <div className="diary__title">
              <span className="diary__date">{formatDate(date, SHORT_DATE_FORMAT)}</span>
              <span className="diary__year">{getYear(date)}</span>
              <span className="diary__name">{author}</span>
              {/* FIXME */}
              <span>занатаваў у дзённіку: </span>
            </div>
            <div className="diary__text">
              <TextWithSeparator text={text} symbol={'<br/>'} />
              <LinkWrapper>Цалкам</LinkWrapper>
            </div>
          </div>

          <div className="diary__arrows">
            <LinkWrapper onClick={getPrev}>
              <Icon name="long-arrow-alt-left" />
            </LinkWrapper>
            <LinkWrapper disabled={isSameDay(date)} onClick={getNext}>
              <Icon name="long-arrow-alt-right" />
            </LinkWrapper>
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
