"use strict";

import './Footer.less';

import React from 'react';

class Footer extends React.Component {
  constructor() {
    super();
  };

  render() {
    return (
      <footer>
        <div className="container text-right">
          <p> MentorStudents © 2016. All rights reserved.</p>
        </div>
      </footer>
    );
  };
}

export default Footer;
