import React from 'react';
import Relay from 'react-relay';
import SearchBar from './SearchBar';

class Landing extends React.Component {
  render() {
    return (
      <div className="landing-content">
        <div className="banner">
          <h1>Banner</h1>
        </div>
        <div className="search-wrap">
          <SearchBar />
        </div>
      </div>
    );
  }
}

export default Relay.createContainer(Landing, {
  fragments: {},
});
