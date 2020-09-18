import { flow, getParent, types } from 'mobx-state-tree';
import axios from 'axios';
import moment from 'moment';

const SubscriptionStore = types
	.model('SubscriptionStore', {
		nextPaymentDate: types.maybeNull(types.string),
		status: types.maybeNull(types.string),
		scooter: types.maybeNull(types.string),
		category: types.maybeNull(types.string),
		discount: types.maybeNull(types.number),
		discountCode: types.maybeNull(types.string),
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
		get month() {
			const start = moment(getParent(self).userStore.registrationDate).toDate();
			const end = moment().toDate();
			const diff = moment(end).diff(start, 'M', true);
			const month = Math.trunc(diff);
			return month || 1;
		},
	}))
	.actions((self) => {
		const store = self;

		const fetchSubscriptionInfo = flow(function* fetch() {
			try {
				const response = yield axios.get('/subscription/info');
				store.nextPaymentDate = response.data.nextPaymentDate;
				store.status = response.data.status;
				store.scooter = response.data.scooter;
				store.category = response.data.category;
				store.discount = response.data.discount;
				store.discountCode = response.data.discountCode;
			} catch (err) {
				if (process.env.NODE_ENV === 'development') {
					throw new Error(err)
				}
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
