"use strict";

import React, { Component, PropTypes } from 'react';
import { Row, Col } from 'react-bootstrap';
import { Joi, Validation } from 'react-validation-decorator';

class PersonalDetailsForm extends Component{
  constructor() {
    super();
    this.state = {};

    this._handleInputChange = this._handleInputChange.bind(this);
  };

  validationSchema = Joi.object().keys({
    firstName: Joi.string().required().label('First Name'),
    lastName: Joi.string().required().label('Last Name'),
    email: Joi.string().email().lowercase().required().label('Email'),
    password: Joi.string().min(8).max(30).required().label('Password'),
    confirmPassword: Joi.string().valid(Joi.ref('password')).options({
      language: {
        any: {
          allowOnly: 'don\'t match'
        }
      }
    }).required().label('Confirm Password')
  });

  render() {
    return (
      <form name="signUpFrm" noValidate >
        <Row>
          <Col md={6}>
            <div className={this.getValidationClassName('firstName')}>
              <label>First Name</label>
              <input type='text' className='form-control'
                     value={this.state.firstName}
                     placeholder="Enter First Name..."
                     onChange={this._handleInputChange.bind(this, 'firstName')}/>
              {this.renderValidationMessages('firstName')}
            </div>
          </Col>
          <Col md={6}>
            <div className={this.getValidationClassName('lastName')}>
              <label>Last Name</label>
              <input type='text' className='form-control'
                     value={this.state.lastName}
                     placeholder="Enter Last Name..."
                     onChange={this._handleInputChange.bind(this, 'lastName')}/>
              {this.renderValidationMessages('lastName')}
            </div>
          </Col>
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
          <Col md={6}>
            <div className={this.getValidationClassName('password')}>
              <label>Password</label>
              <input type='password' className='form-control'
                     value={this.state.password}
                     placeholder="Enter Password..."
                     onChange={this._handleInputChange.bind(this, 'password')}/>
              {this.renderValidationMessages('password')}
            </div>
          </Col>
          <Col md={6}>
            <div className={this.getValidationClassName('confirmPassword')}>
              <label>Confirm Password</label>
              <input type='password' className='form-control'
                     value={this.state.confirmPassword}
                     placeholder="Enter Confirm Password..."
                     onChange={this._handleInputChange.bind(this, 'confirmPassword')}/>
              {this.renderValidationMessages('confirmPassword')}
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

export default Validation(PersonalDetailsForm);
