// begin helper functions for sortDataToStates()
const provinceInStates = (entry) => {
    const { states } = this.state
    return Object.keys(states).includes(entry.Province)
}

const countyInState = (entry) => {
    const { states } = this.state
    return Object.keys(states[entry["Province"]]).includes(entry.City)
}
const addEntryToState = (entry) => {
    const { Province, City } = entry;
    let newStates = this.state.states
    newStates[Province][City].push(entry) 
}
const createEntryInState = (entry) => {
    const { Province, City } = entry
    let newStates = this.state.states
    newStates[Province] = {}
    newStates[Province][City] = []
    newStates[Province][City].push(entry);
    this.setState({ states: newStates })
}
const createCountyInState = (entry) => {
    const { Province, City } = entry;
    let newStates = this.state.states;
    newStates[Province][City] = []
    newStates[Province][City].push(entry)
    this.setState({ states: newStates })
}
// end helper functions

const sortDataToStates = (data) => {
    // const {
    // provinceInStates, countyInState, addEntryToState, 
    // createCountyInState, createEntryInState 
    // } = this;
    
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
export default sortDataToStates