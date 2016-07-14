import * as Derivable from 'derivable';
import * as Persistence from 'Persistence';
import * as History from 'History';
import assign from 'utils/assign';

/**
 * We store current slide number in location.hash.
 */
const slide = History.location.derive(location =>
  parseInt(location.hash.slice(1), 10) || 1);

/**
 * We store current mode in persistent atom (syncs with localStorage).
 */
const mode = Persistence.atom('__react_shower_mode__', 'list');

/**
 * App state is a {slide, mode}
 *
 * We expose struct derivation to prevent direct modification of the state.
 */
export const state = Derivable.struct({mode, slide});

/**
 * Change currently active slide.
 */
export function changeActiveSlide(nextSlide) {
  const hash = '#' + nextSlide;
  // XXX: Because browser bugs with :target we must do this instead of fancy
  // History.location.swap(...) :(
  window.location.hash = hash;
}

/**
 * Change mode.
 */
export function changeMode(nextMode) {
  mode.set(nextMode);
}
