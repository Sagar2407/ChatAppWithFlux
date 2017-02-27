"use strict";

import React, { Component, PropTypes } from 'react';
import { Row, Col } from 'react-bootstrap';
import { Joi, Validation } from 'react-validation-decorator';

class ForgotPasswordForm extends Component{
  constructor() {
    super();
    this.state = {};

    this._handleInputChange = this._handleInputChange.bind(this);
  };

  validationSchema = Joi.object().keys({
    email: Joi.string().email().lowercase().required().label('Email'),
  });

  render() {
    return (
      <form name="forgotPasswordFrm" noValidate >
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
        </Row>
      </form>
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
}

export default Validation(ForgotPasswordForm);
