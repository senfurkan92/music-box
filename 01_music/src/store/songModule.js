import axios from '../config/axiosConfig';

const module = {
  state: () => ({
    playableSongs: [],
    onFetch: false,
  }),
  getters: {
    getPlayableSongs(state) {
      return state.playableSongs;
    },
    getHadCount(state) {
      return state.playableSongs.length;
    },
    getOnFetch(state) {
      return state.onFetch;
    },
  },
  mutations: {
    setPlayableSongs(state, songs) {
      songs.forEach((song) => {
        state.playableSongs.push(song);
      });
    },
    setOnFetch(state, payload) {
      state.onFetch = payload;
    },
  },
  actions: {
    fetchPlayableSongs({ commit, getters }) {
      if (!getters.getOnFetch) {
        commit('setOnFetch', true);
        axios.post('/song/getAsPart', {
          hadCount: getters.getHadCount,
        })
          .then((resp) => {
            if (resp.data.success) {
              commit('setOnFetch', false);
              commit('setPlayableSongs', resp.data.data);
            }
          });
      }
    },
  },
};

export default module;
