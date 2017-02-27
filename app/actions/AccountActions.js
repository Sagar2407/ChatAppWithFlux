'use strict';

import alt from '../altInstance';
import http from 'superagent';
import AlertActions from './AlertActions';
import { ServerError } from '../helpers';

class AccountActions {

  openSignUpPopup() {
    return (dispatch) => {
      dispatch({ signUpPopup: true });
    };
  };

  closeSignUpPopup() {
    return (dispatch) => {
      dispatch({ signUpPopup: false });
    };
  };

  openForgotPasswordPopup() {
    return (dispatch) => {
      dispatch({ forgotPasswordPopup: true });
    };
  };

  closeForgotPasswordPopup() {
    return (dispatch) => {
      dispatch({ forgotPasswordPopup: false });
    };
  };

  register(payload) {
    return (dispatch) => {
      http
        .post('/api/accounts/register')
        .send(payload)
        .end((err, res) => {
          const error = err || res.error ? ServerError(res) : null;

          dispatch({
            error: error,
            data: res.body
          });

          if (error) AlertActions.error({ message: error.message });
        });
    }
  };

  forgotPassword(payload) {
    return (dispatch) => {
      http
        .post('/api/accounts/forgot-password')
        .send(payload)
        .end((err, res) => {
          const error = err || res.error ? ServerError(res) : null;

          dispatch({
            error: error,
            user: res.body
          });

          if(error) return AlertActions.error(error);
          AlertActions.success({ message: `Password reset instructions sent to email ${payload.email}` });
        });
    }
  };

  resetPassword(payload){
    return(dispatch) => {
      http
        .post('/api/accounts/reset-password')
        .send(payload)
        .end((err, res) => {
          var error = err || res.error ? ServerError(res) : null;

          dispatch({
            error: error,
            data: res.body
          });

          if(error) return AlertActions.error(error);
          AlertActions.success({ message: 'Password reset successful' });
        });
    }
  };

  updateUser(payload, cb) {
    return (dispatch) => {
      http
        .put('/api/accounts')
        .send(payload)
        .end((err, res) => {
          const error = err || res.error ? ServerError(res) : null;
          dispatch({
            error: error,
            data: res.body,
            isBusy: false
          });

          if(cb && typeof cb === 'function') cb(error);
        });
    }
  };
}

export default alt.createActions(AccountActions);
