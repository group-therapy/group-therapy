import React, { Component } from 'react';
import { OTSession, OTStreams } from 'opentok-react';
import ConnectionStatus from '../Component/ConnectionStatus';
import Publisher from '../Component/Publisher';
import Subscriber from '../Component/Subscriber';

class Patient extends Component {
	render() {
		return
		<div>
			<OTSession
	          apiKey={this.props.apiKey}
	          sessionId={this.props.sessionId}
	          token={this.props.token}
	          eventHandlers={this.sessionEvents}
	          onError={this.onError}>
	          {this.state.error ? <div>{this.state.error}</div> : null}
	          <ConnectionStatus connected={this.state.connected} />
	          <Publisher />
	          <OTStreams>
	            <Subscriber />
	          </OTStreams>
	        </OTSession>
		</div>;
	}
}

export default Patient