import { CHANGE_ACTIVE_SLIDE, CHANGE_MODE } from 'constants/AppConstants';
import assignToEmpty from 'utils/assign';

const initialState = {
  mode: 'list',
  slide: 1
};

function deckReducer(state = initialState, action) {
  Object.freeze(state); // Don't mutate state directly, always use assign()!
  switch (action.type) {
    case CHANGE_ACTIVE_SLIDE:
      document.location.hash = action.slide;
      return assignToEmpty(state, {
        slide: action.slide
      });

    case CHANGE_MODE:
      return assignToEmpty(state, {
        mode: action.mode
      });

    default:
      return state;
  }
}

export default deckReducer;
