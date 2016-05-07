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

import 'css/main.css';
import 'css/prism.css';

import rootReducer from 'reducers/rootReducer';

const createStoreWithMiddleware = compose(
  persistState(),
  applyMiddleware(thunk)
)(createStore);

var styles;

function render() {

  const config = require('config.json');

  if (styles) {
    styles.unuse();
  }

  if (config.proportions === '16x10') {
    styles = require('style/useable!css!shower-ribbon/styles/screen-16x10.css');
  } else {
    styles = require('style/useable!css!shower-ribbon/styles/screen-4x3.css');
  }

  styles.use();

  const App = require('components/App.react').default;
  const Presentation = require('presentation').default;
  const rootEl = document.getElementById('app');
  try {
    ReactDOM.render(
      <Provider store={store}>
        <App>
          <Presentation />
        </App>
      </Provider>,
      rootEl
    );
  } catch(err) {
    const RedBox = require('redbox-react');
    ReactDOM.render(
      <RedBox error={err} />,
      rootEl
    );
  }
}

const store = createStoreWithMiddleware(rootReducer);

if (module.hot) {
  module.hot.accept('components/App.react', () => {
    setTimeout(render);
  });
  module.hot.accept('presentation', () => {
    setTimeout(render);
  });

  module.hot.accept('config.json', () => {

    setTimeout(render);
  });

  module.hot.accept('reducers/rootReducer', () => {
    const nextRootReducer = require('reducers/rootReducer').default;
    store.replaceReducer(nextRootReducer);
  });
}

render();
