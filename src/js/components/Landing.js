import React from 'react';
import Relay from 'react-relay';

class Landing extends React.Component {
  render() {
    return (
      <h1>Landing</h1>
    );
  }
}

export default Relay.createContainer(Landing, {
  fragments: {},
});
