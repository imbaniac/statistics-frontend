import React, {Component, PropTypes} from 'react';
import {loadStatisticsData, loadCorrelationsData} from '../actions/actions';

export default class Home extends Component {

	constructor(props){
		super(props);
		this.state = {
			arr1: "",
			arr2: "",
			results: this.props.results || {},
			access_token: this.props.access_token,
			correlation: this.props.correlation || ""
		};
		this.handleFormChange = this.handleFormChange.bind(this);
		this.analyse = this.analyse.bind(this);
		this.correlate = this.correlate.bind(this);
	}

	componentWillReceiveProps(props){
		this.setState({
			results: props.results,
			correlation: props.correlation
		})
	}

	handleFormChange(e) {
		if(e.target.id == "arr1")
			this.setState({arr1: e.target.value});
		else if(e.target.id == "arr2")
			this.setState({arr2: e.target.value});
	}

	analyse(e){
		e.preventDefault();
		this.props.dispatch(loadStatisticsData(this.state.arr1, this.state.access_token));
	}

	correlate(e){
		e.preventDefault()
		this.props.dispatch(loadCorrelationsData(this.state.arr1, this.state.arr2, this.state.access_token));
	}

	render(){
		const {max, min, avg, median, q1, q3, outliers} = this.state.results;
		return (
			<div className="col-md-12">
				<h4>Please enter sequence of numbers you need to analyse to form and press 'Analyse'.</h4>
				<h4>To correlate two sets of numbers enter data to both forms and press 'Correlate'</h4>
				<form className="form col-md-offset-2 col-md-4">
					<h4>Analyse</h4>
					<textarea
					onChange={this.handleFormChange}
					className="form-control input-md"
					id="arr1"
					type="text"
					placeholder="1 ,2 , 3, 4, 422, 4, 1 ,24"/>
					<button className="btn btn-default pull-right" onClick={this.analyse}>Analyse</button>
					<textarea
					onChange={this.handleFormChange}
					className="form-control input-md"
					type="text"
					id="arr2"
					placeholder="1 ,2 , 3, 4, 422, 4, 1 ,24"/>
					<button className="btn btn-default pull-right" onClick={this.correlate}>Correlate</button>
				</form>
				<div className="col-md-4">
					<h4>Results</h4>
					<ul>
						<li>Max value: {max}</li>
						<li>Min value: {min}</li>
						<li>Median: {median}</li>
						<li>Average: {avg}</li>
						<li>Q1 (first quartile): {q1}</li>
						<li>Q3 (third quartile): {q3}</li>
						<li>Outliers: {outliers&&outliers.length? outliers : "[ ]"}</li>
					</ul>
					{this.state.correlation&&<h5>Correlation: {this.state.correlation}</h5>}
				</div>
			</div>
		)
	}
}
