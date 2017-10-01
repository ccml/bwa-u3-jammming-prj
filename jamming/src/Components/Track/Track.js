import React, { Component } from 'react';
import './Track.css';

/*
  This component displays a track
  Features
	- Display the track
    - The track have an action button. The apparence of the action button 
	  is linked to the 'mode' property value.
	  Possible value of 'mode' property are "addTrack" and "removeTrack".
	  When the user click on the action button, the action callback received 
	  by the component is called.
*/
export class Track extends Component {
	
  constructor(props) {
	super(props);
	this.procesActionWithTrack = this.procesActionWithTrack.bind(this);
  }
	
  /*
  */
  procesActionWithTrack() {
	this.props.onAction(this.props.track);
  }
	
  render() {
    return (
		<div className="Track">
		  <div className="Track-information">
			<h3>{this.props.track.name}</h3>
			<p>{this.props.track.artist} | {this.props.track.album}</p>
		  </div>
		  <a className="Track-action" onClick={this.procesActionWithTrack}>{this.props.mode === 'addTrack' ? '+' : '-'}</a>
		</div>
    );
  }
}
