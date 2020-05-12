import { flow, types } from 'mobx-state-tree';
import axios from 'axios';

const Card = types.model('Card', {
	expiryDate: types.optional(types.string, ''),
	maskedPan: types.optional(types.string, ''),
	isActive: types.optional(types.boolean, false),
});

const CardStore = types
	.model('PaymentStore', {
		isLoading: types.optional(types.boolean, true),
		items: types.maybe(types.array(Card)),
	})
	.views((self) => ({
		get cards() {
			return self.items;
		},
	}))
	.actions((self) => {
		const store = self;

		const fetchCards = flow(function* fetch() {
			if (!store.items || !store.items.length) {
				store.isLoading = true;
				try {
					const response = yield axios.get('/payment/cards');
					store.items = response.data;
				} catch (err) {
					store.items = [];
				} finally {
					store.isLoading = false;
				}
			}
		});

		const setActiveCard = (maskedPan) => {
			const items = store.items.map((item) => {
				return {
					isActive: item.maskedPan === maskedPan,
					expiryDate: item.expiryDate,
					maskedPan: item.maskedPan,
				};
			});
			store.items = items;
		};

		return {
			fetchCards,
			setActiveCard,
		};
	});

export default CardStore;
