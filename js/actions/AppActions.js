/* eslint-disable no-use-before-define */

import { CHANGE_ACTIVE_SLIDE, CHANGE_MODE } from '../constants/AppConstants';

export function changeActiveSlide(num) {
  return {
    type: CHANGE_ACTIVE_SLIDE,
    slide: num
  };
}

export function changeMode(mode) {
  return {
    mode: mode,
    type: CHANGE_MODE
  };
}
