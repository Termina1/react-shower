import React from 'react';
import ReactDOM from 'react-dom';
import { Provider } from 'react-redux';
import { createStore, applyMiddleware, compose } from 'redux';
import thunk from 'redux-thunk';
import FontFaceObserver from 'fontfaceobserver';
import { createHistory } from 'history';
import persistState from 'redux-localstorage';
import RedBox from "redbox-react";

const openSansObserver = new FontFaceObserver('Open Sans', {});

import 'css/main.css';

import rootReducer from 'reducers/rootReducer';

const createStoreWithMiddleware = compose(
  persistState(),
  applyMiddleware(thunk)
)(createStore);

var styles;

function render() {
  const rootEl = document.getElementById('app');
  try {
    const config = require('config.json');

    if (styles) {
      styles.unuse();
    }

    var req = require.context('style-theme');

    styles = req(`./shower-${config.theme}/styles/screen-${config.proportions}.css`);

    styles.use();

    const App = require('components/App.react').default;
    const Presentation = require('presentation').default;

    ReactDOM.render(
      <Provider store={store}>
        <App>
          <Presentation />
        </App>
      </Provider>,
      rootEl
    );
  } catch(err) {
    ReactDOM.render(
      <RedBox error={err} />,
      rootEl
    );
  }
}

const store = createStoreWithMiddleware(rootReducer);

if (module.hot) {

  module.hot.accept(function(err) {
    const rootEl = document.getElementById('app');
    ReactDOM.render(
      <RedBox error={err} />,
      rootEl
    );
  })
  module.hot.accept('components/App.react', () => {
    setTimeout(render);
  });
  module.hot.accept('presentation', (errors, t, d) => {
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
