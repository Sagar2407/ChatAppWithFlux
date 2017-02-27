"use strict";

import _ from 'lodash';
import { SessionStore } from '../stores';
import { Roles } from '../constants';
import { AlertActions } from '../actions';

const _redirectToDashboard = (nextState, replace) => {
  const sessionUser = SessionStore.getSessionUser();
  const dashboard = _.find(Roles, { role: sessionUser ? sessionUser.role : 1 }).homePage;

  if(sessionUser && nextState.location.pathname !== dashboard) {
    replace(dashboard);
  }
};

const _redirectToLogin = (nextState, replace) => {
  const sessionUser = SessionStore.getSessionUser();

  if(!sessionUser) {
    replace('/');
    AlertActions.error({ message: "You are not allowed to view this route" });
  }
};

export {
  _redirectToDashboard as redirectToDashboard,
  _redirectToLogin as redirectToLogin
}
