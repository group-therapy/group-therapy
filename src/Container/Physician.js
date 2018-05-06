import React, { Component } from 'react';
import { OTSession, OTStreams } from 'opentok-react';
import ConnectionStatus from '../Component/ConnectionStatus';
import Publisher from '../Component/Publisher';
import Subscriber from '../Component/Subscriber';
import { Grid, Header } from 'semantic-ui-react';

class Physician extends Component {
	render() {
		const {apiKey, sessionId, token, sessionEvents} = this.props;
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
          <ConnectionStatus connected={this.props.connected} />
          <Publisher />
          <OTStreams>
	         <Subscriber />
          </OTStreams>
        </OTSession>
	    </Grid>
		</div>);
	}
}

export default Physician;