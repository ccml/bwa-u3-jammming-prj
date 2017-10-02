import React, { Component } from 'react';
import './TrackList.css';
import { Track } from '../Track/Track';

/*
  This component displays a list of tracks.
  Features
	- Display a list of tracks
    - Each track will receive a callback to execute when the user click on the 
	  action button and the text to display in the button. 
	  
*/
export class TrackList extends Component {
	
  render() {
    return (
		<div className="TrackList">
		{this.props.tracks.map(
		  track => <Track key={track.id} 
		                  track={track} 
						  onAction={this.props.onAction} 
						  actionText={this.props.actionText} />)}
		</div>
    );
  }
  
}
