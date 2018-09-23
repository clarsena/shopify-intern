import React, { Component } from 'react';

import firebase from './firebase';

const dbRef = firebase.database().ref();

class App extends Component {
	render() {
		return (
			<div className="App">
				<header className="header">
					<h1>My Github Favorites</h1>
				</header>
				<section className="search">
				</section>
				<section className="favourites">
				</section>
			</div>
		);
	}
}

export default App;
