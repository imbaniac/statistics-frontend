import * as types from '../actions/actionTypes';

function rootReducer(state = {}, action){
	switch(action.type){
		case types.LOGIN_RESPONSE:
			return Object.assign({}, state, {
				username: action.username,
				access_token: action.access_token,
				email: action.email,
				errors: action.errors
			});
		case types.SIGNUP_RESPONSE:
			return Object.assign({}, state, {
				username: action.username,
				access_token: action.access_token,
				email: action.email,
				errors: action.errors
			});
		case types.RECEIVE_STATISTICS_DATA:
			return Object.assign({}, state, {
				statistics_array: action.from,
				results: action.results
			});
			case types.RECEIVE_CORRELATIONS_DATA:
				return Object.assign({}, state, {
					correation_arrays: action.from,
					correlation: action.correlation
				});
		default:
			return state;
	}
}

export default rootReducer;
