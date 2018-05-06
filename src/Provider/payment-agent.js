import superagentPromise from 'superagent-promise';
import _superagent from 'superagent';
import config from '../config';

const superagent = superagentPromise(_superagent, global.Promise);

const WALLET_API_BASE = config.WALLET_API_BASE;
const PAYMENT_AMOUNT = 10;

const responseBody = res => res.body;

let token = null;
const tokenPlugin = req => {
  token = window.localStorage.getItem('jwt');
  if (window.localStorage.getItem('jwt')) {
    req.set('authorization', `Bearer ${token}`);
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