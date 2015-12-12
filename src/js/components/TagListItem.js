import React, { Component, PropTypes } from 'react';
import Relay from 'react-relay';
import { Link } from 'react-router';

class TagListItem extends Component {
  static propTypes = {
    category: PropTypes.object,
  }
  render() {
    const { category } = this.props;
    return (
      <li className="tag">
        <Link to={`/${encodeURIComponent(category.name)}`}>
          {this.props.category.name}
        </Link>
      </li>
    );
  }
}

export default Relay.createContainer(TagListItem, {
  fragments: {
    category: () => Relay.QL`
      fragment on Category {
        id,
        name
      }`,
  },
});
