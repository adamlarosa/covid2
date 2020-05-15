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


	provinceInStates = (entry) => {
		const { states } = this.state
		return Object.keys(states).includes(entry.Province)
	}

	countyInState = (entry) => {
		const { states } = this.state
		return Object.keys(states[entry["Province"]]).includes(entry.City)
	}

	addEntryToState = (entry) => {
		const { Province, City } = entry;
		let newStates = this.state.states
		newStates[Province][City].push(entry) 
	}

	createEntryInState = (entry) => {
		const { Province, City } = entry
		let newStates = this.state.states
		newStates[Province] = {}
		newStates[Province][City] = []
		newStates[Province][City].push(entry);
		this.setState({ states: newStates })
	}

	createCountyInState = (entry) => {
		const { Province, City } = entry;
		let newStates = this.state.states;
		newStates[Province][City] = []
		newStates[Province][City].push(entry)
		this.setState({ states: newStates })
	}

	addDataToStates = (data) => {
		const { provinceInStates, countyInState } = this
		for (const entry in data) {
			if (provinceInStates(data[entry])) {
				if (countyInState(data[entry])) {
					this.addEntryToState(data[entry])
				} else {
					this.createCountyInState(data[entry])
				}
			} else {
				this.createEntryInState(data[entry]);
			}
		}
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
					</button> 
					
					<br/>
					main
					<br/>
					
					<button
						onClick={() => this.addDataToStates(this.state.data)}
					>
						ADD DATA TO STATES
					</button>
					
				</main>

			</div>
		);
	}
}
export default App;
