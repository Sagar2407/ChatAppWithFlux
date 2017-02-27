"use strict";

import React, { Component, PropTypes } from 'react';
import { Modal, Button } from 'react-bootstrap';
import PersonalDetailsForm from './PersonalDetailsForm';

import { AccountActions } from '../../../actions';

class SignUp extends Component{
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
      <Modal show={this.props.open} onHide={SignUp._handleCloseSignUpPopup}>
        <Modal.Header closeButton>
          <Modal.Title>Sign Up</Modal.Title>
        </Modal.Header>
        <Modal.Body>
          <PersonalDetailsForm ref={ elem => this.signUpFrm = elem } isValid={this._onFormValid} />
        </Modal.Body>
        <Modal.Footer>
          <Button bsStyle="success" disabled={!this.state.canSubmit} onClick={this._handleSubmit} >Sign Up</Button>
          <Button type="submit" bsStyle="danger" onClick={SignUp._handleCloseSignUpPopup}>Cancel</Button>
        </Modal.Footer>
      </Modal>
    )
  };

  static _handleCloseSignUpPopup() {
    AccountActions.closeSignUpPopup();
  };

  _handleSubmit(e) {
    e.preventDefault();
    let user = this.signUpFrm.getModel();
    AccountActions.register(user);
  }

  _onFormValid(isValid) {
    this.setState({ canSubmit: isValid });
  }
}

export default SignUp;
