import React, { Component, PropTypes } from 'react';
import Relay from 'react-relay';
import TagListItem from './TagListItem';

class TagList extends Component {
  static propTypes = {
    viewer: PropTypes.object,
  }
  render() {
    return (
      <div className="tags">
        <ul className="tag-list">
          {this.props.viewer.categories.edges.map((edge) => {
            return <TagListItem key={edge.node.id} category={edge.node} />;
          })}
        </ul>
      </div>
    );
  }
}

export default Relay.createContainer(TagList, {
  fragments: {
    viewer: () => Relay.QL`
      fragment on Viewer {
        categories(first: 30) {
          edges {
            node {
              id,
              ${TagListItem.getFragment('category')},
            }
          }
        }
      }`,
  },
});
