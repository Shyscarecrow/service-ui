import React, { Component } from 'react';
import { connect } from 'react-redux';
import track from 'react-tracking';
import PropTypes from 'prop-types';
import classNames from 'classnames/bind';
import { injectIntl, intlShape, defineMessages } from 'react-intl';
import { reduxForm } from 'redux-form';
import { FieldErrorHint } from 'components/fields/fieldErrorHint';
import { FieldProvider } from 'components/fields/fieldProvider';
import { Input } from 'components/inputs/input';
import { validate } from 'common/utils';
import { URLS } from 'common/urls';
import { ROLES_MAP, MEMBER } from 'common/constants/projectRoles';
import { ACCOUNT_ROLES_MAP, USER } from 'common/constants/accountRoles';
import { ModalLayout, withModal, ModalField } from 'components/main/modal';
import { SectionHeader } from 'components/main/sectionHeader';
import { InputDropdown } from 'components/inputs/inputDropdown';
import { InputTagsSearch } from 'components/inputs/inputTagsSearch';
import { activeProjectSelector } from 'controllers/user';
import styles from './addUserModal.scss';

const cx = classNames.bind(styles);

const LABEL_WIDTH = 105;

const messages = defineMessages({
  contentTitle: {
    id: 'AddUserModal.contentTitle',
    defaultMessage: 'Add new user to the project',
  },
  userLoginLabel: {
    id: 'AddUserForm.userLoginLabel',
    defaultMessage: 'Login',
  },
  userFullNameLabel: {
    id: 'AddUserForm.userFullNameLabel',
    defaultMessage: 'Full Name',
  },
  userEmailLabel: {
    id: 'AddUserForm.userEmailLabel',
    defaultMessage: 'Email',
  },
  userPasswordLabel: {
    id: 'AddUserForm.userPasswordLabel',
    defaultMessage: 'Password',
  },
  userAccountRoleLabel: {
    id: 'AddUserForm.userAccountRoleLabel',
    defaultMessage: 'Account role',
  },
  userSelectAProjectLabel: {
    id: 'AddUserForm.userSelectAProjectLabel',
    defaultMessage: 'Select a project',
  },
  userProjectRoleLabel: {
    id: 'AddUserForm.userProjectRoleLabel',
    defaultMessage: 'Project role',
  },
});

@withModal('allUsersAddUserModal')
@injectIntl
@connect((state) => ({
  projectSearchUrl: URLS.launchOwnersSearch(activeProjectSelector(state)),
}))
@reduxForm({
  form: 'addUserForm',
  validate: ({ login, fullName, email, password }) => ({
    login: (!login || !validate.login(login)) && 'loginHint',
    fullName: (!fullName || !validate.name(fullName)) && 'nameHint',
    email: (!email || !validate.email(email)) && 'emailHint',
    password: (!password || !validate.password(password)) && 'passwordHint',
  }),
})
@track()
export class AddUserModal extends Component {
  static propTypes = {
    data: PropTypes.object,
    tracking: PropTypes.shape({
      getTrackingData: PropTypes.func,
    }).isRequired,
    intl: intlShape.isRequired,
    handleSubmit: PropTypes.func,
  };

  static defaultProps = {
    data: {},
    handleSubmit: () => {},
  };

  render() {
    const { onSubmit, title, submitText, cancelText } = this.props.data;
    const { intl, handleSubmit } = this.props;

    return (
      <ModalLayout
        title={title}
        okButton={{
          text: submitText,
          danger: false,
          onClick: (closeModal) => {
            handleSubmit(onSubmit(closeModal))();
          },
        }}
        cancelButton={{
          text: cancelText,
        }}
      >
        <form>
          <ModalField>
            <SectionHeader text={intl.formatMessage(messages.contentTitle)} />
          </ModalField>
          <div className="modal-content">
            <ModalField
              label={intl.formatMessage(messages.userLoginLabel)}
              labelWidth={LABEL_WIDTH}
            >
              <FieldProvider name="login" type="text">
                <FieldErrorHint>
                  <Input maxLength={128} />
                </FieldErrorHint>
              </FieldProvider>
            </ModalField>
            <ModalField
              label={intl.formatMessage(messages.userFullNameLabel)}
              labelWidth={LABEL_WIDTH}
            >
              <FieldProvider name="fullName" type="text">
                <FieldErrorHint>
                  <Input maxLength={128} />
                </FieldErrorHint>
              </FieldProvider>
            </ModalField>
            <ModalField
              label={intl.formatMessage(messages.userEmailLabel)}
              labelWidth={LABEL_WIDTH}
            >
              <FieldProvider name="email" type="email">
                <FieldErrorHint>
                  <Input maxLength={128} />
                </FieldErrorHint>
              </FieldProvider>
            </ModalField>
            <ModalField
              label={intl.formatMessage(messages.userAccountRoleLabel)}
              labelWidth={LABEL_WIDTH}
            >
              <FieldProvider name="accounRole" type="text">
                <FieldErrorHint>
                  <InputDropdown options={ACCOUNT_ROLES_MAP} value={USER} />
                </FieldErrorHint>
              </FieldProvider>
            </ModalField>
            <ModalField
              label={intl.formatMessage(messages.userSelectAProjectLabel)}
              labelWidth={LABEL_WIDTH}
            >
              <FieldProvider name="selectAProject" type="text">
                <FieldErrorHint>
                  <InputTagsSearch
                    placeholder={'Enter project name'}
                    focusPlaceholder={'Searching...'}
                    uri={URLS.allProjects()}
                  />
                </FieldErrorHint>
              </FieldProvider>
            </ModalField>
            <ModalField
              label={intl.formatMessage(messages.userProjectRoleLabel)}
              labelWidth={LABEL_WIDTH}
            >
              <FieldProvider name="projectRole" type="text">
                <FieldErrorHint>
                  <InputDropdown options={ROLES_MAP} value={MEMBER} />
                </FieldErrorHint>
              </FieldProvider>
            </ModalField>
            <ModalField
              label={intl.formatMessage(messages.userPasswordLabel)}
              labelWidth={LABEL_WIDTH}
            >
              <FieldProvider name="password" type="text">
                <FieldErrorHint>
                  <Input maxLength={128} />
                </FieldErrorHint>
              </FieldProvider>

              <span className={cx('generate-password-link')}>Generate password</span>
            </ModalField>
          </div>
        </form>
      </ModalLayout>
    );
  }
}
