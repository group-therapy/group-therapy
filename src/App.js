import React, { Component } from 'react';
import { Route, Switch } from 'react-router-dom';
import './App.css';
import { OT, OTSession, OTStreams, preloadScript } from 'opentok-react';
import ConnectionStatus from './Component/ConnectionStatus';
import Publisher from './Component/Publisher';
import Subscriber from './Component/Subscriber';
import config from './config';
import agent from './Provider/agent';
import Login from './Container/Login';
import Physician from'./Container/Physician';
import Patient from './Container/Patient';
import payment_agent from './Provider/payment-agent';

import { TherapistData, PatientData } from './WalletFixtures';

class App extends Component {
  constructor(props) {
    super(props);

    this.state = {
      error: null,
      connected: false,
      isLoaded: false
    };

    this.sessionEvents = {
      sessionConnected: () => {
        this.setState({ connected: true });
      },
      sessionDisconnected: () => {
        this.setState({ connected: false });
      }
    };

    this.chargePayment();
    // setTimeout(5, this.displayPayments());
  }

  componentWillMount() {
    agent.getToken().then(result => {
      window.localStorage.setItem('jwt', result.access_token);
    }).then(this.setState({isLoaded: true}));
  }

  componentDidMount() {
    if (this.state.isLoaded) {
      //agent.Enterprise.createEntityTemplate();
    }
  }

  onError = (err) => {
    this.setState({ error: `Failed to connect: ${err.message}` });
  }

  chargePayment = (e) => {
    payment_agent.charge_payment(PatientData.referenceId, PatientData.paymentToken)
  };

  displayPayments = (e) => {
    console.log(payment_agent.all_payments(TherapistData.referenceId));
  };

  render() {
    const { isLoaded, error, connected } = this.state;
    const {apiKey, sessionId, token, sessionEvents} = this.props;
    return (
      <div>
        <Switch>
          <Route exact path="/" component={Login}/>
          <Route 
            path="/physician" 
            render={props => <Physician {...props} 
                                apiKey={apiKey} 
                                sessionId={sessionId} 
                                token={token} 
                                sessionEvents={sessionEvents} 
                                error={error} 
                                connected={connected}/>}
          />
          <Route 
            path="/patient" 
            render={props => <Patient {...props} 
                                apiKey={apiKey} 
                                sessionId={sessionId} 
                                token={token} 
                                sessionEvents={sessionEvents} 
                                error={error} 
                                connected={connected}/>}
          />
        </Switch>
      </div>
    );
  }
}

export default preloadScript(App);
