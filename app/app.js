"use strict";

import React from 'react';
import ReactDOM from 'react-dom';
import { Router, Route, IndexRoute, Redirect, browserHistory } from 'react-router';

import { redirectToDashboard, redirectToLogin } from './helpers/route-helper';
import RestrictedContainer from './components/RestrictedContainer';
import AppContainer from './components/App-Container';

ReactDOM.render(
  <Router history={browserHistory}>
    <Route path="/" component={ AppContainer }>
      <IndexRoute onEnter={ redirectToDashboard }
                  getComponent={ (location, cb) => { require.ensure([], (require) => cb(null, require('./views/public/Home')) ) } }/>

      {/*-----------------------------------------------PUBLIC-------------------------------------------------------*/}

      <Route authorize={[ 1 ]}
             component={ RestrictedContainer }>
        <Route path="/reset-password/:email/:token"
               getComponent={ (location, cb) => { require.ensure([], (require) => cb(null, require('./views/public/Reset-Password')) ) } }/>
        <Route path="/chat"
               getComponent={ (location, cb) => { require.ensure([], (require) => cb(null, require('./views/public/Chat')) ) } }/>
      </Route>

      {/*--------------------------------------------------USER------------------------------------------------------*/}

      <Route authorize={[ 2 ]} component={ RestrictedContainer }>
        <Route path="/user/dashboard"
               onEnter={ redirectToLogin }
               getComponent={ (location, cb) => { require.ensure([], (require) => cb(null, require('./views/user/Dashboard')) ) } }/>
      </Route>

    </Route>

    {/*------------------------------------------------------NO-ROUTE------------------------------------------------------------------*/}

    <Route path="*"
           getComponent={ (location, cb) => { require.ensure([], (require) => cb(null, require('./views/public/NoRoute')) ) } }/>
  </Router>,
  document.getElementById('root')
);
