"use strict";

import React from 'react';

class Home extends React.Component {
  static contextTypes = {
    router: React.PropTypes.object
  };

  render() {
    return (
      <div >
        <h1> This is the public landing page </h1>
      </div>
    )
  };
}

export default Home;
