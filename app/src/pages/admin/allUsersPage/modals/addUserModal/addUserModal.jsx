import React, { Component } from 'react';
import track from 'react-tracking';
import PropTypes from 'prop-types';
import { ModalLayout, withModal } from 'components/main/modal';

@withModal('allUsersAddUserModal')
@track()
export class AddUserModal extends Component {
  static propTypes = {
    data: PropTypes.object,
    tracking: PropTypes.shape({
      getTrackingData: PropTypes.func,
    }).isRequired,
  };

  static defaultProps = {
    data: {},
  };

  render() {
    const { message, onSubmit, title, submitText, cancelText } = this.props.data;

    return (
      <ModalLayout
        title={title}
        okButton={{
          text: submitText,
          danger: false,
          onClick: (closeModal) => {
            closeModal();
            onSubmit();
          },
        }}
        cancelButton={{
          text: cancelText,
        }}
      >
        <div>{message}</div>
      </ModalLayout>
    );
  }
}
