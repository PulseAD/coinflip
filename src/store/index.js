import Vuex from 'vuex';

import session from './session';

const store = Vuex.createStore({
  modules: {
    session,
  },
});

export default store;
