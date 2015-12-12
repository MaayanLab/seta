import React, { Component, PropTypes } from 'react';
import Relay from 'react-relay';
import { Link } from 'react-router';

class DatasetResult extends Component {
  static propTypes = {
    category: PropTypes.object,
    dataset: PropTypes.object,
  }
  render() {
    return (
      <div className="dataset-result">
        <Link to={`/${encodeURIComponent(this.props.category.tag)}/dataset/${encodeURIComponent(this.props.dataset.title)}`}>
          {this.props.dataset.title}
        </Link>
        <div className="description dataset-desc">
          <p>{this.props.dataset.description}</p>
        </div>
      </div>
    );
  }
}

export default Relay.createContainer(DatasetResult, {
  fragments: {
    dataset: () => Relay.QL`
      fragment on Dataset {
        title,
        description,
      }`,
    category: () => Relay.QL`
      fragment on Category {
        tag
      }`,
  },
});
