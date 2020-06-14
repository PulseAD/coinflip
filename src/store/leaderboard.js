import axios from 'axios';

const path = process.env.VUE_APP_API_URL;

export default {
  state: {
    leaderboards: {
      todayLuckyLeaderboard: [],
      todayUnluckyLeaderboard: [],
      luckyLeaderboard: [],
      unluckyLeaderboard: [],
    },
  },
  getters: {
    getLeaderboards(state) {
      return state.leaderboards;
    },
  },
  mutations: {
    setLeaderboards(state, payload) {
      state.leaderboards = payload;
    },
  },
  actions: {
    async getLeaderboards(context) {
      try {
        const url = `${path}/leaderboards`;
        const session = await axios.get(url);
        context.commit('setLeaderboards', session.data);
        return Promise.resolve();
      } catch (error) {
        return Promise.reject(error);
      }
    },
  },
};
