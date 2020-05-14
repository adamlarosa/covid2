import React, { Component } from 'react';
import './App.css';

class App extends Component {
	constructor() {
		super();
		this.state = {
			data: {},
			states: {},
			slug: "us"
		};
	}
	componentDidMount() {
		this.getCases(this.state.slug);
	}

	getCases = async (slug) => {
		await fetch(`https://api.covid19api.com/dayone/country/${slug}`)
			.then(resp => resp.json())
			.then(data => {
				this.setState({ data });
			})
		await console.log("download complete")
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
						onClick={() => console.log("no test set up")}
					>
						-!-
					</button>
				</main>

			</div>
		);
	}
}
export default App;
