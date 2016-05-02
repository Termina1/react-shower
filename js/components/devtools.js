import React from 'react';
import { createDevTools } from 'redux-devtools';
import DockMonitor from 'redux-devtools-dock-monitor';
import SliderMonitor from 'redux-slider-monitor';

export default createDevTools(
  <DockMonitor toggleVisibilityKey='ctrl-h'
    changePositionKey='ctrl-q'
    defaultPosition='bottom'
    defaultSize={0.15}
    defaultIsVisible={false}
  >
    <SliderMonitor keyboardEnabled />
  </DockMonitor>
);
