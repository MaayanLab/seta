import React, { Component, PropTypes } from 'react';

export default class ContentHeader extends Component {
  static propTypes = {
    title: PropTypes.string,
  }
  render() {
    return (
      <div className="content-header">
        <h1>{this.props.title}</h1>
      </div>
    );
  }
}
