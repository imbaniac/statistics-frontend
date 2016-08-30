import React, {Component, PropTypes} from 'react';
import * as actions from '../actions/actions';
import toastr from 'toastr';

class Login extends Component{

	constructor(props){
		super(props);
		this.state = {
			newUser: false,
			email: "",
			password: "",
			errors: ""
		};
		this.handleEmailChange = this.handleEmailChange.bind(this);
		this.handlePasswordChange = this.handlePasswordChange.bind(this);
		this.handleLoginSubmit = this.handleLoginSubmit.bind(this);
		this.handleRegisterSubmit = this.handleRegisterSubmit.bind(this);
		this.handleUsernameChange = this.handleUsernameChange.bind(this);
	}

	handleEmailChange(e) {
		this.setState({email: e.target.value});
	}

	handlePasswordChange(e) {
		this.setState({password: e.target.value});
	}

	handleUsernameChange(e) {
		this.setState({username: e.target.value});
	}

	handleLoginSubmit(e) {
		e.preventDefault();
		if(this.state.errors || !this.state.email || !this.state.password ){
				toastr.error("Wrond credentials");
				this.setState(this.props.errors = []);
		}
		else {
			toastr.success("Welcome aboard!");
		}
		this.props.dispatch(actions.loginRequest(this.state.email, this.state.password));
	}

	handleRegisterSubmit(e) {
		e.preventDefault();
		if(this.state.errors || !this.state.email || !this.state.password ){
				toastr.error("Wrond credentials");
				this.setState(this.props.errors = []);
		}
		else {
			toastr.success("Welcome aboard!");
		}
		this.props.dispatch(actions.signupRequest(this.state.username,
			this.state.email, this.state.password));
	}

	render(){

		const signupBtn = (
			<button
				href="#"
				className="btn btn-primary btn-md"
				onClick={this.handleRegisterSubmit}>
				Signup
				<i className="fa fa-sign-in"></i>
			</button>
		);

		const loginBtn = (
			<button
				href="#"
				className="btn btn-primary btn-md"
				onClick={this.handleLoginSubmit}>
				Login
				<i className="fa fa-sign-in"></i>
			</button>
		);

		return (
			<div className="col-md-offset-5 col-md-3">
				<form className="form-login">
					<h4>{!this.state.newUser? "Welcome back" : "Please register"}</h4>
					<a onClick={
						(e) => {
							e.preventDefault();
							this.setState({newUser: !this.state.newUser});
						}
					}>{this.state.newUser? "Login" : "Register"}</a>
					{this.state.newUser? <input
						type="text"
						id="userName"
						className="form-control input-md chat-input"
						placeholder="Username"
						onChange={this.handleUsernameChange} /> : null}
					<input
						type="text"
						id="userEmail"
						className="form-control input-md chat-input"
						placeholder="email@email.com"
						onChange={this.handleEmailChange} />
					<input
						type="password"
						id="userPassword"
						className="form-control input-md chat-input"
						placeholder="password"
						onChange={this.handlePasswordChange} />
					<div className="wrapper">
					<span className="group-btn">
						{this.state.newUser? signupBtn : loginBtn}
					</span>
				</div>
			</form>
			</div>
		);
	}
}

Login.defaultProps = {
	username: ""
};

Login.propTypes = {
	dispatch: PropTypes.func.isRequired,
	username: PropTypes.string
};

export default Login;
