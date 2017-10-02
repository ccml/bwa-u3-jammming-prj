let clientid = "dc58e607a7d947ebb6ecdab8ac9dd060";
let redirectUrl = "http://localhost:3000";
var accessToken = undefined;

/*
  This object manage the access to the Spotify API
*/
export let Spotify = {
    
  /*
    This method return the accessToken that prove the user is authenticated and
	has authorized the application to acces its information
  */
  getAccessToken() {
    if (accessToken){
	  // The accessToken is already retrieved
      return accessToken;
    }
	// The accessToken is not yet retrieved
	// We have to determine if we have to redirect the user to the Spotify login/authorization page
	// or if the user come back from the Spotify login
    const accessTokenMatch = window.location.href.match(/access_token=([^&]*)/);
	const state = window.location.href.match(/state=(.[^&]*)/);
    const expiresInMatch = window.location.href.match(/expires_in=([^&]*)/);
    if (accessTokenMatch && state && expiresInMatch && (state[1] === '123ert456xvd987gfd')) {
	  // The user has been redirected back to the application with the accessToken
      accessToken = accessTokenMatch[1];
      const expiresIn = Number(expiresInMatch[1]);
	  // A timer will reset the accessToken after its timeout
      window.setTimeout(() => accessToken = '', expiresIn * 1000);
      window.history.pushState('Access Token', null, '/');	  
      return accessToken;
    } else {
	  // We have to redirect the user to the Spotify login/authorization page
      const accessUrl = `https://accounts.spotify.com/authorize?client_id=${clientid}&response_type=token&scope=playlist-modify-public&redirect_uri=${redirectUrl}&state=123ert456xvd987gfd`;
      window.location = accessUrl;
    }
  },

  /*
    This method query Spotify to retrieve a list of track matching a query
  */
  search(term) {
	if(!term) {
	  return [];
	}
	// We need the accessToken to put it in the header of the request
    var accessToken = this.getAccessToken();
    var query = `https://api.spotify.com/v1/search?type=track&q=${term}`;
    var myHeaders = new Headers();
    myHeaders.append('Authorization', `Bearer ${accessToken}`);
    return fetch(query, {
      method: 'GET',
      headers: myHeaders
    }).then(response => {
        return response.json()
      }
    ).then(jsonResponse => {
      if(!jsonResponse.tracks) {
        return [];
      }
      return jsonResponse.tracks.items.map(track => {
        return {
          id: track.id,
          name: track.artists[0].name,
          album: track.album.name,
          uri: track.uri
        };
      })
    });
  },

  /*
    This method store a playlist to the user Spotify public playlists.
	
	For the moment, the method add the playlist as a new playlist.
	There is no check if a playlist with the same name already exists.
	This can be a future improvement.
  */
  savePlaylist(playlistName, trackUris) {
    if(!playlistName) {
      return;
    }
    if(!trackUris) {
      return;
    }
	// We need the accessToken to put it in the header of the request
    var accessToken = this.getAccessToken();
    var myHeaders = new Headers();	
    myHeaders.append('Authorization', `Bearer ${accessToken}`);
    var userId = undefined;
	// We have first to retrieve the user identifier
    return fetch('https://api.spotify.com/v1/me',
     { "headers": myHeaders}
      ).then(response => response.json()
      ).then(jsonResponse => {	
        userId = jsonResponse.id;
		// We can now create the Spotify playlist
        return fetch(`https://api.spotify.com/v1/users/${userId}/playlists`, {
          headers: myHeaders,
          method: 'POST',
          body: JSON.stringify({"name": playlistName})
        }).then(response => response.json()
        ).then(jsonResponse => {
		  // We receive the identifier of the created playlist
          const playlistId = jsonResponse.id;
		  // We can now add the tracks to the Spotify playlist
          return fetch(`https://api.spotify.com/v1/users/${userId}/playlists/${playlistId}/tracks`, {
            headers: myHeaders,
            method: 'POST',
            body: JSON.stringify({"uris": trackUris})
          });
        });
	  });
  }
  
};
