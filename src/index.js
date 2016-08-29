/* eslint-disable import/default */
import 'babel-polyfill';
import React from 'react';
import {render} from 'react-dom';
import { Router, browserHistory } from 'react-router';
import {Provider} from 'react-redux';
import App from './components/App';
import configureStore from './store/configureStore';
import '../node_modules/bootstrap/dist/css/bootstrap.min.css';
import '../node_modules/toastr/build/toastr.min.css';
import './styles/styles.css';

const store = configureStore();
render(
	<Provider store={store}>
		<App />
	</Provider>,
	document.getElementById('app')
);