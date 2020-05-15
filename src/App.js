import React, { Component } from 'react';
import './App.css';

class App extends Component {
	constructor() {
		super();
		this.state = {
			data: {},
			states: {},
			slug: "china"
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
		this.sortDataToStates(this.state.data)
		console.log("download complete")
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

	sortDataToStates = (data) => {
		const {
			provinceInStates, countyInState, addEntryToState, 
			createCountyInState, createEntryInState 
		} = this;
		for (const info in data) {
			const entry = data[info];
			if (provinceInStates(entry)) {
				countyInState(entry) ? 
					addEntryToState(entry) 
				: 
					createCountyInState(entry);
			} else {
				createEntryInState(entry);
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
						onClick={() => console.log("test not set up")}
					>
						TEST BUTTON
					</button>
					
				</main>

			</div>
		);
	}
}
export default App;
