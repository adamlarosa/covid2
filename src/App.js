import React, { Component } from 'react';
import './App.css';

class App extends Component {
	constructor() {
		super();
		this.state = {
			data: {},
			states: {},
			routes: {},
			slugs: {},
			slug: "us"
		};
	}
	componentDidMount() {
		this.getCases(this.state.slug);
		this.getRoutes();
		this.getCountrySlugs();
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
	getRoutes = async () => {
		await fetch(`https://api.covid19api.com`)
			.then(resp => resp.json())
			.then(routes => {
				this.setState({ routes })
			})
		console.log("routes fetched")
	}
	getCountrySlugs = async () => {
		await fetch(`https://api.covid19api.com/countries`)
			.then(resp => resp.json())
			.then(slugs => {
				this.setState({ slugs })
			})
		console.log("Country names downloaded")
	}
// end of didMount functions

// begin helpers
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
// end helper functions
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
		console.log("data sorted by states/county")
	}


	showHeader = () => {
		if (this.state.states[""]) {
			return (
				<div>
				{this.state.states[""][""][this.state.states[""][""].length - 1].Confirmed} - Confirmed
				| COVID-19 |
				Deaths - {this.state.states[""][""][this.state.states[""][""].length - 1].Deaths}
				</div>
			)	
		} else {
			return (
				<div>
					waiting for data
				</div>
			)
		}
	}

	showState = () => {
		console.log(this.state)
	}
	render() {
	    return (
		<div className="App">
		    <header className="App-header">
				{this.showHeader()}
		    </header>

		    <main className="App-main">

			<button
			    onClick={ () => this.showState() }
			>
			    SHOWSTATE
			</button> 
					
			<br/>
			    main
			<br/>
					
			<button
			    onClick={ () => console.log("test not set up") }
			>
			    TEST BUTTON
			</button>

			<br />

			<select name="countries">
				{Object.keys(this.state.slugs).map((c, i) => {
					return (
						<option value={this.state.slugs[c].Slug}>
							{this.state.slugs[c].Country}
						</option>
					)
				})}

			</select>
			

			{Object.keys(this.state.slugs).map((c, i)  => {
				return (
				<div key={i}>
					{this.state.slugs[c].Country} - {this.state.slugs[c].Slug}
				
				</div>
				)
			})}

		    </main>

		</div>
	    );
	}
}
export default App;
