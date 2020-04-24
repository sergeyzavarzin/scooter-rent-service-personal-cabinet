import { flow, types } from 'mobx-state-tree';
import axios from 'axios';

const Payment = types.model('Payment', {
	createDateTime: types.string,
	orderNumber: types.string,
	amount: types.number,
	cardInfo: types.string,
	status: types.string,
});

const PaymentStore = types
	.model('PaymentStore', {
		items: types.maybe(types.array(Payment)),
	})
	.actions(self => {
		const store = self;

		const fetchPaymentList = flow(function* fetch() {
			try {
				const response = yield axios.get('/payment/list');
				store.items = response.data;
			} catch (err) {
				store.items = [];
			}
		});

		const getStatus = status => {
			switch (status) {
				case 'SUCCESS':
					return 'Успешно';
				default:
					return 'Неуспешно';
			}
		};

		return {
			fetchPaymentList,
			getStatus,
		};
	});

export default PaymentStore;
