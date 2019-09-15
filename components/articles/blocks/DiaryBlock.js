import './diary.scss';

import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import ContentLoader from 'react-content-loader';

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

const DiaryLoader = () => (
  <ContentLoader height={120} width={700} speed={2} primaryColor="#f3f3f3" secondaryColor="#ecebeb">
    <rect x="14" y="50" rx="4" ry="4" width="117" height="10" />
    <rect x="14" y="75" rx="3" ry="3" width="123" height="9" />
    <rect x="14" y="90" rx="3" ry="3" width="123" height="9" />

    <rect x="171" y="60" rx="3" ry="3" width="350" height="6" />
    <rect x="171" y="75" rx="3" ry="3" width="350" height="6" />
    <rect x="171" y="90" rx="3" ry="3" width="201" height="6" />

    <circle cx="624" cy="70" r="56" />
    <rect x="16" y="128" rx="4" ry="4" width="541" height="6" />
  </ContentLoader>
);

// TODO: refactor with hooks
class DiaryBlock extends Component {
  static propTypes = {
    diary: PropTypes.shape(DiaryModel),
    getNext: PropTypes.func.isRequired,
    getPrev: PropTypes.func.isRequired,
    fetchData: PropTypes.func.isRequired,
  };

  static defaultProps = {
    diary: null,
  };

  // state = { opened: false };

  componentDidMount() {
    const { fetchData } = this.props;
    fetchData();
  }

  render() {
    const { diary, getNext, getPrev } = this.props;

    if (!diary) {
      return <DiaryLoader />;
    }
    const {
      author: { name, diaryImage },
      date,
      text,
    } = diary;

    return (
      <div className="block block__no-background diary">
        <div className="diary__content">
          <div className="diary__picture">
            <img src={diaryImage} alt={name} />
          </div>

          <div className="diary__text-content">
            <div className="diary__title">
              <span className="diary__date">{formatDate(date, SHORT_DATE_FORMAT)}</span>
              <span className="diary__year">{getYear(date)}</span>
              <span className="diary__name">{name}</span>
              <Text id="diary.wrote" />
            </div>
            <div className="diary__text">
              {fiberyRenderer(text.content)}
              {/* <Clickable linkStyle>Цалкам</Clickable> */}
            </div>
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
