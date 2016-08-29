import * as types from './actionTypes';
import superagent from 'superagent';

export function loginResponse(data, err){
	return {
		type: types.LOGIN_RESPONSE,
		access_token: data.access_token,
		email: data.email,
		username: data.username,
		errors: err
	};
}

export function loginRequest(email, password){
	return function(dispatch) {
		superagent
		.post('https://statistics-api.herokuapp.com/login/')
		.send({ email: email, password: password })
		.set('Accept', 'application/json')
		.then(res => {
			dispatch(loginResponse(res.body, null));
		})
		.catch(
			(e) => {
				dispatch(loginResponse({}, JSON.parse(e.response.text).error));
			}
		);
	};
}

export function signupResponse(data, err){
	return {
		type: types.LOGIN_RESPONSE,
		access_token: data.access_token,
		email: data.email,
		username: data.username,
		errors: err
	};
}

export function signupRequest(username, email, password){
	return function(dispatch) {
		superagent
		.post('https://statistics-api.herokuapp.com/users/')
		.send( {user: { username: username, email: email, password: password, password_confirmation: password }})
		.set('Accept', 'application/json')
		.then(res => {
			dispatch(loginResponse(res.body, null));
		})
		.catch(
			(e) => {
				dispatch(loginResponse({}, JSON.parse(e.response.text).error));
			}
		);
	};
}

export function receiveStatisticsData(data){
	return {
		type: types.RECEIVE_STATISTICS_DATA,
		from : data.from,
		results: data.to
	};
}

export function loadStatisticsData(arr, access_token){
	return function(dispatch) {
		superagent
		.get('https://statistics-api.herokuapp.com/statistics')
		.set({"Authorization" : access_token, Accept: 'application/json'})
		.query({ arr: arr })
		.then(res => {
			dispatch(receiveStatisticsData(JSON.parse(res.text), null));
		})
		.catch(e => {
			console.err(e);
		});
	};
}

export function receiveCorrelationsData(data){
	return {
		type: types.RECEIVE_CORRELATIONS_DATA,
		from : data.from,
		correlation: data.to
	};
}

export function loadCorrelationsData(arr1, arr2, access_token){
	return function(dispatch) {
		superagent
		.get('https://statistics-api.herokuapp.com/correlations')
		.set({"Authorization" : access_token, Accept: 'application/json'})
		.query({ arr1: arr1, arr2: arr2 })
		.then(res => {
			dispatch(receiveCorrelationsData(JSON.parse(res.text), null));
		})
		.catch(e => {
			console.err(e);
		});
	};
}
