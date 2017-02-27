'use strict';

import alt from '../altInstance';
import { RandomString } from '../helpers';

class AlertActions {
  success(payload) {
    return (dispatch) => {
      dispatch({ type: "success", message: payload.message, id: RandomString(5) });
    }
  };

  info(payload) {
    return (dispatch) => {
      dispatch({ type: "info", message: payload.message, id: RandomString(5) });
    }
  };

  warning(payload) {
    return (dispatch) => {
      dispatch({ type: "warning", message: payload.message, id: RandomString(5) });
    }
  };

  error(payload) {
    return (dispatch) => {
      dispatch({ type: "danger", message: payload.message, id: RandomString(5) });
    }
  };

  dismiss(payload) {
    return (dispatch) => {
      dispatch({ id: payload.id });
    }
  };
}

export default alt.createActions(AlertActions);
