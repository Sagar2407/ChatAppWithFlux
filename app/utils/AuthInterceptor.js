"use strict";

import Interceptor from 'superagent-intercept';
import { SessionActions } from '../actions';
import { SessionStore } from '../stores';

export let AuthInterceptor = Interceptor((err, res) => {
  if (res.status == 401 && SessionStore.getSessionUser()) {
    SessionActions.signOut();
  }
});
