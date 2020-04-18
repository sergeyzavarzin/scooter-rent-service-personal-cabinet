import { types } from 'mobx-state-tree';

const token = localStorage.getItem('token') || '';

const UserStore = types
	.model('UserStore', {
		token: types.optional(types.string, token),
		firstName: types.string,
		lastName: types.string,
	})
	.views(self => ({
		get fullName() {
			return `${self.firstName} ${self.lastName}`;
		},
		get isUserLogged() {
			return !!self.token.length;
		},
	}))
	.actions(self => {
		const store = self;

		const fetchUser = () => {
			store.firstName = 'Fetch';
		};

		return {
			fetchUser,
		};
	});

export default UserStore;
