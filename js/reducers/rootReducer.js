import deckReducer from './deckReducer';
import { routerStateReducer } from 'redux-router';
import { combineReducers } from 'redux';
import assignToEmpty from '../utils/assign';
const initialState = {};

function timeReducer(state = {}, action) {
  Object.freeze(state); // Don't mutate state directly, always use assign()!
  switch (action.type) {
    case "change_time":
      return action.time;

    default:
      return state;
  }
}

const rootReducer = combineReducers({
  deck: deckReducer,
  router: routerStateReducer,
  clock: timeReducer
});

export default rootReducer;
