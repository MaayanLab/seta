import React from 'react';
import Relay from 'react-relay';

class SearchBar extends React.Component {
  render() {
    return (
      <div className="search-outer">
        <div className="search-inner">
          <div className="input-wrap">
            <input type="text" />
          </div>
        </div>
      </div>
    );
  }
}

export default Relay.createContainer(SearchBar, {
  fragments: {},
});
