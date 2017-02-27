"use strict";

import alt from '../altInstance';

import { AccountActions ,SessionActions }from '../actions';

class AccountStore {
  constructor() {
    this.signUpPopup = false;
    this.forgotPasswordPopup = false;
    this.isResetPassword = false;

    this.bindListeners({
      openSignUpPopup: AccountActions.OPEN_SIGN_UP_POPUP,
      closeSignUpPopup: AccountActions.CLOSE_SIGN_UP_POPUP,
      openForgotPasswordPopup: AccountActions.OPEN_FORGOT_PASSWORD_POPUP,
      closeForgotPasswordPopup: AccountActions.CLOSE_FORGOT_PASSWORD_POPUP,
      handleRegister: AccountActions.REGISTER,
      forgotPassword: AccountActions.FORGOT_PASSWORD,
      resetPassword: AccountActions.RESET_PASSWORD
    });
  };

  openSignUpPopup(payload) {
    this.signUpPopup = payload.signUpPopup || false;
  };

  closeSignUpPopup() {
    this.signUpPopup = false;
  };

  openForgotPasswordPopup(payload) {
    this.forgotPasswordPopup = payload.forgotPasswordPopup || false;
  };

  closeForgotPasswordPopup() {
    this.forgotPasswordPopup = false;
  };

  handleRegister(payload) {
    if (!payload.error) {
      this.signUpPopup=false;
      SessionActions.loadSession();
    }
  };

  forgotPassword(payload){
    if(!payload.error) {
      this.forgotPasswordPopup =false;
    }
  };

  resetPassword(payload) {
    if(!payload.error) {
      this.isResetPassword = true;
    }
  };

  createAdminAccount(payload) {
    if(!payload.error) {
      this.adminAccounts.push(payload.data.credentials);
    }
  };

  createHostAccount(payload) {
    if(!payload.error) {
      this.hostAccounts.push(payload.data);
    }
  };

  createMentorAccount(payload) {
    if(!payload.error) {
      this.mentorAccounts.push(payload.data);
    }
  };
}

export default alt.createStore(AccountStore, 'AccountStore');
