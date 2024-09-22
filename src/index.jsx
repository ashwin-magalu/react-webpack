import React from 'react';
import ReactDOM from 'react-dom';
import HMR from './components/HMR';
import './index.css';

// Opt-in to Webpack hot module replacement
/**
 * Hot module replacement exchanges, adds, or removes modules while an application is running.
 * Without a full reload.
 * This can significantly speed up development by retaining application state,
 * which is lost during the reload
 */
if (module.hot) module.hot.accept();

/* eslint-disable no-undef */
ReactDOM.render(<HMR />, document.getElementById('app'));
