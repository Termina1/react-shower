import React, { Component } from 'react';
import config from "config.json";

export default class App extends Component {

  static childContextTypes = {
    proportions: React.PropTypes.string
  }

  getChildContext() {
    return {
      proportions: config.proportions
    }
  }

  render() {
    return this.props.children;
  }
}
