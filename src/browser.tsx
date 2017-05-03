import * as React from 'react';
import * as ReactDOM from 'react-dom';
import { BrowserRouter } from 'react-router-dom';

import 'es6-promise';

if (process.env.NODE_ENV !== 'production') {
  const logError = console.error.bind(console);

  console.error = (...err: any[]) => {
    if (
      typeof err[0] !== 'string' ||
      !err[0].match(/(React attempted to reuse markup|PropTypes via the main React)/)
    ) {
      logError(...err);
    }
  };
}

import { RouterComponent } from './app/router.component';

ReactDOM.render(
  <BrowserRouter><RouterComponent /></BrowserRouter>,
  document.getElementById('root')
);
