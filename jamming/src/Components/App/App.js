import React, { Component } from 'react';
import './App.css';
import { SearchBar } from '../SearchBar/SearchBar';
import { SearchResults } from '../SearchResults/SearchResults';
import { PlayList } from '../PlayList/PlayList';
import { Spotify } from '../../util/Spotify';

/*
  This application allow to manage playlist to Spotify.
	
  Features :
	- The application needs the user authenticate itself to Spotify
	- The user can search tracks by entering some search criteria
	- The user can create a playlist and add it to its Spotify public playlists
*/
class App extends Component {
  
  constructor(props) {
    super(props);
	
	/* 
	  The component state will contain :
	    - searchResults : the result of the user search
		- playlistName : the name of the playlist the user want create
		- playlistTracks : the list of track of the user playlist
	*/
    this.state = {
        "searchResults": [],
        "playlistName": "",
        "playlistTracks": []
    };
	
    this.addTrack = this.addTrack.bind(this);
    this.removeTrack = this.removeTrack.bind(this);
    this.updatePlayListName = this.updatePlayListName.bind(this);
    this.savePlayList = this.savePlayList.bind(this);
    this.search = this.search.bind(this);
  }

  /*
    This methods clears the user playlist (name and content)
  */
  resetPlaylist() {
    this.setState({
      "playlistName": "New Playlist",
        playlistTracks: []
      }
    );
  }

  /*
    This method add a track to the user playlist
  */
  addTrack(track) {
    if(this.state.playlistTracks.every(item => item.id !== track.id)) {
      var tracks = this.state.playlistTracks;
      tracks.push(track);
      this.setState( {
          "playlistTracks": tracks
      });
    }
  }

  /*
    This method remove a track from the user playlist
  */
  removeTrack(track) {
    this.setState( {
        "playlistTracks" : this.state.playlistTracks.filter(item => item.id !== track.id)
      });
  }

  /*
    This method store the playlist name in the component state 
  */
  updatePlayListName(name) {
    this.setState( { "playlistName": name} );
  }

  /*
    This method save the playlist into the Spotify accound
  */
  savePlayList() {
    var trackUris = this.state.playlistTracks.map(item => item.uri);
    Spotify.savePlaylist(this.state.playlistName, trackUris).then(
      () => {
		// Once the playlist saved, we clear the playlist infos
        this.resetPlaylist();
      }
    );
  }

  /*
    This method process a search matching a search criteria
  */
  search(term) {
    Spotify.search(term).then( tracks => {
	  // save the search result in the component state
      this.setState({ "searchResults": tracks });
    });
  }

  render() {
    return (
        <div>
          <h1>Ja<span className="highlight">mmm</span>ing</h1>
          <div className="App">
            <SearchBar onSearch={this.search} />
            <div className="App-playlist">
              <SearchResults searchResults={this.state.searchResults} 
			                 onAdd={this.addTrack} />
              <PlayList playlistName={this.state.playlistName} 
			            playlistTracks={this.state.playlistTracks} 
						onRemove={this.removeTrack} 
						onNameChanged={this.updatePlayListName} 
						onSave={this.savePlayList} />
            </div>
          </div>
        </div>
    );
  }
  
}

export default App;
