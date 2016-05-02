import React, { Component } from 'react';
import {PrismCode} from "react-prism";

export default class Code extends Component {
  render() {
    var lang = this.props.lang ? `language-${this.props.lang}` : "language-javascript";
    return (
      <pre>
        <PrismCode className={lang}>
          {this.props.code}
        </PrismCode>
      </pre>
    );
  }
}
