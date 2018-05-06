import superagentPromise from 'superagent-promise';
import _superagent from 'superagent';
import config from '../config';

const superagent = superagentPromise(_superagent, global.Promise);

const ENTERPRISE_API_BASE = config.ENTERPRISE_API_BASE;

const responseBody = res => res.body;

let token = superagent.post('https://hack.softheon.io/oauth2/connect/token').type('form')
.send('client_id=1b9f1295-4c09-4d50-b8d6-b1d5ee68b702')
.send('client_secret=769f06a8-b185-4791-9afc-cf9a5caceb4d')
.send('grant_type=client_credentials')
.send('scope=enterpriseapi')
.send('username=hack059')
.send('password=2jYQNxwY').then(() => responseBody.access_token);
console.log(token);
const tokenPlugin = req => {
  if (token) {
    req.set('authorization', `Token ${token}`);
  }
}

const requests = {
  del: url =>
    superagent.del(`${ENTERPRISE_API_BASE}${url}`).use(tokenPlugin).then(responseBody),
  get: url =>
    superagent.get(`${ENTERPRISE_API_BASE}${url}`).use(tokenPlugin).then(responseBody),
  put: (url, body) =>
    superagent.put(`${ENTERPRISE_API_BASE}${url}`, body).use(tokenPlugin).then(responseBody),
  post: (url, body) =>
    superagent.post(`${ENTERPRISE_API_BASE}${url}`, body).use(tokenPlugin).then(responseBody)
};

const Auth = {
  current: () =>
    requests.get('/user'),
  login: (email, password) =>
    requests.post('/users/login', { user: { email, password } }),
  register: (username, email, password) =>
    requests.post('/users', { user: { username, email, password } }),
  save: user =>
    requests.put('/user', { user })
}; 


export default {
  Auth,
  setToken: _token => { token = _token; }
};