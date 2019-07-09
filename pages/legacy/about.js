import React, { Component } from 'react';
import chunk from 'lodash/chunk';
import cn from 'classnames';

import Text from 'components/common/Text';
import Icon from 'components/common/ui/Icon';
import Clickable from 'components/common/Clickable';
import OutsideClickable from 'components/common/OutsideClickable';

import MailLink from 'components/social/MailLink';
import TeamRow, { ROW_SIZE } from 'components/about/TeamRow';

import { getLocalizedTeam, getLocalizedVacancies } from 'utils/getters';
import { LangType } from 'utils/customPropTypes';

import rawTeam from 'data/team.json';
import rawVacancies from 'data/vacancies.json';

class AboutPage extends Component {
  static propTypes = {
    lang: LangType.isRequired,
  };

  static getLayoutProps = () => ({
    title: 'header.about',
  });

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
    const { lang } = this.props;
    const { openedVacancy } = this.state;
    const vacancies = getLocalizedVacancies(rawVacancies, lang).map((vac, index) => ({
      ...vac,
      id: index,
    }));
    const team = getLocalizedTeam(rawTeam, lang);
    const teamChunks = chunk(team, ROW_SIZE);

    return (
      <div className="page-content about-container">
        <div className="title">Wir.by</div>
        <div className="goal">
          <Text id="about.goal" />
        </div>
        <hr />
        {vacancies.length && (
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
        {team.length && (
          <>
            <div className="team">
              <div className="title">
                <Text id="about.team" />
              </div>
              {teamChunks.map((data, index) => (
                // eslint-disable-next-line react/no-array-index-key
                <TeamRow key={index} data={data} />
              ))}
              <Text id="about.thanks">
                {(thanks, hanna, forLogo, daniil, forSoundtrack) => (
                  <div className="thanks">
                    {thanks}
                    <b>{hanna}</b>
                    {forLogo}
                    <b>{daniil}</b>
                    {forSoundtrack}
                  </div>
                )}
              </Text>
            </div>
            <hr />
          </>
        )}
        <Text id="about.contact">
          {(findUs, mailToUs, mailToDev, mailToHelp, weOn, talaka) => (
            <div className="contact">
              {findUs}
              <br />
              {mailToUs}
              <br />
              {mailToDev}
              <MailLink />
              <br />
              {mailToHelp}
              <MailLink to="help" />
              <div className="talaka">
                <span className="talaka-text">{weOn}</span>{' '}
                <a className="talaka" href="https://www.talaka.org/projects/2495/overview">
                  <img
                    className="talaka-text"
                    alt="Talaka"
                    src="/static/images/references/talaka_logo.png"
                    width="30"
                  />{' '}
                  <span className="talaka-text">{talaka}</span>
                </a>
              </div>
            </div>
          )}
        </Text>
      </div>
    );
  }
}

export default AboutPage;
