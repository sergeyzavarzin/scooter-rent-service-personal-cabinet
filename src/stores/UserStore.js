import { types } from 'mobx-state-tree';

const UserStore = types
  .model('UserStore', {
    firstName: types.string,
    lastName: types.string,
  })
  .views(self => ({
    get fullName() {
      return `${self.firstName} ${self.lastName}`;
    }
  }))
  .actions(self => {
    const store = self;

    const fetchUser = () => {

    };

    return {
      fetchUser,
    };
  });

export default UserStore;
