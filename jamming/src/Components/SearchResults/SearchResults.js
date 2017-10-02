import React, { Component } from 'react';
import './SearchResults.css';
import { TrackList } from '../TrackList/TrackList';

/*
  This component render the search result:
  Features
	- Display the search result
    - The user can add a track to the user playlist
*/
export class SearchResults extends Component {
	
  render() {
    return (
		<div className="SearchResults">
		  <h2>Results</h2>
		  <TrackList tracks={this.props.searchResults} onAction={this.props.onAdd} actionText="+" />
		</div>
    );
  }
  
}
