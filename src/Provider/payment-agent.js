import superagentPromise from 'superagent-promise';
import _superagent from 'superagent';
import config from '../config';

const superagent = superagentPromise(_superagent, global.Promise);

const WALLET_API_BASE = config.WALLET_API_BASE;
const PAYMENT_AMOUNT = 10;

const responseBody = res => res.body;

let token = superagent.post('https://hack.softheon.io/oauth2/connect/token').type('form')
.send('client_id=1b9f1295-4c09-4d50-b8d6-b1d5ee68b702')
.send('client_secret=769f06a8-b185-4791-9afc-cf9a5caceb4d')
.send('grant_type=client_credentials')
.send('scope=paymentapi')
.send('username=hack059')
.send('password=2jYQNxwY').then(res => responseBody(res).access_token);
console.log(token);
const tokenPlugin = req => {
  if (token) {
    req.set('Authorization', `Bearer ${token}`);
  }
}

const payments_url = `${WALLET_API_BASE}payments`

const Wallet = {
  all_payments: (referenceId) => {
    // console.log(token)
    return superagent.get(payments_url)
    .query({referenceId: referenceId})
    .use(tokenPlugin)
    .then(responseBody)
  },
  charge_payment: (referenceId, paymentToken) => {
    const payment = {
      'paymentAmount': PAYMENT_AMOUNT,
      'description': 'Payment for therapy session',
      'referenceId': referenceId,
      'paymentMethod': {
        'paymentToken': paymentToken,
        'type': 'Credit Card'
      }
    };

    return superagent.post(`${payments_url}`)
    .send(payment)
    .use(tokenPlugin)
    .then(responseBody);
  }
}; 


export default Wallet;