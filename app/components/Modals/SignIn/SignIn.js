"use strict";

import React, { Component, PropTypes } from 'react';
import { Modal, Button } from 'react-bootstrap';
import SignInForm from './SignInForm';

import { SessionActions, AccountActions } from '../../../actions';

class SignIn extends Component{
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
    const { canSubmit } = this.state;

    return(
      <Modal show={this.props.open} onHide={SignIn._handleCloseSignInPopup}>
        <Modal.Header closeButton>
          <Modal.Title>Sign In</Modal.Title>
        </Modal.Header>
        <Modal.Body>
          <SignInForm ref={ elem => this.signInFrm = elem } isValid={this._onFormValid} />
        </Modal.Body>
        <Modal.Footer>
          <a style={{cursor: 'pointer'}} onClick={SignIn._handleOpenForgotPasswordPopup}>Forgot Password?</a>
          <Button type="submit"
                  bsStyle="success"
                  disabled={ !canSubmit }
                  onClick={this._handleSubmit} >
            Sign In
          </Button>
          <Button bsStyle="danger"
                  onClick={ SignIn._handleCloseSignInPopup }>
            Cancel
          </Button>
        </Modal.Footer>
      </Modal>
    )
  };

  static _handleCloseSignInPopup() {
    SessionActions.closeSignInPopup();
  };

  static _handleOpenForgotPasswordPopup() {
    SessionActions.closeSignInPopup();
    AccountActions.openForgotPasswordPopup();
  };

  _onFormValid(isValid) {
    this.setState({ canSubmit: isValid });
  }

  _handleSubmit(e) {
    e.preventDefault();
    const user = this.signInFrm.getModel();
    SessionActions.signIn(user);
  };
}

export default SignIn;
