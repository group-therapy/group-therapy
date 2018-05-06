PAYMENT_AMOUNT = 10;

const authToken = (){
	const headers = {
		'Accept': 'application/json',
		'Authorization': 'Basic MGZiMjY3NDAtMzNjNy00NjRmLTllMjMtY2FjYTJhNjk3YzVjOmVmNGQyY2EwLTIzNjctNGY3OC1iZjlkLTI3MmE5NmRjMDUxNg=='
	};
	const body = {
		'grant_type': 'client_credentials',
		'scope': 'paymentapi'
	};
	
}();

const payTherapist = (referenceId, paymentToken) => {
	const payment = {
		'paymentAmount': PAYMENT_AMOUNT,
		'description': 'Payment for therapy session',
		'referenceId': referenceId,
		'paymentMethod': {
			'paymentToken': paymentToken,
			'type': 'Credit Card'
		};
	};

};

const retrievePayments = (referenceId) => {

};