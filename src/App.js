import React, { Component } from 'react';
import logo from './logo.svg';
import './App.css';
import { OT, OTSession, OTStreams, preloadScript } from 'opentok-react';
import ConnectionStatus from './Component/ConnectionStatus';
import Publisher from './Component/Publisher';
import Subscriber from './Component/Subscriber';
import config from './config';
import { 
  Grid,
  Header
} from 'semantic-ui-react';
import { TherapistData, PatientData } from './WalletFixtures';

class App extends Component {
  constructor(props) {
    super(props);

    this.state = {
      error: null,
      connected: false
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

  // componentWillMount() {
  //   OT.registerScreenSharingExtension('chrome', config.CHROME_EXTENSION_ID, 2);
  // }

  onError = (err) => {
    this.setState({ error: `Failed to connect: ${err.message}` });
  }

  makePayment = (e) => {
    
  };

  displayPayments = (e) => {
    
  };

  render() {
    return (
      <div>
        <Grid.Row>
          <Header as='h1'>Remotely Care</Header>
        </Grid.Row>

        <OTSession
          apiKey={this.props.apiKey}
          sessionId={this.props.sessionId}
          token={this.props.token}
          eventHandlers={this.sessionEvents}
          onError={this.onError}
        >
          {this.state.error ? <div>{this.state.error}</div> : null}
          <ConnectionStatus connected={this.state.connected} />
          <Publisher />
          <OTStreams>
            <Subscriber />
          </OTStreams>
        </OTSession>
      </div>
    );
  }
}

export default preloadScript(App);