import { types } from 'mobx-state-tree';
import axios from 'axios';
import { notification } from 'antd';

import UserStore from './UserStore';
import SubscriptionStore from './SubscriptionStore';
import PaymentStore from './PaymentStore';
import CardStore from './CardStore';

const token = localStorage.getItem('token') || '';
const userInfo = localStorage.getItem('userInfo')
	? JSON.parse(localStorage.getItem('userInfo'))
	: {};

const {
	firstName = '',
	lastName = '',
	patronymic = '',
	email = '',
	subscriptionId = '',
	registrationDate = '',
} = userInfo;

const AppStore = types
	.model('AppStore', {
		appLoaded: types.optional(types.boolean, false),
		userStore: types.optional(UserStore, {
			token,
			firstName,
			lastName,
			patronymic,
			email,
			subscriptionId,
			registrationDate,
		}),
		subscriptionStore: types.optional(SubscriptionStore, {}),
		paymentStore: types.optional(PaymentStore, {}),
		cardStore: types.optional(CardStore, {}),
		isMobile: types.optional(
			types.boolean,
			!window.matchMedia('(min-width: 768px)').matches
		),
	})
	.views((self) => ({}))
	.actions((self) => {
		const store = self;

		const setAppLoaded = () => {
			store.appLoaded = true;
		};

		const afterCreate = async () => {
			axios.defaults.baseURL = process.env.REACT_APP_API_URL;
			axios.defaults.headers.post['Content-Type'] = 'application/json';
			axios.interceptors.response.use(
				(response) => response,
				(error) => {
					if (error.response.status === 401) {
						localStorage.clear();
						window.location.href = '/';
					}
					notification.open({
						message: 'Ошибка.',
						description:
							typeof error.response.data.message === 'string'
								? error.response.data.message
								: 'Попробуйте повторить ваш запрос позднее.',
					});
					return Promise.reject(error);
				}
			);
			if (token.length) {
				axios.defaults.headers.common['Authorization'] = `Bearer ${token}`;
				await store.subscriptionStore.fetchSubscriptionInfo();
				await store.paymentStore.fetchPaymentList();
				await store.cardStore.fetchCards();
			}
		};

		const setIsMobile = () => {
			const isMobile = !window.matchMedia('(min-width: 767px)').matches;
			if (store.isMobile !== isMobile) {
				store.isMobile = isMobile;
			}
		};

		return {
			afterCreate,
			setAppLoaded,
			setIsMobile,
		};
	});

export default AppStore;
