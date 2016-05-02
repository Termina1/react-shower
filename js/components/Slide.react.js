import React, { Component } from 'react';
import { connect } from 'react-redux';
import {changeActiveSlide, changeMode} from "../actions/AppActions";

export default class Slide extends Component {

  onClick() {
    const dispatch = this.props.dispatch;
    dispatch(changeActiveSlide(this.props.index));
    dispatch(changeMode('full'));
  }

  render() {
    var cls = '';
    if (this.props.index == this.props.data.slide) {
      cls = 'active';
    }
    return (
      <section id={this.props.index} className={`slide ${this.props.className} ${cls}`} onClick={this.onClick.bind(this)}>
        {this.props.children}
      </section>
    );
  }
}

function select(state) {
  return {
    data: state.deck
  };
}
