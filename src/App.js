import React, { Component } from 'react';
import firebase from './firebase';
import axios from 'axios';
import Search from './components/Search';
import Favourites from './components/Favourites';
import Results from './components/Results';

const dbRef = firebase.database().ref();

class App extends Component {
	constructor() {
		super();
		this.state = {
			renderResults: false,
			resultsList: [],
			favouritesList: [],
		}
	}
	componentDidMount = () => {
		dbRef.on('value', (snapshot) => {
			if(snapshot.val()) {
				this.getFavourites(snapshot.val());
			}
		})
	}
	getFavourites = (favourites) => {
		if (favourites) {
			const favesArray = Object.entries(favourites)
			.map((favourite) => {
				return({
					key: favourite[0],
					id: favourite[1].id,
					language: favourite[1].language,
					name: favourite[1].name,
					tag: favourite[1].tag
				})
			})
			this.setState({
				favouritesList: favesArray
			}),()=>{}
		} else {
			this.setState({
				favouritesList:'',
			}), () => {}
		}
	}
	removeFavourite = (key) => {
		dbRef.child(key).remove();
	}
	searchRequest = (query) => {
		console.log(query);
		axios({
			url: 'https://api.github.com/search/repositories',
			dataResponse: 'json',
			headers: {
				Authorization: '9268b00f65c55a2d12b24943106479e20db01615',
				Accept: 'application/vnd.github.v3+json'
			},
			params: {
				q: query,
			},
		}).then((res) => {
			console.log(res);
			const tempArray = [];
			for (let i = 0; i < 10; i++) {
				tempArray.push(res.data.items[i]);
			}
			this.formatResults(tempArray);
		});
	}
	renderResultsCheck = (query) => {
		if (query) {
			this.setState({
				renderResults: true
			})
		} else {
			this.setState({
				renderResults: false,
				resultsList: []
			})
		}
	}
	formatResults = (results) => {
		console.log('formatting results');
		const tempArray = []
		results.map((result) => {
			const owner = result.owner.login;
			const repo = result.name;
			const language = result.language;
			const id = result.id;
			const tag = this.getLatestTag(owner, repo);
			console.log(tag);
			const repoObject = {
				name: `${owner}/${repo}`,
				language,
				tag,
				id,
				owner,
				repo
			};
			tempArray.push(repoObject);
		})
		this.setState({
			resultsList: tempArray
		})
	}
	getLatestTag = (owner, repo) => {
		console.log('getting tags')
		let tagResult = '';
		axios({
			url: `https://api.github.com/repos/${owner}/${repo}/tags`,
			dataResponse: 'json',
			headers: {
				Authorization: '9268b00f65c55a2d12b24943106479e20db01615',
				Accept: 'application/vnd.github.v3+json'
			},
			params: {
			},
		}).then((res) => {
			console.log(res);
			if(res.data.length > 0) {
				tagResult = res.data[0].name;
			}
		});
		return tagResult;
	}
	addFave = (resultID) => {
		const location = this.state.resultsList.filter(result => result.id == resultID);
		const faveToPush = {
			id: location[0].id,
			name: location[0].name,
			language: location[0].language,
			tag: location[0].tag
		}
		dbRef.push(faveToPush)
	}
	render() {
		return (
			<div className="App">
				<header className="header">
					<h1>My Github Favorites</h1>
				</header>
				<main className="mainContent">
					<section className="search">
						<Search searchRequest={this.searchRequest} renderResultsCheck={this.renderResultsCheck} />
						<Results resultsList={this.state.resultsList} renderResults={this.state.renderResults} addFave={this.addFave} faveList={this.state.favouritesList} />
					</section>
					<section className="favourites">
						<Favourites favourites={this.state.favouritesList} remove={this.removeFavourite} />
					</section>
				</main>
			</div>
		);
	}
}

export default App;
