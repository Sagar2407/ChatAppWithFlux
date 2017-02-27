"use strict";

import './App-Container.less';

import React from 'react';
import { Row } from 'react-bootstrap';

import Home from '../../views/public/Home';
import Header from '../Header';
import Footer from '../Footer';
import AlertWrapper from '../AlertWrapper';

class AppContainer extends React.Component {
  render() {
    return (
      <div>
        <Header />
        <div className="container main" style={{ minHeight: window.innerHeight - 46 }}>
          <Row>
            {this.props.children || <Home/>}
          </Row>
        </div>
        <Footer />
        <div className="notifications top-right">
          <AlertWrapper />
        </div>
      </div>
    )
  }

}

export default AppContainer;
