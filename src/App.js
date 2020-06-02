import React, { Component } from 'react';
import './App.css';
import sortDataToStates from './sortDataToStates'

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
		sortDataToStates(this.state.data)
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

	showState = () => {
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

			{Object.keys(this.state.slugs).map(c => {
				return (
				<div>
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
