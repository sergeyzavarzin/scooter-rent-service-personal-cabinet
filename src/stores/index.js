import { types } from 'mobx-state-tree';

import UserStore from './UserStore';

const token = localStorage.getItem('token') || '';
const userInfo = localStorage.getItem('userInfo')
	? JSON.parse(localStorage.getItem('userInfo'))
	: {};

const { firstName = '', lastName = '', patronymic = '', email = '' } = userInfo;

const AppStore = types
	.model('AppStore', {
		appLoaded: types.optional(types.boolean, false),
		userStore: types.optional(UserStore, {
			token,
			firstName,
			lastName,
			patronymic,
			email,
		}),
	})
	.views(self => ({}))
	.actions(self => {
		const store = self;

		const setAppLoaded = () => {
			store.appLoaded = true;
		};

		const afterCreate = () => {};

		return {
			afterCreate,
			setAppLoaded,
		};
	});

export default AppStore;
