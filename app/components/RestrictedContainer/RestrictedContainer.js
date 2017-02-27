"use strict";

import React from 'react';
import { AuthorizedComponent } from 'react-router-role-authorization';
import _ from 'lodash';

import { SessionStore } from '../../stores';
import { Roles } from '../../constants'

class RestrictedContainer extends AuthorizedComponent {
  constructor(props) {
    super(props);

    const sessionUser = SessionStore.getSessionUser();
    const userRole = _.find(Roles, { role: sessionUser ? sessionUser.role : 1 });

    this.userRoles = [ userRole.role ];
    this.notAuthorizedPath = userRole.homePage;
  };

  render() {
    return (
      <div>
        { this.props.children }
      </div>
    );
  };
}

export default RestrictedContainer;
