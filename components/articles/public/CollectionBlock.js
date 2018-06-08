import React, { Component, Fragment } from 'react';

import Text from 'components/common/Text';
import { CollectionShape } from 'utils/customPropTypes';
import Arrow, { ArrowHint } from './Arrow';

export default class CollectionBlock extends Component {
  static propTypes = {
    data: CollectionShape.isRequired,
  };

  state = {
    activeArrowName: '',
  };

  setActiveArrow = activeArrowName => this.setState({ activeArrowName });

  render() {
    const { data: { name, prev = {}, next = {} } } = this.props;
    const { activeArrowName } = this.state;

    return (
      <Fragment>
        <div className="article__collection-block article__another-names is-hidden-touch">
          <ArrowHint name="previous" activeName={activeArrowName} data={prev} />
          <ArrowHint name="next" activeName={activeArrowName} data={next} />
        </div>
        <div className="article__collection-block">
          <Arrow name="previous" setActive={this.setActiveArrow} data={prev} />
          <div className="has-text-centered">
            <Text
              id="article.open-collection-articles"
              render={t => (
                <a className="article__collection is-uppercase" title={t}>
                  {name}
                </a>
              )}
            />
          </div>
          <Arrow name="next" setActive={this.setActiveArrow} data={next} />
        </div>
      </Fragment>
    );
  }
}
