import {createStore, applyMiddleware} from 'redux';
import thunk from 'redux-thunk';
import reduxImmutableStateInvariant from 'redux-immutable-state-invariant';
import rootReducer from '../reducers/index';

export default function configureStore(initialState = {}){
	return createStore(
		rootReducer,
		window.devToolsExtension && window.devToolsExtension(),
		applyMiddleware(thunk,  reduxImmutableStateInvariant())
	);
}
