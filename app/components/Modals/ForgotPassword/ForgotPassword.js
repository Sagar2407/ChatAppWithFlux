"use strict";

import React, { Component, PropTypes } from 'react';
import { Modal, Button } from 'react-bootstrap';
import ForgotPasswordForm from './ForgotPasswordForm';

import { AccountActions } from '../../../actions';

class ForgotPassword extends Component{
  constructor() {
    super();

    this.state = {
      canSubmit: false
    };

    this._handleSubmit = this._handleSubmit.bind(this);
    this._onFormValid = this._onFormValid.bind(this);
  };

  static propTypes = {
    open: PropTypes.bool.isRequired
  };

  render() {
    return(
      <Modal show={this.props.open} onHide={ForgotPassword._handleCloseForgotPassword}>
        <Modal.Header closeButton>
          <Modal.Title>Forgot Password</Modal.Title>
        </Modal.Header>
        <Modal.Body>
          <ForgotPasswordForm ref="form" isValid={this._onFormValid}/>
        </Modal.Body>
        <Modal.Footer>
          <Button bsStyle="success" disabled={!this.state.canSubmit} onClick={this._handleSubmit} >Submit</Button>
          <Button type="submit" bsStyle="danger" onClick={ForgotPassword._handleCloseForgotPassword}>Cancel</Button>
        </Modal.Footer>
      </Modal>
    )
  };

  static _handleCloseForgotPassword() {
    AccountActions.closeForgotPasswordPopup();
  };

  _onFormValid(isValid) {
    this.setState({ canSubmit: isValid });
  };

  _handleSubmit(e) {
    e.preventDefault();
    const payload = this.refs.form.getModel();
    AccountActions.forgotPassword(payload);
  };
}

export default ForgotPassword;
