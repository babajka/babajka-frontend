import React, { Component } from 'react';
import withRedux from 'next-redux-wrapper';
import chunk from 'lodash/chunk';
import cn from 'classnames';

import Text from 'components/common/Text';
import Icon from 'components/common/Icon';
import Clickable from 'components/common/Clickable';
import MailLink from 'components/common/MailLink';
import OutsideClickable from 'components/common/OutsideClickable';
import PageLayout from 'components/common/layout/PageLayout';
import TeamRow, { ROW_SIZE } from 'components/about/TeamRow';

import initStore from 'redux/store';
import { actions as auth } from 'redux/ducks/auth';
import request from 'utils/request';
import { getLocalizedTeam, getLocalizedVacancies } from 'utils/getters';
import rawTeam from 'data/team.json';
import rawVacancies from 'data/vacancies.json';

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
      <PageLayout className="page-content about-container" url={url} title="header.about">
        <div className="title">Wir.by</div>
        <div className="goal">
          <Text id="about.goal" />
        </div>
        <hr />
        {vacancies &&
          vacancies.length && (
            <>
              <div className="helpus">
                <div className="title">
                  <Text id="about.join-us" />
                </div>
                <Text id="about.looking-for" />
                <OutsideClickable onClick={() => this.setState({ openedVacancy: null })}>
                  <div className="positions is-centered">
                    {vacancies.map(vacancy => {
                      const active = openedVacancy && openedVacancy.id === vacancy.id;
                      return (
                        <Clickable
                          key={vacancy.id}
                          tag="div"
                          className={cn('position', { 'is-active': active })}
                          onClick={this.handleVacancyToggle.bind(null, vacancy)}
                        >
                          {vacancy.title} <Icon name={`chevron-circle-${active ? 'up' : 'down'}`} />
                        </Clickable>
                      );
                    })}
                  </div>
                  {openedVacancy && (
                    <div id="position-description" className="position-description">
                      <div className="name">{openedVacancy.title}</div>
                      {openedVacancy.description}
                      <br />
                      <MailLink />
                    </div>
                  )}
                </OutsideClickable>
              </div>
              <hr />
            </>
          )}
        {team &&
          team.length && (
            <>
              <div className="team">
                <div className="title">
                  <Text id="about.team" />
                </div>
                {/* eslint-disable-next-line react/no-array-index-key */}
                {teamChunks.map((data, index) => <TeamRow key={index} data={data} />)}
                <div className="thanks">
                  <Text id="about.thanks-beginning" />{' '}
                  <b>
                    <Text id="about.thanks-hanna" />{' '}
                  </b>
                  <Text id="about.thanks-logo-and" />{' '}
                  <b>
                    <Text id="about.thanks-daniil" />{' '}
                  </b>
                  <Text id="about.thanks-soundtrack" />
                </div>
              </div>
              <hr />
            </>
          )}
        <div className="contact">
          <Text id="about.find-us" />
          <br />
          <Text id="about.mail-to-us" />
          <br />
          <Text id="about.mail-to-dev" /> <MailLink />
          <br />
          <Text id="about.mail-to-help" /> <MailLink to="help" />
          <div className="talaka">
            <span className="talaka-text">
              <Text id="about.we-on" />
            </span>{' '}
            <a className="talaka" href="https://www.talaka.org/projects/2495/overview">
              <img
                className="talaka-text"
                alt="Talaka"
                src="/static/images/references/talaka_logo.png"
                width="30"
              />{' '}
              <span className="talaka-text">
                <Text id="about.talaka" />
              </span>
            </a>
          </div>
        </div>
      </PageLayout>
    );
  }
}

export default withRedux(initStore)(AboutPage);
