import React from 'react';
import ReactDOM from 'react-dom';
import './index.css';
import App from './App';
import config from './config';
import registerServiceWorker from './registerServiceWorker';

ReactDOM.render(
	<App
    apiKey={config.API_KEY}
    sessionId={config.SESSION_ID}
    token={config.TOKEN}
    loadingDelegate={<div>Loading...</div>}
    opentokClientUrl="https://static.opentok.com/v2/js/opentok.min.js"
  />, document.getElementById('root'));
registerServiceWorker();
