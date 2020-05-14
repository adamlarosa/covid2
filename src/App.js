import React, { Component } from 'react';
import './App.css';

class App extends Component {
	constructor() {
		super();
		this.state = {
			data: {},
			slug: "us"
		};
	}


	getCases = (slug) => {
		fetch(`https://api.covid19api.com/dayone/country/${slug}`)
			.then(resp => resp.json())
			.then(data => {
				this.setState({ data });
			})
	}

	topTest = () => {
		console.log(this.state)
	}
	render() {
		return (
			<div className="App">
				<header className="App-header">
					header
				</header>

				<main className="App-main">
					<button
						onClick={() => this.topTest()}
					>
						SHOWSTATE
					</button> <br/>
					main<br/>
					<button
						onClick={() => this.getCases(this.state.slug)}
					>
						-!-
					</button>
				</main>
			</div>
		);
	}
}
export default App;
