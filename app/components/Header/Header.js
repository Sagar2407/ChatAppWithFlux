"use strict";

import React from 'react';
import { Nav, Navbar, NavItem, NavDropdown, MenuItem } from 'react-bootstrap';

import { SignIn, SignUp, ForgotPassword } from '../Modals';

import { SessionActions } from '../../actions';
import { SessionStore, AccountStore } from '../../stores';

import { Roles } from '../../constants';
import _ from 'lodash';

class Header extends React.Component {
  constructor() {
    super();
    this.state = {
      signUpPopup: false,
      signInPopup: false,
      forgotPasswordPopup: false,
      questionPopup: false,
      organizationPopup: false,
      user: null
    };

    this._handleSessionStore = this._handleSessionStore.bind(this);
    this._handleAccountStore = this._handleAccountStore.bind(this);
    this._handleQuestionStore = this._handleQuestionStore.bind(this);
    this._handleOrganizationStore = this._handleOrganizationStore.bind(this);
    this._handleQuestionPopup = this._handleQuestionPopup.bind(this);
  };

  static contextTypes = {
    router: React.PropTypes.object
  };

  componentWillMount() {
    SessionStore.listen(this._handleSessionStore);
    AccountStore.listen(this._handleAccountStore);
    if(!SessionStore.getSessionUser()) {
      SessionActions.loadSession();
    } else {
      this.setState({ user: SessionStore.getSessionUser() });
    }
};

  componentWillUnmount() {
    SessionStore.unlisten(this._handleSessionStore);
    AccountStore.unlisten(this._handleAccountStore);
  };

  render() {
    const { user, signInPopup, signUpPopup, forgotPasswordPopup } = this.state;
    //todo URGENT: askedTo is hard coded;
    return (
      <div>
        <Navbar inverse fixedTop>
          <Navbar.Header>
            <Navbar.Brand>
              <a href="/">React-Hapi Boilerplate</a>
            </Navbar.Brand>
            <Navbar.Toggle />
          </Navbar.Header>
          <Navbar.Collapse>
              {
                user ?
                  <Nav pullRight>
                    <NavDropdown eventKey={2} title={`${user.firstName} ${user.lastName}`} id="user-dropdown">
                      <MenuItem eventKey={2.1} onClick={ this._handleMenuItem.bind(this, 'dashboard') }> Dashboard </MenuItem>
                      <MenuItem divider />
                      <MenuItem eventKey={2.2} onClick={ this._handleMenuItem.bind(this, 'sign-out') }>Sign Out</MenuItem>
                    </NavDropdown>
                  </Nav>:
                  <Nav pullRight>
                    <NavItem eventKey={2}
                             className="pull-right"
                             onClick={Header._handleSignUpPopup}>Signup/Login</NavItem>
                  </Nav>
              }
          </Navbar.Collapse>
        </Navbar>
        <SignIn open={ signInPopup } />
        <SignUp open={ signUpPopup } />
        <ForgotPassword open={ forgotPasswordPopup } />
      </div>
    )
  };

  static _handleSignUpPopup() {
    SessionActions.openSignInPopup();
  };

  _handleQuestionPopup() {
    QuestionActions.openQuestionPopup();
  };

  _handleAccountStore(state) {
    this.setState({
      signUpPopup: state.signUpPopup,
      forgotPasswordPopup: state.forgotPasswordPopup
    });
  };

  _handleQuestionStore(state) {
    this.setState({
      questionPopup: state.questionPopup,
    });
  };

  _handleSessionStore(state) {
    this.setState({
      signInPopup: state.signInPopup,
      user: state._user
    })
  };

  _handleOrganizationStore(state) {
    this.setState({
      organizationPopup: state._organizationPopup
    });
  }

  _handleMenuItem(path) {
    const { user } = this.state;

    if (user) {
      const self = this;
      const userRole = _.find(Roles, { role: user.role });
      switch (path) {
        case 'dashboard':
          self.context.router.push(userRole.homePage);
          break;
        case 'profile':
          self.context.router.push(userRole.profilePage);
          break;
        case 'sign-out':
          SessionActions.signOut();
          break;
        default:
          return;
      }
    }
  };
}

export default Header;
