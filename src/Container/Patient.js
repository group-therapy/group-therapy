import React, { Component } from 'react';
import { OTSession, OTStreams } from 'opentok-react';
import ConnectionStatus from '../Component/ConnectionStatus';
import Publisher from '../Component/Publisher';
import Subscriber from '../Component/Subscriber';

class Patient extends Component {
	constructor(props) {
		super(props);

		this.state = {
	      error: null,
	      connected: false,
	    };

		this.sessionEvents = {
	      sessionConnected: () => {
	        this.setState({ connected: true });
	      },
	      sessionDisconnected: () => {
	        this.setState({ connected: false });
	      }
	    };
	}

	render() {
		const { apiKey, sessionId, token } = this.props;
		return (
		<div>
			<OTSession
	          apiKey={this.props.apiKey}
	          sessionId={this.props.sessionId}
	          token={this.props.token}
	          eventHandlers={this.sessionEvents}
	          onError={this.onError}>
	          {this.props.error ? <div>{this.props.error}</div> : null}
	          <ConnectionStatus connected={this.state.connected} />
	          <Publisher />
	        </OTSession>
		</div>);
	}
}

export default Patient;