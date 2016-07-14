import React from 'react';
import ReactDOM from 'react-dom';
import FontFaceObserver from 'fontfaceobserver';
import RedBox from "redbox-react";

const openSansObserver = new FontFaceObserver('Open Sans', {});

import 'css/main.css';
import 'css/prism.css';

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
      <App>
        <Presentation />
      </App>,
      rootEl
    );
  } catch(err) {
    ReactDOM.render(
      <RedBox error={err} />,
      rootEl
    );
  }
}

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
}

render();
