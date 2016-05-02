import deckReducer from './deckReducer';
import { routerStateReducer } from 'redux-router';
import { combineReducers } from 'redux';

const rootReducer = combineReducers({
  deck: deckReducer,
  router: routerStateReducer
});

export default rootReducer;
