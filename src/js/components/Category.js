import React, { Component, PropTypes } from 'react';
import Relay from 'react-relay';
import ContentHeader from './ContentHeader';
import ContentSubHeader from './ContentSubHeader';
import DatasetResult from './DatasetResult';

class Category extends Component {
  static propTypes = {
    category: PropTypes.object,
  }
  render() {
    return (
      <div className="content">
        <ContentHeader title={this.props.category.name} />
        <div className="category-label">
          <span>Category</span>
        </div>
        <div className="description category-desc">
          <p>{this.props.category.description}</p>
        </div>
        {
          this.props.category.datasets.edges.length
          ? <ContentSubHeader title="Datasets" />
          : null
        }
        {
          this.props.category.datasets.edges.map((edge) => {
            return (
              <DatasetResult key={edge.node.id}
                category={this.props.category} dataset={edge.node} />
            );
          })
        }
      </div>
    );
  }
}

export default Relay.createContainer(Category, {
  fragments: {
    category: () => Relay.QL`
      fragment on Category {
        name,
        description,
        datasets(first: 10) {
          edges {
            node {
              id,
              ${DatasetResult.getFragment('dataset')}
            }
          }
        }
        ${DatasetResult.getFragment('category')}
      }`,
  },
});
