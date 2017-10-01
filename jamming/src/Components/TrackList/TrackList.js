import React, { Component } from 'react';
import './TrackList.css';
import { Track } from '../Track/Track';

/*
  This component displays a list of tracks.
  Features
	- Display a list of tracks
    - Each track will receive a callback to execute when the user click on the 
	  action button. The apparence of the action button will be linked to the 
	  'mode' property value.
	  Possible value of 'mode' property are "addTrack" and "removeTrack"
	  
*/
export class TrackList extends Component {
	
  render() {
    return (
		<div className="TrackList">
		{this.props.tracks.map(
		  track => <Track key={track.id} 
		                  track={track} 
						  onAction={this.props.onAction} 
						  mode={this.props.mode} />)}
		</div>
    );
  }
  
}
