import React, { Component } from 'react';
import { Route, Switch } from 'react-router-dom';
import './App.css';
import { OT, OTSession, OTStreams, preloadScript } from 'opentok-react';
import ConnectionStatus from './Component/ConnectionStatus';
import Publisher from './Component/Publisher';
import Subscriber from './Component/Subscriber';
import config from './config';
import agent from './Provider/agent';
import NavBar from './Component/NavBar';
import Login from './Container/Login';
import Physician from'./Container/Physician';
import Patient from './Container/Patient';
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
  }

  componentWillMount() {
    agent.getToken().then(result => {
      window.localStorage.setItem('jwt', result.access_token);
    }).then(this.setState({isLoaded: true}));
  }

  componentDidMount() {
    if (this.state.isLoaded) {
      agent.Enterprise.createEntityTemplate();
    }
  }

  onError = (err) => {
    this.setState({ error: `Failed to connect: ${err.message}` });
  }

  makePayment = (e) => {

  };

  displayPayments = (e) => {

  };

  render() {
    const { isLoaded } = this.state;
    return (
      <div>
        { isLoaded ? (
          <div>
          <NavBar />
        <Grid.Row>
          <Header as='h1'>Remotely Care</Header>
        </Grid.Row>
        <Switch>
          <Route exact path="/" component={Login}/>
          <Route path="physician" component={Physician}/>
          <Route path="patient" component={Patient}/>
        </Switch>
        </div>) : null}
      </div>
    );
  }
}

export default preloadScript(App);
