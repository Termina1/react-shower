import React, { Component } from 'react';
;import {changeActiveSlide, changeMode} from "../actions/AppActions";
import { connect } from 'react-redux';

const PREV_KEYS = [37, 38, 33];
const NEXT_KEYS = [39, 40, 34];
const ESC = 27;
const ENTER = 13;

function getTransformScale(props) {
  if (props.mode === 'list') {
    return 'scale(1)';
  }
  var denominator = Math.max(
    1024 / window.innerWidth,
    640 / window.innerHeight
  );

  return 'scale(' + (1/denominator) + ')';
}

function getCount(children) {
  return children
    .filter(el => el.type !== 'header').length;
}

class Deck extends Component {

  onKeyPress(ev) {
    const dispatch = this.props.dispatch;
    const slide = parseInt(this.props.slide);
    const count = getCount(this.props.children);
    const wholeLength = this.props.children.length;
    if (PREV_KEYS.indexOf(ev.which) >= 0 && slide - 1 >= wholeLength - count) {
      dispatch(changeActiveSlide(slide - 1));
    }

    if (NEXT_KEYS.indexOf(ev.which) >= 0 && slide + 1 <= count) {
      dispatch(changeActiveSlide(slide + 1));
    }

    if (ev.which === ESC) {
      dispatch(changeMode("list"));
    }

    if (ev.which === ENTER) {
      dispatch(changeMode("full"));
    }
  }

  componentDidMount() {
    this.listener = this.onKeyPress.bind(this);
    this.resizeListener = this.forceUpdate.bind(this, function() {});
    document.addEventListener('keydown', this.listener);
    window.addEventListener('resize', this.resizeListener);
  }

  compinentDidUnmount() {
    document.removeEventListener('keydown', this.listener);
    window.removeEventListener('resize', this.resizeListener);
  }

  render() {
    var index = 0;
    var children = React.Children.map(this.props.children, (child) =>
      React.cloneElement(child, {
        index: index++,
        data: {
          slide: this.props.slide,
          mode: this.props.mode
        },
        dispatch: this.props.dispatch
      })
    );

    var progress = (this.props.slide - 1)/(getCount(this.props.children) - 1) * 100;

    return (
      <div style={{transform: getTransformScale(this.props)}} className={`shower ${this.props.mode}`}>
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

function select(state) {
  return {
    slide: state.deck.slide,
    mode: state.deck.mode
  };
}

export default connect(select)(Deck);
