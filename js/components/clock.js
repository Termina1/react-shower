import React from 'react';
import { connect } from 'react-redux';
const SetIntervalMixin = {
  componentWillMount() {
    this.intervals = [];
  },

  componentWillUnmount() {
    this.intervals.map(clearInterval);
  },

  setInterval() {
    this.intervals.push(setInterval.apply(null, arguments));
  }
};

const renderTime = () => {
  const currentTime = new Date();
  let diem = 'AM';
  let h = currentTime.getHours();
  let m = currentTime.getMinutes();
  let s = currentTime.getSeconds();

  if (h === 0) {
    h = 12;
  } else if (h > 12) {
    h = h - 12;
    diem = 'PM';
  }

  if (m < 10) {
    m = '0' + m;
  }
  if (s < 10) {
    s = '0' + s;
  }
  const output = {
    hours: h,
    minutes: m,
    seconds: s,
    diem
  };
  return output;
};

const Clock = React.createClass({
  displayName: 'Clock',
  mixins: [SetIntervalMixin],
  getInitialState() {
    return { time: renderTime() };
  },
  componentDidMount() {
    this.setInterval(this.tick, 1000);
  },
  tick() {
    const output = renderTime();
    this.props.dispatch({type: "change_time", time: output});
  },
  render() {
    return (
      <p className='clock'>
        { this.props.time.hours }:{ this.props.time.minutes }:{ this.props.time.seconds }
        <span className='diem'>{ this.state.diem }</span>
      </p>
    );
  }
});


function select(state) {
  return {
    time: state.clock
  };
}

export default connect(select)(Clock);
