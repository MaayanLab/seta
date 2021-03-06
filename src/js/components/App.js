import React, { Component, PropTypes } from 'react';
import Relay from 'react-relay';
import Navigation from './Navigation';

class App extends Component {
  static propTypes = {
    children: PropTypes.element,
  }
  render() {
    return (
      <div className="wrapper">
        <Navigation />
        {this.props.children}
      </div>
    );
  }
}

export default Relay.createContainer(App, {
  fragments: {},
});
