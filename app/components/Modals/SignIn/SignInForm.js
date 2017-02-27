"use strict";

import React, { Component, PropTypes } from 'react';
import { Row, Col } from 'react-bootstrap';
import { Joi, Validation } from 'react-validation-decorator';

import { SessionActions, AccountActions } from '../../../actions';

class SignInForm extends Component{
  constructor() {
    super();
    this.state = {};

    this._handleInputChange = this._handleInputChange.bind(this);
    this._isFormValid = this._isFormValid.bind(this);
  };

  validationSchema = Joi.object().keys({
    email: Joi.string().email().lowercase().required().label('Email'),
    password: Joi.string().min(8).max(30).required().label('Password'),
  });

  render() {
    return (
      <div>
        <div className="pull-right">
          <span>Not a user? </span>
          <a style={{cursor: 'pointer'}} onClick={SignInForm._handleSignUpPopup}>Sign Up</a>
        </div>
        <br/>
        <form name="signInFrm" noValidate >
          <Row>
            <Col md={12}>
              <div className={this.getValidationClassName('email')}>
                <label>Email</label>
                <input type='email' className='form-control'
                       value={this.state.email}
                       placeholder="Enter Email..."
                       onChange={this._handleInputChange.bind(this, 'email')}/>
                {this.renderValidationMessages('email')}
              </div>
            </Col>
            <Col md={12}>
              <div className={this.getValidationClassName('password')}>
                <label>Password</label>
                <input type='password' className='form-control'
                       value={this.state.password}
                       placeholder="Enter Password..."
                       onChange={this._handleInputChange.bind(this, 'password')}/>
                {this.renderValidationMessages('password')}
              </div>
            </Col>
          </Row>
        </form>
      </div>
    );
  };

  _handleInputChange(formInput, event) {
    let value = event.target.value;
    this.setState(state => {
      state[formInput] = value;
    }, () => {
      this.validate(formInput);
      this._isFormValid();
    });
  };

  _isFormValid() {
    this.props.isValid(!this.state.validation.errors.length);
  };

  getModel() {
    return this.state.validation.value;
  }

  static _handleSignUpPopup() {
    SessionActions.closeSignInPopup();
    AccountActions.openSignUpPopup();
  };
}

export default Validation(SignInForm);
