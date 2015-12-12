import React, { Component, PropTypes } from 'react';
import Relay from 'react-relay';
import SearchBar from './SearchBar';
import TagList from './TagList';

class Landing extends Component {
  static propTypes = {
    viewer: PropTypes.object,
  }
  render() {
    return (
      <div className="landing-content">
        <div className="banner">
          <h1>Banner</h1>
        </div>
        <div className="search-wrap">
          <SearchBar />
        </div>
        <TagList viewer={this.props.viewer} />
      </div>
    );
  }
}

export default Relay.createContainer(Landing, {
  fragments: {
    viewer: () => Relay.QL`
      fragment on Viewer {
        ${TagList.getFragment('viewer')}
      }`,
  },
});
