import React from 'react';
import ReactDOM from 'react-dom';
import './index.css';
import App from './App';
import config from './config';
import registerServiceWorker from './registerServiceWorker';
import { BrowserRouter } from 'react-router-dom'

import 'semantic-ui-css/semantic.min.css';

ReactDOM.render((
	<BrowserRouter>
		<App
	    apiKey={config.API_KEY}
	    sessionId={config.SESSION_ID}
	    token={config.TOKEN}
	    loadingDelegate={<div>Loading...</div>}
	    opentokClientUrl="https://static.opentok.com/v2/js/opentok.min.js"/>
    </BrowserRouter>), document.getElementById('root'));
registerServiceWorker();
