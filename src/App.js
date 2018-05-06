import React, { Component } from 'react';
import logo from './logo.svg';
import './App.css';
import { OT, OTSession, OTStreams, preloadScript } from 'opentok-react';
import ConnectionStatus from './Component/ConnectionStatus';
import Publisher from './Component/Publisher';
import Subscriber from './Component/Subscriber';
import config from './config';
import agent from './Provider/agent';

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

  render() {
    return (
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
    );
  }
}

export default preloadScript(App);