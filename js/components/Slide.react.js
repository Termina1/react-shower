import React, { Component } from 'react';
import * as Derivable from 'derivable';
import * as AppState from 'AppState';

export default class Slide extends Component {

  onClick() {
    Derivable.transact(() => {
      AppState.changeActiveSlide(this.props.index);
      AppState.changeMode('full');
    });
  }

  render() {
    let cls = '';
    if (this.props.index === this.props.data.slide) {
      cls = 'active';
    }
    return (
      <section id={this.props.index} className={`slide ${this.props.className} ${cls}`} onClick={this.onClick.bind(this)}>
        {this.props.children}
      </section>
    );
  }
}
