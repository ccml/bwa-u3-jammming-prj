import React, { Component } from 'react';
import './Track.css';

/*
  This component displays a track
  Features
	- Display the track
    - The track have an action button.
	  When the user click on the action button, the action callback received 
	  by the component is called.
*/
export class Track extends Component {
	
  constructor(props) {
	super(props);
	this.procesActionWithTrack = this.procesActionWithTrack.bind(this);
  }
	
  /*
    This method calls the callback received by the component
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
		  <a className="Track-action" onClick={this.procesActionWithTrack}>{this.props.actionText}</a>
		</div>
    );
  }
}
