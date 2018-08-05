import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';

import Text from 'components/common/Text';
import Modal from 'components/common/Modal';
import Button from 'components/common/Button';

const mapDispatchToProps = (dispatch, { action }) => ({
  confirmAction: () => dispatch(action()),
});

class ActionWithConfirm extends Component {
  static propTypes = {
    render: PropTypes.func.isRequired,
    // eslint-disable-next-line react/no-unused-prop-types
    action: PropTypes.func.isRequired,
    confirmAction: PropTypes.func.isRequired,
    successCallback: PropTypes.func,
  };

  static defaultProps = {
    successCallback: null,
  };

  state = {
    confirmOpened: false,
  };

  componentDidMount() {}

  handleToggleModal = () =>
    this.setState(({ confirmOpened }) => ({ confirmOpened: !confirmOpened }));

  handleConfirm = () => {
    const { confirmAction, successCallback } = this.props;
    this.setState({ pending: true });
    confirmAction().then(() => {
      if (successCallback) {
        successCallback();
        return;
      }
      this.setState({ pending: false, confirmOpened: false });
    });
  };

  render() {
    const { render } = this.props;
    const { confirmOpened, pending } = this.state;
    return (
      <>
        <Modal
          isActive={confirmOpened}
          title={<Text id="common.are-you-sure" />}
          toggle={this.handleToggleModal}
          footerClassName="confirm-footer"
          small
          renderFooter={() => (
            <>
              <Button className="button" onClick={this.handleToggleModal}>
                <Text id="common.cancel" />
              </Button>
              <Button className="button is-danger" onClick={this.handleConfirm} pending={pending}>
                <Text id="common.yes" />
              </Button>
            </>
          )}
        />
        {render({ onClick: this.handleToggleModal })}
      </>
    );
  }
}

export default connect(null, mapDispatchToProps)(ActionWithConfirm);
