'use strict';

import alt from '../altInstance';
import http from 'superagent';
import AlertActions from './AlertActions';
import { ServerError } from '../helpers';
import { AuthInterceptor } from '../utils';

class SessionActions {
  openSignInPopup() {
    return (dispatch) => {
      dispatch({ signInPopup: true });
    };
  };

  closeSignInPopup() {
    return (dispatch) => {
      dispatch({ signInPopup: false });
    };
  };

  signIn(payload) {
    return (dispatch) => {
      http
        .post('/api/session')
        .send(payload)
        .end((err, res) => {
          const error = err || res.error ? ServerError(res) : null;

          dispatch({
            error: error,
            user: res.body
          });

          if(error) AlertActions.error(error);
        });
    }
  };

  signOut() {
    return (dispatch) => {
      http
        .delete('/api/session')
        .end((err, res) => {
          const error = err || res.error ? ServerError(res) : null;

          dispatch({
            error: error,
            data: res.body
          });

          if(error) AlertActions.error(error);
        });
    }
  };

  loadSession() {
    return (dispatch) => {
      http
        .get('/api/session')
        //  todo: AuthInterceptor throwing error
        .use(AuthInterceptor)
        .end((err, res) => {
          const error = err || res.error ? ServerError(res) : null;

          dispatch({
            error: err || res.error,
            user: res.body
          });

          // if(error) AlertActions.error(error);
        });
    }
  };
}

export default alt.createActions(SessionActions);
