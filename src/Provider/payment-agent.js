import superagentPromise from 'superagent-promise';
import _superagent from 'superagent';
import config from '../config';

const superagent = superagentPromise(_superagent, global.Promise);

const WALLET_API_BASE = config.WALLET_API_BASE;
const PAYMENT_AMOUNT = 10;

const responseBody = res => res.body;

let token = superagent.post('https://hack.softheon.io/oauth2/connect/token')
.type('form')
.set('Accept=application/json')
.set('Authorization=Basic MGZiMjY3NDAtMzNjNy00NjRmLTllMjMtY2FjYTJhNjk3YzVjOmVmNGQyY2EwLTIzNjctNGY3OC1iZjlkLTI3MmE5NmRjMDUxNg==')
.send('grant_type=client_credentials')
.send('scope=paymentapi')
.then(() => responseBody.access_token);
console.log(token);
const tokenPlugin = req => {
  if (token) {
    req.set('authorization', `Token ${token}`);
  }
}

const payments_url = `${WALLET_API_BASE}payments`

const Wallet = {
  all_payments: (referenceId) => 
    superagent.get(`${payments_url}?referenceId=${referenceId}`).use(tokenPlugin).then(responseBody),
  make_payment: (referenceId, paymentToken) => {
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


export default {
  Wallet
};