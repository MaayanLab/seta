import React, { Component, PropTypes } from 'react';

export default class ContentSubHeader extends Component {
  static propTypes = {
    title: PropTypes.string,
  }
  render() {
    return (
      <div className="content-sub-header">
        <h3>{this.props.title}</h3>
      </div>
    );
  }
}
