"use strict";

import React from 'react';
import { Alert } from 'react-bootstrap';

import './AlertWrapper.less';

import { AlertActions } from '../../actions';
import { AlertStore } from '../../stores';

class AlertWrapper extends React.Component{
  constructor() {
    super();
    this.state = {
      alerts: []
    };

    this._handleAlertDismiss = this._handleAlertDismiss.bind(this);
    this._handleAlertStore = this._handleAlertStore.bind(this);
  };

  componentWillMount() {
    AlertStore.listen(this._handleAlertStore);
  };

  componentWillUnmount() {
    AlertStore.unlisten(this._handleAlertStore);
  };

  render() {
    return (
      <div>
        {
          this.state.alerts.map(( alert, idx ) => {
            return <Alert key={ idx } bsStyle={ alert.type } onDismiss={this._handleAlertDismiss.bind(this, alert.id)}>
              { alert.message }
            </Alert>
          })
        }
      </div>
    );
  };

  _handleAlertDismiss (id) {
    AlertActions.dismiss({ id: id });
  };

  _handleAlertStore (state) {
      this.setState({ alerts: state.alerts });
  };
}

export default AlertWrapper;
