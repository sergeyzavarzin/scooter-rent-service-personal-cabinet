import { flow, types } from 'mobx-state-tree';
import axios from 'axios';

const SubscriptionStore = types
	.model('SubscriptionStore', {
		nextPaymentDate: types.maybeNull(types.string),
		status: types.maybeNull(types.string),
		month: types.maybeNull(types.number),
	})
	.views(self => ({
		get getStatus() {
			switch (self.status) {
				case 'ACTIVE':
					return 'Активна';
				case 'PENDING':
					return 'Ожидает оплаты';
				default:
					return 'Приостановлена';
			}
		},
	}))
	.actions(self => {
		const store = self;

		const fetchSubscriptionInfo = flow(function* fetch() {
			try {
				const response = yield axios.get('/subscription/info');
				store.nextPaymentDate = response.data.nextPaymentDate;
				store.status = response.data.status;
				store.month = response.data.month;
			} catch (err) {
				console.log(err);
			}
		});

		return {
			fetchSubscriptionInfo,
		};
	});

export default SubscriptionStore;
