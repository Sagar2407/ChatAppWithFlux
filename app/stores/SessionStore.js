"use strict";

import alt from '../altInstance';
import { browserHistory } from 'react-router';
import cookie from 'react-cookie';

import { SessionActions } from '../actions';

class SessionStore {
  constructor() {
    this.signInPopup = false;
    this._user = null;

    this.bindListeners({
      loadSession: SessionActions.LOAD_SESSION,
      openSignInPopup: SessionActions.OPEN_SIGN_IN_POPUP,
      closeSignInPopup: SessionActions.CLOSE_SIGN_IN_POPUP,
      signIn: SessionActions.SIGN_IN,
      signOut: SessionActions.SIGN_OUT,
    });

    this.publicMethods = {
      getSessionUser: function () {
        const sessionUser = cookie.load('user', { path: '/' });
        return sessionUser ? JSON.parse(sessionUser) : null;
      },
      isLoggedIn: function () {
        return !!cookie.load('userId', { path: '/' });
      },
    }
  };

  openSignInPopup(payload) {
    this.signInPopup = payload.signInPopup || false;
  };

  closeSignInPopup(payload) {
    this.signInPopup = payload.signInPopup || false;
  };

  loadSession(payload) {
    if(!payload.error){
      this._user = payload.user.credentials;
      cookie.save('user', this._user, { path: '/' });
    }
  };

  signIn(payload) {
    if(!payload.error) {
      this.signInPopup = false;
      this._user = payload.user.credentials;
      cookie.save('user', this._user, { path: '/' });
    }
  };

  signOut(payload) {
    if (!payload.error) {
      cookie.remove('user', { path: '/' });
      delete this._user;
      browserHistory.push('/');
    }
  };
}

export default alt.createStore(SessionStore, 'SessionStore');
