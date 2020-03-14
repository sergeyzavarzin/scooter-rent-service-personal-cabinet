import { types } from 'mobx-state-tree';

import UserStore from './UserStore';

const AppStore = types
  .model('AppStore', {
    appLoaded: types.optional(types.boolean, false),
    userStore: types.optional(UserStore, {
      firstName: 'Ser',
      lastName: 'Zav'
    })
  })
  .views(self => ({

  }))
  .actions(self => {
    const store = self;

    const setAppLoaded = () => {
      store.appLoaded = true;
    };

    const afterCreate = () => {

    };

    return {
      afterCreate,
      setAppLoaded,
    };
  });

export default AppStore;
