import React, { Component } from 'react';
import './PlayList.css';
import { TrackList } from '../TrackList/TrackList';

/*
  This component let the user manage a playlist name and content
  Features:
    - The user can enter the name of the playlist
	- Display the content of the playlist
    - The user can remove a track from the user playlist
	- The user can save the playlist to its Spotify public playlists
*/
export class PlayList extends Component {
	
  constructor(props) {
	super(props);
	this.handleNameChange = this.handleNameChange.bind(this);
  }
  
  /*
    This method calls the callback received by the component to update the playlist name
  */
  handleNameChange(e) {
	this.props.onNameChanged(e.target.value);
  }
  
  render() {
    return (
		<div className="Playlist">
		  <input value={this.props.playlistName} onChange={this.handleNameChange} />
		  <TrackList tracks={this.props.playlistTracks} onAction={this.props.onRemove} mode="removeTrack" />
		  <a className="Playlist-save" onClick={this.props.onSave}>SAVE TO SPOTIFY</a>
		</div>
    );
  }
}
