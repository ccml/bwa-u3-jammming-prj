import React, { Component } from 'react';
import './SearchBar.css';

/*
  This component implements a search bar allowing the user to query the Spotify catalog.
  Features:
    - The user cans enter a search criteria
	- The user cans launch the search
*/
export class SearchBar extends Component {
	
  constructor(props) {
	super(props);
	
	/*
	  The 'term' property of component state will contain the search criteria
	*/
	this.state = { "term": undefined };
    this.search = this.search.bind(this);
	this.handleTermChange =this.handleTermChange.bind(this);
  }
  
  /*
    This method calls the search callback received by the component
  */
  search() {
	this.props.onSearch(this.state.term);
  }
  
  /*
    This method store the search criteria in the component state 
  */
  handleTermChange(e) {
	this.setState({ "term": e.target.value });
  }
  
  render() {
    return (
		<div className="SearchBar" onChange={this.handleTermChange}>
		  <input placeholder="Enter A Song, Album, or Artist" />
		  <a onClick={this.search}>SEARCH</a>
		</div>
    );
  }
  
}