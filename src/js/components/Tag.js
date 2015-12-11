import React, { Component, PropTypes } from 'react';
import Relay from 'react-relay';

class Navigation extends Component {
  static propTypes = {
    children: PropTypes.element,
  }
  render() {
    return (
      <div className="tag">
      </div>
    );
  }
}

export default Relay.createContainer(Navigation, {
  fragments: {},
});
