"use strict";

import alt from '../altInstance';
import _ from 'lodash';
import { AlertActions } from '../actions';

class AlertStore {
  constructor() {
    this.alerts = [];

    this.bindListeners({
      alertSuccess: AlertActions.SUCCESS,
      alertInfo: AlertActions.INFO,
      alertWarning: AlertActions.WARNING,
      alertError: AlertActions.ERROR,
      alertDismiss: AlertActions.DISMISS
    });
  };

  alertSuccess(payload) {
    this.handleAlert(payload);
  };

  alertInfo(payload) {
    this.handleAlert(payload);
  };

  alertWarning(payload) {
    this.handleAlert(payload);
  };

  alertError(payload) {
    this.handleAlert(payload);
  };

  alertDismiss (payload) {
    const alert = _.find(this.alerts, { id: payload.id });
    _.pull(this.alerts, alert);
  };

  handleAlert (payload) {
    const self = this;
    self.alerts.push(payload);
    setTimeout(() => {
      const alert = _.find(self.alerts, { id: payload.id });
      _.pull(self.alerts, alert);
      self.emitChange();
    }, 5000);
  };
}

export default alt.createStore(AlertStore, 'AlertStore');
