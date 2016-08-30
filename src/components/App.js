import React, {Component, PropTypes} from 'react';
import {connect} from 'react-redux';
import Login from './Login';
import Home from './Home';
import Header from './Header';

class App extends Component {

	constructor(props){
		super(props);
		this.state = {
			access_token: ""
		};
		this.logout = this.logout.bind(this);
	}

	logout(e){
		e.preventDefault();
		this.setState({access_token: ""});
	}

	componentWillReceiveProps(props){
		this.setState({
			access_token: props.access_token
		});
	}

	render(){
		return (
			<div className="container-fluid">
				<Header logout={this.logout} access_token={this.state.access_token}/>				
				{!this.state.access_token ?
					<Login
						username={this.props.username}
						errors={this.props.errors}
						dispatch={this.props.dispatch}/>
							:
					<Home
						dispatch={this.props.dispatch}
						access_token={this.state.access_token}
						correlation={this.props.correlation}
						results={this.props.results}/>
				}
			</div>
		);
	}
}

App.propTypes = {
	username: PropTypes.string,
	dispatch: PropTypes.func.isRequired,
	access_token: PropTypes.string
};

function mapStateToProps(state){
	return {
		username: state.username,
		access_token: state.access_token,
		errors: state.errors,
		results: state.results,
		correlation: state.correlation
	};
}

export default connect(mapStateToProps)(App);
