import React, { Component } from 'react';
import { OTSession, OTStreams } from 'opentok-react';
import ConnectionStatus from '../Component/ConnectionStatus';
import Publisher from '../Component/Publisher';
import Subscriber from '../Component/Subscriber';
import { Button, Grid, Header } from 'semantic-ui-react';
import payment_agent from '../Provider/payment-agent';
import { TherapistData, PatientData } from '../WalletFixtures';

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

	chargePayment = (e) => {
    payment_agent.charge_payment(PatientData.referenceId, PatientData.paymentToken)
  };

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
					<Grid.Row>
						<Grid.Column>
							<OTSession
			          apiKey={this.props.apiKey}
			          sessionId={this.props.sessionId}
			          token={this.props.token}
			          eventHandlers={this.sessionEvents}
			          onError={this.onError}>
			          {this.props.error ? <div>{this.props.error}</div> : null}
			          <div class={this.state.connected ? 'ui label label green' : 'ui label label red'}>
			          	<ConnectionStatus connected={this.state.connected} />
			          </div>
			          <Publisher />
			          <OTStreams>
			            <Subscriber />
			          </OTStreams>
				      </OTSession>
						</Grid.Column>
					</Grid.Row>
					<Grid.Row>
						<Grid.Column>
							<Button>End Session</Button>
						</Grid.Column>
					</Grid.Row>
		    </Grid>
			</div>
		);
	}
}

export default Patient;