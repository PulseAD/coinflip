import Vuex from 'vuex';

import session from './session';
import leaderboard from './leaderboard';

const store = Vuex.createStore({
  modules: {
    session,
    leaderboard,
  },
});

export default store;
