import React, { Component } from 'react';
import { injectIntl, defineMessages, intlShape } from 'react-intl';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';
import classNames from 'classnames/bind';
import { GhostButton } from 'components/buttons/ghostButton';
import ExportIcon from 'common/img/export-inline.svg';
import InviteUserIcon from 'common/img/ic_invite-inline.svg';
import AddUserIcon from 'common/img/ic-add-user-inline.svg';
import { allUsersSelector } from 'controllers/administrate/allUsers';
import { showNotification, NOTIFICATION_TYPES } from 'controllers/notification';
import { showModalAction } from 'controllers/modal';
import { EXPORT, INVITE_USER, ADD_USER } from './constants';
import styles from './actionPanel.scss';

const cx = classNames.bind(styles);

const messages = defineMessages({
  [EXPORT]: {
    id: 'AllUsersPage.export',
    defaultMessage: 'Export',
  },
  [INVITE_USER]: {
    id: 'AllUsersPage.inviteUser',
    defaultMessage: 'Invite user',
  },
  [ADD_USER]: {
    id: 'AllUsersPage.AddUser',
    defaultMessage: 'Add user',
  },
  addUserNotification: {
    id: 'ActionPanel.addUserNotification',
    defaultMessage: 'Member was successfully created',
  },
});

@connect(
  (state) => ({
    users: allUsersSelector(state),
  }),
  {
    showModal: showModalAction,
    showNotification,
  },
)
@injectIntl
export class ActionPanel extends Component {
  static propTypes = {
    intl: intlShape.isRequired,
    showNotification: PropTypes.func,
  };
  static defaultProps = {
    showNotification: () => {},
  };
  onAddUser = () => {
    const { intl } = this.props;
    this.props.showNotification({
      type: NOTIFICATION_TYPES.SUCCESS,
      message: intl.formatMessage(messages.addUserNotification),
    });
  };
  renderHeaderButtons = () => {
    const {
      intl: { formatMessage },
    } = this.props;
    const ACTION_BUTTONS = [
      {
        key: EXPORT,
        icon: ExportIcon,
        grayBorder: true,
      },
      {
        key: INVITE_USER,
        icon: InviteUserIcon,
        grayBorder: false,
      },
      {
        key: ADD_USER,
        icon: AddUserIcon,
        grayBorder: false,
        onClick: this.onAddUser,
      },
    ];
    return (
      <div className={cx('action-buttons')}>
        {ACTION_BUTTONS.map(({ key, icon, grayBorder, onClick }) => (
          <div className={cx('action-button')} key={key}>
            <GhostButton icon={icon} grayBorder={grayBorder} onClick={onClick}>
              {formatMessage(messages[key])}
            </GhostButton>
          </div>
        ))}
      </div>
    );
  };

  render() {
    return this.renderHeaderButtons();
  }
}
