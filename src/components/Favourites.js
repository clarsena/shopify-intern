import React, { Component, Fragment } from 'react';

class Favourites extends Component {
	constructor() {
		super();
		this.state = {

		}
	}
	handleClick = (e) => {
		this.props.remove(e.target.id);
	}
	render() {
		const faves = this.props.favourites;
		return (
			<div className="resultsGrid">
			<h3>Name</h3>
			<h3>Language</h3>
			<h3>Latest Tag</h3>
			<h3 className="buttonHeader">Remove Button</h3>
			{faves.length > 1 ? 
				faves.map((result) => {
					return (
						<Fragment key={result.name}>
						<a href={`https://github.com/${result.name}`} target="blank"><p>{result.name}</p></a>
							<p>{result.language}</p>
							<p>{result.tag}</p>
							<button id={result.key} className="faveButton" onClick={this.handleClick}>Remove</button>
						</Fragment>
					)
				}) : ''}
		</div>
		);
	}
};

export default Favourites;