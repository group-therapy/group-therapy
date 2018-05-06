import React, { Component } from 'react';
import { OTSession, OTStreams } from 'opentok-react';
import ConnectionStatus from '../Component/ConnectionStatus';
import Publisher from '../Component/Publisher';
import Subscriber from '../Component/Subscriber';
import { Grid, Header } from 'semantic-ui-react';

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
				<Grid>
					<Grid.Row>
						<Grid.Column>
							<Header as='h1'>Remotely Care</Header>
						</Grid.Column>
					</Grid.Row>
					<OTSession
	          apiKey={this.props.apiKey}
	          sessionId={this.props.sessionId}
	          token={this.props.token}
	          eventHandlers={this.sessionEvents}
	          onError={this.onError}>
	          {this.props.error ? <div>{this.props.error}</div> : null}
	          <div class='ui label {this.state.connected ? green : red} label'>
	          	<ConnectionStatus connected={this.state.connected} />
	          </div>
	          <Publisher />
		      </OTSession>
		    </Grid>
			</div>
		);
	}
}

export default Patient;