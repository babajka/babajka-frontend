import React, { Component, Fragment } from 'react';
import withRedux from 'next-redux-wrapper';
import chunk from 'lodash/chunk';

import Text from 'components/common/Text';
import Clickable from 'components/common/Clickable';
import PageLayout from 'components/common/layout/PageLayout';
import TeamRow, { ROW_SIZE } from 'components/about/TeamRow';

import initStore from 'redux/store';
import { actions as auth } from 'redux/ducks/auth';
import request from 'utils/request';
import { getLocalizedTeam, getLocalizedVacancies } from 'utils/getters';
import rawTeam from 'data/team.json';
import rawVacancies from 'data/vacancies.json';

const MailLink = ({ to = 'development' }) => (
  <a href={`mailto:wir.${to}@gmail.com`} target="_top">
    <u>wir.{to}@gmail.com</u>
  </a>
);

class AboutPage extends Component {
  static getInitialProps(ctx) {
    return request.populate(ctx, [auth.getCurrentUser]);
  }

  state = {
    openedVacancy: null,
  };

  handleVacancyToggle = vacancy => {
    const { openedVacancy } = this.state;
    if (openedVacancy && openedVacancy.id === vacancy.id) {
      this.setState({ openedVacancy: null });
      return;
    }
    this.setState({ openedVacancy: vacancy });
  };

  render() {
    const { openedVacancy } = this.state;
    const { url } = this.props;
    const { query: { lang } } = url;
    const vacancies = getLocalizedVacancies(rawVacancies, lang);
    const team = getLocalizedTeam(rawTeam, lang);
    const teamChunks = chunk(team, ROW_SIZE);

    return (
      <PageLayout url={url} title="header.about">
        <div className="about-container">
          <div className="title">Wir.by</div>
          <div className="goal">
            <Text id="common.goal" />
          </div>
          <hr />
          {vacancies &&
            vacancies.length && (
              <Fragment>
                <div className="helpus">
                  <div className="title">
                    <Text id="common.join-us" />
                  </div>
                  <Text id="common.looking-for" />
                  <div className="positions is-centered">
                    {vacancies.map(vacancy => (
                      <Clickable
                        key={vacancy.id}
                        tag="div"
                        className="position"
                        onClick={this.handleVacancyToggle.bind(null, vacancy)}
                      >
                        {vacancy.title}
                      </Clickable>
                    ))}
                  </div>
                  {openedVacancy && (
                    <div id="position-description" className="position-description">
                      <div className="name">{openedVacancy.title}</div>
                      {openedVacancy.description}
                      <br />
                      <MailLink />
                    </div>
                  )}
                </div>
                <hr />
              </Fragment>
            )}
          {team &&
            team.length && (
              <Fragment>
                <div className="team">
                  <div className="title">
                    <Text id="common.team" />
                  </div>
                  {/* eslint-disable-next-line react/no-array-index-key */}
                  {teamChunks.map((data, index) => <TeamRow key={index} data={data} />)}
                  <div className="thanks">
                    Выражаем падзяку <b>Ганне Бучко</b> (лагатып) і <b>Даніілу Пячэнка</b>{' '}
                    (саўндтрэк да лекцый).
                  </div>
                </div>
                <hr />
              </Fragment>
            )}
          <div className="contact">
            <Text id="common.find-us" />
            <br />
            <Text id="common.mail-to-us" />
            <br />
            <Text id="common.mail-to-dev" /> <MailLink />
            <br />
            <Text id="common.mail-to-help" /> <MailLink to="help" />
            <div className="talaka">
              <span className="talaka-text">
                <Text id="common.we-on" />
              </span>{' '}
              <a className="talaka" href="https://www.talaka.org/projects/2495/overview">
                <img
                  className="talaka-text"
                  alt="Talaka"
                  src="/static/images/references/talaka_logo.png"
                  width="30"
                />{' '}
                <span className="talaka-text">
                  <Text id="common.talaka" />
                </span>
              </a>
            </div>
          </div>
        </div>
      </PageLayout>
    );
  }
}

export default withRedux(initStore)(AboutPage);
