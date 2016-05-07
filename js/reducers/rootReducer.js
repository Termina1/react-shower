import deckReducer from 'reducers/deckReducer';
import { combineReducers } from 'redux';

const rootReducer = combineReducers({
  deck: deckReducer
});

export default rootReducer;
