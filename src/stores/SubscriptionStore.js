import { flow, types } from 'mobx-state-tree';
import axios from 'axios';

const SubscriptionStore = types
	.model('SubscriptionStore', {
		nextPaymentDate: types.maybeNull(types.string),
		status: types.maybeNull(types.string),
		scooter: types.maybeNull(types.string),
		month: types.maybeNull(types.number),
	})
	.views((self) => ({
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
		get scooterInfo() {
			try {
				const scooter = self.scooter;
				const openingSquareBraceIndex = scooter.indexOf('[');
				const closingSquareBraceIndex = scooter.indexOf(']');
				const openingBraceIndex = scooter.indexOf('(');
				const closingBraceIndex = scooter.indexOf(')');
				const id = scooter.substring(
					openingSquareBraceIndex + 1,
					closingSquareBraceIndex
				);
				const name = scooter
					.substring(closingSquareBraceIndex + 1, openingBraceIndex)
					.trim();
				const color = scooter.substring(
					openingBraceIndex + 1,
					closingBraceIndex
				);
				return { id, name, color };
			} catch (e) {
				return null;
			}
		},
	}))
	.actions((self) => {
		const store = self;

		const fetchSubscriptionInfo = flow(function* fetch() {
			try {
				const response = yield axios.get('/subscription/info');
				store.nextPaymentDate = response.data.nextPaymentDate;
				store.status = response.data.status;
				store.month = response.data.month;
				store.scooter = response.data.scooter;
			} catch (err) {
				console.log(err);
			}
		});

		const setStatus = (status) => {
			store.status = status;
		};

		return {
			fetchSubscriptionInfo,
			setStatus,
		};
	});

export default SubscriptionStore;
