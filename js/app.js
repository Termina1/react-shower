import React from 'react';
import ReactDOM from 'react-dom';
import { Provider } from 'react-redux';
import { Router, Route } from 'react-router';
import { createStore, applyMiddleware, compose } from 'redux';
import { reduxReactRouter, routerStateReducer } from 'redux-router';
import thunk from 'redux-thunk';
import FontFaceObserver from 'fontfaceobserver';
import { createHistory } from 'history';
import persistState from 'redux-localstorage';

const openSansObserver = new FontFaceObserver('Open Sans', {});

// Import the pages
import Presentation from './presentation';
import App from './components/App.react';

import 'shower-ribbon/styles/screen-16x10.css';
import '../css/main.css';

import rootReducer from './reducers/rootReducer';
const routes = <Router history={createHistory()}>
  <Route component={App}>
    <Route path="*" component={Presentation} />
  </Route>
</Router>;

const createStoreWithMiddleware = compose(
  persistState(),
  applyMiddleware(thunk),
  reduxReactRouter({
    routes,
    createHistory
  })
)(createStore);
const store = createStoreWithMiddleware(rootReducer);

if (module.hot) {
  module.hot.accept('./reducers/rootReducer', () => {
    const nextRootReducer = require('./reducers/rootReducer').default;
    store.replaceReducer(nextRootReducer);
  });
}

ReactDOM.render(
  <Provider store={store}>
    {routes}
  </Provider>,
  document.getElementById('app')
);
