import React, { Component } from 'react';

class Search extends Component {
	constructor() {
		super();
		this.state = {
			searchString: ''
		}
	}
	handleChange = (e) => {
		this.setState({
			searchString: e.target.value
		})
		this.props.renderResultsCheck(e.target.value);
	}
	handleSubmit = (e) => {
		e.preventDefault();
		this.props.searchRequest(this.state.searchString);
	}
	render() {
		return (
			<div>
				<form onSubmit={this.handleSubmit} className="gitSearch">
					<input type="search" placeholder="Search Github..." className="searchString" name="searchString" value={this.state.searchString} onChange={this.handleChange} required />
					<input type="submit" className="searchSubmit" name="searchSubmit" value="Search" />
				</form>
			</div>
		);
	}
};

export default Search;