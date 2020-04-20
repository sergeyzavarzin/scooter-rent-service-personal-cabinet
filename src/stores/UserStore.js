import { types } from 'mobx-state-tree';

const UserStore = types
	.model('UserStore', {
		token: types.optional(types.string, ''),
		firstName: types.optional(types.string, ''),
		lastName: types.optional(types.string, ''),
		patronymic: types.optional(types.string, ''),
		email: types.optional(types.string, ''),
	})
	.views(self => ({
		get name() {
			return `${self.firstName} ${self.lastName}`;
		},
		get fullName() {
			return `${self.firstName} ${self.lastName} ${self.patronymic}`;
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
