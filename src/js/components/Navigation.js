import React, { Component, PropTypes } from 'react';
import Relay from 'react-relay';

class Navigation extends Component {
  static propTypes = {
    children: PropTypes.element,
  }
  render() {
    return (
      <div className="nav-main">
        <h1 className="title">Seta</h1>
      </div>
    );
  }
}

export default Relay.createContainer(Navigation, {
  fragments: {},
});
