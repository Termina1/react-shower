import React, { Component } from "react";
import { reactive } from "react-derivable";

import {PREV_KEYS, NEXT_KEYS, ESC, ENTER} from "constants/Shortcuts";
import {PROPORTIONS} from "constants/AppConstants";
import * as AppState from "AppState";


function getTransformScale(mode, pos) {
  if (mode === 'list') {
    return 'scale(1)';
  }

  var denominator = Math.max(
    PROPORTIONS[pos].width / window.innerWidth,
    PROPORTIONS[pos].height / window.innerHeight
  );

  return 'scale(' + (1/denominator) + ')';
}

function getCount(children) {
  return children
    .filter(el => el.type !== 'header').length;
}

class Deck extends Component {

  static contextTypes = {
    proportions: React.PropTypes.string
  }

  onKeyPress(ev) {
    const slide = AppState.state.get().slide;
    const count = getCount(this.props.children);
    const wholeLength = this.props.children.length;

    if (PREV_KEYS.indexOf(ev.which) >= 0) {
      ev.preventDefault();
      if (slide - 1 >= wholeLength - count) {
        AppState.changeActiveSlide(slide - 1);
      }
    }

    if (NEXT_KEYS.indexOf(ev.which) >= 0) {
      ev.preventDefault();
      if (slide + 1 <= count) {
        AppState.changeActiveSlide(slide + 1);
      }
    }

    if (ev.which === ESC) {
      ev.preventDefault();
      AppState.changeMode("list");
    }

    if (ev.which === ENTER) {
      ev.preventDefault();
      AppState.changeMode("full");
    }
  }

  componentDidMount() {
    this.listener = this.onKeyPress.bind(this);
    this.resizeListener = this.forceUpdate.bind(this, function() {});
    document.addEventListener('keydown', this.listener);
    window.addEventListener('resize', this.resizeListener);
  }

  componentWillUnmount() {
    document.removeEventListener('keydown', this.listener);
    window.removeEventListener('resize', this.resizeListener);
  }

  render() {
    var index = 0;
    var {slide, mode} = AppState.state.get();
    var children = React.Children.map(this.props.children, (child) =>
      React.cloneElement(child, {
        index: index++,
        data: {slide, mode},
      })
    );

    var progress = (slide - 1)/(getCount(this.props.children) - 1) * 100;

    return (
      <div style={{transform: getTransformScale(mode, this.context.proportions)}} className={`shower ${mode}`}>
        {children}
        <div className="progress"
          role="progressbar" aria-valuemin="0"
          aria-valuemax="100" aria-valuenow={progress}
          aria-valuetext={"Slideshow Progress: " + progress}
          style={{"width": progress + "%"}}></div>
      </div>
    );
  }
}

export default reactive(Deck);
