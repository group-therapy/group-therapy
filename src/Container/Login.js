import React, { Component } from 'react';
import NavBar from '../Component/NavBar';
import { 
  Grid,
  Header
} from 'semantic-ui-react';

class Login extends Component {
	render() {
		return (
		<div>
			<NavBar />
        <Grid.Row>
          <Header as='h1'>Remotely Care</Header>
        </Grid.Row>
		</div>);
	}
}

export default Login;